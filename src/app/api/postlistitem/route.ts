import { withSessionUser } from '@/util/session';
import { addPostListItem, deletePostListItem } from '@/service/posts';
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

export async function DELETE(req: NextRequest) {
  return withSessionUser(async () => {
    const { postId, postListItemId } = await req.json();

    if (!postId || postListItemId == null) {
      return new Response('Bad Request', { status: 400 });
    }

    return deletePostListItem(postId, postListItemId) //
      .then((res) => NextResponse.json(res))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  });
}
