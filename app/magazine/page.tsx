'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase';
import { Clock, ArrowRight, Sparkles } from 'lucide-react';

interface Magazine {
  id: string;
  title: string;
  excerpt?: string;
  body_md?: string;
  source_urls?: string[];
  created_at: string;
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
    <div className="min-h-screen bg-slate-50/50 text-slate-900 font-sans py-10 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* HEADER SECTION */}
        <div className="border-b border-slate-200/80 pb-6 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 text-xs font-bold tracking-wider uppercase">
            <Sparkles size={13} /> AXU-II KNOWLEDGE OS
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-slate-900">
            Daily Magazine & Global Insights
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl">
            Curated high-value articles and translated publications.
          </p>
        </div>

        {/* MAGAZINE LIST */}
        {loading ? (
          <div className="py-24 text-center text-slate-500 text-sm">
            Loading daily articles...
          </div>
        ) : magazines.length === 0 ? (
          <div className="py-16 text-center bg-white border border-dashed border-slate-300 rounded-xl text-slate-500 text-sm">
            မဂ္ဂဇင်း ဆောင်းပါးများ မရှိသေးပါ။
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {magazines.map((item) => {
              const rawUrl = item.source_urls && item.source_urls.length > 0 ? item.source_urls[0] : null;
              const imageUrl = getValidImageUrl(rawUrl || '');

              return (
                <article
                  key={item.id}
                  className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col md:flex-row gap-6 items-start group"
                >
                  {/* Left Content Area */}
                  <div className="flex-1 space-y-3 order-2 md:order-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-700 tracking-wide uppercase">
                      <span>DAILY MAGAZINE</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                      <span className="flex items-center gap-1 text-slate-400 font-normal">
                        <Clock size={12} /> {new Date(item.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    {/* TITLE CLICK TO OPEN FULL PAGE */}
                    <Link href={`/magazine/${item.id}`} className="group-hover:text-amber-700 transition-colors block">
                      <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 leading-snug">
                        {item.title}
                      </h2>
                    </Link>

                    {/* EXCERPT */}
                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                      {item.excerpt || (item.body_md ? item.body_md.slice(0, 180) + '...' : '')}
                    </p>

                    <div>
                      <Link 
                        href={`/magazine/${item.id}`} 
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 transition-colors group/link"
                      >
                        Read Full Article <ArrowRight size={13} className="group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>

                  {/* Right Thumbnail Image Area - Fixed Sized Professional Layout */}
                  {imageUrl && (
                    <div className="w-full md:w-[220px] h-48 md:h-[140px] overflow-hidden rounded-lg bg-slate-100 order-1 md:order-2 shrink-0 border border-slate-100">
                      <img
                        src={imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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