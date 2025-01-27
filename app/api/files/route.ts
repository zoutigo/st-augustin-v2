import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import mime from 'mime-types';

const UPLOAD_DIR =
  process.env.EXTERNAL_UPLOAD_DIR || '/home/zoutigo/projets/nextjs/files';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 Mo
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'application/pdf',
  'image/gif',
  'image/jpg',
  'image/webp',
];
const VALID_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.pdf', '.gif', '.webp'];
const NEXTAUTH_URL = process.env.NEXTAUTH_URL;

// Fonction utilitaire pour nettoyer les noms de fichiers
const sanitizeFileName = (fileName: string): string => {
  const extension = path.extname(fileName);
  const baseName = path.basename(fileName, extension);
  const sanitizedBaseName = baseName.replace(/[^a-zA-Z0-9._-]/g, '_');
  const timestamp = Date.now(); // Pour éviter les conflits de noms
  return `${sanitizedBaseName}-${timestamp}${extension}`;
};

export const POST = async (req: Request) => {
  const requestId = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  console.log(`[${requestId}] Début du traitement du fichier...`);
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      console.error(`[${requestId}] Aucun fichier envoyé.`);
      return NextResponse.json(
        { error: 'Aucun fichier envoyé.' },
        { status: 400 }
      );
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      console.error(`[${requestId}] Type de fichier non supporté:`, file.type);
      return NextResponse.json(
        { error: `Type de fichier non supporté: ${file.type}` },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      console.error(`[${requestId}] Fichier trop volumineux:`, file.size);
      return NextResponse.json(
        {
          error: `Fichier trop volumineux (limite : ${
            MAX_FILE_SIZE / (1024 * 1024)
          } Mo).`,
        },
        { status: 400 }
      );
    }

    if (!VALID_EXTENSIONS.includes(path.extname(file.name).toLowerCase())) {
      console.error(
        `[${requestId}] Extension de fichier non autorisée:`,
        file.name
      );
      return NextResponse.json(
        { error: 'Extension de fichier non autorisée.' },
        { status: 400 }
      );
    }

    await fs.mkdir(UPLOAD_DIR, { recursive: true });

    const sanitizedFileName = sanitizeFileName(file.name);
    const filePath = path.join(UPLOAD_DIR, sanitizedFileName);
    console.log(`[${requestId}] Chemin du fichier:`, filePath);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fs.writeFile(filePath, buffer);
    console.log(`[${requestId}] Fichier sauvegardé:`, filePath);

    const detectedMimeType = mime.lookup(filePath);
    console.log(`[${requestId}] Type MIME détecté:`, detectedMimeType);

    if (!ALLOWED_MIME_TYPES.includes(detectedMimeType || '')) {
      console.error(
        `[${requestId}] Type MIME incorrect après l’écriture:`,
        detectedMimeType
      );
      await fs.unlink(filePath);
      return NextResponse.json(
        {
          error: `Le type MIME détecté (${detectedMimeType}) n'est pas autorisé.`,
        },
        { status: 400 }
      );
    }

    await fs.chmod(filePath, 0o644);
    console.log(`[${requestId}] Permissions définies pour:`, filePath);

    const fileUrl = `${NEXTAUTH_URL}/api/external-files/${sanitizedFileName}`;
    return NextResponse.json({
      url: fileUrl,
      name: sanitizedFileName,
      size: file.size,
      type: detectedMimeType,
    });
  } catch (error) {
    console.error(`[${requestId}] Erreur lors de l’upload du fichier:`, error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Erreur lors de l’upload du fichier.';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};
