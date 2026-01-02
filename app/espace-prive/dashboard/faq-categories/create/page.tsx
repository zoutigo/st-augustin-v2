import { FaqCategoryFormWrapper } from "@/components/dashboard/faq/faq-category-form-wrapper";
import { BackButton } from "@/components/dashboard/back-button";

const CreateFaqCategoryPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-secondary">
          Ajouter une catégorie de FAQ
        </h1>
        <BackButton href="/espace-prive/dashboard/faq-categories" />
      </div>
      <FaqCategoryFormWrapper mode="create" />
    </div>
  );
};

export default CreateFaqCategoryPage;
