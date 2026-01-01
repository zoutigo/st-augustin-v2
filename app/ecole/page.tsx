import { getPageBySlug } from "@/actions/pages/get";
import { PageHolder } from "@/components/page-holder";
import { PageCard } from "@/components/pageCard";
import { Page } from "@prisma/client";
import React from "react";

export const revalidate = 3600;

const Ecole = async () => {
  const slug = "ecole";
  const result = await getPageBySlug(slug);

  if ("error" in result) {
    return <p className="text-red-500">Page not found : `${result.error}`</p>;
  }

  const page: Page = result;

  return (
    <PageHolder>
      <PageCard slug="ecole" description="" />
    </PageHolder>
  );
};

export default Ecole;
