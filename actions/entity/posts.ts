'use server';

import { z } from 'zod';
import { db } from '@/lib/db';
import { createEntitySchema, updateEntitySchema } from '@/schemas';

export const createEntity = async (
  values: z.infer<typeof createEntitySchema>
) => {
  const validatedFields = createEntitySchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Les champs ne sont pas correctement remplis' };
  }

  try {
    const entity = await db.entity.create({
      data: {
        ...values,
      },
    });
    if (!entity) {
      return { error: "Ca n'a pas marché" };
    }

    return { success: "l'entité a bien été crée" };
  } catch (error) {
    return { error: "Quelque chose n'a pas fonctionné" };
  }
};

export const updateEntity = async (
  entityId: string,
  values: z.infer<typeof updateEntitySchema>
): Promise<{ success: string } | { error: string }> => {
  const validatedFields = updateEntitySchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Les champs ne sont pas correctement renseignés' };
  }

  const { name } = values;
  if (!entityId) {
    return { error: 'the categor id is missing' };
  }

  try {
    const entity = await db.entity.update({
      where: { id: entityId },
      data: {
        ...values,
      },
    });

    if (!entity) {
      return { error: 'Quelque chose a mal tourné' };
    }
    return { success: `L'entité ${name} a bien été modifiée` };
  } catch (error) {
    return { error: "Quelque chose n'a pas fonctionné sur le server" };
  }
};
