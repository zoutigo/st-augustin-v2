import { Editor } from "@tiptap/react";
import { TextSelection } from "prosemirror-state"; // Importez TextSelection
import React, { useState } from "react";
import { FaImage } from "react-icons/fa";
import TableButtons from "./table-buttons";
import TextFormattingButtons from "./text-formatting-buttons";
import ColumnButtons from "./columns-buttons";
import { ToggleButton } from "./toggle-button";
import { FileUploadButton } from "../forms/file-upload-button";
import { handleFile } from "../utils/handle-editor-file";
import { Info } from "lucide-react";

interface MenuBarProps {
  editor: Editor | null;
}

const MenuBar: React.FC<MenuBarProps> = ({ editor }) => {
  const [showTableButtons, setShowTableButtons] = useState(false);
  const [showTextFormattingButtons, setShowTextFormattingButtons] =
    useState(false);
  const [showColumnButtons, setShowColumnButtons] = useState(false);
  const [showUploadInfo, setShowUploadInfo] = useState(false);

  if (!editor) {
    return null;
  }

  const handleButtonClick = (command: () => void) => {
    command();
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
        <div className="menu-bar-upload">
          <FileUploadButton
            onFileSelect={(file) => handleFile(file, editor)}
            buttonText="Ajouter image/PDF"
            showHelper={false}
          />
          <button
            type="button"
            className="menu-bar-info-button"
            onClick={() => setShowUploadInfo((v) => !v)}
            aria-label="Informations sur les fichiers"
          >
            <Info className="h-4 w-4" />
          </button>
        </div>
      </div>

      {showUploadInfo && (
        <div className="menu-bar-info">
          <p>
            Formats acceptés : JPG, PNG, GIF, WEBP, PDF. Poids conseillé &lt;
            2Mo pour de meilleures performances.
          </p>
        </div>
      )}

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
