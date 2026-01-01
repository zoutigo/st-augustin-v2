import { getPageBySlug } from "@/actions/pages/get";
import { PageHolder } from "@/components/page-holder";
import PageContent from "@/components/tiptap/page-content";
import { Page } from "@prisma/client";
import React from "react";

export const revalidate = 3600;

const InscriptionsPage = async (): Promise<JSX.Element> => {
  const metadatas = {
    title: "Inscriptions - Ecole Saint Augustin Crémieu",
    description:
      "Découvrez les modalités d'inscription à l’école Saint Augustin!",
  };
  const slug = "ecole-inscriptions";
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

export default InscriptionsPage;
