import { UserGrade, UserRole } from '@prisma/client';
import { useSession } from 'next-auth/react';

export const useCurrentUser = () => {
  const session = useSession();

  return session.data?.user as {
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
