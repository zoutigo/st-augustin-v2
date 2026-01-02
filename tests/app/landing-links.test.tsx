import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Landing } from "@/components/landing/landing";

// Simplify heavy client pieces for testing
jest.mock("@/components/modals/Info-modal", () => ({ ModalInfo: () => null }));
jest.mock("@/components/landing/landing-prefetch", () => ({
  LandingPrefetch: () => null,
}));
jest.mock("@/components/landing/faq/landing-faq", () => ({
  LandingFaq: () => <div data-testid="landing-faq-stub" />,
}));

// Polyfills pour jsdom
beforeAll(() => {
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

const expectLinkHref = (nameRegex: RegExp, href: string) => {
  const link = screen.getByRole("link", { name: nameRegex });
  expect(link).toHaveAttribute("href", href);
  fireEvent.click(link);
};

const expectLinkHrefByHref = (href: string) => {
  const link = document.querySelector(`a[href="${href}"]`) as HTMLAnchorElement;
  expect(link).toBeInTheDocument();
  fireEvent.click(link);
};

describe("Landing links", () => {
  it("toutes les cartes Discovery pointent vers les bonnes routes", () => {
    render(<Landing />);

    expectLinkHref(/notre école/i, "/ecole");
    expectLinkHref(/infrastructures/i, "/ecole/infrastructures");
    expectLinkHref(/histoire/i, "/ecole/histoire");
  });

  it("les cartes Favorites renvoient vers des routes valides", () => {
    render(<Landing />);

    expectLinkHrefByHref("/vie-scolaire/garderie");
    expectLinkHrefByHref("/classes");
    expectLinkHrefByHref("/ecole");
    expectLinkHrefByHref("/vie-scolaire/cantine");
    expectLinkHref(/voir toutes les classes/i, "/classes");
  });

  it("le CTA blog de l'activité mène vers le blog", () => {
    render(<Landing />);
    expectLinkHref(/visiter le blog/i, "/blog");
  });
});
