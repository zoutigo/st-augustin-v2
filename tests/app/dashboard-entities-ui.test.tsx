import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { Toaster } from "@/components/ui/sonner";

import EntitiesPage from "@/app/espace-prive/dashboard/entities/page";
import CreateEntityPage from "@/app/espace-prive/dashboard/entities/create/page";
import EditEntityPage from "@/app/espace-prive/dashboard/entities/[entityId]/edit/page";
import EntityDetailPage from "@/app/espace-prive/dashboard/entities/[entityId]/page";

jest.mock("@/components/tiptap/tiptap", () => ({
  TiptapEditor: ({
    onChange,
    initialContent,
  }: {
    onChange: (value: string) => void;
    initialContent?: string;
  }) => (
    <textarea
      aria-label="Description de l'entité"
      defaultValue={initialContent}
      onChange={(e) => onChange(e.target.value)}
    />
  ),
}));

jest.mock("@/components/tiptap/page-content", () => ({
  __esModule: true,
  default: ({ content }: { content: string }) => (
    <div data-testid="page-content">{content}</div>
  ),
}));

jest.mock("@/actions/entity/get", () => ({
  getAllEntities: jest.fn(),
  getEntityById: jest.fn(),
}));

jest.mock("@/actions/entity/posts", () => ({
  createEntity: jest.fn(),
  updateEntity: jest.fn(),
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

const pushMock = jest.fn();
const refreshMock = jest.fn();
const backMock = jest.fn();
let currentEntityId = "entity-1";

jest.mock("next/navigation", () => {
  return {
    useRouter: () => ({ push: pushMock, refresh: refreshMock, back: backMock }),
    useParams: () => ({ entityId: currentEntityId }),
    useSearchParams: () => ({}),
  };
});

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(() => ({
    data: {
      id: "entity-1",
      name: "Entité test",
      slug: "entite-test",
      description: "<p>Desc</p>",
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-01-02"),
    },
    isLoading: false,
  })),
  useQueryClient: () => ({
    invalidateQueries: jest.fn(),
  }),
}));

const mockGetAllEntities = jest.requireMock("@/actions/entity/get")
  .getAllEntities as jest.Mock;
const mockGetEntityById = jest.requireMock("@/actions/entity/get")
  .getEntityById as jest.Mock;
const mockCreateEntity = jest.requireMock("@/actions/entity/posts")
  .createEntity as jest.Mock;
const mockUpdateEntity = jest.requireMock("@/actions/entity/posts")
  .updateEntity as jest.Mock;
const mockConfirmation = jest.requireMock(
  "@/components/ui/confirmation-message",
).confirmationMessage as { success: jest.Mock; error: jest.Mock };

const sampleEntities = [
  {
    id: "entity-1",
    name: "CM2",
    slug: "cm2",
    description: "<p>Desc CM2</p>",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-02"),
  },
  {
    id: "entity-2",
    name: "CE1",
    slug: "ce1",
    description: "<p>Desc CE1</p>",
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-02-02"),
  },
];

const renderWithToaster = (ui: React.ReactNode) =>
  render(
    <>
      <Toaster position="top-right" />
      {ui}
    </>,
  );

describe("Dashboard Entités - UI & interactions", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    (global as any).fetch = jest.fn(() =>
      Promise.resolve({ ok: true }),
    ) as jest.Mock;
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
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  it("affiche la liste avec boutons et supprime via le dialogue", async () => {
    mockGetAllEntities.mockResolvedValue(sampleEntities);
    const ui = await EntitiesPage();
    render(ui as JSX.Element);

    const backBtn = screen.getByRole("button", { name: /retour/i });
    fireEvent.click(backBtn);
    expect(pushMock).toHaveBeenCalledWith("/espace-prive/dashboard");

    const addBtn = screen.getByLabelText(/ajouter une entité/i);
    const addLink = addBtn.closest("a");
    expect(addLink).toHaveAttribute(
      "href",
      "/espace-prive/dashboard/entities/create",
    );

    const viewLink = screen.getAllByLabelText(/voir l'entité/i)[0];
    expect(viewLink).toHaveAttribute(
      "href",
      "/espace-prive/dashboard/entities/entity-1",
    );

    const editLink = screen.getAllByLabelText(/modifier/i)[0];
    expect(editLink).toHaveAttribute(
      "href",
      "/espace-prive/dashboard/entities/entity-1/edit",
    );

    fireEvent.click(screen.getAllByLabelText(/supprimer/i)[0]);
    const dialog = await screen.findByRole("dialog");
    fireEvent.click(within(dialog).getByRole("button", { name: /supprimer/i }));

    await waitFor(() =>
      expect(global.fetch).toHaveBeenCalledWith(
        "/api/entities/entity-1",
        expect.objectContaining({ method: "DELETE" }),
      ),
    );
    expect(mockConfirmation.success).toHaveBeenCalled();
    expect(refreshMock).toHaveBeenCalled();
  });

  it("crée une entité et affiche les toasts", async () => {
    mockCreateEntity.mockResolvedValue({ success: "ok" });
    renderWithToaster(<CreateEntityPage />);

    const backBtn = screen.getByRole("button", { name: /retour/i });
    fireEvent.click(backBtn);
    expect(pushMock).toHaveBeenCalledWith("/espace-prive/dashboard/entities");
    pushMock.mockClear();

    fireEvent.change(screen.getByLabelText(/nom de l'entité/i), {
      target: { value: "Nouvelle" },
    });
    fireEvent.change(screen.getByLabelText(/slug de l'entité/i), {
      target: { value: "nouvelle" },
    });
    fireEvent.change(screen.getByLabelText(/description de l'entité/i), {
      target: { value: "Description" },
    });

    fireEvent.click(screen.getByRole("button", { name: /créer/i }));

    await waitFor(() =>
      expect(mockConfirmation.success).toHaveBeenCalledWith("Entité créée"),
    );
    await act(async () => {
      jest.runAllTimers();
    });
    expect(pushMock).toHaveBeenCalledWith("/espace-prive/dashboard/entities");
  });

  it("affiche l'erreur en création", async () => {
    mockCreateEntity.mockResolvedValue({ error: "erreur serveur" });
    renderWithToaster(<CreateEntityPage />);

    fireEvent.change(screen.getByLabelText(/nom de l'entité/i), {
      target: { value: "Nouvelle" },
    });
    fireEvent.change(screen.getByLabelText(/slug de l'entité/i), {
      target: { value: "nouvelle" },
    });
    fireEvent.change(screen.getByLabelText(/description de l'entité/i), {
      target: { value: "Description" },
    });
    fireEvent.click(screen.getByRole("button", { name: /créer/i }));

    await waitFor(() =>
      expect(screen.getByText(/erreur serveur/i)).toBeInTheDocument(),
    );
    expect(mockConfirmation.success).not.toHaveBeenCalled();
  });

  it("met à jour une entité et renvoie vers la liste", async () => {
    mockUpdateEntity.mockResolvedValue({ success: "ok" });
    renderWithToaster(<EditEntityPage />);

    const backBtn = screen.getByRole("button", { name: /retour/i });
    fireEvent.click(backBtn);
    expect(pushMock).toHaveBeenCalledWith("/espace-prive/dashboard/entities");
    pushMock.mockClear();

    fireEvent.change(screen.getByLabelText(/slug de l'entité/i), {
      target: { value: "maj" },
    });
    fireEvent.click(screen.getByRole("button", { name: /mettre à jour/i }));

    await waitFor(() =>
      expect(mockConfirmation.success).toHaveBeenCalledWith(
        "Entité mise à jour",
      ),
    );
    await act(async () => {
      jest.runAllTimers();
    });
    expect(pushMock).toHaveBeenCalledWith("/espace-prive/dashboard/entities");
  });

  it("affiche l'erreur en édition", async () => {
    mockUpdateEntity.mockResolvedValue({ error: "update raté" });
    renderWithToaster(<EditEntityPage />);
    fireEvent.click(screen.getByRole("button", { name: /mettre à jour/i }));

    await waitFor(() =>
      expect(
        screen.getByText(/quelque chose n'a pas fonctionné/i),
      ).toBeInTheDocument(),
    );
    expect(mockConfirmation.success).not.toHaveBeenCalled();
  });

  it("affiche la page de détail avec le bouton retour", async () => {
    mockGetEntityById.mockResolvedValue({
      id: "entity-99",
      name: "Détail",
      slug: "detail",
      description: "<p>hello</p>",
      createdAt: new Date("2024-03-01"),
      updatedAt: new Date("2024-03-02"),
    });
    const ui = await EntityDetailPage({ params: { entityId: "entity-99" } });
    render(ui as JSX.Element);

    expect(screen.getByText(/détail/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /retour/i }));
    expect(pushMock).toHaveBeenCalledWith("/espace-prive/dashboard/entities");
  });
});
