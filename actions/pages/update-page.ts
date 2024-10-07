'use server';

import { z } from 'zod';
import { db } from '@/lib/db';
import { updatePageSchema } from '@/schemas';

export const updatePage = async (
  pageId: string,
  values: z.infer<typeof updatePageSchema>
): Promise<{ success: string } | { error: string }> => {
  const validatedFields = updatePageSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Les champs ne sont pas correctement renseignés' };
  }

  const { name } = values;
  if (!pageId) {
    return { error: 'the page id is missing' };
  }

  try {
    const page = await db.page.update({
      where: { id: pageId },
      data: {
        ...values,
      },
    });

    if (!page) {
      return { error: 'Quelque chose a mal tourné' };
    }
    return { success: `La page ${name} a bien été modifiée` };
  } catch (error) {
    console.log('error:', error);
    return { error: "Quelque chose n'a pas fonctionnée sur le server" };
  }
};
