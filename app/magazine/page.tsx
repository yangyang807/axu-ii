'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase';
import { 
  Search, 
  Menu, 
  X, 
  BookOpen, 
  TrendingUp, 
  ChevronDown 
} from 'lucide-react';

interface MagazineItem {
  id: string;
  title: string;
  subtitle?: string;
  excerpt?: string;
  body_md?: string;
  source_urls?: string[];
  created_at: string;
  category: string;
  pdf_url?: string;
  file_url?: string;
}

export default function MagazineListPage() {
  const [magazines, setMagazines] = useState<MagazineItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [visibleCount, setVisibleCount] = useState<number>(6);
  
  // Detail Modal State
  const [detailArticle, setDetailArticle] = useState<MagazineItem | null>(null);

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
    if (!urlOrPath) return 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=600&auto=format&fit=crop';
    if (urlOrPath.startsWith('http://') || urlOrPath.startsWith('https://')) {
      return urlOrPath;
    }
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'httpstnlkispfkhdupnlcgsqu.supabase.co';
    const cleanPath = urlOrPath.replace(/^\/+/, '');
    return `${supabaseUrl}/storage/v1/object/public/magazine-images/${cleanPath}`;
  };

  const categories = ['All', 'News', 'Tech', 'Business Strategy', 'Leadership', 'Work Life'];

  const filteredMagazines = magazines.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category?.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (item.excerpt && item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const heroArticle = filteredMagazines.length > 0 ? filteredMagazines[0] : null;
  const leftColumnArticles = filteredMagazines.slice(1, 4);
  const mostReadArticles = filteredMagazines.slice(0, 3);
  const extraStories = filteredMagazines.slice(4, visibleCount);
  const hasMoreStories = filteredMagazines.length > 4 && visibleCount < filteredMagazines.length;

  return (
    <div style={{ background: '#ffffff', color: '#111111', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif', overflowX: 'hidden' }}>
      
      {/* 1. TOP HEADER SECTION */}
      <div style={{ borderBottom: '1px solid #e5e7eb', padding: '16px 20px' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <Menu size={20} />
            </button>
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <Search size={18} />
            </button>
          </div>

          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '10px', fontWeight: 900, color: '#b8860b', letterSpacing: '1.5px', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>
              AXU-II KNOWLEDGE OS
            </span>
            <h1 style={{ fontSize: '18px', fontWeight: 900, fontFamily: 'serif', letterSpacing: '-0.5px', margin: 0, textTransform: 'uppercase' }}>
              AXU-II DAILY MAGAZINE
            </h1>
          </div>

          <div>
            <button style={{ background: '#111111', color: '#ffffff', border: 'none', padding: '8px 14px', borderRadius: '4px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', cursor: 'pointer' }}>
              Subscribe
            </button>
          </div>
        </div>

        {/* Expandable Search Input */}
        {isSearchOpen && (
          <div style={{ maxWidth: '600px', margin: '16px auto 0 auto', position: 'relative' }}>
            <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
            <input
              type="text"
              placeholder="Search news, tech or insights..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px 10px 38px',
                background: '#f9fafb',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '13px',
                outline: 'none'
              }}
              autoFocus
            />
          </div>
        )}
      </div>

      {/* 2. CATEGORY NAV BAR */}
      <div style={{ borderBottom: '1px solid #e5e7eb', background: '#ffffff', position: 'sticky', top: 0, zIndex: 20 }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 20px', display: 'flex', gap: '24px', overflowX: 'auto', paddingBottom: '10px', paddingTop: '10px', whiteSpace: 'nowrap' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setSelectedCategory(cat); setVisibleCount(6); }}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '11px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
                cursor: 'pointer',
                paddingBottom: '4px',
                borderBottom: selectedCategory === cat ? '2px solid #111111' : '2px solid transparent',
                color: selectedCategory === cat ? '#111111' : '#6b7280'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3. MAIN CONTENT CONTAINER */}
      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '20px 16px' }}>
        {loading ? (
          <div style={{ padding: '60px', textAlign: 'center', color: '#6b7280', fontSize: '14px' }}>Loading editorial feed...</div>
        ) : filteredMagazines.length === 0 ? (
          <div style={{ padding: '50px', textAlign: 'center', border: '1px dashed #d1d5db', borderRadius: '6px', color: '#6b7280', fontSize: '14px' }}>
            ဆောင်းပါးများ မရှိသေးပါ။
          </div>
        ) : (
          <div>
            <style dangerouslySetInnerHTML={{ __html: `
              .magazine-main-grid {
                display: flex;
                flex-direction: column;
                gap: 28px;
              }
              .hero-img {
                height: 240px;
              }
              .clamped-text {
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                overflow: hidden;
              }
              @media (min-width: 1024px) {
                .magazine-main-grid {
                  display: grid;
                  grid-template-columns: 1fr 1.7fr;
                  gap: 36px;
                  align-items: start;
                }
                .hero-img {
                  height: 360px;
                }
              }
            `}} />

            {/* TOP 2-COLUMN SECTION: LATEST INSIGHTS & FEATURED HERO */}
            <div className="magazine-main-grid">
              
              {/* 1. LEFT COLUMN: LATEST INSIGHTS */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', borderBottom: '1px solid #e5e7eb', paddingBottom: '24px' }} className="lg:border-b-0 lg:border-r lg:pr-8">
                <div style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #111', paddingBottom: '6px' }}>
                  Latest Insights
                </div>
                {leftColumnArticles.map((item) => (
                  <article key={item.id} style={{ borderBottom: '1px solid #f3f4f6', paddingBottom: '16px' }}>
                    <span style={{ fontSize: '9px', fontWeight: 800, color: '#6b7280', textTransform: 'uppercase' }}>
                      {item.category || 'NEWS'}
                    </span>
                    
                    {item.source_urls && item.source_urls[0] && (
                      <div 
                        onClick={() => setDetailArticle(item)}
                        style={{ width: '100%', height: '140px', background: '#f3f4f6', borderRadius: '4px', overflow: 'hidden', margin: '8px 0', cursor: 'pointer' }}
                      >
                        <img 
                          src={getValidImageUrl(item.source_urls[0])} 
                          alt={item.title} 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        />
                      </div>
                    )}

                    <h3 
                      onClick={() => setDetailArticle(item)}
                      style={{ fontSize: '15px', fontFamily: 'serif', fontWeight: 700, color: '#111111', margin: '4px 0 6px 0', lineHeight: '1.3', cursor: 'pointer' }}
                    >
                      {item.title}
                    </h3>
                    <p className="clamped-text" style={{ fontSize: '12px', color: '#4b5563', lineHeight: '1.5', margin: '0 0 8px 0', WebkitLineClamp: 2 }}>
                      {item.excerpt || item.body_md}
                    </p>

                    <Link 
                      href={`/magazine/${item.id}`}
                      style={{ fontSize: '11px', fontWeight: 800, color: '#111111', textDecoration: 'none', display: 'inline-block' }}
                    >
                      ဆောင်းပါး အပြည့်အစုံ ဖတ်ရန် &rarr;
                    </Link>
                  </article>
                ))}
              </div>

              {/* 2. RIGHT COLUMN: FEATURED HERO STORY */}
              {heroArticle && (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', color: '#6b7280', marginBottom: '8px' }}>
                    FEATURED STORY • {new Date(heroArticle.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>

                  <div 
                    onClick={() => setDetailArticle(heroArticle)}
                    className="hero-img"
                    style={{ width: '100%', background: '#f3f4f6', borderRadius: '4px', overflow: 'hidden', marginBottom: '16px', cursor: 'pointer' }}
                  >
                    <img 
                      src={getValidImageUrl(heroArticle.source_urls?.[0])} 
                      alt={heroArticle.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
                    />
                  </div>

                  <h2 
                    onClick={() => setDetailArticle(heroArticle)}
                    style={{ fontSize: '22px', fontFamily: 'serif', fontWeight: 900, color: '#111111', margin: '0 0 12px 0', lineHeight: '1.2', cursor: 'pointer' }}
                  >
                    {heroArticle.title}
                  </h2>

                  <p className="clamped-text" style={{ fontSize: '13px', color: '#4b5563', lineHeight: '1.6', margin: '0 0 16px 0' }}>
                    {heroArticle.excerpt || heroArticle.body_md}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f3f4f6', paddingTop: '12px' }}>
                    <Link 
                      href={`/magazine/${heroArticle.id}`}
                      style={{ fontSize: '12px', fontWeight: 800, color: '#111111', textDecoration: 'none' }}
                    >
                      ဆောင်းပါး အပြည့်အစုံ ဖတ်ရန် &rarr;
                    </Link>
                    <button 
                      onClick={() => setDetailArticle(heroArticle)}
                      style={{ background: 'none', border: 'none', fontSize: '11px', fontWeight: 700, color: '#b8860b', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <BookOpen size={13} /> Quick Preview
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* 3. MOST READ SECTION (PLACED FULL WIDTH AT THE BOTTOM) */}
            <div style={{ marginTop: '48px', borderTop: '2px solid #111111', paddingTop: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <span style={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>Most Read Stories</span>
                <TrendingUp size={16} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                {mostReadArticles.map((item, idx) => (
                  <div key={item.id} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', border: '1px solid #e5e7eb', padding: '16px', borderRadius: '6px', background: '#fafafa' }}>
                    <span style={{ fontSize: '28px', fontFamily: 'serif', fontWeight: 300, color: '#9ca3af', lineHeight: '1' }}>
                      0{idx + 1}
                    </span>
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: '9px', fontWeight: 800, color: '#6b7280', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                        {item.category || 'INSIGHTS'}
                      </span>
                      <h4 
                        onClick={() => setDetailArticle(item)}
                        className="clamped-text"
                        style={{ fontSize: '14px', fontFamily: 'serif', fontWeight: 700, color: '#111111', margin: '0 0 6px 0', lineHeight: '1.3', cursor: 'pointer', WebkitLineClamp: 2 }}
                      >
                        {item.title}
                      </h4>
                      <Link 
                        href={`/magazine/${item.id}`}
                        style={{ fontSize: '11px', fontWeight: 800, color: '#111111', textDecoration: 'none', display: 'inline-block' }}
                      >
                        ဆောင်းပါး အပြည့်အစုံ ဖတ်ရန် &rarr;
                      </Link>
                    </div>

                    <div 
                      onClick={() => setDetailArticle(item)}
                      style={{ width: '70px', minWidth: '70px', height: '60px', background: '#f3f4f6', borderRadius: '4px', overflow: 'hidden', cursor: 'pointer' }}
                    >
                      <img 
                        src={getValidImageUrl(item.source_urls?.[0])} 
                        alt="" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SEE MORE STORIES / ADDITIONAL ARTICLES SECTION */}
            {extraStories.length > 0 && (
              <div style={{ marginTop: '48px', borderTop: '2px solid #111111', paddingTop: '24px' }}>
                <div style={{ fontSize: '13px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '24px' }}>
                  More Stories & Archive
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
                  {extraStories.map((item) => (
                    <article key={item.id} style={{ border: '1px solid #e5e7eb', borderRadius: '6px', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#fafafa' }}>
                      <div>
                        {item.source_urls && item.source_urls[0] && (
                          <div 
                            onClick={() => setDetailArticle(item)}
                            style={{ width: '100%', height: '150px', background: '#f3f4f6', borderRadius: '4px', overflow: 'hidden', marginBottom: '12px', cursor: 'pointer' }}
                          >
                            <img src={getValidImageUrl(item.source_urls[0])} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                        )}
                        <span style={{ fontSize: '9px', fontWeight: 800, color: '#6b7280', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                          {item.category || 'MAGAZINE'}
                        </span>
                        <h3 
                          onClick={() => setDetailArticle(item)}
                          className="clamped-text"
                          style={{ fontSize: '15px', fontFamily: 'serif', fontWeight: 700, color: '#111111', margin: '0 0 8px 0', lineHeight: '1.3', cursor: 'pointer', WebkitLineClamp: 2 }}
                        >
                          {item.title}
                        </h3>
                        <p className="clamped-text" style={{ fontSize: '12px', color: '#4b5563', lineHeight: '1.5', margin: '0 0 12px 0' }}>
                          {item.excerpt || item.body_md}
                        </p>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Link 
                          href={`/magazine/${item.id}`}
                          style={{ fontSize: '11px', fontWeight: 800, color: '#111111', textDecoration: 'none' }}
                        >
                          ဆောင်းပါး အပြည့်အစုံ ဖတ်ရန် &rarr;
                        </Link>
                        <button 
                          onClick={() => setDetailArticle(item)}
                          style={{ background: '#111111', color: '#ffffff', border: 'none', padding: '6px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
                        >
                          Preview
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {/* SEE MORE / LOAD MORE BUTTON */}
            {hasMoreStories && (
              <div style={{ textAlign: 'center', marginTop: '36px' }}>
                <button 
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  style={{ background: '#ffffff', border: '1px solid #111111', color: '#111111', padding: '10px 24px', borderRadius: '4px', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  See More Stories <ChevronDown size={14} />
                </button>
              </div>
            )}

          </div>
        )}
      </div>

      {/* ARTICLE PREVIEW MODAL */}
      {detailArticle && (
        <div style={{ 
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '16px', boxSizing: 'border-box' 
        }}>
          <div style={{ 
            background: '#ffffff', width: '100%', maxWidth: '650px', 
            borderRadius: '8px', padding: '24px', position: 'relative', 
            maxHeight: '85vh', overflowY: 'auto', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)', boxSizing: 'border-box' 
          }}>
            <button 
              onClick={() => setDetailArticle(null)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}
            >
              <X size={20} />
            </button>

            <span style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', color: '#b8860b', letterSpacing: '1px', display: 'block', marginBottom: '6px' }}>
              AXU-II MAGAZINE PREVIEW
            </span>

            <h2 style={{ fontSize: '22px', fontFamily: 'serif', fontWeight: 800, marginBottom: '12px', lineHeight: '1.25' }}>
              {detailArticle.title}
            </h2>

            <div style={{ width: '100%', height: '220px', background: '#f3f4f6', borderRadius: '4px', overflow: 'hidden', marginBottom: '16px' }}>
              <img src={getValidImageUrl(detailArticle.source_urls?.[0])} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div style={{ fontSize: '13px', color: '#374151', lineHeight: '1.7', whiteSpace: 'pre-wrap', marginBottom: '24px' }}>
              {detailArticle.body_md || detailArticle.excerpt || 'ဆောင်းပါး အပြည့်အစုံ မရှိသေးပါ။'}
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <Link 
                href={`/magazine/${detailArticle.id}`}
                style={{ 
                  flex: 1, background: '#111111', color: '#ffffff', textAlign: 'center', 
                  padding: '10px', borderRadius: '4px', fontSize: '12px', fontWeight: 700, 
                  textDecoration: 'none', textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' 
                }}
              >
                <BookOpen size={14} /> ဆောင်းပါး အပြည့်အစုံ ဖတ်ရန်
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}