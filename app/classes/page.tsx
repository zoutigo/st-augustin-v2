import { PageHolder } from "@/components/page-holder";
import { PageCard } from "@/components/pageCard";
import React from "react";

type Props = {};

const Classes: React.FC<Props> = async () => {
  return (
    <PageHolder>
      <PageCard slug="classes" description="" />
    </PageHolder>
  );
};

export default Classes;
