import React from "react";
import { getEntityById } from "@/actions/entity/get";
import PageContent from "@/components/tiptap/page-content";

interface PageDetailProps {
  params: {
    entityId: string;
  };
}

const EntityDetailPage = async ({ params }: PageDetailProps) => {
  const entity = await getEntityById(params.entityId);

  if (!entity) {
    return <p className="text-red-500">Page not found</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{entity.name}</h1>
      <h2 className="text-2xl font-bold mb-4">{entity.slug}</h2>
      <PageContent content={entity.description} />

      <p>Created at: {new Date(entity.createdAt).toLocaleDateString()}</p>
      <p>Updated at: {new Date(entity.updatedAt).toLocaleDateString()}</p>
    </div>
  );
};

export default EntityDetailPage;
