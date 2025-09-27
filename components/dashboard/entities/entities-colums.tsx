'use client';
import Link from 'next/link';

import { Entity } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { Pencil, Trash2 } from 'lucide-react';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';

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
  // ID column hidden for cleaner UI
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
        const res = await fetch(`/api/entities/${id}`, { method: 'DELETE' });
        if (res.ok) router.refresh();
        else alert("La suppression n'a pas réussi.");
      };
      return (
        <div className="flex justify-center gap-2">
          <Link href={`/espace-prive/dashboard/entities/${id}/edit`}>
            <Button variant="ghost" size="icon" aria-label="Modifier">
              <Pencil className="h-4 w-4 text-blue-600" />
            </Button>
          </Link>
          <ConfirmDialog
            title="Supprimer l'entité"
            description="Cette action est irréversible et peut casser des liens. Confirmez la suppression."
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
