'use server';

import { db } from '@/lib/db';
import { Page } from '@prisma/client';

export const getPageById = async (pageId: string): Promise<Page> => {
  if (!pageId) {
    throw new Error('Veillez indiquer le numéro de page');
  }
  try {
    const page = await db.page.findUnique({
      where: {
        id: pageId,
      },
    });
    if (!page) {
      throw new Error('Page not found');
    }
    return page;
  } catch (error) {
    console.error('Failed to fetch page:', error);
    throw new Error('Failed to fetch page');
  }
};
