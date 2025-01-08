'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createBlogpostSchema } from '@/schemas';
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
import { Checkbox } from '@/components/ui/checkbox';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { TiptapEditor } from '@/components/tiptap/tiptap';
import { Entity } from '@prisma/client';

// Définir les types basés sur le schéma Zod
type CreateBlogpostInput = z.infer<typeof createBlogpostSchema>;

interface BlogpostFormProps {
  initialValues?: Partial<CreateBlogpostInput>;
  onSubmit: (values: CreateBlogpostInput) => void;
  isPending: boolean;
  error?: string;
  success?: string;
  entities: Entity[];
}

export const BlogPostForm: React.FC<BlogpostFormProps> = ({
  entities = [],
  initialValues = {},
  onSubmit,
  isPending,
  error,
  success,
}) => {
  const [editorContent, setEditorContent] = useState(
    initialValues.content || ''
  );
  const form = useForm<CreateBlogpostInput>({
    resolver: zodResolver(createBlogpostSchema),
    defaultValues: { ...initialValues, content: editorContent },
  });

  const handleSubmit = (values: CreateBlogpostInput) => {
    onSubmit(values);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">
          {initialValues ? 'Modifier le post' : 'Créer un post'}
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
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{'Titre du post :'} </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Titre du post"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.title?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="entityId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{'Entité liée :'} </FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        disabled={isPending}
                        className="form-select"
                      >
                        <option value="">Sélectionnez une entité</option>
                        {entities.map((entity) => (
                          <option
                            key={entity.id}
                            value={entity.id}
                            selected={entity.id === field.value}
                          >
                            {entity.name}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.entityId?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isReleased"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{'Publier le post  ?'} </FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isPending}
                        name={field.name}
                        ref={field.ref}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.isReleased?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isPublic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{'Le post doit il etre public ?'} </FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isPending}
                        name={field.name}
                        ref={field.ref}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.isPublic?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{'contenu du post'} </FormLabel>
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
                      {form.formState.errors.content?.message}
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
