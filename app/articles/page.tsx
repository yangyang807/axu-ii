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
  
  // Detail Modal State for Reading Chapter / Summary
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

  return (
    <div style={{ background: '#f8f9fa', color: '#1a1a1a', minHeight: '100vh', padding: '32px 40px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        
        {/* Top Header Tag */}
        <div style={{ fontSize: '11px', color: '#b8860b', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px' }}>
          BUILD WITH EVIDENCE
        </div>

        {/* Title */}
        <h1 style={{ fontSize: '32px', fontWeight: 700, fontFamily: 'serif', color: '#111111', marginBottom: '12px' }}>
          Business & AI Book Kit
        </h1>

        {/* Subtitle Description */}
        <p style={{ color: '#666666', fontSize: '14px', maxWidth: '720px', lineHeight: 1.6, marginBottom: '28px' }}>
          Official books, research blueprints, and execution guides published via the Admin Console. Curated for immediate execution and high-leverage decision making.
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
              placeholder="Search book title, author or keyword..."
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

        {/* Book List View */}
        {loading ? (
          <div style={{ padding: '60px', textAlign: 'center', color: '#6b7280' }}>Loading published books...</div>
        ) : filteredBooks.length === 0 ? (
          <div style={{ padding: '60px', textAlign: 'center', background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#6b7280' }}>
            No books found. Publish items via the <strong>Admin Console</strong>.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {filteredBooks.map((book) => (
              <article 
                key={book.id}
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
                {/* Left Column: Cover Image */}
                <div 
                  onClick={() => setDetailBook(book)}
                  className="w-[140px] sm:w-[220px] min-w-[140px] sm:min-w-[220px]" 
                  style={{ backgroundColor: '#f3f4f6', overflow: 'hidden', cursor: 'pointer' }}
                >
                  <img 
                    src={book.coverUrl} 
                    alt={book.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>

                {/* Right Column: Content & Actions */}
                <div className="p-4 sm:p-6" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
                  <div>
                    {/* Category & Read Time */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#b8860b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        {book.category}
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#9ca3af' }}>
                        <Clock size={12} /> {book.readTime}
                      </div>
                    </div>

                    {/* Title */}
                    <h2 
                      onClick={() => setDetailBook(book)}
                      className="text-lg sm:text-2xl" 
                      style={{ fontFamily: 'serif', color: '#111111', fontWeight: 700, margin: '0 0 6px 0', lineHeight: '1.2', cursor: 'pointer' }}
                    >
                      {book.title}
                    </h2>

                    {/* Summary */}
                    <p className="text-xs sm:text-sm" style={{ color: '#4b5563', lineHeight: '1.5', margin: '0 0 12px 0', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {book.summary}
                    </p>

                    {/* Author & Date */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#4b5563', fontWeight: 500, marginBottom: '16px' }}>
                      <User size={12} style={{ color: '#b8860b' }} /> By {book.author} • {book.publishedDate}
                    </div>
                  </div>

                  {/* Actions: Read Chapter & PDF */}
                  <div style={{ paddingTop: '12px', borderTop: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button 
                      onClick={() => setDetailBook(book)}
                      style={{
                        flex: 1,
                        background: '#171a18',
                        color: '#ffffff',
                        border: 'none',
                        padding: '10px 18px',
                        borderRadius: '4px',
                        fontSize: '13px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
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
                        padding: '10px 18px',
                        borderRadius: '4px',
                        fontSize: '13px',
                        fontWeight: 600,
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

        {/* Book Chapter / Detail Modal */}
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
                onClick={() => setDetailBook(null)}
                style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#6b7280' }}
              >
                <X size={20} />
              </button>

              <div style={{ fontSize: '11px', color: '#b8860b', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
                {detailBook.category} • {detailBook.readTime}
              </div>

              <h2 style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'serif', color: '#111111', marginBottom: '12px' }}>
                {detailBook.title}
              </h2>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#6b7280', marginBottom: '20px' }}>
                <User size={13} style={{ color: '#b8860b' }} /> By {detailBook.author} • {detailBook.publishedDate}
              </div>

              <div style={{ fontSize: '14px', color: '#374151', lineHeight: 1.8, whiteSpace: 'pre-wrap', marginBottom: '24px' }}>
                {detailBook.fullContent}
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                {detailBook.downloadUrl && (
                  <button 
                    onClick={() => window.open(detailBook.downloadUrl, '_blank')}
                    style={{
                      flex: 1,
                      background: '#171a18',
                      color: '#ffffff',
                      border: 'none',
                      padding: '12px',
                      borderRadius: '6px',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    <Download size={15} /> Download PDF Version
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