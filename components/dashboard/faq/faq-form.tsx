"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createFaqSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  defaultValues?: z.infer<typeof createFaqSchema>;
  categories: { id: string; name: string }[];
  onSubmit: (values: z.infer<typeof createFaqSchema>) => Promise<void> | void;
}

export const FaqForm = ({ defaultValues, categories, onSubmit }: Props) => {
  const form = useForm<z.infer<typeof createFaqSchema>>({
    resolver: zodResolver(createFaqSchema),
    defaultValues: defaultValues || {
      question: "",
      answer: "",
      categoryId: categories[0]?.id || "",
      isFeatured: false,
    },
  });

  const handleSubmit = (values: z.infer<typeof createFaqSchema>) =>
    onSubmit(values);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">Question</FormLabel>
              <Input className="text-base h-11" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="answer"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">Réponse</FormLabel>
              <Textarea
                rows={4}
                className="text-base leading-relaxed"
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isFeatured"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <FormLabel className="mb-0 text-base font-medium">
                Mettre en avant
              </FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">Catégorie</FormLabel>
              <select
                {...field}
                className="w-full rounded-md border border-input bg-background px-4 py-3 text-base"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="text-secondary text-base px-5 py-2.5">
          Enregistrer
        </Button>
      </form>
    </Form>
  );
};
