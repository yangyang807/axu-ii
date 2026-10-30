'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';
import { Search, BookOpen, Download } from 'lucide-react';

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
}

export default function BusinessAIBookKitPage() {
  const [books, setBooks] = useState<BookItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

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
            downloadUrl: item.pdf_url || item.file_url || (item.source_urls && item.source_urls[1] ? item.source_urls[1] : undefined)
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

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', color: '#111111' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 24px', fontFamily: 'sans-serif' }}>
        
        {/* HEADER SECTION */}
        <div style={{ borderBottom: '1px solid #e0e0e0', paddingBottom: '24px', marginBottom: '32px' }}>
          <div style={{ fontSize: '12px', color: '#b8860b', letterSpacing: '2px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
            ADMIN PUBLISHED KNOWLEDGE ASSETS
          </div>
          <h1 style={{ fontSize: '32px', fontFamily: 'serif', margin: 0, color: '#111111', fontWeight: 700 }}>
            Business & AI Book Kit
          </h1>
          <p style={{ color: '#555555', fontSize: '15px', marginTop: '10px' }}>
            Official books, research blueprints, and execution guides published via the Admin Console. Curated for immediate execution and high-leverage decision making.
          </p>
        </div>

        {/* SEARCH & FILTERS BAR */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div style={{ position: 'relative', width: '100%', maxWidth: '340px' }}>
            <Search size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
            <input
              type="text"
              placeholder="Search book title, author or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px 10px 38px',
                background: '#ffffff',
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                color: '#111111',
                fontSize: '13px',
                outline: 'none'
              }}
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0" style={{ whiteSpace: 'nowrap', scrollbarWidth: 'none' }}>
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
                  border: selectedCategory === cat ? '1px solid #111111' : '1px solid #e0e0e0',
                  background: selectedCategory === cat ? '#171a18' : '#ffffff',
                  color: selectedCategory === cat ? '#ffffff' : '#4b5563',
                  flexShrink: 0
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* BOOK LIST */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#777777' }}>Loading published books...</div>
        ) : filteredBooks.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', border: '1px dashed #cccccc', color: '#777777' }}>
            No books found.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {filteredBooks.map((book) => (
              <article 
                key={book.id}
                className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-6 pb-8 border-b border-gray-200 items-start"
              >
                <div>
                  <div style={{ fontSize: '12px', color: '#b8860b', fontWeight: 700, marginBottom: '8px', textTransform: 'uppercase' }}>
                    {book.category} • {book.publishedDate}
                  </div>

                  <h2 style={{ fontSize: '22px', fontFamily: 'serif', color: '#111111', margin: '0 0 8px 0', fontWeight: 600 }}>
                    {book.title}
                  </h2>

                  <p style={{ fontSize: '13px', color: '#666666', marginBottom: '12px', fontWeight: 500 }}>
                    {book.subtitle}
                  </p>

                  <p style={{ 
                    color: '#333333', 
                    fontSize: '15px', 
                    lineHeight: '1.6', 
                    margin: '0 0 16px 0',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {book.summary}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                    <button style={{
                      background: '#171a18',
                      color: '#ffffff',
                      border: 'none',
                      padding: '6px 14px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <BookOpen size={13} /> Read Chapter
                    </button>

                    <button 
                      onClick={() => {
                        if (book.downloadUrl) {
                          window.open(book.downloadUrl, '_blank');
                        } else {
                          alert('PDF link not available for this book yet.');
                        }
                      }}
                      style={{
                        background: '#ffffff',
                        border: '1px solid #e0e0e0',
                        color: book.downloadUrl ? '#374151' : '#9ca3af',
                        padding: '6px 14px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: 500,
                        cursor: book.downloadUrl ? 'pointer' : 'not-allowed',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <Download size={13} /> PDF
                    </button>
                  </div>
                </div>

                <div className="w-full h-48 md:h-[150px] overflow-hidden rounded-md bg-gray-100 order-first md:order-last">
                  <img 
                    src={book.coverUrl} 
                    alt={book.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}