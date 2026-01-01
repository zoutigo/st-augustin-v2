import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LandingStats } from "@/components/landing/stats/landing-stats";

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt }: any) => <div role="img" aria-label={alt} />,
}));

describe("LandingStats badges", () => {
  it("rend les quatre stats avec leurs formes dédiées", () => {
    render(<LandingStats />);

    const expected = ["élèves", "familles", "enseignants", "classes"];

    expected.forEach((label) => {
      const matches = screen.getAllByText(new RegExp(label, "i"));
      expect(matches.length).toBeGreaterThan(0);
    });
  });

  it("affiche les valeurs chiffrées attendues", () => {
    render(<LandingStats />);
    ["220", "100", "10"].forEach((count) => {
      expect(screen.getAllByText(count).length).toBeGreaterThan(0);
    });
  });
});
