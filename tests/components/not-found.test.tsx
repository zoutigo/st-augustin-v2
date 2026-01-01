import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import NotFound from "@/app/not-found";

const originalLocation = window.location;

jest.mock("next/link", () => {
  return ({ href, children, passHref: _passHref, ...rest }: any) => {
    const targetHref = typeof href === "string" ? href : href?.pathname;
    return (
      <a
        href={targetHref}
        {...rest}
        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
          e.preventDefault();
          window.location.href = targetHref;
          rest?.onClick?.(e);
        }}
      >
        {children}
      </a>
    );
  };
});

describe("Page 404 personnalisée", () => {
  beforeAll(() => {
    // Permettre de contrôler location.href et location.assign dans JSDOM
    delete (window as any).location;
    (window as any).location = {
      ...originalLocation,
      href: "http://localhost/",
      assign: function (url: string) {
        this.href = url;
      },
    };
  });

  afterAll(() => {
    (window as any).location = originalLocation;
  });

  afterEach(() => {
    (window as any).location.href = "http://localhost/";
  });

  it("affiche le composant 404 quand une page est introuvable", () => {
    render(<NotFound />);

    expect(
      screen.getByText(/Cette page n'a pas encore rejoint la cour de récré/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /retour à l'accueil/i }),
    ).toBeInTheDocument();
  });

  it("redige correctement via les boutons principaux", async () => {
    const user = userEvent.setup();
    render(<NotFound />);

    const accueilBtn = screen.getByRole("button", {
      name: /retour à l'accueil/i,
    });
    const classesBtn = screen.getByRole("button", {
      name: /voir les classes/i,
    });

    await user.click(accueilBtn);
    expect(window.location.href).toMatch(/\/$/);

    await user.click(classesBtn);
    expect(window.location.href).toMatch(/\/classes$/);
  });

  it("les liens rapides pointent vers les bonnes pages et réagissent au clic", async () => {
    const user = userEvent.setup();
    render(<NotFound />);

    const quickLinks: Array<[RegExp, RegExp]> = [
      [/vie scolaire/i, /\/vie-scolaire$/],
      [/cantine/i, /\/vie-scolaire\/cantine$/],
      [/l'école/i, /\/ecole$/],
      [/blog/i, /\/blog$/],
      [/classes/i, /\/classes$/],
      [/nous contacter/i, /\/ecole\/inscriptions$/],
    ];

    for (const [labelRegex, hrefRegex] of quickLinks) {
      const candidates = screen.getAllByRole("link", { name: labelRegex });
      const link = candidates.find((c) =>
        hrefRegex.test(c.getAttribute("href") || ""),
      );
      expect(link).toBeDefined();
      expect(link).toHaveAttribute("href", expect.stringMatching(hrefRegex));

      await user.click(link!);
      expect(window.location.href).toMatch(hrefRegex);
    }
  });
});
