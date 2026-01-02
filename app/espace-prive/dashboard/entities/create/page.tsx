"use client";

import React, { useState, useTransition } from "react";
import { createEntitySchema } from "@/schemas";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { createEntity } from "@/actions/entity/posts";
import { EntityForm } from "@/components/dashboard/entities/entity-form";
import { confirmationMessage } from "@/components/ui/confirmation-message";
import { BackButton } from "@/components/dashboard/back-button";

type CreateEntityInput = z.infer<typeof createEntitySchema>;

type Props = {};

const CreateEntityPage = (props: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const initialValues: Partial<CreateEntityInput> = {
    name: "",
    slug: "",
    description: "",
  };

  const handleSubmit = (values: CreateEntityInput) => {
    setError("");
    startTransition(() => {
      createEntity(values)
        .then(async (data) => {
          if (data.error) {
            setError(data.error);
          }
          if (data.success) {
            setSuccess(data.success);
            confirmationMessage.success("Entité créée");
            setTimeout(() => {
              router.push("/espace-prive/dashboard/entities");
              router.refresh();
            }, 800);
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
            Entités
          </p>
          <h1 className="text-4xl font-black text-secondary">
            Créer une entité
          </h1>
        </div>
        <BackButton href="/espace-prive/dashboard/entities" />
      </div>
      <EntityForm
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

export default CreateEntityPage;
