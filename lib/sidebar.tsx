'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, LibraryBig, BrainCircuit, NotebookPen, FileText, ShieldCheck, Newspaper } from 'lucide-react';

const groups = [
  {
    title: 'Workspace',
    items: [
      { href: '/', label: 'Command Center', icon: LayoutDashboard },
      { href: '/magazine', label: 'Daily AI Briefing', icon: Newspaper },
      { href: '/library', label: 'Quality Source Library', icon: LibraryBig },
      { href: '/insights', label: 'AXU-II Ai Store', icon: BrainCircuit },
      { href: '/notes', label: 'Smart Prompt', icon: NotebookPen },
    ],
  },
  {
    title: 'Manage',
    items: [
      { href: '/articles', label: 'AI Tool Finder', icon: FileText },
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
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px'
      }}
    >
      {/* Brand Section */}
      <Link href="/" className="brand" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div className="brand-mark">A</div>
        <div>
          <div className="brand-name">AXU-II</div>
          <div className="brand-sub">KNOWLEDGE OS</div>
        </div>
      </Link>

      {/* Horizontal Navigation Menu */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
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
                  gap: '8px',
                  padding: '8px 14px',
                  borderRadius: '4px',
                  fontSize: '13px',
                  color: isActive ? '#ffffff' : '#c7c8c0',
                  background: isActive ? '#2c302c' : 'transparent',
                  borderBottom: isActive ? '2px solid #c4a66a' : '2px solid transparent',
                  margin: 0,
                  whiteSpace: 'nowrap'
                }}
              >
                <I size={15} strokeWidth={1.7} />
                <span>{item.label}</span>
              </Link>
            );
          })
        )}
      </nav>

      {/* Right side Tag */}
      <div style={{ fontSize: '11px', color: '#c9b17b', fontWeight: 600, letterSpacing: '1px' }}>
        BUILD WITH EVIDENCE
      </div>
    </header>
  );
}