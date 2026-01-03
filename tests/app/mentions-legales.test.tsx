import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LegalNoticePage from "@/app/mentions-legales/page";
import defaultInfo from "@/lib/data/info-site.json";

jest.mock("next/navigation", () => ({
  usePathname: () => "/mentions-legales",
}));

jest.mock("@/data/infosite", () => ({
  getInfoSiteOrFallback: jest.fn(async () => defaultInfo),
}));

describe("Page /mentions-legales", () => {
  it("affiche les blocs légaux et les coordonnées", async () => {
    const ui = await LegalNoticePage();
    render(ui as JSX.Element);

    expect(screen.getByText(/transparence et confiance/i)).toBeInTheDocument();

    expect(
      screen.getByText(/Établissement d’enseignement privé sous contrat/i),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: /ogec\.cremieu@wanadoo\.fr/i }),
    ).toHaveAttribute("href", "mailto:ogec.cremieu@wanadoo.fr");

    expect(screen.getByText(/kelly grosjean/i)).toBeInTheDocument();
    expect(screen.getAllByText(/o2switch/i)[0]).toBeInTheDocument();
  });

  it("propose un lien vers la politique de confidentialité", async () => {
    const ui = await LegalNoticePage();
    render(ui as JSX.Element);
    const link = screen.getByRole("link", {
      name: /politique de confidentialité/i,
    });
    expect(link).toHaveAttribute("href", "/politique-de-confidentialite");
  });
});
