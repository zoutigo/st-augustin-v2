import { create } from "zustand";

interface ModalStoreState {
  viewCount: number;
  canDisplayModal: boolean;
  incrementViewCount: () => void;
  resetViewCount: () => void;
}

export const useModalStore = create<ModalStoreState>((set) => ({
  viewCount: 0,
  canDisplayModal: true,
  incrementViewCount: () =>
    set((state) => {
      const newCount = state.viewCount + 1;
      localStorage.setItem("modalViewCount", newCount.toString());
      return { viewCount: newCount, canDisplayModal: newCount < 2 };
    }),
  resetViewCount: () => {
    localStorage.removeItem("modalViewCount");
    set({ viewCount: 0, canDisplayModal: true });
  },
}));

export const syncModalStore = () => {
  const storedCount = localStorage.getItem("modalViewCount");
  const viewCount = storedCount ? parseInt(storedCount, 10) : 0;
  useModalStore.setState({
    viewCount,
    canDisplayModal: viewCount < 2,
  });
};
