'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createEntitySchema } from '@/schemas';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { TiptapEditor } from '@/components/tiptap/tiptap';

// Définir les types basés sur le schéma Zod
type CreateEntityInput = z.infer<typeof createEntitySchema>;

interface EntityFormProps {
  initialValues?: Partial<CreateEntityInput>;
  onSubmit: (values: CreateEntityInput) => void;
  isPending: boolean;
  error?: string;
  success?: string;
}

export const EntityForm: React.FC<EntityFormProps> = ({
  initialValues = {},
  onSubmit,
  isPending,
  error,
  success,
}) => {
  const [editorContent, setEditorContent] = useState(
    initialValues.description || ''
  );
  const form = useForm<CreateEntityInput>({
    resolver: zodResolver(createEntitySchema),
    defaultValues: { ...initialValues, description: editorContent },
  });

  const handleSubmit = (values: CreateEntityInput) => {
    onSubmit(values);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">
          {initialValues
            ? 'Modifier la catégorie de blog'
            : 'Créer une catégorie de blog'}
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="space-y-6"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{"Nom de l'entité :"} </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Nom de l'entité"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.name?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{"Slug de l'entité :"} </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Slug de l'entité"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.name?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{"Description de l'entité"} </FormLabel>
                    <FormControl>
                      <TiptapEditor
                        initialContent={field.value}
                        onChange={(content) => {
                          field.onChange(content);
                          setEditorContent(content);
                        }}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.description?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>

            <FormError message={error} />
            <FormSuccess message={success} />
            <Button
              type="submit"
              disabled={isPending}
              className="text-secondary"
            >
              {isPending ? 'En cours...' : 'Soumettre'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
