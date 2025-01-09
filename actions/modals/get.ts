'use server';

import { db } from '@/lib/db';
import { Modal } from '@prisma/client';

export const getModalById = async (
  modalId: string
): Promise<Modal | { error: string }> => {
  if (!modalId) {
    return { error: 'Veillez indiquer le numéro du modal ' };
  }
  try {
    const modal = await db.modal.findUnique({
      where: {
        id: modalId,
      },
    });
    if (!modal) {
      return { error: 'Modal not found' };
    }
    return modal;
  } catch (error) {
    return { error: 'Failed to fetch page' };
  }
};

export const getAllModals = async (): Promise<Modal[] | { error: string }> => {
  try {
    const modals = await db.modal.findMany();
    return modals;
  } catch (error) {
    return { error: 'Failed to fetch posts' };
  }
};
