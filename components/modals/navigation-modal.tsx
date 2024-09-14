'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useIsSmallScreen } from '@/hooks/use-is-small-screen';
import { useAppStore } from '@/lib/store';

const NavigationModal = () => {
  const { isMenuOpen, closeMenu } = useAppStore(); // Utilisez le store pour contrôler la modale
  const isSmallScreen = useIsSmallScreen(); // Vérifie si l'écran est petit

  // Ne pas rendre le composant si l'écran est plus grand que 'lg'
  if (!isSmallScreen) return null;

  return (
    <Dialog open={isMenuOpen} onOpenChange={closeMenu}>
      <DialogContent
        className="h-full w-full p-0 m-0 bg-white flex flex-col
            transition-transform duration-300 "
      >
        <DialogHeader className="p-4">
          <DialogTitle>Navigation Window </DialogTitle>
        </DialogHeader>
        <div className="flex-grow p-4">
          {/* Ajoutez ici vos liens de navigation */}
          <button onClick={closeMenu}>Fermer la navigation</button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NavigationModal;
