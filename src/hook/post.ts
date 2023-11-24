import { Post } from '@/model/post';
import useSWR, { useSWRConfig } from 'swr';

export default function useFullPost(postId: string) {
  const { data: post, isLoading, error } = useSWR<Post>(`/api/posts/${postId}`);
  const { mutate } = useSWRConfig();

  const updatePostTitle = (postId: string, title: string) => {
    fetch(`/api/post`, {
      method: 'PUT',
      body: JSON.stringify({ postId, title }),
    }).then((res) => {
      res.json();
      mutate(`/api/posts/${postId}`);
    });
  };

  return { post, isLoading, error, updatePostTitle };
}
