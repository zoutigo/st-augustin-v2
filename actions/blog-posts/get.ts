'use server';

import { db } from '@/lib/db';
import { BlogPost } from '@prisma/client';

export const getBlogPostById = async (
  blogPostId: string
): Promise<BlogPost> => {
  if (!blogPostId) {
    throw new Error('Veillez indiquer le numéro du post ');
  }
  try {
    const blogPost = await db.blogPost.findUnique({
      where: {
        id: blogPostId,
      },
    });
    if (!blogPost) {
      throw new Error('Category not found');
    }
    return blogPost;
  } catch (error) {
    console.error('Failed to fetch page:', error);
    throw new Error('Failed to fetch page');
  }
};

export const getAllBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const blogCategories = await db.blogPost.findMany();
    return blogCategories;
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    throw new Error('Failed to fetch posts');
  }
};
