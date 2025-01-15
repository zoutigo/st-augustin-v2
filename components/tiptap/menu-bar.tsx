import { Editor } from '@tiptap/react';
import { TextSelection } from 'prosemirror-state'; // Importez TextSelection
import React, { useState } from 'react';
import { FaImage } from 'react-icons/fa';
import TableButtons from './table-buttons';
import TextFormattingButtons from './text-formatting-buttons';
import ColumnButtons from './columns-buttons';
import { ToggleButton } from './toggle-button';
import { FileUploadButton } from '../forms/file-upload-button';
import { handleFile } from '../utils/handle-editor-file';

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

  // const handleFile = (file: File | null) => {
  //   if (file) {
  //     const MAX_FILE_SIZE = 10 * 1024 * 1024; // Limite : 10 Mo

  //     if (file.size > MAX_FILE_SIZE) {
  //       console.error('Fichier trop volumineux');
  //       alert(
  //         `Le fichier dépasse la taille maximale autorisée : ${
  //           MAX_FILE_SIZE / (1024 * 1024)
  //         } Mo.`
  //       );
  //       return;
  //     }

  //     const reader = new FileReader();

  //     reader.onload = () => {
  //       const base64 = reader.result as string;

  //       if (file.type === 'application/pdf') {
  //         // Insérer le PDF avec un objet `<embed>` contenant les données Base64
  //         editor
  //           .chain()
  //           .focus()
  //           .insertContent(
  //             `<embed src="data:application/pdf;base64,${
  //               base64.split(',')[1]
  //             }" type="application/pdf" width="100%" height="600px" />`
  //           )
  //           .run();
  //       } else if (file.type.startsWith('image/')) {
  //         // Insérer l'image
  //         editor.chain().focus().setImage({ src: base64 }).run();
  //       } else {
  //         console.error('Type de fichier non pris en charge :', file.type);
  //         alert('Ce type de fichier n’est pas pris en charge.');
  //       }
  //     };

  //     reader.onerror = () => {
  //       console.error('Erreur lors de la lecture du fichier');
  //       alert('Une erreur est survenue lors de la lecture du fichier.');
  //     };

  //     reader.readAsDataURL(file);
  //   }
  // };

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
          onFileSelect={(file) => handleFile(file, editor)}
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
