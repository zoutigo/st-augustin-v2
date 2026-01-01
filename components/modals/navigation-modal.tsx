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

const NavigationModal = () => {
  const { isMenuOpen, closeMenu } = useAppStore(); // Utilisez le store pour contrôler la modale
  const isSmallScreen = useIsSmallScreen(); // Vérifie si l'écran est petit

  // Ne pas rendre le composant si l'écran est plus grand que 'lg'
  if (!isSmallScreen) return null;

  return (
    <Dialog open={isMenuOpen} onOpenChange={closeMenu}>
      <DialogContent
        className={`
            !top-0  p-0 m-0 !h-full !w-full bg-white flex flex-col
            transition-transform duration-300 max-w-[90vw]
             overflow-auto max-h-[90vh]
            ${isMenuOpen ? "translate-y-0" : "translate-y-full"}
          `}
      >
        <DialogHeader className="p-4">
          <DialogTitle className="text-center uppercase items-center">
            Je suis le navigateur !!!
          </DialogTitle>
          <DialogDescription className="text-secondary-ligth text-sm items-center">
            Où souhaitez vous allez ? Je me ferais un plaisir de vous y conduire
          </DialogDescription>
        </DialogHeader>
        <div className="flex-grow p-4 bg-slate-50 border-secondary-light  border-y">
          {NavRoutes.map((route) => (
            <ModalNavBloc key={route.slug} route={route} />
          ))}
          <Button
            variant={"default"}
            onClick={closeMenu}
            className="w-full bg-red-400 text-secondary uppercase tracking-widest font-cursive 
             py-3 px-6 md:py-4 md:px-8 lg:py-5 lg:px-10 
             text-lg md:text-xl lg:text-2xl 
             mt-4 md:mt-6 lg:mt-8"
          >
            <span className="uppercase text-lg md:text-xl lg:text-2xl">
              Fermer la navigation
            </span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NavigationModal;
