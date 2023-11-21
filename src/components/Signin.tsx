'use client';

import { ClientSafeProvider, signIn } from 'next-auth/react';

type Props = {
  providers: Record<string, ClientSafeProvider>;
};

export default function Signin({ providers }: Props) {
  return (
    <>
      {Object.values(providers).map(({ name, id }) => (
        <div key={id}>
          <button
            type='button'
            className='text-white font-bold bg-[#1d9df0] hover:bg-[#1d9df0]/90 focus:ring-4 focus:outline-none focus:ring-[#1d9df0]/50 dark:focus:ring-[#1d9df0]/55
            rounded-2xl px-10 py-5 text-center w-full inline-flex items-center justify-between'
            onClick={() => signIn(id)}
          >
            {`${name} 계정으로 로그인 하기`}
          </button>
        </div>
      ))}
    </>
  );
}
