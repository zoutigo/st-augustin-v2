import { currentGrade, currentRole } from '@/lib/auth';
import { UserGrade, UserRole } from '@prisma/client';
import { NextResponse } from 'next/server';

// export async function GET() {
//   const role = await currentRole();
//   if (role === UserRole.ADMIN) {
//     return new NextResponse(null, { status: 200 });
//   }
//   return new NextResponse(null, { status: 403 });
// }
export async function GET() {
  const role = await currentGrade();
  if (role === UserGrade.ADMIN) {
    return new NextResponse(null, { status: 200 });
  }
  return new NextResponse(null, { status: 403 });
}
