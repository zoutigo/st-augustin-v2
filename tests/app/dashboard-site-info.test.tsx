import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { Toaster } from "@/components/ui/sonner";
import SiteInfoPage from "@/app/espace-prive/dashboard/site-info/page";
import { SitePanel } from "@/components/dashboard/site/site-panel";

jest.mock("@/data/infosite", () => ({
  getInfoSite: jest.fn(),
}));

jest.mock("@/actions/infosite", () => ({
  upsertInfoSite: jest.fn(),
}));

const mockGetInfoSite = jest.requireMock("@/data/infosite")
  .getInfoSite as jest.Mock;
const mockUpsertInfoSite = jest.requireMock("@/actions/infosite")
  .upsertInfoSite as jest.Mock;

const pushMock = jest.fn();
const refreshMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock, refresh: refreshMock }),
}));

const sampleInfo = {
  siteName: "École Saint-Augustin",
  email: "contact@augustin.fr",
  address: "12 rue des Ecoles",
  city: "Crémieu",
  postalCode: "38460",
  country: "France",
  phone: "0474000000",
  responsible: "Jean Dupont",
};

const renderWithToaster = (ui: React.ReactNode) =>
  render(
    <>
      <Toaster position="top-right" />
      {ui}
    </>,
  );

describe("Dashboard /espace-prive/dashboard/site-info", () => {
  beforeEach(() => {
    jest.clearAllMocks();
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

  it("affiche les informations actuelles et ouvre le formulaire", async () => {
    mockGetInfoSite.mockResolvedValue(sampleInfo);
    const ui = await SiteInfoPage();
    renderWithToaster(ui as JSX.Element);

    const backBtn = screen.getByRole("button", { name: /retour/i });
    expect(backBtn.closest("a")).toHaveAttribute(
      "href",
      "/espace-prive/dashboard",
    );

    expect(
      screen.getByRole("heading", { name: /coordonnées & contact/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(sampleInfo.siteName)).toBeInTheDocument();
    expect(screen.getByText(sampleInfo.email)).toBeInTheDocument();

    const toggleButton = screen.getByRole("button", { name: /ouvrir/i });
    fireEvent.click(toggleButton);

    expect(await screen.findByLabelText(/nom du site/i)).toBeInTheDocument();
  });

  it("affiche les erreurs de validation zod quand les champs sont vides", async () => {
    renderWithToaster(<SitePanel info={null} />);

    fireEvent.click(screen.getByRole("button", { name: /ouvrir/i }));
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /enregistrer/i }));
    });

    expect(
      await screen.findByText(/le nom du site est requis/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/email invalide/i)).toBeInTheDocument();
    expect(screen.getByText(/l'adresse est requise/i)).toBeInTheDocument();
  });

  it("soumet le formulaire et affiche le toast de succès", async () => {
    mockUpsertInfoSite.mockResolvedValue({
      success: "Informations mises à jour",
    });
    renderWithToaster(<SitePanel info={sampleInfo as any} />);

    fireEvent.click(screen.getByRole("button", { name: /ouvrir/i }));

    const updatedValues = {
      siteName: "Nouveau nom",
      email: "nouveau@mail.fr",
      address: "24 avenue de la Paix",
      city: "Lyon",
      postalCode: "69000",
      country: "France",
      phone: "0600000000",
      responsible: "Marie Curie",
    };

    fireEvent.change(screen.getByLabelText(/nom du site/i), {
      target: { value: updatedValues.siteName },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: updatedValues.email },
    });
    fireEvent.change(screen.getByLabelText(/adresse/i), {
      target: { value: updatedValues.address },
    });
    fireEvent.change(screen.getByLabelText(/ville/i), {
      target: { value: updatedValues.city },
    });
    fireEvent.change(screen.getByLabelText(/code postal/i), {
      target: { value: updatedValues.postalCode },
    });
    fireEvent.change(screen.getByLabelText(/^pays$/i), {
      target: { value: updatedValues.country },
    });
    fireEvent.change(screen.getByLabelText(/téléphone/i), {
      target: { value: updatedValues.phone },
    });
    fireEvent.change(screen.getByLabelText(/responsable/i), {
      target: { value: updatedValues.responsible },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /enregistrer/i }));
    });

    await waitFor(() =>
      expect(mockUpsertInfoSite).toHaveBeenCalledWith(updatedValues),
    );
    expect(await screen.findByText(/informations mises à jour/i)).toBeVisible();
    await waitFor(() => expect(refreshMock).toHaveBeenCalled());
    expect(screen.getByText(updatedValues.siteName)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /ouvrir/i })).toBeInTheDocument();
  });

  it("affiche un toast d'erreur en cas d'échec de l'action", async () => {
    mockUpsertInfoSite.mockResolvedValue({ error: "Erreur serveur" });
    renderWithToaster(<SitePanel info={sampleInfo as any} />);

    fireEvent.click(screen.getByRole("button", { name: /ouvrir/i }));

    fireEvent.change(screen.getByLabelText(/nom du site/i), {
      target: { value: sampleInfo.siteName },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: sampleInfo.email },
    });
    fireEvent.change(screen.getByLabelText(/adresse/i), {
      target: { value: sampleInfo.address },
    });
    fireEvent.change(screen.getByLabelText(/ville/i), {
      target: { value: sampleInfo.city },
    });
    fireEvent.change(screen.getByLabelText(/code postal/i), {
      target: { value: sampleInfo.postalCode },
    });
    fireEvent.change(screen.getByLabelText(/^pays$/i), {
      target: { value: sampleInfo.country },
    });
    fireEvent.change(screen.getByLabelText(/téléphone/i), {
      target: { value: sampleInfo.phone },
    });
    fireEvent.change(screen.getByLabelText(/responsable/i), {
      target: { value: sampleInfo.responsible },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /enregistrer/i }));
    });

    expect(await screen.findByText(/erreur serveur/i)).toBeVisible();
    expect(screen.getByRole("button", { name: /fermer/i })).toBeInTheDocument();
    expect(refreshMock).not.toHaveBeenCalled();
  });
});
