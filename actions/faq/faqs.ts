"use server";

import { db } from "@/lib/db";
import { z } from "zod";
import { createFaqSchema, updateFaqSchema } from "@/schemas";

export const getAllFaqs = async () => {
  return db.fAQ.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
};

export const createFaq = async (values: z.infer<typeof createFaqSchema>) => {
  const parsed = createFaqSchema.safeParse(values);
  if (!parsed.success) return { error: "Champs invalides" };
  try {
    await db.fAQ.create({
      data: { ...parsed.data, isFeatured: parsed.data.isFeatured ?? false },
    });
    return { success: "FAQ créée" };
  } catch (error) {
    return { error: "Impossible de créer la FAQ" };
  }
};

export const updateFaq = async (
  id: string,
  values: z.infer<typeof updateFaqSchema>,
) => {
  const parsed = updateFaqSchema.safeParse(values);
  if (!parsed.success) return { error: "Champs invalides" };
  try {
    await db.fAQ.update({
      where: { id },
      data: { ...parsed.data, isFeatured: parsed.data.isFeatured ?? false },
    });
    return { success: "FAQ mise à jour" };
  } catch (error) {
    return { error: "Impossible de mettre à jour la FAQ" };
  }
};

export const deleteFaq = async (id: string) => {
  try {
    await db.fAQ.delete({ where: { id } });
    return { success: "FAQ supprimée" };
  } catch (error) {
    return { error: "Suppression impossible" };
  }
};
