'use client';

import React, { useEffect, useState } from 'react';
import { Editor } from '@tiptap/core';
import { extensions } from '@/components/tiptap/extensions';

interface PageContentProps {
  content: string;
}

const PageContent: React.FC<PageContentProps> = ({ content }) => {
  const [htmlContent, setHtmlContent] = useState<string | null>(null);

  useEffect(() => {
    const editor = new Editor({
      extensions,
      content: JSON.parse(content),
    });
    const generatedHTML = editor.getHTML();
    console.log(generatedHTML); // Vérifiez le contenu HTML généré
    setHtmlContent(generatedHTML);
  }, [content]);

  if (!htmlContent) {
    return <p>Loading content...</p>;
  }

  return (
    <div className="editor" dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
};

export default PageContent;
