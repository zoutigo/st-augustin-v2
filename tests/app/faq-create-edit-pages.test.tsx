import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock("next/navigation", () => {
  const actual = jest.requireActual("next/navigation");
  return {
    ...actual,
    redirect: jest.fn(),
    useRouter: () => ({
      push: jest.fn(),
      back: jest.fn(),
      refresh: jest.fn(),
    }),
  };
});

jest.mock("@/actions/faq/categories", () => ({
  getAllFaqCategories: jest
    .fn()
    .mockResolvedValue([
      { id: "cat1", name: "Vie scolaire", slug: "vie-scolaire" },
    ]),
}));

jest.mock("@/actions/faq/faqs", () => ({
  getAllFaqs: jest.fn().mockResolvedValue([
    {
      id: "faq1",
      question: "Question existante",
      answer: "Réponse existante",
      categoryId: "cat1",
      category: { name: "Vie scolaire" },
      isFeatured: false,
    },
  ]),
}));

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

describe("Pages create/edit FAQ", () => {
  beforeEach(() => {
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: async () => ({ success: true }),
      }),
    );
  });

  it("affiche la page de création avec le bouton retour", async () => {
    const Page = (await import("@/app/espace-prive/dashboard/faq/create/page"))
      .default;
    const ui = await Page();
    render(ui);
    expect(
      screen.getByRole("heading", { name: /Ajouter une FAQ/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Retour/i })).toBeInTheDocument();
  });

  it("affiche la page d'édition avec le bouton retour et les valeurs", async () => {
    const Page = (
      await import("@/app/espace-prive/dashboard/faq/[id]/edit/page")
    ).default;
    const ui = await Page({ params: { id: "faq1" } });
    render(ui);
    expect(
      screen.getByRole("heading", { name: /Modifier la FAQ/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Retour/i })).toBeInTheDocument();
    expect(screen.getByDisplayValue("Question existante")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Réponse existante")).toBeInTheDocument();
  });
});
