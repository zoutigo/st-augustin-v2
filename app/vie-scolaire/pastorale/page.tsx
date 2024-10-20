import { getPageByName } from '@/actions/pages/get-page';
import { PageHolder } from '@/components/page-holder';
import PageContent from '@/components/tiptap/page-content';
import React from 'react';

type Props = {};

const PastoralePage = async (props: Props) => {
  const slug = 'vie-scolaire-pastorale';
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

export default PastoralePage;
