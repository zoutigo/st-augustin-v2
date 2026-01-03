import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Social } from "@/components/auth/social";
import { signIn } from "next-auth/react";

jest.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(""),
  redirect: jest.fn(),
}));

jest.mock("@/hooks/use-current-user", () => ({
  useCurrentUser: () => null,
}));

const mockedSignIn = signIn as jest.Mock;

describe("Social login", () => {
  beforeEach(() => {
    mockedSignIn.mockClear();
  });

  it("déclenche une connexion Google via signIn", () => {
    render(<Social />);
    const googleBtn = screen.getAllByRole("button")[0];
    fireEvent.click(googleBtn);

    expect(mockedSignIn).toHaveBeenCalledWith("google", {
      callbackUrl: "/",
    });
  });
});
