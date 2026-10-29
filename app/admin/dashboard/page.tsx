'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import { 
  LayoutDashboard, 
  Video, 
  Newspaper, 
  Trash2, 
  Upload,
  BookOpen,
  BrainCircuit,
  NotebookPen
} from 'lucide-react';

export default function AxuIIAdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Destination Target Selection ('magazine' | 'course' | 'book' | 'store' | 'insights')
  const [targetDestination, setTargetDestination] = useState<'magazine' | 'course' | 'book' | 'store' | 'insights'>('magazine');
  
  const [articles, setArticles] = useState<any[]>([]);

  // Form Fields
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [externalUrl, setExternalUrl] = useState(''); // Youtube URL
  const [price, setPrice] = useState('$49.00'); // Store Price Field
  const [featuresInput, setFeaturesInput] = useState(''); // Store Features List
  
  // Image & PDF File States
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [message, setMessage] = useState('');

  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        router.push('/login');
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profile?.role !== 'admin') {
        router.push('/admin');
        return;
      }

      setIsAdmin(true);

      const { data: articlesData } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (articlesData) setArticles(articlesData);

    } catch (err) {
      console.error('Error loading dashboard:', err);
    } finally {
      setLoading(false);
    }
  }

  function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }

  function handlePdfSelect(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setPdfFile(e.target.files[0]);
    }
  }

  // Handle Dynamic Publishing & Auto-Redirect
  async function handlePublish(e: React.FormEvent) {
    e.preventDefault();
    setPublishing(true);
    setMessage('');

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      let mediaUrl = externalUrl;
      let pdfUrl = '';

      // Upload Cover Image if provided
      if (imageFile) {
        setUploadingMedia(true);
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `cover-${Date.now()}-${Math.floor(Math.random() * 100000)}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('magazine-images')
          .upload(fileName, imageFile, { cacheControl: '3600', upsert: false });

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from('magazine-images')
          .getPublicUrl(fileName);

        mediaUrl = publicUrlData.publicUrl;
        setUploadingMedia(false);
      }

      // Upload PDF File if provided for Book Kit
      if (pdfFile) {
        setUploadingMedia(true);
        const pdfFileName = `pdf-${Date.now()}-${Math.floor(Math.random() * 100000)}.pdf`;
        
        const { error: pdfUploadError } = await supabase.storage
          .from('magazine-images')
          .upload(pdfFileName, pdfFile, { cacheControl: '3600', upsert: false });

        if (pdfUploadError) throw pdfUploadError;

        const { data: pdfPublicUrlData } = supabase.storage
          .from('magazine-images')
          .getPublicUrl(pdfFileName);

        pdfUrl = pdfPublicUrlData.publicUrl;
        setUploadingMedia(false);
      }

      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now();

      const sourceUrlsArray = [];
      if (mediaUrl) sourceUrlsArray.push(mediaUrl);
      if (pdfUrl) sourceUrlsArray.push(pdfUrl);

      // Construct formatted excerpt and body_md for AI Store
      let finalExcerpt = excerpt;
      let finalBodyMd = excerpt;
      if (targetDestination === 'insights') {
        finalExcerpt = `Price: ${price} | ${excerpt}`;
        // Format features into clean bullet points
        const formattedFeatures = featuresInput
          .split('\n')
          .filter(line => line.trim() !== '')
          .map(line => `- ${line.replace(/^[-•]\s*/, '')}`)
          .join('\n');
        
        finalBodyMd = `${excerpt}\n\nKey Features & Capabilities:\n${formattedFeatures}`;
      }

      // Insert into database with precise category matching destination
      const { error } = await supabase.from('articles').insert({
        title,
        slug,
        excerpt: finalExcerpt,
        body_md: finalBodyMd,
        status: 'published',
        category: targetDestination, 
        author_id: user.id,
        source_urls: sourceUrlsArray
      });

      if (error) throw error;

      setMessage(`Successfully published! Redirecting to target page...`);
      
      // Reset form
      setTitle('');
      setExcerpt('');
      setExternalUrl('');
      setPrice('$49.00');
      setFeaturesInput('');
      setImageFile(null);
      setImagePreview(null);
      setPdfFile(null);
      fetchData();

      // Auto-redirect to the corresponding page after 1.5 seconds
      setTimeout(() => {
        if (targetDestination === 'magazine') {
          router.push('/magazine');
        } else if (targetDestination === 'course') {
          router.push('/member-dashboard');
        } else if (targetDestination === 'book') {
          router.push('/articles'); 
        } else if (targetDestination === 'store') {
          router.push('/notes'); 
        } else if (targetDestination === 'insights') {
          router.push('/insights');
        }
      }, 1500);

    } catch (err: any) {
      setMessage('Error: ' + err.message);
    } finally {
      setPublishing(false);
      setUploadingMedia(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this item?')) return;
    const { error } = await supabase.from('articles').delete().eq('id', id);
    if (!error) {
      setArticles(articles.filter(item => item.id !== id));
    }
  }

  if (loading) {
    return <div style={{ background: '#0a0a0a', color: '#d4af37', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Axu-II Control Center...</div>;
  }

  if (!isAdmin) return null;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0a0a', color: '#eae8e1', fontFamily: 'sans-serif' }}>
      
      <aside style={{ width: 260, background: '#0f0f0f', borderRight: '1px solid #222', display: 'flex', flexDirection: 'column', padding: '24px 16px', position: 'fixed', height: '100vh', overflowY: 'auto' }}>
        <div style={{ marginBottom: 32, paddingLeft: 12 }}>
          <h2 style={{ color: '#d4af37', fontSize: 22, fontWeight: 'bold', margin: 0, letterSpacing: 1 }}>AXU-II</h2>
          <p style={{ fontSize: 11, color: '#888', margin: '4px 0 0 0' }}>AI Knowledge OS & Store</p>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: 'rgba(212, 175, 55, 0.1)', color: '#d4af37', border: 'none', borderRadius: 6, cursor: 'pointer', textAlign: 'left', width: '100%', fontSize: 14 }}>
            <LayoutDashboard size={16}/> Executive Admin
          </button>
        </nav>
      </aside>

      <main style={{ marginLeft: 260, flex: 1, padding: '32px 40px', maxWidth: 'calc(100vw - 260px)' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, borderBottom: '1px solid #222', paddingBottom: 20 }}>
          <div>
            <h1 style={{ fontSize: 24, fontFamily: 'serif', color: '#fff', margin: 0 }}>AXU-II Admin Console</h1>
            <p style={{ fontSize: 13, color: '#888', margin: '4px 0 0 0' }}>Multi-Destination Pack, Kit & Course Publishing Engine</p>
          </div>
        </div>

        {/* Destination Selector Tabs */}
        <div style={{ marginBottom: 12 }}>
          <label style={{ fontSize: 12, color: '#888', display: 'block', marginBottom: 8, fontWeight: 'bold', letterSpacing: 0.5 }}>
            SELECT PUBLISHING DESTINATION (WHERE TO DISPLAY & AUTO-REDIRECT)
          </label>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10, marginBottom: 24 }}>
          
          <button 
            type="button"
            onClick={() => setTargetDestination('magazine')}
            style={{ 
              padding: '14px 10px', 
              background: targetDestination === 'magazine' ? '#1c1c1c' : '#111', 
              border: targetDestination === 'magazine' ? '1px solid #d4af37' : '1px solid #222', 
              borderRadius: 8, 
              color: targetDestination === 'magazine' ? '#d4af37' : '#888',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
              fontSize: 12,
              fontWeight: 'bold',
              textAlign: 'center'
            }}
          >
            <Newspaper size={18}/> Daily Magazine
          </button>

          <button 
            type="button"
            onClick={() => setTargetDestination('course')}
            style={{ 
              padding: '14px 10px', 
              background: targetDestination === 'course' ? '#1c1c1c' : '#111', 
              border: targetDestination === 'course' ? '1px solid #d4af37' : '1px solid #222', 
              borderRadius: 8, 
              color: targetDestination === 'course' ? '#d4af37' : '#888',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
              fontSize: 12,
              fontWeight: 'bold',
              textAlign: 'center'
            }}
          >
            <Video size={18}/> Member Course
          </button>

          <button 
            type="button"
            onClick={() => setTargetDestination('book')}
            style={{ 
              padding: '14px 10px', 
              background: targetDestination === 'book' ? '#1c1c1c' : '#111', 
              border: targetDestination === 'book' ? '1px solid #d4af37' : '1px solid #222', 
              borderRadius: 8, 
              color: targetDestination === 'book' ? '#d4af37' : '#888',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
              fontSize: 12,
              fontWeight: 'bold',
              textAlign: 'center'
            }}
          >
            <BookOpen size={18}/> Book Kit (PDF)
          </button>

          <button 
            type="button"
            onClick={() => setTargetDestination('store')}
            style={{ 
              padding: '14px 10px', 
              background: targetDestination === 'store' ? '#1c1c1c' : '#111', 
              border: targetDestination === 'store' ? '1px solid #d4af37' : '1px solid #222', 
              borderRadius: 8, 
              color: targetDestination === 'store' ? '#d4af37' : '#888',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
              fontSize: 12,
              fontWeight: 'bold',
              textAlign: 'center'
            }}
          >
            <NotebookPen size={18}/> Prompt Packs
          </button>

          <button 
            type="button"
            onClick={() => setTargetDestination('insights')}
            style={{ 
              padding: '14px 10px', 
              background: targetDestination === 'insights' ? '#1c1c1c' : '#111', 
              border: targetDestination === 'insights' ? '1px solid #d4af37' : '1px solid #222', 
              borderRadius: 8, 
              color: targetDestination === 'insights' ? '#d4af37' : '#888',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
              fontSize: 12,
              fontWeight: 'bold',
              textAlign: 'center'
            }}
          >
            <BrainCircuit size={18}/> AI Store
          </button>

        </div>

        {/* Publishing Form */}
        <div style={{ background: '#121212', padding: 24, borderRadius: 12, border: '1px solid #222', marginBottom: 32 }}>
          <h3 style={{ fontSize: 18, color: '#fff', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
            {targetDestination === 'magazine' && <Newspaper color="#d4af37" size={20}/>}
            {targetDestination === 'course' && <Video color="#d4af37" size={20}/>}
            {targetDestination === 'book' && <BookOpen color="#d4af37" size={20}/>}
            {targetDestination === 'store' && <NotebookPen color="#d4af37" size={20}/>}
            {targetDestination === 'insights' && <BrainCircuit color="#d4af37" size={20}/>}
            Publishing to: <span style={{ color: '#d4af37', textTransform: 'uppercase' }}>{targetDestination === 'store' ? 'Prompt Packs' : targetDestination}</span>
          </h3>

          <form onSubmit={handlePublish} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ fontSize: 12, color: '#888', display: 'block', marginBottom: 6 }}>PRODUCT / TITLE NAME</label>
              <input 
                type="text" 
                placeholder="Enter title, pack name or kit header..." 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                required 
                style={{ width: '100%', padding: '12px', background: '#0a0a0a', border: '1px solid #333', color: '#fff', borderRadius: 6, fontSize: 14 }}
              />
            </div>

            {/* AI Store Price & Key Features Inputs */}
            {targetDestination === 'insights' && (
              <>
                <div>
                  <label style={{ fontSize: 12, color: '#888', display: 'block', marginBottom: 6 }}>PRODUCT PRICE (e.g. $49.00 or 28500MMK)</label>
                  <input 
                    type="text" 
                    placeholder="$49.00" 
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)} 
                    required 
                    style={{ width: '100%', padding: '12px', background: '#0a0a0a', border: '1px solid #333', color: '#fff', borderRadius: 6, fontSize: 14 }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: 12, color: '#888', display: 'block', marginBottom: 6 }}>KEY FEATURES & CAPABILITIES (Enter each feature on a new line)</label>
                  <textarea 
                    placeholder="High-leverage prompt architecture & execution guide&#10;Optimized for direct integration into Knowledge OS&#10;Tested and verified for professional workflows" 
                    value={featuresInput} 
                    onChange={(e) => setFeaturesInput(e.target.value)} 
                    rows={4}
                    style={{ width: '100%', padding: '12px', background: '#0a0a0a', border: '1px solid #333', color: '#fff', borderRadius: 6, fontSize: 14 }}
                  />
                </div>
              </>
            )}

            {targetDestination === 'course' && (
              <div>
                <label style={{ fontSize: 12, color: '#888', display: 'block', marginBottom: 6 }}>YOUTUBE / VIDEO LESSON URL</label>
                <input 
                  type="url" 
                  placeholder="https://www.youtube.com/watch?v=..." 
                  value={externalUrl} 
                  onChange={(e) => setExternalUrl(e.target.value)} 
                  required
                  style={{ width: '100%', padding: '12px', background: '#0a0a0a', border: '1px solid #333', color: '#fff', borderRadius: 6, fontSize: 14 }}
                />
              </div>
            )}

            {(targetDestination === 'magazine' || targetDestination === 'book' || targetDestination === 'insights' || targetDestination === 'store') && (
              <div>
                <label style={{ fontSize: 12, color: '#888', display: 'block', marginBottom: 6 }}>COVER IMAGE UPLOAD (PREMIUM VISUAL ASSET)</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#1a1a1a', border: '1px solid #333', padding: '10px 16px', borderRadius: 6, color: '#d4af37', cursor: 'pointer', fontSize: 13, fontWeight: 'bold' }}>
                    <Upload size={16}/> Choose Cover Image
                    <input type="file" accept="image/*" onChange={handleImageSelect} style={{ display: 'none' }} />
                  </label>
                  {imageFile && <span style={{ fontSize: 12, color: '#aaa' }}>{imageFile.name}</span>}
                </div>

                {imagePreview && (
                  <div style={{ marginTop: 12, width: 200, height: 120, borderRadius: 6, overflow: 'hidden', border: '1px solid #333' }}>
                    <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
              </div>
            )}

            {/* Special PDF File Upload for Book Kit */}
            {targetDestination === 'book' && (
              <div>
                <label style={{ fontSize: 12, color: '#888', display: 'block', marginBottom: 6 }}>UPLOAD PDF DOCUMENT (.PDF)</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#1a1a1a', border: '1px solid #333', padding: '10px 16px', borderRadius: 6, color: '#d4af37', cursor: 'pointer', fontSize: 13, fontWeight: 'bold' }}>
                    <Upload size={16}/> Choose PDF File
                    <input type="file" accept="application/pdf" onChange={handlePdfSelect} style={{ display: 'none' }} />
                  </label>
                  {pdfFile && <span style={{ fontSize: 12, color: '#4cd137' }}>{pdfFile.name} (Attached)</span>}
                </div>
              </div>
            )}

            <div>
              <label style={{ fontSize: 12, color: '#888', display: 'block', marginBottom: 6 }}>
                {targetDestination === 'store' || targetDestination === 'insights' ? 'PRODUCT DESCRIPTION / SHORT OVERVIEW' : 'DESCRIPTION / EXCERPT / LESSON DETAILS'}
              </label>
              <textarea 
                placeholder={targetDestination === 'store' ? 'Enter system prompt, instructions or configuration details...' : 'Write lesson descriptions or notes here...'} 
                value={excerpt} 
                onChange={(e) => setExcerpt(e.target.value)} 
                rows={4}
                required
                style={{ width: '100%', padding: '12px', background: '#0a0a0a', border: '1px solid #333', color: '#fff', borderRadius: 6, fontSize: 14 }}
              />
            </div>

            <button type="submit" style={{ background: '#d4af37', color: '#000', border: 'none', padding: '14px', borderRadius: 6, fontWeight: 'bold', cursor: 'pointer', fontSize: 14 }} disabled={publishing || uploadingMedia}>
              {publishing || uploadingMedia ? 'Uploading & Publishing...' : `Publish to ${targetDestination === 'store' ? 'Prompt Packs' : targetDestination.toUpperCase()} & Redirect`}
            </button>
          </form>
        </div>

        {message && <div style={{ padding: 12, background: 'rgba(212,175,55,0.1)', color: '#d4af37', borderRadius: 6, fontSize: 14, marginBottom: 24 }}>{message}</div>}

        {/* Existing Catalog List */}
        <div style={{ background: '#121212', padding: 24, borderRadius: 12, border: '1px solid #222' }}>
          <h3 style={{ fontSize: 18, color: '#fff', margin: '0 0 16px 0' }}>Catalog Overview (All Published Packs & Kits)</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {articles.map((item) => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 14, background: '#0a0a0a', borderRadius: 8, border: '1px solid #222' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 11, background: '#1c1c1c', color: '#d4af37', padding: '2px 8px', borderRadius: 4, textTransform: 'uppercase', fontWeight: 'bold', border: '1px solid #333' }}>
                      {item.category || 'general'}
                    </span>
                    <h4 style={{ fontSize: 15, color: '#fff', margin: 0 }}>{item.title}</h4>
                  </div>
                  <p style={{ fontSize: 12, color: '#888', margin: '6px 0 0 0' }}>Created: {new Date(item.created_at).toLocaleDateString()}</p>
                </div>
                <button onClick={() => handleDelete(item.id)} style={{ background: 'transparent', border: '1px solid #ff4d4f', color: '#ff4d4f', padding: '6px 12px', borderRadius: 4, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: 12 }}>
                  <Trash2 size={14}/> Delete
                </button>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}