import React from 'react';
import { Button } from '@/components/ui/button';

interface ToggleButtonProps {
  children: React.ReactNode; // Contenu du bouton
  isActive: boolean; // État actif/inactif
  onToggle: () => void; // Fonction de bascule
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  children,
  isActive,
  onToggle,
}) => {
  return (
    <Button
      type="button"
      variant="ghost"
      className="p-0 text-sm text-gray-700 hover:text-gray-900 border-none shadow-none focus:ring-0"
      style={{
        background: isActive ? 'silver' : 'transparent',
        borderRadius: '0',
        transition: 'background-color 0.3s ease',
      }}
      onClick={(event) => {
        event.preventDefault(); // Empêche le comportement par défaut
        event.stopPropagation(); // Empêche la propagation du clic
        onToggle();
      }}
    >
      {children}
    </Button>
  );
};
