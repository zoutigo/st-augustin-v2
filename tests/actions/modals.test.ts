jest.mock("@/lib/db", () => ({
  db: {
    modal: {
      create: jest.fn(),
      update: jest.fn(),
    },
  },
}));

import { db } from "@/lib/db";
import { createModal, updateModal } from "@/actions/modals/post";

const validValues = {
  title: "Rentrée 2026-2027",
  content: "<p>Contenu</p>",
  startDate: new Date("2026-09-27"),
  endDate: new Date("2027-01-15"),
};

describe("createModal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("crée la modale et renvoie un succès quand les champs sont valides", async () => {
    (db.modal.create as jest.Mock).mockResolvedValue({
      id: "1",
      ...validValues,
    });

    const result = await createModal(validValues);

    expect(db.modal.create).toHaveBeenCalledWith({ data: { ...validValues } });
    expect(result).toEqual({ success: "Le modal a été créé." });
  });

  it("ne touche pas la base si les champs sont invalides", async () => {
    const result = await createModal({
      ...validValues,
      title: "",
    } as any);

    expect(db.modal.create).not.toHaveBeenCalled();
    expect(result).toEqual({
      error: "Les champs ne sont pas correctement remplis",
    });
  });

  it("renvoie une erreur si la création échoue en base", async () => {
    (db.modal.create as jest.Mock).mockRejectedValue(
      new Error("Connexion refusée"),
    );

    const result = await createModal(validValues);

    expect(result).toEqual({ error: "Connexion refusée" });
  });
});

describe("updateModal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("met à jour la modale et renvoie un succès", async () => {
    (db.modal.update as jest.Mock).mockResolvedValue({
      id: "1",
      ...validValues,
    });

    const result = await updateModal("1", validValues);

    expect(db.modal.update).toHaveBeenCalledWith({
      where: { id: "1" },
      data: { ...validValues },
    });
    expect(result).toEqual({
      success: `Le modal ${validValues.title} a bien été modifié`,
    });
  });

  it("renvoie une erreur si l'id est manquant", async () => {
    const result = await updateModal("", validValues);

    expect(db.modal.update).not.toHaveBeenCalled();
    expect(result).toEqual({ error: "the modal id is missing" });
  });

  it("renvoie une erreur si les champs sont invalides", async () => {
    const result = await updateModal("1", { ...validValues, content: "" });

    expect(db.modal.update).not.toHaveBeenCalled();
    expect(result).toEqual({
      error: "Les champs ne sont pas correctement renseignés",
    });
  });
});
