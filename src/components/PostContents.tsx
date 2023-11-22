'use client';

import { Post, PostListItem } from '@/model/post';
import useSWR from 'swr';
import PostContentsCard from './PostContentsCard';
import PostListCard from './PostListCard';

type Props = {
  postId: string;
};

export default function PostContents({ postId }: Props) {
  const { data: post, isLoading: loading } = useSWR<Post>(
    `/api/posts/${postId}`
  );

  return (
    <section>
      {post && (
        <div>
          <PostListCard post={post} />

          {post.list &&
            post.list.map(({ memo, value }, index) => (
              <PostContentsCard key={index} memo={memo} value={value} />
            ))}
        </div>
      )}
    </section>
  );
}
