import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function DELETE(
  _req: Request,
  { params }: { params: { modalId: string } }
) {
  try {
    const { modalId } = params;
    if (!modalId) {
      return NextResponse.json({ error: 'Missing modal id' }, { status: 400 });
    }

    await db.modal.delete({ where: { id: modalId } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete modal', error);
    return NextResponse.json(
      { error: 'Failed to delete modal' },
      { status: 500 }
    );
  }
}

