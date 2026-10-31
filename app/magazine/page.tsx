'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase';
import { 
  Search, 
  BookOpen, 
  X, 
  Info, 
  TrendingUp 
} from 'lucide-react';

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
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Detail Modal State
  const [detailArticle, setDetailArticle] = useState<Magazine | null>(null);

  const supabase = createClient();

  useEffect(() => {
    async function fetchMagazines() {
      try {
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .eq('status', 'published')
          .eq('category', 'magazine')
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data) {
          setMagazines(data);
        }
      } catch (err) {
        console.error('Error fetching magazines:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchMagazines();
  }, [supabase]);

  const getValidImageUrl = (urlOrPath: string) => {
    if (!urlOrPath) return null;
    if (urlOrPath.startsWith('http://') || urlOrPath.startsWith('https://')) {
      return urlOrPath;
    }
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'httpstnlkispfkhdupnlcgsqu.supabase.co';
    const cleanPath = urlOrPath.replace(/^\/+/, '');
    return `${supabaseUrl}/storage/v1/object/public/magazine-images/${cleanPath}`;
  };

  const categories = ['All', 'News', 'Tech', 'Work Life', 'Leadership'];

  const filteredMagazines = magazines.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (item.excerpt && item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  const leftColumnArticles = filteredMagazines.slice(1, 3);
  const heroArticle = filteredMagazines.length > 0 ? filteredMagazines[0] : null;
  const mostReadArticles = filteredMagazines.slice(0, 3);

  return (
    <div style={{ background: '#ffffff', color: '#111111', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* TOP HEADER SECTION */}
      <div className="border-b border-gray-300 py-4 px-4 sm:px-8">
        <div className="max-w-[1300px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <span className="text-[10px] font-bold text-[#b8860b] uppercase tracking-widest">AXU-II KNOWLEDGE OS</span>
            <h1 className="text-2xl sm:text-4xl font-black font-serif tracking-tight uppercase">AXU-II MAGAZINE</h1>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-[280px]">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search news, tech or insights..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-gray-50 border border-gray-300 rounded text-xs outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* CATEGORY NAV BAR */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-20 shadow-sm">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-8 flex gap-6 overflow-x-auto py-2.5 whitespace-nowrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs font-bold uppercase tracking-wider cursor-pointer pb-1 border-b-2 transition-all ${
                selectedCategory === cat ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT CONTAINER (3-COLUMN FAST COMPANY GRID) */}
      <div className="max-w-[1300px] mx-auto p-4 sm:p-8">
        {loading ? (
          <div className="py-20 text-center text-gray-500 text-sm">Loading editorial feed...</div>
        ) : filteredMagazines.length === 0 ? (
          <div className="py-20 text-center text-gray-500 text-sm border border-dashed border-gray-300 rounded">ဆောင်းပါးများ မရှိသေးပါ။</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr_1fr] gap-8 items-start">
            
            {/* LEFT COLUMN: NEWS & TECH LIST */}
            <div className="flex flex-col gap-6 border-b lg:border-b-0 lg:border-r border-gray-200 pb-8 lg:pb-0 lg:pr-8">
              <div className="text-[11px] font-black uppercase tracking-widest text-black border-b border-black pb-1">
                News & Tech
              </div>
              {leftColumnArticles.length === 0 ? (
                <p className="text-xs text-gray-400">Additional stories will appear here.</p>
              ) : (
                leftColumnArticles.map((item) => (
                  <article key={item.id} className="border-b border-gray-100 pb-5">
                    <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">{item.category || 'NEWS'}</span>
                    <h3 
                      onClick={() => setDetailArticle(item)}
                      className="text-base font-serif font-bold text-black hover:underline mt-1 mb-2 cursor-pointer leading-snug"
                    >
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                      {item.excerpt || item.body_md?.slice(0, 90)}
                    </p>
                  </article>
                ))
              )}
            </div>

            {/* CENTER COLUMN: FEATURED HERO STORY */}
            {heroArticle && (
              <div className="flex flex-col border-b lg:border-b-0 lg:border-r border-gray-200 pb-8 lg:pb-0 lg:pr-8">
                {heroArticle.source_urls && heroArticle.source_urls[0] && (
                  <div 
                    onClick={() => setDetailArticle(heroArticle)}
                    className="w-full h-[260px] sm:h-[340px] bg-gray-100 mb-4 overflow-hidden rounded cursor-pointer"
                  >
                    <img 
                      src={getValidImageUrl(heroArticle.source_urls[0]) || ''} 
                      alt={heroArticle.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <h2 
                  onClick={() => setDetailArticle(heroArticle)}
                  className="text-xl sm:text-3xl font-serif font-black text-black hover:underline cursor-pointer mb-3 leading-tight"
                >
                  {heroArticle.title}
                </h2>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-4 line-clamp-3">
                  {heroArticle.excerpt || heroArticle.body_md?.slice(0, 200)}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <Link href={`/magazine/${heroArticle.id}`} className="text-xs font-bold text-black hover:underline flex items-center gap-1">
                    Read Full Story &rarr;
                  </Link>
                  <button 
                    onClick={() => setDetailArticle(heroArticle)}
                    className="text-xs font-semibold text-[#b8860b] flex items-center gap-1 cursor-pointer"
                  >
                    <Info size={13} /> Quick Preview
                  </button>
                </div>
              </div>
            )}

            {/* RIGHT COLUMN: MOST READ SIDEBAR */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-black pb-1">
                <span className="text-[11px] font-black uppercase tracking-widest text-black">Most Read</span>
                <TrendingUp size={14} className="text-black" />
              </div>

              <div className="flex flex-col gap-5">
                {mostReadArticles.map((item, idx) => (
                  <div key={item.id} className="flex gap-4 items-start border-b border-gray-100 pb-4">
                    <span className="text-2xl font-serif font-black text-gray-300">0{idx + 1}</span>
                    <div className="flex-1">
                      <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">{item.category || 'INSIGHTS'}</span>
                      <h4 
                        onClick={() => setDetailArticle(item)}
                        className="text-xs sm:text-sm font-serif font-bold text-black hover:underline cursor-pointer mt-0.5 leading-snug line-clamp-2"
                      >
                        {item.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </div>

      {/* ARTICLE PREVIEW MODAL */}
      {detailArticle && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-[650px] rounded-lg p-6 sm:p-8 relative max-h-[85vh] overflow-y-auto shadow-2xl">
            <button 
              onClick={() => setDetailArticle(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-black cursor-pointer"
            >
              <X size={20} />
            </button>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#b8860b] block mb-2">AXU-II MAGAZINE PREVIEW</span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-black mb-4 leading-tight">{detailArticle.title}</h2>
            <div className="text-xs sm:text-sm text-gray-700 leading-relaxed whitespace-pre-wrap mb-6">
              {detailArticle.body_md || detailArticle.excerpt || 'No content available.'}
            </div>
            <div className="flex gap-3">
              <Link 
                href={`/magazine/${detailArticle.id}`}
                className="flex-1 bg-black text-white text-center py-2.5 rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-gray-800"
              >
                <BookOpen size={14} /> Open Full Story Page
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}