'use client';

import { Post } from '@/model/post';
import useSWR, { mutate } from 'swr';
import PostContentsCard from './PostContentsCard';
import PostListCard from './PostListCard';
import usePosts from '@/hook/posts';

type Props = {
  postId: string;
};

export default function PostContents({ postId }: Props) {
  const { data: post, isLoading: loading } = useSWR<Post>(
    `/api/posts/${postId}`
  );

  const { deletePost } = usePosts();

  const handlePostDelete = () => {
    const userDecision = window.confirm('정말 삭제하시나요?');
    if (userDecision) {
      deletePost(postId);
    }
  };

  return (
    <section>
      {post && (
        <div>
          <button onClick={handlePostDelete}>삭제</button>
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
