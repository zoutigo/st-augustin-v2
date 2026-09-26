// Régression : les pages d'un PDF inséré dans l'éditeur ne doivent plus être
// embarquées en base64 dans le contenu (ce qui faisait exploser la taille de
// la requête de sauvegarde et bloquait indéfiniment le formulaire). Chaque
// page doit être uploadée vers /api/files et c'est l'URL hébergée qui doit
// être insérée dans l'éditeur.

jest.mock("@/components/tiptap/load-pdf", () => ({
  loadPdfPagesAsImages: jest.fn(),
}));
jest.mock("@/components/utils/remove-temporary-spinner", () => ({
  removeTemporarySpinner: jest.fn(),
}));
jest.mock("@/components/utils/wait-for-url-accecibility", () => ({
  waitForUrlAccessibility: jest.fn().mockResolvedValue(true),
}));

import { loadPdfPagesAsImages } from "@/components/tiptap/load-pdf";
import { handleFile } from "@/components/utils/handle-editor-file";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const makeEditorMock = (): any => {
  const editor: Record<string, jest.Mock> = {};
  editor.chain = jest.fn(() => editor);
  editor.focus = jest.fn(() => editor);
  editor.setSpinner = jest.fn(() => editor);
  editor.setImage = jest.fn(() => editor);
  editor.run = jest.fn(() => editor);
  return editor;
};

describe("handleFile - upload d'un PDF dans l'éditeur", () => {
  const PDF_UPLOAD_URL = "/api/external-files/reunion-1234.pdf";
  const PAGE_DATA_URLS = [
    "data:image/jpeg;base64,PAGE_ONE_BASE64",
    "data:image/jpeg;base64,PAGE_TWO_BASE64",
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (loadPdfPagesAsImages as jest.Mock).mockResolvedValue(PAGE_DATA_URLS);

    global.fetch = jest.fn(async (input: RequestInfo | URL) => {
      const url = String(input);

      if (url.startsWith("data:")) {
        // dataUrlToFile() convertit la data URL en Blob via fetch, comme
        // le fait un vrai navigateur.
        return {
          ok: true,
          blob: async () =>
            new Blob(["fake-image-bytes"], {
              type: "image/jpeg",
            }),
        } as unknown as Response;
      }

      if (url === "/api/files") {
        // Chaque page uploadée (et le PDF initial) reçoit une URL hébergée
        return {
          ok: true,
          json: async () => ({ url: "/api/external-files/page-x.jpg" }),
        } as Response;
      }

      return {
        ok: true,
        json: async () => ({ url: PDF_UPLOAD_URL }),
      } as Response;
    }) as unknown as typeof fetch;
  });

  it("uploade chaque page rendue au lieu de l'embarquer en base64", async () => {
    const editor = makeEditorMock();
    const pdfFile = new File(["%PDF-1.4"], "reunion.pdf", {
      type: "application/pdf",
    });

    await handleFile(pdfFile, editor);

    // Le PDF original + chaque page rendue doivent être uploadés vers /api/files
    const filesUploadCalls = (global.fetch as jest.Mock).mock.calls.filter(
      (call: unknown[]) => call[0] === "/api/files",
    );
    expect(filesUploadCalls).toHaveLength(PAGE_DATA_URLS.length + 1);

    // Aucune image insérée ne doit être une data URL base64
    const insertedSrcs = editor.setImage.mock.calls.map(
      (call: [{ src: string }]) => call[0].src,
    );
    expect(insertedSrcs).toHaveLength(PAGE_DATA_URLS.length);
    insertedSrcs.forEach((src: string) => {
      expect(src).not.toMatch(/^data:/);
      expect(src).toBe("/api/external-files/page-x.jpg");
    });
  });
});
