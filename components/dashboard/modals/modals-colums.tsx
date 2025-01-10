'use client';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { Modal } from '@prisma/client';

export const ModalsColumns: ColumnDef<Modal>[] = [
  {
    accessorKey: 'title',
    header: 'Titre',
    cell: ({ row }) => (
      <Link href={`/espace-prive/dashboard/modals/${row.original.id}`}>
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: 'id',
    header: 'Id',
    cell: ({ row }) => <div>{row.original.id} </div>,
  },

  {
    accessorKey: 'startDate',
    header: 'Date de début',
    cell: ({ row }) => new Date(row.original.startDate).toLocaleDateString(),
  },
  {
    accessorKey: 'endDate',
    header: 'Date de fin',
    cell: ({ row }) => new Date(row.original.endDate).toLocaleDateString(),
  },

  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      return (
        <Button className="text-secondary">
          <Link href={`/espace-prive/dashboard/modals/${row.original.id}/edit`}>
            Modifier
          </Link>
        </Button>
      );
    },
  },
];
