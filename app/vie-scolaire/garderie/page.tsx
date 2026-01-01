import { getPageBySlug } from "@/actions/pages/get";
import { PageHolder } from "@/components/page-holder";
import PageContent from "@/components/tiptap/page-content";
import { Page } from "@prisma/client";
import React from "react";

const GarderiePage = async () => {
  const metadatas = {
    title: "Garderie - Ecole Saint Augustin Crémieu",
    description: "Découvrez les modalités de garderie l’école Saint Augustin!",
  };
  const slug = "vie-scolaire-garderie";
  const result = await getPageBySlug(slug);

  if ("error" in result) {
    return <p className="text-red-500">Page not found : `${result.error}`</p>;
  }

  const page: Page = result;

  return (
    <PageHolder>
      <PageContent content={page.content} {...metadatas} />
    </PageHolder>
  );
};

export default GarderiePage;
