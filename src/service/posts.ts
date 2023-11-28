import { PostListItem } from '@/model/post';
import { client } from './sanity';

export async function getPostsOf(username: string) {
  return client.fetch(`
    *[_type == "post" && author->username == "${username}"]
        | order(_createdAt desc){
        "id":_id,
        "createdAt":_createdAt,
        "title":title,
        "sum":sum        
        }
    `);
}

export async function getPost(postId: string) {
  return client.fetch(`
  *[_type=="post" && _id=="${postId}"][0]{
        ...,
        "id":_id
      }
  `);
}

export async function createPost(
  userId: string,
  title: string,
  list: PostListItem[],
  sum: number
) {
  return client.create({
    _type: 'post',
    author: { _ref: userId },
    title,
    list,
    sum,
  });
}

export async function deletePost(postId: string) {
  return client.delete(postId);
}

export async function updatePostTitle(postId: string, title: string) {
  return client.patch(postId).set({ title }).commit();
}

export async function addPostListItem(
  postId: string,
  memo: string,
  value: number
) {
  return client
    .patch(postId) //
    .setIfMissing({ list: [] })
    .append('list', [
      {
        memo,
        value,
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}
