'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
      const router = useRouter();
      const id = row.original.id;
      const handleDelete = async () => {
        const ok = window.confirm('Supprimer cette modale ?');
        if (!ok) return;
        const res = await fetch(`/api/modals/${id}`, { method: 'DELETE' });
        if (res.ok) {
          router.refresh();
        } else {
          alert("La suppression n'a pas réussi.");
        }
      };
      return (
        <div className="flex gap-2">
          <Link href={`/espace-prive/dashboard/modals/${id}/edit`}>
            <Button variant="secondary">Modifier</Button>
          </Link>
          <Button variant="destructive" className="text-white" onClick={handleDelete}>
            Supprimer
          </Button>
        </div>
      );
    },
  },
];
