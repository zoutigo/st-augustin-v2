import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { LandingMessage } from "@/components/landing/message/landing-message";

describe("LandingMessage hero", () => {
  it("utilise une taille réduite sur mobile et grandit sur desktop", () => {
    render(<LandingMessage />);
    const title = screen.getByTestId("landing-welcome-title");
    expect(title).toHaveClass("text-3xl");
    expect(title).toHaveClass("md:text-4xl");
  });

  it("réduit le padding vertical sur mobile", () => {
    render(<LandingMessage />);
    const container = titleContainer();
    const section = container.closest("section");
    expect(section).toHaveClass("py-10");
    expect(section).toHaveClass("md:py-14");
  });

  it("affiche un bouton pour fermer le mot du principal", async () => {
    const user = userEvent.setup();
    render(<LandingMessage />);

    const openBtn = screen.getByRole("button", { name: /lire le message/i });
    expect(openBtn).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /fermer le mot du principal/i }),
    ).not.toBeInTheDocument();

    await user.click(openBtn);

    const closeBtn = screen.getByRole("button", {
      name: /fermer le mot du principal/i,
    });
    expect(closeBtn).toBeInTheDocument();

    await user.click(closeBtn);
    expect(
      screen.queryByText(/Bienveillance et entraide/i),
    ).not.toBeInTheDocument();
  });

  it("ouvre et ferme le bloc de message en affichant/masquant le contenu", async () => {
    const user = userEvent.setup();
    render(<LandingMessage />);

    // Fermé par défaut
    expect(
      screen.queryByText(/Bienveillance et entraide/i),
    ).not.toBeInTheDocument();

    // Ouverture
    await user.click(screen.getByRole("button", { name: /lire le message/i }));
    expect(screen.getByText(/Bienveillance et entraide/i)).toBeInTheDocument();
    expect(screen.getByText(/Kelly GROSJEAN/i)).toBeInTheDocument();

    // Fermeture
    await user.click(
      screen.getByRole("button", { name: /fermer le mot du principal/i }),
    );
    expect(
      screen.queryByText(/Bienveillance et entraide/i),
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/La directrice/i)).not.toBeInTheDocument();
  });
});

function titleContainer() {
  return screen.getByTestId("landing-welcome-title");
}
