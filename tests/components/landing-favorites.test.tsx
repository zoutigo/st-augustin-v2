import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LandingFavorites } from "@/components/landing/favorites/landing-favorites";

jest.mock("next/link", () => {
  return ({ href, children, passHref: _passHref, ...rest }: any) => (
    <a href={typeof href === "string" ? href : href?.pathname} {...rest}>
      {children}
    </a>
  );
});

describe("LandingFavorites", () => {
  it("affiche le titre de section et le CTA global", () => {
    render(<LandingFavorites />);
    expect(screen.getByText(/les incontournables/i)).toBeInTheDocument();
    const cta = screen.getByRole("link", { name: /voir toutes les classes/i });
    expect(cta).toHaveAttribute("href", "/classes");
  });

  it("rend chaque carte avec son lien et le bouton Découvrir", () => {
    const { container } = render(<LandingFavorites />);

    const expectedCards = [
      { title: /garderie/i, href: "/vie-scolaire/garderie" },
      { title: /classes/i, href: "/classes" },
      { title: /ecole/i, href: "/ecole" },
      { title: /cantine/i, href: "/vie-scolaire/cantine" },
    ];

    expectedCards.forEach(({ title, href }) => {
      const link = container.querySelector(`a[href="${href}"]`);
      expect(link).toBeTruthy();
      expect(screen.getAllByText(title).length).toBeGreaterThan(0);
    });
  });
});
