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
    <div style={{ background: '#f8f9fa', color: '#1a1a1a', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }} className="py-6 px-4 sm:py-8 sm:px-6 lg:px-10">
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Top Header Tag */}
        <div style={{ fontSize: '11px', color: '#c9b17b', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px' }}>
          ADMIN PUBLISHED KNOWLEDGE ASSETS
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl" style={{ fontWeight: 700, fontFamily: 'serif', color: '#111111', marginBottom: '12px' }}>
          Business & AI Book Kit
        </h1>

        {/* Subtitle Description */}
        <p style={{ color: '#666666', fontSize: '14px', maxWidth: '720px', lineHeight: 1.6, marginBottom: '28px' }}>
          Official books, research blueprints, and execution guides published via the Admin Console. Curated for immediate execution and high-leverage decision making.
        </p>

        {/* Search and Filters Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          {/* Search Bar */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '380px' }}>
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
          /* Books Grid View (မိုဘိုင်းတွင် 1 column၊ ကွန်ပျူတာတွင် 2 columns ဖြင့် သပ်ရပ်သော Card များကို ပြသမည်) */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredBooks.map((book) => (
              <div 
                key={book.id} 
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm flex flex-col justify-between"
              >
                <div>
                  {/* Book Cover Image Thumbnail (ဖုန်းတွင် အလွန်မရှည်ဘဲ သင့်တင့်သော အမြင့် h-48 ဖြင့် ပြသမည်) */}
                  <div className="w-full h-48 sm:h-60 relative bg-[#171a18]">
                    <img 
                      src={book.coverUrl} 
                      alt={book.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.95 }}
                    />
                  </div>

                  {/* Book Details */}
                  <div className="p-4 sm:p-5">
                    {/* Category & Meta */}
                    <div className="flex justify-between items-center mb-2">
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#c9b17b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        {book.category}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock size={12} /> {book.readTime}
                      </div>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="text-base sm:text-lg font-bold text-[#111111] mb-1 font-serif line-clamp-1">
                      {book.title}
                    </h3>
                    <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                      {book.subtitle}
                    </p>

                    {/* Author Tag */}
                    <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-3 font-medium">
                      <User size={12} style={{ color: '#c9b17b' }} /> By {book.author} • {book.publishedDate}
                    </div>

                    {/* Summary (စာသားများ အလွန်အမင်း ရှည်မသွားစေရန် line-clamp ဖြင့် ၃ ကြောင်းသာ အဓိကပြမည်) */}
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
                      {book.summary}
                    </p>
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="p-4 sm:p-5 pt-0 border-t border-gray-100 flex gap-2 mt-auto">
                  <button style={{
                    flex: 1,
                    background: '#171a18',
                    color: '#ffffff',
                    border: 'none',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}>
                    <BookOpen size={13} /> Read Chapter
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
                      padding: '8px 12px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: 500,
                      cursor: book.downloadUrl ? 'pointer' : 'not-allowed',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <Download size={13} /> PDF
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