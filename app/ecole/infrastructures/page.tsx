import { getPageBySlug } from '@/actions/pages/get';
import { PageHolder } from '@/components/page-holder';
import PageContent from '@/components/tiptap/page-content';
import { Page } from '@prisma/client';
import React from 'react';

type Props = {};

const Ecole = async (props: Props) => {
  const slug = 'ecole-infrastructures';
  const result = await getPageBySlug(slug);

  if ('error' in result) {
    return <p className="text-red-500">Page not found : `${result.error}`</p>;
  }

  const page: Page = result;
  return (
    <PageHolder>
      <PageContent content={page.content} />
    </PageHolder>
  );
};

export default Ecole;
