import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Sidebar } from '@/lib/sidebar';

export const metadata: Metadata = { 
  title: 'Economic Architect OS', 
  description: 'A private knowledge and leverage operating system.' 
};

// ဖုန်းစခရင်မ်များတွင် အသုံးပြုသူအလိုရှိသလို Zoom in ဆွဲနိုင်ရန် Viewport သတ်မှတ်ချက်
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ 
  children 
}: Readonly<{ children: React.ReactNode }>) { 
  return (
    <html lang="en">
      <body className="bg-[#F8F9FA] text-[#111111] font-sans antialiased overflow-x-hidden w-full m-0 p-0 box-border">
        
        {/* Professional Top Header Navigation Bar */}
        <header className="w-full sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 box-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full box-border">
            <Sidebar />
          </div>
        </header>

        {/* Main Content Wrapper (Professional Layout Spacing) */}
        <main className="w-full min-h-screen box-border">
          <div className="max-w-7xl mx-auto w-full box-border">
            {children}
          </div>
        </main>

      </body>
    </html>
  );
}