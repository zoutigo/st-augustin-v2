import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Footer } from "@/components/footer/footer";

jest.mock("next/link", () => {
  return ({ href, children, passHref: _passHref, ...rest }: any) => (
    <a href={typeof href === "string" ? href : href?.pathname} {...rest}>
      {children}
    </a>
  );
});

describe("Footer", () => {
  it("affiche les sections principales du footer", () => {
    render(<Footer />);

    expect(screen.getByText(/nous contacter/i)).toBeInTheDocument();
    expect(screen.getByText(/nos partenaires/i)).toBeInTheDocument();
    // présence de la ligne tag et du sitemap
    expect(
      screen.getByText(/Une école au cœur de Crémieu/i),
    ).toBeInTheDocument();
  });

  it("contient les liens de navigation attendus", () => {
    render(<Footer />);
    const expectedLinks: Array<[RegExp, string]> = [
      [/l'ecole/i, "/ecole"],
      [/vie scolaire/i, "/vie-scolaire"],
      [/blog/i, "/blog"],
      [/classes/i, "/classes"],
      [/petite section/i, "/classes/petite-section"],
      [/cantine/i, "/vie-scolaire/cantine"],
      [/garderie/i, "/vie-scolaire/garderie"],
    ];

    expectedLinks.forEach(([label, href]) => {
      const link = screen
        .getAllByRole("link", { name: label })
        .find((l) => l.getAttribute("href") === href);
      expect(link).toBeTruthy();
    });
  });

  it("affiche les liens contact et partenaires", () => {
    render(<Footer />);

    expect(screen.getByRole("link", { name: /0474907880/i })).toHaveAttribute(
      "href",
      expect.stringMatching(/tel:/i),
    );
    expect(
      screen.getByRole("link", { name: /ogec\.cremieu@wanadoo\.fr/i }),
    ).toHaveAttribute("href", expect.stringMatching(/mailto:/i));

    const sponsors = [
      /paroisse saint martin/i,
      /direction diocésaine/i,
      /fedération des ogec/i,
      /lisaweb/i,
    ];

    sponsors.forEach((s) => {
      expect(screen.getByRole("link", { name: s })).toBeInTheDocument();
    });
  });

  it("respecte la hiérarchie visuelle (logo + tagline + sitemap)", () => {
    const { container } = render(<Footer />);

    const logo = container.querySelector("svg");
    expect(logo).toBeInTheDocument();

    expect(
      screen.getByText(/Une école au cœur de Crémieu/i),
    ).toBeInTheDocument();

    const sitemapHeadings = screen.getAllByRole("heading", { level: 3 });
    expect(sitemapHeadings.length).toBeGreaterThanOrEqual(4);
  });
});
