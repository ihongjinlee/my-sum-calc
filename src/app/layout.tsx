import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '나의 합계 계산기',
  description: '수치의 합계를 보기 편하게',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${inter.className}`}>
        <header className='z-10'>
          <Navbar />
        </header>
        <main className='h-[calc(100vh-60px)]'>{children}</main>
      </body>
    </html>
  );
}
