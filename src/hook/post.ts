import { useCallback } from 'react';
import { Post, PostListItem } from '@/model/post';
import useSWR, { useSWRConfig } from 'swr';

async function updatePostTitle(postId: string, title: string) {
  return fetch(`/api/post`, {
    method: 'PUT',
    body: JSON.stringify({ postId, title }),
  }).then((res) => res.json());
}

async function updatePostSum(postId: string, sum: number) {
  return fetch(`/api/postsum`, {
    method: 'PUT',
    body: JSON.stringify({ postId, sum }),
  }).then((res) => res.json());
}

async function addPostListItem(postId: string, memo: string, value: number) {
  return fetch('/api/postlistitem', {
    method: 'POST',
    body: JSON.stringify({ postId, memo, value }),
  }).then((res) => res.json());
}

async function apiDeletePostListItem(postId: string, postListItemId: string) {
  return fetch('/api/postlistitem', {
    method: 'DELETE',
    body: JSON.stringify({ postId, postListItemId }),
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

  const postListItem = useCallback(
    (item: PostListItem, sum: number) => {
      if (!post) return;

      let newPost =
        post.list == null
          ? {
              ...post,
              list: [item],
              sum,
            }
          : {
              ...post,
              list: [...post.list, item],
              sum,
            };

      updatePostSum(post.id, sum);

      return mutate(addPostListItem(post.id, item.memo, item.value), {
        optimisticData: newPost,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      }).then(() => globalMutate('/api/posts'));
    },
    [post, mutate, globalMutate]
  );

  const deletePostListItem = useCallback(
    (postListItemId: string, sum: number) => {
      if (!post) return;

      const newPost = {
        ...post,
        list: post.list.filter((item) => item._key !== postListItemId),
        sum,
      };

      updatePostSum(post.id, sum);

      return mutate(apiDeletePostListItem(post.id, postListItemId), {
        optimisticData: newPost,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      }).then(() => globalMutate('/api/posts'));
    },
    [post, mutate, globalMutate]
  );

  return {
    post,
    isLoading,
    error,
    setPostTitle,
    postListItem,
    deletePostListItem,
  };
}
