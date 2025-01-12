declare module 'draft-js' {
  import { ComponentType } from 'react';

  export class EditorState {
    static createEmpty(): EditorState;
    static createWithContent(contentState: ContentState): EditorState;
    getCurrentContent(): ContentState;
  }

  export class ContentState {
    static createFromText(text: string): ContentState;
  }

  export class Editor extends ComponentType<{
    editorState: EditorState;
    onChange: (editorState: EditorState) => void;
    handleKeyCommand?: (
      command: string,
      editorState: EditorState
    ) => 'handled' | 'not-handled';
    placeholder?: string;
  }> {}

  export class RichUtils {
    static handleKeyCommand(
      editorState: EditorState,
      command: string
    ): EditorState | null;
    static toggleInlineStyle(
      editorState: EditorState,
      style: string
    ): EditorState;
  }

  export function convertToRaw(contentState: ContentState): object;
  export function convertFromRaw(rawState: object): ContentState;
}
