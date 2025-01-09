'use server';

import { db } from '@/lib/db';
import { Entity } from '@prisma/client';

export const getEntityById = async (
  entityId: string
): Promise<Entity | null> => {
  if (!entityId) {
    throw new Error("veiller indiquer l'id de l'entité");
  }
  try {
    const entity = await db.entity.findUnique({
      where: {
        id: entityId,
      },
    });
    if (!entity) {
      return null; // Retourne null si l'entité n'est pas trouvée
    }
    return entity;
  } catch (error) {
    throw new Error('Failed to fetch entity');
  }
};

export const getEntitybySlug = async (
  entitySlug: string
): Promise<Entity | null> => {
  if (!entitySlug) {
    throw new Error("Veillez indiquer le slug de l'entité");
  }
  try {
    const entity = await db.entity.findUnique({
      where: {
        slug: entitySlug,
      },
    });
    if (!entity) {
      return null; // Retourne null si l'entité n'est pas trouvée
    }
    return entity;
  } catch (error) {
    throw new Error('Failed to fetch entity');
  }
};

export const getAllEntities = async (): Promise<Entity[]> => {
  try {
    const entities = await db.entity.findMany();

    return entities.map((entity) => ({
      ...entity,
    }));
  } catch (error) {
    throw new Error('Failed to fetch entities');
  }
};
