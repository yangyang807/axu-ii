'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowUpRight, 
  BookOpen, 
  BrainCircuit, 
  CalendarDays, 
  CheckCircle2, 
  FileText, 
  Layers3, 
  Target, 
  Newspaper,
  ArrowRight
} from 'lucide-react';
import { sources } from '@/lib/sources';
import { createClient } from '@/lib/supabase';

export default function Home() {
  const [magazines, setMagazines] = useState<any[]>([]);
  const [loadingMagazines, setLoadingMagazines] = useState(true);

  const daily = sources.filter(s => s.cadence === 'Daily');
  const supabase = createClient();

  useEffect(() => {
    fetchLatestMagazines();
  }, []);

  async function fetchLatestMagazines() {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('category', 'magazine')
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) throw error;
      if (data) setMagazines(data);
    } catch (err) {
      console.error('Error fetching magazines:', err);
    } finally {
      setLoadingMagazines(false);
    }
  }

  return (
    <main className="main-content">
      {/* Hero Section with Brand Red Border */}
      <div className="hero" style={{ border: '1px solid #ff4d4f', borderRadius: '12px', padding: '40px', background: '#121212' }}>
        <div className="eyebrow" style={{ color: '#ff4d4f' }}>AXU-II · AI SUPERSTORE</div>
        <h1 className="serif">Your World of AI.</h1>
        <p>
          Discover everything you need about AI in one centralized place. Built to be your trusted store for digital products and AI solutions in the AI era.
        </p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 22 }}>
          <Link className="btn" href="/insights" style={{ background: '#ff4d4f', color: '#fff', border: 'none' }}>
            Explore AI Store <ArrowUpRight size={15} />
          </Link>
          <Link className="btn btn-outline" href="/magazine" style={{ borderColor: '#ff4d4f', color: '#ff4d4f' }}>
            Read Daily Magazine
          </Link>
        </div>
      </div>

      {/* Featured Daily Magazine Section */}
      <div className="section-head" style={{ marginTop: '36px' }}>
        <div>
          <div className="eyebrow" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ff4d4f' }}>
            <Newspaper size={14} color="#ff4d4f" /> LATEST INTEL & ARTICLES
          </div>
          <h2 className="serif">Daily Magazine Feed</h2>
        </div>
        <Link href="/magazine" style={{ fontSize: 12, textDecoration: 'underline', color: '#ff4d4f' }}>
          View all magazines ↗
        </Link>
      </div>

      {loadingMagazines ? (
        <div style={{ padding: '30px', color: '#888', fontSize: '13px' }}>Loading latest magazine articles...</div>
      ) : magazines.length === 0 ? (
        <div style={{ padding: '24px', background: '#121212', borderRadius: '8px', border: '1px solid #222', fontSize: '13px', color: '#888' }}>
          No published magazine articles yet. Publish new articles from the Admin Console.
        </div>
      ) : (
        <div className="grid-3" style={{ marginBottom: '40px' }}>
          {magazines.map((item) => {
            const coverImage = item.source_urls && item.source_urls[0] ? item.source_urls[0] : null;

            return (
              <article 
                key={item.id} 
                style={{ 
                  background: '#121513', 
                  border: '1px solid #1f2420', 
                  borderRadius: '10px', 
                  overflow: 'hidden', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }}
              >
                {coverImage && (
                  <div style={{ width: '100%', height: '160px', overflow: 'hidden', background: '#0a0a0a' }}>
                    <img src={coverImage} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
                
                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '10px', color: '#ff4d4f', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>
                      MAGAZINE · {new Date(item.created_at).toLocaleDateString()}
                    </div>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', margin: '0 0 8px 0', lineHeight: 1.4, fontFamily: 'serif' }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: '13px', color: '#888', margin: '0 0 16px 0', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {item.excerpt}
                    </p>
                  </div>

                  <Link 
                    href={`/magazine`} 
                    style={{ fontSize: '12px', color: '#ff4d4f', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}
                  >
                    Read Article <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* System Stats */}
      <div className="stats">
        <div className="stat-card">
          <div className="stat-label">Curated starter sources</div>
          <div className="stat-value">{sources.length}</div>
          <div className="stat-note">Across {new Set(sources.map(s => s.category)).size} domains of knowledge</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Daily signal sources</div>
          <div className="stat-value">{daily.length}</div>
          <div className="stat-note">A short daily review list</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Operating filter</div>
          <div className="stat-value">5%</div>
          <div className="stat-note">Signal over information volume</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">North Star</div>
          <div className="stat-value">Wealth</div>
          <div className="stat-note">Value × leverage × compounding</div>
        </div>
      </div>

      <div className="section-head">
        <div>
          <div className="eyebrow">Daily operating rhythm</div>
          <h2 className="serif">Today’s intelligence loop</h2>
        </div>
        <span className="pill">30–60 MINUTES</span>
      </div>

      <div className="grid-2">
        <section className="panel">
          <div className="panel-title">The daily review</div>
          <div className="panel-desc">Do not browse without a question. Every session should produce a decision, an asset or a tested hypothesis.</div>
          {[
            { n: '01', title: 'Scan primary signals', desc: 'Review the small daily list. Save only items that change a decision.' },
            { n: '02', title: 'Extract the 5%', desc: 'Identify the mechanism, evidence, hidden principle and exceptions.' },
            { n: '03', title: 'Apply to a live bottleneck', desc: 'Connect the insight to a real business, product, distribution or wealth problem.' },
            { n: '04', title: 'Create a compounding asset', desc: 'Turn the best insight into an SOP, content asset, product improvement or decision rule.' }
          ].map(t => (
            <div className="task" key={t.n}>
              <div className="task-dot"/>
              <div><strong>{t.n} · {t.title}</strong><p>{t.desc}</p></div>
            </div>
          ))}
        </section>

        <section className="panel">
          <div className="panel-title">Your operating principles</div>
          <div className="task">
            <Target size={17}/>
            <div><strong>Value before activity</strong><p>Does this create measurable customer value or improve an important decision?</p></div>
          </div>
          <div className="task">
            <Layers3 size={17}/>
            <div><strong>Leverage before effort</strong><p>Can software, content, capital, distribution or a process multiply the result?</p></div>
          </div>
          <div className="task">
            <CheckCircle2 size={17}/>
            <div><strong>Evidence before explanation</strong><p>Separate known facts, assumptions, confidence and what would falsify the idea.</p></div>
          </div>
          <div className="task">
            <CalendarDays size={17}/>
            <div><strong>Compounding over vanity metrics</strong><p>Track assets, conversion, profit and repeatability—not attention alone.</p></div>
          </div>
        </section>
      </div>

      <div className="section-head">
        <div>
          <div className="eyebrow">Start with signal</div>
          <h2 className="serif">Daily source shortlist</h2>
        </div>
        <Link href="/library" style={{ fontSize: 12, textDecoration: 'underline' }}>View all sources ↗</Link>
      </div>

      <div className="grid-3">
        {daily.map(s => (
          <article className="source-card" key={s.domain}>
            <div className="source-domain">{s.domain} · {s.category}</div>
            <h3>{s.name}</h3>
            <p>{s.description}</p>
            <a href={s.url} target="_blank" rel="noreferrer">Open source ↗</a>
          </article>
        ))}
      </div>

      <div className="section-head">
        <div>
          <div className="eyebrow">Build the system</div>
          <h2 className="serif">Your working tools</h2>
        </div>
      </div>

      <div className="grid-3">
        <Link className="panel" href="/library">
          <BookOpen size={20}/>
          <div className="panel-title" style={{ marginTop: 13 }}>Source Library</div>
          <div className="panel-desc">Find trusted sources by topic, domain and review cadence.</div>
        </Link>
        <Link className="panel" href="/insights">
          <BrainCircuit size={20}/>
          <div className="panel-title" style={{ marginTop: 13 }}>AI 5% Engine</div>
          <div className="panel-desc">Turn source text into cited, actionable insight.</div>
        </Link>
        <Link className="panel" href="/notes">
          <FileText size={20}/>
          <div className="panel-title" style={{ marginTop: 13 }}>Notes & Decisions</div>
          <div className="panel-desc">Capture observations, decisions, hypotheses and next actions.</div>
        </Link>
      </div>

      <p className="footer-note">Prototype status: this dashboard and curated source starter set work without credentials. Accounts, private cloud notes, PDF storage, admin authorization and external publishing require the Supabase setup documented in the deployment guide. This starter catalog is not yet 1,000 individually audited links.</p>
    </main>
  );
}