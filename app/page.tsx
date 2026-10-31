'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Terminal,
  BookOpen,
  Wrench,
  Database,
  ShoppingBag,
  Zap,
  Crown,
  ShieldCheck,
  ChevronRight,
  Bell
} from 'lucide-react';
import { createClient } from '@/lib/supabase';

export default function Home() {
  const [showProModal, setShowProModal] = useState(false);
  const [latestMagazine, setLatestMagazine] = useState<any>(null);
  const [loadingMagazine, setLoadingMagazine] = useState(true);

  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    fetchLatestMagazine();
  }, []);

  async function fetchLatestMagazine() {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('category', 'magazine')
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) throw error;
      if (data && data.length > 0) setLatestMagazine(data[0]);
    } catch (err) {
      console.error('Error fetching latest magazine:', err);
    } finally {
      setLoadingMagazine(false);
    }
  }

  // Project ဖိုင်လမ်းကြောင်းများနှင့် တိုက်ရိုက်ချိတ်ဆက်ထားသော Options များ
  const notificationOptions = [
    {
      id: 'prompts',
      titleMm: 'အလုပ်ဖြစ်တဲ့ Smart prompt တွေရှာစရာရှိလို့ပါ',
      titleEn: 'Smart Prompt Page',
      descMm: 'Smart Prompt Page သို့ တိုက်ရိုက်သွားမည်',
      descEn: 'Direct access to Smart Prompt Page',
      icon: Terminal,
      link: '/notes'
    },
    {
      id: 'news',
      titleMm: 'AI သတင်းအသစ်တွေ ဖတ်ချင်လို့ပါ',
      titleEn: 'Daily AI Briefing',
      descMm: 'Daily AI Briefing သို့ တိုက်ရိုက်သွားမည်',
      descEn: 'Direct access to Daily AI Briefing',
      icon: BookOpen,
      link: '/magazine'
    },
    {
      id: 'tools',
      titleMm: 'AI Tool တွေရှာစရာရှိလို့ပါ',
      titleEn: 'Ai Tools Finder',
      descMm: 'Ai Tools Finder သို့ တိုက်ရိုက်သွားမည်',
      descEn: 'Direct access to Ai Tools Finder',
      icon: Wrench,
      link: '/articles'
    },
    {
      id: 'sources',
      titleMm: 'Business အတွက် Quality source တွေရှာစရာရှိလို့ပါ',
      titleEn: 'Quality Source Library',
      descMm: 'Quality Source Library သို့ တိုက်ရိုက်သွားမည်',
      descEn: 'Direct access to Quality Source Library',
      icon: Database,
      link: '/library'
    },
    {
      id: 'store',
      titleMm: 'AXU-II AI Store မှာ ဝယ်စရာရှိလို့ပါ',
      titleEn: 'Axu-II Ai Store',
      descMm: 'Axu-II Ai Store သို့ တိုက်ရိုက်သွားမည်',
      descEn: 'Direct access to Axu-II Ai Store',
      icon: ShoppingBag,
      link: '/insights'
    },
    {
      id: 'workflows',
      titleMm: 'Ready To Use Workflow လိုချင်လို့ပါ',
      titleEn: 'Ready To Use Workflows',
      descMm: 'Ready To Use Page သို့ တိုက်ရိုက်သွားမည်',
      descEn: 'Direct access to Workflows Page',
      icon: Zap,
      link: '/admin'
    }
  ];

  // Customer နှိပ်လိုက်သည်နှင့် သက်ဆိုင်ရာ Link သို့ တိုက်ရိုက် ရောက်ရှိစေမည့် Function
  const handleSelectOption = (targetLink: string) => {
    router.push(targetLink);
  };

  return (
    <main style={{ minHeight: '100vh', background: '#ffffff', color: '#111111', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* Responsive Layout Styles */}
      <style jsx global>{`
        .onboarding-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }
        @media (min-width: 768px) {
          .onboarding-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
        }
        .onboarding-card {
          padding: 14px 16px;
          border-radius: 14px;
        }
        @media (min-width: 768px) {
          .onboarding-card {
            padding: 16px 20px;
            border-radius: 16px;
          }
        }
      `}</style>

      {/* ------------------------------------------------------------- */}
      {/* 1. ONBOARDING / SELECTION MODAL                                */}
      {/* ------------------------------------------------------------- */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}>
        <div style={{
          maxWidth: '900px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: '#ffffff',
          border: '2px solid #ff4d4f',
          borderRadius: '24px',
          padding: '24px 20px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.08)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ height: '8px', width: '8px', borderRadius: '50%', background: '#ff4d4f', display: 'inline-block' }}></span>
            <span style={{ color: '#ff4d4f', fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>
              AXU-II · AI SUPERSTORE
            </span>
          </div>
          
          <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#111111', marginBottom: '4px', letterSpacing: '-0.5px' }}>
            မင်္ဂလာပါ၊ AXU-II မှ ကြိုဆိုပါတယ် ခဗျာ။ <span style={{ color: '#71717a', fontSize: '15px', fontWeight: 400 }}>/ Welcome</span>
          </h1>
          
          <p style={{ fontSize: '12px', color: '#ff4d4f', fontWeight: 600, marginBottom: '20px', borderLeft: '3px solid #ff4d4f', paddingLeft: '10px', lineHeight: 1.4 }}>
            ဒီနေ့ ဘာလုပ်စရာရှိပါသလဲ? (အောက်ပါတို့မှ တစ်ခု ရွေးချယ်ပါ ခဗျ)<br />
            <span style={{ color: '#71717a', fontWeight: 400 }}>Select your primary objective today</span>
          </p>

          <div className="onboarding-grid">
            {notificationOptions.map((opt) => {
              const IconComp = opt.icon;
              return (
                <div 
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.link)}
                  className="onboarding-card"
                  style={{
                    background: '#f8f9fa',
                    border: '1px solid #e9ecef',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#ff4d4f';
                    e.currentTarget.style.background = '#fff5f5';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e9ecef';
                    e.currentTarget.style.background = '#f8f9fa';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ padding: '8px', background: '#ffffff', borderRadius: '10px', border: '1px solid rgba(255,77,79,0.3)', flexShrink: 0 }}>
                      <IconComp size={18} color="#ff4d4f" />
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#111111', lineHeight: 1.3 }}>
                        {opt.titleMm}
                      </div>
                      <div style={{ fontSize: '11px', fontWeight: 500, color: '#4b5563', marginTop: '2px' }}>
                        {opt.titleEn}
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={16} color="#ff4d4f" style={{ flexShrink: 0, marginLeft: '8px' }} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. BACKGROUND DASHBOARD INTERFACE                              */}
      {/* ------------------------------------------------------------- */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 16px', position: 'relative', opacity: 0.2 }}>
        
        {/* LATEST AI BRIEF NOTIFICATION BANNER */}
        <div style={{ 
          background: '#f8f9fa', 
          border: '1px solid #ff4d4f', 
          borderRadius: '14px', 
          padding: '12px 16px', 
          marginBottom: '20px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.03)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: '#ff4d4f', padding: '6px', borderRadius: '8px', color: '#ffffff' }}>
              <Bell size={14} />
            </div>
            <div>
              <span style={{ fontSize: '10px', fontWeight: 700, color: '#ff4d4f', letterSpacing: '1px', textTransform: 'uppercase' }}>
                LATEST AI BRIEF
              </span>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#111111' }}>
                {loadingMagazine ? 'Loading...' : latestMagazine ? latestMagazine.title : 'No articles available'}
              </div>
            </div>
          </div>
          <Link href="/magazine" style={{ fontSize: '11px', color: '#ff4d4f', fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap', marginLeft: '12px' }}>
            Read Brief ↗
          </Link>
        </div>

        {/* HERO SECTION */}
        <div className="hero" style={{ 
          border: '2px solid #ff4d4f', 
          borderRadius: '20px', 
          padding: '32px 24px', 
          background: '#ffffff', 
          color: '#111111', 
          marginBottom: '24px', 
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)' 
        }}>
          <div className="eyebrow" style={{ color: '#ff4d4f', letterSpacing: '2px', fontWeight: 700, fontSize: '10px', textTransform: 'uppercase', marginBottom: '8px' }}>
            AXU-II · AI SUPERSTORE
          </div>
          
          <h1 className="serif" style={{ fontSize: '2rem', fontWeight: 900, color: '#111111', margin: '8px 0', textTransform: 'uppercase', letterSpacing: '-0.5px' }}>
            WORK SMARTER. ACHIEVE MORE WITH AI.
          </h1>
          
          <p style={{ color: '#555555', fontSize: '13px', lineHeight: 1.6, maxWidth: '750px', margin: 0 }}>
            Discover everything you need about AI in one centralized place. Built to be your trusted store for digital products and AI solutions in the AI era.
          </p>
        </div>

        {/* AXU-II PRO MEMBERSHIP BOX */}
        <section style={{ 
          background: '#f8f9fa', 
          border: '2px solid #ff4d4f', 
          borderRadius: '20px', 
          padding: '24px', 
          marginBottom: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ padding: '10px', background: '#fff5f5', borderRadius: '12px', border: '1px solid #ff4d4f' }}>
              <Crown size={22} color="#ff4d4f" />
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111111', margin: 0 }}>AXU-II Pro Membership</h3>
              <p style={{ fontSize: '12px', color: '#666666', margin: '2px 0 0 0' }}>Unlimited Access & Premium AI Workflows via Telegram Bot</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
            {['Private Prompt Packs & Workflows', 'Exclusive Quality Sources', 'AXU-II Store VIP Discounts'].map((feat, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#ffffff', padding: '10px 12px', borderRadius: '10px', fontSize: '12px', color: '#111111', border: '1px solid #e9ecef' }}>
                <ShieldCheck size={14} color="#ff4d4f" />
                <span>{feat}</span>
              </div>
            ))}
          </div>

          <div>
            <button 
              onClick={() => setShowProModal(true)} 
              style={{ background: '#ff4d4f', color: '#ffffff', border: 'none', padding: '12px 20px', borderRadius: '10px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <Crown size={15} /> AXU-II Pro သို့ ချိတ်ဆက်မည် ✈️ ခဗျ
            </button>
          </div>
        </section>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. AXU-II PRO MEMBERSHIP MODAL                                */}
      {/* ------------------------------------------------------------- */}
      {showProModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', background: 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(8px)' }}>
          <div style={{ background: '#ffffff', border: '2px solid #ff4d4f', width: '100%', maxWidth: '440px', borderRadius: '20px', padding: '28px', position: 'relative' }}>
            <button 
              onClick={() => setShowProModal(false)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: '#666666', cursor: 'pointer', fontSize: '18px' }}
            >
              ✕
            </button>

            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'inline-flex', padding: '12px', background: '#fff5f5', borderRadius: '50%', border: '1px solid #ff4d4f', marginBottom: '10px' }}>
                <Crown size={24} color="#ff4d4f" />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#111111', margin: 0 }}>AXU-II Pro Membership</h3>
              <p style={{ fontSize: '12px', color: '#666666', marginTop: '4px' }}>Unlimited Access & Premium AI Support ခဗျ</p>
            </div>

            <a
              href="https://t.me/"
              target="_blank"
              rel="noreferrer"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#ff4d4f', color: '#ffffff', fontWeight: 700, fontSize: '13px', padding: '12px 20px', borderRadius: '10px', textDecoration: 'none' }}
            >
              <span>Telegram Bot မှတစ်ဆင့် Subscribe ပြုလုပ်ရန် ✈️ ခဗျ</span>
            </a>
          </div>
        </div>
      )}

    </main>
  );
}