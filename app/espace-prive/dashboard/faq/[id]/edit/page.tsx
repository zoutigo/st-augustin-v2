import { getAllFaqCategories } from "@/actions/faq/categories";
import { getAllFaqs } from "@/actions/faq/faqs";
import { FaqFormWrapper } from "@/components/dashboard/faq/faq-form-wrapper";
import { BackButton } from "@/components/dashboard/back-button";
import { redirect } from "next/navigation";

const EditFaqPage = async ({ params }: { params: { id: string } }) => {
  const [categories, faqs] = await Promise.all([
    getAllFaqCategories(),
    getAllFaqs(),
  ]);
  const faq = faqs.find((f) => f.id === params.id);
  if (!faq) {
    redirect("/espace-prive/dashboard/faq");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-secondary">Modifier la FAQ</h1>
        <BackButton href="/espace-prive/dashboard/faq" />
      </div>
      <FaqFormWrapper
        mode="edit"
        faqId={faq!.id}
        categories={categories}
        defaultValues={{
          question: faq!.question,
          answer: faq!.answer,
          categoryId: faq!.categoryId,
          isFeatured: faq!.isFeatured,
        }}
      />
    </div>
  );
};

export default EditFaqPage;
