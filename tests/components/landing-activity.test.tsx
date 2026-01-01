import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LandingActivity } from "@/components/landing/activity/landing-activity";

jest.mock("next/link", () => {
  return ({ href, children, passHref: _passHref, ...rest }: any) => (
    <a href={typeof href === "string" ? href : href?.pathname} {...rest}>
      {children}
    </a>
  );
});

describe("LandingActivity", () => {
  it("affiche le titre de section et le CTA principal", () => {
    render(<LandingActivity />);
    expect(
      screen.getByRole("heading", { name: /restez connectés à l'activité/i }),
    ).toBeInTheDocument();
    const cta = screen.getByRole("link", { name: /visiter le blog/i });
    expect(cta).toHaveAttribute("href", "/blog");
  });

  it("rend les cartes de liens rapides avec les bonnes destinations", () => {
    const { container } = render(<LandingActivity />);
    // Carte retirées -> seul le CTA blog reste
    const blogLink = container.querySelector(`a[href="/blog"]`);
    expect(blogLink).toBeTruthy();
  });
});
