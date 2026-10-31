'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';
import { 
  BookOpen, 
  Search, 
  Download, 
  User, 
  Clock, 
  X,
  Info
} from 'lucide-react';

interface BookItem {
  id: string;
  title: string;
  subtitle?: string;
  author?: string;
  category: string;
  coverUrl: string;
  readTime: string;
  publishedDate: string;
  summary: string;
  downloadUrl?: string;
  fullContent?: string;
}

export default function BusinessAIBookKitPage() {
  const [books, setBooks] = useState<BookItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Detail Modal State
  const [detailBook, setDetailBook] = useState<BookItem | null>(null);

  const supabase = createClient();

  useEffect(() => {
    async function fetchBooks() {
      try {
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .eq('category', 'book')
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data) {
          const formattedBooks: BookItem[] = data.map((item) => ({
            id: item.id,
            title: item.title,
            subtitle: item.excerpt || 'Business & AI Execution Guide',
            author: 'Yang Karg',
            category: 'Business Strategy',
            coverUrl: item.source_urls && item.source_urls[0] ? item.source_urls[0] : 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop',
            readTime: '30 mins read',
            publishedDate: new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
            summary: item.excerpt || 'No summary provided.',
            downloadUrl: item.pdf_url || item.file_url || (item.source_urls && item.source_urls[1] ? item.source_urls[1] : undefined),
            fullContent: item.body_md || item.excerpt || 'Full chapter content will be updated soon.'
          }));
          setBooks(formattedBooks);
        }
      } catch (err) {
        console.error('Error fetching books:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, [supabase]);

  const categories = ['All', 'Business Strategy', 'AI & Automation', 'First-Principles', 'Monetization OS'];

  const filteredBooks = books.filter((book) => {
    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (book.subtitle && book.subtitle.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredBook = filteredBooks.length > 0 ? filteredBooks[0] : null;
  const remainingBooks = filteredBooks.length > 1 ? filteredBooks.slice(1) : [];

  return (
    <div style={{ background: '#ffffff', color: '#111111', minHeight: '100vh', padding: '24px 16px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* TOP BRAND HEADER */}
        <div style={{ borderBottom: '2px solid #111111', paddingBottom: '16px', marginBottom: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '10px', color: '#666', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>
            BUILD WITH EVIDENCE
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: 900, fontFamily: 'serif', letterSpacing: '-1px', margin: 0, textTransform: 'uppercase' }}>
            Business & AI Book Kit
          </h1>
        </div>

        {/* SEARCH & FILTERS BAR */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <Search size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
            <input
              type="text"
              placeholder="Search book title, author or keyword..."
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

        {/* BOOK LIST VIEW */}
        {loading ? (
          <div style={{ padding: '60px', textAlign: 'center', color: '#6b7280' }}>Loading published books...</div>
        ) : filteredBooks.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', border: '1px dashed #d1d5db', borderRadius: '6px', color: '#6b7280' }}>
            No books found.
          </div>
        ) : (
          <div>
            {/* FEATURED HERO BOOK (Top Big Image & Title) */}
            {featuredBook && (
              <article style={{ marginBottom: '36px', borderBottom: '1px solid #e5e7eb', paddingBottom: '24px' }}>
                <div 
                  onClick={() => setDetailBook(featuredBook)}
                  style={{ width: '100%', height: '240px', background: '#f3f4f6', borderRadius: '4px', overflow: 'hidden', marginBottom: '16px', cursor: 'pointer' }}
                >
                  <img 
                    src={featuredBook.coverUrl} 
                    alt={featuredBook.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
                  />
                </div>

                <div style={{ fontSize: '10px', fontWeight: 900, color: '#111', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>
                  FEATURED GUIDE • {featuredBook.readTime}
                </div>

                <h2 
                  onClick={() => setDetailBook(featuredBook)}
                  style={{ fontSize: '24px', fontFamily: 'serif', fontWeight: 800, color: '#111111', margin: '0 0 10px 0', lineHeight: '1.25', cursor: 'pointer' }}
                >
                  {featuredBook.title}
                </h2>

                <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.5', margin: '0 0 16px 0' }}>
                  {featuredBook.summary}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button 
                    onClick={() => setDetailBook(featuredBook)}
                    style={{ background: 'none', border: 'none', color: '#111', fontSize: '12px', textDecoration: 'none', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
                  >
                    <BookOpen size={14} /> Read Chapter
                  </button>

                  {featuredBook.downloadUrl && (
                    <button 
                      onClick={() => window.open(featuredBook.downloadUrl, '_blank')}
                      style={{ background: '#111', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', fontSize: '11px', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      <Download size={13} /> PDF
                    </button>
                  )}
                </div>
              </article>
            )}

            {/* REMAINING BOOKS (Row Style: Small Thumbnail Right / Text Left) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {remainingBooks.map((book) => (
                <article 
                  key={book.id}
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
                      {book.category} • {book.readTime}
                    </div>

                    <h3 
                      onClick={() => setDetailBook(book)}
                      style={{ fontSize: '16px', fontFamily: 'serif', fontWeight: 700, color: '#111111', margin: '0 0 6px 0', lineHeight: '1.3', cursor: 'pointer' }}
                    >
                      {book.title}
                    </h3>

                    <p style={{ fontSize: '12px', color: '#555', lineHeight: '1.4', margin: '0 0 10px 0', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {book.summary}
                    </p>

                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <button 
                        onClick={() => setDetailBook(book)}
                        style={{ background: 'none', border: 'none', color: '#111', fontSize: '11px', fontWeight: 700, cursor: 'pointer', padding: 0 }}
                      >
                        Read Chapter
                      </button>
                      {book.downloadUrl && (
                        <button 
                          onClick={() => window.open(book.downloadUrl, '_blank')}
                          style={{ background: 'none', border: 'none', color: '#666', fontSize: '11px', fontWeight: 600, cursor: 'pointer', padding: 0 }}
                        >
                          PDF
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Thumbnail Image (Right) */}
                  <div 
                    onClick={() => setDetailBook(book)}
                    style={{ width: '100px', minWidth: '100px', height: '80px', background: '#f3f4f6', borderRadius: '4px', overflow: 'hidden', cursor: 'pointer' }}
                  >
                    <img 
                      src={book.coverUrl} 
                      alt={book.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Book Chapter Modal */}
        {detailBook && (
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
                onClick={() => setDetailBook(null)}
                style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#6b7280' }}
              >
                <X size={20} />
              </button>

              <div style={{ fontSize: '10px', fontWeight: 900, color: '#111', textTransform: 'uppercase', marginBottom: '6px' }}>
                {detailBook.category} • {detailBook.readTime}
              </div>

              <h2 style={{ fontSize: '20px', fontWeight: 800, fontFamily: 'serif', color: '#111111', marginBottom: '12px' }}>
                {detailBook.title}
              </h2>

              <div style={{ fontSize: '13px', color: '#374151', lineHeight: 1.7, whiteSpace: 'pre-wrap', marginBottom: '20px' }}>
                {detailBook.fullContent}
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                {detailBook.downloadUrl && (
                  <button 
                    onClick={() => window.open(detailBook.downloadUrl, '_blank')}
                    style={{
                      flex: 1,
                      background: '#111111',
                      color: '#ffffff',
                      border: 'none',
                      padding: '10px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    <Download size={14} /> Download PDF Version
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}