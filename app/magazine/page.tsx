'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase';
import { 
  Search, 
  Menu, 
  X, 
  BookOpen, 
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
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  
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

  const getValidImageUrl = (urlOrPath?: string) => {
    if (!urlOrPath) return null;
    if (urlOrPath.startsWith('http://') || urlOrPath.startsWith('https://')) {
      return urlOrPath;
    }
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'httpstnlkispfkhdupnlcgsqu.supabase.co';
    const cleanPath = urlOrPath.replace(/^\/+/, '');
    return `${supabaseUrl}/storage/v1/object/public/magazine-images/${cleanPath}`;
  };

  const navCategories = ['NEWS', 'TECH', 'DESIGN', 'LEADERSHIP', 'WORK LIFE', 'VIDEO', 'PODCASTS', 'GAMES', 'EVENTS', 'PARTNER STORIES'];
  const topicBadges = ['ROBOTIC HOMEBUILDING', 'PLUG-IN SOLAR', 'SOCIAL SECURITY UPDATE', 'EMPLOYEE ENGAGEMENT HITS A NEW LOW'];

  const filteredMagazines = magazines.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (item.excerpt && item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  const heroArticle = filteredMagazines.length > 0 ? filteredMagazines[0] : null;
  const leftColumnArticles = filteredMagazines.slice(1, 4);
  const mostReadArticles = filteredMagazines.slice(0, 3);
  const mobileExtraArticles = filteredMagazines.slice(1, 5);

  return (
    <div className="bg-white text-[#111111] min-h-screen font-sans selection:bg-black selection:text-white">
      
      {/* 1. TOP UTILITY HEADER */}
      <header className="border-b border-gray-200">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between relative">
          
          {/* Left Actions */}
          <div className="flex items-center gap-4">
            <button className="p-1 hover:opacity-75 transition-opacity">
              <Menu size={22} className="text-black" />
            </button>
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)} 
              className="p-1 hover:opacity-75 transition-opacity"
            >
              <Search size={20} className="text-black" />
            </button>
          </div>

          {/* Center Main Magazine Title */}
          <div className="absolute left-1/2 -translate-x-1/2 text-center">
            <Link href="/magazine" className="inline-block">
              <h1 className="text-2xl sm:text-4xl font-black font-serif tracking-tight uppercase leading-none hover:opacity-90 transition-opacity">
                AXU-II DAILY MAGAZINE
              </h1>
            </Link>
          </div>

          {/* Right Action Button */}
          <div>
            <button className="bg-[#c2c2f7] hover:bg-[#b0b0f5] text-black font-bold text-xs tracking-wider px-4 py-2 uppercase transition-colors">
              SUBSCRIBE
            </button>
          </div>
        </div>

        {/* Expandable Search Input */}
        {isSearchOpen && (
          <div className="border-t border-gray-100 bg-gray-50 py-3 px-4 transition-all">
            <div className="max-w-[600px] mx-auto relative">
              <input
                type="text"
                placeholder="Search articles, news or insights..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2 text-sm bg-white border border-gray-300 rounded-none outline-none focus:border-black"
                autoFocus
              />
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* 2. CATEGORY NAVIGATION BAR */}
      <nav className="border-b border-gray-200 sticky top-0 bg-white z-30">
        <div className="max-w-[1360px] mx-auto px-4 overflow-x-auto scrollbar-none flex items-center justify-center sm:justify-start gap-6 py-3 whitespace-nowrap">
          {navCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs font-bold uppercase tracking-wider transition-colors ${
                selectedCategory === cat ? 'text-black border-b-2 border-black pb-0.5' : 'text-gray-600 hover:text-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </nav>

      {/* 3. LATEST TOPICS PILLS BAR */}
      <div className="border-b border-gray-100 py-2.5 bg-gray-50/50">
        <div className="max-w-[1360px] mx-auto px-4 flex items-center gap-3 overflow-x-auto scrollbar-none text-xs">
          <span className="font-bold text-red-600 whitespace-nowrap">Latest Topics</span>
          {topicBadges.map((topic, i) => (
            <span key={i} className="bg-white border border-gray-200 px-3 py-1 rounded-full text-[11px] font-semibold text-gray-700 whitespace-nowrap cursor-pointer hover:border-black">
              {topic}
            </span>
          ))}
        </div>
      </div>

      {/* 4. MAIN CONTENT GRID (Fast Company Replica) */}
      <main className="max-w-[1360px] mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {loading ? (
          <div className="py-24 text-center text-gray-400 text-sm font-serif">Loading editorial stories...</div>
        ) : filteredMagazines.length === 0 ? (
          <div className="py-24 text-center text-gray-500 text-sm border border-dashed border-gray-300">
            ဆောင်းပါးများ မရှိသေးပါ။
          </div>
        ) : (
          <div>
            {/* DESKTOP LAYOUT (3 COLUMNS) */}
            <div className="hidden lg:grid grid-cols-[300px_1fr_320px] gap-8 items-start">
              
              {/* LEFT COLUMN: News/Tech Feed */}
              <div className="flex flex-col gap-6 pr-6 border-r border-gray-200">
                {leftColumnArticles.map((item) => (
                  <article key={item.id} className="border-b border-gray-200 pb-6 last:border-0">
                    <span className="text-[11px] font-bold text-gray-500 tracking-wider uppercase block mb-1">
                      {item.category || 'NEWS'}
                    </span>
                    <h3 
                      onClick={() => setDetailArticle(item)}
                      className="text-lg font-bold font-serif leading-snug hover:underline cursor-pointer mb-2 text-black"
                    >
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                      {item.excerpt || item.body_md?.slice(0, 100)}
                    </p>
                  </article>
                ))}
              </div>

              {/* CENTER COLUMN: FEATURED HERO STORY */}
              {heroArticle && (
                <div className="flex flex-col px-4 border-r border-gray-200">
                  <span className="text-[11px] font-bold text-gray-500 tracking-wider uppercase mb-2">
                    {heroArticle.category || 'NEWS'}
                  </span>
                  
                  {/* HERO IMAGE CONTAINER (Controlled Zoom In / Limited Zoom Out) */}
                  {heroArticle.source_urls && heroArticle.source_urls[0] && (
                    <div 
                      onClick={() => setDetailArticle(heroArticle)}
                      className="w-full h-[380px] bg-gray-100 mb-5 overflow-hidden cursor-pointer group"
                    >
                      <img 
                        src={getValidImageUrl(heroArticle.source_urls[0]) || ''} 
                        alt={heroArticle.title} 
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    </div>
                  )}

                  <h2 
                    onClick={() => setDetailArticle(heroArticle)}
                    className="text-3xl xl:text-4xl font-serif font-black text-black hover:underline cursor-pointer mb-3 leading-tight"
                  >
                    {heroArticle.title}
                  </h2>
                  <p className="text-sm text-gray-700 leading-relaxed font-serif">
                    {heroArticle.excerpt || heroArticle.body_md?.slice(0, 220)}
                  </p>
                </div>
              )}

              {/* RIGHT COLUMN: MOST READ */}
              <div className="flex flex-col pl-2">
                <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-6">
                  <span className="text-xs font-black uppercase tracking-wider">Most Read &darr;</span>
                  <span className="text-xs text-gray-400 uppercase font-semibold cursor-pointer hover:text-black">For You</span>
                </div>

                <div className="flex flex-col gap-6">
                  {mostReadArticles.map((item, idx) => (
                    <div key={item.id} className="flex gap-4 items-start border-b border-gray-100 pb-5 last:border-0">
                      <span className="text-4xl font-serif font-light text-gray-300 leading-none">
                        {idx + 1}
                      </span>
                      <div className="flex-1">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                          {item.category || 'NEWS'}
                        </span>
                        <h4 
                          onClick={() => setDetailArticle(item)}
                          className="text-xs font-bold font-serif leading-snug hover:underline cursor-pointer text-black line-clamp-3"
                        >
                          {item.title}
                        </h4>
                      </div>
                      {item.source_urls && item.source_urls[0] && (
                        <div className="w-16 h-16 bg-gray-100 flex-shrink-0 overflow-hidden group cursor-pointer" onClick={() => setDetailArticle(item)}>
                          <img 
                            src={getValidImageUrl(item.source_urls[0]) || ''} 
                            alt="" 
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* MOBILE LAYOUT (Stacked as per mobile screenshot) */}
            <div className="flex lg:hidden flex-col gap-6">
              {heroArticle && (
                <article className="border-b border-gray-200 pb-6">
                  <span className="text-[10px] font-bold text-gray-500 tracking-wider uppercase block mb-1">
                    {heroArticle.category || 'NEWS'}
                  </span>
                  
                  {/* Hero Image */}
                  {heroArticle.source_urls && heroArticle.source_urls[0] && (
                    <div 
                      onClick={() => setDetailArticle(heroArticle)}
                      className="w-full h-[240px] bg-gray-100 mb-4 overflow-hidden cursor-pointer"
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
                    className="text-2xl font-serif font-black text-black leading-tight mb-2 active:text-gray-600"
                  >
                    {heroArticle.title}
                  </h2>
                  <p className="text-xs text-gray-700 leading-relaxed font-serif">
                    {heroArticle.excerpt || heroArticle.body_md?.slice(0, 150)}
                  </p>
                </article>
              )}

              {/* Mobile Feed Articles */}
              <div className="flex flex-col gap-6">
                {mobileExtraArticles.map((item) => (
                  <article key={item.id} className="border-b border-gray-200 pb-6">
                    <span className="text-[10px] font-bold text-gray-500 tracking-wider uppercase block mb-2">
                      {item.category || 'WORK LIFE'}
                    </span>
                    
                    <div className="flex gap-4">
                      {item.source_urls && item.source_urls[0] && (
                        <div 
                          onClick={() => setDetailArticle(item)}
                          className="w-24 h-24 bg-gray-100 flex-shrink-0 overflow-hidden cursor-pointer"
                        >
                          <img 
                            src={getValidImageUrl(item.source_urls[0]) || ''} 
                            alt="" 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                      )}
                      
                      <div className="flex-1">
                        <h3 
                          onClick={() => setDetailArticle(item)}
                          className="text-sm font-bold font-serif leading-snug text-black mb-1.5 active:text-gray-600"
                        >
                          {item.title}
                        </h3>
                        <p className="text-[11px] text-gray-600 leading-normal line-clamp-2">
                          {item.excerpt || item.body_md?.slice(0, 80)}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

          </div>
        )}
      </main>

      {/* ARTICLE PREVIEW MODAL */}
      {detailArticle && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-[680px] p-6 sm:p-8 relative max-h-[85vh] overflow-y-auto shadow-2xl border border-black">
            <button 
              onClick={() => setDetailArticle(null)}
              className="absolute top-4 right-4 p-2 text-gray-500 hover:text-black transition-colors"
            >
              <X size={20} />
            </button>
            <span className="text-[11px] font-bold uppercase tracking-widest text-red-600 block mb-2">
              {detailArticle.category || 'MAGAZINE STORY'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-black mb-4 leading-tight">
              {detailArticle.title}
            </h2>

            {detailArticle.source_urls && detailArticle.source_urls[0] && (
              <div className="w-full h-[250px] sm:h-[320px] bg-gray-100 mb-6 overflow-hidden">
                <img 
                  src={getValidImageUrl(detailArticle.source_urls[0]) || ''} 
                  alt={detailArticle.title}
                  className="w-full h-full object-cover" 
                />
              </div>
            )}

            <div className="text-xs sm:text-sm text-gray-800 leading-relaxed font-serif whitespace-pre-wrap mb-6">
              {detailArticle.body_md || detailArticle.excerpt || 'No detailed content available.'}
            </div>

            <div className="flex gap-4 border-t border-gray-200 pt-4">
              <Link 
                href={`/magazine/${detailArticle.id}`}
                className="w-full bg-black text-white text-center py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
              >
                <BookOpen size={14} /> Read Full Article
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}