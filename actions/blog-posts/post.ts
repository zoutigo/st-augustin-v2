'use server';

import { z } from 'zod';
import { db } from '@/lib/db';
import { createBlogPostSchema, updateBlogPostSchema } from '@/schemas';

export const createBlogPost = async (
  values: z.infer<typeof createBlogPostSchema>
) => {
  const validatedFields = createBlogPostSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Les champs ne sont pas correctement remplis' };
  }

  try {
    const blogPost = await db.blogPost.create({
      data: {
        ...values,
      },
    });
    if (!blogPost) {
      return { error: "Ca n'a pas marché" };
    }

    return { success: 'Le blog post a été créé.' };
  } catch (error) {
    return { error: "Quelque chose n'a pas fonctionné" };
  }
};

export const updateBlogPost = async (
  blogPostId: string,
  values: z.infer<typeof updateBlogPostSchema>
): Promise<{ success: string } | { error: string }> => {
  const validatedFields = updateBlogPostSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Les champs ne sont pas correctement renseignés' };
  }

  const { title } = values;
  if (!blogPostId) {
    return { error: 'the post id is missing' };
  }

  try {
    const blogPost = await db.blogPost.update({
      where: { id: blogPostId },
      data: {
        ...values,
      },
    });

    if (!blogPost) {
      return { error: 'Quelque chose a mal tourné' };
    }
    return { success: `Le post ${title} a bien été modifiée` };
  } catch (error) {
    return { error: "Quelque chose n'a pas fonctionnée sur le server" };
  }
};
