import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import mime from 'mime-types'; // Pour vérifier le type MIME après l'enregistrement

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

// Fonction utilitaire pour nettoyer les noms de fichiers
const sanitizeFileName = (fileName: string): string => {
  const extension = path.extname(fileName);
  const baseName = path.basename(fileName, extension);
  const sanitizedBaseName = baseName.replace(/[^a-zA-Z0-9._-]/g, '_');
  const timestamp = Date.now(); // Pour éviter les conflits de noms
  return `${sanitizedBaseName}-${timestamp}${extension}`;
};

export const POST = async (req: Request) => {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    // Vérification du fichier
    if (!file) {
      console.error('Aucun fichier envoyé.');
      return NextResponse.json(
        { error: 'Aucun fichier envoyé.' },
        { status: 400 }
      );
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      console.error('Type de fichier non supporté:', file.type);
      return NextResponse.json(
        { error: `Type de fichier non supporté: ${file.type}` },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      console.error('Fichier trop volumineux:', file.size);
      return NextResponse.json(
        {
          error: `Fichier trop volumineux (limite : ${
            MAX_FILE_SIZE / (1024 * 1024)
          } Mo).`,
        },
        { status: 400 }
      );
    }

    // Créer le répertoire si nécessaire
    await fs.mkdir(UPLOAD_DIR, { recursive: true });

    // Générer un nom de fichier unique
    const sanitizedFileName = sanitizeFileName(file.name);
    const filePath = path.join(UPLOAD_DIR, sanitizedFileName);
    console.log('Chemin du fichier:', filePath);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Sauvegarder le fichier
    await fs.writeFile(filePath, buffer);
    console.log('Fichier sauvegardé:', filePath);

    // Vérifier le type MIME du fichier après l'écriture
    const detectedMimeType = mime.lookup(filePath);
    console.log('Type MIME détecté:', detectedMimeType);

    if (!ALLOWED_MIME_TYPES.includes(detectedMimeType || '')) {
      console.error('Type MIME incorrect après l’écriture:', detectedMimeType);
      await fs.unlink(filePath); // Supprimer le fichier
      return NextResponse.json(
        {
          error: `Le type MIME détecté (${detectedMimeType}) n'est pas autorisé.`,
        },
        { status: 400 }
      );
    }

    // Définir les permissions pour le fichier
    await fs.chmod(filePath, 0o644);
    console.log('Permissions définies pour:', filePath);

    // Construire l'URL du fichier
    const baseUrl =
      process.env.NODE_ENV === 'production'
        ? process.env.NEXT_PUBLIC_BASE_URL || 'https://www.votre-domaine.com'
        : 'http://localhost:3001';
    const fileUrl = `${baseUrl}/api/external-files/${sanitizedFileName}`;

    return NextResponse.json({ url: fileUrl });
  } catch (error) {
    console.error('Erreur lors de l’upload du fichier :', error);
    return NextResponse.json(
      { error: 'Erreur lors de l’upload du fichier.' },
      { status: 500 }
    );
  }
};
