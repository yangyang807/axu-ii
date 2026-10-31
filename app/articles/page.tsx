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
    <div className="min-h-screen bg-slate-50/50 text-slate-900 font-sans py-8 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 text-xs font-bold tracking-wider uppercase">
            <Sparkles size={13} /> Admin Published Knowledge Assets
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-slate-900">
            Business & AI Book Kit
          </h1>

          <p className="text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed">
            Official books, research blueprints, and execution guides published via the Admin Console. Curated for immediate execution and high-leverage decision making.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
          
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search title, author, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all shadow-sm"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 border ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Content View */}
        {loading ? (
          <div className="py-20 text-center text-slate-500 text-sm">
            Loading published books from database...
          </div>
        ) : filteredBooks.length === 0 ? (
          <div className="py-16 text-center bg-white border border-dashed border-slate-300 rounded-xl text-slate-500 text-sm">
            No books found. Publish a book from the Admin Console using the <span className="font-semibold text-slate-700">Business & AI Book Kit</span> category.
          </div>
        ) : (
          /* Professional Book Grid (Card Design with Proper Image Ratio) */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredBooks.map((book) => (
              <div 
                key={book.id} 
                className="bg-white border border-slate-200/80 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row overflow-hidden group"
              >
                {/* Fixed Sized Compact Book Cover Container */}
                <div className="sm:w-44 w-full shrink-0 bg-slate-900 relative aspect-[3/4] sm:aspect-auto overflow-hidden flex items-center justify-center p-3">
                  <img 
                    src={book.coverUrl} 
                    alt={book.title}
                    className="w-full h-full object-contain rounded shadow-md group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content Section */}
                <div className="p-5 flex flex-col justify-between flex-1 space-y-4">
                  <div className="space-y-2">
                    {/* Category & Read Time */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-amber-600 uppercase tracking-wider text-[11px]">
                        {book.category}
                      </span>
                      <span className="flex items-center gap-1 text-slate-400">
                        <Clock size={12} /> {book.readTime}
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <div>
                      <h3 className="text-base font-bold font-serif text-slate-900 group-hover:text-amber-700 transition-colors line-clamp-1">
                        {book.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                        {book.subtitle}
                      </p>
                    </div>

                    {/* Author & Date */}
                    <div className="flex items-center justify-between text-xs text-slate-500 font-medium pt-1 border-t border-slate-100">
                      <span className="flex items-center gap-1 text-slate-700">
                        <User size={12} className="text-amber-600" /> {book.author}
                      </span>
                      <span className="text-slate-400 text-[11px]">{book.publishedDate}</span>
                    </div>

                    {/* Summary */}
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {book.summary}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-3 border-t border-slate-100 mt-auto">
                    <button className="flex-1 bg-slate-900 hover:bg-slate-800 text-white py-2 px-3 rounded-md text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors">
                      <BookOpen size={14} /> Read Chapter
                    </button>

                    <button 
                      onClick={() => {
                        if (book.downloadUrl) {
                          window.open(book.downloadUrl, '_blank');
                        } else {
                          alert('PDF link not available for this book yet.');
                        }
                      }}
                      disabled={!book.downloadUrl}
                      className={`py-2 px-3 rounded-md text-xs font-medium border flex items-center gap-1.5 transition-colors ${
                        book.downloadUrl 
                          ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300' 
                          : 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      <Download size={14} /> PDF
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}