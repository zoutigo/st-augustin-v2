import GenericEntityPage from "@/components/classrooms/generic-entity-page";
import { GenericEntityPageClient } from "@/components/classrooms/generic-entity-page-client";

const OgecPage = async () => {
  const { entitySlug, blogpostsLimit, blogpostsTitle } = {
    entitySlug: "ogec",
    blogpostsLimit: 10,
    blogpostsTitle: "Les news de l'OGEC",
  };

  const pageData = await GenericEntityPage({
    entitySlug,
    blogpostsLimit,
    blogpostsTitle,
  });

  if ("error" in pageData) {
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

export default OgecPage;
