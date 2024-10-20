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

export const getPageByName = async (pageName: string): Promise<Page> => {
  if (!pageName) {
    throw new Error('Veillez indiquer le nom de page');
  }
  try {
    const page = await db.page.findUnique({
      where: {
        slug: pageName,
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
export const getPageBySlug = async (slug: string): Promise<Page> => {
  if (!slug) {
    throw new Error('Veillez indiquer le nom de page');
  }
  try {
    const page = await db.page.findUnique({
      where: {
        slug,
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

export const getAllPages = async () => {
  try {
    const pages = await db.page.findMany();
    return pages;
  } catch (error) {
    console.error('Failed to fetch page:', error);
    throw new Error('Failed to fetch page');
  }
};
