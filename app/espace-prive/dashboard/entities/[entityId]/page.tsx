import React from "react";
import { getEntityById } from "@/actions/entity/get";
import PageContent from "@/components/tiptap/page-content";
import { BackButton } from "@/components/dashboard/back-button";

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-saint-augustin-navy">
          {entity.name}
        </h1>
        <BackButton href="/espace-prive/dashboard/entities" />
      </div>

      <div className="rounded-xl border border-saint-augustin-sand/40 bg-white p-6 shadow-sm">
        <PageContent content={entity.description} />
        <p className="mt-6 text-sm text-saint-augustin-graphite/70">
          Mis à jour le {new Date(entity.updatedAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default EntityDetailPage;
