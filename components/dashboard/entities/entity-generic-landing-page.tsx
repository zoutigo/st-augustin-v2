import { getEntityBySlug } from '@/actions/entity/get';
import { EntityBlogPostList } from '@/components/dashboard/entities/entity-blogposts-list';
import { PageHolder } from '@/components/page-holder';
import PageContent from '@/components/tiptap/page-content';
import { BlogPost, Entity } from '@prisma/client';
import React from 'react';

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

    return (
      <PageHolder>
        <div className="flex flex-col lg:flex-row lg:space-x-8 space-y-4 lg:space-y-0">
          {/* Section principale */}
          <div className="lg:w-2/3">
            <PageContent content={entity.description} />
          </div>

          {/* Section blogposts */}
          <div className="lg:w-1/3">
            <EntityBlogPostList
              title={blogpostsTitle}
              blogposts={blogposts}
              postsPerPage={4} // Pagination définie
            />
          </div>
        </div>
      </PageHolder>
    );
  } catch (error) {
    console.error('Error loading entity page:', error);
    return <div className="text-red-500">Une erreur est survenue.</div>;
  }
};
