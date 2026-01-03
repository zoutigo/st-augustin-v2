import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import DataDeletionPage from "@/app/suppression-des-donnees/page";
import defaultInfo from "@/lib/data/info-site.json";

jest.mock("next/navigation", () => ({
  usePathname: () => "/suppression-des-donnees",
}));

jest.mock("@/data/infosite", () => ({
  getInfoSiteOrFallback: jest.fn(async () => defaultInfo),
}));

describe("Page /suppression-des-donnees", () => {
  it("affiche la procédure de suppression et l'email de contact", async () => {
    const ui = await DataDeletionPage();
    render(ui as JSX.Element);

    expect(screen.getByText(/maîtrisez vos données/i)).toBeInTheDocument();

    const mailLink = screen.getByRole("link", {
      name: /ogec\.cremieu@wanadoo\.fr/i,
    });
    expect(mailLink).toHaveAttribute("href", "mailto:ogec.cremieu@wanadoo.fr");

    expect(
      screen.getAllByText(/demande de suppression/i)[0],
    ).toBeInTheDocument();
    expect(screen.getAllByText(/données concernées/i)[0]).toBeInTheDocument();
  });
});
