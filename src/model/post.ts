export type SimplePost = {
  id: string;
  title: string;
  sum: number;
};

export type PostListItem = {
  memo: string;
  value: number;
  _key: string;
};

export type Post = {
  id: string;
  title: string;
  sum: number;
  list: PostListItem[];
};
