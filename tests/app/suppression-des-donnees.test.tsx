import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import DataDeletionPage from "@/app/suppression-des-donnees/page";

jest.mock("next/navigation", () => ({
  usePathname: () => "/suppression-des-donnees",
}));

describe("Page /suppression-des-donnees", () => {
  it("affiche la procédure de suppression et l'email de contact", () => {
    render(<DataDeletionPage />);

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
