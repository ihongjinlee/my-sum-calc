'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useRef, useState } from 'react';
import { PostListItem } from '@/model/post';

export default function NewPost() {
  const [items, setItems] = useState<PostListItem[]>([]);
  const [memo, setMemo] = useState('');
  const [inputValue, setInputValue] = useState('');

  function createPostListItem(
    memo: string,
    valueAsString: string
  ): PostListItem {
    return {
      memo,
      value: parseInt(valueAsString, 10),
    };
  }

  const addItem = () => {
    if (memo === '' || inputValue === '') {
      return;
    }

    setItems([...items, createPostListItem(memo, inputValue)]);
    setMemo('' as string);
    setInputValue('' as string);
  };

  const removeItem = (index: number) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

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
      <form className='w-full flex flex-col' onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          className='outline-none text-lg border border-neutral-300 text-gray-950 h-[40px]'
          name='text'
          id='input-title'
          required
          placeholder={'제목을 지어주세요.'}
          ref={titleRef}
        />
        <div className='grid grid-cols-1'>
          <label>List</label>

          <ul>
            {items.map((item, index) => (
              <li className='flex' key={index}>
                <div className='text-2xl text-gray-950'>
                  {item?.memo} {item?.value}
                </div>
                <button onClick={() => removeItem(index)}>Remove</button>
              </li>
            ))}
          </ul>

          <div>
            <input
              className='grow outline-none text-lg border border-neutral-300 text-gray-950'
              type='text'
              id='input-memo'
              value={memo}
              placeholder={'메모할 수 있어요.'}
              onChange={(e) => setMemo(e.target.value)}
            />
            <input
              className='flex-none w-40 outline-none text-lg border border-neutral-300 text-gray-950'
              type='number'
              id='input-value'
              value={inputValue}
              placeholder={'12345'}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              type='button'
              className='flex-none w-20 bg-green-500 hover:bg-green-500/90 focus:ring-4 focus:outline-none focus:ring-green-500/50 dark:focus:ring-green-500/55
              items-center justify-between'
              onClick={addItem}
            >
              <h1 className='text-gray-900 font-bold'>+</h1>
            </button>
          </div>
        </div>

        <button
          type='submit'
          className='bg-yellow-500 hover:bg-yellow-500/90 focus:ring-4 focus:outline-none focus:ring-yellow-500/50 dark:focus:ring-yellow-500/55
          w-full items-center justify-between h-[60px]'
        >
          <h1 className='text-gray-900 text-2xl font-bold'>저장하기</h1>
        </button>
      </form>
    </section>
  );
}
