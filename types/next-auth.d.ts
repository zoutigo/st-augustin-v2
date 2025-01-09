// types/next-auth.d.ts

import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';
import { JWT } from 'next-auth/jwt';

export type ExtendedUser = DefaultSession['user'] & {
  role: UserRole;
  grade: UserGrade;
  isOAuth: boolean;
};

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser;
  }
}

import { JWT } from '@auth/core/jwt';
import { UserGrade, UserRole } from '@prisma/client';
declare module 'next-auth/jwt' {
  interface JWT {
    role?: UserRole;
    grade?: UserGrade;
  }
}
