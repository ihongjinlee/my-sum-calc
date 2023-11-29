'use client';

import PostContentsCard from './PostContentsCard';
import PostContentsHeader from './PostContentsHeader';
import usePosts from '@/hook/posts';
import useFullPost from '@/hook/post';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
const { v4: uuidv4 } = require('uuid');

type Props = {
  postId: string;
};

export default function PostContents({ postId }: Props) {
  const {
    post,
    isLoading: loading,
    postListItem,
    deletePostListItem,
  } = useFullPost(postId);

  const { setDeletePost } = usePosts();
  const router = useRouter();

  const handlePostDelete = () => {
    const userDecision = window.confirm('정말 삭제하시나요?');
    if (userDecision) {
      setDeletePost(postId);
      router.push('/');
    }
  };

  const [memo, setMemo] = useState('');
  const [inputValue, setInputValue] = useState('');

  const addItem = () => {
    if (memo === '' || inputValue === '' || !post) {
      return;
    }

    postListItem(
      { memo, value: Number(inputValue), _key: uuidv4() },

      post.list.reduce(
        (previousValue, { value: currentValue }) =>
          previousValue + currentValue,
        0
      ) + Number(inputValue)
    );

    setMemo('' as string);
    setInputValue('' as string);
  };

  const deleteItem = (postListItemId: string) => {
    if (!post) {
      return;
    }

    deletePostListItem(
      postListItemId,
      post.list
        .filter((item) => item._key !== postListItemId)
        .reduce(
          (previousValue, { value: currentValue }) =>
            previousValue + currentValue,
          0
        )
    );
  };

  return (
    <section>
      {post && (
        <div>
          <div>
            <button onClick={handlePostDelete}>삭제</button>
            <PostContentsHeader post={post} />
            {post.list &&
              post.list.map(({ memo, value, _key }) => (
                <PostContentsCard
                  key={_key}
                  memo={memo}
                  value={value}
                  _key={_key}
                  onClickDeleteItem={deleteItem}
                />
              ))}
          </div>
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
              placeholder={'10000'}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              type='button'
              className='flex-none w-20 bg-green-500 hover:bg-green-500/90 focus:ring-4 focus:outline-none focus:ring-green-500/50 dark:focus:ring-green-500/55
                    items-center justify-between'
              onClick={addItem}
            >
              <h1 className='text-gray-900 font-bold'>추가</h1>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
