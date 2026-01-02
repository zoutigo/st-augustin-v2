"use client";

import Link from "next/link";
import { ActionIconButton } from "@/components/ui/action-icon-button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { CustomPagination } from "@/components/utils/custom-pagination";
import { BackButton } from "@/components/dashboard/back-button";
import { confirmationMessage } from "@/components/ui/confirmation-message";

interface FaqListItem {
  id: string;
  question: string;
  answer: string;
  categoryId: string;
  categoryName: string;
  isFeatured: boolean;
}

interface FaqCategoryItem {
  id: string;
  name: string;
  slug: string;
}

export const FaqLists = ({
  faqs,
  categories,
}: {
  faqs: FaqListItem[];
  categories: FaqCategoryItem[];
}) => {
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const handleDeleteFaq = async (id: string) => {
    const res = await fetch(`/api/faqs/${id}`, { method: "DELETE" });
    const payload = await res.json().catch(() => ({}));
    if (res.ok) {
      confirmationMessage.success("FAQ supprimée");
      router.refresh();
    } else {
      confirmationMessage.error(
        "Suppression impossible",
        payload.error ?? "Une erreur est survenue.",
      );
    }
  };

  const handleDeleteCategory = async (id: string) => {
    await fetch(`/api/faq-categories/${id}`, { method: "DELETE" });
    router.refresh();
  };

  const filteredFaqs = useMemo(() => {
    if (selectedCategories.length === 0) return faqs;
    return faqs.filter((f) => selectedCategories.includes(f.categoryId));
  }, [faqs, selectedCategories]);

  const totalPages = Math.max(1, Math.ceil(filteredFaqs.length / pageSize));
  const pagedFaqs = filteredFaqs.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-secondary">FAQ</h1>
          <p className="text-lg text-muted-foreground">
            Gérez les questions/réponses affichées sur le site.
          </p>
        </div>
        <div className="flex gap-2">
          <BackButton href="/espace-prive/dashboard" />
          <Link href="/espace-prive/dashboard/faq/create">
            <ActionIconButton type="add" aria-label="Ajouter une FAQ" />
          </Link>
        </div>
      </div>

      <Card>
        <CardContent className="p-6 space-y-4">
          <p className="text-lg font-semibold text-secondary">
            Filtrer par catégories
          </p>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => {
              const checked = selectedCategories.includes(cat.id);
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setCurrentPage(1);
                    setSelectedCategories((prev) =>
                      checked
                        ? prev.filter((c) => c !== cat.id)
                        : [...prev, cat.id],
                    );
                  }}
                  className={`rounded-full border px-4 py-2 text-base transition ${
                    checked
                      ? "bg-primary text-secondary border-primary"
                      : "bg-white text-secondary border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 space-y-5">
          <h2 className="text-2xl font-semibold text-secondary">Questions</h2>
          <div className="divide-y">
            {pagedFaqs.map((faq) => (
              <div
                key={faq.id}
                className="py-4 flex items-start justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="text-base uppercase tracking-wide text-muted-foreground">
                    {faq.categoryName || "Sans catégorie"}
                  </div>
                  <p className="text-xl font-semibold text-secondary">
                    {faq.question}
                  </p>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </p>
                  {faq.isFeatured && (
                    <span className="inline-flex text-sm px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                      Mis en avant
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Link href={`/espace-prive/dashboard/faq/${faq.id}/edit`}>
                    <ActionIconButton
                      type="edit"
                      aria-label="Modifier la FAQ"
                    />
                  </Link>
                  <ConfirmDialog
                    title="Supprimer la FAQ"
                    description="Action irréversible."
                    onConfirm={() => handleDeleteFaq(faq.id)}
                  >
                    <ActionIconButton
                      type="delete"
                      aria-label="Supprimer la FAQ"
                    />
                  </ConfirmDialog>
                </div>
              </div>
            ))}
            {pagedFaqs.length === 0 && (
              <p className="text-muted-foreground">
                Aucune FAQ pour le moment.
              </p>
            )}
          </div>
          {filteredFaqs.length > pageSize && (
            <div className="pt-4">
              <CustomPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
