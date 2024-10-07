'use client';

import React, { useEffect, useState } from 'react';
import { convertFromRaw, ContentState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

interface PageContentProps {
  content: string;
}

const PageContent: React.FC<PageContentProps> = ({ content }) => {
  const [htmlContent, setHtmlContent] = useState<string | null>(null);

  useEffect(() => {
    // Charger `draft-js` et `draft-js-export-html` uniquement côté client
    import('draft-js').then(({ convertFromRaw }) => {
      import('draft-js-export-html').then(({ stateToHTML }) => {
        const contentState = convertFromRaw(JSON.parse(content));
        const html = stateToHTML(contentState);
        setHtmlContent(html);
      });
    });
  }, [content]);

  if (!htmlContent) {
    return <p>Loading content...</p>;
  }

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export default PageContent;
