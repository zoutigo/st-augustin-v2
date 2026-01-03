import { act, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DynamicNavButton } from "@/components/navbar/dynamic-nav-button";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

jest.mock("@/components/landing/landing", () => ({
  Landing: () => <div data-testid="landing-welcome-title" />,
}));

import { Landing } from "@/components/landing/landing";

jest.mock("@/hooks/use-current-user", () => ({
  useCurrentUser: () => ({ id: "123", email: "test@example.com" }),
}));

jest.mock("@/hooks/use-current-grade", () => ({
  useCurrentGrade: () => "ADMIN",
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("next-auth/react", () => ({
  signOut: jest.fn().mockResolvedValue(undefined),
}));

describe("Déconnexion (redirect home)", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    (signOut as jest.Mock).mockClear();
  });

  it("appelle signOut et redirige vers l'accueil (landing visible)", async () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });

    render(
      <DynamicNavButton
        name="Espace privé"
        path="/espace-prive"
        slug="espace-prive"
        isActive={false}
        subroutes={[
          { name: "Déconnexion", slug: "logout", path: "/auth/logout" },
        ]}
      />,
    );

    const userButton = screen.getByLabelText(/espace privé/i);
    fireEvent.mouseEnter(userButton);

    const logoutButton = screen.getByRole("button", { name: /déconnexion/i });
    await act(async () => {
      fireEvent.click(logoutButton);
      await Promise.resolve();
    });

    expect(signOut).toHaveBeenCalledWith({ redirect: false });
    act(() => {
      jest.advanceTimersByTime(3500);
    });
    expect(push).toHaveBeenCalledWith("/");

    // Simule le rendu de la landing après redirection
    render(<Landing />);
    expect(screen.getByTestId("landing-welcome-title")).toBeInTheDocument();
  });
});
