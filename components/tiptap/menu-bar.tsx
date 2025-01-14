import { Editor } from '@tiptap/react';
import { TextSelection } from 'prosemirror-state'; // Importez TextSelection
import React, { useState } from 'react';
import { FaImage } from 'react-icons/fa';
import TableButtons from './table-buttons';
import TextFormattingButtons from './text-formatting-buttons';
import ColumnButtons from './columns-buttons';
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

  const handleFile = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        editor.chain().focus().setImage({ src: base64 }).run();
      };
      reader.readAsDataURL(file);
    }
  };

  // const handleFile = async (file: File | null) => {
  //   if (file) {
  //     const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 Mo
  //     const ALLOWED_MIME_TYPES = [
  //       'image/jpeg',
  //       'image/png',
  //       'application/pdf',
  //       'image/gif',
  //       'image/jpg',
  //       'image/webp',
  //     ];

  //     if (!ALLOWED_MIME_TYPES.includes(file.type)) {
  //       console.error('Unsupported file type');
  //       alert('Le type de fichier n’est pas supporté.');
  //       return;
  //     }

  //     if (file.size > MAX_FILE_SIZE) {
  //       console.error('File is too large');
  //       alert('Le fichier est trop volumineux (limite : 10 Mo).');
  //       return;
  //     }

  //     try {
  //       const formData = new FormData();
  //       formData.append('file', file);

  //       const response = await fetch('/api/files', {
  //         method: 'POST',
  //         body: formData,
  //       });

  //       if (!response.ok) {
  //         console.error('File upload failed');
  //         alert('Le téléchargement du fichier a échoué.');
  //         return;
  //       }

  //       const data = await response.json();
  //       console.log('url:', data.url);

  //       if (data && data.url) {
  //         editor.chain().focus().setImage({ src: data.url }).run();
  //       } else {
  //         console.error('Invalid response from server');
  //         alert('Réponse invalide du serveur.');
  //       }
  //     } catch (error) {
  //       console.error('Error during file upload:', error);
  //       alert('Une erreur est survenue lors du téléchargement du fichier.');
  //     }
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
        <FileUploadButton onFileSelect={handleFile} buttonText="Upload Image" />
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
