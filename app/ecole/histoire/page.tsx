import { getPageByName } from '@/actions/pages/get-page';
import { PageHolder } from '@/components/page-holder';
import PageContent from '@/components/tiptap/page-content';
import React from 'react';

type Props = {};

const Histoire = async (props: Props) => {
  const slug = 'ecole-histoire';
  const page = await getPageByName(slug);

  if (!page) {
    return <p className="text-red-500">Page not found</p>;
  }

  return (
    <PageHolder>
      <PageContent content={page.content} />
    </PageHolder>
  );
};

export default Histoire;
