import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FooterCopyrigths } from "@/components/footer/footer-copyrigths";

jest.mock("next/link", () => {
  return ({ href, children, ...rest }: any) => (
    <a href={typeof href === "string" ? href : href?.pathname} {...rest}>
      {children}
    </a>
  );
});

describe("Footer links navigation", () => {
  beforeEach(() => {
    // Reset jsdom location between tests
    window.history.pushState({}, "", "http://localhost/");
  });

  it("navigates to mentions légales", () => {
    render(<FooterCopyrigths />);
    const link = screen.getByRole("link", { name: /mentions légales/i });
    fireEvent.click(link);
    expect(link).toHaveAttribute("href", "/mentions-legales");
  });

  it("navigates to politique de confidentialité", () => {
    render(<FooterCopyrigths />);
    const link = screen.getByRole("link", {
      name: /politique de confidentialité/i,
    });
    fireEvent.click(link);
    expect(link).toHaveAttribute("href", "/politique-de-confidentialite");
  });
});
