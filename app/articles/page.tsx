'use client';

import React, { useState } from 'react';
import { 
  Search, 
  ExternalLink, 
  X,
  CheckCircle,
  XCircle,
  DollarSign,
  UserCheck
} from 'lucide-react';
import { allAiTools, AIToolItem } from '@/lib/aiTools';

export default function AIToolFinderPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [detailTool, setDetailTool] = useState<AIToolItem | null>(null);

  const categories = ['All', 'LLMs & Chatbots', 'Productivity', 'Development', 'Design & Media'];

  const filteredTools = allAiTools.filter((tool) => {
    const matchesCategory = selectedCategory === 'All' || tool.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.recommendFor.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.recommendFor.my.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ background: '#f8fafc', color: '#0f172a', minHeight: '100vh', padding: '24px 16px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* HEADER */}
        <div style={{ borderBottom: '2px solid #0f172a', paddingBottom: '16px', marginBottom: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '11px', color: '#64748b', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 700 }}>
            QUALITY SOURCE LIBRARY (100 AI MATRIX)
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 900, letterSpacing: '-0.5px', margin: 0, textTransform: 'uppercase' }}>
            AI Tool Finder & Comparison
          </h1>
        </div>

        {/* SEARCH & FILTER BAR */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '500px', margin: '0 auto' }}>
            <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Search 100 AI models, pros, cons or pricing..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px 10px 38px',
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: '6px',
                color: '#0f172a',
                fontSize: '13px',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', overflowX: 'auto', paddingBottom: '4px' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: selectedCategory === cat ? '1px solid #0f172a' : '1px solid #cbd5e1',
                  background: selectedCategory === cat ? '#0f172a' : '#ffffff',
                  color: selectedCategory === cat ? '#ffffff' : '#475569',
                  whiteSpace: 'nowrap'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 5-COLUMN TABLE LAYOUT */}
        {filteredTools.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', background: '#ffffff', border: '1px dashed #cbd5e1', borderRadius: '8px', color: '#64748b' }}>
            No AI tools match your search criteria.
          </div>
        ) : (
          <div style={{ overflowX: 'auto', background: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '1000px', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: '#0f172a', color: '#ffffff', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  <th style={{ padding: '14px 16px', width: '18%' }}>AI Model / Tool</th>
                  <th style={{ padding: '14px 16px', width: '22%' }}>Recommend For (သင့်တော်သူများ)</th>
                  <th style={{ padding: '14px 16px', width: '24%' }}>Pros (အားသာချက်များ)</th>
                  <th style={{ padding: '14px 16px', width: '22%' }}>Cons (အားနည်းချက်များ)</th>
                  <th style={{ padding: '14px 16px', width: '14%' }}>Pricing (ဈေးနှုန်း)</th>
                </tr>
              </thead>
              <tbody>
                {filteredTools.map((tool, idx) => (
                  <tr 
                    key={tool.id} 
                    style={{ 
                      borderBottom: '1px solid #e2e8f0',
                      background: idx % 2 === 0 ? '#ffffff' : '#f8fafc'
                    }}
                  >
                    {/* Col 1: AI Model */}
                    <td style={{ padding: '16px', verticalAlign: 'top' }}>
                      <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '14px', marginBottom: '4px' }}>
                        {tool.title}
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '10px' }}>
                        {tool.subtitle}
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => setDetailTool(tool)}
                          style={{ fontSize: '11px', padding: '4px 8px', background: '#e2e8f0', color: '#0f172a', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}
                        >
                          Details
                        </button>
                        <button
                          onClick={() => window.open(tool.toolUrl, '_blank')}
                          style={{ fontSize: '11px', padding: '4px 8px', background: '#0f172a', color: '#ffffff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '3px' }}
                        >
                          Try <ExternalLink size={10} />
                        </button>
                      </div>
                    </td>

                    {/* Col 2: Recommend For */}
                    <td style={{ padding: '16px', verticalAlign: 'top' }}>
                      <div style={{ display: 'flex', gap: '6px', marginBottom: '6px' }}>
                        <UserCheck size={16} style={{ color: '#2563eb', flexShrink: 0, marginTop: '2px' }} />
                        <div>
                          <div style={{ fontWeight: 600, color: '#1e293b' }}>{tool.recommendFor.en}</div>
                          <div style={{ color: '#475569', fontSize: '12px', marginTop: '4px' }}>{tool.recommendFor.my}</div>
                        </div>
                      </div>
                    </td>

                    {/* Col 3: Pros */}
                    <td style={{ padding: '16px', verticalAlign: 'top' }}>
                      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {tool.pros.map((pro, pIdx) => (
                          <li key={pIdx} style={{ display: 'flex', gap: '6px', alignItems: 'flex-start' }}>
                            <CheckCircle size={15} style={{ color: '#16a34a', flexShrink: 0, marginTop: '2px' }} />
                            <div>
                              <strong style={{ color: '#15803d' }}>{pro.en}</strong>
                              <div style={{ color: '#475569', fontSize: '12px' }}>{pro.my}</div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </td>

                    {/* Col 4: Cons */}
                    <td style={{ padding: '16px', verticalAlign: 'top' }}>
                      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {tool.cons.map((con, cIdx) => (
                          <li key={cIdx} style={{ display: 'flex', gap: '6px', alignItems: 'flex-start' }}>
                            <XCircle size={15} style={{ color: '#dc2626', flexShrink: 0, marginTop: '2px' }} />
                            <div>
                              <strong style={{ color: '#b91c1c' }}>{con.en}</strong>
                              <div style={{ color: '#475569', fontSize: '12px' }}>{con.my}</div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </td>

                    {/* Col 5: Pricing */}
                    <td style={{ padding: '16px', verticalAlign: 'top' }}>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <DollarSign size={16} style={{ color: '#0284c7', flexShrink: 0, marginTop: '2px' }} />
                        <div>
                          <div style={{ fontWeight: 700, color: '#0369a1' }}>{tool.pricing.en}</div>
                          <div style={{ color: '#475569', fontSize: '12px', marginTop: '4px' }}>{tool.pricing.my}</div>
                        </div>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* DETAIL MODAL */}
        {detailTool && (
          <div style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100vw', 
            height: '100vh', 
            background: 'rgba(15, 23, 42, 0.6)', 
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
              maxWidth: '650px', 
              borderRadius: '12px', 
              padding: '24px', 
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
              position: 'relative',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}>
              <button 
                onClick={() => setDetailTool(null)}
                style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={20} />
              </button>

              <div style={{ fontSize: '11px', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', marginBottom: '4px' }}>
                {detailTool.category} • {detailTool.pricingType}
              </div>

              <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>
                {detailTool.title}
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '13px', color: '#334155' }}>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', color: '#0f172a', fontWeight: 700 }}>Best Suitable For (သင့်တော်သူများ)</h4>
                  <p style={{ margin: 0 }}>{detailTool.recommendFor.en}</p>
                  <p style={{ margin: '2px 0 0 0', color: '#64748b' }}>{detailTool.recommendFor.my}</p>
                </div>

                <div>
                  <h4 style={{ margin: '0 0 6px 0', color: '#15803d', fontWeight: 700 }}>Key Advantages (အားသာချက်များ)</h4>
                  {detailTool.pros.map((p, i) => (
                    <div key={i} style={{ marginBottom: '6px' }}>
                      • <strong>{p.en}</strong> — <span>{p.my}</span>
                    </div>
                  ))}
                </div>

                <div>
                  <h4 style={{ margin: '0 0 6px 0', color: '#b91c1c', fontWeight: 700 }}>Limitations (အားနည်းချက်များ)</h4>
                  {detailTool.cons.map((c, i) => (
                    <div key={i} style={{ marginBottom: '6px' }}>
                      • <strong>{c.en}</strong> — <span>{c.my}</span>
                    </div>
                  ))}
                </div>

                <div>
                  <h4 style={{ margin: '0 0 4px 0', color: '#0369a1', fontWeight: 700 }}>Pricing Breakdown (ဈေးနှုန်း)</h4>
                  <p style={{ margin: 0 }}>{detailTool.pricing.en}</p>
                  <p style={{ margin: '2px 0 0 0', color: '#64748b' }}>{detailTool.pricing.my}</p>
                </div>
              </div>

              <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
                <button 
                  onClick={() => window.open(detailTool.toolUrl, '_blank')}
                  style={{
                    flex: 1,
                    background: '#0f172a',
                    color: '#ffffff',
                    border: 'none',
                    padding: '12px',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <ExternalLink size={15} /> Open Official Website
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}