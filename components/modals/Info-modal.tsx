"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { getModalToDisplay } from "@/actions/modals/get";
import PageContent from "../tiptap/page-content";
import { useModal } from "@/hooks/use-modal";

// Typage des modales
interface Modal {
  id: string;
  title: string;
  content: string;
  startDate: string;
  endDate: string;
}

export const ModalInfo = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const { canDisplayModal, incrementViewCount } = useModal();

  const {
    data: latestModal,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["modalToDisplay"],
    queryFn: async () => {
      const modal = await getModalToDisplay();
      console.log("useQuery - Modal fetched:", modal);
      return modal;
    },
  });

  const closeMenu = () => {
    setIsMenuOpen(false);
    incrementViewCount();
  };

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  // Ouvrir automatiquement la modale si les données sont chargées
  useEffect(() => {
    if (!isLoading && latestModal) {
      setIsMenuOpen(true);
    }
  }, [isLoading, latestModal]);

  if (isLoading || !latestModal || !canDisplayModal) {
    return null;
  }

  return (
    <Dialog open={isMenuOpen} onOpenChange={closeMenu}>
      <div className="fixed inset-0 flex items-center justify-center h-screen">
        <DialogContent
          className={`
              p-0 m-0 w-full bg-white flex flex-col
              transition-transform duration-300 max-w-[90vw] lg:max-w-[50vw]
              min-h-[40vh] max-h-[90vh] overflow-auto
            `}
        >
          <DialogHeader className="p-4">
            <DialogTitle className="text-center uppercase items-center">
              {latestModal.title}
            </DialogTitle>
          </DialogHeader>

          <div className="p-4 bg-slate-50 border-secondary-light border-y">
            <PageContent content={latestModal.content} />
          </div>

          <DialogFooter className="p-4">
            <Button
              variant="destructive"
              onClick={closeMenu}
              className="w-full"
            >
              <span className="uppercase text-2xl">Fermer</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </div>
    </Dialog>
  );
};
