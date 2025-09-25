// app/espace-prive/dashboard/pages/page.tsx
import React from 'react';
import { Page } from '@prisma/client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { DataTable } from '@/components/data-table';
import { PageColumns } from '@/components/dashboard/page/page-colums';
import { getAllPages } from '@/actions/pages/get';

const PageList = async () => {
  let pagesData: Page[] = [];
  let error: string | null = null;

  try {
    const result = await getAllPages();
    if ('error' in result) {
      error = result.error;
    } else {
      pagesData = result;
    }
  } catch (err) {
    error = (err as Error).message;
  }

  return (
    <div>
      <div className="flex items-center mb-4">
        <h1 className="text-2xl font-bold flex-grow">Liste des Pages</h1>
        <Link href={'/espace-prive/dashboard/pages/create'} passHref>
          <Button variant="default" className="gap-2">
            <Plus className="h-4 w-4" />
            Ajouter une page
          </Button>
        </Link>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <DataTable data={pagesData} columns={PageColumns} />
    </div>
  );
};

export default PageList;
