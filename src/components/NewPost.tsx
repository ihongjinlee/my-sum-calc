'use client';

import { FormEvent } from 'react';

export default function NewPost() {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className='w-full flex flex-col items-center'>
      <form className='w-full flex flex-col' onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          className='outline-none text-lg border border-neutral-300 text-gray-950'
          name='text'
          id='input-text'
          required
          placeholder={'제목을 입력하세요.'}
        />
        <label>List</label>
        <div className=''></div>
        <input
          className='outline-none text-lg border border-neutral-300 text-gray-950'
          name='text'
          id='input-text'
          required
          placeholder={'값을 입력하세요.'}
        />
        <input
          className='outline-none text-lg border border-neutral-300 text-gray-950'
          name='text'
          id='input-text'
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
