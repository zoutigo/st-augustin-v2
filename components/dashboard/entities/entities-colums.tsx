'use client';
import Link from 'next/link';

import { Entity } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';

export const EntitiesColumns: ColumnDef<Entity>[] = [
  {
    accessorKey: 'name',
    header: 'Nom de la page',
    cell: ({ row }) => (
      <Link href={`/espace-prive/dashboard/entities/${row.original.id}`}>
        {row.original.name}
      </Link>
    ),
  },
  {
    accessorKey: 'id',
    header: 'Id',
    cell: ({ row }) => <div>{row.original.id} </div>,
  },
  {
    accessorKey: 'slug',
    header: 'Slug',
    cell: ({ row }) => <div>{row.original.slug} </div>,
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
          <Link
            href={`/espace-prive/dashboard/entities/${row.original.id}/edit`}
          >
            Modifier
          </Link>
        </Button>
      );
    },
  },
];
