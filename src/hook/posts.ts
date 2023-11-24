import { SimplePost } from '@/model/post';
import useSWR, { useSWRConfig } from 'swr';
import { useRouter } from 'next/navigation';

export default function usePosts() {
  const { data: posts, isLoading, error } = useSWR<SimplePost[]>('/api/posts');
  const { mutate } = useSWRConfig();
  const router = useRouter();

  const deletePost = (postId: string) => {
    fetch(`/api/posts/${postId}`, { method: 'DELETE' }) //
      .then(() => {
        mutate('/api/posts');
        router.push('/');
      });
  };

  return { posts, isLoading, error, deletePost };
}
