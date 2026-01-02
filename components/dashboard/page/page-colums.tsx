"use client";
import Link from "next/link";

import { Page } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { ColumnDef, Row } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { ActionIconButton } from "@/components/ui/action-icon-button";
import { confirmationMessage } from "@/components/ui/confirmation-message";

const PageActionsCell = ({ row }: { row: Row<Page> }) => {
  const router = useRouter();
  const id = row.original.id;
  const handleDelete = async () => {
    const res = await fetch(`/api/pages/${id}`, { method: "DELETE" });
    if (res.ok) {
      confirmationMessage.success("Page supprimée");
      router.refresh();
    } else {
      confirmationMessage.error("La suppression a échoué");
    }
  };

  return (
    <div className="flex justify-center gap-2">
      <Link href={`/espace-prive/dashboard/pages/${id}/edit`}>
        <ActionIconButton type="edit" aria-label="Modifier la page" />
      </Link>
      <ConfirmDialog
        title="Supprimer la page"
        description="Cette action est irréversible. Confirmez la suppression."
        confirmText="Supprimer"
        onConfirm={handleDelete}
      >
        <ActionIconButton type="delete" aria-label="Supprimer la page" />
      </ConfirmDialog>
    </div>
  );
};

export const PageColumns: ColumnDef<Page>[] = [
  {
    accessorKey: "name",
    header: "Nom de la page",
    cell: ({ row }) => (
      <Link
        href={`/espace-prive/dashboard/pages/${row.original.id}`}
        className="text-lg font-semibold text-secondary hover:underline"
      >
        {row.original.name}
      </Link>
    ),
  },
  {
    accessorKey: "release",
    header: "Statut",
    cell: ({ row }) => {
      const published = row.original.release;
      return (
        <Badge variant={published ? "success" : "secondary"}>
          {published ? "Publié" : "Brouillon"}
        </Badge>
      );
    },
  },
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
    cell: ({ row }) => <PageActionsCell row={row} />,
  },
];
