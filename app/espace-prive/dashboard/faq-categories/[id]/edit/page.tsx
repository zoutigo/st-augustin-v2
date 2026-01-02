import { getAllFaqCategories } from "@/actions/faq/categories";
import { FaqCategoryFormWrapper } from "@/components/dashboard/faq/faq-category-form-wrapper";
import { BackButton } from "@/components/dashboard/back-button";
import { redirect } from "next/navigation";

const EditFaqCategoryPage = async ({ params }: { params: { id: string } }) => {
  const categories = await getAllFaqCategories();
  const category = categories.find((c) => c.id === params.id);

  if (!category) {
    redirect("/espace-prive/dashboard/faq-categories");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-secondary">
          Modifier la catégorie
        </h1>
        <BackButton href="/espace-prive/dashboard/faq-categories" />
      </div>
      <FaqCategoryFormWrapper
        mode="edit"
        categoryId={category!.id}
        defaultValues={{ name: category!.name, slug: category!.slug }}
      />
    </div>
  );
};

export default EditFaqCategoryPage;
