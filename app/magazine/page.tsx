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
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px', fontFamily: 'sans-serif' }}>
        
        {/* HEADER SECTION */}
        <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '20px', marginBottom: '32px' }}>
          <div style={{ fontSize: '11px', color: '#b8860b', letterSpacing: '1.5px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
            AXU-II KNOWLEDGE OS
          </div>
          <h1 style={{ fontSize: '32px', fontFamily: 'serif', margin: '0 0 8px 0', color: '#111111', fontWeight: 700 }}>
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {magazines.map((item) => {
              const rawUrl = item.source_urls && item.source_urls.length > 0 ? item.source_urls[0] : null;
              const imageUrl = getValidImageUrl(rawUrl || '');

              return (
                <article 
                  key={item.id}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'stretch'
                  }}
                >
                  {/* Content Section (ဘယ်ဘက်တွင် စာသားများပြမည်) */}
                  <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#b8860b', fontWeight: 700, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        <Calendar size={13} /> DAILY MAGAZINE • {new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>

                      {/* Title Click to Open Full Page */}
                      <Link href={`/magazine/${item.id}`} style={{ textDecoration: 'none' }}>
                        <h2 style={{ fontSize: '22px', fontFamily: 'serif', color: '#111111', margin: '0 0 10px 0', cursor: 'pointer', fontWeight: 700, lineHeight: '1.3' }}>
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

                  {/* Cover Image (ညာဘက်တွင် ပုံအရွယ်အစားကို 220px ဖြင့် သပ်ရပ်စွာ ထိန်းချုပ်ထားသည်) */}
                  {imageUrl && (
                    <div style={{ width: '220px', minWidth: '220px', backgroundColor: '#f3f4f6', overflow: 'hidden' }}>
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