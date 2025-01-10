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
      <div className="flex ">
        <h1 className="text-2xl font-bold mb-4 flex-grow">Liste des modales</h1>
        <Button variant={'default'} className="text-secondary text-xl">
          <Link href={'/espace-prive/dashboard/modals/create'} passHref>
            Créer une nouvelle modale
          </Link>
        </Button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <DataTable data={modal} columns={ModalsColumns} />
    </div>
  );
};

export default ModalPage;
