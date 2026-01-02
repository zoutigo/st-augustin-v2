"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const BackButton = ({ href }: { href?: string }) => {
  const router = useRouter();
  return (
    <Button
      type="button"
      variant="ghost"
      className="gap-2 rounded-full shadow-sm"
      onClick={() => (href ? router.push(href) : router.back())}
    >
      <ArrowLeft className="h-4 w-4" />
      Retour
    </Button>
  );
};
