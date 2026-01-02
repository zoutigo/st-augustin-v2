import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { LandingFaq } from "@/components/landing/faq/landing-faq";

// Évite de charger Tiptap et ses extensions lourdes dans ce contexte
jest.mock("@/components/tiptap/page-content", () => ({
  __esModule: true,
  default: ({ content }: { content: string }) => (
    <div data-testid="page-content">{content}</div>
  ),
}));

// Simplifie la landing pour éviter les hooks Next/React Query dans ModalInfo et LandingPrefetch
jest.mock("@/components/modals/Info-modal", () => ({
  ModalInfo: () => null,
}));
jest.mock("@/components/landing/landing-prefetch", () => ({
  LandingPrefetch: () => null,
}));

const routerMock = {
  push: jest.fn(),
  refresh: jest.fn(),
  prefetch: jest.fn(),
  back: jest.fn(),
};
jest.mock("next/navigation", () => ({
  useRouter: () => routerMock,
}));

jest.mock("@/actions/faq/faqs", () => ({
  getAllFaqs: jest.fn(),
}));

const mockGetAllFaqs = jest.requireMock("@/actions/faq/faqs")
  .getAllFaqs as jest.Mock;

// Polyfills
beforeAll(() => {
  // @ts-ignore
  global.matchMedia =
    global.matchMedia ||
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

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.clearAllMocks();
});

beforeEach(() => {
  jest.useFakeTimers();
});

describe("Landing FAQ section", () => {
  it("rend les FAQ mises en avant avec leur catégorie", async () => {
    jest.useFakeTimers();
    mockGetAllFaqs.mockResolvedValue([
      {
        id: "1",
        question: "Question test",
        answer: "Réponse test",
        isFeatured: true,
        category: { name: "Catégorie test" },
      },
      {
        id: "2",
        question: "Non affichée",
        answer: "Réponse",
        isFeatured: false,
        category: { name: "Brouillon" },
      },
    ]);

    const ui = await LandingFaq();
    render(ui as JSX.Element);

    expect(screen.getByText(/FAQ essentielles/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Catégorie test/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Question test/i)).toBeInTheDocument();
    expect(screen.queryByText(/Non affichée/)).not.toBeInTheDocument();
  });

  it("utilise le fallback quand la requête échoue", async () => {
    mockGetAllFaqs.mockRejectedValue(new Error("fail"));
    const ui = await LandingFaq();
    render(ui as JSX.Element);

    expect(
      screen.getByText(/Comment sont gérées les absences/i),
    ).toBeInTheDocument();
  });
});
