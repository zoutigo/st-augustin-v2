import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FaqCategoriesBoard } from "@/components/dashboard/faq/faq-categories-board";

const pushMock = jest.fn();
const refreshMock = jest.fn();
const backMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
    refresh: refreshMock,
    back: backMock,
  }),
}));

const categories = [
  { id: "cat1", name: "Pastorale", slug: "pastorale" },
  { id: "cat2", name: "Garderie", slug: "garderie" },
];

beforeAll(() => {
  class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  // @ts-ignore
  global.ResizeObserver = ResizeObserver;
  // @ts-ignore
  window.matchMedia =
    window.matchMedia ||
    function () {
      return {
        matches: false,
        addListener() {},
        removeListener() {},
        addEventListener() {},
        removeEventListener() {},
        dispatchEvent() {
          return false;
        },
      };
    };
});

describe("FaqCategoriesBoard", () => {
  beforeEach(() => {
    pushMock.mockClear();
    refreshMock.mockClear();
    backMock.mockClear();
    (global as any).fetch = jest.fn((url: string, options?: RequestInit) => {
      const method = options?.method?.toUpperCase();
      if (method === "DELETE") {
        return Promise.resolve({ ok: true, json: async () => ({}) });
      }
      if (method === "POST") {
        return Promise.resolve({
          ok: true,
          json: async () => ({ success: true }),
        });
      }
      return Promise.resolve({ ok: true, json: async () => categories });
    });
  });

  it("affiche la liste et le bouton retour", () => {
    render(<FaqCategoriesBoard categories={categories} />);
    expect(screen.getByText("FAQ Catégories")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /retour/i })).toBeInTheDocument();
    expect(screen.getByText("Pastorale")).toBeInTheDocument();
  });

  it("ouvre la modale de suppression et appelle l'API", async () => {
    render(<FaqCategoriesBoard categories={categories} />);
    const deleteBtn = screen.getAllByLabelText(/supprimer la catégorie/i)[0];
    fireEvent.click(deleteBtn);
    const confirm = await screen.findByRole("button", { name: /confirmer/i });
    fireEvent.click(confirm);
    await waitFor(() => {
      expect((global as any).fetch).toHaveBeenCalledWith(
        "/api/faq-categories/cat1",
        { method: "DELETE" },
      );
    });
  });

  it("soumet le formulaire et redirige", async () => {
    render(<FaqCategoriesBoard categories={categories} />);
    const inputs = screen.getAllByRole("textbox");
    fireEvent.change(inputs[0], { target: { value: "Nouvelle" } });
    fireEvent.change(inputs[1], { target: { value: "nouvelle" } });
    fireEvent.click(screen.getByRole("button", { name: /ajouter/i }));
    await waitFor(() => {
      expect((global as any).fetch).toHaveBeenCalledWith(
        "/api/faq-categories",
        expect.objectContaining({ method: "POST" }),
      );
      expect(pushMock).toHaveBeenCalledWith(
        "/espace-prive/dashboard/faq-categories",
      );
    });
  });

  it("bouton edit contient le bon lien", () => {
    render(<FaqCategoriesBoard categories={categories} />);
    const editLink = screen
      .getAllByLabelText(/modifier la catégorie/i)[0]
      .closest("a");
    expect(editLink).toHaveAttribute(
      "href",
      "/espace-prive/dashboard/faq-categories/cat1/edit",
    );
  });

  it("clic sur retour utilise le router", () => {
    render(<FaqCategoriesBoard categories={categories} />);
    const backButton = screen.getByRole("button", { name: /retour/i });
    fireEvent.click(backButton);
    expect(pushMock).toHaveBeenCalledWith("/espace-prive/dashboard");
  });
});
