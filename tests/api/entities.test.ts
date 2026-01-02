jest.mock("next/server", () => ({
  NextResponse: {
    json: (data: any, init?: any) => ({
      status: init?.status ?? 200,
      json: async () => data,
    }),
  },
}));

jest.mock("@/lib/db", () => ({
  db: {
    entity: {
      delete: jest.fn(),
    },
  },
}));

import { db } from "@/lib/db";

describe("API /api/entities/[entityId]", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("supprime une entité avec succès", async () => {
    const { DELETE } = await import("@/app/api/entities/[entityId]/route");
    const res = await DELETE({} as any, { params: { entityId: "123" } });
    expect(res.status).toBe(200);
    expect(db.entity.delete).toHaveBeenCalledWith({ where: { id: "123" } });
  });

  it("retourne 400 si l'id est manquant", async () => {
    const { DELETE } = await import("@/app/api/entities/[entityId]/route");
    const res = await DELETE({} as any, { params: { entityId: "" } });
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/missing entity id/i);
  });

  it("retourne 500 si la suppression échoue", async () => {
    (db.entity.delete as jest.Mock).mockRejectedValueOnce(new Error("db down"));
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const { DELETE } = await import("@/app/api/entities/[entityId]/route");
    const res = await DELETE({} as any, { params: { entityId: "999" } });
    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body.error).toMatch(/failed to delete/i);
    consoleSpy.mockRestore();
  });
});
