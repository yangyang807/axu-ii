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
      <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#666', fontSize: '15px' }}>
        Loading article...
      </div>
    );
  }

  if (!magazine) {
    return (
      <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', color: '#111', textAlign: 'center', padding: '120px 20px', boxSizing: 'border-box', overflowX: 'hidden', width: '100%' }}>
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
    <div style={{ backgroundColor: '#fcfcfc', minHeight: '100vh', color: '#222222', width: '100%', maxWidth: '100vw', overflowX: 'hidden', boxSizing: 'border-box' }} className="pb-20">
      
      {/* Main Article Container - ဘေးဘောင် လုံလောက်သော နေရာလွတ်ရရှိရန် px-4 sm:px-6 ကို သုံးထားသည် */}
      <main style={{ maxWidth: '800px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }} className="px-4 sm:px-8 pt-6 sm:pt-10">
        
        {/* TOP CONTROLS: Back Button, Date & Share Icons */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-4 mb-6" style={{ boxSizing: 'border-box', width: '100%' }}>
          
          {/* Back Button & Date */}
          <div className="flex items-center gap-4 flex-wrap">
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
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
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

        {/* --- ARTICLE CONTENT CARD WRAPPER (စာသားနှင့် အချက်အလက်များ ဘေးဘောင်နှင့် မကပ်စေရန် သီးသန့်ဘောင်ခံထားခြင်း) --- */}
        <div style={{ 
          backgroundColor: '#ffffff', 
          border: '1px solid #eaeaea', 
          borderRadius: '12px', 
          padding: '24px sm:px-10 py-6 sm:py-10', 
          boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
          boxSizing: 'border-box',
          width: '100%'
        }} className="px-5 sm:px-10">

          {/* Author Profile Info Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px', boxSizing: 'border-box', width: '100%' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#003366', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px', flexShrink: 0 }}>
              AX
            </div>
            <div style={{ minWidth: 0, overflow: 'hidden' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#111', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>AXU-II Editorial Staff</div>
              <div style={{ fontSize: '12px', color: '#666', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>Global Research & Publication</div>
            </div>
          </div>

          {/* Category Label */}
          <div style={{ fontSize: '12px', color: '#0056b3', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '8px', boxSizing: 'border-box' }}>
            {magazine.category || 'MAGAZINE'}
          </div>

          {/* Title */}
          <h1 
            style={{ 
              fontSize: 'clamp(20px, 4.5vw, 32px)', 
              color: '#111111', 
              lineHeight: '1.3', 
              margin: '0 0 20px 0', 
              fontWeight: 800,
              overflowWrap: 'break-word',
              wordBreak: 'break-word',
              boxSizing: 'border-box',
              width: '100%'
            }}
          >
            {magazine.title}
          </h1>

          {/* Cover Image */}
          {coverImage && (
            <div className="w-full h-56 sm:h-72 md:h-80 overflow-hidden rounded-lg mb-6 bg-gray-100" style={{ maxWidth: '100%', boxSizing: 'border-box' }}>
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

          {/* Article Body Content */}
          <div 
            style={{ 
              fontSize: '16px', 
              lineHeight: '1.8', 
              color: '#222222', 
              whiteSpace: 'pre-wrap',
              fontWeight: 400,
              overflowWrap: 'break-word',
              wordBreak: 'break-word',
              width: '100%',
              boxSizing: 'border-box'
            }}
          >
            {magazine.body_md || magazine.excerpt}
          </div>

        </div>

        {/* Bottom Back Button */}
        <div style={{ borderTop: '1px solid #eaeaea', marginTop: '40px', paddingTop: '24px', marginBottom: '40px', boxSizing: 'border-box', width: '100%' }}>
          <button 
            onClick={() => router.push('/magazine')}
            style={{
              backgroundColor: '#f1f3f5',
              border: 'none',
              padding: '10px 16px',
              borderRadius: '6px',
              color: '#333',
              fontSize: '13px',
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