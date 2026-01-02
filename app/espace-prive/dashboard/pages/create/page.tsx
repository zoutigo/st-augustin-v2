"use client";

import { PageForm } from "@/components/dashboard/page/page-form";
import React, { useState, useTransition } from "react";
import { createPageSchema } from "@/schemas";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { createPage } from "@/actions/pages/post";
import { confirmationMessage } from "@/components/ui/confirmation-message";
import { BackButton } from "@/components/dashboard/back-button";

type CreatePageInput = z.infer<typeof createPageSchema>;

type Props = {};

const pause = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const CreatePage = (props: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const initialValues: Partial<CreatePageInput> = {
    name: "",
    content: "",
    slug: "",
    release: false,
  };

  const handleSubmit = (values: CreatePageInput) => {
    setError("");
    startTransition(() => {
      createPage(values)
        .then(async (data) => {
          if (data.error) {
            setError(data.error);
          }
          if (data.success) {
            setSuccess(data.success);
            confirmationMessage.success("Page créée avec succès");
            await pause(1500);
            router.push("/espace-prive/dashboard/pages");
            setTimeout(() => router.refresh(), 100);
          }
        })
        .catch(() => setError("Quelque chose n'a pas fonctionné"));
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Pages
          </p>
          <h1 className="text-4xl font-black text-secondary">Créer une page</h1>
        </div>
        <BackButton href="/espace-prive/dashboard/pages" />
      </div>
      <PageForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        isPending={isPending}
        error={error}
        success={success}
        mode="create"
      />
    </div>
  );
};

export default CreatePage;
