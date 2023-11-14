import Signin from '@/components/Signin';
import { authOptions } from '@/util/authOptions';
import { getServerSession } from 'next-auth';
import { getProviders } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default async function SignInPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/');
  }

  const providers = (await getProviders()) ?? {};

  return (
    <section className='flex h-full justify-center items-center'>
      <Signin providers={providers} />
    </section>
  );
}
