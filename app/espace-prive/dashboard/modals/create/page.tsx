'use client';

import React, { useEffect, useState, useTransition } from 'react';
import { createModalSchema } from '@/schemas';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { BlogPostForm } from '@/components/dashboard/bloposts/blogpost-form';
import { Entity } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { createModal } from '@/actions/modals/post';
import { ModalForm } from '@/components/dashboard/modals/modal-form';

type CreateModalInputSchema = z.infer<typeof createModalSchema>;

type Props = {};

const CreateBlogpostPage = (props: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const initialValues: Partial<CreateModalInputSchema> = {
    title: '',
    content: '',
    startDate: new Date(),
    endDate: new Date(),
  };

  const handleSubmit = async (values: CreateModalInputSchema) => {
    setError('');
    startTransition(async () => {
      try {
        const data = await createModal(values);
        if (data.error) {
          setError(data.error);
        }
        if (data.success) {
          setSuccess(data.success);
          router.push('/espace-prive/dashboard/modals');
          router.refresh();
        }
      } catch (err) {
        setError("Quelque chose n'a pas fonctionné");
      }
    });
  };

  return (
    <ModalForm
      initialValues={initialValues}
      onSubmit={handleSubmit}
      isPending={isPending}
      error={error}
      success={success}
    />
  );
};

export default CreateBlogpostPage;
