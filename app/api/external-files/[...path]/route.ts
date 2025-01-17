import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';
import mime from 'mime-types';

const EXTERNAL_UPLOAD_DIR =
  process.env.EXTERNAL_UPLOAD_DIR || '/home/zoutigo/projets/nextjs/files';

export async function GET(
  request: Request,
  { params }: { params: { path: string[] } }
) {
  try {
    const filePathArray = params.path;

    // Vérifiez que le paramètre path existe
    if (!filePathArray || filePathArray.length === 0) {
      return NextResponse.json({ error: 'Invalid file path' }, { status: 400 });
    }

    // Reconstituer le chemin du fichier à partir des paramètres
    const filePath = path.join(...filePathArray);
    const safePath = path.normalize(filePath).replace(/^(\.\.(\/|\\|$))+/, ''); // Supprime les séquences '../'
    const fullPath = path.join(EXTERNAL_UPLOAD_DIR, safePath);

    // Vérifiez que le fichier se trouve dans le répertoire autorisé
    if (!fullPath.startsWith(EXTERNAL_UPLOAD_DIR)) {
      return NextResponse.json(
        { error: 'Access to the file is forbidden' },
        { status: 403 }
      );
    }

    // Lire le fichier
    const file = await fs.readFile(fullPath);

    // Détecter le type MIME
    const mimeType = mime.lookup(fullPath) || 'application/octet-stream';
    // Répondre avec le fichier
    return new Response(file, {
      headers: {
        'Content-Type': mimeType,
        'Content-Disposition': `inline; filename="${path.basename(fullPath)}"`,
      },
    });
  } catch (error) {
    console.error('Error serving file:', error);
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }
}
