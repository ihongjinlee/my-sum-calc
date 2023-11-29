import { withSessionUser } from '@/util/session';
import { updatePostSum } from '@/service/posts';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  return withSessionUser(async () => {
    const { postId, sum } = await req.json();

    if (!postId) {
      return new Response('Bad Request', { status: 400 });
    }

    return updatePostSum(postId, sum) //
      .then((res) => NextResponse.json(res))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  });
}
