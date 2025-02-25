import { getPageBySlug } from '@/actions/pages/get';
import { PageHolder } from '@/components/page-holder';
import PageContent from '@/components/tiptap/page-content';
import { Page } from '@prisma/client';
import React from 'react';

const Equipe = async (): Promise<JSX.Element> => {
  const metadatas = {
    title: 'Equipe pedagogique - Ecole Saint Augustin Crémieu',
    description: 'Découvrez l’équipe pédagogique de l’école Saint Augustin!',
  };

  const slug = 'ecole-equipe';
  const result = await getPageBySlug(slug);

  if ('error' in result) {
    return <p className="text-red-500">Page not found : `${result.error}`</p>;
  }

  const page: Page = result;

  return (
    <PageHolder>
      <PageContent content={page.content} {...metadatas} />
    </PageHolder>
  );
};

export default Equipe;
