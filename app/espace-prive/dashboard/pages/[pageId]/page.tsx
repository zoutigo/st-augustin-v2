import React from "react";
import PageContent from "@/components/tiptap/page-content";
import { Page } from "@prisma/client";
import { getPageById } from "@/actions/pages/get";

interface PageDetailProps {
  params: {
    pageId: string;
  };
}

const PageDetail = async ({ params }: PageDetailProps) => {
  const result = await getPageById(params.pageId);

  if ("error" in result) {
    return <p className="text-red-500">{result.error}</p>;
  }

  const page = result as Page;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{page.name}</h1>
      <h2 className="text-2xl font-bold mb-4">{page.slug}</h2>
      <PageContent content={page.content} />

      <p>Created at: {new Date(page.createdAt).toLocaleDateString()}</p>
      <p>Updated at: {new Date(page.updatedAt).toLocaleDateString()}</p>
    </div>
  );
};

export default PageDetail;
