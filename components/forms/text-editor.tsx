'use client';

import { useState, useEffect } from 'react';
import {
  EditorState,
  Editor,
  convertToRaw,
  convertFromRaw,
  RichUtils,
} from 'draft-js';
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

  // Fonction pour gérer les commandes de mise en forme
  const handleKeyCommand = (command: string, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  // Fonction pour appliquer les styles en ligne
  const toggleInlineStyle = (style: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  return (
    <div className="border p-2 rounded">
      <div className="mb-2 mx-2">
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            toggleInlineStyle('BOLD');
          }}
        >
          Gras
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            toggleInlineStyle('ITALIC');
          }}
        >
          Italique
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            toggleInlineStyle('UNDERLINE');
          }}
        >
          Souligné
        </button>
      </div>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        handleKeyCommand={handleKeyCommand}
        placeholder="Rédigez ici..."
      />
    </div>
  );
};
