'use server';

import { z } from 'zod';
import { db } from '@/lib/db';
import { createBlogpostSchema, updateBlogPostSchema } from '@/schemas';

export const createBlogPost = async (
  values: z.infer<typeof createBlogpostSchema>
) => {
  const validatedFields = createBlogpostSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Les champs ne sont pas correctement remplis' };
  }

  try {
    const serializegPost =
      typeof values.content === 'string'
        ? values.content
        : JSON.stringify(values.content);

    console.log('serialized post:', serializegPost);
    const blogPost = await db.blogPost.create({
      // data: {
      //   ...values,
      //   content: serializegPost,
      // },
      data: {
        ...values,
      },
    });
    if (!blogPost) {
      return { error: "Ca n'a pas marché" };
    }

    return { success: 'Le post a été créé.' };
  } catch (error) {
    console.error('error:', error);
    return {
      error: ` Quelque chose n'a pas fonctionné : ${JSON.stringify(error)}`,
    };
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

  if (!blogPostId) {
    return { error: 'the blog post id is missing' };
  }

  try {
    const blogPost = await db.blogPost.update({
      where: { id: blogPostId },
      data: {
        ...values,
        // content: JSON.stringify(values.content),
      },
    });

    if (!blogPost) {
      return { error: 'Quelque chose a mal tourné' };
    }
    return { success: `Le post ${values.title} a bien été modifié` };
  } catch (error) {
    return { error: "Quelque chose n'a pas fonctionné sur le server" };
  }
};
