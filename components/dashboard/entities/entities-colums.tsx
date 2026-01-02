"use client";
import Link from "next/link";

import { Entity } from "@prisma/client";
import { ColumnDef, Row } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { ActionIconButton } from "@/components/ui/action-icon-button";

const EntityActionsCell = ({ row }: { row: Row<Entity> }) => {
  const router = useRouter();
  const id = row.original.id;
  const handleDelete = async () => {
    const res = await fetch(`/api/entities/${id}`, { method: "DELETE" });
    if (res.ok) router.refresh();
    else alert("La suppression n'a pas réussi.");
  };

  return (
    <div className="flex justify-center gap-2">
      <ActionIconButton
        type="view"
        href={`/classes/${row.original.slug}`}
        aria-label="Voir la page publique"
      />
      <ActionIconButton
        type="edit"
        href={`/espace-prive/dashboard/entities/${id}/edit`}
        aria-label="Modifier"
      />
      <ConfirmDialog
        title="Supprimer l'entité"
        description="Cette action est irréversible et peut casser des liens. Confirmez la suppression."
        confirmText="Supprimer"
        onConfirm={handleDelete}
      >
        <ActionIconButton type="delete" aria-label="Supprimer" />
      </ConfirmDialog>
    </div>
  );
};

export const EntitiesColumns: ColumnDef<Entity>[] = [
  {
    accessorKey: "name",
    header: "Nom de la page",
    cell: ({ row }) => (
      <Link href={`/espace-prive/dashboard/entities/${row.original.id}`}>
        {row.original.name}
      </Link>
    ),
  },
  // ID column hidden for cleaner UI
  {
    accessorKey: "slug",
    header: "Slug",
    cell: ({ row }) => <div>{row.original.slug} </div>,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <EntityActionsCell row={row} />,
  },
];
