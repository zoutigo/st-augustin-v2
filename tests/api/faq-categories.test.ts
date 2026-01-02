jest.mock("next/server", () => ({
  NextResponse: {
    json: (data: any, init?: any) => ({
      status: init?.status ?? 200,
      json: async () => data,
    }),
  },
}));

jest.mock("@/actions/faq/categories", () => ({
  getAllFaqCategories: jest.fn(),
  createFaqCategory: jest.fn(),
  updateFaqCategory: jest.fn(),
  deleteFaqCategory: jest.fn(),
}));

import {
  getAllFaqCategories,
  createFaqCategory,
  updateFaqCategory,
  deleteFaqCategory,
} from "@/actions/faq/categories";

const ensureRequestPolyfill = () => {
  // jsdom expose window.Request, on le propage sur global pour Next
  // @ts-ignore
  if (typeof global.Request === "undefined" && typeof window !== "undefined") {
    // @ts-ignore
    global.Request = window.Request;
  }
};

describe("API /api/faq-categories", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    ensureRequestPolyfill();
  });

  it("GET retourne les catégories", async () => {
    (getAllFaqCategories as jest.Mock).mockResolvedValue([
      { id: "1", name: "Pastorale", slug: "pastorale" },
    ]);
    const { GET } = await import("@/app/api/faq-categories/route");
    const res = await GET();
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body[0].name).toBe("Pastorale");
  });

  it("POST retourne 200 en succès", async () => {
    (createFaqCategory as jest.Mock).mockResolvedValue({ success: "ok" });
    const { POST } = await import("@/app/api/faq-categories/route");
    const req = {
      json: async () => ({ name: "Test", slug: "test" }),
    } as any;
    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(createFaqCategory).toHaveBeenCalled();
  });

  it("POST retourne 400 en erreur", async () => {
    (createFaqCategory as jest.Mock).mockResolvedValue({ error: "invalid" });
    const { POST } = await import("@/app/api/faq-categories/route");
    const req = { json: async () => ({ name: "", slug: "" }) } as any;
    const res = await POST(req);
    expect(res.status).toBe(400);
  });
});

describe("API /api/faq-categories/[id]", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    ensureRequestPolyfill();
  });

  it("PATCH met à jour une catégorie", async () => {
    (updateFaqCategory as jest.Mock).mockResolvedValue({ success: "ok" });
    const { PATCH } = await import("@/app/api/faq-categories/[id]/route");
    const req = {
      json: async () => ({ name: "Updated", slug: "updated" }),
    } as any;
    const res = await PATCH(req, { params: { id: "1" } });
    expect(res.status).toBe(200);
    expect(updateFaqCategory).toHaveBeenCalledWith("1", {
      name: "Updated",
      slug: "updated",
    });
  });

  it("DELETE supprime une catégorie", async () => {
    (deleteFaqCategory as jest.Mock).mockResolvedValue({ success: "ok" });
    const { DELETE } = await import("@/app/api/faq-categories/[id]/route");
    const res = await DELETE({} as any, { params: { id: "1" } });
    expect(res.status).toBe(200);
    expect(deleteFaqCategory).toHaveBeenCalledWith("1");
  });
});
