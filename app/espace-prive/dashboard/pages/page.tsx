// app/espace-prive/dashboard/pages/page.tsx
import React from 'react';
import { Page } from '@prisma/client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { DataTable } from '@/components/data-table';
import { PageColumns } from '@/components/dashboard/page/page-colums';
import { getAllPages } from '@/actions/pages/get-page';

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
      <DataTable data={pagesData} columns={PageColumns} />
    </div>
  );
};

export default PageList;
