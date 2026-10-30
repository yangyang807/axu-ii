'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';
import { 
  BookOpen, 
  Search, 
  Download,
  Clock
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

          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0" style={{ whiteSpace: 'nowrap', scrollbarWidth: 'none' }}>
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

        {/* BOOK LIST (Mobile: Responsive Card View, Desktop: Clean Horizontal Layout) */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#777777', fontSize: '14px' }}>Loading published books...</div>
        ) : filteredBooks.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px 0', border: '1px dashed #d1d5db', borderRadius: '6px', color: '#777777', fontSize: '14px' }}>
            No books found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            {filteredBooks.map((book) => (
              <article 
                key={book.id}
                className="bg-white border border-gray-200 md:border-0 md:border-b md:border-gray-200 rounded-xl md:rounded-none overflow-hidden p-0 md:pb-6 shadow-sm md:shadow-none flex flex-col md:grid md:grid-cols-[1fr_200px] gap-4 md:gap-6 items-start"
              >
                {/* Book Cover Image */}
                <div className="w-full h-48 sm:h-56 md:h-[150px] overflow-hidden bg-gray-100 order-first md:order-last">
                  <img 
                    src={book.coverUrl} 
                    alt={book.title} 
                    className="w-full h-full object-cover block"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>

                {/* Content Details */}
                <div className="p-4 md:p-0 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between md:justify-start gap-2 mb-1.5">
                      <span className="text-[11px] font-bold text-[#b8860b] uppercase tracking-wider">
                        {book.category}
                      </span>
                      <span className="text-[11px] text-gray-400 font-medium">
                        • {book.publishedDate}
                      </span>
                    </div>

                    <h2 className="text-lg sm:text-xl md:text-2xl font-serif text-[#111111] font-semibold leading-snug mb-1">
                      {book.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-gray-500 font-medium mb-2 leading-relaxed">
                      {book.subtitle}
                    </p>

                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-4 line-clamp-3">
                      {book.summary}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 pt-2 border-t border-gray-100 md:border-0">
                    <button style={{
                      background: '#171a18',
                      color: '#ffffff',
                      border: 'none',
                      padding: '7px 14px',
                      borderRadius: '6px',
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
                        borderRadius: '6px',
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

              </article>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}