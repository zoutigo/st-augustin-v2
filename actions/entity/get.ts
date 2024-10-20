'use server';

import { db } from '@/lib/db';
import { Entity } from '@prisma/client';

export const getEntityById = async (entityId: string): Promise<Entity> => {
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
      throw new Error('Entity not found');
    }
    return entity;
  } catch (error) {
    console.error('Failed to fetch entity:', error);
    throw new Error('Failed to fetch entity');
  }
};

export const getEntitybySlug = async (entitySlug: string): Promise<Entity> => {
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
      throw new Error('Entity not found');
    }
    return entity;
  } catch (error) {
    console.error('Failed to fetch entity:', error);
    throw new Error('Failed to fetch entity');
  }
};

export const getAllEntities = async (): Promise<Entity[]> => {
  try {
    const entities = await db.entity.findMany();
    return entities;
  } catch (error) {
    console.error('Failed to fetch entity:', error);
    throw new Error('Failed to fetch entity');
  }
};
