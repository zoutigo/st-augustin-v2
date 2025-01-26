'use server';

import { db } from '@/lib/db';

import { z } from 'zod';
import { userProfileUpdateSchema } from '@/schemas';
import { currentUser } from '@/lib/auth';

export const updateUserProfile = async (
  values: z.infer<typeof userProfileUpdateSchema>
): Promise<{ success: string } | { error: string }> => {
  // Validation des champs
  const validatedFields = userProfileUpdateSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Les champs ne sont pas correctement renseignés' };
  }

  // Récupérer l'utilisateur authentifié
  const user = await currentUser();

  if (!user) {
    return { error: 'Vous devez être connecté pour effectuer cette action' };
  }

  try {
    // Mise à jour du profil dans la base de données
    const updatedUser = await db.user.update({
      where: { email: user.email },
      data: {
        ...validatedFields.data,
      },
    });

    if (!updatedUser) {
      return { error: 'Quelque chose a mal tourné lors de la mise à jour' };
    }

    return { success: `Votre profil a bien été mis à jour` };
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil:', error);
    return {
      error: 'Une erreur interne est survenue, veuillez réessayer plus tard',
    };
  }
};
