"use server";

import { db } from "@/lib/db";
import type { UserRow } from "@/components/dashboard/users/users-columns";

type UsersResult = UserRow[] | { error: string };

export const getAllUsers = async (): Promise<UsersResult> => {
  try {
    const users = await db.user.findMany({
      orderBy: [{ lastname: "asc" }, { firstname: "asc" }],
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        role: true,
        grade: true,
      },
    });
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return { error: "Failed to fetch users" } as const;
  }
};
