import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';

// Définissez explicitement la version pour le Worker PDF.js
// const pdfjsVersion = '4.10.38';
// // GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsVersion}/pdf.worker.min.js`;
// GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.worker.min.mjs`;

GlobalWorkerOptions.workerSrc = '/libs/pdfjs/pdf.worker.min.mjs';

/**
 * Charge un PDF et retourne un tableau d'images représentant ses pages
 * @param pdfUrl - L'URL du PDF à charger
 */
export const loadPdfPagesAsImages = async (
  pdfUrl: string
): Promise<string[]> => {
  try {
    const pdf = await getDocument(pdfUrl).promise;
    const pageImages: string[] = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 1.5 });

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      const renderContext = {
        canvasContext: context!,
        viewport,
      };

      await page.render(renderContext).promise;
      pageImages.push(canvas.toDataURL('image/png'));
    }

    return pageImages;
  } catch (error) {
    console.error('Erreur lors du chargement du PDF :', error);
    throw new Error('Échec du chargement du PDF');
  }
};
