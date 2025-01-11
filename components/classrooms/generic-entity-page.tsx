import { getEntityBySlug } from '@/actions/entity/get';

import { BlogPost, Entity } from '@prisma/client';
import React from 'react';
import { GenericEntityPageClient } from './generic-entity-page-client';

interface GenericEntityPageProps {
  entitySlug: string; // Slug de l'entité à récupérer
  blogpostsLimit?: number; // Limite du nombre de blogposts à afficher
  blogpostsTitle?: string; // Titre pour la liste des blogposts
}

export const GenericEntityPage: React.FC<GenericEntityPageProps> = async ({
  entitySlug,
  blogpostsLimit = 10, // Limite par défaut
  blogpostsTitle = 'Articles récents', // Titre par défaut
}) => {
  const classroomsSlugs = ['ce1', 'ce2', 'cm1', 'cm2', 'cp', 'gs', 'ms', 'ps'];

  try {
    // Récupérer l'entité avec les blogposts associés
    const entity: (Entity & { blogpages?: BlogPost[] }) | null =
      await getEntityBySlug(entitySlug, blogpostsLimit);

    if (!entity) {
      return (
        <div className="text-red-500">
          Entité non trouvée pour le slug : {entitySlug}.
        </div>
      );
    }

    const blogposts: BlogPost[] = entity.blogpages || [];
    const isClassroom = classroomsSlugs.includes(entitySlug);

    return (
      <GenericEntityPageClient
        entity={entity}
        blogposts={blogposts}
        blogpostsTitle={blogpostsTitle}
        isClassroom={isClassroom}
      />
    );
  } catch (error) {
    console.error('Error loading entity page:', error);
    return <div className="text-red-500">Une erreur est survenue.</div>;
  }
};
