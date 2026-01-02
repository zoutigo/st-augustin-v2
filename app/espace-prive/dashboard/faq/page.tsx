import React from "react";
import { getAllFaqs } from "@/actions/faq/faqs";
import { getAllFaqCategories } from "@/actions/faq/categories";
import { FaqLists } from "@/components/dashboard/faq/faq-lists";

const FaqDashboardPage = async () => {
  const [faqs, categories] = await Promise.all([
    getAllFaqs(),
    getAllFaqCategories(),
  ]);

  const safeFaqs = faqs.map((f) => ({
    id: f.id,
    question: f.question,
    answer: f.answer,
    categoryId: f.categoryId,
    categoryName: f.category?.name || "",
    isFeatured: f.isFeatured,
  }));

  const safeCategories = categories.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
  }));

  return <FaqLists faqs={safeFaqs} categories={safeCategories} />;
};

export default FaqDashboardPage;
