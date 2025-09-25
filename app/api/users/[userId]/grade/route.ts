import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auth } from '@/auth';
import { UserGrade } from '@prisma/client';

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const actorId = session.user.id;
    const actorGrade = session.user.grade as UserGrade | undefined;

    if (actorGrade !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { userId } = params;
    const body = await req.json();
    const grade = body?.grade as UserGrade | undefined;

    if (!userId || !grade) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    if (!['ADMIN', 'MANAGER', 'MODERATOR', 'NONE'].includes(grade)) {
      return NextResponse.json({ error: 'Invalid grade' }, { status: 400 });
    }

    if (actorId === userId) {
      return NextResponse.json(
        { error: "Un admin ne peut pas modifier son propre grade" },
        { status: 400 }
      );
    }

    await db.user.update({ where: { id: userId }, data: { grade } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to update user grade', error);
    return NextResponse.json(
      { error: 'Failed to update user grade' },
      { status: 500 }
    );
  }
}

