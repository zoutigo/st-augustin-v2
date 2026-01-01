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

    const vieScolaireText = screen.getByText(/vie scolaire/i);
    const gridRow = vieScolaireText.closest(".grid");
    const toggleButton = gridRow?.querySelector("button");
    expect(toggleButton).toBeInTheDocument();

    await user.click(toggleButton!);

    const cantineLink = await screen.findByRole("button", {
      name: /cantine/i,
    });

    await user.click(cantineLink);

    expect(pushMock).toHaveBeenCalledWith("/vie-scolaire/cantine");
    expect(closeMenuMock).toHaveBeenCalled();
  });
});
