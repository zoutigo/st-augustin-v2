"use client";

import { getEntityById } from "@/actions/entity/get";
import { updateEntity } from "@/actions/entity/posts";
import { EntityForm } from "@/components/dashboard/entities/entity-form";

import { useCustomMutation } from "@/hooks/useCustomMutation";
import { updateEntitySchema } from "@/schemas";
import { Entity } from "@prisma/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

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
        () => router.push("/espace-prive/dashboard/entities"),
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
    <EntityForm
      initialValues={entityData}
      onSubmit={handleSubmit}
      isPending={mutation.isPending}
      error={error}
      success={success}
    />
  );
};

export default EditEntityPage;
