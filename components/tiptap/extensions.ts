import { Node, mergeAttributes, Mark } from '@tiptap/core';

import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import Heading from '@tiptap/extension-heading';
import Strike from '@tiptap/extension-strike';
import Image from '@tiptap/extension-image';
import ResizeImage from 'tiptap-extension-resize-image';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';
import { PDFNode } from './pdf-node-extension';
import { SpinnerNode } from './spinner-node';

// ✅ **Table Cell Personnalisée**
const CustomTableCell = TableCell.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      backgroundColor: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-background-color'),
        renderHTML: (attributes) => {
          return {
            'data-background-color': attributes.backgroundColor,
            style: `background-color: ${attributes.backgroundColor}`,
          };
        },
      },
    };
  },
});

// ✅ **Extension Column**
export const Column = Node.create({
  name: 'column',

  group: 'block',
  content: 'block+',

  addAttributes() {
    return {
      backgroundColor: {
        default: null,
        parseHTML: (element: HTMLElement) => {
          const dataColor = element.getAttribute('data-bgcolor');
          const inlineStyle = element.style?.backgroundColor;
          return dataColor || inlineStyle || null;
        },
        renderHTML: (attributes) => {
          if (!attributes.backgroundColor) {
            return {};
          }
          return {
            'data-bgcolor': attributes.backgroundColor,
            style: `background-color: ${attributes.backgroundColor};`,
          };
        },
      },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-type="column"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-type': 'column',
        class: 'column',
      }),
      0,
    ];
  },
});

// ✅ **Extension ColumnBlock**
export const ColumnBlock = Node.create({
  name: 'column-block',

  group: 'block',
  content: 'column+',

  addAttributes() {
    return {
      backgroundColor: {
        default: null,
        parseHTML: (element: HTMLElement) => {
          const dataColor = element.getAttribute('data-bgcolor');
          const inlineStyle = element.style?.backgroundColor;
          return dataColor || inlineStyle || null;
        },
        renderHTML: (attributes) => {
          if (!attributes.backgroundColor) {
            return {};
          }
          return {
            'data-bgcolor': attributes.backgroundColor,
            style: `background-color: ${attributes.backgroundColor};`,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="column-block"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-type': 'column-block',
        class: 'column-block',
      }),
      0,
    ];
  },
});

// Extension TextColor
export const TextColor = Mark.create({
  name: 'textColor',

  addAttributes() {
    return {
      color: {
        default: null,
        parseHTML: (element) => element.style.color || null,
        renderHTML: (attributes) => {
          if (!attributes.color) return {};
          return { style: `color: ${attributes.color};` };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        style: 'color',
        getAttrs: (value) => (value ? { color: value } : {}),
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(HTMLAttributes), 0];
  },
});

// ✅ **Tableau Final des Extensions**
export const extensions = [
  StarterKit,
  Underline,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  Highlight,
  Heading.configure({
    levels: [1, 2, 3],
  }),
  Strike,
  Image,
  ResizeImage.configure({
    allowBase64: true,
    inline: true,
  }),

  // 🛠️ Nos extensions personnalisées
  Column,
  ColumnBlock,

  // 🛠️ Extensions de table
  Table.configure({
    resizable: true,
  }),
  TableRow,
  TableHeader,
  CustomTableCell,
  TextColor,
  PDFNode,
  SpinnerNode,
];
