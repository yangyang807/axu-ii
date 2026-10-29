'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';
import { 
  ShoppingBag, 
  Search, 
  ExternalLink, 
  CheckCircle2, 
  Send, 
  Tag, 
  Bot, 
  X,
  CreditCard,
  Info
} from 'lucide-react';

interface AIProduct {
  id: string;
  name: string;
  domain: string;
  category: 'Agents' | 'Prompts' | 'Workflows' | 'Models';
  description: string;
  features: string[];
  price: string;
  coverUrl: string;
  systemPrompt?: string;
}

export default function AIStorePage() {
  const [products, setProducts] = useState<AIProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Detail Modal & Checkout States
  const [detailProduct, setDetailProduct] = useState<AIProduct | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<AIProduct | null>(null);
  const [buyerName, setBuyerName] = useState('');
  const [buyerTelegram, setBuyerTelegram] = useState('');
  const [ordering, setOrdering] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('category', 'insights')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        const fetched: AIProduct[] = data.map((item) => {
          let extractedPrice = '$49.00';
          let desc = item.excerpt || 'Professional AI system agent and workflow blueprint.';
          if (item.excerpt && item.excerpt.includes('Price:')) {
            const parts = item.excerpt.split('|');
            extractedPrice = parts[0].replace('Price:', '').trim();
            desc = parts.slice(1).join('|').trim();
          }

          // Extract features or bullet points from body_md or excerpt
          const rawContent = item.body_md || item.excerpt || '';
          const featuresList = rawContent
            .split('\n')
            .filter((line: string) => line.trim().startsWith('-') || line.trim().startsWith('•') || line.trim().match(/^\d+\./))
            .map((f: string) => f.replace(/^[-•\d.]\s*/, '').trim());

          return {
            id: item.id,
            name: item.title,
            domain: 'AXU-II.STORE',
            category: 'Agents',
            description: desc,
            features: featuresList.length > 0 ? featuresList : [
              'High-leverage prompt architecture & execution guide',
              'Optimized for direct integration into Knowledge OS',
              'Tested and verified for professional workflows'
            ],
            price: extractedPrice,
            coverUrl: item.source_urls && item.source_urls[0] ? item.source_urls[0] : 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
            systemPrompt: rawContent
          };
        });
        setProducts(fetched);
      }
    } catch (err) {
      console.error('Error fetching store products:', err);
    } finally {
      setLoading(false);
    }
  }

  const categories = ['All', 'Agents', 'Prompts', 'Workflows', 'Models'];

  const filteredProducts = products.filter((prod) => {
    const matchesCategory = selectedCategory === 'All' || prod.category === selectedCategory;
    const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          prod.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || !buyerName || !buyerTelegram) return;

    setOrdering(true);
    const botUsername = 'SoloGeniusBot'; 
    const message = encodeURIComponent(
      `🛍️ *NEW AI STORE ORDER*\n\n` +
      `📦 *Product:* ${selectedProduct.name}\n` +
      `💰 *Price:* ${selectedProduct.price}\n` +
      `👤 *Buyer:* ${buyerName}\n` +
      `📱 *Telegram:* ${buyerTelegram}\n` +
      `🆔 *Product ID:* ${selectedProduct.id}`
    );

    const telegramUrl = `https://t.me/${botUsername}?text=${message}`;

    setTimeout(() => {
      setOrdering(false);
      setOrderSuccess(true);
      window.open(telegramUrl, '_blank');

      setTimeout(() => {
        setOrderSuccess(false);
        setSelectedProduct(null);
        setBuyerName('');
        setBuyerTelegram('');
      }, 2000);
    }, 1000);
  };

  return (
    <div style={{ background: '#f8f9fa', color: '#1a1a1a', minHeight: '100vh', padding: '32px 40px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        
        {/* Top Header Tag */}
        <div style={{ fontSize: '11px', color: '#c9b17b', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px' }}>
          PREMIUM DIGITAL ASSETS & AGENTS
        </div>

        {/* Title */}
        <h1 style={{ fontSize: '32px', fontWeight: 700, fontFamily: 'serif', color: '#111111', marginBottom: '12px' }}>
          AXU-II AI Store
        </h1>

        {/* Subtitle Description */}
        <p style={{ color: '#666666', fontSize: '14px', maxWidth: '720px', lineHeight: 1.6, marginBottom: '28px' }}>
          Acquire professional AI agents, prompt architectures, and enterprise workflows. Click any product to inspect features before Telegram checkout.
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
              placeholder="Search store items, agents or tools..."
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

        {/* Store Grid View - 4 Columns Layout */}
        {loading ? (
          <div style={{ padding: '60px', textAlign: 'center', color: '#6b7280' }}>Loading AXU-II Store inventory...</div>
        ) : filteredProducts.length === 0 ? (
          <div style={{ padding: '60px', textAlign: 'center', background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#6b7280' }}>
            No products found in the store. Publish assets via the <strong>Admin Console</strong>.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            {filteredProducts.map((prod) => (
              <div 
                key={prod.id} 
                style={{ 
                  background: '#ffffff', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '8px', 
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
              >
                {/* Product Cover Image with Price Tag */}
                <div 
                  onClick={() => setDetailProduct(prod)}
                  style={{ height: '150px', position: 'relative', background: '#171a18', cursor: 'pointer' }}
                >
                  <img 
                    src={prod.coverUrl} 
                    alt={prod.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }}
                  />
                  <div style={{ 
                    position: 'absolute', 
                    top: '10px', 
                    right: '10px', 
                    background: '#171a18', 
                    color: '#c9b17b', 
                    fontSize: '11px', 
                    fontWeight: 700, 
                    padding: '3px 8px', 
                    borderRadius: '4px',
                    border: '1px solid #2c302c'
                  }}>
                    {prod.price}
                  </div>
                </div>

                {/* Product Details */}
                <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span style={{ fontSize: '10px', fontWeight: 700, color: '#991b1b', letterSpacing: '0.5px' }}>
                        {prod.domain}
                      </span>
                      <span style={{ fontSize: '10px', color: '#6b7280', background: '#f3f4f6', padding: '2px 6px', borderRadius: '4px' }}>
                        {prod.category}
                      </span>
                    </div>

                    <h3 
                      onClick={() => setDetailProduct(prod)}
                      style={{ fontSize: '15px', fontWeight: 700, fontFamily: 'serif', color: '#111111', marginBottom: '6px', lineHeight: 1.3, cursor: 'pointer' }}
                    >
                      {prod.name}
                    </h3>

                    <p style={{ fontSize: '12px', color: '#4b5563', lineHeight: 1.4, marginBottom: '16px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {prod.description}
                    </p>
                  </div>

                  {/* Actions: View Features & Buy Now */}
                  <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '12px', display: 'flex', gap: '8px' }}>
                    <button 
                      onClick={() => setDetailProduct(prod)}
                      style={{
                        flex: 1,
                        background: '#f3f4f6',
                        color: '#111111',
                        border: 'none',
                        padding: '8px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px'
                      }}
                    >
                      <Info size={13} /> Features
                    </button>

                    <button 
                      onClick={() => setSelectedProduct(prod)}
                      style={{
                        flex: 2,
                        background: '#171a18',
                        color: '#ffffff',
                        border: 'none',
                        padding: '8px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      <ShoppingBag size={13} /> Buy Now
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

        {/* Product Detail / Features Modal */}
        {detailProduct && (
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
              maxWidth: '560px', 
              borderRadius: '12px', 
              padding: '32px', 
              boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
              position: 'relative',
              maxHeight: '85vh',
              overflowY: 'auto'
            }}>
              <button 
                onClick={() => setDetailProduct(null)}
                style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#6b7280' }}
              >
                <X size={20} />
              </button>

              <div style={{ fontSize: '11px', color: '#991b1b', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
                {detailProduct.domain} • {detailProduct.category}
              </div>

              <h2 style={{ fontSize: '22px', fontWeight: 700, fontFamily: 'serif', color: '#111111', marginBottom: '8px' }}>
                {detailProduct.name}
              </h2>
              <div style={{ fontSize: '18px', fontWeight: 700, color: '#c9b17b', marginBottom: '16px' }}>
                {detailProduct.price}
              </div>

              <p style={{ fontSize: '13px', color: '#4b5563', lineHeight: 1.6, marginBottom: '20px' }}>
                {detailProduct.description}
              </p>

              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#111111', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '0.5px' }}>
                  Key Features & Capabilities:
                </h4>
                <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {detailProduct.features.map((feat, idx) => (
                    <li key={idx} style={{ fontSize: '13px', color: '#374151', lineHeight: 1.5 }}>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button 
                  onClick={() => {
                    const prod = detailProduct;
                    setDetailProduct(null);
                    setSelectedProduct(prod);
                  }}
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
                  <ShoppingBag size={15} /> Proceed to Telegram Checkout
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Telegram Checkout Modal */}
        {selectedProduct && (
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
              maxWidth: '480px', 
              borderRadius: '12px', 
              padding: '32px', 
              boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
              position: 'relative'
            }}>
              <button 
                onClick={() => setSelectedProduct(null)}
                style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#6b7280' }}
              >
                <X size={20} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#c9b17b', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}>
                <CreditCard size={14} /> Secure Store Checkout
              </div>

              <h2 style={{ fontSize: '20px', fontWeight: 700, fontFamily: 'serif', color: '#111111', marginBottom: '4px' }}>
                {selectedProduct.name}
              </h2>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#991b1b', marginBottom: '20px' }}>
                Price: {selectedProduct.price}
              </div>

              <form onSubmit={handleCheckout} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', marginBottom: '6px' }}>
                    YOUR FULL NAME
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. Yang Karg" 
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    required
                    style={{ width: '100%', padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '13px', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', marginBottom: '6px' }}>
                    YOUR TELEGRAM USERNAME (@username)
                  </label>
                  <input 
                    type="text" 
                    placeholder="@yangkarg" 
                    value={buyerTelegram}
                    onChange={(e) => setBuyerTelegram(e.target.value)}
                    required
                    style={{ width: '100%', padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '13px', outline: 'none' }}
                  />
                </div>

                <div style={{ background: '#f9fafb', padding: '12px', borderRadius: '6px', fontSize: '12px', color: '#4b5563', lineHeight: 1.4 }}>
                  ℹ️ Clicking order will automatically redirect you to our official <strong>Telegram Bot</strong> to complete payment verification and instant file/access delivery.
                </div>

                <button 
                  type="submit"
                  style={{
                    background: '#171a18',
                    color: '#ffffff',
                    border: 'none',
                    padding: '12px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                  disabled={ordering}
                >
                  <Send size={15} /> {ordering ? 'Connecting to Telegram Bot...' : 'Confirm Order via Telegram'}
                </button>

                {orderSuccess && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#16a34a', fontSize: '13px', background: '#f0fdf4', padding: '10px', borderRadius: '6px', border: '1px solid #bbf7d0' }}>
                    <CheckCircle2 size={16} /> Order summary generated! Redirecting to Telegram...
                  </div>
                )}
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}