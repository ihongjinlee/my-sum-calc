import { withSessionUser } from '@/util/session';
import { NextRequest, NextResponse } from 'next/server';
import { createPost, getPostsOf } from '@/service/posts';

export async function GET() {
  return withSessionUser(async (user) => {
    return getPostsOf(user.username) //
      .then((data) => NextResponse.json(data));
  });
}

export async function POST(req: NextRequest) {
  return withSessionUser(async (user) => {
    const form = await req.formData();
    const title = form.get('title')?.toString();

    if (!title) {
      return new Response('Bad Request', { status: 400 });
    }

    return createPost(user.id, title) //
      .then((data) => NextResponse.json(data));
  });
}
