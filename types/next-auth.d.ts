// types/next-auth.d.ts

import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { JWT } from '@auth/core/jwt';
import { UserGrade, UserRole } from '@prisma/client';

export type ExtendedUser = DefaultSession['user'] & {
  id: string;
  lastname?: string;
  firstname?: string;
  phone?: string;
  role: UserRole;
  grade: UserGrade;
  isOAuth?: boolean;
};

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    role?: UserRole;
    grade?: UserGrade;
    lastname?: string;
    firstname?: string;
    phone?: string;
    isOAuth?: boolean;
  }
}
