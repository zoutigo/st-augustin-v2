import GitHub from 'next-auth/providers/github';
import Facebook from 'next-auth/providers/facebook';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import type { NextAuthConfig } from 'next-auth';

import { LoginSchema } from '@/schemas';
import { getUserByEmail } from '@/data/user';
import { ZodError } from 'zod';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from './lib/db';

const authConfig: NextAuthConfig = {
  trustHost: true,
  providers: [
    Facebook({
      clientId: process.env.AUTH_FACEBOOK_ID || '',
      clientSecret: process.env.AUTH_FACEBOOK_SECRET || '',
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID || '',
      clientSecret: process.env.AUTH_GOOGLE_SECRET || '',
    }),
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        console.log("Log 1: Début de l'autorisation");

        const validatedFields = LoginSchema.safeParse(credentials);
        console.log('Log 2: Champs validés', validatedFields);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          console.log('Log 3: Champs extraits', { email, password });

          try {
            const user = await getUserByEmail(email);
            console.log('Log 4: Utilisateur trouvé', user);

            if (!user || !user.password) {
              console.log('Log 5: Utilisateur non trouvé ou sans mot de passe');
              return null;
            }

            const passwordMatch = await bcrypt.compare(password, user.password);
            console.log('Log 6: Comparaison des mots de passe', passwordMatch);

            if (passwordMatch) {
              console.log('Log 7: Mot de passe correspondant');
              return user;
            }

            console.log('Log 8: Mot de passe incorrect');
            return null;
          } catch (error) {
            console.log('Log 9: Erreur dans le bloc try', error);

            if (error instanceof ZodError) {
              console.log('Log 10: Erreur de validation Zod', error);
              return null;
            }

            console.log('Log 11: Autre erreur', error);
            throw error;
          }
        }

        console.log('Log 12: Champs invalides');
        throw new Error('Invalid input');
      },
    }),
  ],
};

export default authConfig;
