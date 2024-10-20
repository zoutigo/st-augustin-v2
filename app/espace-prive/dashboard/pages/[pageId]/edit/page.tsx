'use client';

import { getPageById } from '@/actions/pages/get-page';
import { updatePage } from '@/actions/pages/update-page';
import { PageForm } from '@/components/dashboard/page/page-form';
import { useCustomMutation } from '@/hooks/useCustomMutation';
import { updatePageSchema } from '@/schemas';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { z } from 'zod';

type Page = {
  name: string;
  slug?: string;
  content: string;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

const EditPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const params = useParams();
  const { pageId } = params;

  const { data: pageData, isLoading } = useQuery<Page>({
    queryKey: ['page', pageId],
    queryFn: async () => {
      try {
        return await getPageById(pageId as string);
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
    any,
    z.infer<typeof updatePageSchema>,
    unknown
  >(
    { queryKey: ['page', pageId] },
    (values) => updatePage(pageId as string, values),
    {
      onSuccess: [
        () => queryClient.invalidateQueries({ queryKey: ['page', pageId] }),
        () => router.push('/espace-prive/dashboard/pages'),
      ],
      onError: [
        (err: unknown) => {
          if (err instanceof Error) {
            setError(
              err.message || "Quelque chose n'a pas fonctionné en front"
            );
          } else {
            setError("Quelque chose n'a pas fonctionné en front");
          }
        },
      ],
    }
  );

  const handleSubmit = (values: z.infer<typeof updatePageSchema>) => {
    setError('');
    mutation.mutate(values);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <PageForm
      initialValues={pageData}
      onSubmit={handleSubmit}
      isPending={mutation.isPending}
      error={error}
      success={success}
    />
  );
};

export default EditPage;
