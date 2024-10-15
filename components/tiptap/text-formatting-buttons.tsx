import React from 'react';
import { Editor } from '@tiptap/react';
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
} from 'react-icons/fa';

interface TextFormattingButtonsProps {
  editor: Editor;
  handleButtonClick: (command: () => void) => void;
}

const TextFormattingButtons: React.FC<TextFormattingButtonsProps> = ({
  editor,
  handleButtonClick,
}) => {
  return (
    <div className="menu-bar-button-group-list">
      <button
        type="button"
        onClick={() =>
          handleButtonClick(() => editor.chain().focus().toggleBold().run())
        }
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        <FaBold />
      </button>
      <button
        type="button"
        onClick={() =>
          handleButtonClick(() => editor.chain().focus().toggleItalic().run())
        }
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        <FaItalic />
      </button>
      <button
        type="button"
        onClick={() =>
          handleButtonClick(() =>
            editor.chain().focus().toggleUnderline().run()
          )
        }
        className={editor.isActive('underline') ? 'is-active' : ''}
      >
        <FaUnderline />
      </button>
      <button
        type="button"
        onClick={() =>
          handleButtonClick(() =>
            editor.chain().focus().toggleBulletList().run()
          )
        }
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        <FaListUl />
      </button>
      <button
        type="button"
        onClick={() =>
          handleButtonClick(() =>
            editor.chain().focus().toggleOrderedList().run()
          )
        }
        className={editor.isActive('orderedList') ? 'is-active' : ''}
      >
        <FaListOl />
      </button>
      <button
        type="button"
        onClick={() =>
          handleButtonClick(() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          )
        }
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
      >
        <FaHeading /> H1
      </button>
      <button
        type="button"
        onClick={() =>
          handleButtonClick(() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          )
        }
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
      >
        H2
      </button>
      <button
        type="button"
        onClick={() =>
          handleButtonClick(() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          )
        }
        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
      >
        H3
      </button>
      <button
        type="button"
        onClick={() =>
          handleButtonClick(() => editor.chain().focus().setParagraph().run())
        }
        className={editor.isActive('paragraph') ? 'is-active' : ''}
      >
        <FaParagraph /> Paragraph
      </button>
      <button
        type="button"
        onClick={() =>
          handleButtonClick(() => editor.chain().focus().toggleStrike().run())
        }
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        <FaStrikethrough />
      </button>
      <button
        type="button"
        onClick={() =>
          handleButtonClick(() =>
            editor.chain().focus().toggleHighlight().run()
          )
        }
        className={editor.isActive('highlight') ? 'is-active' : ''}
      >
        <FaHighlighter />
      </button>
      <button
        type="button"
        onClick={() =>
          handleButtonClick(() =>
            editor.chain().focus().setTextAlign('left').run()
          )
        }
        className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
      >
        <FaAlignLeft />
      </button>
      <button
        type="button"
        onClick={() =>
          handleButtonClick(() =>
            editor.chain().focus().setTextAlign('center').run()
          )
        }
        className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
      >
        <FaAlignCenter />
      </button>
      <button
        type="button"
        onClick={() =>
          handleButtonClick(() =>
            editor.chain().focus().setTextAlign('right').run()
          )
        }
        className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
      >
        <FaAlignRight />
      </button>
      <button
        type="button"
        onClick={() =>
          handleButtonClick(() =>
            editor.chain().focus().setTextAlign('justify').run()
          )
        }
        className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}
      >
        <FaAlignJustify />
      </button>
    </div>
  );
};

export default TextFormattingButtons;
