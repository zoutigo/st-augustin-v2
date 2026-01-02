"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createFaqCategorySchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface Props {
  defaultValues?: z.infer<typeof createFaqCategorySchema>;
  onSubmit: (
    values: z.infer<typeof createFaqCategorySchema>,
  ) => Promise<void> | void;
  submitLabel?: string;
  loading?: boolean;
}

export const FaqCategoryForm = ({
  defaultValues,
  onSubmit,
  submitLabel = "Ajouter",
  loading,
}: Props) => {
  const form = useForm<z.infer<typeof createFaqCategorySchema>>({
    resolver: zodResolver(createFaqCategorySchema),
    defaultValues: defaultValues || { name: "", slug: "" },
    mode: "onChange",
  });

  const handleSubmit = (values: z.infer<typeof createFaqCategorySchema>) => {
    return onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">Nom</FormLabel>
              <Input className="text-base h-11" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">Slug</FormLabel>
              <Input className="text-base h-11" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="text-secondary text-base px-5 py-2.5"
          disabled={
            loading ||
            form.formState.isSubmitting ||
            Object.keys(form.formState.errors || {}).length > 0
          }
        >
          {submitLabel}
        </Button>
      </form>
    </Form>
  );
};
