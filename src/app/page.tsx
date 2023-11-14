import { authOptions } from '@/util/authOptions';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect('/auth/signin');
  }

  return (
    <section className='flex h-full justify-center items-center'>
      <h1 className='text-2xl'>수치의 합계를 보기 편하게</h1>
    </section>
  );
}
