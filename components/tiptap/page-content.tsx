'use client';

import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { extensions } from '@/components/tiptap/extensions';
import './tiptap-editor.css';

interface PageContentProps {
  content: string;
  title?: string; // Optionnel
  description?: string; // Optionnel
}

const DEFAULT_TITLE = 'Ecole St Augustin Crémieu';
const DEFAULT_DESCRIPTION =
  "Insformations et Actualités de l'Ecole Saint Augustin de Crémieu !";

const PageContent: React.FC<PageContentProps> = ({
  content,
  title,
  description,
}) => {
  const editor = useEditor({
    extensions,
    content: JSON.parse(content),
    editable: false, // Mode lecture seule
  });

  // Mise à jour des métadonnées avec des valeurs par défaut si non spécifiées
  useEffect(() => {
    document.title = title || DEFAULT_TITLE; // Utilise le titre par défaut si aucun titre n'est fourni
    const metaDescription = document.querySelector('meta[name="description"]');
    const descriptionContent = description || DEFAULT_DESCRIPTION; // Utilise la description par défaut si aucune description n'est fournie

    if (metaDescription) {
      metaDescription.setAttribute('content', descriptionContent);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = descriptionContent;
      document.head.appendChild(meta);
    }
  }, [title, description]);

  if (!editor)
    return <p className="text-center text-gray-500">⏳ Chargement...</p>;

  return (
    <div className="editor">
      <EditorContent editor={editor} />
    </div>
  );
};

export default PageContent;
