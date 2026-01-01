import GenericEntityPage from "@/components/classrooms/generic-entity-page";
import { GenericEntityPageClient } from "@/components/classrooms/generic-entity-page-client";

const Cm2Page = async () => {
  const { entitySlug, blogpostsLimit, blogpostsTitle } = {
    entitySlug: "cm2",
    blogpostsLimit: 10,
    blogpostsTitle: "Les news du CM2",
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

export default Cm2Page;
