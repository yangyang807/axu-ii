'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';
import { 
  BookOpen, 
  Search, 
  Download, 
  User, 
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
    fetchBooks();
  }, []);

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

  const categories = ['All', 'Business Strategy', 'AI & Automation', 'First-Principles', 'Monetization OS'];

  const filteredBooks = books.filter((book) => {
    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (book.subtitle && book.subtitle.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ background: '#f8f9fa', color: '#1a1a1a', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif', width: '100%', overflowX: 'hidden', boxSizing: 'border-box' }} className="py-6 px-5 sm:py-10 sm:px-8">
      <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        
        {/* Top Header Tag */}
        <div style={{ fontSize: '11px', color: '#c9b17b', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px' }}>
          ADMIN PUBLISHED KNOWLEDGE ASSETS
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl" style={{ fontWeight: 700, fontFamily: 'serif', color: '#111111', marginBottom: '12px', overflowWrap: 'break-word', wordBreak: 'break-word' }}>
          Business & AI Book Kit
        </h1>

        {/* Subtitle Description */}
        <p style={{ color: '#666666', fontSize: '14px', maxWidth: '720px', lineHeight: 1.6, marginBottom: '28px', overflowWrap: 'break-word', wordBreak: 'break-word' }}>
          Official books, research blueprints, and execution guides published via the Admin Console. Curated for immediate execution and high-leverage decision making.
        </p>

        {/* Search and Filters Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          {/* Search Bar */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '380px', boxSizing: 'border-box' }}>
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
                borderRadius: '6px',
                color: '#111111',
                fontSize: '13px',
                outline: 'none',
                boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Filters Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto" style={{ whiteSpace: 'nowrap', scrollbarWidth: 'none' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '7px 14px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  border: selectedCategory === cat ? '1px solid #111111' : '1px solid #e5e7eb',
                  background: selectedCategory === cat ? '#171a18' : '#ffffff',
                  color: selectedCategory === cat ? '#ffffff' : '#4b5563',
                  transition: 'all 0.15s ease',
                  flexShrink: 0
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Loading & Empty States */}
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280', fontSize: '14px' }}>Loading published books from database...</div>
        ) : filteredBooks.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#6b7280', fontSize: '14px' }}>
            No books found. Publish a book from the Admin Console using the <strong>Business & AI Book Kit</strong> category.
          </div>
        ) : (
          /* Books Grid View */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredBooks.map((book) => (
              <div 
                key={book.id} 
                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm flex flex-col justify-between"
                style={{ boxSizing: 'border-box' }}
              >
                <div>
                  {/* Book Cover Image Thumbnail */}
                  <div className="w-full h-52 sm:h-64 relative bg-[#171a18] overflow-hidden">
                    <img 
                      src={book.coverUrl} 
                      alt={book.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.95, display: 'block' }}
                    />
                  </div>

                  {/* Book Details */}
                  <div className="p-5 sm:p-6">
                    {/* Category & Meta */}
                    <div className="flex justify-between items-center mb-2.5 flex-wrap gap-2">
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#c9b17b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        {book.category}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock size={12} /> {book.readTime}
                      </div>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="text-lg sm:text-xl font-bold text-[#111111] mb-1.5 font-serif line-clamp-2" style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                      {book.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 mb-4 line-clamp-2" style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                      {book.subtitle}
                    </p>

                    {/* Author Tag & Date */}
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-4 font-medium border-t border-gray-100 pt-3">
                      <div className="flex items-center gap-1.5">
                        <User size={12} style={{ color: '#c9b17b' }} /> By {book.author}
                      </div>
                      <span className="text-gray-400">{book.publishedDate}</span>
                    </div>

                    {/* Summary */}
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-2 line-clamp-3" style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                      {book.summary}
                    </p>
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="p-5 sm:p-6 pt-0 border-t border-gray-100 flex gap-3 mt-auto">
                  <button style={{
                    flex: 1,
                    background: '#171a18',
                    color: '#ffffff',
                    border: 'none',
                    padding: '10px 14px',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}>
                    <BookOpen size={14} /> Read Chapter
                  </button>

                  {/* PDF Download Button */}
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
                      border: '1px solid #e5e7eb',
                      color: book.downloadUrl ? '#374151' : '#9ca3af',
                      padding: '10px 14px',
                      borderRadius: '6px',
                      fontSize: '13px',
                      fontWeight: 500,
                      cursor: book.downloadUrl ? 'pointer' : 'not-allowed',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <Download size={14} /> PDF
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}