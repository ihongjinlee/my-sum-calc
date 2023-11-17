'use client';

import useSWR from 'swr';
import { SimplePost } from '@/model/post';
import PostListCard from './PostListCard';

export default function PostList() {
  const { data: posts, isLoading: loading } =
    useSWR<SimplePost[]>('/api/posts');

  return (
    <section>
      {posts && (
        <ul>
          {posts.map((post) => (
            <li key={post.id} className='mt-10'>
              <PostListCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
