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
        <div>
          {posts.map((post) => (
            <Link key={post.id} href={`/post/${post.id}`}>
              <PostListCard post={post} />
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
