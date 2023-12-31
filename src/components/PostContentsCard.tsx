import { addComma } from '@/components/util/regexs';

type Props = {
  memo: string;
  value: number;
  _key: string;
  onClickDeleteItem: (_key: string) => void;
};

export default function PostContentsCard({
  memo,
  value,
  _key,
  onClickDeleteItem,
}: Props) {
  return (
    <div
      className='hover:bg-[#1d9df0]/90 focus:ring-4 focus:outline-none focus:ring-[#1d9df0]/50 dark:focus:ring-[#1d9df0]/55
     px-10 py-2 w-full items-center justify-between'
    >
      <h2 className='flex justify-start'>{memo}</h2>
      <h1 className='font-bold text-2xl flex justify-end'>{addComma(value)}</h1>
      <button onClick={() => onClickDeleteItem(_key)}>삭제</button>
    </div>
  );
}
