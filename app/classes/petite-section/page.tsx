import GenericEntityPage from '@/components/classrooms/generic-entity-page';
import { GenericEntityPageClient } from '@/components/classrooms/generic-entity-page-client';

const PetiteSectionPage = async () => {
  const { entitySlug, blogpostsLimit, blogpostsTitle } = {
    entitySlug: 'ps',
    blogpostsLimit: 10,
    blogpostsTitle: 'Les news de la Petite Section',
  };

  const pageData = await GenericEntityPage({
    entitySlug,
    blogpostsLimit,
    blogpostsTitle,
  });

  if ('error' in pageData) {
    return <div className="text-red-500">{pageData.error}</div>;
  }

  const { entity, blogposts, isClassroom } = pageData;

  return (
    <GenericEntityPageClient
      entity={entity}
      blogposts={blogposts}
      blogpostsTitle={blogpostsTitle}
      isClassroom={isClassroom}
    />
  );
};

export default PetiteSectionPage;
