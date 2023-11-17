import { authOptions } from '@/util/authOptions';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import PostList from '@/components/PostList';

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect('/auth/signin');
  }

  return (
    <section className='flex justify-center'>
      <PostList />
    </section>
  );
}
