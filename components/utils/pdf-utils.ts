import { GlobalWorkerOptions, getDocument, PDFDocumentProxy } from 'pdfjs-dist';

// Fonction pour configurer le worker PDF.js
export async function configurePdfJsWorker() {
  const pdfJsVersion = (await import('pdfjs-dist/package.json')).version;
  GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfJsVersion}/pdf.worker.min.js`;
}

// Fonction pour charger un PDF
export async function loadPdf(fileUrl: string): Promise<PDFDocumentProxy> {
  await configurePdfJsWorker(); // Configure le worker
  const loadingTask = getDocument(fileUrl);
  return await loadingTask.promise;
}
