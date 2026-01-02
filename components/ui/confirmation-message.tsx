import { toast } from "sonner";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import React from "react";

type ConfirmationVariant = "success" | "error";

const baseOptions = {
  duration: 3500,
  className: "rounded-xl shadow-lg text-secondary",
};

const renderIcon = (variant: ConfirmationVariant) =>
  variant === "success" ? (
    <CheckCircle2 className="h-5 w-5 text-green-600" />
  ) : (
    <AlertTriangle className="h-5 w-5 text-red-600" />
  );

const show = (
  variant: ConfirmationVariant,
  title: string,
  description?: string,
) => {
  const icon = renderIcon(variant);
  const background =
    variant === "success"
      ? "bg-gradient-to-r from-emerald-50 via-white to-emerald-50"
      : "bg-gradient-to-r from-rose-50 via-white to-rose-50";

  const fn = variant === "success" ? toast.success : toast.error;
  fn(title, {
    ...baseOptions,
    description,
    classNames: { toast: background },
    icon,
  });
};

export const confirmationMessage = {
  success: (title: string, description?: string) =>
    show("success", title, description),
  error: (title: string, description?: string) =>
    show("error", title, description),
};

export type ConfirmationMessage = typeof confirmationMessage;
