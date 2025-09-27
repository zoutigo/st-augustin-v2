import { loadPdfPagesAsImages } from '../tiptap/load-pdf';
import { removeTemporarySpinner } from './remove-temporary-spinner';
import { waitForUrlAccessibility } from './wait-for-url-accecibility';
import {
  ALLOWED_MIME_TYPES,
  MAX_FILE_SIZE_BYTES,
  humanAllowedTypes,
} from './upload-constraints';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const handleFile = async (file: File | null, editor: any) => {
  if (file) {
    const MAX_FILE_SIZE = MAX_FILE_SIZE_BYTES; // 10 Mo

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      alert(`Type de fichier non supporté. Types acceptés: ${humanAllowedTypes}`);
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      alert('Le fichier est trop volumineux (limite : 10 Mo).');
      return;
    }

    const tempSpinnerId = `spinner-${Date.now()}`;

    // Ajouter un spinner temporaire
    editor
      .chain()
      .focus()
      .setSpinner({ id: tempSpinnerId, size: 'small' }) // Taille ajustée pour le spinner
      .run();

    try {
      const formData = new FormData();
      formData.append('file', file);

      // Envoyer le fichier au serveur
      const response = await fetch('/api/files', {
        method: 'POST',
        body: formData,
      });

      console.log('Réponse du serveur :', response);

      if (!response.ok) {
        removeTemporarySpinner(editor, tempSpinnerId);
        alert('Le téléchargement du fichier a échoué.');
        return;
      }

      const data = await response.json();

      if (data && data.url) {
        const isAccessible = await waitForUrlAccessibility(data.url, 20, 1000);

        if (isAccessible) {
          console.log('URL accessible :', data.url);

          if (file.type === 'application/pdf') {
            const pdfImages = await loadPdfPagesAsImages(data.url);

            pdfImages.forEach((image: string, index: number) => {
              console.log(
                `Ajout de l'image de la page ${index + 1} à l’éditeur.`
              );
              editor
                .chain()
                .focus()
                .setImage({ src: image, alt: `Page ${index + 1}` })
                .run();
            });
          } else {
            editor.chain().focus().setImage({ src: data.url, alt: '' }).run();
          }
        } else {
          console.error(
            "L'URL n'est pas accessible après plusieurs tentatives"
          );
          removeTemporarySpinner(editor, tempSpinnerId);
          alert("L'URL n'est pas accessible après plusieurs tentatives.");
        }
      } else {
        removeTemporarySpinner(editor, tempSpinnerId);
        alert('Réponse invalide du serveur.');
      }
    } catch (error) {
      removeTemporarySpinner(editor, tempSpinnerId);
      alert('Une erreur est survenue lors du téléchargement du fichier.');
    }
  }
};
