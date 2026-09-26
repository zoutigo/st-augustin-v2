// Régression : le contenu du dashboard admin était masqué sous la navbar
// fixe (fixed top-0, hauteur 14vh) faute de padding-top compensatoire,
// contrairement à PageHolder utilisé sur les pages publiques.

import { render, screen } from "@testing-library/react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

describe("DashboardShell", () => {
  it("compense la navbar fixe avec un padding-top suffisant", () => {
    render(
      <DashboardShell>
        <p>Contenu</p>
      </DashboardShell>,
    );

    const heading = screen.getByRole("heading", { name: "Tableau de bord" });
    const container = heading.closest(".dashboard-typography");

    expect(container).not.toBeNull();
    expect(container?.className).toMatch(/pt-\[14vh\]/);
    expect(container?.className).toMatch(/md:pt-\[16vh\]/);
  });
});
