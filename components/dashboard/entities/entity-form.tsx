"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createEntitySchema } from "@/schemas";
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

// Définir les types basés sur le schéma Zod
type CreateEntityInput = z.infer<typeof createEntitySchema>;

interface EntityFormProps {
  initialValues?: Partial<CreateEntityInput>;
  onSubmit: (values: CreateEntityInput) => void;
  isPending: boolean;
  error?: string;
  success?: string;
  mode?: "create" | "edit";
}

export const EntityForm: React.FC<EntityFormProps> = ({
  initialValues = {},
  onSubmit,
  isPending,
  error,
  success,
  mode = "create",
}) => {
  const [editorContent, setEditorContent] = useState(
    initialValues.description || "",
  );
  const form = useForm<CreateEntityInput>({
    resolver: zodResolver(createEntitySchema),
    defaultValues: { ...initialValues, description: editorContent },
  });

  const handleSubmit = (values: CreateEntityInput) => {
    onSubmit(values);
  };

  return (
    <Card className="w-full border-slate-200 shadow-sm">
      <CardHeader className="space-y-2">
        <p className="text-[11px] uppercase tracking-[0.35em] text-muted-foreground text-center">
          {mode === "create" ? "Nouvelle entité" : "Édition"}
        </p>
        {mode === "create" && (
          <p className="text-2xl font-semibold text-secondary text-center">
            {initialValues.name || "Créer une entité"}
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
                      {"Nom de l'entité"}
                    </FormLabel>
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
                    <FormLabel className="text-sm font-semibold text-secondary/80 uppercase tracking-wide">
                      {"Slug de l'entité"}
                    </FormLabel>
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
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-secondary/80 uppercase tracking-wide">
                    {"Description de l'entité"}
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
                    {form.formState.errors.description?.message}
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
