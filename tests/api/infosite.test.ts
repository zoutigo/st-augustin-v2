jest.mock("@/lib/db", () => ({
  db: {
    infoSite: {
      findFirst: jest.fn(),
      update: jest.fn(),
      create: jest.fn(),
    },
  },
}));

import { upsertInfoSite } from "@/actions/infosite";
import { db } from "@/lib/db";

const validPayload = {
  siteName: "École Saint-Augustin",
  email: "contact@augustin.fr",
  address: "12 rue des Ecoles",
  city: "Crémieu",
  postalCode: "38460",
  country: "France",
  phone: "0474000000",
  responsible: "Jean Dupont",
};

describe("Action upsertInfoSite", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("retourne une erreur de validation pour des données invalides", async () => {
    const res = await upsertInfoSite({} as any);
    expect(res).toEqual({ error: "Champs invalides" });
    expect(db.infoSite.findFirst).not.toHaveBeenCalled();
  });

  it("met à jour l'enregistrement existant", async () => {
    (db.infoSite.findFirst as jest.Mock).mockResolvedValue({ id: "1" });

    const res = await upsertInfoSite(validPayload);

    expect(db.infoSite.update).toHaveBeenCalledWith({
      where: { id: "1" },
      data: validPayload,
    });
    expect(res).toEqual({ success: "Informations mises à jour" });
  });

  it("crée un enregistrement si aucun n'existe", async () => {
    (db.infoSite.findFirst as jest.Mock).mockResolvedValue(null);

    const res = await upsertInfoSite(validPayload);

    expect(db.infoSite.create).toHaveBeenCalledWith({
      data: validPayload,
    });
    expect(res).toEqual({ success: "Informations enregistrées" });
  });

  it("retourne une erreur serveur en cas d'exception", async () => {
    (db.infoSite.findFirst as jest.Mock).mockRejectedValue(
      new Error("db down"),
    );
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const res = await upsertInfoSite(validPayload);

    expect(res).toEqual({ error: "Erreur serveur" });
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
