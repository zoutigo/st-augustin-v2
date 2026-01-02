"use client";

import { useRouter } from "next/navigation";
import { confirmationMessage } from "@/components/ui/confirmation-message";
import { FaqCategoryForm } from "./faq-category-form";
import { createFaqCategorySchema } from "@/schemas";
import { z } from "zod";
import { useState } from "react";

interface Props {
  mode: "create" | "edit";
  categoryId?: string;
  defaultValues?: z.infer<typeof createFaqCategorySchema>;
  onCreated?: () => Promise<void> | void;
}

export const FaqCategoryFormWrapper = ({
  mode,
  categoryId,
  defaultValues,
  onCreated,
}: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    values: z.infer<typeof createFaqCategorySchema>,
  ) => {
    setLoading(true);
    const endpoint =
      mode === "create"
        ? "/api/faq-categories"
        : `/api/faq-categories/${categoryId ?? ""}`;
    const method = mode === "create" ? "POST" : "PATCH";

    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const payload = await res.json().catch(() => ({}));

    if (res.ok) {
      confirmationMessage.success(
        mode === "create" ? "Catégorie créée" : "Catégorie mise à jour",
      );
      if (mode === "create" && onCreated) {
        await onCreated();
      }
      router.push("/espace-prive/dashboard/faq-categories");
      router.refresh();
    } else {
      confirmationMessage.error(
        "Action impossible",
        payload.error ?? "Une erreur est survenue.",
      );
    }
    setLoading(false);
  };

  return (
    <FaqCategoryForm
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      submitLabel={mode === "create" ? "Ajouter" : "Mettre à jour"}
      loading={loading}
    />
  );
};
