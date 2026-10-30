import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Sidebar } from '@/lib/sidebar';

export const metadata: Metadata = { 
  title: 'Economic Architect OS', 
  description: 'A private knowledge and leverage operating system.' 
};

// ဖုန်းစခരീန်းများတွင် Scale မှန်ကန်စေရန် Viewport သတ်မှတ်ချက် ထည့်သွင်းခြင်း
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ 
  children 
}: Readonly<{ children: React.ReactNode }>) { 
  return (
    <html lang="en">
      <body className="bg-[#F8F9FA] text-[#111111] font-sans antialiased overflow-x-hidden">
        
        {/* Top Header Navigation Bar */}
        <header className="w-full sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
          <Sidebar />
        </header>

        {/* Main Content Wrapper (ဖုန်းစခരീန်းများတွင် Padding နှင့် Max-width သင့်လျော်စွာ ထည့်သွင်းခြင်း) */}
        <main className="w-full min-h-screen px-4 sm:px-6 lg:px-8 py-4">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

      </body>
    </html>
  );
}