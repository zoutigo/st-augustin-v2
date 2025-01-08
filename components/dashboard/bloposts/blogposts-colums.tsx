'use client';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { BlogPostWithEntity } from '@/types/model';

export const BlogpostsColumns: ColumnDef<BlogPostWithEntity>[] = [
  {
    accessorKey: 'title',
    header: 'Titre',
    cell: ({ row }) => (
      <Link href={`/espace-prive/dashboard/blogposts/${row.original.id}`}>
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
    accessorKey: 'entity',
    header: 'Entité',
    cell: ({ row }) => <div>{row.original.entity?.name} </div>,
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
            href={`/espace-prive/dashboard/blogposts/${row.original.id}/edit`}
          >
            Modifier
          </Link>
        </Button>
      );
    },
  },
];
