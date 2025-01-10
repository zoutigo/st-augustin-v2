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

/**
 * Récupère les blog posts associés à une entité par son slug.
 *
 * @param entitySlug - Le slug de l'entité.
 * @returns Une liste triée de blog posts ou une erreur descriptive.
 */
export const getBlogPostsByEntitySlug = async (
  entitySlug: string
): Promise<BlogPostWithEntity[] | { error: string }> => {
  // Vérification du paramètre
  if (!entitySlug || typeof entitySlug !== 'string') {
    return { error: "Veuillez indiquer un slug valide pour l'entité." };
  }

  try {
    // Recherche des blogposts liés à l'entité spécifiée et triés par date
    const blogPosts = await db.blogPost.findMany({
      where: {
        entity: {
          slug: entitySlug, // Filtrer par le slug de l'entité
        },
      },
      include: {
        entity: true, // Inclure les informations sur l'entité associée
      },
      orderBy: {
        createdAt: 'desc', // Trier par date de création (plus récent au plus ancien)
      },
    });

    // Gestion du cas où aucun blogpost n'est trouvé
    if (!blogPosts || blogPosts.length === 0) {
      return { error: `Aucun blogpost trouvé pour l'entité : ${entitySlug}` };
    }

    // Retourner les blogposts triés
    return blogPosts;
  } catch (error) {
    console.error('Erreur lors de la récupération des blogposts:', error);
    return {
      error: 'Une erreur est survenue lors de la récupération des blogposts.',
    };
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
