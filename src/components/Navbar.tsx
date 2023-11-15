'use client';

import packageJson from '../../package.json';
import { useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Avatar from './Avatar';

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
  const user = session?.user;

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className='flex justify-between items-center h-[60px] px-4'>
      <nav className='flex'>
        <div className='text-2xl font-bold'>나의 합계 계산기</div>
        {(process.env.NEXT_PUBLIC_RUN_MODE === 'local' ||
          process.env.NEXT_PUBLIC_RUN_MODE === 'development') && (
          <div className='flex items-end text-gray-500 text-sm`'>
            {process.env.NEXT_PUBLIC_RUN_MODE} v{packageJson.version}
          </div>
        )}
      </nav>
      <nav>
        <ul className='flex gap-2 items-center'>
          {user && (
            <li>
              <Avatar image={user.image} size='medium' />
            </li>
          )}
          <li>
            {session && <button onClick={handleSignOut}>로그아웃</button>}
          </li>
        </ul>
      </nav>
    </div>
  );
}
