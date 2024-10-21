import { getEntityById, getEntitybySlug, getAllEntities } from '../get';
import { db } from '@/lib/db';
import { Entity } from '@prisma/client';

// Mock the db object
jest.mock('@/lib/db', () => ({
  db: {
    entity: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
    },
  },
}));

describe('getEntityById', () => {
  it('should throw an error if entityId is not provided', async () => {
    await expect(getEntityById('')).rejects.toThrow(
      "veiller indiquer l'id de l'entité"
    );
  });

  it('should return null if entity is not found', async () => {
    (db.entity.findUnique as jest.Mock).mockResolvedValue(null);
    const result = await getEntityById('1');
    expect(result).toBeNull();
  });

  it('should return the entity if found', async () => {
    const mockEntity: Entity = {
      id: '1',
      name: 'Test Entity',
      slug: 'test-entity',
      description: 'Test description',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    (db.entity.findUnique as jest.Mock).mockResolvedValue(mockEntity);
    const result = await getEntityById('1');
    expect(result).toEqual(mockEntity);
  });
});

describe('getEntitybySlug', () => {
  it('should throw an error if entitySlug is not provided', async () => {
    await expect(getEntitybySlug('')).rejects.toThrow(
      "Veillez indiquer le slug de l'entité"
    );
  });

  it('should return null if entity is not found', async () => {
    (db.entity.findUnique as jest.Mock).mockResolvedValue(null);
    const result = await getEntitybySlug('test-slug');
    expect(result).toBeNull();
  });

  it('should return the entity if found', async () => {
    const mockEntity: Entity = {
      id: '1',
      name: 'Test Entity',
      slug: 'test-entity',
      description: 'Test description',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    (db.entity.findUnique as jest.Mock).mockResolvedValue(mockEntity);
    const result = await getEntitybySlug('test-entity');
    expect(result).toEqual(mockEntity);
  });
});

describe('getAllEntities', () => {
  it('should return all entities', async () => {
    const mockEntities: Entity[] = [
      {
        id: '1',
        name: 'Test Entity 1',
        slug: 'test-entity-1',
        description: 'Test description 1', // Ajoutez cette ligne
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        name: 'Test Entity 2',
        slug: 'test-entity-2',
        description: 'Test description 2', // Ajoutez cette ligne
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    (db.entity.findMany as jest.Mock).mockResolvedValue(mockEntities);
    const result = await getAllEntities();
    expect(result).toEqual(mockEntities);
  });

  it('should throw an error if fetching entities fails', async () => {
    (db.entity.findMany as jest.Mock).mockRejectedValue(
      new Error('Failed to fetch entities')
    );
    await expect(getAllEntities()).rejects.toThrow('Failed to fetch entities');
  });
});
