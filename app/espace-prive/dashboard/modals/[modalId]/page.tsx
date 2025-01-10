import React from 'react';
import PageContent from '@/components/tiptap/page-content';

import { Modal } from '@prisma/client';
import { getModalById } from '@/actions/modals/get';

interface ModalDetailPageProps {
  params: {
    modalId: string;
  };
}

const ModalDetailPage = async ({ params }: ModalDetailPageProps) => {
  let modal: Modal | null = null;
  let error: string | null = null;

  try {
    const result = await getModalById(params.modalId);
    if ('error' in result) {
      error = result.error;
    } else {
      modal = result as Modal;
    }
  } catch (err) {
    error = (err as Error).message;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!modal) {
    return <p className="text-red-500">Modal not found</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{modal.title}</h1>
      <PageContent content={modal.content} />

      <p>Created at: {new Date(modal.createdAt).toLocaleDateString()}</p>
      <p>Updated at: {new Date(modal.updatedAt).toLocaleDateString()}</p>
    </div>
  );
};

export default ModalDetailPage;
