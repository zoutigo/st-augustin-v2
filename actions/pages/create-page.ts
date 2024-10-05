'use server';

import { z } from 'zod';
import { db } from '@/lib/db';
import { createPageSchema } from '@/schemas';

export const createPage = async (values: z.infer<typeof createPageSchema>) => {
  console.log(values);
  const validatedFields = createPageSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Les champs ne sont pas correctement remplis' };
  }

  try {
    const page = await db.page.create({
      data: {
        ...values,
      },
    });
    if (!page) {
      console.log('page non crée');
      return { error: "Ca n'a pas marché" };
    }
    console.log('page crée');

    return { success: 'La page a été crée .' };
  } catch (error) {
    return { error: "Quelque chose n'a pas fonctionnée" };
  }
};
