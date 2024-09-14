import { useState, useEffect } from 'react';

export const useIsSmallScreen = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1024); // Taille du breakpoint `lg` en Tailwind
    };

    checkScreenSize(); // Vérifie la taille au chargement

    window.addEventListener('resize', checkScreenSize); // Écoute les changements de taille

    return () => window.removeEventListener('resize', checkScreenSize); // Nettoyage
  }, []);

  return isSmallScreen;
};
