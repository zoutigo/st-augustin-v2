import { currentGrade, currentRole } from '@/lib/auth';
import { UserGrade, UserRole } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET() {
  const grade = await currentGrade();
  if (grade === UserGrade.ADMIN) {
    return new NextResponse(null, { status: 200 });
  }
  return new NextResponse(null, { status: 403 });
}
