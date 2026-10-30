'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase';

interface Magazine {
id: string;
title: string;
excerpt?: string;
body_md?: string;
source_urls?: string[];
created_at: string;
}

export default function MagazineListPage() {
const [magazines, setMagazines] = useState<Magazine[]>([]);
const [loading, setLoading] = useState(true);
const supabase = createClient();

useEffect(() => {
async function fetchMagazines() {
const { data, error } = await supabase
.from('articles')
.select('*')
.eq('status', 'published')
.eq('category', 'magazine')
.order('created_at', { ascending: false });

if (!error && data) {
setMagazines(data);
}
setLoading(false);
}

fetchMagazines();
}, [supabase]);

const getValidImageUrl = (urlOrPath: string) => {
if (!urlOrPath) return null;
if (urlOrPath.startsWith('http://') || urlOrPath.startsWith('https://')) {
return urlOrPath;
}
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tnlkispfkhdupnlcgsqu.supabase.co';
const cleanPath = urlOrPath.replace(/^\/+/, '');
return `${supabaseUrl}/storage/v1/object/public/magazine-images/${cleanPath}`;
};

return (
<div style={{ backgroundColor: '#ffffff', minHeight: '100vh', color: '#111111' }}>
<div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 24px', fontFamily: 'sans-serif' }}>
{/* HEADER SECTION */}
<div style={{ borderBottom: '1px solid #e0e0e0', paddingBottom: '24px', marginBottom: '40px' }}>
<div style={{ fontSize: '12px', color: '#b8860b', letterSpacing: '2px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
AXU-II KNOWLEDGE OS
</div>
<h1 style={{ fontSize: '32px', fontFamily: 'serif', margin: 0, color: '#111111', fontWeight: 700 }}>
Daily Magazine & Global Insights
</h1>
<p style={{ color: '#555555', fontSize: '15px', marginTop: '10px' }}>
Curated high-value articles and translated publications.
</p>
</div>

{/* MAGAZINE LIST */}
{loading ? (
<div style={{ textAlign: 'center', padding: '80px 0', color: '#777777' }}>Loading daily articles...</div>
) : magazines.length === 0 ? (
<div style={{ textAlign: 'center', padding: '60px 0', border: '1px dashed #cccccc', color: '#777777' }}>
မဂ္ဂဇင်း ဆောင်းပါးများ မရှိသေးပါ။
</div>
) : (
<div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
{magazines.map((item) => {
const rawUrl = item.source_urls && item.source_urls.length > 0 ? item.source_urls[0] : null;
const imageUrl = getValidImageUrl(rawUrl || '');

return (
<article
key={item.id}
className="grid grid-cols-1 md:grid-cols-[1fr_240px] gap-6 pb-8 border-b border-gray-200 items-start"
>
<div>
<div style={{ fontSize: '12px', color: '#b8860b', fontWeight: 700, marginBottom: '8px' }}>
DAILY MAGAZINE • {new Date(item.created_at).toLocaleDateString()}
</div>

{/* TITLE CLICK TO OPEN FULL PAGE */}
<Link href={`/magazine/${item.id}`} style={{ textDecoration: 'none' }}>
<h2 style={{ fontSize: '22px', fontFamily: 'serif', color: '#111111', margin: '0 0 12px 0', cursor: 'pointer', fontWeight: 600 }}>
{item.title}
</h2>
</Link>

{/* EXCERPT */}
<p style={{
color: '#333333',
fontSize: '15px',
lineHeight: '1.6',
margin: '0 0 16px 0',
display: '-webkit-box',
WebkitLineClamp: 3,
WebkitBoxOrient: 'vertical',
overflow: 'hidden'
}}>
{item.excerpt || (item.body_md ? item.body_md.slice(0, 180) + '...' : '')}
</p>

<Link href={`/magazine/${item.id}`} style={{ fontSize: '13px', color: '#b8860b', textDecoration: 'none', fontWeight: 700 }}>
Read Full Article →
</Link>
</div>

{imageUrl && (
<div className="w-full h-48 md:h-[160px] overflow-hidden rounded-md bg-gray-100 order-first md:order-last">
<img
src={imageUrl}
alt={item.title}
style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
onError={(e) => {
e.currentTarget.style.display = 'none';
}}
/>
</div>
)}
</article>
);
})}
</div>
)}
</div>
</div>
);
} 