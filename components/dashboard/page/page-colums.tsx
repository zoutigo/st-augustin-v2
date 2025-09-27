'use client';
import Link from 'next/link';

import { Page } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Pencil, Trash2 } from 'lucide-react';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
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
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const router = useRouter();
      const id = row.original.id;
      const handleDelete = async () => {
        const res = await fetch(`/api/pages/${id}`, { method: 'DELETE' });
        if (res.ok) router.refresh();
        else alert("La suppression n'a pas réussi.");
      };
      return (
        <div className="flex justify-center gap-2">
          <Link href={`/espace-prive/dashboard/pages/${id}/edit`}>
            <Button variant="ghost" size="icon" aria-label="Modifier">
              <Pencil className="h-4 w-4 text-blue-600" />
            </Button>
          </Link>
          <ConfirmDialog
            title="Supprimer la page"
            description="Cette action est irréversible. Confirmez la suppression."
            confirmText="Supprimer"
            onConfirm={handleDelete}
          >
            <Button
              variant="destructive"
              size="icon"
              aria-label="Supprimer"
              className="bg-destructive/90 hover:bg-destructive"
            >
              <Trash2 className="h-4 w-4 text-destructive-foreground" />
            </Button>
          </ConfirmDialog>
        </div>
      );
    },
  },
];
