'use client';

import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';

import { extensions } from '@/components/tiptap/extensions';
import './tiptap-editor.css';

interface PageContentProps {
  content: string;
}

const PageContent: React.FC<PageContentProps> = ({ content }) => {
  const editor = useEditor({
    extensions,
    // On réinjecte le JSON comme contenu
    content: JSON.parse(content),

    editable: false, // mode lecture seule
  });
  if (!editor) return <p>Loading...</p>;
  return (
    <div className="editor">
      <EditorContent editor={editor} />
    </div>
  );
};

export default PageContent;
