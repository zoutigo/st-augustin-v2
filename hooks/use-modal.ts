import { syncModalStore, useModalStore } from '@/stores/modal-store';
import { useEffect } from 'react';

export const useModal = () => {
  const { viewCount, canDisplayModal, incrementViewCount, resetViewCount } =
    useModalStore();

  useEffect(() => {
    syncModalStore(); // Synchroniser avec le localStorage au premier chargement
  }, []);

  return {
    viewCount,
    canDisplayModal,
    incrementViewCount,
    resetViewCount,
  };
};
