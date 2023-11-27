import { useCallback } from 'react';
import { SimplePost } from '@/model/post';
import useSWR from 'swr';

async function deletePost(postId: string) {
  return fetch(`/api/posts/${postId}`, {
    method: 'DELETE',
  }).then((res) => res.json());
}

export default function usePosts() {
  const {
    data: posts,
    isLoading,
    error,
    mutate,
  } = useSWR<SimplePost[]>('/api/posts');

  const setDeletePost = useCallback(
    (postId: string) => {
      const newPosts = posts?.filter((item) => item.id !== postId);

      return mutate(deletePost(postId), {
        optimisticData: newPosts,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [posts, mutate]
  );

  return { posts, isLoading, error, setDeletePost };
}
