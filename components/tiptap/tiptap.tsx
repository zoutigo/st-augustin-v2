"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { useEffect, useRef } from "react";
import "./tiptap-editor.css"; // Importer le fichier CSS
import MenuBar from "./menu-bar";

import { extensions } from "./extensions";

interface TiptapEditorProps {
  initialContent?: string;
  onChange: (content: string) => void;
}

export const TiptapEditor: React.FC<TiptapEditorProps> = ({
  initialContent,
  onChange,
}) => {
  const editor = useEditor({
    extensions,
    content: initialContent,
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      onChange(JSON.stringify(json));
    },
  });

  const isInitialContentSet = useRef(false);

  useEffect(() => {
    if (initialContent && editor && !isInitialContentSet.current) {
      editor.commands.setContent(JSON.parse(initialContent));
      isInitialContentSet.current = true;
    }
  }, [initialContent, editor]);

  return (
    <div className="editor">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};
