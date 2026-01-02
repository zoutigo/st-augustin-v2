import { getAllFaqCategories } from "@/actions/faq/categories";
import { FaqFormWrapper } from "@/components/dashboard/faq/faq-form-wrapper";
import { BackButton } from "@/components/dashboard/back-button";

const CreateFaqPage = async () => {
  const categories = await getAllFaqCategories();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-secondary">Ajouter une FAQ</h1>
        <BackButton href="/espace-prive/dashboard/faq" />
      </div>
      <FaqFormWrapper mode="create" categories={categories} />
    </div>
  );
};

export default CreateFaqPage;
