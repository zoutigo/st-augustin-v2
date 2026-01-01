"use client";

import { getModalById } from "@/actions/modals/get";
import { updateModal } from "@/actions/modals/post";
import { ModalForm } from "@/components/dashboard/modals/modal-form";
import { useCustomMutation } from "@/hooks/useCustomMutation";
import { createModalSchema } from "@/schemas";
import { Modal } from "@prisma/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

const EditModalPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const params = useParams();
  const { modalId } = params;

  const { data: modalData, isLoading } = useQuery<Modal>({
    queryKey: ["modal", modalId],
    queryFn: async () => {
      const result = await getModalById(modalId as string);
      if ("error" in result) {
        throw new Error(result.error);
      }
      return result as Modal;
    },
    enabled: !!modalId, // Only run the query if modalId is defined
  });

  const mutation = useCustomMutation<
    { success: string } | { error: string },
    unknown,
    z.infer<typeof createModalSchema>,
    unknown
  >(
    { queryKey: ["modal", modalId] },
    (values) => updateModal(modalId as string, values),
    {
      onSuccess: [
        () =>
          queryClient.invalidateQueries({
            queryKey: ["modal", modalId],
          }),
        () => router.push("/espace-prive/dashboard/modals"),
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

  const handleSubmit = (values: z.infer<typeof createModalSchema>) => {
    setError("");
    mutation.mutate(values);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!modalData) {
    return <p className="text-red-500">Modal post not found</p>;
  }

  return (
    <ModalForm
      initialValues={modalData}
      onSubmit={handleSubmit}
      isPending={mutation.isPending}
      error={error}
      success={success}
    />
  );
};

export default EditModalPage;
