"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createPageSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { TiptapEditor } from "@/components/tiptap/tiptap";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

// Définir les types basés sur le schéma Zod
type CreatePageInput = z.infer<typeof createPageSchema>;

interface PageFormProps {
  initialValues?: Partial<CreatePageInput>;
  onSubmit: (values: CreatePageInput) => void;
  isPending: boolean;
  error?: string;
  success?: string;
  mode?: "create" | "edit";
}

export const PageForm: React.FC<PageFormProps> = ({
  initialValues = {},
  onSubmit,
  isPending,
  error,
  success,
  mode = "create",
}) => {
  const [editorContent, setEditorContent] = useState(
    initialValues.content || "",
  );

  const form = useForm<CreatePageInput>({
    resolver: zodResolver(createPageSchema),
    defaultValues: {
      ...initialValues,
      content: editorContent,
      release: initialValues.release ?? false,
    },
  });

  const handleSubmit = (values: CreatePageInput) => {
    onSubmit(values);
  };

  return (
    <Card className="w-full border-slate-200 shadow-sm">
      <CardHeader className="space-y-2">
        <p className="text-[11px] uppercase tracking-[0.35em] text-muted-foreground text-center">
          {mode === "create" ? "Nouvelle page" : "Édition"}
        </p>
        {mode === "create" && (
          <p className="text-2xl font-semibold text-secondary text-center">
            {initialValues.name || "Créer une page"}
          </p>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form
            className="space-y-6"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-secondary/80 uppercase tracking-wide">
                      Nom de la page
                    </FormLabel>
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
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-secondary/80 uppercase tracking-wide">
                      Slug
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Slug de la page"
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
                name="release"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-sm font-semibold text-secondary/80 uppercase tracking-wide">
                      Statut
                    </FormLabel>
                    <div className="flex items-center gap-3">
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        aria-label="Publié"
                      />
                      <span className="text-sm text-muted-foreground">
                        {field.value ? "Publié" : "Brouillon"}
                      </span>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-secondary/80 uppercase tracking-wide">
                    Contenu de la page
                  </FormLabel>
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

            <FormError message={error} />
            <FormSuccess message={success} />
            <Button
              type="submit"
              disabled={isPending}
              className="text-secondary text-base px-6 py-2.5 rounded-full"
            >
              {isPending
                ? "En cours..."
                : mode === "create"
                  ? "Créer"
                  : "Mettre à jour"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
