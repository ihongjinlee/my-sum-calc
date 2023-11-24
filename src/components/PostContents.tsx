'use client';

import PostContentsCard from './PostContentsCard';
import PostContentsHeader from './PostContentsHeader';
import usePosts from '@/hook/posts';
import useFullPost from '@/hook/post';

type Props = {
  postId: string;
};

export default function PostContents({ postId }: Props) {
  const { post, isLoading: loading } = useFullPost(postId);

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
          <PostContentsHeader post={post} />
          {post.list &&
            post.list.map(({ memo, value }, index) => (
              <PostContentsCard key={index} memo={memo} value={value} />
            ))}
        </div>
      )}
    </section>
  );
}
