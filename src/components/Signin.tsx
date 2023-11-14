'use client';

import { ClientSafeProvider, signIn } from 'next-auth/react';

type Props = {
  providers: Record<string, ClientSafeProvider>;
};

export default function Signin({ providers }: Props) {
  return (
    <>
      {Object.values(providers).map(({ name, id }) => (
        <div key={id} className='px-6 sm:px-0 max-w-sm'>
          <button
            type='button'
            className='text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-2xl px-5 py-2.5 text-center inline-flex items-center justify-between dark:focus:ring-[#4285F4]/55 mr-2 mb-2'
            onClick={() => signIn(id)}
          >
            {`${name} 계정으로 로그인 하기`}
          </button>
        </div>
      ))}
    </>
  );
}
