'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, LibraryBig, BrainCircuit, NotebookPen, FileText, ShieldCheck, Newspaper } from 'lucide-react';

const groups = [
  {
    title: 'Workspace',
    items: [
      { href: '/', label: 'Command Center', icon: LayoutDashboard },
      { href: '/magazine', label: 'Daily Magazine', icon: Newspaper },
      { href: '/library', label: 'Source Library', icon: LibraryBig },
      { href: '/insights', label: 'AXU-II Ai Store', icon: BrainCircuit },
      { href: '/notes', label: 'Prompt Packs', icon: NotebookPen },
    ],
  },
  {
    title: 'Manage',
    items: [
      { href: '/articles', label: 'Business & AI Book Kit', icon: FileText },
      { href: '/admin', label: 'Member Login', icon: ShieldCheck },
    ],
  },
];

export function Sidebar() {
  const path = usePathname();

  return (
    <header 
      style={{
        background: '#171a18',
        color: '#eae8e1',
        borderBottom: '1px solid #2c302c',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        width: '100%',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px'
      }}
    >
      {/* Brand Section */}
      <Link href="/" className="brand" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
        <div className="brand-mark">A</div>
        <div>
          <div className="brand-name" style={{ fontSize: '14px', fontWeight: 'bold' }}>AXU-II</div>
          <div className="brand-sub" style={{ fontSize: '10px' }}>KNOWLEDGE OS</div>
        </div>
      </Link>

      {/* Horizontal Navigation Menu (Mobile တွင် ဘေးတိုက် scroll ဆွဲ၍ ကြည့်နိုင်ရန် ပြုလုပ်ထားသည်) */}
      <nav 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '6px', 
          overflowX: 'auto', 
          whiteSpace: 'nowrap',
          scrollbarWidth: 'none', // Firefox အတွက် scrollbar ဖျောက်ရန်
          msOverflowStyle: 'none',  // IE/Edge အတွက်
          paddingBottom: '4px'
        }}
        className="no-scrollbar"
      >
        {groups.map((g) =>
          g.items.map((item) => {
            const I = item.icon;
            const isActive = path === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link ${isActive ? 'active' : ''}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 10px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  color: isActive ? '#ffffff' : '#c7c8c0',
                  background: isActive ? '#2c302c' : 'transparent',
                  borderBottom: isActive ? '2px solid #c4a66a' : '2px solid transparent',
                  flexShrink: 0
                }}
              >
                <I size={14} strokeWidth={1.7} />
                <span>{item.label}</span>
              </Link>
            );
          })
        )}
      </nav>

      {/* Right side Tag (Desktop တွင်သာ ပေါ်စေရန်) */}
      <div 
        className="hidden lg:block" 
        style={{ fontSize: '11px', color: '#c9b17b', fontWeight: 600, letterSpacing: '1px', flexShrink: 0 }}
      >
        BUILD WITH EVIDENCE
      </div>
    </header>
  );
}