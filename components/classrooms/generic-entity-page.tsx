import { getEntityBySlug } from "@/actions/entity/get";
import { BlogPost, Entity } from "@prisma/client";
import { GenericEntityPageClient } from "./generic-entity-page-client";

interface GenericEntityPageProps {
  entitySlug: string;
  blogpostsLimit?: number;
  blogpostsTitle?: string;
}

export const GenericEntityPage = async ({
  entitySlug,
  blogpostsLimit = 10,
  blogpostsTitle = "Articles récents",
}: GenericEntityPageProps) => {
  const classroomsSlugs = ["ce1", "ce2", "cm1", "cm2", "cp", "gs", "ms", "ps"];

  // Récupérer les données côté serveur
  const entity: (Entity & { blogpages?: BlogPost[] }) | null =
    await getEntityBySlug(entitySlug, blogpostsLimit);

  if (!entity) {
    return {
      error: `Entité non trouvée pour le slug : ${entitySlug}`,
    };
  }

  const blogposts: BlogPost[] = entity.blogpages || [];
  const isClassroom = classroomsSlugs.includes(entitySlug);

  return {
    entity,
    blogposts,
    blogpostsTitle,
    isClassroom,
  };
};

export default GenericEntityPage;
