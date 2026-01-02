import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Navbar } from "@/components/navbar/navbar";

jest.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock("next/link", () => {
  return ({ href, children, passHref: _passHref, ...rest }: any) => (
    <a href={typeof href === "string" ? href : href?.pathname} {...rest}>
      {children}
    </a>
  );
});

jest.mock("next/font/google", () => ({
  Poppins: () => ({ className: "mock-font" }),
}));

jest.mock("@/lib/store", () => ({
  useAppStore: () => ({ isMenuOpen: false, toggleMenu: jest.fn() }),
}));

jest.mock("@/hooks/use-handle-logout", () => ({
  useHandleLogout: () => ({ handleLogout: jest.fn() }),
}));

jest.mock("@/hooks/use-current-user", () => ({
  useCurrentUser: () => null,
}));

jest.mock("@/hooks/use-current-grade", () => ({
  useCurrentGrade: () => null,
}));

describe("Navbar", () => {
  it("affiche les liens principaux du header avec les bonnes destinations", () => {
    render(<Navbar />);

    const expectedLinks: Array<[string, string]> = [
      ["L'ecole", "/ecole"],
      ["Vie Scolaire", "/vie-scolaire"],
      ["Classes", "/classes"],
      ["Blog", "/blog"],
      ["Espace privé", "/auth/login"], // affiché pour un utilisateur non connecté
    ];

    expectedLinks.forEach(([label, href]) => {
      const link = screen.getByRole("link", {
        name: new RegExp(label, "i"),
      });
      expect(link).toHaveAttribute("href", href);
    });
  });

  it("affiche le lien de login quand l'utilisateur n'est pas connecté", () => {
    render(<Navbar />);
    const loginLink = screen.getByRole("link", { name: /espace privé/i });
    expect(loginLink).toHaveAttribute("href", "/auth/login");
  });

  it("masque le header au scroll descendant et le réaffiche dès qu'on remonte", () => {
    const { getByRole } = render(<Navbar />);
    const header = getByRole("banner");

    // Scroll vers le bas -> header caché
    Object.defineProperty(window, "scrollY", { value: 120, writable: true });
    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });
    expect(header.className).toMatch(/-translate-y-full/);

    // Scroll vers le haut -> header visible
    Object.defineProperty(window, "scrollY", { value: 30, writable: true });
    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });
    expect(header.className).toMatch(/translate-y-0/);
  });
});
