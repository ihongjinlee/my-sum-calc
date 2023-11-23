import { withSessionUser } from '@/util/session';
import { NextRequest, NextResponse } from 'next/server';
import { createPost, getPostsOf } from '@/service/posts';
import { PostListItem } from '@/model/post';

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
    const listLength = Number(form.get('listLength'));
    const list: PostListItem[] = [];
    const sum = Number(form.get('sum'));

    for (let i = 0; i < listLength; i++) {
      const memo = form.get(`list[${i}][memo]`)?.toString() || '';
      const value = Number(form.get(`list[${i}][value]`)?.toString());
      list.push({ memo, value });
    }

    if (!title) {
      return new Response('Bad Request', { status: 400 });
    }

    return createPost(user.id, title, list, sum) //
      .then((data) => NextResponse.json(data));
  });
}
