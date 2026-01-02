import {
  getAllFaqCategories,
  updateFaqCategory,
} from "@/actions/faq/categories";
import { FaqCategoryForm } from "@/components/dashboard/faq/faq-category-form";
import { createFaqCategorySchema } from "@/schemas";
import { z } from "zod";
import { redirect } from "next/navigation";

const EditFaqCategoryPage = async ({ params }: { params: { id: string } }) => {
  const categories = await getAllFaqCategories();
  const category = categories.find((c) => c.id === params.id);
  if (!category) {
    redirect("/espace-prive/dashboard/faq/categories");
  }

  const handleSubmit = async (
    values: z.infer<typeof createFaqCategorySchema>,
  ) => {
    "use server";
    await updateFaqCategory(params.id, values);
    redirect("/espace-prive/dashboard/faq/categories");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-secondary">
        Modifier la catégorie
      </h1>
      <FaqCategoryForm
        defaultValues={{ name: category!.name, slug: category!.slug }}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default EditFaqCategoryPage;
