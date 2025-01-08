import { Editor } from '@tiptap/react';
import { TextSelection } from 'prosemirror-state'; // Importez TextSelection
import React, { useState } from 'react';
import { FaImage } from 'react-icons/fa';
import TableButtons from './table-buttons';
import TextFormattingButtons from './text-formatting-buttons';
import ColumnButtons from './columns-buttons';
import { Button } from '../ui/button';
import { ToggleButton } from './toggle-button';
import { FileUploadButton } from '../forms/file-upload-button';

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

  const handleImageUpload = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        editor.chain().focus().setImage({ src: base64 }).run();
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="menu-bar">
      <div className="menu-bar-button-group">
        <ToggleButton
          isActive={showTextFormattingButtons}
          onToggle={() =>
            setShowTextFormattingButtons(!showTextFormattingButtons)
          }
        >
          Text Options
        </ToggleButton>

        <ToggleButton
          isActive={showTableButtons}
          onToggle={() => setShowTableButtons(!showTableButtons)}
        >
          Table Options
        </ToggleButton>

        <ToggleButton
          isActive={showColumnButtons}
          onToggle={() => setShowColumnButtons(!showColumnButtons)}
        >
          Block Options
        </ToggleButton>
        <FileUploadButton
          onFileSelect={handleImageUpload}
          buttonText="Upload Image"
        />
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
