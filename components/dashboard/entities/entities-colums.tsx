"use client";
import Link from "next/link";

import { Entity } from "@prisma/client";
import { ColumnDef, Row } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { ActionIconButton } from "@/components/ui/action-icon-button";
import { confirmationMessage } from "@/components/ui/confirmation-message";
import { Badge } from "@/components/ui/badge";

const EntityActionsCell = ({ row }: { row: Row<Entity> }) => {
  const router = useRouter();
  const id = row.original.id;
  const handleDelete = async () => {
    const res = await fetch(`/api/entities/${id}`, { method: "DELETE" });
    if (res.ok) {
      confirmationMessage.success("Entité supprimée");
      router.refresh();
    } else {
      confirmationMessage.error("La suppression n'a pas réussi");
    }
  };

  return (
    <div className="flex justify-center gap-2">
      <ActionIconButton
        type="view"
        href={`/espace-prive/dashboard/entities/${id}`}
        aria-label="Voir l'entité"
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
      <Link
        href={`/espace-prive/dashboard/entities/${row.original.id}`}
        className="text-lg font-semibold text-secondary hover:underline"
      >
        {row.original.name}
      </Link>
    ),
  },
  // ID column hidden for cleaner UI
  {
    accessorKey: "slug",
    header: "Slug",
    cell: ({ row }) => (
      <div className="text-base text-muted-foreground">{row.original.slug}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Créée le",
    cell: ({ row }) => (
      <div className="text-base text-muted-foreground">
        {new Date(row.original.createdAt).toLocaleDateString()}
      </div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <EntityActionsCell row={row} />,
  },
];
