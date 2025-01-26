import { auth } from '@/auth';
import { UserGrade, UserRole } from '@prisma/client';

export const currentUser = async () => {
  const session = await auth();
  return session?.user as {
    id: string;
    name?: string;
    lastname?: string;
    firstname?: string;
    phone?: string;
    email?: string;
    emailVerified?: Date;
    image?: string;
    role: UserRole;
    grade: UserGrade;
    isOAuth?: boolean;
  } | null;
};
export const currentRole = async () => {
  const session = await auth();
  return session?.user?.role;
};
export const currentGrade = async () => {
  const session = await auth();
  return session?.user?.grade;
};
