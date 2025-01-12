'use server';

// bonne pioche

import { db } from '@/lib/db';
import { Page } from '@prisma/client';

export const getPageById = async (
  pageId: string
): Promise<Page | { error: string }> => {
  if (!pageId) {
    return { error: 'Veillez indiquer le numéro de page' };
  }
  try {
    const page = await db.page.findUnique({
      where: {
        id: pageId,
      },
    });
    if (!page) {
      return { error: 'Page not found' };
    }
    return page;
  } catch (error) {
    return { error: 'Failed to fetch page' };
  }
};

export const getPageByName = async (
  pageName: string
): Promise<Page | { error: string }> => {
  if (!pageName) {
    return { error: 'Veillez indiquer le nom de page' };
  }
  try {
    const page = await db.page.findUnique({
      where: {
        slug: pageName,
      },
    });
    if (!page) {
      return { error: 'Page not found' };
    }
    return page;
  } catch (error) {
    return { error: 'Failed to fetch page' };
  }
};
export const getPageBySlug = async (
  slug: string
): Promise<Page | { error: string }> => {
  if (!slug) {
    return { error: 'Veillez indiquer le nom de page' };
  }
  try {
    const page = await db.page.findUnique({
      where: {
        slug,
      },
    });
    if (!page) {
      return { error: 'Page not found' };
    }
    return page;
  } catch (error) {
    return { error: 'Failed to fetch page' };
  }
};

export const getAllPages = async (): Promise<Page[] | { error: string }> => {
  try {
    const pages = await db.page.findMany();
    return pages;
  } catch (error) {
    return { error: 'Failed to fetch pages' };
  }
};
