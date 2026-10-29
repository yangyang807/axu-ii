'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import { ArrowLeft, Calendar, Facebook, Twitter, Linkedin, Mail } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  category: string;
  excerpt?: string;
  body_md?: string;
  source_urls?: string[];
  created_at: string;
}

export default function MagazineDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [magazine, setMagazine] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchArticle() {
      if (!params?.id) return;
      
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', params.id)
        .single();

      if (error) {
        console.error('Error fetching article:', error);
      } else {
        setMagazine(data);
      }
      setLoading(false);
    }

    fetchArticle();
  }, [params?.id]);

  const resolveImageUrl = (urlOrPath?: string) => {
    if (!urlOrPath) return null;
    if (urlOrPath.startsWith('http://') || urlOrPath.startsWith('https://')) {
      return urlOrPath;
    }
    const { data } = supabase.storage.from('magazine-images').getPublicUrl(urlOrPath);
    return data.publicUrl;
  };

  if (loading) {
    return (
      <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#666', fontSize: '15px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
        Loading article...
      </div>
    );
  }

  if (!magazine) {
    return (
      <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', color: '#111', textAlign: 'center', padding: '120px 24px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Article not found.</h2>
        <button 
          onClick={() => router.push('/magazine')} 
          style={{ color: '#0066cc', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}
        >
          ← Back to Daily Magazine
        </button>
      </div>
    );
  }

  const rawUrl = magazine.source_urls && magazine.source_urls.length > 0 ? magazine.source_urls[0] : undefined;
  const coverImage = resolveImageUrl(rawUrl);

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', color: '#222222', paddingBottom: '80px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif' }}>
      
      {/* Main Article Container */}
      <main style={{ maxWidth: '780px', margin: '0 auto', padding: '40px 24px 0 24px' }}>
        
        {/* TOP CONTROLS: Back Button, Date & Share Icons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eaeaea', paddingBottom: '16px', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          
          {/* Back Button & Date */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <button 
              onClick={() => router.push('/magazine')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'none',
                border: 'none',
                color: '#555',
                fontSize: '14px',
                cursor: 'pointer',
                fontWeight: 600,
                padding: 0
              }}
            >
              <ArrowLeft size={16} /> Back
            </button>

            <div style={{ color: '#666', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={14} /> {new Date(magazine.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
          </div>

          {/* Social Share Icons */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#3b5998', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <Facebook size={15} />
            </div>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#000000', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <Twitter size={15} />
            </div>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#0077b5', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <Linkedin size={15} />
            </div>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#555555', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <Mail size={15} />
            </div>
          </div>
        </div>

        {/* Author Profile Info Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#003366', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '16px' }}>
            AX
          </div>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#111' }}>AXU-II Editorial Staff</div>
            <div style={{ fontSize: '13px', color: '#666' }}>Global Research & Publication</div>
          </div>
        </div>

        {/* Category Label */}
        <div style={{ fontSize: '13px', color: '#0056b3', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '10px' }}>
          {magazine.category || 'MAGAZINE'}
        </div>

        {/* Title */}
        <h1 style={{ fontSize: '38px', color: '#111111', lineHeight: '1.2', margin: '0 0 24px 0', fontWeight: 800, letterSpacing: '-0.5px' }}>
          {magazine.title}
        </h1>

        {/* Cover Image */}
        {coverImage && (
          <div style={{ width: '100%', maxHeight: '440px', overflow: 'hidden', borderRadius: '8px', marginBottom: '36px', backgroundColor: '#f5f5f5' }}>
            <img 
              src={coverImage} 
              alt={magazine.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
              onError={(e) => {
                e.currentTarget.parentElement?.remove();
              }}
            />
          </div>
        )}

        {/* Article Body Content (စစ်ဆေးပြီးသား အကြောင်းအရာအစစ်အမှန်ကိုသာ တစ်ကြိမ်တည်းပြသမည်) */}
        <div 
          style={{ 
            fontSize: '17px', 
            lineHeight: '1.8', 
            color: '#222222', 
            whiteSpace: 'pre-wrap',
            fontWeight: 400
          }}
        >
          {magazine.body_md || magazine.excerpt}
        </div>

        {/* Bottom Back Button */}
        <div style={{ borderTop: '1px solid #eaeaea', marginTop: '60px', paddingTop: '32px' }}>
          <button 
            onClick={() => router.push('/magazine')}
            style={{
              backgroundColor: '#f1f3f5',
              border: 'none',
              padding: '12px 20px',
              borderRadius: '6px',
              color: '#333',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            ← Back to All Articles
          </button>
        </div>

      </main>
    </div>
  );
}