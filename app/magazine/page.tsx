'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase';
import { Calendar, ArrowRight } from 'lucide-react';

interface Magazine {
  id: string;
  title: string;
  excerpt?: string;
  body_md?: string;
  source_urls?: string[];
  created_at: string;
  category: string;
}

export default function MagazineListPage() {
  const [magazines, setMagazines] = useState<Magazine[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchMagazines() {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('status', 'published')
        .eq('category', 'magazine')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setMagazines(data);
      }
      setLoading(false);
    }

    fetchMagazines();
  }, [supabase]);

  const getValidImageUrl = (urlOrPath: string) => {
    if (!urlOrPath) return null;
    if (urlOrPath.startsWith('http://') || urlOrPath.startsWith('https://')) {
      return urlOrPath;
    }
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tnlkispfkhdupnlcgsqu.supabase.co';
    const cleanPath = urlOrPath.replace(/^\/+/, '');
    return `${supabaseUrl}/storage/v1/object/public/magazine-images/${cleanPath}`;
  };

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', color: '#111111' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', fontFamily: 'sans-serif' }} className="py-6 px-4 sm:py-10 sm:px-6">
        
        {/* HEADER SECTION */}
        <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '20px', marginBottom: '28px' }}>
          <div style={{ fontSize: '11px', color: '#b8860b', letterSpacing: '1.5px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
            AXU-II KNOWLEDGE OS
          </div>
          <h1 className="text-2xl sm:text-3xl" style={{ fontFamily: 'serif', margin: '0 0 8px 0', color: '#111111', fontWeight: 700 }}>
            Daily Magazine & Global Insights
          </h1>
          <p style={{ color: '#555555', fontSize: '14px', margin: 0, lineHeight: '1.5' }}>
            Curated high-value articles, translation publications, and deep-dive analytical field notes.
          </p>
        </div>

        {/* MAGAZINE LIST */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#777777', fontSize: '14px' }}>Loading daily articles...</div>
        ) : magazines.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', border: '1px dashed #d1d5db', borderRadius: '6px', color: '#777777', fontSize: '14px' }}>
            မဂ္ဂဇင်း ဆောင်းပါးများ မရှိသေးပါ။
          </div>
        ) : (
          <div className="flex flex-col gap-6 sm:gap-8">
            {magazines.map((item) => {
              const rawUrl = item.source_urls && item.source_urls.length > 0 ? item.source_urls[0] : null;
              const imageUrl = getValidImageUrl(rawUrl || '');

              return (
                <article 
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm flex flex-col md:flex-row items-stretch"
                >
                  {/* Content Section (ဖုန်းတွင် အပေါ်၊ ကွန်ပျူတာတွင် ဘယ်ဘက်) */}
                  <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#b8860b', fontWeight: 700, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        <Calendar size={13} /> DAILY MAGAZINE • {new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>

                      {/* Title Click to Open Full Page */}
                      <Link href={`/magazine/${item.id}`} style={{ textDecoration: 'none' }}>
                        <h2 className="text-xl sm:text-2xl" style={{ fontFamily: 'serif', color: '#111111', margin: '0 0 10px 0', cursor: 'pointer', fontWeight: 700, lineHeight: '1.3' }}>
                          {item.title}
                        </h2>
                      </Link>

                      {/* Excerpt */}
                      <p style={{ 
                        color: '#4b5563', 
                        fontSize: '14px', 
                        lineHeight: '1.6', 
                        margin: '0 0 16px 0',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {item.excerpt || (item.body_md ? item.body_md.slice(0, 180) + '...' : '')}
                      </p>
                    </div>

                    <div style={{ paddingTop: '16px', borderTop: '1px solid #f3f4f6' }}>
                      <Link 
                        href={`/magazine/${item.id}`} 
                        style={{ fontSize: '13px', color: '#171a18', textDecoration: 'none', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                      >
                        Read Full Article <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>

                  {/* Cover Image (ဖုန်းတွင် အောက်၊ ကွန်ပျူတာတွင် ညာဘက် Size 220px) */}
                  {imageUrl && (
                    <div className="w-full h-48 sm:h-64 md:h-auto md:w-[220px] md:min-w-[220px]" style={{ backgroundColor: '#f3f4f6', overflow: 'hidden' }}>
                      <img 
                        src={imageUrl} 
                        alt={item.title} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}

                </article>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}