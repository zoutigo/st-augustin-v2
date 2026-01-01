import GenericEntityPage from "@/components/classrooms/generic-entity-page";
import { GenericEntityPageClient } from "@/components/classrooms/generic-entity-page-client";

const Ce1Page = async () => {
  const { entitySlug, blogpostsLimit, blogpostsTitle } = {
    entitySlug: "ce1",
    blogpostsLimit: 10,
    blogpostsTitle: "Les news du CE1s",
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

export default Ce1Page;
