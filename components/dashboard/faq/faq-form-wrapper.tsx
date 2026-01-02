"use client";

import { useRouter } from "next/navigation";
import { FaqForm } from "./faq-form";
import { confirmationMessage } from "@/components/ui/confirmation-message";
import { z } from "zod";
import { createFaqSchema } from "@/schemas";

interface Props {
  mode: "create" | "edit";
  faqId?: string;
  categories: { id: string; name: string }[];
  defaultValues?: z.infer<typeof createFaqSchema>;
}

export const FaqFormWrapper = ({
  mode,
  faqId,
  categories,
  defaultValues,
}: Props) => {
  const router = useRouter();

  const handleSubmit = async (values: z.infer<typeof createFaqSchema>) => {
    const endpoint =
      mode === "create" ? "/api/faqs" : `/api/faqs/${faqId ?? ""}`;
    const method = mode === "create" ? "POST" : "PATCH";

    const response = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const payload = await response.json().catch(() => ({}));
    if (response.ok) {
      confirmationMessage.success(
        mode === "create" ? "FAQ créée" : "FAQ mise à jour",
      );
      router.push("/espace-prive/dashboard/faq");
      router.refresh();
    } else {
      confirmationMessage.error(
        "Une erreur est survenue",
        payload.error ?? "Impossible d'enregistrer la FAQ.",
      );
    }
  };

  return (
    <FaqForm
      categories={categories}
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
    />
  );
};
