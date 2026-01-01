import { auth } from "@/auth";
import { ExtendedUser } from "@/types/next-auth";

export const currentUser = async () => {
  const session = await auth();
  return session?.user as ExtendedUser | null;
};
export const currentRole = async () => {
  const session = await auth();
  return session?.user?.role;
};
export const currentGrade = async () => {
  const session = await auth();
  return session?.user?.grade;
};
