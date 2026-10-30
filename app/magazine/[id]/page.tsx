'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import { ArrowLeft, Share2, Bookmark, MessageSquare } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  category: string;
  excerpt?: string;
  body_md?: string;
  source_urls?: string[];
  created_at: string;
}

export default function MagazineDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [magazine, setMagazine] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchArticle() {
      if (!resolvedParams?.id) return;
      
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', resolvedParams.id)
        .single();

      if (error) {
        console.error('Error fetching article:', error);
      } else {
        setMagazine(data);
      }
      setLoading(false);
    }

    fetchArticle();
  }, [resolvedParams?.id, supabase]);

  const resolveImageUrl = (urlOrPath?: string) => {
    if (!urlOrPath) return null;
    if (urlOrPath.startsWith('http://') || urlOrPath.startsWith('https://')) {
      return urlOrPath;
    }
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tnlkispfkhdupnlcgsqu.supabase.co';
    const cleanPath = urlOrPath.replace(/^\/+/, '');
    return `${supabaseUrl}/storage/v1/object/public/magazine-images/${cleanPath}`;
  };

  if (loading) {
    return (
      <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#777777', fontSize: '15px', fontFamily: 'Georgia, serif' }}>
        Loading article...
      </div>
    );
  }

  if (!magazine) {
    return (
      <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', color: '#111111', textAlign: 'center', padding: '120px 24px', fontFamily: 'Georgia, serif' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Article not found.</h2>
        <button 
          onClick={() => router.push('/magazine')} 
          style={{ color: '#111111', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 600, textDecoration: 'underline' }}
        >
          ← Back to Daily Magazine
        </button>
      </div>
    );
  }

  const rawUrl = magazine.source_urls && magazine.source_urls.length > 0 ? magazine.source_urls[0] : undefined;
  const coverImage = resolveImageUrl(rawUrl);

  const formattedDate = new Date(magazine.created_at).toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  }).toUpperCase() + ' • ' + new Date(magazine.created_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }).toUpperCase() + ' ET';

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', color: '#111111', fontFamily: 'Georgia, serif' }} className="pb-24 overflow-x-hidden selection:bg-black selection:text-white">
      
      {/* Top Navigation Bar */}
      <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-gray-100 z-50 px-4 sm:px-8 py-3 flex items-center justify-between max-w-[740px] mx-auto">
        <button 
          onClick={() => router.push('/magazine')}
          className="inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-gray-700 hover:text-black transition-colors"
        >
          <ArrowLeft size={14} /> Back
        </button>
        <div className="text-xs font-sans font-bold uppercase tracking-widest text-gray-400">
          AXU-II MAGAZINE
        </div>
      </div>

      {/* Main Article Container (The Atlantic / Professional Reading Width) */}
      <main className="w-full max-w-[680px] mx-auto px-5 sm:px-6 pt-6 sm:pt-10">
        
        {/* Title */}
        <h1 
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#111111] mb-4"
          style={{ lineHeight: '1.15', fontFamily: 'Georgia, serif' }}
        >
          {magazine.title}
        </h1>

        {/* Excerpt / Subtitle */}
        {magazine.excerpt && (
          <p className="text-lg sm:text-xl text-gray-600 font-normal mb-6 leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
            {magazine.excerpt}
          </p>
        )}

        {/* Author Byline */}
        <div className="text-xs sm:text-sm font-sans font-medium text-gray-800 mb-6 pb-6 border-b border-gray-200">
          By <span className="font-bold underline decoration-1 underline-offset-4">AXU-II Editorial Staff</span>
        </div>

        {/* Cover Image */}
        {coverImage && (
          <div className="mb-8 -mx-5 sm:mx-0">
            <div className="w-full h-64 sm:h-80 md:h-[420px] overflow-hidden bg-gray-100 sm:rounded-md">
              <img 
                src={coverImage} 
                alt={magazine.title} 
                className="w-full h-full object-cover" 
                onError={(e) => {
                  e.currentTarget.parentElement?.remove();
                }}
              />
            </div>
            <div className="text-[11px] font-sans text-gray-500 mt-2 px-5 sm:px-0">
              Photo: AXU-II Global Research & Publication Archive
            </div>
          </div>
        )}

        {/* Date and Social Interaction Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-3 border-y border-gray-200 mb-8 text-xs font-sans text-gray-600">
          <div className="tracking-wider uppercase font-medium">
            {formattedDate}
          </div>
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-1.5 hover:text-black font-semibold transition-colors">
              <Share2 size={14} /> SHARE
            </button>
            <button className="flex items-center gap-1.5 hover:text-black font-semibold transition-colors">
              <MessageSquare size={14} /> DISCUSS
            </button>
            <button className="flex items-center gap-1.5 hover:text-black font-semibold transition-colors">
              <Bookmark size={14} /> SAVE
            </button>
          </div>
        </div>

        {/* Article Body Content (Professional Editorial Typography) */}
        <div 
          className="text-lg sm:text-xl text-[#1a1a1a] leading-[1.8] font-normal space-y-6"
          style={{ fontFamily: 'Georgia, serif', overflowWrap: 'break-word', wordBreak: 'break-word' }}
        >
          {magazine.body_md || magazine.excerpt}
        </div>

        {/* Bottom Author / Publication Signoff */}
        <div className="mt-16 pt-8 border-t border-gray-200 font-sans flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-sm font-bold text-gray-900">AXU-II Editorial Staff</div>
            <div className="text-xs text-gray-500 mt-0.5">Global Research, Business Blueprints & AI Execution Guides.</div>
          </div>
          <button 
            onClick={() => router.push('/magazine')}
            className="text-xs font-bold uppercase tracking-wider bg-black text-white px-4 py-2.5 rounded hover:bg-gray-800 transition-colors"
          >
            ← All Articles
          </button>
        </div>

      </main>
    </div>
  );
}