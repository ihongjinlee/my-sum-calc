import { withSessionUser } from '@/util/session';
import { updatePostTitle } from '@/service/posts';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  return withSessionUser(async () => {
    const { postId, title } = await req.json();

    if (!postId || !title) {
      return new Response('Bad Request', { status: 400 });
    }

    return updatePostTitle(postId, title) //
      .then((res) => NextResponse.json(res))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  });
}
