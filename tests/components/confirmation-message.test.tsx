import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { act } from "react";
import { Toaster } from "@/components/ui/sonner";
import { confirmationMessage } from "@/components/ui/confirmation-message";

beforeAll(() => {
  class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  // @ts-ignore
  global.ResizeObserver = ResizeObserver;
  // @ts-ignore
  window.matchMedia =
    window.matchMedia ||
    function () {
      return {
        matches: false,
        addListener() {},
        removeListener() {},
        addEventListener() {},
        removeEventListener() {},
        dispatchEvent() {
          return false;
        },
      };
    };
});

describe("confirmationMessage", () => {
  it("affiche un toast de succès", async () => {
    render(<Toaster richColors />);
    await act(async () => {
      confirmationMessage.success("Succès", "Opération réussie");
    });
    expect(await screen.findByText("Succès")).toBeInTheDocument();
    expect(screen.getByText("Opération réussie")).toBeInTheDocument();
  });

  it("affiche un toast d'erreur", async () => {
    render(<Toaster richColors />);
    await act(async () => {
      confirmationMessage.error("Erreur", "Détails de l'erreur");
    });
    expect(await screen.findByText("Erreur")).toBeInTheDocument();
    expect(screen.getByText("Détails de l'erreur")).toBeInTheDocument();
  });
});
