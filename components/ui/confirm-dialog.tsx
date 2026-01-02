"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";

interface ConfirmDialogProps {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void | Promise<void>;
  children: React.ReactNode; // trigger
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  title = "Confirmation",
  description = "Êtes-vous sûr de vouloir continuer ?",
  confirmText = "Confirmer",
  cancelText = "Annuler",
  onConfirm,
  children,
}) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await onConfirm();
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="border-0 bg-gradient-to-br from-white via-slate-50 to-slate-100 shadow-2xl sm:rounded-2xl px-8 py-7">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="relative inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600 shadow-inner">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-50/80 via-red-100/40 to-transparent blur" />
            <ShieldAlert className="h-8 w-8 relative z-10" />
          </div>
          <DialogHeader className="space-y-2">
            <DialogTitle className="text-2xl font-semibold text-secondary">
              {title}
            </DialogTitle>
            <DialogDescription className="text-base text-muted-foreground leading-relaxed">
              {description}
            </DialogDescription>
          </DialogHeader>
        </div>
        <DialogFooter className="gap-3">
          <Button
            variant="ghost"
            className="min-w-[130px] rounded-full bg-white text-secondary shadow-sm hover:shadow-md"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            {cancelText}
          </Button>
          <Button
            variant="destructive"
            className="min-w-[150px] rounded-full shadow-md hover:shadow-lg bg-gradient-to-r from-red-500 to-rose-500 text-white"
            onClick={handleConfirm}
            disabled={loading}
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
