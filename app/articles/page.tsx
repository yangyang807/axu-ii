'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';
import { 
  BookOpen, 
  Search, 
  Download 
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
      {/* Container တွင် padding များကို ဖုန်းနှင့် ကွန်ပျူတာအတွက် အံဝင်ခွင်ကျ သင့်တင့်စွာ ချိန်ညှိထားသည် */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', fontFamily: 'sans-serif' }} className="py-6 px-4 sm:py-10 sm:px-8">
        
        {/* HEADER SECTION */}
        <div style={{ borderBottom: '1px solid #e0e0e0', paddingBottom: '20px', marginBottom: '28px' }}>
          <div style={{ fontSize: '11px', color: '#b8860b', letterSpacing: '1.5px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
            ADMIN PUBLISHED KNOWLEDGE ASSETS
          </div>
          <h1 className="text-2xl sm:text-3xl" style={{ fontFamily: 'serif', margin: 0, color: '#111111', fontWeight: 700 }}>
            Business & AI Book Kit
          </h1>
          <p style={{ color: '#555555', fontSize: '14px', marginTop: '8px', lineHeight: '1.5' }}>
            Official books, research blueprints, and execution guides published via the Admin Console. Curated for immediate execution and high-leverage decision making.
          </p>
        </div>

        {/* SEARCH & FILTERS BAR */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div style={{ position: 'relative', width: '100%', maxWidth: '340px' }}>
            <Search size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
            <input
              type="text"
              placeholder="Search book title, author or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 14px 9px 38px',
                background: '#ffffff',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                color: '#111111',
                fontSize: '13px',
                outline: 'none'
              }}
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar" style={{ whiteSpace: 'nowrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '7px 12px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  border: selectedCategory === cat ? '1px solid #111111' : '1px solid #d1d5db',
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
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#777777', fontSize: '14px' }}>Loading published books...</div>
        ) : filteredBooks.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px 0', border: '1px dashed #d1d5db', borderRadius: '6px', color: '#777777', fontSize: '14px' }}>
            No books found.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {filteredBooks.map((book) => (
              <article 
                key={book.id}
                className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-5 pb-6 border-b border-gray-200 items-start"
              >
                <div>
                  <div style={{ fontSize: '11px', color: '#b8860b', fontWeight: 700, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {book.category} • {book.publishedDate}
                  </div>

                  <h2 className="text-xl sm:text-2xl" style={{ fontFamily: 'serif', color: '#111111', margin: '0 0 6px 0', fontWeight: 600, lineHeight: '1.3' }}>
                    {book.title}
                  </h2>

                  <p style={{ fontSize: '13px', color: '#666666', marginBottom: '10px', fontWeight: 500, lineHeight: '1.4' }}>
                    {book.subtitle}
                  </p>

                  <p style={{ 
                    color: '#333333', 
                    fontSize: '14px', 
                    lineHeight: '1.6', 
                    margin: '0 0 14px 0',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {book.summary}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <button style={{
                      background: '#171a18',
                      color: '#ffffff',
                      border: 'none',
                      padding: '7px 14px',
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
                        border: '1px solid #d1d5db',
                        color: book.downloadUrl ? '#374151' : '#9ca3af',
                        padding: '7px 14px',
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

                <div className="w-full h-44 md:h-[140px] overflow-hidden rounded-md bg-gray-100 order-first md:order-last">
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