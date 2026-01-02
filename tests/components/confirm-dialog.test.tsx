import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

describe("ConfirmDialog", () => {
  it("ouvre le dialogue et déclenche onConfirm", async () => {
    const onConfirm = jest.fn();
    const user = userEvent.setup();

    render(
      <ConfirmDialog
        title="Supprimer ?"
        description="Action irréversible."
        onConfirm={onConfirm}
      >
        <button>Ouvrir</button>
      </ConfirmDialog>,
    );

    await user.click(screen.getByRole("button", { name: "Ouvrir" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Supprimer ?")).toBeInTheDocument();
    expect(screen.getByText("Action irréversible.")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Confirmer" }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("ferme le dialogue quand on annule", async () => {
    const user = userEvent.setup();

    render(
      <ConfirmDialog onConfirm={jest.fn()}>
        <button>Ouvrir</button>
      </ConfirmDialog>,
    );

    await user.click(screen.getByRole("button", { name: "Ouvrir" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Annuler" }));
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });
});
