import { z } from 'zod';
import { db } from '@/lib/db';
import { updatePageSchema } from '@/schemas';

export const updatePage = async (values: z.infer<typeof updatePageSchema>) => {
  const validatedFields = updatePageSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Les champs ne sont pas correctement renseignés' };
  }

  const { id, name } = values;
  if (!id) {
    return { error: 'the page id is missing' };
  }

  try {
    const page = await db.page.update({
      where: { id },
      data: {
        ...values,
      },
    });

    if (!page) {
      return { error: 'Quelque chose a mal tourné' };
    }
    return { success: `La page ${name} a bien été modifiée` };
  } catch (error) {
    return { error: "Quelque chose n'a pas fonctionnée" };
  }
};
