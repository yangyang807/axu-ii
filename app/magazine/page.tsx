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

  // Fast Company style: First article is featured hero, rest are list items
  const featuredArticle = filteredMagazines.length > 0 ? filteredMagazines[0] : null;
  const remainingArticles = filteredMagazines.length > 1 ? filteredMagazines.slice(1) : [];

  return (
    <div style={{ background: '#ffffff', color: '#111111', minHeight: '100vh', padding: '24px 16px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* TOP BRAND HEADER (Fast Company Style) */}
        <div style={{ borderBottom: '2px solid #111111', paddingBottom: '16px', marginBottom: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '10px', color: '#666', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>
            AXU-II KNOWLEDGE OS
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: 900, fontFamily: 'serif', letterSpacing: '-1px', margin: 0, textTransform: 'uppercase' }}>
            FAST COMPANY
          </h1>
        </div>

        {/* SEARCH & FILTERS BAR */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <Search size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
            <input
              type="text"
              placeholder="Search news, insights or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px 10px 38px',
                background: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '4px',
                color: '#111111',
                fontSize: '13px',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', whiteSpace: 'nowrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  border: selectedCategory === cat ? '1px solid #111111' : '1px solid #e5e7eb',
                  background: selectedCategory === cat ? '#111111' : '#ffffff',
                  color: selectedCategory === cat ? '#ffffff' : '#374151',
                  flexShrink: 0
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* MAGAZINE LIST VIEW */}
        {loading ? (
          <div style={{ padding: '60px', textAlign: 'center', color: '#6b7280' }}>Loading feed...</div>
        ) : filteredMagazines.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', border: '1px dashed #d1d5db', borderRadius: '6px', color: '#6b7280' }}>
            ဆောင်းပါးများ မရှိသေးပါ။
          </div>
        ) : (
          <div>
            {/* FEATURED HERO ARTICLE (Top Big Image & Title like Fast Company) */}
            {featuredArticle && (() => {
              const rawUrl = featuredArticle.source_urls && featuredArticle.source_urls.length > 0 ? featuredArticle.source_urls[0] : null;
              const imageUrl = getValidImageUrl(rawUrl || '');

              return (
                <article style={{ marginBottom: '36px', borderBottom: '1px solid #e5e7eb', paddingBottom: '24px' }}>
                  {imageUrl && (
                    <div 
                      onClick={() => setDetailArticle(featuredArticle)}
                      style={{ width: '100%', height: '240px', background: '#f3f4f6', borderRadius: '4px', overflow: 'hidden', marginBottom: '16px', cursor: 'pointer' }}
                    >
                      <img 
                        src={imageUrl} 
                        alt={featuredArticle.title} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
                      />
                    </div>
                  )}

                  <div style={{ fontSize: '10px', fontWeight: 900, color: '#111', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>
                    FEATURED • {new Date(featuredArticle.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>

                  <Link href={`/magazine/${featuredArticle.id}`} style={{ textDecoration: 'none' }}>
                    <h2 style={{ fontSize: '24px', fontFamily: 'serif', fontWeight: 800, color: '#111111', margin: '0 0 10px 0', lineHeight: '1.25', cursor: 'pointer' }}>
                      {featuredArticle.title}
                    </h2>
                  </Link>

                  <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.5', margin: '0 0 16px 0' }}>
                    {featuredArticle.excerpt || (featuredArticle.body_md ? featuredArticle.body_md.slice(0, 140) + '...' : '')}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Link 
                      href={`/magazine/${featuredArticle.id}`} 
                      style={{ fontSize: '12px', color: '#111111', textDecoration: 'none', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      Read Story <ArrowRight size={13} />
                    </Link>

                    <button 
                      onClick={() => setDetailArticle(featuredArticle)}
                      style={{ background: 'none', border: 'none', color: '#666', fontSize: '12px', cursor: 'pointer', fontWeight: 600 }}
                    >
                      Quick Preview
                    </button>
                  </div>
                </article>
              );
            })()}

            {/* REMAINING ARTICLES (Fast Company Row Style: Small Thumbnail Right / Text Left on Mobile) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {remainingArticles.map((item) => {
                const rawUrl = item.source_urls && item.source_urls.length > 0 ? item.source_urls[0] : null;
                const imageUrl = getValidImageUrl(rawUrl || '');

                return (
                  <article 
                    key={item.id}
                    style={{
                      borderBottom: '1px solid #f3f4f6',
                      paddingBottom: '20px',
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '16px',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between'
                    }}
                  >
                    {/* Text Section (Left) */}
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '9px', fontWeight: 900, color: '#666', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '4px' }}>
                        WORK LIFE • {new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>

                      <Link href={`/magazine/${item.id}`} style={{ textDecoration: 'none' }}>
                        <h3 style={{ fontSize: '16px', fontFamily: 'serif', fontWeight: 700, color: '#111111', margin: '0 0 6px 0', lineHeight: '1.3', cursor: 'pointer' }}>
                          {item.title}
                        </h3>
                      </Link>

                      <p style={{ fontSize: '12px', color: '#555', lineHeight: '1.4', margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {item.excerpt || (item.body_md ? item.body_md.slice(0, 100) + '...' : '')}
                      </p>
                    </div>

                    {/* Thumbnail Image (Right - 100px width fixed for compact mobile layout) */}
                    {imageUrl && (
                      <div 
                        onClick={() => setDetailArticle(item)}
                        style={{ width: '100px', minWidth: '100px', height: '80px', background: '#f3f4f6', borderRadius: '4px', overflow: 'hidden', cursor: 'pointer' }}
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
        )}

        {/* Quick Preview Modal */}
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
              maxWidth: '600px', 
              borderRadius: '8px', 
              padding: '24px', 
              boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
              position: 'relative',
              maxHeight: '85vh',
              overflowY: 'auto'
            }}>
              <button 
                onClick={() => setDetailArticle(null)}
                style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#6b7280' }}
              >
                <X size={20} />
              </button>

              <div style={{ fontSize: '10px', fontWeight: 900, color: '#111', textTransform: 'uppercase', marginBottom: '6px' }}>
                FAST COMPANY • {new Date(detailArticle.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </div>

              <h2 style={{ fontSize: '20px', fontWeight: 800, fontFamily: 'serif', color: '#111111', marginBottom: '12px' }}>
                {detailArticle.title}
              </h2>

              <div style={{ fontSize: '13px', color: '#374151', lineHeight: 1.7, whiteSpace: 'pre-wrap', marginBottom: '20px' }}>
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
                    padding: '10px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 700,
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <BookOpen size={14} /> Open Full Story
                </Link>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}