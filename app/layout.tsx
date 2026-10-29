import type { Metadata } from 'next';
import './globals.css';
import { Sidebar } from '@/lib/sidebar';

export const metadata: Metadata = { 
  title: 'Economic Architect OS', 
  description: 'A private knowledge and leverage operating system.' 
};

export default function RootLayout({ 
  children 
}: Readonly<{ children: React.ReactNode }>) { 
  return (
    <html lang="en">
      <body className="bg-[#F8F9FA] text-[#111111] font-sans antialiased">
        
        {/* Top Header Navigation Bar (Sidebar Component ကို Header အဖြစ် သုံးထားသည်) */}
        <Sidebar />

        {/* Main Content Wrapper (ဘေး Sidebar မရှိတော့ဘဲ Screen အပြည့် ဖြန့်ကျက်မည်) */}
        <main className="w-full">
          {children}
        </main>

      </body>
    </html>
  );
}