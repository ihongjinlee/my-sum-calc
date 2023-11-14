'use client';

import { useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';

export default function Navbar() {
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      '(prefers-color-scheme: dark)'
    );

    const toggleDarkMode = (
      e: MediaQueryListEvent | MediaQueryList | Event
    ) => {
      if ('matches' in e) {
        document.documentElement.classList.toggle('dark', e.matches);
      }
    };

    toggleDarkMode(darkModeMediaQuery);
    darkModeMediaQuery.addEventListener('change', toggleDarkMode);

    return () => {
      darkModeMediaQuery.removeEventListener('chagne', toggleDarkMode);
    };
  }, []);

  const { data: session } = useSession();

  return (
    <div className='flex justify-between items-center h-[60px] px-4'>
      <nav>
        <ul className='text-2xl font-bold'>나의 합계 계산기</ul>
      </nav>
      <nav>
        {session && <button onClick={() => signOut()}>로그아웃</button>}
      </nav>
    </div>
  );
}
