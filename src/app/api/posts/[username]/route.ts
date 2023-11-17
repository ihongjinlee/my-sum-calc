import { NextRequest, NextResponse } from 'next/server';
import { getPostsOf } from '@/service/posts';

type Context = {
  params: {
    username: string;
  };
};

export async function GET(_: NextRequest, context: Context) {
  const { username } = context.params;

  if (!username) {
    return new NextResponse('Bad Request', { status: 400 });
  }

  return getPostsOf(username).then((data) => NextResponse.json(data));
}
