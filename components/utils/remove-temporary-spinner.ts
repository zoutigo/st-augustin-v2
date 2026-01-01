/* eslint-disable @typescript-eslint/no-explicit-any */
export const removeTemporarySpinner = (editor: any, tempSpinnerId: string) => {
  editor
    .chain()
    .focus()
    .setNode("paragraph", { content: "" }) // Remplace le spinner par un paragraphe vide
    .run();
};
