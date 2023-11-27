import { useCallback } from 'react';
import { Post } from '@/model/post';
import useSWR, { useSWRConfig } from 'swr';

async function updatePostTitle(postId: string, title: string) {
  return fetch(`/api/post`, {
    method: 'PUT',
    body: JSON.stringify({ postId, title }),
  }).then((res) => res.json());
}

export default function useFullPost(postId: string) {
  const {
    data: post,
    isLoading,
    error,
    mutate,
  } = useSWR<Post>(`/api/posts/${postId}`);

  const { mutate: globalMutate } = useSWRConfig();

  const setPostTitle = useCallback(
    (post: Post, title: string) => {
      const newPost = {
        ...post,
        title,
      };

      return mutate(updatePostTitle(post.id, title), {
        optimisticData: newPost,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      }).then(() => globalMutate('/api/posts'));
    },
    [mutate, globalMutate]
  );

  return { post, isLoading, error, setPostTitle };
}
