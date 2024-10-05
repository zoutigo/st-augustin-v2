// dashboard/components/page/page-list.tsx
import React from 'react';
import { DataTable } from '@/components/dashboard/page/page-table';
import { getAllPages } from '@/actions/pages/get-all-pages';
import { Page } from '@prisma/client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const PageList = async () => {
  let pagesData: Page[] = [];
  let error: string | null = null;

  try {
    pagesData = await getAllPages();
  } catch (err) {
    error = (err as Error).message;
  }

  return (
    <div>
      <div className="flex ">
        <h1 className="text-2xl font-bold mb-4 flex-grow">Liste des Pages</h1>
        <Button variant={'default'} className="text-secondary text-xl">
          <Link href={'/espace-prive/dashboard/pages/create'} passHref>
            Créer une nouvelle page
          </Link>
        </Button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <DataTable data={pagesData} />
    </div>
  );
};

export default PageList;
