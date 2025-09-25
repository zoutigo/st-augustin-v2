import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function DELETE(
  _req: Request,
  { params }: { params: { blogpostId: string } }
) {
  try {
    const { blogpostId } = params;
    if (!blogpostId) {
      return NextResponse.json({ error: 'Missing blogpost id' }, { status: 400 });
    }

    await db.blogPost.delete({ where: { id: blogpostId } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete blogpost', error);
    return NextResponse.json(
      { error: 'Failed to delete blogpost' },
      { status: 500 }
    );
  }
}

