'use client';
import Link from 'next/link';

import { Page } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';

export const PageColumns: ColumnDef<Page>[] = [
  {
    accessorKey: 'name',
    header: 'Nom de la page',
    cell: ({ row }) => (
      <Link href={`/espace-prive/dashboard/pages/${row.original.id}`}>
        {row.original.name}
      </Link>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Date de création',
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
  },
  {
    accessorKey: 'updatedAt',
    header: 'Dernière mise à jour',
    cell: ({ row }) => new Date(row.original.updatedAt).toLocaleDateString(),
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      return (
        <Button className="text-secondary">
          <Link href={`/espace-prive/dashboard/pages/${row.original.id}/edit`}>
            Modifier
          </Link>
        </Button>
      );
    },
  },
];
