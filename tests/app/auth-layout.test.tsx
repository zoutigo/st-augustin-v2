import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AuthLayout from "@/app/auth/layout";

describe("AuthLayout", () => {
  it("applique un conteneur pleine largeur avec min-h-screen", () => {
    render(
      <AuthLayout>
        <div data-testid="content">hello</div>
      </AuthLayout>,
    );

    const outer = screen.getByTestId("content").parentElement?.parentElement;
    expect(outer?.className).toMatch(/min-h-screen/);
    expect(outer?.className).toMatch(/items-start/);
  });
});
