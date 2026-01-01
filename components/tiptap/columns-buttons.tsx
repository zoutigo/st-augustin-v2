import React, { useState } from "react";
import { Editor } from "@tiptap/react";
import { ColorPalette } from "./color-palette";

interface ColumnButtonsProps {
  editor: Editor;
}

const ColumnButtons: React.FC<ColumnButtonsProps> = ({ editor }) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  /**
   * Applique une couleur à une colonne spécifique.
   */
  const applyColumnColor = (color: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setSelectedColor(color);

    editor
      .chain()
      .focus()
      .command(({ state, dispatch }) => {
        const { selection } = state;
        const { $from } = selection;

        // Parcourir les ancêtres pour trouver une colonne
        let columnPos = $from.start();
        let columnNode = null;

        for (let depth = $from.depth; depth > 0; depth--) {
          const parentPos = $from.before(depth);
          const parentNode = state.doc.nodeAt(parentPos);

          if (parentNode?.type.name === "column") {
            columnPos = parentPos;
            columnNode = parentNode;
            break;
          }
        }

        console.log("Found column node:", columnNode);

        if (!columnNode) {
          console.warn("No column node found after traversal");
          return false;
        }

        const newAttrs = {
          ...columnNode.attrs,
          backgroundColor: color,
        };

        const tr = state.tr.setNodeMarkup(
          columnPos,
          columnNode.type,
          newAttrs,
          columnNode.marks,
        );

        if (!tr.docChanged) {
          return false;
        }

        if (!dispatch) {
          return false;
        }

        dispatch(tr);
        return true;
      })
      .run();
  };

  /**
   * Applique une couleur à un bloc de colonnes spécifique.
   */
  const applyColumnBlockColor = (color: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setSelectedColor(color);

    editor
      .chain()
      .focus()
      .command(({ state, dispatch }) => {
        const { selection } = state;
        const { $from } = selection;

        // Parcourir les ancêtres pour trouver le nœud column-block
        let blockPos = $from.start();
        let blockNode = null;

        for (let depth = $from.depth; depth > 0; depth--) {
          const parentPos = $from.before(depth);
          const parentNode = state.doc.nodeAt(parentPos);

          if (parentNode?.type.name === "column-block") {
            blockPos = parentPos;
            blockNode = parentNode;
            break;
          }
        }

        if (!blockNode || blockNode.type.name !== "column-block") {
          return false;
        }

        const newAttrs = {
          ...blockNode.attrs,
          backgroundColor: color,
        };

        const tr = state.tr.setNodeMarkup(
          blockPos,
          blockNode.type,
          newAttrs,
          blockNode.marks,
        );

        if (!tr.docChanged) {
          return false;
        }

        if (!dispatch) {
          return false;
        }

        dispatch?.(tr);

        return true;
      })
      .run();
  };

  /**
   * Insère un bloc de colonnes.
   */
  const insertLayoutColumns = () => {
    editor
      .chain()
      .focus()
      .command(({ commands }) => {
        commands.insertContent({
          type: "column-block",
          content: [
            {
              type: "column",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Column 1 content" }],
                },
              ],
            },
            {
              type: "column",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Column 2 content" }],
                },
              ],
            },
          ],
        });
        console.log("Inserted column block successfully!");
        return true;
      })
      .run();
  };

  /**
   * Supprime une colonne.
   */
  const deleteLayoutColumn = () => {
    editor
      .chain()
      .focus()
      .command(({ state, dispatch }) => {
        const { selection } = state;
        const { $from } = selection;
        const columnPos = $from.before($from.depth);
        const columnNode = state.doc.nodeAt(columnPos);

        if (!columnNode || columnNode.type.name !== "column") {
          return false;
        }

        const tr = state.tr.delete(columnPos, columnPos + columnNode.nodeSize);
        if (!tr.docChanged) {
          return false;
        }

        dispatch?.(tr);
        console.log("Column deleted successfully!");
        return true;
      })
      .run();
  };

  /**
   * Supprime un bloc entier de colonnes.
   */
  const deleteLayoutColumns = () => {
    editor
      .chain()
      .focus()
      .command(({ state, dispatch }) => {
        const { selection } = state;
        const { $from } = selection;
        const blockPos = $from.before($from.depth);
        const blockNode = state.doc.nodeAt(blockPos);

        if (!blockNode || blockNode.type.name !== "column-block") {
          return false;
        }

        const tr = state.tr.delete(blockPos, blockPos + blockNode.nodeSize);
        if (!tr.docChanged) {
          return false;
        }

        dispatch?.(tr);
        return true;
      })
      .run();
  };

  return (
    <div>
      <div className="menu-bar-button-group-list">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            insertLayoutColumns();
          }}
        >
          Insert Layout Columns
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            deleteLayoutColumn();
          }}
        >
          Delete Layout Column
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            deleteLayoutColumns();
          }}
        >
          Delete Layout Columns
        </button>
      </div>
      <div className="menu-bar-button-group-list">
        <p>Block Color</p>
        <ColorPalette
          onSelectColor={(color, event) => applyColumnColor(color, event)}
          selectedColor={selectedColor || undefined}
        />

        <div className="menu-bar-button-group-list">
          <p>BG Color</p>
          <ColorPalette
            onSelectColor={(color, event) =>
              applyColumnBlockColor(color, event)
            }
            selectedColor={selectedColor || undefined}
          />
        </div>
      </div>
    </div>
  );
};

export default ColumnButtons;
