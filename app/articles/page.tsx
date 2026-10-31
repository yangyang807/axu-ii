'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';
import { 
  BookOpen, 
  Search, 
  Download, 
  User, 
  Clock,
  Sparkles
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
          category: item.sub_category || 'Business Strategy',
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
    <div className="min-h-screen bg-[#f8f9fa] text-[#1a1a1a] font-sans py-8 px-4 sm:px-8">
      <div className="max-w-[1280px] mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="space-y-2">
          <div className="text-[11px] text-[#c9b17b] font-bold tracking-[1.5px] uppercase">
            ADMIN PUBLISHED KNOWLEDGE ASSETS
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#111111]">
            Business & AI Book Kit
          </h1>

          <p className="text-[#666666] text-sm max-w-[720px] leading-relaxed">
            Official books, research blueprints, and execution guides published via the Admin Console. Curated for immediate execution and high-leverage decision making.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-2 border-b border-[#e5e7eb]">
          
          {/* Search Input */}
          <div className="relative w-full max-w-[380px]">
            <Search size={15} className="absolute left-[14px] top-1/2 -translate-y-1/2 text-[#9ca3af]" />
            <input
              type="text"
              placeholder="Search book title, author or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2.5 pl-[38px] pr-4 bg-white border border-[#e5e7eb] rounded-md text-[13px] text-[#111111] placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#111111] shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none whitespace-nowrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-all shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#171a18] text-white border border-[#111111]'
                    : 'bg-white text-[#4b5563] border border-[#e5e7eb] hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Content View */}
        {loading ? (
          <div className="py-10 text-center text-[#6b7280] text-sm">
            Loading published books from database...
          </div>
        ) : filteredBooks.length === 0 ? (
          <div className="py-10 text-center bg-white border border-[#e5e7eb] rounded-lg text-[#6b7280] text-sm">
            No books found. Publish a book from the Admin Console using the <strong className="text-[#111111]">Business & AI Book Kit</strong> category.
          </div>
        ) : (
          /* Books Grid View */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredBooks.map((book) => (
              <div 
                key={book.id} 
                className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden shadow-sm flex flex-col justify-between"
              >
                <div>
                  {/* Book Cover Image Thumbnail */}
                  <div className="w-full h-64 sm:h-72 relative bg-[#171a18] overflow-hidden flex items-center justify-center">
                    <img 
                      src={book.coverUrl} 
                      alt={book.title}
                      className="w-full h-full object-cover opacity-95 block"
                    />
                  </div>

                  {/* Book Details */}
                  <div className="p-5 sm:p-6">
                    {/* Category & Meta */}
                    <div className="flex justify-between items-center mb-2.5 flex-wrap gap-2">
                      <span className="text-[11px] font-bold text-[#c9b17b] uppercase tracking-[0.5px]">
                        {book.category}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock size={12} /> {book.readTime}
                      </div>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="text-lg sm:text-xl font-bold text-[#111111] mb-1.5 font-serif line-clamp-2 break-words">
                      {book.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 mb-4 line-clamp-2 break-words">
                      {book.subtitle}
                    </p>

                    {/* Author Tag & Date */}
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-4 font-medium border-t border-gray-100 pt-3">
                      <div className="flex items-center gap-1.5">
                        <User size={12} className="text-[#c9b17b]" /> By {book.author}
                      </div>
                      <span className="text-gray-400">{book.publishedDate}</span>
                    </div>

                    {/* Summary */}
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-2 line-clamp-4 break-words">
                      {book.summary}
                    </p>
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="p-5 sm:p-6 pt-0 border-t border-gray-100 flex gap-3 mt-auto">
                  <button className="flex-1 bg-[#171a18] hover:bg-black text-white border-none py-2.5 px-3.5 rounded-md text-[13px] font-semibold cursor-pointer flex items-center justify-center gap-1.5 transition-colors">
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
                    disabled={!book.downloadUrl}
                    className={`bg-white border border-[#e5e7eb] py-2.5 px-3.5 rounded-md text-[13px] font-medium flex items-center gap-1.5 transition-colors ${
                      book.downloadUrl 
                        ? 'text-[#374151] hover:bg-gray-50 cursor-pointer' 
                        : 'text-[#9ca3af] cursor-not-allowed bg-gray-50'
                    }`}
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