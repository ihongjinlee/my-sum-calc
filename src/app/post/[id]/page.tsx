import PostDetail from '@/components/PostDetail';

type Props = { params: { id: string } };

export default function PostPage({ params: { id } }: Props) {
  return (
    <div className='flex'>
      <PostDetail postId={id} />
    </div>
  );
}
