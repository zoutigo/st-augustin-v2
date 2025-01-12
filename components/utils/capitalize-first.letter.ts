export const capitalizeFirstLetter = (text: string): string => {
  if (!text) return ''; // Vérifie si le texte est vide ou undefined
  return text.charAt(0).toUpperCase() + text.slice(1);
};
