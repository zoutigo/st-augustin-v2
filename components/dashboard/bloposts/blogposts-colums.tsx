'use client';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { Pencil, Trash2 } from 'lucide-react';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
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
  // ID column hidden for cleaner UI
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
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const router = useRouter();
      const id = row.original.id;
      const handleDelete = async () => {
        const res = await fetch(`/api/blogposts/${id}`, { method: 'DELETE' });
        if (res.ok) router.refresh();
        else alert("La suppression n'a pas réussi.");
      };
      return (
        <div className="flex justify-center gap-2">
          <Link href={`/espace-prive/dashboard/blogposts/${id}/edit`}>
            <Button variant="ghost" size="icon" aria-label="Modifier">
              <Pencil className="h-4 w-4 text-blue-600" />
            </Button>
          </Link>
          <ConfirmDialog
            title="Supprimer l'article"
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
