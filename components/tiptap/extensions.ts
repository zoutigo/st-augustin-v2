// extensions.ts

import { Node, mergeAttributes, CommandProps } from '@tiptap/core';

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

const CustomTableCell = TableCell.extend({
  addAttributes() {
    return {
      // extend the existing attributes …
      ...this.parent?.(),

      // and add a new one …
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

export const Column = Node.create({
  name: 'column',

  group: 'block',

  content: 'block+',

  parseHTML() {
    return [
      {
        tag: 'div[data-type="column"]',
      },
    ];
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

export const Columns = Node.create({
  name: 'columns',

  group: 'block',

  content: 'column+',

  parseHTML() {
    return [
      {
        tag: 'div[data-type="columns"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, { 'data-type': 'columns' }),
      0,
    ];
  },

  addCommands() {
    return {
      setColumns:
        () =>
        ({ commands }: CommandProps) => {
          return commands.insertContent({
            type: this.name,
          });
        },
      insertColumns:
        () =>
        ({ commands }: CommandProps) => {
          return commands.insertContent({
            type: 'columns',
            content: [
              {
                type: 'column',
                content: [
                  {
                    type: 'paragraph',
                    content: [
                      {
                        type: 'text',
                        text: 'Column 1 content',
                      },
                    ],
                  },
                ],
              },
              {
                type: 'column',
                content: [
                  {
                    type: 'paragraph',
                    content: [
                      {
                        type: 'text',
                        text: 'Column 2 content',
                      },
                    ],
                  },
                ],
              },
            ],
          });
        },
      deleteColumn:
        () =>
        ({ state, dispatch }: CommandProps) => {
          if (!state || !dispatch) return false;

          const { selection } = state;
          const { $from } = selection;
          const columnPos = $from.before($from.depth);
          const columnNode = state.doc.nodeAt(columnPos);

          if (columnNode && columnNode.type.name === 'column') {
            const tr = state.tr.delete(
              columnPos,
              columnPos + columnNode.nodeSize
            );
            dispatch(tr);
            return true;
          }

          return false;
        },
      deleteColumns:
        () =>
        ({ state, dispatch }: CommandProps) => {
          if (!state || !dispatch) return false;

          const { selection } = state;
          const { $from } = selection;
          const columnsPos = $from.before($from.depth);
          const columnsNode = state.doc.nodeAt(columnsPos);

          if (columnsNode && columnsNode.type.name === 'columns') {
            const tr = state.tr.delete(
              columnsPos,
              columnsPos + columnsNode.nodeSize
            );
            dispatch(tr);
            return true;
          }

          return false;
        },
    };
  },
});

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
  Column,
  Columns,
  Table.configure({
    resizable: true,
  }),
  TableRow,
  TableHeader,
  CustomTableCell,
];
