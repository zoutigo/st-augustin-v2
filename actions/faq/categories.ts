"use server";

import { db } from "@/lib/db";
import { z } from "zod";
import { createFaqCategorySchema, updateFaqCategorySchema } from "@/schemas";

export const getAllFaqCategories = async () => {
  return db.fAQCategory.findMany({
    orderBy: { createdAt: "desc" },
  });
};

export const createFaqCategory = async (
  values: z.infer<typeof createFaqCategorySchema>,
) => {
  const parsed = createFaqCategorySchema.safeParse(values);
  if (!parsed.success) {
    return { error: "Champs invalides" };
  }
  const { name, slug } = parsed.data;
  try {
    await db.fAQCategory.create({ data: { name, slug } });
    return { success: "Catégorie créée" };
  } catch (error) {
    return { error: "Impossible de créer la catégorie" };
  }
};

export const updateFaqCategory = async (
  id: string,
  values: z.infer<typeof updateFaqCategorySchema>,
) => {
  const parsed = updateFaqCategorySchema.safeParse(values);
  if (!parsed.success) return { error: "Champs invalides" };
  try {
    await db.fAQCategory.update({ where: { id }, data: parsed.data });
    return { success: "Catégorie mise à jour" };
  } catch (error) {
    return { error: "Mise à jour impossible" };
  }
};

export const deleteFaqCategory = async (id: string) => {
  try {
    await db.fAQCategory.delete({ where: { id } });
    return { success: "Catégorie supprimée" };
  } catch (error) {
    return { error: "Suppression impossible" };
  }
};
