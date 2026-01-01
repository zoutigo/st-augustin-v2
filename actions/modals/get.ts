"use server";

import { db } from "@/lib/db";
import { Modal } from "@prisma/client";

export const getModalById = async (
  modalId: string,
): Promise<Modal | { error: string }> => {
  if (!modalId) {
    return { error: "Veillez indiquer le numéro du modal " };
  }
  try {
    const modal = await db.modal.findUnique({
      where: {
        id: modalId,
      },
    });
    if (!modal) {
      return { error: "Modal not found" };
    }
    return modal;
  } catch (error) {
    return { error: "Failed to fetch page" };
  }
};

export const getAllModals = async (): Promise<Modal[] | { error: string }> => {
  try {
    const modals = await db.modal.findMany({ orderBy: { createdAt: "desc" } });
    return modals;
  } catch (error) {
    return { error: "Failed to fetch posts" };
  }
};

export const getModalToDisplay = async () => {
  try {
    const currentDate = new Date();

    const modals = await db.modal.findMany({
      where: {
        endDate: {
          gte: currentDate, // Filtre pour inclure uniquement les modales avec une date de fin future
        },
      },
      orderBy: {
        startDate: "desc", // Trie par date de début décroissante
      },
    });

    if (modals.length > 0) {
      return modals[0]; // Retourne la modale la plus récente
    }

    return null; // Retourne null si aucune modale n'est disponible
  } catch (error) {
    console.error("Error fetching modals:", error);
    throw new Error("Failed to fetch modals.");
  }
};
