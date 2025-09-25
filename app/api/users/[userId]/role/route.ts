import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auth } from '@/auth';
import { UserRole } from '@prisma/client';

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const actorGrade = session.user.grade;
    if (actorGrade !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { userId } = params;
    const body = await req.json();
    const role = body?.role as UserRole | undefined;

    if (!userId || !role) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const validRoles: UserRole[] = [
      'USER',
      'APEL',
      'OGEC',
      'PS',
      'MS',
      'GS',
      'CE1',
      'CE2',
      'CM1',
      'CM2',
    ];
    if (!validRoles.includes(role)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
    }

    await db.user.update({ where: { id: userId }, data: { role } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to update user role', error);
    return NextResponse.json(
      { error: 'Failed to update user role' },
      { status: 500 }
    );
  }
}

