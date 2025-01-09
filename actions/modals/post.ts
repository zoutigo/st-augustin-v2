'use server';

import { z } from 'zod';
import { db } from '@/lib/db';
import { createModalSchema, updateModalSchema } from '@/schemas';

export const createModal = async (
  values: z.infer<typeof createModalSchema>
) => {
  const validatedFields = createModalSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Les champs ne sont pas correctement remplis' };
  }

  try {
    const modal = await db.modal.create({
      data: {
        ...values,
      },
    });
    if (!modal) {
      return { error: "Ca n'a pas marché" };
    }

    return { success: 'Le modal a été créé.' };
  } catch (error) {
    return { error: "Quelque chose n'a pas fonctionné" };
  }
};

export const updateModal = async (
  modalId: string,
  values: z.infer<typeof updateModalSchema>
): Promise<{ success: string } | { error: string }> => {
  const validatedFields = updateModalSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Les champs ne sont pas correctement renseignés' };
  }

  if (!modalId) {
    return { error: 'the modal id is missing' };
  }

  try {
    const modal = await db.modal.update({
      where: { id: modalId },
      data: {
        ...values,
      },
    });

    if (!modal) {
      return { error: 'Quelque chose a mal tourné' };
    }
    return { success: `Le modal ${values.title} a bien été modifié` };
  } catch (error) {
    return { error: "Quelque chose n'a pas fonctionné sur le server" };
  }
};
