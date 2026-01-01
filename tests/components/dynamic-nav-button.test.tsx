import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DynamicNavButton } from "@/components/navbar/dynamic-nav-button";

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

jest.mock("next/link", () => {
  return ({ href, children, passHref: _passHref, ...rest }: any) => (
    <a href={typeof href === "string" ? href : href?.pathname} {...rest}>
      {children}
    </a>
  );
});

jest.mock("@/hooks/use-handle-logout", () => ({
  useHandleLogout: () => ({ handleLogout: jest.fn() }),
}));

jest.mock("@/hooks/use-current-user", () => ({
  useCurrentUser: () => null,
}));

jest.mock("@/hooks/use-current-grade", () => ({
  useCurrentGrade: () => null,
}));

describe("DynamicNavButton interactions", () => {
  it("applique le curseur pointer et rend toute la zone du lien cliquable", () => {
    render(
      <DynamicNavButton
        name="L'ecole"
        path="/ecole"
        slug="ecole"
        isActive={false}
      />,
    );

    const mainLink = screen.getByRole("link", { name: /l'ecole/i });
    const clickableZone = mainLink.parentElement;

    expect(clickableZone).toHaveClass("cursor-pointer");
    expect(mainLink).toHaveClass("w-full");
    expect(mainLink).toHaveClass("h-full");
  });

  it("affiche la dropdown au survol avec la bonne couleur et des items entièrement cliquables", () => {
    render(
      <DynamicNavButton
        name="Classes"
        path="/classes"
        slug="classes"
        isActive={false}
        subroutes={[
          { name: "Cantine", slug: "cantine", path: "/classes/cantine" },
        ]}
      />,
    );

    const mainLink = screen.getByRole("link", { name: /classes/i });
    const outerWrapper = mainLink.parentElement
      ?.parentElement as HTMLElement | null;
    if (!outerWrapper) {
      throw new Error(
        "La zone enveloppante du lien principal n'a pas été trouvée.",
      );
    }

    fireEvent.mouseEnter(outerWrapper);

    const dropdownLink = screen.getByRole("link", { name: /cantine/i });
    const dropdownClickable = dropdownLink.parentElement;
    const dropdownRow = dropdownClickable?.parentElement;

    expect(dropdownRow?.className).toContain("hover:bg-classes");
    expect(dropdownClickable).toHaveClass("cursor-pointer");
    expect(dropdownLink).toHaveClass("w-full");
    expect(dropdownLink).toHaveClass("h-full");
  });
});
