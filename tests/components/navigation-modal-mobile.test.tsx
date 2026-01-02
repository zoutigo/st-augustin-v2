import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import NavigationModal from "@/components/modals/navigation-modal";

const pushMock = jest.fn();
const closeMenuMock = jest.fn();
const toggleMenuMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

jest.mock("@/lib/store", () => ({
  useAppStore: () => ({
    isMenuOpen: true,
    toggleMenu: toggleMenuMock,
    closeMenu: closeMenuMock,
  }),
}));

jest.mock("@/hooks/use-is-small-screen", () => ({
  useIsSmallScreen: () => true,
}));

jest.mock("@/hooks/use-current-user", () => ({
  useCurrentUser: () => null,
}));

jest.mock("@/hooks/use-handle-logout", () => ({
  useHandleLogout: () => ({ handleLogout: jest.fn() }),
}));

jest.mock("next/link", () => {
  return ({ href, children, passHref: _passHref, ...rest }: any) => (
    <a href={typeof href === "string" ? href : href?.pathname} {...rest}>
      {children}
    </a>
  );
});

describe("Navigation mobile - NavigationModal", () => {
  beforeEach(() => {
    pushMock.mockClear();
    closeMenuMock.mockClear();
    toggleMenuMock.mockClear();
  });

  it("affiche toutes les entrées principales et leurs toggles si disponibles", () => {
    render(<NavigationModal />);

    const mainLabels = [
      /l'ecole/i,
      /vie scolaire/i,
      /classes/i,
      /blog/i,
      /login/i,
    ];

    mainLabels.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });

    // toggles should exist for every route with subroutes except espace privé (login only en mobile)
    const toggleLabels = [
      /Ouvrir les sous-liens de L'ecole/i,
      /Ouvrir les sous-liens de Vie Scolaire/i,
      /Ouvrir les sous-liens de Classes/i,
    ];

    toggleLabels.forEach((label) => {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    });
  });

  it("redirige vers la bonne page lorsqu'on clique sur chaque entrée principale", async () => {
    const user = userEvent.setup();
    render(<NavigationModal />);

    const mainLinks: Array<[RegExp, string]> = [
      [/l'ecole/i, "/ecole"],
      [/vie scolaire/i, "/vie-scolaire"],
      [/classes/i, "/classes"],
      [/blog/i, "/blog"],
    ];

    for (const [label, expectedPath] of mainLinks) {
      await user.click(screen.getByText(label));
      expect(pushMock).toHaveBeenCalledWith(expectedPath, {});
      expect(closeMenuMock).toHaveBeenCalled();
    }
  });

  it("redirige vers /auth/login quand on clique sur Espace privé en étant déconnecté", async () => {
    const user = userEvent.setup();
    render(<NavigationModal />);

    await user.click(screen.getByText(/login/i));

    expect(pushMock).toHaveBeenCalledWith("/auth/login", {});
    expect(closeMenuMock).toHaveBeenCalled();
  });

  it("ouvre les sous-liens et navigue vers la bonne page", async () => {
    const user = userEvent.setup();
    render(<NavigationModal />);

    const toggleButton = screen.getByLabelText(
      /Ouvrir les sous-liens de vie scolaire/i,
    );
    expect(toggleButton).toBeInTheDocument();

    await user.click(toggleButton);

    const cantineLink = await screen.findByRole("button", {
      name: /cantine/i,
    });

    await user.click(cantineLink);

    expect(pushMock).toHaveBeenCalledWith("/vie-scolaire/cantine");
    expect(closeMenuMock).toHaveBeenCalled();
  });

  it("ouvre chaque groupe et permet de cliquer sur tous les sous-liens", async () => {
    const user = userEvent.setup();
    render(<NavigationModal />);

    const navMatrix: Array<{
      toggle: RegExp;
      children: Array<{ label: RegExp; path: string }>;
    }> = [
      {
        toggle: /Ouvrir les sous-liens de L'ecole/i,
        children: [
          { label: /inscriptions/i, path: "/ecole/inscriptions" },
          { label: /equipe/i, path: "/ecole/equipe" },
          { label: /histoire/i, path: "/ecole/histoire" },
          { label: /projets/i, path: "/ecole/projets" },
          { label: /infrastructures/i, path: "/ecole/infrastructures" },
        ],
      },
      {
        toggle: /Ouvrir les sous-liens de Vie Scolaire/i,
        children: [
          { label: /cantine/i, path: "/vie-scolaire/cantine" },
          { label: /garderie/i, path: "/vie-scolaire/garderie" },
          { label: /pastorale/i, path: "/vie-scolaire/pastorale" },
          { label: /apel/i, path: "/vie-scolaire/apel" },
          { label: /ogec/i, path: "/vie-scolaire/ogec" },
        ],
      },
      {
        toggle: /Ouvrir les sous-liens de Classes/i,
        children: [
          { label: /petite section/i, path: "/classes/petite-section" },
          { label: /moyenne section/i, path: "/classes/moyenne-section" },
          { label: /grande section/i, path: "/classes/grande-section" },
          { label: /\bcp\b/i, path: "/classes/cp" },
          { label: /ce1/i, path: "/classes/ce1" },
          { label: /ce2/i, path: "/classes/ce2" },
          { label: /cm1/i, path: "/classes/cm1" },
          { label: /cm2/i, path: "/classes/cm2" },
        ],
      },
    ];

    for (const group of navMatrix) {
      for (const child of group.children) {
        pushMock.mockClear();
        closeMenuMock.mockClear();

        // rouvre le bloc si besoin pour accéder au sous-lien
        if (!screen.queryByRole("button", { name: child.label })) {
          const toggle = screen.getByLabelText(group.toggle);
          await user.click(toggle);
        }

        await user.click(
          await screen.findByRole("button", { name: child.label }),
        );

        expect(pushMock).toHaveBeenCalledWith(child.path);
        expect(closeMenuMock).toHaveBeenCalled();
      }
    }
  });

  it("affiche un proverbe aleatoire", () => {
    render(<NavigationModal />);
    const container = screen.getByTestId("navigation-proverb");
    const text = screen.getByTestId("navigation-proverb-text");

    expect(container).toBeInTheDocument();
    expect(text).toBeInTheDocument();
    expect(text).toHaveTextContent(/\S/); // non vide
  });
});
