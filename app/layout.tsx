import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Sidebar } from '@/lib/sidebar';

export const metadata: Metadata = { 
  title: 'Economic Architect OS', 
  description: 'A private knowledge and leverage operating system.' 
};

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
      <body className="bg-[#F8F9FA] text-[#111111] font-sans antialiased overflow-x-hidden w-full m-0 p-0 box-border">
        
        {/* Top Header Navigation Bar (Container အတွင်း padding တူညီစေရန် max-w နဲ့ mx-auto သုံးထားသည်) */}
        <header className="w-full sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Sidebar />
          </div>
        </header>

        {/* Main Content Wrapper */}
        <main className="w-full min-h-screen px-4 sm:px-6 lg:px-8 py-6 box-border">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>

      </body>
    </html>
  );
}