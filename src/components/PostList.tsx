'use client';

import useSWR from 'swr';
import { SimplePost } from '@/model/post';

export default function PostList() {
  const { data: posts, isLoading: loading } =
    useSWR<SimplePost[]>('/api/posts');

  return (
    <section>
      <ul>
        {posts &&
          posts.map(({ id, title, sum }) => (
            <li key={id}>
              {title} : {sum}
            </li>
          ))}
      </ul>
    </section>
  );
}
