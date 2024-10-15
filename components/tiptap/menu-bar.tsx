import { Editor } from '@tiptap/react';
import { TextSelection } from 'prosemirror-state'; // Importez TextSelection
import React, { useState } from 'react';
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
  FaImage,
  FaColumns,
  FaTable,
  FaBorderNone,
  FaFillDrip,
} from 'react-icons/fa';
import TableButtons from './table-buttons';
import TextFormattingButtons from './text-formatting-buttons';
import ColumnButtons from './columns-buttons';

interface MenuBarProps {
  editor: Editor | null;
}

const MenuBar: React.FC<MenuBarProps> = ({ editor }) => {
  const [showTableButtons, setShowTableButtons] = useState(false);
  const [showTextFormattingButtons, setShowTextFormattingButtons] =
    useState(false);
  const [showColumnButtons, setShowColumnButtons] = useState(false);

  if (!editor) {
    return null;
  }

  const handleButtonClick = (command: () => void) => {
    command();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        editor.chain().focus().setImage({ src: base64 }).run();
      };
      reader.readAsDataURL(file);
    }
  };

  const insertColumns = () => {
    editor
      .chain()
      .focus()
      .insertContent({
        type: 'columns',
        content: [
          {
            type: 'column',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'Column 1 content',
                  },
                ],
              },
            ],
          },
          {
            type: 'column',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'Column 2 content',
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
      editor.view.state.tr.setSelection(TextSelection.near(firstColumnPos))
    );
    editor.view.focus();
  };

  const insertTable = () => {
    editor.commands.insertTable({ rows: 3, cols: 3, withHeaderRow: true });
  };

  const toggleBorder = () => {
    const { state, dispatch } = editor.view;
    const { tr } = state;
    const { selection } = state;
    const { ranges } = selection;

    ranges.forEach((range) => {
      const { $from, $to } = range;
      state.doc.nodesBetween($from.pos, $to.pos, (node, pos) => {
        if (
          node.type.name === 'tableCell' ||
          node.type.name === 'tableHeader'
        ) {
          const borderStyle = node.attrs.style?.includes('border: none')
            ? ''
            : 'border: none';
          tr.setNodeMarkup(pos, undefined, {
            ...node.attrs,
            style: borderStyle,
          });
        }
      });
    });

    dispatch(tr);
  };

  const setBackgroundColor = (color: string) => {
    const { state, dispatch } = editor.view;
    const { tr } = state;
    const { selection } = state;
    const { ranges } = selection;

    ranges.forEach((range) => {
      const { $from, $to } = range;
      state.doc.nodesBetween($from.pos, $to.pos, (node, pos) => {
        if (
          node.type.name === 'tableCell' ||
          node.type.name === 'tableHeader'
        ) {
          tr.setNodeMarkup(pos, undefined, {
            ...node.attrs,
            backgroundColor: color,
          });
        }
      });
    });

    dispatch(tr);
  };

  return (
    <div className="menu-bar">
      <div className="menu-bar-button-group">
        {/* Boutons de bascule et autres boutons au même niveau */}
        <button
          type="button"
          onClick={() =>
            setShowTextFormattingButtons(!showTextFormattingButtons)
          }
        >
          {showTextFormattingButtons
            ? 'Hide Text Formatting Options'
            : 'Show Text Formatting Options'}
        </button>

        <button
          type="button"
          onClick={() => setShowTableButtons(!showTableButtons)}
        >
          {showTableButtons ? 'Hide Table Options' : 'Show Table Options'}
        </button>
        <button
          type="button"
          onClick={() => setShowColumnButtons(!showColumnButtons)}
        >
          {showColumnButtons ? 'Hide Column Options' : 'Show Column Options'}
        </button>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: 'none' }}
          id="image-upload"
        />
        <label htmlFor="image-upload">
          <FaImage style={{ cursor: 'pointer' }} />
        </label>
      </div>

      {/* Bloc de boutons de mise en forme */}
      {showTextFormattingButtons && (
        <TextFormattingButtons
          editor={editor}
          handleButtonClick={handleButtonClick}
        />
      )}

      {/* Bloc de boutons de table */}
      {showTableButtons && <TableButtons editor={editor} />}
      {/* Bloc de boutons de colonnes */}
      {showColumnButtons && <ColumnButtons editor={editor} />}
    </div>
  );
};

export default MenuBar;
