'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase';
import { 
  Calendar, 
  ArrowRight, 
  Search, 
  BookOpen, 
  X, 
  Info 
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
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tnlkispfkhdupnlcgsqu.supabase.co';
    const cleanPath = urlOrPath.replace(/^\/+/, '');
    return `${supabaseUrl}/storage/v1/object/public/magazine-images/${cleanPath}`;
  };

  const categories = ['All', 'News', 'Work Life', 'Technology', 'Leadership'];

  const filteredMagazines = magazines.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (item.excerpt && item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  const featuredArticle = filteredMagazines.length > 0 ? filteredMagazines[0] : null;
  const remainingArticles = filteredMagazines.length > 1 ? filteredMagazines.slice(1) : [];

  return (
    <div style={{ background: '#ffffff', color: '#111111', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* PROFESSIONAL CONTAINER LOCK WRAPPER */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 16px sm:padding: 40px 32px' }}>
        
        {/* TOP BRAND HEADER */}
        <div style={{ borderBottom: '2px solid #111111', paddingBottom: '20px', marginBottom: '32px', textAlign: 'center' }}>
          <div style={{ fontSize: '11px', color: '#b8860b', letterSpacing: '2px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
            AXU-II KNOWLEDGE OS
          </div>
          <h1 style={{ fontSize: '36px', fontWeight: 900, fontFamily: 'serif', letterSpacing: '-1px', margin: 0, textTransform: 'uppercase' }}>
            AXU-II MAGAZINE
          </h1>
        </div>

        {/* SEARCH & FILTERS BAR */}
        <div style={{ display: 'flex', flexDirection: 'column', md: { flexDirection: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '36px' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
            <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
            <input
              type="text"
              placeholder="Search news, insights or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px 12px 40px',
                background: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                color: '#111111',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', width: '100%', md: { width: 'auto' }, whiteSpace: 'nowrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  border: selectedCategory === cat ? '1px solid #111111' : '1px solid #e5e7eb',
                  background: selectedCategory === cat ? '#111111' : '#ffffff',
                  color: selectedCategory === cat ? '#ffffff' : '#374151',
                  flexShrink: 0,
                  transition: 'all 0.2s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* MAGAZINE CONTENT AREA */}
        {loading ? (
          <div style={{ padding: '80px 0', textAlign: 'center', color: '#6b7280', fontSize: '14px' }}>Loading editorial feed...</div>
        ) : filteredMagazines.length === 0 ? (
          <div style={{ padding: '60px 0', textAlign: 'center', border: '1px dashed #d1d5db', borderRadius: '8px', color: '#6b7280', fontSize: '14px' }}>
            ဆောင်းပါးများ မရှိသေးပါ။
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', lg: { gridTemplateColumns: '2fr 1fr' }, gap: '40px' }}>
            
            {/* MAIN COLUMN (Featured Hero + List) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              
              {/* FEATURED HERO ARTICLE */}
              {featuredArticle && (() => {
                const rawUrl = featuredArticle.source_urls && featuredArticle.source_urls.length > 0 ? featuredArticle.source_urls[0] : null;
                const imageUrl = getValidImageUrl(rawUrl || '');

                return (
                  <article style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '32px' }}>
                    {imageUrl && (
                      <div 
                        onClick={() => setDetailArticle(featuredArticle)}
                        style={{ width: '100%', height: '320px', background: '#f3f4f6', borderRadius: '6px', overflow: 'hidden', marginBottom: '20px', cursor: 'pointer' }}
                      >
                        <img 
                          src={imageUrl} 
                          alt={featuredArticle.title} 
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
                        />
                      </div>
                    )}

                    <div style={{ fontSize: '11px', fontWeight: 900, color: '#b8860b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                      FEATURED HERO • {new Date(featuredArticle.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>

                    <Link href={`/magazine/${featuredArticle.id}`} style={{ textDecoration: 'none' }}>
                      <h2 style={{ fontSize: '28px', fontFamily: 'serif', fontWeight: 800, color: '#111111', margin: '0 0 12px 0', lineHeight: '1.2', cursor: 'pointer' }}>
                        {featuredArticle.title}
                      </h2>
                    </Link>

                    {/* Strict Line Clamp to keep it smart */}
                    <p style={{ 
                      fontSize: '15px', 
                      color: '#4b5563', 
                      lineHeight: '1.6', 
                      margin: '0 0 20px 0',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {featuredArticle.excerpt || (featuredArticle.body_md ? featuredArticle.body_md.slice(0, 180) + '...' : '')}
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Link 
                        href={`/magazine/${featuredArticle.id}`} 
                        style={{ fontSize: '13px', color: '#111111', textDecoration: 'none', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                      >
                        Read Full Story <ArrowRight size={14} />
                      </Link>

                      <button 
                        onClick={() => setDetailArticle(featuredArticle)}
                        style={{ background: 'none', border: 'none', color: '#b8860b', fontSize: '13px', cursor: 'pointer', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                      >
                        <Info size={14} /> Quick Preview
                      </button>
                    </div>
                  </article>
                );
              })()}

              {/* REMAINING ARTICLES (Responsive Grid/List) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {remainingArticles.map((item) => {
                  const rawUrl = item.source_urls && item.source_urls.length > 0 ? item.source_urls[0] : null;
                  const imageUrl = getValidImageUrl(rawUrl || '');

                  return (
                    <article 
                      key={item.id}
                      style={{
                        borderBottom: '1px solid #f3f4f6',
                        paddingBottom: '24px',
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '20px',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between'
                      }}
                    >
                      {/* Text Section */}
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '10px', fontWeight: 900, color: '#666', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '6px' }}>
                          INSIGHTS • {new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>

                        <Link href={`/magazine/${item.id}`} style={{ textDecoration: 'none' }}>
                          <h3 style={{ fontSize: '18px', fontFamily: 'serif', fontWeight: 700, color: '#111111', margin: '0 0 8px 0', lineHeight: '1.3', cursor: 'pointer' }}>
                            {item.title}
                          </h3>
                        </Link>

                        <p style={{ 
                          fontSize: '13px', 
                          color: '#555', 
                          lineHeight: '1.5', 
                          margin: '0 0 12px 0', 
                          display: '-webkit-box', 
                          WebkitLineClamp: 2, 
                          WebkitBoxOrient: 'vertical', 
                          overflow: 'hidden' 
                        }}>
                          {item.excerpt || (item.body_md ? item.body_md.slice(0, 120) + '...' : '')}
                        </p>

                        <button 
                          onClick={() => setDetailArticle(item)}
                          style={{ background: 'none', border: 'none', color: '#b8860b', fontSize: '12px', fontWeight: 700, cursor: 'pointer', padding: 0 }}
                        >
                          Quick Preview
                        </button>
                      </div>

                      {/* Thumbnail Image */}
                      {imageUrl && (
                        <div 
                          onClick={() => setDetailArticle(item)}
                          style={{ width: '120px', minWidth: '120px', height: '90px', background: '#f3f4f6', borderRadius: '6px', overflow: 'hidden', cursor: 'pointer' }}
                        >
                          <img 
                            src={imageUrl} 
                            alt={item.title} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
                          />
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>

            </div>

            {/* SIDEBAR WIDGET (Editorial Standard) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '24px' }}>
                <h4 style={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', color: '#111', marginBottom: '12px' }}>
                  About AXU-II Magazine
                </h4>
                <p style={{ fontSize: '13px', color: '#555', lineHeight: '1.6', margin: 0 }}>
                  High-leverage analytical field notes, executive insights, and curated research publications engineered for solo founders and modern creators.
                </p>
              </div>
            </div>

          </div>
        )}

        {/* QUICK PREVIEW MODAL */}
        {detailArticle && (
          <div style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100vw', 
            height: '100vh', 
            background: 'rgba(0,0,0,0.6)', 
            backdropFilter: 'blur(4px)',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            zIndex: 100,
            padding: '16px'
          }}>
            <div style={{ 
              background: '#ffffff', 
              width: '100%', 
              maxWidth: '680px', 
              borderRadius: '10px', 
              padding: '32px', 
              boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
              position: 'relative',
              maxHeight: '85vh',
              overflowY: 'auto'
            }}>
              <button 
                onClick={() => setDetailArticle(null)}
                style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#6b7280' }}
              >
                <X size={22} />
              </button>

              <div style={{ fontSize: '11px', fontWeight: 900, color: '#b8860b', textTransform: 'uppercase', marginBottom: '8px' }}>
                AXU-II MAGAZINE • {new Date(detailArticle.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </div>

              <h2 style={{ fontSize: '24px', fontWeight: 800, fontFamily: 'serif', color: '#111111', marginBottom: '16px', lineHeight: '1.3' }}>
                {detailArticle.title}
              </h2>

              <div style={{ fontSize: '14px', color: '#374151', lineHeight: 1.8, whiteSpace: 'pre-wrap', marginBottom: '24px' }}>
                {detailArticle.body_md || detailArticle.excerpt || 'No content available.'}
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <Link 
                  href={`/magazine/${detailArticle.id}`}
                  style={{
                    flex: 1,
                    background: '#111111',
                    color: '#ffffff',
                    textDecoration: 'none',
                    padding: '12px',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: 700,
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <BookOpen size={15} /> Open Full Story Page
                </Link>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}