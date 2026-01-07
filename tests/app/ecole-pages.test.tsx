import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import EcolePage from "@/app/ecole/page";
import HistoirePage, {
  metadata as histoireMetadata,
} from "@/app/ecole/histoire/page";
import InfrastructuresPage from "@/app/ecole/infrastructures/page";
import ProjetsPage, {
  metadata as projetsMetadata,
} from "@/app/ecole/projets/page";
import EquipePage, {
  metadata as equipeMetadata,
} from "@/app/ecole/equipe/page";
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

  it("render Histoire page SSR with metadata", () => {
    render(<HistoirePage />);
    expect(screen.getByText(/Histoire de l'école/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Une école chrétienne, héritière/i),
    ).toBeInTheDocument();
    expect(histoireMetadata.alternates?.canonical).toBe("/ecole/histoire");
  });

  it("render Projets page SSR with metadata", () => {
    render(<ProjetsPage />);
    expect(screen.getByText(/Une école ouverte à tous/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Projet pastoral/i, level: 3 }),
    ).toBeInTheDocument();
    expect(projetsMetadata.alternates?.canonical).toBe("/ecole/projets");
  });

  it("render Équipe page SSR with metadata", () => {
    render(<EquipePage />);
    expect(screen.getByText(/Équipe pédagogique/i)).toBeInTheDocument();
    expect(screen.getByText(/Équipe enseignante/i)).toBeInTheDocument();
    expect(equipeMetadata.alternates?.canonical).toBe("/ecole/equipe");
  });

  it("rend le contenu dynamique pour ecole-infrastructures", async () => {
    mockGetPageBySlug.mockResolvedValueOnce(
      successContent("Contenu ecole-infrastructures"),
    );
    const ui = await InfrastructuresPage();
    render(ui as JSX.Element);
    expect(
      screen.getByText(/Contenu ecole-infrastructures/i),
    ).toBeInTheDocument();
  });

  it("rend le contenu dynamique pour ecole-inscriptions", async () => {
    mockGetPageBySlug.mockResolvedValueOnce(
      successContent("Contenu ecole-inscriptions"),
    );
    const ui = await InscriptionsPage();
    render(ui as JSX.Element);
    expect(screen.getByText(/Contenu ecole-inscriptions/i)).toBeInTheDocument();
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
    const ui = await InfrastructuresPage();
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
