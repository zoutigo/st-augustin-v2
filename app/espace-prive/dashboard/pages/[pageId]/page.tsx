import React from 'react';
import { getPageById } from '@/actions/pages/getPageById';
import PageContent from '@/components/dashboard/page/page-content';

interface PageDetailProps {
  params: {
    pageId: string;
  };
}

const PageDetail = async ({ params }: PageDetailProps) => {
  const page = await getPageById(params.pageId);

  if (!page) {
    return <p className="text-red-500">Page not found</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{page.name}</h1>
      <PageContent content={page.content} />
      <p>Created at: {new Date(page.createdAt).toLocaleDateString()}</p>
      <p>Updated at: {new Date(page.updatedAt).toLocaleDateString()}</p>
    </div>
  );
};

export default PageDetail;
