'use server';

import { db } from '@/lib/db';
import { BlogPostWithEntity } from '@/types/model';

export const getBlogPostById = async (
  blogPostId: string
): Promise<BlogPostWithEntity | { error: string }> => {
  if (!blogPostId) {
    return { error: 'Veillez indiquer le numéro du post ' };
  }
  try {
    const blogPost = await db.blogPost.findUnique({
      where: {
        id: blogPostId,
      },
      include: {
        entity: true,
      },
    });
    if (!blogPost) {
      return { error: 'Post not found' };
    }
    return blogPost;
  } catch (error) {
    return { error: 'Failed to fetch page' };
  }
};

export const getAllBlogPosts = async (): Promise<
  BlogPostWithEntity[] | { error: string }
> => {
  try {
    const blogCategories = await db.blogPost.findMany({
      include: {
        entity: true,
      },
    });
    return blogCategories;
  } catch (error) {
    return { error: 'Failed to fetch posts' };
  }
};
