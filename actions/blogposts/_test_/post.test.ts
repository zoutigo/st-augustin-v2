import { createBlogPost, updateBlogPost } from '../post';
import { db } from '@/lib/db';

jest.mock('@/lib/db', () => ({
  db: {
    blogPost: {
      create: jest.fn(),
      update: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
    },
  },
}));

describe('Blog Post Actions', () => {
  describe('createBlogPost', () => {
    it('should return an error if validation fails', async () => {
      const values = {
        title: '',
        content: '',
        isPublic: false,
        isReleased: false,
        entityId: '',
      }; // Invalid values
      const result = await createBlogPost(values);
      expect(result).toEqual({
        error: 'Les champs ne sont pas correctement remplis',
      });
    });

    it('should create a blog post if validation passes', async () => {
      const values = {
        title: 'Valid Title',
        content: 'Valid Content',
        isPublic: true,
        isReleased: true,
        entityId: '1',
      };
      (db.blogPost.create as jest.Mock).mockResolvedValue(values);

      const result = await createBlogPost(values);
      expect(result).toEqual({ success: 'Le post a été créé.' });
    });

    it('should return an error if blog post creation fails', async () => {
      const values = {
        title: 'Valid Title',
        content: 'Valid Content',
        isPublic: true,
        isReleased: true,
        entityId: '1',
      };
      (db.blogPost.create as jest.Mock).mockResolvedValue(null);

      const result = await createBlogPost(values);
      expect(result).toEqual({ error: "Ca n'a pas marché" });
    });

    it('should return an error if there is a server error', async () => {
      const values = {
        title: 'Valid Title',
        content: 'Valid Content',
        isPublic: true,
        isReleased: true,
        entityId: '1',
      };
      (db.blogPost.create as jest.Mock).mockRejectedValue(
        new Error('Server Error')
      );

      const result = await createBlogPost(values);
      expect(result).toEqual({ error: "Quelque chose n'a pas fonctionné" });
    });
  });

  describe('updateBlogPost', () => {
    it('should return an error if validation fails', async () => {
      const blogPostId = '1';
      const values = {
        title: '',
        content: '',
        isPublic: false,
        isReleased: false,
        entityId: '',
      }; // Invalid values
      const result = await updateBlogPost(blogPostId, values);
      expect(result).toEqual({
        error: 'Les champs ne sont pas correctement renseignés',
      });
    });

    it('should return an error if blog post id is missing', async () => {
      const blogPostId = '';
      const values = {
        title: 'Valid Title',
        content: 'Valid Content',
        isPublic: true,
        isReleased: true,
        entityId: '1',
      };
      const result = await updateBlogPost(blogPostId, values);
      expect(result).toEqual({ error: 'the blog post id is missing' });
    });

    it('should update a blog post if validation passes', async () => {
      const blogPostId = '1';
      const values = {
        title: 'Updated Title',
        content: 'Updated Content',
        isPublic: true,
        isReleased: true,
        entityId: '1',
      };
      (db.blogPost.update as jest.Mock).mockResolvedValue(values);

      const result = await updateBlogPost(blogPostId, values);
      expect(result).toEqual({
        success: `Le post ${values.title} a bien été modifié`,
      });
    });

    it('should return an error if blog post update fails', async () => {
      const blogPostId = '1';
      const values = {
        title: 'Updated Title',
        content: 'Updated Content',
        isPublic: true,
        isReleased: true,
        entityId: '1',
      };
      (db.blogPost.update as jest.Mock).mockResolvedValue(null);

      const result = await updateBlogPost(blogPostId, values);
      expect(result).toEqual({ error: 'Quelque chose a mal tourné' });
    });

    it('should return an error if there is a server error', async () => {
      const blogPostId = '1';
      const values = {
        title: 'Updated Title',
        content: 'Updated Content',
        isPublic: true,
        isReleased: true,
        entityId: '1',
      };
      (db.blogPost.update as jest.Mock).mockRejectedValue(
        new Error('Server Error')
      );

      const result = await updateBlogPost(blogPostId, values);
      expect(result).toEqual({
        error: "Quelque chose n'a pas fonctionné sur le server",
      });
    });
  });
});
