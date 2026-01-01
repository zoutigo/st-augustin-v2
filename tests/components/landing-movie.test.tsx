import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LandingMovie } from "@/components/landing/movie/landing-movie";

jest.mock("next/head", () => ({
  __esModule: true,
  default: () => null,
}));

describe("LandingMovie hero", () => {
  it("cache le texte sur mobile via la classe hidden", () => {
    render(<LandingMovie />);
    const wrapper = screen.getByTestId("landing-movie-texts");
    expect(wrapper).toHaveClass("hidden");
    expect(wrapper).toHaveClass("md:flex");
  });

  it("utilise une taille de texte renforcée sur desktop pour le titre", () => {
    render(<LandingMovie />);
    const title = screen.getByText(/saint augustin/i);
    expect(title).toHaveClass("md:text-[clamp(3rem,6vw,9rem)]");
  });

  it("contient la vidéo d'arrière-plan", () => {
    const { container } = render(<LandingMovie />);
    const video = container.querySelector("video");
    expect(video).toBeInTheDocument();
  });
});
