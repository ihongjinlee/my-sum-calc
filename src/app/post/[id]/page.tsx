import PostContents from '@/components/PostContents';

type Props = { params: { id: string } };

export default function PostPage({ params: { id } }: Props) {
  return (
    <div className='flex'>
      <PostContents postId={id} />
    </div>
  );
}
