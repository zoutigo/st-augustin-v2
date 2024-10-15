import React from 'react';
import { Editor } from '@tiptap/react';

interface ColumnButtonsProps {
  editor: Editor;
}

const ColumnButtons: React.FC<ColumnButtonsProps> = ({ editor }) => {
  const insertColumns = () => {
    editor.chain().focus().insertTable({ rows: 2, cols: 2 }).run();
  };

  const deleteColumn = () => {
    editor.chain().focus().deleteColumn().run();
  };

  const deleteColumns = () => {
    editor.chain().focus().deleteColumn().run();
    // Assuming you want to delete multiple columns, you would need to loop through the columns and delete them one by one.
    // However, the `deleteColumn` method does not take any arguments, so you can't pass a range of columns to delete.
    // You would need to call `deleteColumn` multiple times.

    const deleteColumns = () => {
      const numberOfColumnsToDelete = 2; // Example: delete 2 columns
      for (let i = 0; i < numberOfColumnsToDelete; i++) {
        editor.chain().focus().deleteColumn().run();
      }
    };
  };

  return (
    <div className="menu-bar-button-group-list">
      <button type="button" onClick={insertColumns}>
        Insert Columns
      </button>
      <button type="button" onClick={deleteColumn}>
        Delete Column
      </button>
      <button type="button" onClick={deleteColumns}>
        Delete Columns
      </button>
    </div>
  );
};

export default ColumnButtons;
