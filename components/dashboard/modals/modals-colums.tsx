"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

import { Button } from "@/components/ui/button";
import { ColumnDef, Row } from "@tanstack/react-table";
import { Modal } from "@prisma/client";

const ModalActionsCell = ({ row }: { row: Row<Modal> }) => {
  const router = useRouter();
  const id = row.original.id;
  const handleDelete = async () => {
    const res = await fetch(`/api/modals/${id}`, { method: "DELETE" });
    if (res.ok) router.refresh();
    else alert("La suppression n'a pas réussi.");
  };

  return (
    <div className="flex justify-center gap-2">
      <Link href={`/espace-prive/dashboard/modals/${id}/edit`}>
        <Button variant="ghost" size="icon" aria-label="Modifier">
          <Pencil className="h-4 w-4 text-blue-600" />
        </Button>
      </Link>
      <ConfirmDialog
        title="Supprimer la modale"
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
};

export const ModalsColumns: ColumnDef<Modal>[] = [
  {
    accessorKey: "title",
    header: "Titre",
    cell: ({ row }) => (
      <Link href={`/espace-prive/dashboard/modals/${row.original.id}`}>
        {row.original.title}
      </Link>
    ),
  },
  // ID column hidden for cleaner UI

  {
    accessorKey: "startDate",
    header: "Date de début",
    cell: ({ row }) => new Date(row.original.startDate).toLocaleDateString(),
  },
  {
    accessorKey: "endDate",
    header: "Date de fin",
    cell: ({ row }) => new Date(row.original.endDate).toLocaleDateString(),
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ModalActionsCell row={row} />,
  },
];
