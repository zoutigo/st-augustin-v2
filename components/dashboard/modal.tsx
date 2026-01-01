// dashboard/components/Modal.tsx
"use client";

import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"; // Assure-toi que ce chemin est correct

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string; // Ajout d'un prop pour le titre
  description?: string; // Ajout d'un prop optionnel pour la description
}

const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  description,
}: ModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger className="hidden">Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
          <button onClick={onClose} className="absolute top-2 right-2">
            Fermer
          </button>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
