'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';
import { User, FileText, Calendar, Video, CheckCircle2, BookOpen, Download } from 'lucide-react';

export default function MemberDashboard() {
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('');
  const [articles, setArticles] = useState<any[]>([]);
  const [completedLessons, setCompletedLessons] = useState<{ [key: string]: boolean }>({});
  
  const supabase = createClient();

  useEffect(() => {
    async function loadMemberData() {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) {
          window.location.href = '/login';
          return;
        }
        setUserEmail(user.email || '');

        // Member Course (category === 'course') ဖြစ်သော ဗီဒီယိုသင်ခန်းစာများကိုသာ သီးသန့်ဆွဲထုတ်ခြင်း
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .eq('category', 'course')
          .order('created_at', { ascending: false });

        if (!error && data) {
          setArticles(data);
        }
      } catch (err) {
        console.error('Error loading member dashboard:', err);
      } finally {
        setLoading(false);
      }
    }

    loadMemberData();
  }, [supabase]);

  const toggleComplete = (id: string) => {
    setCompletedLessons(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const completedCount = Object.values(completedLessons).filter(Boolean).length;
  const progressPercentage = articles.length > 0 ? Math.round((completedCount / articles.length) * 100) : 0;

  if (loading) {
    return (
      <div style={{ background: '#0a0a0a', color: '#d4af37', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Loading Professional Member Portal...
      </div>
    );
  }

  return (
    <div style={{ background: '#f8f9fa', color: '#1a1a1a', minHeight: '100vh', padding: '32px 40px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Top Header Tag */}
        <div style={{ fontSize: '11px', color: '#c9b17b', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <User size={14}/> PROFESSIONAL MEMBER PORTAL
        </div>

        <h1 style={{ fontSize: '32px', fontWeight: 700, fontFamily: 'serif', color: '#111111', marginBottom: '8px' }}>
          Exclusive Learning Feed
        </h1>
        <p style={{ color: '#666666', fontSize: '14px', maxWidth: '720px', lineHeight: 1.6, marginBottom: '28px' }}>
          Welcome back, <strong>{userEmail}</strong>. Track your learning progress, watch video masterclasses, and download associated study kits.
        </p>

        {/* Progress Overview Card */}
        <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px 24px', marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <div>
            <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>Overall Course Progress</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#111111' }}>{completedCount} of {articles.length} Lessons Completed</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '150px', background: '#f3f4f6', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${progressPercentage}%`, background: '#171a18', height: '100%', transition: 'width 0.3s ease' }}></div>
            </div>
            <span style={{ fontSize: '16px', fontWeight: 700, color: '#c9b17b' }}>{progressPercentage}%</span>
          </div>
        </div>

        {/* Section Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', borderBottom: '1px solid #e5e7eb', paddingBottom: '12px' }}>
          <Video size={18} color="#c9b17b"/>
          <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#111111', margin: 0 }}>
            Published Video Masterclasses
          </h2>
        </div>

        {articles.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#6b7280', fontSize: '14px' }}>
            No published video lessons available at the moment. Check back soon!
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(500px, 1fr))', gap: '24px' }}>
            {articles.map((item) => {
              const isCompleted = completedLessons[item.id] || false;
              return (
                <div 
                  key={item.id} 
                  style={{ 
                    background: '#ffffff', 
                    border: isCompleted ? '1px solid #16a34a' : '1px solid #e5e7eb', 
                    borderRadius: '8px', 
                    padding: '24px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <span style={{ fontSize: '10px', background: '#fef3c7', color: '#92400e', padding: '2px 8px', borderRadius: '4px', fontWeight: 700, textTransform: 'uppercase' }}>
                        MASTERCLASS
                      </span>

                      {/* Lesson Progress Toggle */}
                      <button
                        onClick={() => toggleComplete(item.id)}
                        style={{
                          background: isCompleted ? '#f0fdf4' : '#f9fafb',
                          border: isCompleted ? '1px solid #bbf7d0' : '1px solid #e5e7eb',
                          color: isCompleted ? '#16a34a' : '#4b5563',
                          padding: '4px 10px',
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <CheckCircle2 size={13} /> {isCompleted ? 'Completed' : 'Mark as Complete'}
                      </button>
                    </div>

                    <h3 style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'serif', color: '#111111', marginBottom: '8px', lineHeight: 1.3 }}>
                      {item.title}
                    </h3>

                    <p style={{ fontSize: '13px', color: '#4b5563', lineHeight: 1.5, marginBottom: '16px' }}>
                      {item.excerpt}
                    </p>

                    {/* Compact YouTube Embed Player */}
                    {item.source_urls && item.source_urls.length > 0 && (
                      <div style={{ margin: '12px 0 16px 0' }}>
                        {item.source_urls.map((url: string, idx: number) => (
                          url.includes('youtube.com') || url.includes('youtu.be') ? (
                            <div key={idx} style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '6px', background: '#000', border: '1px solid #e5e7eb' }}>
                              <iframe 
                                src={url.replace('watch?v=', 'embed/').replace('youtu.be/', 'www.youtube.com/embed/')} 
                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }} 
                                allowFullScreen
                              />
                            </div>
                          ) : null
                        ))}
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: '#9ca3af', borderTop: '1px solid #f3f4f6', paddingTop: '12px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={13}/> Published on {new Date(item.created_at).toLocaleDateString()}
                    </span>
                    <span style={{ color: '#c9b17b', fontWeight: 600 }}>AXU-II LEARNING OS</span>
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