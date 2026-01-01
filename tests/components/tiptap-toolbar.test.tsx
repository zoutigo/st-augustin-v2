import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { Editor } from "@tiptap/react";
import { extensions } from "@/components/tiptap/extensions";
import TextFormattingButtons from "@/components/tiptap/text-formatting-buttons";

jest.mock("tiptap-extension-resize-image", () => ({
  __esModule: true,
  default: {
    configure: () => ({ name: "resizeImage" }),
  },
}));

beforeAll(() => {
  Element.prototype.getClientRects = () =>
    ({
      length: 1,
      item: () => null,
      0: {
        width: 0,
        height: 0,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
    }) as unknown as DOMRectList;
  Element.prototype.getBoundingClientRect = () =>
    ({
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    }) as DOMRect;
});

const makeEditor = (content = "<p>Texte test</p>") =>
  (() => {
    const instance = new Editor({
      extensions,
      content,
    });
    // Neutralise les effets DOM liés au focus/scroll dans jsdom
    // note: scrollToSelection is optional; guard before patching
    const originalChain = instance.chain.bind(instance);
    instance.chain = () => {
      const chain = originalChain();
      return {
        ...chain,
        focus: () => chain,
      };
    };
    if (instance.view && "scrollToSelection" in instance.view) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      instance.view.scrollToSelection = () => {};
    }
    return instance;
  })();

const selectAllText = (editor: Editor) => {
  const size = editor.state.doc.content.size;
  editor.commands.setTextSelection({ from: 1, to: size - 1 });
};

const renderToolbar = (editor: Editor) =>
  render(
    <TextFormattingButtons
      editor={editor}
      handleButtonClick={(command) => command()}
    />,
  );

describe("Toolbar Tiptap - Text formatting", () => {
  it("applique le gras", async () => {
    const user = userEvent.setup();
    const editor = makeEditor("<p>Bonjour</p>");
    renderToolbar(editor);
    selectAllText(editor);
    await user.click(screen.getByLabelText(/Gras/i));
    expect(editor.getHTML()).toMatch(/<strong>Bonjour<\/strong>/i);
  });

  it("applique l'italique", async () => {
    const user = userEvent.setup();
    const editor = makeEditor("<p>Bonjour</p>");
    renderToolbar(editor);
    selectAllText(editor);
    await user.click(screen.getByLabelText(/Italique/i));
    expect(editor.getHTML()).toMatch(/<em>Bonjour<\/em>/i);
  });

  it("applique le souligné", async () => {
    const user = userEvent.setup();
    const editor = makeEditor("<p>Bonjour</p>");
    renderToolbar(editor);
    selectAllText(editor);
    await user.click(screen.getByLabelText(/Souligner/i));
    expect(editor.getHTML()).toMatch(/<u>Bonjour<\/u>/i);
  });

  it("applique un titre H1 puis revient au paragraphe", async () => {
    const user = userEvent.setup();
    const editor = makeEditor("<p>Titre</p>");
    renderToolbar(editor);
    selectAllText(editor);
    await user.click(screen.getByLabelText(/Titre H1/i));
    expect(editor.getHTML()).toMatch(/<h1>Titre<\/h1>/i);
    await user.click(screen.getByLabelText(/Paragraphe/i));
    expect(editor.getHTML()).toMatch(/<p>Titre<\/p>/i);
  });

  it("applique une liste ordonnée", async () => {
    const user = userEvent.setup();
    const editor = makeEditor("<p>Item</p>");
    renderToolbar(editor);
    selectAllText(editor);
    await user.click(screen.getByLabelText(/Liste ordonnée/i));
    expect(editor.getHTML()).toMatch(/<ol><li><p>Item<\/p><\/li><\/ol>/i);
  });

  it("applique l'alignement centré", async () => {
    const user = userEvent.setup();
    const editor = makeEditor("<p>Centré</p>");
    renderToolbar(editor);
    selectAllText(editor);
    await user.click(screen.getByLabelText(/Aligner au centre/i));
    expect(editor.getHTML()).toMatch(/style="text-align: center"/i);
  });

  it("applique une couleur de texte et peut la retirer", async () => {
    const user = userEvent.setup();
    const editor = makeEditor("<p>Coloré</p>");
    const { container } = renderToolbar(editor);
    selectAllText(editor);
    const colorButton = container.querySelector(
      'button[aria-label="Couleur #FF5733"]',
    );
    if (!colorButton) throw new Error("Bouton couleur non trouvé");
    await user.click(colorButton);
    expect(editor.getHTML()).toMatch(/color:\s?#FF5733/i);

    await user.click(screen.getByLabelText(/Effacer la couleur du texte/i));
    expect(editor.getHTML()).not.toMatch(/color:\s?#FF5733/i);
  });

  it("augmente puis réduit la taille du texte", async () => {
    const user = userEvent.setup();
    const editor = makeEditor("<p>Taille</p>");
    renderToolbar(editor);
    selectAllText(editor);
    await user.click(screen.getByLabelText(/Augmenter la taille du texte/i));
    expect(editor.getHTML()).toMatch(/font-size:\s?18px/i);
    await user.click(screen.getByLabelText(/Diminuer la taille du texte/i));
    expect(editor.getHTML()).toMatch(/font-size:\s?16px/i);
  });
});
