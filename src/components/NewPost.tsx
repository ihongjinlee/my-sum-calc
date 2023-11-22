'use client';

import { AuthUser } from '@/model/user';
import { useRouter } from 'next/navigation';
import { FormEvent, useRef, useState } from 'react';
import Avatar from './Avatar';

type Props = {
  user: AuthUser;
};

export default function NewPost({ user }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const titleRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();
    formData.append('title', titleRef.current?.value ?? '');

    fetch('/api/posts/', { method: 'POST', body: formData }) //
      .then((res) => {
        if (!res.ok) {
          setError(`${res.status} ${res.statusText}`);
          return;
        }

        router.push('/');
      })
      .catch((err) => setError(err.toString()))
      .finally(() => setLoading(false));
  };

  return (
    <section className='w-full flex flex-col items-center'>
      {loading && <p>로딩중...</p>}
      {error && <p>{error}</p>}
      <Avatar image={user.image} size='medium' />
      <form className='w-full flex flex-col' onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          className='outline-none text-lg border border-neutral-300 text-gray-950'
          name='text'
          id='input-title'
          required
          placeholder={'제목을 입력하세요.'}
          ref={titleRef}
        />
        <label>List</label>
        <div className=''></div>
        <input
          className='outline-none text-lg border border-neutral-300 text-gray-950'
          name='text'
          id='input-value'
          required
          placeholder={'값을 입력하세요.'}
        />
        <input
          className='outline-none text-lg border border-neutral-300 text-gray-950'
          name='text'
          id='input-memo'
          required
          placeholder={'메모를 입력하세요.'}
        />

        <button
          className='bg-yellow-500 hover:bg-yellow-500/90 focus:ring-4 focus:outline-none focus:ring-yellow-500/50 dark:focus:ring-yellow-500/55
          w-full items-center justify-between h-[60px]'
        >
          <h1 className='text-gray-900 text-2xl font-bold'>저장하기</h1>
        </button>
      </form>
    </section>
  );
}
