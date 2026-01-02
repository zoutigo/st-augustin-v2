"use client";

import { getEntityById } from "@/actions/entity/get";
import { updateEntity } from "@/actions/entity/posts";
import { EntityForm } from "@/components/dashboard/entities/entity-form";
import { BackButton } from "@/components/dashboard/back-button";
import { confirmationMessage } from "@/components/ui/confirmation-message";

import { useCustomMutation } from "@/hooks/useCustomMutation";
import { updateEntitySchema } from "@/schemas";
import { Entity } from "@prisma/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
const pause = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const EditEntityPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const params = useParams();
  const { entityId } = params;

  const { data: entityData, isLoading } = useQuery<Entity>({
    queryKey: ["entity", entityId],
    queryFn: async () => {
      try {
        const entity = await getEntityById(entityId as string);
        if (!entity) {
          throw new Error("Entity not found");
        }
        return entity;
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message || "Quelque chose n'a pas fonctionné en front");
        } else {
          setError("Quelque chose n'a pas fonctionné en front");
        }
        throw err; // Re-throw the error to ensure the query fails
      }
    },
    enabled: !!entityId, // Only run the query if pageId is defined
  });

  const mutation = useCustomMutation<
    { success: string } | { error: string },
    unknown,
    z.infer<typeof updateEntitySchema>,
    unknown
  >(
    { queryKey: ["entity", entityId] },
    (values) => updateEntity(entityId as string, values),
    {
      onSuccess: [
        () =>
          queryClient.invalidateQueries({
            queryKey: ["entity", entityId],
          }),
        async () => {
          confirmationMessage.success("Entité mise à jour");
          await pause(1500);
          router.push("/espace-prive/dashboard/entities");
          setTimeout(() => router.refresh(), 100);
        },
      ],
      onError: [
        (err: unknown) => {
          if (err instanceof Error) {
            setError(
              err.message || "Quelque chose n'a pas fonctionné en front",
            );
          } else {
            setError("Quelque chose n'a pas fonctionné en front");
          }
        },
      ],
    },
  );

  const handleSubmit = (values: z.infer<typeof updateEntitySchema>) => {
    setError("");
    mutation.mutate(values);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Entités
          </p>
          <h1 className="text-4xl font-black text-secondary">
            {entityData?.name || "Édition d'entité"}
          </h1>
        </div>
        <BackButton href="/espace-prive/dashboard/entities" />
      </div>
      <EntityForm
        initialValues={entityData}
        onSubmit={handleSubmit}
        isPending={mutation.isPending}
        error={error}
        success={success}
        mode="edit"
      />
    </div>
  );
};

export default EditEntityPage;
