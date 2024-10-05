'use client';

import { useState, useEffect } from 'react';
import { EditorState, Editor, convertToRaw, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';

interface EditorProps {
  initialContent?: string;
  onChange: (content: string) => void;
}

export const RichTextEditor: React.FC<EditorProps> = ({
  initialContent,
  onChange,
}) => {
  const [editorState, setEditorState] = useState(() =>
    initialContent
      ? EditorState.createWithContent(
          convertFromRaw(JSON.parse(initialContent))
        )
      : EditorState.createEmpty()
  );

  // Fonction de mise à jour lors des changements dans l'éditeur
  useEffect(() => {
    const contentState = editorState.getCurrentContent();
    const rawContent = JSON.stringify(convertToRaw(contentState));
    onChange(rawContent); // Renvoie le contenu brut à l'élément parent
  }, [editorState, onChange]);

  // Met à jour l'état de l'éditeur si le contenu initial change
  useEffect(() => {
    if (initialContent) {
      setEditorState(
        EditorState.createWithContent(
          convertFromRaw(JSON.parse(initialContent))
        )
      );
    }
  }, [initialContent]);

  return (
    <div className="border p-2 rounded">
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        placeholder="Rédigez ici..."
      />
    </div>
  );
};
