import GenericEntityPage from "@/components/classrooms/generic-entity-page";
import { GenericEntityPageClient } from "@/components/classrooms/generic-entity-page-client";

const ApelPage = async () => {
  const { entitySlug, blogpostsLimit, blogpostsTitle } = {
    entitySlug: "apel",
    blogpostsLimit: 10,
    blogpostsTitle: "Les news de l'APEL",
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

export default ApelPage;
