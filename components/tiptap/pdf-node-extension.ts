/* eslint-disable @typescript-eslint/no-explicit-any */
import { Node, mergeAttributes } from '@tiptap/core';

export interface PDFNodeOptions {
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    pdf: {
      /**
       * Insert a PDF into the editor
       */
      setPDF: (options: { src: string }) => ReturnType;
    };
  }
}

export const PDFNode = Node.create<PDFNodeOptions>({
  name: 'pdf',

  group: 'block',

  atom: true,

  addOptions() {
    return {
      HTMLAttributes: {
        class: 'pdf-wrapper',
      },
    };
  },

  addAttributes() {
    return {
      src: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'iframe[src]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(this.options.HTMLAttributes, { class: 'pdf-container' }),
      ['iframe', mergeAttributes(HTMLAttributes, { frameborder: 0 })],
    ];
  },

  addCommands() {
    return {
      setPDF:
        (options: { src: string }) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },
});
