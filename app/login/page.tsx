'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'in' | 'up'>('in');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage('');

    try {
      const db = createClient();
      const r = mode === 'in' 
        ? await db.auth.signInWithPassword({ email, password }) 
        : await db.auth.signUp({ email, password });

      if (r.error) throw r.error;

      if (mode === 'in') {
        setMessage('Signed in. Checking permissions...');
        
        const user = r.data.user;
        if (user) {
          // Check user role from profiles table
          const { data: profile, error: profileError } = await db
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .maybeSingle();

          if (profileError) {
            console.error('Error fetching profile role:', profileError);
          }

          // Role အလိုက် လမ်းကြောင်းခွဲ၍ Redirect လုပ်ခြင်း
          if (profile?.role === 'admin') {
            router.push('/admin/dashboard');
          } else {
            router.push('/dashboard');
          }
        } else {
          router.push('/dashboard');
        }
      } else {
        setMessage('Account created. Check your email if confirmation is enabled.');
      }
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'Unable to authenticate. Configure Supabase first.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="main-content" style={{ maxWidth: 680 }}>
      <div className="eyebrow">Private workspace</div>
      <h1 className="page-title">Member access</h1>
      <p className="page-intro">
        Create a private account or sign in. Before launch, enable email confirmation, configure redirect URLs and apply the database security policies in the deployment guide.
      </p>

      <form className="panel" onSubmit={submit}>
        <div className="form-grid">
          <div style={{ gridColumn: '1/-1' }}>
            <label className="field-label">Email</label>
            <input 
              className="input" 
              type="email" 
              autoComplete="email" 
              required 
              value={email} 
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div style={{ gridColumn: '1/-1' }}>
            <label className="field-label">Password (minimum 8 characters recommended)</label>
            <input 
              className="input" 
              type="password" 
              autoComplete={mode === 'in' ? 'current-password' : 'new-password'} 
              minLength={8} 
              required 
              value={password} 
              onChange={e => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 22, flexWrap: 'wrap' }}>
          <button className="btn" disabled={busy}>
            {busy ? 'Please wait…' : mode === 'in' ? 'Sign in' : 'Create account'}
          </button>
          <button 
            type="button" 
            className="btn btn-outline" 
            onClick={() => setMode(mode === 'in' ? 'up' : 'in')}
          >
            {mode === 'in' ? 'Create account instead' : 'I already have an account'}
          </button>
        </div>

        {message && <div className="notice" style={{ marginTop: 16 }}>{message}</div>}
      </form>

      <p className="footer-note">Do not enable public registration without setting up spam protection, email verification and appropriate access policies.</p>
    </main>
  );
}