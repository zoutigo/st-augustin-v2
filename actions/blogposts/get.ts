'use server';

import { db } from '@/lib/db';
import { BlogPost } from '@prisma/client';

export const getBlogPostById = async (
  blogPostId: string
): Promise<BlogPost | { error: string }> => {
  if (!blogPostId) {
    return { error: 'Veillez indiquer le numéro du post ' };
  }
  try {
    const blogPost = await db.blogPost.findUnique({
      where: {
        id: blogPostId,
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
  BlogPost[] | { error: string }
> => {
  try {
    const blogCategories = await db.blogPost.findMany();
    return blogCategories;
  } catch (error) {
    return { error: 'Failed to fetch posts' };
  }
};
