import React from 'react';
import { Editor } from '@tiptap/react';

interface TableButtonsProps {
  editor: Editor;
}

const TableButtons: React.FC<TableButtonsProps> = ({ editor }) => {
  return (
    <div className="menu-bar-button-group-list">
      <button
        onClick={() =>
          editor
            .chain()
            .focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
            .run()
        }
      >
        Insert table
      </button>
      <button onClick={() => editor.chain().focus().addColumnBefore().run()}>
        Add column before
      </button>
      <button onClick={() => editor.chain().focus().addColumnAfter().run()}>
        Add column after
      </button>
      <button onClick={() => editor.chain().focus().deleteColumn().run()}>
        Delete column
      </button>
      <button onClick={() => editor.chain().focus().addRowBefore().run()}>
        Add row before
      </button>
      <button onClick={() => editor.chain().focus().addRowAfter().run()}>
        Add row after
      </button>
      <button onClick={() => editor.chain().focus().deleteRow().run()}>
        Delete row
      </button>
      <button onClick={() => editor.chain().focus().deleteTable().run()}>
        Delete table
      </button>
      <button onClick={() => editor.chain().focus().mergeCells().run()}>
        Merge cells
      </button>
      <button onClick={() => editor.chain().focus().splitCell().run()}>
        Split cell
      </button>
      <button onClick={() => editor.chain().focus().toggleHeaderColumn().run()}>
        Toggle header column
      </button>
      <button onClick={() => editor.chain().focus().toggleHeaderRow().run()}>
        Toggle header row
      </button>
      <button onClick={() => editor.chain().focus().toggleHeaderCell().run()}>
        Toggle header cell
      </button>
      <button onClick={() => editor.chain().focus().mergeOrSplit().run()}>
        Merge or split
      </button>
      <button
        onClick={() =>
          editor.chain().focus().setCellAttribute('colspan', 2).run()
        }
      >
        Set cell attribute
      </button>
      <button onClick={() => editor.chain().focus().fixTables().run()}>
        Fix tables
      </button>
      <button onClick={() => editor.chain().focus().goToNextCell().run()}>
        Go to next cell
      </button>
      <button onClick={() => editor.chain().focus().goToPreviousCell().run()}>
        Go to previous cell
      </button>
    </div>
  );
};

export default TableButtons;
