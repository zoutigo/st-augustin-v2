import React, { useState } from "react";
import { Editor } from "@tiptap/react";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaListUl,
  FaListOl,
  FaHeading,
  FaStrikethrough,
  FaHighlighter,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
  FaParagraph,
} from "react-icons/fa";
import { ColorPalette } from "./color-palette";

interface TextFormattingButtonsProps {
  editor: Editor;
  handleButtonClick: (command: () => void) => void;
}

const TextFormattingButtons: React.FC<TextFormattingButtonsProps> = ({
  editor,
  handleButtonClick,
}) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [fontSize, setFontSize] = useState<number>(16);

  const applyTextColor = (color: string, event: React.MouseEvent): void => {
    event.preventDefault();
    event.stopPropagation();

    setSelectedColor(color);

    editor
      .chain()
      .focus()
      .command(({ state, dispatch }) => {
        const { selection, tr } = state;
        const { from, to } = selection;

        if (from === to) {
          console.warn("No text selected. Cannot apply color.");
          return false;
        }

        // Applique la couleur au texte sélectionné
        tr.addMark(from, to, state.schema.marks.textColor.create({ color }));

        if (!tr.docChanged) {
          console.warn("Transaction did not change the document.");
          return false;
        }

        if (!dispatch) {
          console.warn("Dispatch function is not available!");
          return false;
        }

        dispatch(tr);
        console.log(`Applied text color: ${color}`);
        return true;
      })
      .run();
  };
  /**
   * Réinitialise la couleur du texte sélectionné.
   */
  const clearTextColor = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setSelectedColor(null);

    editor
      .chain()
      .focus()
      .command(({ state, dispatch }) => {
        const { selection, tr } = state;
        const { from, to } = selection;

        if (from === to) {
          console.warn("No text selected. Cannot clear color.");
          return false;
        }

        tr.removeMark(from, to, state.schema.marks.textColor);

        if (!tr.docChanged) {
          console.warn("Transaction did not change the document.");
          return false;
        }

        if (!dispatch) {
          console.warn("Dispatch function is not available!");
          return false;
        }

        dispatch(tr);
        console.log("Cleared text color");
        return true;
      })
      .run();
  };
  return (
    <div>
      <div className="menu-bar-button-group-list">
        <button
          type="button"
          aria-label="Gras"
          onClick={() =>
            handleButtonClick(() => editor.chain().focus().toggleBold().run())
          }
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          <FaBold />
        </button>
        <button
          type="button"
          aria-label="Italique"
          onClick={() =>
            handleButtonClick(() => editor.chain().focus().toggleItalic().run())
          }
          className={editor.isActive("italic") ? "is-active" : ""}
        >
          <FaItalic />
        </button>
        <button
          type="button"
          aria-label="Souligner"
          onClick={() =>
            handleButtonClick(() =>
              editor.chain().focus().toggleUnderline().run(),
            )
          }
          className={editor.isActive("underline") ? "is-active" : ""}
        >
          <FaUnderline />
        </button>
        <button
          type="button"
          aria-label="Liste à puces"
          onClick={() =>
            handleButtonClick(() =>
              editor.chain().focus().toggleBulletList().run(),
            )
          }
          className={editor.isActive("bulletList") ? "is-active" : ""}
        >
          <FaListUl />
        </button>
        <button
          type="button"
          aria-label="Liste ordonnée"
          onClick={() =>
            handleButtonClick(() =>
              editor.chain().focus().toggleOrderedList().run(),
            )
          }
          className={editor.isActive("orderedList") ? "is-active" : ""}
        >
          <FaListOl />
        </button>
        <button
          type="button"
          aria-label="Titre H1"
          onClick={() =>
            handleButtonClick(() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run(),
            )
          }
          className={
            editor.isActive("heading", { level: 1 }) ? "is-active" : ""
          }
        >
          <FaHeading /> H1
        </button>

        <button
          type="button"
          aria-label="Titre H2"
          onClick={() =>
            handleButtonClick(() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run(),
            )
          }
          className={
            editor.isActive("heading", { level: 2 }) ? "is-active" : ""
          }
        >
          H2
        </button>
        <button
          type="button"
          aria-label="Titre H3"
          onClick={() =>
            handleButtonClick(() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run(),
            )
          }
          className={
            editor.isActive("heading", { level: 3 }) ? "is-active" : ""
          }
        >
          H3
        </button>
        <button
          type="button"
          aria-label="Augmenter la taille du texte"
          onClick={() => {
            const next = Math.min(fontSize + 2, 40);
            setFontSize(next);
            handleButtonClick(() =>
              editor
                .chain()
                .focus()
                .setMark("fontSize", { size: `${next}px` })
                .run(),
            );
          }}
          className={editor.isActive("fontSize") ? "is-active" : ""}
        >
          A+
        </button>
        <button
          type="button"
          aria-label="Diminuer la taille du texte"
          onClick={() => {
            const next = Math.max(fontSize - 2, 12);
            setFontSize(next);
            handleButtonClick(() =>
              editor
                .chain()
                .focus()
                .setMark("fontSize", { size: `${next}px` })
                .run(),
            );
          }}
          className={editor.isActive("fontSize") ? "is-active" : ""}
        >
          A-
        </button>
        <button
          type="button"
          aria-label="Paragraphe"
          onClick={() =>
            handleButtonClick(() => editor.chain().focus().setParagraph().run())
          }
          className={editor.isActive("paragraph") ? "is-active" : ""}
        >
          <FaParagraph /> Paragraph
        </button>
        <button
          type="button"
          aria-label="Barré"
          onClick={() =>
            handleButtonClick(() => editor.chain().focus().toggleStrike().run())
          }
          className={editor.isActive("strike") ? "is-active" : ""}
        >
          <FaStrikethrough />
        </button>
        <button
          type="button"
          aria-label="Surligner"
          onClick={() =>
            handleButtonClick(() =>
              editor.chain().focus().toggleHighlight().run(),
            )
          }
          className={editor.isActive("highlight") ? "is-active" : ""}
        >
          <FaHighlighter />
        </button>
        <button
          type="button"
          aria-label="Aligner à gauche"
          onClick={() =>
            handleButtonClick(() =>
              editor.chain().focus().setTextAlign("left").run(),
            )
          }
          className={editor.isActive({ textAlign: "left" }) ? "is-active" : ""}
        >
          <FaAlignLeft />
        </button>
        <button
          type="button"
          aria-label="Aligner au centre"
          onClick={() =>
            handleButtonClick(() =>
              editor.chain().focus().setTextAlign("center").run(),
            )
          }
          className={
            editor.isActive({ textAlign: "center" }) ? "is-active" : ""
          }
        >
          <FaAlignCenter />
        </button>
        <button
          type="button"
          aria-label="Aligner à droite"
          onClick={() =>
            handleButtonClick(() =>
              editor.chain().focus().setTextAlign("right").run(),
            )
          }
          className={editor.isActive({ textAlign: "right" }) ? "is-active" : ""}
        >
          <FaAlignRight />
        </button>
        <button
          type="button"
          aria-label="Justifier"
          onClick={() =>
            handleButtonClick(() =>
              editor.chain().focus().setTextAlign("justify").run(),
            )
          }
          className={
            editor.isActive({ textAlign: "justify" }) ? "is-active" : ""
          }
        >
          <FaAlignJustify />
        </button>
      </div>

      {/* Sélecteur de Couleur */}
      <div className="menu-bar-button-group-list">
        <ColorPalette
          onSelectColor={(color, event) => applyTextColor(color, event)}
          selectedColor={selectedColor || undefined}
        />
        <button
          type="button"
          aria-label="Effacer la couleur du texte"
          onClick={clearTextColor}
          style={{
            marginTop: "8px",
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            padding: "4px 8px",
            borderRadius: "4px",
          }}
        >
          Clear Text Color
        </button>
      </div>
    </div>
  );
};

export default TextFormattingButtons;
