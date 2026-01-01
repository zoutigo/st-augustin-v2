/* eslint-disable @typescript-eslint/no-explicit-any */
import { Node, mergeAttributes } from "@tiptap/core";
import { NodeType } from "@tiptap/pm/model";
import { Editor } from "@tiptap/react";

// Définir les options spécifiques pour le SpinnerNode
interface SpinnerNodeOptions {
  HTMLAttributes: Record<string, any>;
}

// Étendre les commandes pour inclure celles relatives au SpinnerNode
declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    spinner: {
      /**
       * Ajouter un spinner
       */
      setSpinner: (options: { id: string }) => ReturnType;
      /**
       * Supprimer un spinner
       */
      removeSpinner: (id: string) => ReturnType;
    };
  }
}

export const SpinnerNode = Node.create<SpinnerNodeOptions>({
  name: "spinner",

  group: "block",

  atom: true,

  addOptions() {
    return {
      HTMLAttributes: {
        class: "spinner-wrapper",
      },
    };
  },

  addAttributes() {
    return {
      id: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "div.spinner-wrapper",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      ["div", { class: "spinner-content" }, "⏳ Chargement..."], // Texte ou icône temporaire
    ];
  },

  addCommands() {
    return {
      /**
       * Commande pour ajouter un spinner
       */
      setSpinner:
        (options: { id: string }) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },

      /**
       * Commande pour retirer un spinner
       */
      removeSpinner:
        (id: string) =>
        ({ editor }: { editor: Editor }) => {
          const { state, view } = editor;
          const { tr } = state;

          let removed = false;

          state.doc.descendants((node, pos) => {
            if (node.type.name === "spinner" && node.attrs.id === id) {
              tr.delete(pos, pos + node.nodeSize);
              removed = true;
            }
          });

          if (removed) {
            view.dispatch(tr);
          }

          return removed;
        },
    };
  },
});
