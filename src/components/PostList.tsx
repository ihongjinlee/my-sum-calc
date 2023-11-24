'use client';

import PostListCard from './PostListCard';
import Link from 'next/link';
import usePosts from '@/hook/posts';

export default function PostList() {
  const { posts, isLoading: loading } = usePosts();

  return (
    <section>
      {posts && (
        <div>
          {posts.map((post) => (
            <Link key={post.id} href={`/post/${post.id}`}>
              <PostListCard post={post} />
            </Link>
          ))}
          <Link href={`/new`}>
            <button
              className='bg-yellow-500 hover:bg-yellow-500/90 focus:ring-4 focus:outline-none focus:ring-yellow-500/50 dark:focus:ring-yellow-500/55
              w-full items-center justify-between h-[60px]'
            >
              <h1 className='text-gray-900 text-3xl font-bold'>+</h1>
            </button>
          </Link>
        </div>
      )}
    </section>
  );
}
