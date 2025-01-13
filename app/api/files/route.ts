import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Configuration
const UPLOAD_DIR = path.join(process.cwd(), 'public/uploads');
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 Mo
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];

export const POST = async (req: Request) => {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'Aucun fichier envoyé.' },
        { status: 400 }
      );
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Type de fichier non supporté.' },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'Fichier trop volumineux (limite : 10 Mo).' },
        { status: 400 }
      );
    }

    // Créer le répertoire si nécessaire
    await fs.mkdir(UPLOAD_DIR, { recursive: true });

    const filePath = path.join(UPLOAD_DIR, file.name);
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Sauvegarder le fichier
    await fs.writeFile(filePath, buffer);

    // Retourner l'URL publique
    const fileUrl = `/uploads/${file.name}`;
    return NextResponse.json({ url: fileUrl });
  } catch (error) {
    console.error('Erreur lors de l’upload du fichier :', error);
    return NextResponse.json(
      { error: 'Erreur lors de l’upload du fichier.' },
      { status: 500 }
    );
  }
};
