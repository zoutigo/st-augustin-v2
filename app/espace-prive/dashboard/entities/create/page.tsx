"use client";

import React, { useState, useTransition } from "react";
import { createEntitySchema } from "@/schemas";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { createEntity } from "@/actions/entity/posts";
import { EntityForm } from "@/components/dashboard/entities/entity-form";

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
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }
          if (data.success) {
            setSuccess(data.success);

            router.push("/espace-prive/dashboard/entities");
            router.refresh();
          }
        })
        .catch(() => setError("Quelque chose n'a pas fonctionné"));
    });
  };

  return (
    <EntityForm
      initialValues={initialValues}
      onSubmit={handleSubmit}
      isPending={isPending}
      error={error}
      success={success}
    />
  );
};

export default CreateEntityPage;
