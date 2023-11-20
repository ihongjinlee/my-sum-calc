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

export async function getPost(id: string) {
  return client.fetch(`
  *[_type=="post" && _id=="${id}"][0]{
        ...,
        "id":_id
      }
  `);
}
