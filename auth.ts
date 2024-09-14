import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import authConfig from '@/auth.config';
import { db } from '@/lib/db';
import { getUserByEmail, getUserById } from './data/user';
import { UserGrade, UserRole } from '@prisma/client';
import { getAccountByUserId } from './data/account';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== 'credentials') {
        const existingUser = await getUserByEmail(user.email as string);

        if (existingUser) {
          const accountAlreadyLinked = await db.account.findFirst({
            where: {
              provider: account?.provider,
              providerAccountId: account?.providerAccountId,
              userId: existingUser.id,
            },
          });

          if (!accountAlreadyLinked) {
            // Lier le nouveau compte OAuth à l'utilisateur existant
            await db.account.create({
              data: {
                userId: existingUser.id,
                provider: account?.provider as string,
                providerAccountId: account?.providerAccountId as string,
                type: account?.type as string,
                access_token: account?.access_token as string,
                token_type: account?.token_type as string,
                scope: account?.scope as string,
                id_token: account?.id_token as string,
                session_state: account?.session_state as string,
                expires_at: account?.expires_at,
                refresh_token: account?.refresh_token,
              },
            });
          }
          return true;
        }
      }
      return true;

      // // Allow OAuth without email verification
      // if (account?.provider !== 'credentials') return true;

      // const existingUser = await getUserById(user.id);

      // // Prevent credential signIn without email verification
      // if (!existingUser || !existingUser.emailVerified) {
      //   return false;
      // }

      // // TODO: Add 2FA check

      // return true;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
        session.user.grade = token.role as UserGrade;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.isOAuth = token.isOAuth as boolean;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.isOAuth = !!existingAccount;

      // this will update automatically sessios datas when user is updated
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;

      return token;
    },
  },
  session: {
    strategy: 'jwt',
  },
  ...authConfig,
});
