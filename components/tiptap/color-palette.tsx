import React from 'react';

interface ColorPaletteProps {
  onSelectColor: (color: string, event: React.MouseEvent) => void;
  selectedColor?: string;
}

export const editorColors = [
  '#FF5733', // Orange
  '#FFC300', // Jaune
  '#DAF7A6', // Vert clair
  '#33FF57', // Vert
  '#33C7FF', // Bleu
  '#A633FF', // Violet
  '#FF33A8', // Rose
  '#FFFFFF', // Blanc
  '#000000', // Noir
];

export const ColorPalette: React.FC<ColorPaletteProps> = ({
  onSelectColor,
  selectedColor,
}) => {
  return (
    <div style={{ display: 'flex', gap: '8px', margin: '4px 0' }}>
      {editorColors.map((color) => (
        <button
          key={color}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onSelectColor(color, event);
          }}
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '4px',
            border:
              selectedColor === color ? '2px solid black' : '1px solid #ccc',
            backgroundColor: color,
            cursor: 'pointer',
          }}
        />
      ))}
    </div>
  );
};
