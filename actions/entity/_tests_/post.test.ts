import { createEntity, updateEntity } from '../posts';
import { db } from '@/lib/db';
import { z } from 'zod';
import { createEntitySchema, updateEntitySchema } from '@/schemas';

// Mock the db object
jest.mock('@/lib/db', () => ({
  db: {
    entity: {
      create: jest.fn(),
      update: jest.fn(),
    },
  },
}));

describe('createEntity', () => {
  it('should return an error if validation fails', async () => {
    const invalidValues = { name: '' }; // Assuming name is required
    const result = await createEntity(
      invalidValues as z.infer<typeof createEntitySchema>
    );
    expect(result).toEqual({
      error: 'Les champs ne sont pas correctement remplis',
    });
  });

  it('should return an error if entity creation fails', async () => {
    (db.entity.create as jest.Mock).mockRejectedValue(
      new Error('Failed to create entity')
    );
    const validValues = {
      name: 'Test Entity',
      description: 'Test Description',
      slug: 'test-entity',
    };
    const result = await createEntity(
      validValues as z.infer<typeof createEntitySchema>
    );
    expect(result).toEqual({ error: "Quelque chose n'a pas fonctionné" });
  });

  it('should return success if entity is created', async () => {
    (db.entity.create as jest.Mock).mockResolvedValue({
      id: '1',
      name: 'Test Entity',
      description: 'Test Description',
      slug: 'test-entity',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const validValues = {
      name: 'Test Entity',
      description: 'Test Description',
      slug: 'test-entity',
    };
    const result = await createEntity(
      validValues as z.infer<typeof createEntitySchema>
    );
    expect(result).toEqual({ success: "l'entité a bien été crée" });
  });
});

describe('updateEntity', () => {
  it('should return an error if validation fails', async () => {
    const invalidValues = { name: '' }; // Assuming name is required
    const result = await updateEntity(
      '1',
      invalidValues as z.infer<typeof updateEntitySchema>
    );
    expect(result).toEqual({
      error: 'Les champs ne sont pas correctement renseignés',
    });
  });

  it('should return an error if entityId is not provided', async () => {
    const validValues = {
      name: 'Updated Entity',
      description: 'Updated Description',
      slug: 'updated-entity',
    };
    const result = await updateEntity(
      '',
      validValues as z.infer<typeof updateEntitySchema>
    );
    expect(result).toEqual({ error: 'the categor id is missing' });
  });

  it('should return an error if entity update fails', async () => {
    (db.entity.update as jest.Mock).mockRejectedValue(
      new Error('Failed to update entity')
    );
    const validValues = {
      name: 'Updated Entity',
      description: 'Updated Description',
      slug: 'updated-entity',
    };
    const result = await updateEntity(
      '1',
      validValues as z.infer<typeof updateEntitySchema>
    );
    expect(result).toEqual({
      error: "Quelque chose n'a pas fonctionné sur le server",
    });
  });

  it('should return success if entity is updated', async () => {
    (db.entity.update as jest.Mock).mockResolvedValue({
      id: '1',
      name: 'Updated Entity',
      description: 'Updated Description',
      slug: 'updated-entity',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const validValues = {
      name: 'Updated Entity',
      description: 'Updated Description',
      slug: 'updated-entity',
    };
    const result = await updateEntity(
      '1',
      validValues as z.infer<typeof updateEntitySchema>
    );
    expect(result).toEqual({
      success: "L'entité Updated Entity a bien été modifiée",
    });
  });
});
