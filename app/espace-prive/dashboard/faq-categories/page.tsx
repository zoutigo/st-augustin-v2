import { getAllFaqCategories } from "@/actions/faq/categories";
import { FaqCategoriesBoard } from "@/components/dashboard/faq/faq-categories-board";

const FaqCategoriesPage = async () => {
  const categories = await getAllFaqCategories();
  const safeCategories = categories.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
  }));

  return <FaqCategoriesBoard categories={safeCategories} />;
};

export default FaqCategoriesPage;
