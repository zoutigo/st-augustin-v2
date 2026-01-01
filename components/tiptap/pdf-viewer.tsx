// components/PDFViewer.tsx
"use client";

import { useEffect, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

type PDFViewerProps = {
  fileUrl: string;
};

const PDFViewer: React.FC<PDFViewerProps> = ({ fileUrl }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const loadPdf = async () => {
      try {
        const pdf = await pdfjsLib.getDocument(fileUrl).promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1.5 });

        if (canvasRef.current) {
          const canvas = canvasRef.current;
          const context = canvas.getContext("2d");

          if (context) {
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            await page.render({
              canvasContext: context,
              viewport,
            }).promise;
          }
        }
      } catch (error) {
        console.error("Failed to load PDF:", error);
      }
    };

    loadPdf();
  }, [fileUrl]);

  return (
    <div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default PDFViewer;
