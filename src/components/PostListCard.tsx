import { SimplePost } from '@/model/post';
import { addComma } from '@/components/util/regexs';

type Props = {
  post: SimplePost;
};

export default function PostListCard({ post: { title, sum } }: Props) {
  return (
    <button
      className='bg-[#1d9df0] hover:bg-[#1d9df0]/90 focus:ring-4 focus:outline-none focus:ring-[#1d9df0]/50 dark:focus:ring-[#1d9df0]/55
    px-10 py-5 w-full items-center justify-between h-[120px]'
    >
      <h2>{title}</h2>
      <h1 className='font-bold text-3xl'>{addComma(sum)}</h1>
    </button>
  );
}
