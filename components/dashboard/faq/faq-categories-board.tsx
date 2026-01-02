"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { ActionIconButton } from "@/components/ui/action-icon-button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { BackButton } from "@/components/dashboard/back-button";
import { FaqCategoryFormWrapper } from "./faq-category-form-wrapper";
import { confirmationMessage } from "@/components/ui/confirmation-message";

interface Category {
  id: string;
  name: string;
  slug: string;
}

export const FaqCategoriesBoard = ({
  categories,
}: {
  categories: Category[];
}) => {
  const router = useRouter();
  const [list, setList] = useState(categories);
  const [refreshFlag, setRefreshFlag] = useState(0);

  const total = useMemo(() => list.length, [list]);

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/faq-categories/${id}`, { method: "DELETE" });
    const payload = await res.json().catch(() => ({}));
    if (res.ok) {
      confirmationMessage.success("Catégorie supprimée");
      setList((prev) => prev.filter((c) => c.id !== id));
      router.refresh();
    } else {
      confirmationMessage.error(
        "Suppression impossible",
        payload.error ?? "Une erreur est survenue.",
      );
    }
  };

  const handleCreated = async () => {
    const res = await fetch("/api/faq-categories");
    const latest = await res.json();
    if (Array.isArray(latest)) {
      setList(latest);
    } else {
      router.refresh();
    }
    setRefreshFlag((n) => n + 1);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            FAQ
          </p>
          <h1 className="text-4xl font-black text-secondary">Catégories</h1>
          <p className="text-base text-muted-foreground">
            Organisez vos thèmes pour les questions fréquentes du site.
          </p>
        </div>
        <div className="flex gap-2">
          <BackButton href="/espace-prive/dashboard" />
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                  Liste des catégories
                </p>
                <h2 className="text-2xl font-semibold text-secondary">
                  FAQ Catégories
                </h2>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-secondary">
                {total} au total
              </span>
            </div>

            <div className="space-y-3">
              {list.map((cat) => (
                <div
                  key={cat.id}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-xs flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <p className="text-lg font-semibold text-secondary">
                      {cat.name}
                    </p>
                    <p className="text-sm text-muted-foreground">{cat.slug}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/espace-prive/dashboard/faq-categories/${cat.id}/edit`}
                    >
                      <ActionIconButton
                        type="edit"
                        aria-label="Modifier la catégorie"
                      />
                    </Link>
                    <ConfirmDialog
                      title="Supprimer la catégorie"
                      description="Action irréversible."
                      onConfirm={() => handleDelete(cat.id)}
                    >
                      <ActionIconButton
                        type="delete"
                        aria-label="Supprimer la catégorie"
                      />
                    </ConfirmDialog>
                  </div>
                </div>
              ))}
              {list.length === 0 && (
                <p className="text-muted-foreground">
                  Aucune catégorie pour le moment.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-6 space-y-4">
            <div className="space-y-1">
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                Nouvelle catégorie
              </p>
              <h2 className="text-2xl font-semibold text-secondary">
                Ajouter une catégorie
              </h2>
            </div>
            <FaqCategoryFormWrapper
              key={refreshFlag}
              mode="create"
              onCreated={handleCreated}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
