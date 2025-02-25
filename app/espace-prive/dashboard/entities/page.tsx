// app/espace-prive/dashboard/pages/page.tsx
import React from 'react';
import { Entity } from '@prisma/client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { DataTable } from '@/components/data-table';
import { getAllEntities } from '@/actions/entity/get';
import { EntitiesColumns } from '@/components/dashboard/entities/entities-colums';

const EntitiesPage = async () => {
  let entities: Entity[] = [];
  let error: string | null = null;

  try {
    entities = await getAllEntities();
  } catch (err) {
    error = (err as Error).message;
  }

  return (
    <div>
      <div className="flex ">
        <h1 className="text-2xl font-bold mb-4 flex-grow">Liste des entités</h1>
        <Button variant={'default'} className="text-secondary text-xl">
          <Link href={'/espace-prive/dashboard/entities/create'} passHref>
            Créer une nouvelle entité
          </Link>
        </Button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <DataTable data={entities} columns={EntitiesColumns} />
    </div>
  );
};

export default EntitiesPage;
