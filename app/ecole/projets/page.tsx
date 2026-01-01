import { getPageBySlug } from "@/actions/pages/get";
import { PageHolder } from "@/components/page-holder";
import PageContent from "@/components/tiptap/page-content";
import { Page } from "@prisma/client";
import React from "react";

type Props = {};

const ProjetsPage = async (props: Props) => {
  const metadatas = {
    title: "Projets - Ecole Saint Augustin Crémieu",
    description:
      "Découvrez les projets scolaire , pédagogique et pastoral de l’école Saint Augustin!",
  };
  const slug = "ecole-projets";
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

export default ProjetsPage;
