'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createPageSchema } from '@/schemas';
import { createPage } from '@/actions/pages/create-page';
import { RichTextEditor } from '@/components/forms/text-editor';
import { Button } from '@/components/ui/button';
import { useState, useTransition } from 'react';
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
import { useRouter } from 'next/navigation';

// Définir les types basés sur le schéma Zod
type CreatePageInput = z.infer<typeof createPageSchema>;

export const PageForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const router = useRouter();

  const form = useForm<CreatePageInput>({
    resolver: zodResolver(createPageSchema),
  });

  const onSubmit = (values: CreatePageInput) => {
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

  // Mettre à jour le contenu du champ 'content' avec les données de l'éditeur
  const handleEditorChange = (content: string) => {
    form.setValue('content', content); // Utiliser form.setValue
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">{'Créer une page'}</p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom de la page :</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Nom de la page"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.name?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* Ajout du champ pour l'éditeur de texte */}
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contenu de la page :</FormLabel>
                    <FormControl>
                      <RichTextEditor
                        initialContent={field.value}
                        onChange={field.onChange}
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

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? 'En cours...' : 'Créer la page'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
