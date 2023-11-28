import { withSessionUser } from '@/util/session';
import { addPostListItem } from '@/service/posts';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  return withSessionUser(async () => {
    const { postId, memo, value } = await req.json();

    if (!postId || memo == null || value == null) {
      return new Response('Bad Request', { status: 400 });
    }

    return addPostListItem(postId, memo, value) //
      .then((res) => NextResponse.json(res))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  });
}
