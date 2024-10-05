import { db } from '@/lib/db';

export const getAllPages = async () => {
  try {
    const pages = await db.page.findMany();
    return pages;
  } catch (error) {
    console.error('Failed to fetch page:', error);
    throw new Error('Failed to fetch page');
  }
};
