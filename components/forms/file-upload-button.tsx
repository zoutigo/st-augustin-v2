import React from 'react';
import { Button } from '@/components/ui/button';

interface FileUploadButtonProps {
  onFileSelect: (file: File | null) => void; // Callback lorsque le fichier est sélectionné
  buttonText: string; // Texte du bouton
}

export const FileUploadButton: React.FC<FileUploadButtonProps> = ({
  onFileSelect,
  buttonText,
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onFileSelect(file);
  };

  const triggerFileUpload = () => {
    document.getElementById('file-upload-input')?.click();
  };

  return (
    <div>
      <input
        id="file-upload-input"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <Button
        type="button"
        variant="default"
        onClick={triggerFileUpload}
        className="text-sm text-gray-700 bg-orange-200 hover:text-gray-900 hover:bg-gray-100 border-none shadow-none focus:ring-0"
      >
        {buttonText}
      </Button>
    </div>
  );
};
