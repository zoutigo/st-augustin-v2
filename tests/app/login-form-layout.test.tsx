import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginPage from "@/app/auth/login/page";
import { LoginForm } from "@/components/auth/login-form";

jest.mock("next/navigation", () => ({
  usePathname: () => "/auth/login",
  useSearchParams: () => new URLSearchParams(""),
}));

describe("Login UI layout", () => {
  it("affiche le bloc de connexion et les boutons sociaux", () => {
    render(<LoginForm />);
    expect(screen.getByTestId("login-section")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /choisissez votre méthode/i }),
    ).toBeInTheDocument();
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThanOrEqual(2);
    buttons.slice(0, 2).forEach((btn) => {
      expect(btn.className).toMatch(/w-full/);
    });
  });

  it("rend la page /auth/login avec la même UI", () => {
    const ui = LoginPage();
    render(ui as JSX.Element);
    expect(
      screen.getByRole("heading", { name: /authentifiez-vous en un clic/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /choisissez votre méthode/i }),
    ).toBeInTheDocument();
  });
});
