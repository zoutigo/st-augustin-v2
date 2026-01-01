import { currentGrade, currentRole } from "@/lib/auth";
import * as Prisma from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const grade = await currentGrade();
  if (!Prisma.UserGrade || !Prisma.UserGrade.ADMIN) {
    throw new Error("UserGrade is not defined correctly");
  }
  if (grade === Prisma.UserGrade.ADMIN) {
    return new NextResponse(null, { status: 200 });
  }
  return new NextResponse(null, { status: 403 });
}
