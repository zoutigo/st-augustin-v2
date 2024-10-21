import { getBlogPostById, getAllBlogPosts } from '../get';
import { db } from '@/lib/db';
import { BlogPost } from '@prisma/client';

// Mock the db object
jest.mock('@/lib/db', () => ({
  db: {
    blogPost: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
    },
  },
}));

describe('getBlogPostById', () => {
  it('should return an error if blogPostId is not provided', async () => {
    const result = await getBlogPostById('');
    expect(result).toEqual({ error: 'Veillez indiquer le numéro du post ' });
  });

  it('should return an error if blog post is not found', async () => {
    (db.blogPost.findUnique as jest.Mock).mockResolvedValue(null);
    const result = await getBlogPostById('1');
    expect(result).toEqual({ error: 'Post not found' });
  });

  it('should return the blog post if found', async () => {
    const mockBlogPost: BlogPost = {
      id: '1',
      title: 'Test Blog Post',
      content: 'Test content',
      createdAt: new Date(),
      updatedAt: new Date(),
      isPublic: false,
      isReleased: false,
      entityId: '',
    };
    (db.blogPost.findUnique as jest.Mock).mockResolvedValue(mockBlogPost);
    const result = await getBlogPostById('1');
    expect(result).toEqual(mockBlogPost);
  });

  it('should return an error if fetching blog post fails', async () => {
    (db.blogPost.findUnique as jest.Mock).mockRejectedValue(
      new Error('Failed to fetch page')
    );
    const result = await getBlogPostById('1');
    expect(result).toEqual({ error: 'Failed to fetch page' });
  });
});

describe('getAllBlogPosts', () => {
  it('should return all blog posts', async () => {
    const mockBlogPosts: BlogPost[] = [
      {
        id: '1',
        title: 'Test Blog Post 1',
        content: 'Test content 1',
        createdAt: new Date(),
        updatedAt: new Date(),
        isPublic: false,
        isReleased: false,
        entityId: '',
      },
      {
        id: '2',
        title: 'Test Blog Post 2',
        content: 'Test content 2',
        createdAt: new Date(),
        updatedAt: new Date(),
        isPublic: false,
        isReleased: false,
        entityId: '',
      },
    ];
    (db.blogPost.findMany as jest.Mock).mockResolvedValue(mockBlogPosts);
    const result = await getAllBlogPosts();
    expect(result).toEqual(mockBlogPosts);
  });

  it('should return an error if fetching blog posts fails', async () => {
    (db.blogPost.findMany as jest.Mock).mockRejectedValue(
      new Error('Failed to fetch posts')
    );
    const result = await getAllBlogPosts();
    expect(result).toEqual({ error: 'Failed to fetch posts' });
  });
});
