// app/espace-prive/dashboard/pages/page.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { DataTable } from '@/components/data-table';
import { Modal } from '@prisma/client';
import { getAllModals } from '@/actions/modals/get';
import { ModalsColumns } from '@/components/dashboard/modals/modals-colums';

const ModalPage = async () => {
  let modal: Modal[] = [];
  let error: string | null = null;

  try {
    const result = await getAllModals();
    if ('error' in result) {
      error = result.error;
    } else {
      modal = result;
    }
  } catch (err) {
    error = (err as Error).message;
  }

  return (
    <div>
      <div className="flex items-center mb-4">
        <h1 className="text-2xl font-bold flex-grow">Liste des modales</h1>
        <Link href={'/espace-prive/dashboard/modals/create'} passHref>
          <Button variant="secondary" className="text-base font-semibold">
            Créer une nouvelle modale
          </Button>
        </Link>
      </div>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <div className="rounded-md border border-gray-200 shadow-sm">
        <DataTable data={modal} columns={ModalsColumns} />
      </div>
    </div>
  );
};

export default ModalPage;
