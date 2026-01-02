import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Eye, Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import React from "react";

type ActionType = "add" | "edit" | "view" | "delete";

const iconByType: Record<ActionType, React.ReactNode> = {
  add: <Plus className="h-4 w-4" />,
  edit: <Pencil className="h-4 w-4" />,
  view: <Eye className="h-4 w-4" />,
  delete: <Trash2 className="h-4 w-4" />,
};

const styleByType: Record<ActionType, string> = {
  add: "bg-primary text-secondary hover:bg-primary/90",
  edit: "bg-blue-600 text-white hover:bg-blue-500",
  view: "bg-slate-200 text-slate-800 hover:bg-slate-300",
  delete:
    "bg-red-500 text-white hover:bg-red-600 border border-red-500 focus-visible:ring-red-500",
};

interface ActionIconButtonProps {
  type: ActionType;
  href?: string;
  onClick?: () => void | Promise<void>;
  "aria-label": string;
}

export const ActionIconButton = React.forwardRef<
  HTMLButtonElement,
  ActionIconButtonProps
>(({ type, href, onClick, "aria-label": ariaLabel }, ref) => {
  const classes = cn(
    "rounded-full shadow-sm transition-colors duration-200",
    styleByType[type],
  );

  if (href) {
    return (
      <Button
        ref={ref}
        type="button"
        size="icon"
        aria-label={ariaLabel}
        className={classes}
        asChild
      >
        <Link href={href} aria-label={ariaLabel}>
          {iconByType[type]}
        </Link>
      </Button>
    );
  }

  return (
    <Button
      ref={ref}
      type="button"
      size="icon"
      aria-label={ariaLabel}
      className={classes}
      onClick={onClick}
    >
      {iconByType[type]}
    </Button>
  );
});

ActionIconButton.displayName = "ActionIconButton";
