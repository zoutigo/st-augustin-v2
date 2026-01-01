import React from "react";
import { Editor } from "@tiptap/react";

interface TableButtonsProps {
  editor: Editor;
}

const TableButtons: React.FC<TableButtonsProps> = ({ editor }) => {
  const actionButton = (label: string, action: () => void) => (
    <button
      key={label}
      type="button"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        action();
      }}
    >
      {label}
    </button>
  );

  return (
    <div className="menu-bar-button-group-list">
      {actionButton("Insert table", () =>
        editor
          .chain()
          .focus()
          .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
          .run(),
      )}
      {actionButton("Add column before", () =>
        editor.chain().focus().addColumnBefore().run(),
      )}
      {actionButton("Add column after", () =>
        editor.chain().focus().addColumnAfter().run(),
      )}
      {actionButton("Delete column", () =>
        editor.chain().focus().deleteColumn().run(),
      )}
      {actionButton("Add row before", () =>
        editor.chain().focus().addRowBefore().run(),
      )}
      {actionButton("Add row after", () =>
        editor.chain().focus().addRowAfter().run(),
      )}
      {actionButton("Delete row", () =>
        editor.chain().focus().deleteRow().run(),
      )}
      {actionButton("Delete table", () =>
        editor.chain().focus().deleteTable().run(),
      )}
      {actionButton("Merge cells", () =>
        editor.chain().focus().mergeCells().run(),
      )}
      {actionButton("Split cell", () =>
        editor.chain().focus().splitCell().run(),
      )}
      {actionButton("Toggle header column", () =>
        editor.chain().focus().toggleHeaderColumn().run(),
      )}
      {actionButton("Toggle header row", () =>
        editor.chain().focus().toggleHeaderRow().run(),
      )}
      {actionButton("Toggle header cell", () =>
        editor.chain().focus().toggleHeaderCell().run(),
      )}
      {actionButton("Merge or split", () =>
        editor.chain().focus().mergeOrSplit().run(),
      )}
      {actionButton("Set cell attribute", () =>
        editor.chain().focus().setCellAttribute("colspan", 2).run(),
      )}
      {actionButton("Fix tables", () =>
        editor.chain().focus().fixTables().run(),
      )}
      {actionButton("Go to next cell", () =>
        editor.chain().focus().goToNextCell().run(),
      )}
      {actionButton("Go to previous cell", () =>
        editor.chain().focus().goToPreviousCell().run(),
      )}
    </div>
  );
};

export default TableButtons;
