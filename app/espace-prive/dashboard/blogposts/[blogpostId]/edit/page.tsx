"use client";

import { getBlogPostById } from "@/actions/blogposts/get";
import { updateBlogPost } from "@/actions/blogposts/post";
import { getAllEntities } from "@/actions/entity/get";
import { BlogPostForm } from "@/components/dashboard/bloposts/blogpost-form";
import { useCustomMutation } from "@/hooks/useCustomMutation";
import { createBlogpostSchema } from "@/schemas";
import { BlogPostWithEntity } from "@/types/model";
import { Entity } from "@prisma/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

const EditBlogpostPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const params = useParams();
  const { blogpostId } = params;

  const { data: blogpostData, isLoading } = useQuery<BlogPostWithEntity>({
    queryKey: ["blogpost", blogpostId],
    queryFn: async () => {
      const result = await getBlogPostById(blogpostId as string);
      if ("error" in result) {
        throw new Error(result.error);
      }
      return result as BlogPostWithEntity;
    },
    enabled: !!blogpostId, // Only run the query if blogpostId is defined
  });

  const { data: entityData, isLoading: isLoadingEntities } = useQuery<Entity[]>(
    {
      queryKey: ["entities"],
      queryFn: async () => {
        try {
          const entities = await getAllEntities();
          if (!entities) {
            throw new Error("Entities not found");
          }
          return entities;
        } catch (err) {
          if (err instanceof Error) {
            setError(
              err.message || "Quelque chose n'a pas fonctionné en front",
            );
          } else {
            setError("Quelque chose n'a pas fonctionné en front");
          }
          throw err; // Re-throw the error to ensure the query fails
        }
      },
      // enabled: !!entityId, // Only run the query if pageId is defined
    },
  );

  const mutation = useCustomMutation<
    { success: string } | { error: string },
    unknown,
    z.infer<typeof createBlogpostSchema>,
    unknown
  >(
    { queryKey: ["blogpost", blogpostId] },
    (values) => updateBlogPost(blogpostId as string, values),
    {
      onSuccess: [
        () =>
          queryClient.invalidateQueries({
            queryKey: ["blogpost", blogpostId],
          }),
        () => router.push("/espace-prive/dashboard/blogposts"),
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

  const handleSubmit = (values: z.infer<typeof createBlogpostSchema>) => {
    setError("");
    mutation.mutate(values);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!blogpostData) {
    return <p className="text-red-500">Blog post not found</p>;
  }

  return (
    <BlogPostForm
      initialValues={blogpostData}
      onSubmit={handleSubmit}
      isPending={mutation.isPending}
      error={error}
      success={success}
      entities={entityData || []}
    />
  );
};

export default EditBlogpostPage;
