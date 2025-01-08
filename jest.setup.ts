import '@testing-library/jest-dom';
import React from 'react';

// Mock des modules spécifiques
jest.mock('next/image', () => ({
  __esModule: true,
  default: () => {
    return 'Next image stub';
  },
}));

// Mock des modules spécifiques pour Tiptap
jest.mock('@tiptap/react', () => ({
  __esModule: true,
  ...jest.requireActual('@tiptap/react'),
  Image: {
    extend: jest.fn(() => ({
      addAttributes: jest.fn(),
      addCommands: jest.fn(),
    })),
  },
}));

jest.mock('@tiptap/extension-image', () => ({
  __esModule: true,
  default: {
    extend: jest.fn(() => ({
      addAttributes: jest.fn(),
      addCommands: jest.fn(),
    })),
  },
}));
