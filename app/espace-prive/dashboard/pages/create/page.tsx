'use client';

import { PageForm } from '@/components/dashboard/page/page-form';
import React, { useState, useTransition } from 'react';
import { createPageSchema } from '@/schemas';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { createPage } from '@/actions/pages/post';

type CreatePageInput = z.infer<typeof createPageSchema>;

type Props = {};

const CreatePage = (props: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const initialValues: Partial<CreatePageInput> = {
    name: '',
    content: '',
    slug: '',
  };

  const handleSubmit = (values: CreatePageInput) => {
    setError('');
    startTransition(() => {
      createPage(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }
          if (data.success) {
            setSuccess(data.success);
            router.push('/espace-prive/dashboard/pages');
          }
        })
        .catch(() => setError("Quelque chose n'a pas fonctionné"));
    });
  };

  return (
    <PageForm
      initialValues={initialValues}
      onSubmit={handleSubmit}
      isPending={isPending}
      error={error}
      success={success}
    />
  );
};

export default CreatePage;
