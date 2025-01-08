import '@tiptap/core';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    /**
     * Applique une couleur à une colonne.
     */
    setColumnColor: (color: string) => ReturnType;

    /**
     * Insère un bloc de colonnes.
     */
    insertColumnBlock: () => ReturnType;

    /**
     * Supprime une colonne.
     */
    deleteColumn: () => ReturnType;

    /**
     * Supprime un bloc de colonnes.
     */
    deleteColumnBlock: () => ReturnType;
    /**
     * Applique une couleur à un bloc de colonnes.
     */
    setColumnBlockColor: (color: string) => ReturnType;
  }
}
