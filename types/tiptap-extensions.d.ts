import '@tiptap/core';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    insertColumns: () => ReturnType;
    deleteColumn: () => ReturnType;
    deleteColumns: () => ReturnType;
  }
}
