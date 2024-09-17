import config from '../tailwind.config'; // Ajustez le chemin selon votre structure de projet

// types/colors.d.ts (ou un autre fichier de déclaration de types)
// types/colors.d.ts
// types/colors.d.ts
// types/colors.d.ts
export type ColorGroup = {
  DEFAULT: string;
  foreground?: string;
  light?: string;
  dark?: string;
};

export type TailwindColors = {
  border: string;
  input: string;
  ring: string;
  background: string;
  foreground: string;
  primary: ColorGroup;
  secondary: ColorGroup;
  destructive: ColorGroup;
  muted: ColorGroup;
  accent: ColorGroup;
  popover: ColorGroup;
  card: ColorGroup;
  ecole: ColorGroup;
  viescolaire: ColorGroup;
  classes: ColorGroup;
  infos: ColorGroup;
  apelogec: ColorGroup;
  private: ColorGroup;
  [key: string]: ColorGroup | string; // Signature d'index pour les clés dynamiques
};

// border: string; input: string; ring: string; background: string; foreground: string; primary: { DEFAULT: string; foreground: string; dark: string; light: string; }; secondary:

const colors: TailwindColors = config.theme.extend.colors;

// Fonction pour obtenir la couleur par nom
export const getColorByName = (colorName: keyof TailwindColors): string => {
  const color = colors[colorName];
  if (!color) {
    throw new Error(`Couleur avec le nom "${colorName}" non trouvée.`);
  }
  return typeof color === 'string' ? color : color.DEFAULT; // Retourner la couleur par défaut si c'est un objet
};
