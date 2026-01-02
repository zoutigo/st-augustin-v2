import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Toaster } from "@/components/ui/sonner";
import CreatePage from "@/app/espace-prive/dashboard/pages/create/page";
import EditPage from "@/app/espace-prive/dashboard/pages/[pageId]/edit/page";

jest.mock("@/components/tiptap/tiptap", () => ({
  TiptapEditor: ({
    onChange,
    initialContent,
  }: {
    onChange: (value: string) => void;
    initialContent?: string;
  }) => (
    <textarea
      aria-label="Contenu de la page"
      defaultValue={initialContent}
      onChange={(e) => onChange(e.target.value)}
    />
  ),
}));

jest.mock("@/actions/pages/post", () => ({
  createPage: jest.fn(),
}));

jest.mock("@/actions/pages/update-page", () => ({
  updatePage: jest.fn(),
}));

jest.mock("@/components/ui/confirmation-message", () => {
  const original = jest.requireActual("@/components/ui/confirmation-message");
  return {
    ...original,
    confirmationMessage: {
      success: jest.fn(),
      error: jest.fn(),
    },
  };
});

jest.mock("@/actions/pages/get", () => ({
  getPageById: jest.fn(async () => ({
    name: "Garderie",
    slug: "vie-scolaire-garderie",
    content: "Contenu initial",
  })),
}));

const pushMock = jest.fn();
const refreshMock = jest.fn();
const backMock = jest.fn();

jest.mock("next/navigation", () => {
  return {
    useRouter: () => ({ push: pushMock, refresh: refreshMock, back: backMock }),
    useParams: () => ({ pageId: "123" }),
    useSearchParams: () => ({}),
  };
});

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(() => ({
    data: {
      name: "Garderie",
      slug: "vie-scolaire-garderie",
      content: "Contenu initial",
    },
    isLoading: false,
  })),
  useQueryClient: () => ({
    invalidateQueries: jest.fn(),
  }),
}));

jest.mock("@/hooks/useCustomMutation", () => ({
  useCustomMutation: (_opts: any, mutateFn: any, callbacks: any) =>
    ({
      mutate: async (values: any) => {
        try {
          const res = await mutateFn(values);
          if (res && "error" in res) {
            callbacks?.onError?.forEach?.((fn: any) => fn(res));
          } else {
            callbacks?.onSuccess?.forEach?.((fn: any) => fn(res));
          }
        } catch (err) {
          callbacks?.onError?.forEach?.((fn: any) => fn(err));
        }
      },
      isPending: false,
    }) as any,
}));

const renderWithToaster = (ui: React.ReactNode) =>
  render(
    <>
      <Toaster position="top-right" />
      {ui}
    </>,
  );

describe("Dashboard Pages forms (create/edit)", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    // Polyfills pour jsdom
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

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("bouton retour présent en création et redirige", () => {
    renderWithToaster(<CreatePage />);
    const backBtn = screen.getByRole("button", { name: /retour/i });
    fireEvent.click(backBtn);
    expect(pushMock).toHaveBeenCalledWith("/espace-prive/dashboard/pages");
  });

  it("bouton retour présent en édition et redirige", () => {
    renderWithToaster(<EditPage />);
    const backBtn = screen.getByRole("button", { name: /retour/i });
    fireEvent.click(backBtn);
    expect(pushMock).toHaveBeenCalledWith("/espace-prive/dashboard/pages");
  });

  it("affiche le toast de succès à la création", async () => {
    const { createPage } = require("@/actions/pages/post");
    const {
      confirmationMessage,
    } = require("@/components/ui/confirmation-message");
    createPage.mockResolvedValue({ success: "ok" });
    renderWithToaster(<CreatePage />);

    fireEvent.change(screen.getByLabelText(/nom de la page/i), {
      target: { value: "Nouvelle" },
    });
    fireEvent.change(screen.getByLabelText(/slug/i), {
      target: { value: "nouvelle" },
    });
    fireEvent.change(screen.getByLabelText(/contenu de la page/i), {
      target: { value: "Contenu" },
    });
    fireEvent.click(screen.getByRole("button", { name: /créer/i }));

    await waitFor(() => {
      expect(confirmationMessage.success).toHaveBeenCalledWith(
        "Page créée avec succès",
      );
    });
  });

  it("affiche l'erreur en création", async () => {
    const { createPage } = require("@/actions/pages/post");
    const {
      confirmationMessage,
    } = require("@/components/ui/confirmation-message");
    createPage.mockResolvedValue({ error: "Erreur serveur" });
    renderWithToaster(<CreatePage />);

    fireEvent.change(screen.getByLabelText(/nom de la page/i), {
      target: { value: "Nouvelle" },
    });
    fireEvent.change(screen.getByLabelText(/slug/i), {
      target: { value: "nouvelle" },
    });
    fireEvent.change(screen.getByLabelText(/contenu de la page/i), {
      target: { value: "Contenu" },
    });
    fireEvent.click(screen.getByRole("button", { name: /créer/i }));

    await waitFor(() =>
      expect(screen.getByText(/erreur serveur/i)).toBeInTheDocument(),
    );
    expect(confirmationMessage.success).not.toHaveBeenCalled();
  });

  it("affiche le toast de succès en édition", async () => {
    const { updatePage } = require("@/actions/pages/update-page");
    const {
      confirmationMessage,
    } = require("@/components/ui/confirmation-message");
    updatePage.mockResolvedValue({ success: "ok" });
    renderWithToaster(<EditPage />);

    fireEvent.change(screen.getByLabelText(/slug/i), {
      target: { value: "slug-maj" },
    });
    fireEvent.click(screen.getByRole("button", { name: /mettre à jour/i }));

    await waitFor(() =>
      expect(confirmationMessage.success).toHaveBeenCalledWith(
        "Page mise à jour",
      ),
    );
  });

  it("affiche l'erreur en édition", async () => {
    const { updatePage } = require("@/actions/pages/update-page");
    const {
      confirmationMessage,
    } = require("@/components/ui/confirmation-message");
    updatePage.mockResolvedValue({ error: "Echec update" });
    renderWithToaster(<EditPage />);

    fireEvent.click(screen.getByRole("button", { name: /mettre à jour/i }));

    await waitFor(() =>
      expect(
        screen.getByText(/quelque chose n'a pas fonctionné/i),
      ).toBeInTheDocument(),
    );
    expect(confirmationMessage.success).not.toHaveBeenCalled();
  });
});
