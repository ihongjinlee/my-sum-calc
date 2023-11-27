import { Post } from '@/model/post';
import { addComma } from '@/components/util/regexs';
import { useState } from 'react';
import useFullPost from '@/hook/post';

type Props = {
  post: Post;
};

export default function PostContentsHeader({ post }: Props) {
  const [titleValue, setTitleValue] = useState(post.title);
  const [modifyMode, setModifyMode] = useState(false);

  const { setPostTitle } = useFullPost(post.id);

  const handleChangeModify = () => {
    setModifyMode(!modifyMode);
    setPostTitle(post, titleValue);
  };

  return (
    <section className='flex flex-col bg-[#1d9df0] px-10 py-5 items-center justify-between'>
      <div className='flex gap-1'>
        <input
          value={titleValue}
          disabled={!modifyMode}
          onChange={(e) => setTitleValue(e.target.value)}
        />
        <button onClick={handleChangeModify}>{`[${
          modifyMode ? '확인' : '수정'
        }]`}</button>
      </div>
      <h1 className='font-bold text-3xl'>{addComma(post.sum)}</h1>
    </section>
  );
}
