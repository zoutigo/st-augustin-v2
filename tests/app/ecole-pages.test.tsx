import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import EcolePage from "@/app/ecole/page";
import HistoirePage from "@/app/ecole/histoire/page";
import InfrastructuresPage from "@/app/ecole/infrastructures/page";
import ProjetsPage from "@/app/ecole/projets/page";
import EquipePage from "@/app/ecole/equipe/page";
import InscriptionsPage from "@/app/ecole/inscriptions/page";
import Loading from "@/app/ecole/loading";
import NotFound from "@/app/ecole/not-found";

jest.mock("@/components/tiptap/page-content", () => ({
  __esModule: true,
  default: ({ content }: { content: string }) => (
    <div>{content.replace(/<[^>]+>/g, "")}</div>
  ),
}));

jest.mock("next/navigation", () => ({
  usePathname: () => "/ecole",
}));

jest.mock("@/actions/pages/get", () => ({
  getPageBySlug: jest.fn(),
}));

const mockGetPageBySlug = jest.requireMock("@/actions/pages/get")
  .getPageBySlug as jest.Mock;

const successContent = (text: string) => ({ content: `<p>${text}</p>` });

describe("Pages Ecole (SSR/ISR)", () => {
  beforeEach(() => {
    mockGetPageBySlug.mockReset();
  });

  const pages = [
    { name: "ecole-histoire", Component: HistoirePage },
    { name: "ecole-infrastructures", Component: InfrastructuresPage },
    { name: "ecole-projets", Component: ProjetsPage },
    { name: "ecole-equipe", Component: EquipePage },
    { name: "ecole-inscriptions", Component: InscriptionsPage },
  ];

  pages.forEach(({ name, Component }) => {
    it(`rend le contenu pour ${name}`, async () => {
      mockGetPageBySlug.mockResolvedValueOnce(
        successContent(`Contenu ${name}`),
      );
      const ui = await Component();
      render(ui as JSX.Element);
      expect(
        screen.getByText(new RegExp(`Contenu ${name}`, "i")),
      ).toBeInTheDocument();
    });
  });

  it("affiche les cartes de la page ecole", async () => {
    mockGetPageBySlug.mockResolvedValueOnce(successContent("Contenu ecole"));
    const ui = await EcolePage();
    render(ui as JSX.Element);
    expect(mockGetPageBySlug).toHaveBeenCalledWith("ecole");
    expect(screen.getByText(/INSCRIPTIONS/i)).toBeInTheDocument();
    expect(screen.getByText(/EQUIPE/i)).toBeInTheDocument();
  });

  it("affiche le fallback not found en cas d'erreur", async () => {
    mockGetPageBySlug.mockResolvedValueOnce({ error: "not found" });
    const ui = await HistoirePage();
    render(ui as JSX.Element);
    expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
  });
});

describe("Fallbacks Ecole", () => {
  it("affiche le skeleton de chargement", () => {
    const { container } = render(<Loading />);
    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
  });

  it("affiche la page not-found locale", () => {
    render(<NotFound />);
    expect(screen.getByText(/Page non trouvée/i)).toBeInTheDocument();
    const homeLink = screen.getByRole("link", { name: /retour à l'accueil/i });
    expect(homeLink).toHaveAttribute("href", "/");
  });
});
