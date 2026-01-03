"use server";

import { db } from "@/lib/db";
import { infoSiteSchema } from "@/schemas";
import { z } from "zod";

export const upsertInfoSite = async (
  values: z.infer<typeof infoSiteSchema>,
) => {
  const parsed = infoSiteSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "Champs invalides" };
  }

  try {
    const existing = await db.infoSite.findFirst();
    if (existing) {
      await db.infoSite.update({
        where: { id: existing.id },
        data: parsed.data,
      });
      return { success: "Informations mises à jour" };
    }

    await db.infoSite.create({ data: parsed.data });
    return { success: "Informations enregistrées" };
  } catch (error) {
    console.error("Erreur upsert InfoSite", error);
    return { error: "Erreur serveur" };
  }
};
