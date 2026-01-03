import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PrivacyPolicyPage from "@/app/politique-de-confidentialite/page";
import defaultInfo from "@/lib/data/info-site.json";

jest.mock("next/navigation", () => ({
  usePathname: () => "/politique-de-confidentialite",
}));

jest.mock("@/data/infosite", () => ({
  getInfoSiteOrFallback: jest.fn(async () => defaultInfo),
}));

describe("Page /politique-de-confidentialite", () => {
  it("affiche le héros et l'adresse email de contact", async () => {
    const ui = await PrivacyPolicyPage();
    render(ui as JSX.Element);

    expect(
      screen.getByText(/nous protégeons vos données/i),
    ).toBeInTheDocument();
    const mailLink = screen.getAllByRole("link", {
      name: /ogec\.cremieu@wanadoo\.fr/i,
    })[0];
    expect(mailLink).toHaveAttribute("href", "mailto:ogec.cremieu@wanadoo.fr");
  });

  it("détaille les sections principales", async () => {
    const ui = await PrivacyPolicyPage();
    render(ui as JSX.Element);

    const sections = [
      /responsable du traitement/i,
      /données collectées/i,
      /méthodes de collecte/i,
      /finalités du traitement/i,
      /authentification via services tiers/i,
      /durée de conservation/i,
      /sécurité des données/i,
      /droits des utilisateurs/i,
      /suppression des données/i,
    ];

    sections.forEach((section) => {
      expect(screen.getAllByText(section)[0]).toBeInTheDocument();
    });
  });
});
