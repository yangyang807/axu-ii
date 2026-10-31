'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase';
import { 
  Calendar, 
  ArrowRight, 
  Search, 
  BookOpen, 
  User, 
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

  const categories = ['All', 'Insights', 'Translation', 'Field Notes'];

  const filteredMagazines = magazines.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (item.excerpt && item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  return (
    <div style={{ background: '#f8f9fa', color: '#1a1a1a', minHeight: '100vh', padding: '32px 40px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        
        {/* Top Header Tag */}
        <div style={{ fontSize: '11px', color: '#b8860b', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px' }}>
          AXU-II KNOWLEDGE OS
        </div>

        {/* Title */}
        <h1 style={{ fontSize: '32px', fontWeight: 700, fontFamily: 'serif', color: '#111111', marginBottom: '12px' }}>
          Daily Magazine & Global Insights
        </h1>

        {/* Subtitle Description */}
        <p style={{ color: '#666666', fontSize: '14px', maxWidth: '720px', lineHeight: 1.6, marginBottom: '28px' }}>
          Curated high-value articles, translation publications, and deep-dive analytical field notes. Click any article to inspect insights or read full publication.
        </p>

        {/* Search and Filters Bar */}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          gap: '16px', 
          marginBottom: '32px'
        }}>
          {/* Search Bar */}
          <div style={{ position: 'relative', width: '380px' }}>
            <Search size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
            <input
              type="text"
              placeholder="Search magazine titles, insights or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px 10px 38px',
                background: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '4px',
                color: '#111111',
                fontSize: '13px',
                outline: 'none',
                boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
              }}
            />
          </div>

          {/* Filters Buttons */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '7px 14px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  border: selectedCategory === cat ? '1px solid #111111' : '1px solid #e5e7eb',
                  background: selectedCategory === cat ? '#171a18' : '#ffffff',
                  color: selectedCategory === cat ? '#ffffff' : '#4b5563',
                  transition: 'all 0.15s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Magazine List View */}
        {loading ? (
          <div style={{ padding: '60px', textAlign: 'center', color: '#6b7280' }}>Loading daily articles...</div>
        ) : filteredMagazines.length === 0 ? (
          <div style={{ padding: '60px', textAlign: 'center', background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#6b7280' }}>
            မဂ္ဂဇင်း ဆောင်းပါးများ မရှိသေးပါ။
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {filteredMagazines.map((item) => {
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
                  {/* Content Section */}
                  <div className="p-4 sm:p-6" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#b8860b', fontWeight: 700, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        <Calendar size={13} /> DAILY MAGAZINE • {new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>

                      {/* Title */}
                      <Link href={`/magazine/${item.id}`} style={{ textDecoration: 'none' }}>
                        <h2 className="text-lg sm:text-2xl" style={{ fontFamily: 'serif', color: '#111111', margin: '0 0 8px 0', cursor: 'pointer', fontWeight: 700, lineHeight: '1.2' }}>
                          {item.title}
                        </h2>
                      </Link>

                      {/* Excerpt */}
                      <p className="text-xs sm:text-sm" style={{ 
                        color: '#4b5563', 
                        lineHeight: '1.6', 
                        margin: '0 0 16px 0',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {item.excerpt || (item.body_md ? item.body_md.slice(0, 180) + '...' : '')}
                      </p>
                    </div>

                    <div style={{ paddingTop: '12px', borderTop: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Link 
                        href={`/magazine/${item.id}`} 
                        style={{ fontSize: '13px', color: '#171a18', textDecoration: 'none', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                      >
                        Read Full Article <ArrowRight size={14} />
                      </Link>

                      <button 
                        onClick={() => setDetailArticle(item)}
                        style={{ background: 'transparent', border: 'none', color: '#b8860b', fontSize: '12px', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                      >
                        <Info size={13} /> Quick Preview
                      </button>
                    </div>
                  </div>

                  {/* Cover Image */}
                  {imageUrl && (
                    <div className="w-[140px] sm:w-[220px] min-w-[140px] sm:min-w-[220px]" style={{ backgroundColor: '#f3f4f6', overflow: 'hidden' }}>
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
            zIndex: 100 
          }}>
            <div style={{ 
              background: '#ffffff', 
              width: '100%', 
              maxWidth: '640px', 
              borderRadius: '12px', 
              padding: '32px', 
              boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
              position: 'relative',
              maxHeight: '85vh',
              overflowY: 'auto'
            }}>
              <button 
                onClick={() => setDetailArticle(null)}
                style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#6b7280' }}
              >
                <X size={20} />
              </button>

              <div style={{ fontSize: '11px', color: '#b8860b', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
                DAILY MAGAZINE • {new Date(detailArticle.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </div>

              <h2 style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'serif', color: '#111111', marginBottom: '16px' }}>
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
                    background: '#171a18',
                    color: '#ffffff',
                    textDecoration: 'none',
                    padding: '12px',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: 600,
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <BookOpen size={15} /> Open Full Article Page
                </Link>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}