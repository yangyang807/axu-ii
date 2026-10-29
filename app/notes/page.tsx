'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';
import { 
  Search, 
  Copy, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Bot 
} from 'lucide-react';

interface PromptItem {
  id: string;
  title: string;
  promptContent: string;
  category: string;
  createdAt: string;
}

export default function PromptPacksPage() {
  const [prompts, setPrompts] = useState<PromptItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // Expanded Card States
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    fetchPrompts();
  }, []);

  async function fetchPrompts() {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .in('category', ['store', 'note', 'prompt'])
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        const formatted: PromptItem[] = data.map((item) => ({
          id: item.id,
          title: item.title,
          promptContent: item.excerpt || item.body_md || '',
          category: 'Prompt Pack',
          createdAt: new Date(item.created_at).toLocaleDateString()
        }));
        setPrompts(formatted);
      }
    } catch (err) {
      console.error('Error fetching prompts:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleCopy = (e: React.MouseEvent, id: string, text: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredPrompts = prompts.filter((p) => {
    return p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
           p.promptContent.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div style={{ background: '#f8f9fa', color: '#1a1a1a', minHeight: '100vh', padding: '32px 40px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Top Header Tag */}
        <div style={{ fontSize: '11px', color: '#c9b17b', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px' }}>
          SYSTEM PROMPTS & ARCHITECTURE
        </div>

        {/* Title */}
        <h1 style={{ fontSize: '32px', fontWeight: 700, fontFamily: 'serif', color: '#111111', marginBottom: '12px' }}>
          Prompt Packs & Thinking
        </h1>

        {/* Subtitle Description */}
        <p style={{ color: '#666666', fontSize: '14px', maxWidth: '720px', lineHeight: 1.6, marginBottom: '24px' }}>
          Curated system prompts, operating principles, and architectural guidelines published via the Admin Console. Click any card to inspect or copy prompt architectures.
        </p>

        {/* Execution Rule Callout Box */}
        <div style={{ 
          background: '#ffffff', 
          border: '1px solid #e5e7eb', 
          borderLeft: '3px solid #c9b17b',
          padding: '16px 20px', 
          borderRadius: '4px', 
          fontSize: '13px', 
          color: '#4b5563', 
          marginBottom: '28px'
        }}>
          <strong style={{ color: '#111111' }}>Execution rule:</strong> System prompts require verification before production. Test individual prompt architectures inside isolated workflows prior to deployment.
        </div>

        {/* Search Bar */}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          gap: '16px', 
          marginBottom: '28px'
        }}>
          <div style={{ position: 'relative', width: '380px' }}>
            <Search size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
            <input
              type="text"
              placeholder="Search prompt name, domain or topic..."
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
        </div>

        {/* Counter Info */}
        <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '16px' }}>
          {filteredPrompts.length} prompt packs available. Click title to view details.
        </div>

        {/* Cards Grid */}
        {loading ? (
          <div style={{ padding: '50px', textAlign: 'center', color: '#6b7280', fontSize: '14px' }}>Loading prompt packs from database...</div>
        ) : filteredPrompts.length === 0 ? (
          <div style={{ padding: '50px', textAlign: 'center', background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#6b7280', fontSize: '14px' }}>
            No prompt packs found. Publish prompts from the <strong>Admin Console</strong>.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '20px' }}>
            {filteredPrompts.map((item) => {
              const isExpanded = expandedId === item.id;

              return (
                <div 
                  key={item.id} 
                  onClick={() => toggleExpand(item.id)}
                  style={{ 
                    background: '#ffffff', 
                    border: isExpanded ? '1px solid #171a18' : '1px solid #e5e7eb', 
                    borderRadius: '6px', 
                    padding: '20px 24px',
                    cursor: 'pointer',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative'
                  }}
                >
                  <div>
                    {/* Top Domain Tag */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#991b1b', letterSpacing: '0.5px' }}>
                        AXU-II.PROMPT
                      </span>
                      <span style={{ 
                        fontSize: '10px', 
                        background: '#fef3c7', 
                        color: '#92400e', 
                        padding: '2px 8px', 
                        borderRadius: '3px',
                        fontWeight: 600,
                        textTransform: 'uppercase'
                      }}>
                        PROMPT PACK
                      </span>
                    </div>

                    {/* Title with Bot Icon */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '12px' }}>
                      <div style={{ background: '#f3f4f6', padding: '6px', borderRadius: '4px', color: '#c9b17b', marginTop: '2px' }}>
                        <Bot size={18} />
                      </div>
                      <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#111111', margin: 0, lineHeight: 1.4 }}>
                        {item.title}
                      </h3>
                    </div>

                    {/* Collapsed Brief or Expanded Prompt View */}
                    {isExpanded ? (
                      <div style={{ 
                        background: '#f9fafb', 
                        border: '1px solid #e5e7eb', 
                        padding: '14px', 
                        borderRadius: '6px', 
                        fontSize: '12px', 
                        color: '#374151', 
                        whiteSpace: 'pre-wrap', 
                        lineHeight: 1.6, 
                        fontFamily: 'ui-monospace, monospace', 
                        marginTop: '12px',
                        marginBottom: '16px',
                        maxHeight: '260px',
                        overflowY: 'auto'
                      }}>
                        {item.promptContent}
                      </div>
                    ) : (
                      <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 16px 0', lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                        {item.promptContent}
                      </p>
                    )}
                  </div>

                  {/* Footer Actions */}
                  <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', color: '#c9b17b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      {isExpanded ? 'Hide Prompt' : 'View Prompt'}
                    </span>

                    <button
                      onClick={(e) => handleCopy(e, item.id, item.promptContent)}
                      style={{
                        background: '#171a18',
                        border: 'none',
                        color: copiedId === item.id ? '#4ade80' : '#ffffff',
                        padding: '6px 12px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      {copiedId === item.id ? <CheckCircle2 size={13} /> : <Copy size={13} />}
                      {copiedId === item.id ? 'Copied' : 'Copy'}
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}