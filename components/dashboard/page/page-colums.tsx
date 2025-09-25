'use client';
import Link from 'next/link';

import { Page } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Pencil, Trash2 } from 'lucide-react';
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
      const router = useRouter();
      const id = row.original.id;
      const handleDelete = async () => {
        const ok = window.confirm('Supprimer cette page ?');
        if (!ok) return;
        const res = await fetch(`/api/pages/${id}`, { method: 'DELETE' });
        if (res.ok) router.refresh();
        else alert("La suppression n'a pas réussi.");
      };
      return (
        <div className="flex gap-1">
          <Link href={`/espace-prive/dashboard/pages/${id}/edit`}>
            <Button variant="ghost" size="icon" aria-label="Modifier">
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
          <Button
            variant="destructive"
            size="icon"
            aria-label="Supprimer"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];
