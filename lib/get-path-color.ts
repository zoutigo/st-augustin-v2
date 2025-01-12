export const getPathColor = (pathname: string): string => {
  // Déterminez la couleur en fonction du pathname

  switch (true) {
    case pathname.includes('/ecole'):
      return 'ecole';
    case pathname.includes('/blog'):
      return 'blog';
    case pathname.includes('/espace-prive'):
      return 'espaceprive';
    case pathname.includes('/classes'):
      return 'classes';
    case pathname.includes('/vie-scolaire'):
      return 'viescolaire';
    default:
      return 'primary';
  }
};
