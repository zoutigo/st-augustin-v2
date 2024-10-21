import { getPageById, getPageByName, getPageBySlug, getAllPages } from '../get';
import { db } from '@/lib/db';
import { Page } from '@prisma/client';

// Mock the db object
jest.mock('@/lib/db', () => ({
  db: {
    page: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
    },
  },
}));

describe('getPageById', () => {
  it('should return an error if pageId is not provided', async () => {
    const result = await getPageById('');
    expect(result).toEqual({ error: 'Veillez indiquer le numéro de page' });
  });

  it('should return an error if page is not found', async () => {
    (db.page.findUnique as jest.Mock).mockResolvedValue(null);
    const result = await getPageById('1');
    expect(result).toEqual({ error: 'Page not found' });
  });

  it('should return the page if found', async () => {
    const mockPage: Page = {
      id: '1',
      name: 'Test Page',
      slug: 'test-page',
      content: 'Test content',
      release: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    (db.page.findUnique as jest.Mock).mockResolvedValue(mockPage);
    const result = await getPageById('1');
    expect(result).toEqual(mockPage);
  });

  it('should return an error if fetching page fails', async () => {
    (db.page.findUnique as jest.Mock).mockRejectedValue(
      new Error('Failed to fetch page')
    );
    const result = await getPageById('1');
    expect(result).toEqual({ error: 'Failed to fetch page' });
  });
});

describe('getPageByName', () => {
  it('should return an error if pageName is not provided', async () => {
    const result = await getPageByName('');
    expect(result).toEqual({ error: 'Veillez indiquer le nom de page' });
  });

  it('should return an error if page is not found', async () => {
    (db.page.findUnique as jest.Mock).mockResolvedValue(null);
    const result = await getPageByName('test-page');
    expect(result).toEqual({ error: 'Page not found' });
  });

  it('should return the page if found', async () => {
    const mockPage: Page = {
      id: '1',
      name: 'Test Page',
      slug: 'test-page',
      content: 'Test content',
      release: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    (db.page.findUnique as jest.Mock).mockResolvedValue(mockPage);
    const result = await getPageByName('test-page');
    expect(result).toEqual(mockPage);
  });

  it('should return an error if fetching page fails', async () => {
    (db.page.findUnique as jest.Mock).mockRejectedValue(
      new Error('Failed to fetch page')
    );
    const result = await getPageByName('test-page');
    expect(result).toEqual({ error: 'Failed to fetch page' });
  });
});

describe('getPageBySlug', () => {
  it('should return an error if slug is not provided', async () => {
    const result = await getPageBySlug('');
    expect(result).toEqual({ error: 'Veillez indiquer le nom de page' });
  });

  it('should return an error if page is not found', async () => {
    (db.page.findUnique as jest.Mock).mockResolvedValue(null);
    const result = await getPageBySlug('test-slug');
    expect(result).toEqual({ error: 'Page not found' });
  });

  it('should return the page if found', async () => {
    const mockPage: Page = {
      id: '1',
      name: 'Test Page',
      slug: 'test-slug',
      content: 'Test content',
      release: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    (db.page.findUnique as jest.Mock).mockResolvedValue(mockPage);
    const result = await getPageBySlug('test-slug');
    expect(result).toEqual(mockPage);
  });

  it('should return an error if fetching page fails', async () => {
    (db.page.findUnique as jest.Mock).mockRejectedValue(
      new Error('Failed to fetch page')
    );
    const result = await getPageBySlug('test-slug');
    expect(result).toEqual({ error: 'Failed to fetch page' });
  });
});

describe('getAllPages', () => {
  it('should return an array of pages if found', async () => {
    const mockPages: Page[] = [
      {
        id: '1',
        name: 'Test Page 1',
        slug: 'test-page-1',
        content: 'Test content 1',
        release: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        name: 'Test Page 2',
        slug: 'test-page-2',
        content: 'Test content 2',
        release: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    (db.page.findMany as jest.Mock).mockResolvedValue(mockPages);
    const result = await getAllPages();
    expect(result).toEqual(mockPages);
  });

  it('should return an error if fetching pages fails', async () => {
    (db.page.findMany as jest.Mock).mockRejectedValue(
      new Error('Failed to fetch pages')
    );
    const result = await getAllPages();
    expect(result).toEqual({ error: 'Failed to fetch pages' });
  });
});
