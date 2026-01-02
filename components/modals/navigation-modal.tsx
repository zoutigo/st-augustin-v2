"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useIsSmallScreen } from "@/hooks/use-is-small-screen";
import { useAppStore } from "@/lib/store";
import { NavRoutes } from "@/routes";
import { DialogDescription } from "@radix-ui/react-dialog";
import { ModalNavBloc } from "../navbar/modal-nav-bloc";
import { Button } from "../ui/button";
import { Compass } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";
import { funProverbs } from "@/lib/data/proverbs";
import { cn } from "@/lib/utils";

const NavigationModal = () => {
  const { isMenuOpen, closeMenu } = useAppStore(); // Utilisez le store pour contrôler la modale
  const isSmallScreen = useIsSmallScreen(); // Vérifie si l'écran est petit
  const contentRef = useRef<HTMLDivElement>(null);
  const proverb = useMemo(() => {
    const index = Math.floor(Math.random() * funProverbs.length);
    return isMenuOpen ? (funProverbs[index] ?? funProverbs[0]) : funProverbs[0];
  }, [isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      const resetScroll = () => {
        const el = contentRef.current;
        if (!el) return;
        if (typeof el.scrollTo === "function") {
          el.scrollTo({ top: 0 });
        } else {
          el.scrollTop = 0;
        }
      };
      // assure l'affichage depuis le haut de la modale (si rendu async)
      requestAnimationFrame(resetScroll);
      setTimeout(resetScroll, 0);
    }
  }, [isMenuOpen]);

  // Ne pas rendre le composant si l'écran est plus grand que 'lg'
  if (!isSmallScreen) return null;

  return (
    <Dialog open={isMenuOpen} onOpenChange={closeMenu}>
      <DialogContent
        className={`
            !top-0 left-0 !translate-x-0 !translate-y-0 p-0 m-0 !h-full !w-full bg-gradient-to-b from-white via-primary/10 to-secondary/10 flex flex-col
            transition-transform duration-300 max-w-[100vw]
             overflow-auto max-h-[100vh]
             pt-6
          `}
        ref={contentRef}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-12 top-6 h-36 w-36 rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute right-4 bottom-10 h-44 w-44 rounded-full bg-secondary/25 blur-3xl" />
        </div>
        <DialogHeader className="p-6 pb-4 relative">
          <div className="flex items-center justify-center gap-3">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md border border-secondary/10">
              <Compass className="h-6 w-6 text-secondary" />
            </span>
            <div className="text-center">
              <DialogTitle className="text-xl font-bold text-secondary">
                Je suis le navigateur
              </DialogTitle>
              <DialogDescription className="text-secondary/70 text-sm">
                Où souhaitez-vous aller ? Je vous guide avec plaisir.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="relative flex-grow pb-6">
          <div className="landing-container mx-auto space-y-3">
            {NavRoutes.map((route) => (
              <ModalNavBloc key={route.slug} route={route} />
            ))}
            <Button
              variant={"destructive"}
              onClick={closeMenu}
              className="w-full uppercase tracking-[0.25em] font-semibold rounded-xl shadow-md py-3 mt-4 bg-secondary-dark text-secondary-foreground hover:bg-secondary/80 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-secondary border border-secondary/30"
            >
              Fermer la navigation
            </Button>
            <div
              className="mt-4 rounded-2xl bg-gradient-to-r from-primary/10 via-white to-secondary/15 border border-secondary/20 shadow-sm p-4 flex items-start gap-3"
              data-testid="navigation-proverb"
            >
              <span className="text-3xl" aria-hidden>
                ✨
              </span>
              <div>
                <p
                  className={cn(
                    "text-xs font-semibold uppercase text-secondary/70 tracking-[0.2em]",
                  )}
                >
                  Proverbe de la cour
                </p>
                <p
                  className="text-base font-medium text-secondary mt-1 leading-relaxed"
                  data-testid="navigation-proverb-text"
                >
                  {proverb}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NavigationModal;
