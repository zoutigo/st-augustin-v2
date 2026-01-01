import { Editor } from "@tiptap/react";
import { TextSelection } from "prosemirror-state";

interface editorInsertColumnsProps {
  editor: Editor | null;
}

export const editorInsertColumns = ({ editor }: editorInsertColumnsProps) => {
  if (!editor) {
    return null;
  }
  editor
    .chain()
    .focus()
    .insertContent({
      type: "columns",
      content: [
        {
          type: "column",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Column 1 content",
                },
              ],
            },
          ],
        },
        {
          type: "column",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Column 2 content",
                },
              ],
            },
          ],
        },
      ],
    })
    .run();

  // Définir la sélection de texte à l'intérieur de la première colonne
  const firstColumnPos = editor.view.state.doc.resolve(2); // Position après l'ouverture de la première colonne
  editor.view.dispatch(
    editor.view.state.tr.setSelection(TextSelection.near(firstColumnPos)),
  );
  editor.view.focus();
};
