'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import { UserCheck, Lock, Loader2, ArrowRight } from 'lucide-react';

export default function MemberLoginPage() {
  const [status, setStatus] = useState('');
  const [email, setEmail] = useState('');
  const [verifying, setVerifying] = useState(false);
  const router = useRouter();

  async function handleMemberAccess() {
    setVerifying(true);
    setStatus('');

    try {
      const supabase = createClient();
      
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      
      if (!user) {
        setStatus('You are not signed in. Please sign in with your account first.');
        setVerifying(false);
        return;
      }
      
      setEmail(user.email || '');

      // Check user role from profiles table securely in background
      const { data, error: e } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .maybeSingle();
      
      if (e) throw e;
      
      const role = data?.role || 'member';

      // Auto-routing based on hidden database role
      if (role === 'admin') {
        setStatus('Session verified. Redirecting to dashboard...');
        setTimeout(() => {
          router.push('/admin/dashboard');
        }, 800);
      } else {
        setStatus('Session verified. Redirecting to Member Portal...');
        setTimeout(() => {
          router.push('/member-dashboard');
        }, 800);
      }

    } catch (err) {
      setStatus(err instanceof Error ? err.message : 'Unable to verify session. Please sign in again.');
      setVerifying(false);
    }
  }

  return (
    <main style={{ background: '#f8f9fa', color: '#1a1a1a', minHeight: '100vh', padding: '60px 20px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: '480px', margin: '0 auto', background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '40px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
        
        {/* Header Branding */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ width: '48px', height: '48px', background: '#171a18', color: '#c9b17b', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
            <Lock size={22} />
          </div>
          <div style={{ fontSize: '11px', color: '#c9b17b', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>
            AXU-II KNOWLEDGE OS
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'serif', color: '#111111', margin: 0 }}>
            Member Portal Access
          </h1>
        </div>

        <p style={{ fontSize: '13px', color: '#6b7280', textAlign: 'center', lineHeight: 1.6, marginBottom: '28px' }}>
          Sign in or verify your active session to access your exclusive learning feed, resources, and member dashboard.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button 
            onClick={handleMemberAccess}
            disabled={verifying}
            style={{
              width: '100%',
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
              gap: '8px',
              opacity: verifying ? 0.7 : 1
            }}
          >
            {verifying ? <Loader2 size={16} className="animate-spin" /> : <UserCheck size={16} />}
            {verifying ? 'Verifying Session...' : 'Continue to Member Portal'}
          </button>

          <Link 
            href="/login" 
            style={{
              width: '100%',
              background: '#f3f4f6',
              color: '#111111',
              border: '1px solid #e5e7eb',
              padding: '12px',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: 600,
              textDecoration: 'none',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            Sign In with Account <ArrowRight size={16} />
          </Link>
        </div>

        {status && (
          <div style={{ marginTop: '20px', padding: '12px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '12px', color: '#374151', textAlign: 'center' }}>
            {status}
          </div>
        )}

        {email && (
          <div style={{ fontSize: '11px', color: '#9ca3af', textAlign: 'center', marginTop: '16px' }}>
            Signed in as: <strong style={{ color: '#111111' }}>{email}</strong>
          </div>
        )}

      </div>
    </main>
  );
}