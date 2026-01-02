import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { ActionIconButton } from "@/components/ui/action-icon-button";

describe("ActionIconButton", () => {
  it("rend un bouton delete avec style destructif", () => {
    render(<ActionIconButton type="delete" aria-label="delete" />);
    const btn = screen.getByLabelText("delete");
    expect(btn).toHaveClass("bg-red-500");
  });

  it("redirige quand href est fourni", async () => {
    render(<ActionIconButton type="view" aria-label="voir" href="/test" />);
    const link = screen.getByRole("link", { name: "voir" });
    expect(link).toHaveAttribute("href", "/test");
  });
});
