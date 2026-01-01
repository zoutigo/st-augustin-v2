"use server";

import { currentGrade, currentRole } from "@/lib/auth";
import { UserGrade, UserRole } from "@prisma/client";
export const admin = async () => {
  const role = await currentGrade();
  if (role === UserGrade.ADMIN) {
    return { success: "You are allowed" };
  }
  return { error: "Forbidden" };
};
