'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createModalSchema } from '@/schemas';
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
type CreateModalInput = z.infer<typeof createModalSchema>;

interface ModalFormProps {
  initialValues?: Partial<CreateModalInput>;
  onSubmit: (values: CreateModalInput) => void;
  isPending: boolean;
  error?: string;
  success?: string;
}

export const ModalForm: React.FC<ModalFormProps> = ({
  initialValues = {},
  onSubmit,
  isPending,
  error,
  success,
}) => {
  const [editorContent, setEditorContent] = useState(
    initialValues.content || ''
  );

  const form = useForm<CreateModalInput>({
    resolver: zodResolver(createModalSchema),
    defaultValues: { ...initialValues, content: editorContent },
  });

  const handleSubmit = (values: CreateModalInput) => {
    onSubmit(values);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">
          {initialValues ? 'Modifier le modal' : 'Créer un modal'}
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="space-y-6"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <div className="space-y-4">
              {/* Champ Titre */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{'Titre du modal :'} </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Titre du modal"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.title?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* Champ Contenu */}
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{'Contenu du modal :'} </FormLabel>
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

              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{'Date de début :'} </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="date"
                        disabled={isPending}
                        min={new Date().toISOString().split('T')[0]} // Date minimale
                        value={
                          field.value
                            ? new Date(field.value).toISOString().split('T')[0]
                            : ''
                        } // Convertir en string
                        onChange={(e) =>
                          field.onChange(new Date(e.target.value))
                        } // Reconvertir en Date pour zod
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.startDate?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{'Date de fin :'} </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="date"
                        disabled={isPending}
                        min={
                          form.watch('startDate')
                            ? new Date(form.watch('startDate'))
                                .toISOString()
                                .split('T')[0]
                            : new Date().toISOString().split('T')[0]
                        } // Date minimale basée sur startDate
                        value={
                          field.value
                            ? new Date(field.value).toISOString().split('T')[0]
                            : ''
                        } // Convertir en string
                        onChange={(e) =>
                          field.onChange(new Date(e.target.value))
                        } // Reconvertir en Date pour zod
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.endDate?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>

            {/* Messages d'erreur et succès */}
            <FormError message={error} />
            <FormSuccess message={success} />

            {/* Bouton de soumission */}
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
