"use client";

import { getPageById } from "@/actions/pages/get";
import { updatePage } from "@/actions/pages/update-page";
import { PageForm } from "@/components/dashboard/page/page-form";
import { useCustomMutation } from "@/hooks/useCustomMutation";
import { updatePageSchema } from "@/schemas";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from "zod";
import { confirmationMessage } from "@/components/ui/confirmation-message";
import { BackButton } from "@/components/dashboard/back-button";

const pause = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

type Page = {
  name: string;
  slug?: string;
  content: string;
  release?: boolean;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

const EditPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const params = useParams();
  const { pageId } = params;

  const { data: pageData, isLoading } = useQuery<Page | { error: string }>({
    queryKey: ["page", pageId],
    queryFn: async () => {
      try {
        const result = await getPageById(pageId as string);
        if ("error" in result) {
          throw new Error(result.error);
        }
        return result;
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message || "Quelque chose n'a pas fonctionné en front");
        } else {
          setError("Quelque chose n'a pas fonctionné en front");
        }
        throw err; // Re-throw the error to ensure the query fails
      }
    },
    enabled: !!pageId, // Only run the query if pageId is defined
  });

  const mutation = useCustomMutation<
    { success: string } | { error: string },
    unknown,
    z.infer<typeof updatePageSchema>,
    unknown
  >(
    { queryKey: ["page", pageId] },
    (values) => updatePage(pageId as string, values),
    {
      onSuccess: [
        () => queryClient.invalidateQueries({ queryKey: ["page", pageId] }),
        async () => {
          setSuccess("Page mise à jour");
          confirmationMessage.success("Page mise à jour");
          await pause(1500);
          router.push("/espace-prive/dashboard/pages");
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

  const handleSubmit = (values: z.infer<typeof updatePageSchema>) => {
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
            Pages
          </p>
          <h1 className="text-4xl font-black text-secondary">
            {pageData && "name" in pageData && pageData.name
              ? `Page : ${pageData.name}`
              : "Édition de page"}
          </h1>
        </div>
        <BackButton href="/espace-prive/dashboard/pages" />
      </div>
      <PageForm
        initialValues={pageData as Partial<Page>}
        onSubmit={handleSubmit}
        isPending={mutation.isPending}
        error={error}
        success={success}
        mode="edit"
      />
    </div>
  );
};

export default EditPage;
