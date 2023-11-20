'use client';

import useSWR from 'swr';
import { SimplePost } from '@/model/post';
import PostListCard from './PostListCard';
import Link from 'next/link';

export default function PostList() {
  const { data: posts, isLoading: loading } =
    useSWR<SimplePost[]>('/api/posts');

  return (
    <section>
      {posts && (
        <ul>
          {posts.map((post) => (
            <li key={post.id} className='mt-10'>
              <Link href={`/post/${post.id}`}>
                <PostListCard post={post} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
