import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import AuthContext from '@/context/AuthContext';
import SWRConfigContext from '@/context/SWRConfigContext';

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
      <body
        className={`${inter.className} bg-stone-100 dark:bg-stone-950 text-stone-950 dark:text-stone-100`}
      >
        <AuthContext>
          <header className='z-10'>
            <Navbar />
          </header>
          <main className='h-[calc(100vh-60px)]'>
            <SWRConfigContext>{children}</SWRConfigContext>
          </main>
        </AuthContext>
      </body>
    </html>
  );
}
