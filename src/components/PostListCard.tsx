import { SimplePost } from '@/model/post';

type Props = {
  post: SimplePost;
};

export default function PostListCard({ post: { title, sum } }: Props) {
  return (
    <article className='w-[400px] p-10 bg-blue-800 rounded-2xl shadow-md'>
      <h2 className='text-sm'>{title}</h2>
      <h1 className='text-3xl font-bold'>
        {sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      </h1>
    </article>
  );
}
