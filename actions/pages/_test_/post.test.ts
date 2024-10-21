import { createPage, updatePage } from '../post';
import { db } from '@/lib/db';
import { z } from 'zod';
import { createPageSchema, updatePageSchema } from '@/schemas';

// Mock the db object
jest.mock('@/lib/db', () => ({
  db: {
    page: {
      create: jest.fn(),
      update: jest.fn(),
    },
  },
}));

describe('createPage', () => {
  it('should return an error if validation fails', async () => {
    const invalidValues = { name: '' }; // Assuming name is required
    const result = await createPage(
      invalidValues as z.infer<typeof createPageSchema>
    );
    expect(result).toEqual({
      error: 'Les champs ne sont pas correctement remplis',
    });
  });

  it('should return an error if page creation fails', async () => {
    (db.page.create as jest.Mock).mockRejectedValue(
      new Error('Failed to create page')
    );
    const validValues = {
      name: 'Test Page',
      slug: 'test-page',
      content: 'Test content',
    };
    const result = await createPage(
      validValues as z.infer<typeof createPageSchema>
    );
    expect(result).toEqual({ error: "Quelque chose n'a pas fonctionnée" });
  });

  it('should return success if page is created', async () => {
    (db.page.create as jest.Mock).mockResolvedValue({
      id: '1',
      name: 'Test Page',
      slug: 'test-page',
      content: 'Test content',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const validValues = {
      name: 'Test Page',
      slug: 'test-page',
      content: 'Test content',
    };
    const result = await createPage(
      validValues as z.infer<typeof createPageSchema>
    );
    expect(result).toEqual({ success: 'La page a été crée .' });
  });
});

describe('updatePage', () => {
  it('should return an error if validation fails', async () => {
    const invalidValues = { name: '' }; // Assuming name is required
    const result = await updatePage(
      '1',
      invalidValues as z.infer<typeof updatePageSchema>
    );
    expect(result).toEqual({
      error: 'Les champs ne sont pas correctement renseignés',
    });
  });

  it('should return an error if pageId is not provided', async () => {
    const validValues = {
      name: 'Updated Page',
      slug: 'updated-page',
      content: 'Updated content',
    };
    const result = await updatePage(
      '',
      validValues as z.infer<typeof updatePageSchema>
    );
    expect(result).toEqual({ error: 'the page id is missing' });
  });

  it('should return an error if page update fails', async () => {
    (db.page.update as jest.Mock).mockRejectedValue(
      new Error('Failed to update page')
    );
    const validValues = {
      name: 'Updated Page',
      slug: 'updated-page',
      content: 'Updated content',
    };
    const result = await updatePage(
      '1',
      validValues as z.infer<typeof updatePageSchema>
    );
    expect(result).toEqual({
      error: "Quelque chose n'a pas fonctionnée sur le server",
    });
  });

  it('should return success if page is updated', async () => {
    (db.page.update as jest.Mock).mockResolvedValue({
      id: '1',
      name: 'Updated Page',
      slug: 'updated-page',
      content: 'Updated content',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const validValues = {
      name: 'Updated Page',
      slug: 'updated-page',
      content: 'Updated content',
    };
    const result = await updatePage(
      '1',
      validValues as z.infer<typeof updatePageSchema>
    );
    expect(result).toEqual({
      success: 'La page Updated Page a bien été modifiée',
    });
  });
});
