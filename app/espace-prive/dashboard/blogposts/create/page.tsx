'use client';

import React, { useEffect, useState, useTransition } from 'react';
import { createBlogpostSchema } from '@/schemas';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { createBlogPost } from '@/actions/blogposts/post';
import { BlogPostForm } from '@/components/dashboard/bloposts/blogpost-form';
import { Entity } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { getAllEntities } from '@/actions/entity/get';

type CreateBlogpostInputSchema = z.infer<typeof createBlogpostSchema>;

type Props = {};

const CreateBlogpostPage = (props: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [entities, setEntities] = useState<Entity[]>([]);
  const [entityError, setEntityError] = useState<string | undefined>('');
  const [isLoading, setIsLoading] = useState(true);

  const initialValues: Partial<CreateBlogpostInputSchema> = {
    title: '',
    content: '',
    entityId: '',
    isPublic: false,
    isReleased: false,
  };

  // const {
  //   data: entityData,
  //   isLoading: isLoadingEntities,
  //   error: entityError,
  // } = useQuery<Entity[]>({
  //   queryKey: ['entities'],
  //   queryFn: getAllEntities,
  //   staleTime: 0,
  // });

  // const {
  //   data: entityData,
  //   isLoading: isLoadingEntities,
  //   error: entityError,
  // } = useQuery<Entity[]>({
  //   queryKey: ['entities'],
  //   queryFn: async () => {
  //     console.log('useQuery: fetching entities');
  //     const data = await getAllEntities();
  //     console.log('useQuery: entities fetched', data);
  //     return data;
  //   },
  //   staleTime: 0,
  // });

  useEffect(() => {
    const fetchEntities = async () => {
      try {
        const data = await getAllEntities();
        setEntities(data);
      } catch (error) {
        setEntityError('Failed to load entities');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEntities();
  }, []);

  const handleSubmit = async (values: CreateBlogpostInputSchema) => {
    setError('');
    startTransition(async () => {
      try {
        const data = await createBlogPost(values);
        if (data.error) {
          setError(data.error);
        }
        if (data.success) {
          setSuccess(data.success);
          router.push('/espace-prive/dashboard/blogposts');
          router.refresh();
        }
      } catch (err) {
        setError("Quelque chose n'a pas fonctionné");
      }
    });
  };

  if (isLoading) {
    return <p>Loading entities...</p>;
  }

  if (entityError) {
    return (
      <p className="text-red-500">Failed to load entities: {entityError}</p>
    );
  }

  return (
    <BlogPostForm
      initialValues={initialValues}
      onSubmit={handleSubmit}
      isPending={isPending}
      error={error}
      success={success}
      entities={entities}
    />
  );
};

export default CreateBlogpostPage;
