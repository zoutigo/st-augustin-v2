// Fonction utilitaire pour vérifier l'accessibilité d'une URL avec plusieurs essais
export const waitForUrlAccessibility = async (
  url: string,
  maxAttempts: number = 20,
  interval: number = 1000
): Promise<boolean> => {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      if (response.ok) {
        return true;
      }
    } catch (error) {
      console.error(
        `Attempt ${attempt}: Error checking URL accessibility`,
        error
      );
    }
    // Attendre avant la prochaine tentative
    await new Promise((resolve) => setTimeout(resolve, interval));
  }
  return false;
};
