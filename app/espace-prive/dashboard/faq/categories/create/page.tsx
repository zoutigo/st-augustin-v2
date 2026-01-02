import { createFaqCategory } from "@/actions/faq/categories";
import { FaqCategoryForm } from "@/components/dashboard/faq/faq-category-form";
import { z } from "zod";
import { createFaqCategorySchema } from "@/schemas";
import { redirect } from "next/navigation";

const CreateFaqCategoryPage = () => {
  const handleSubmit = async (
    values: z.infer<typeof createFaqCategorySchema>,
  ) => {
    "use server";
    await createFaqCategory(values);
    redirect("/espace-prive/dashboard/faq/categories");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-secondary">
        Ajouter une catégorie de FAQ
      </h1>
      <FaqCategoryForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateFaqCategoryPage;
