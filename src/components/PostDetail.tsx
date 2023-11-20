'use client';

import { Post, PostListItem } from '@/model/post';
import useSWR from 'swr';

type Props = {
  postId: string;
};

export default function PostDetail({ postId }: Props) {
  const { data: post, isLoading: loading } = useSWR<Post>(
    `/api/posts/${postId}`
  );

  function sum(arr: PostListItem[]) {
    return arr.reduce((acc, obj) => acc + obj.value, 0);
  }

  return (
    <section>
      {post && (
        <div>
          <h1>{post.title}</h1>
          <h2>{post.sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h2>
          <ul>
            {post.list.map(({ memo, value }, index) => (
              <li key={index} className='mt-1'>
                {memo} {value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </li>
            ))}
          </ul>
          <div>
            sum :{' '}
            {sum(post.list)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </div>
        </div>
      )}
    </section>
  );
}
