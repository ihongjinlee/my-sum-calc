import { withSessionUser } from '@/util/session';
import { NextResponse } from 'next/server';
import { getPostsOf } from '@/service/posts';

export async function GET() {
  return withSessionUser(async (user) => {
    return getPostsOf(user.username) //
      .then((data) => NextResponse.json(data));
  });
}
