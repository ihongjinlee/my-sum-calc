import NewPost from '@/components/NewPost';
import { authOptions } from '@/util/authOptions';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function NewPostPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/auth/signin');
  }

  return (
    <div className='flex'>
      <NewPost user={session.user} />
    </div>
  );
}
