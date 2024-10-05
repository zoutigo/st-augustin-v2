import { db } from '@/lib/db';

export const getPage = async (pageId: string) => {
  if (!pageId) return { error: 'Veillez indiquer le numéro de page' };
  try {
    const page = await db.page.findUnique({
      where: {
        id: pageId,
      },
    });
    return page;
  } catch (error) {
    console.error('Failed to fetch page:', error);
    throw new Error('Failed to fetch page');
  }
};
