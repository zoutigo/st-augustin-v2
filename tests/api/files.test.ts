import { promises as fs } from "fs";
import os from "os";
import path from "path";

// jsdom ne fournit pas de classe Request exploitable par next/server ; on
// mock next/server comme le font les autres tests d'API de ce projet.
jest.mock("next/server", () => ({
  NextResponse: {
    json: (data: any, init?: any) => ({
      status: init?.status ?? 200,
      json: async () => data,
    }),
  },
}));

// jsdom ne fournit pas non plus la classe Response native, utilisée
// directement par la route GET /api/external-files pour servir un fichier.
if (typeof global.Response === "undefined") {
  // @ts-ignore
  global.Response = class {
    status: number;
    headers: Map<string, string>;
    constructor(
      public body: unknown,
      init?: { status?: number; headers?: Record<string, string> },
    ) {
      this.status = init?.status ?? 200;
      this.headers = new Map(Object.entries(init?.headers ?? {}));
    }
  };
}

describe("API /api/files (upload)", () => {
  let tmpDir: string;

  beforeEach(async () => {
    jest.resetModules();
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "st-augustin-uploads-"));
    process.env.EXTERNAL_UPLOAD_DIR = tmpDir;
  });

  afterEach(async () => {
    delete process.env.EXTERNAL_UPLOAD_DIR;
    await fs.rm(tmpDir, { recursive: true, force: true });
  });

  // jsdom fournit un File/FormData incomplets (pas de .arrayBuffer()) ; on
  // fabrique un objet minimal correspondant exactement à ce que la route lit.
  const makeFakeFile = (buffer: Buffer, name: string, type: string) => ({
    name,
    type,
    size: buffer.length,
    arrayBuffer: async () =>
      buffer.buffer.slice(
        buffer.byteOffset,
        buffer.byteOffset + buffer.byteLength,
      ),
  });

  const makeUploadRequest = (file: ReturnType<typeof makeFakeFile>) =>
    ({
      formData: async () => ({
        get: (key: string) => (key === "file" ? file : null),
      }),
    }) as unknown as Request;

  it("accepte une image valide et l'écrit sur disque", async () => {
    const { POST } = await import("@/app/api/files/route");
    const file = makeFakeFile(
      Buffer.from([0xff, 0xd8, 0xff]),
      "photo.jpg",
      "image/jpeg",
    );

    const res = await POST(makeUploadRequest(file));
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.url).toMatch(/^\/api\/external-files\/photo-\d+\.jpg$/);

    const written = await fs.readdir(tmpDir);
    expect(written).toHaveLength(1);
  });

  it("rejette un type de fichier non autorisé", async () => {
    const { POST } = await import("@/app/api/files/route");
    const file = makeFakeFile(
      Buffer.from("not an image"),
      "malware.exe",
      "application/x-msdownload",
    );

    const res = await POST(makeUploadRequest(file));

    expect(res.status).toBe(400);
    const written = await fs.readdir(tmpDir).catch(() => []);
    expect(written).toHaveLength(0);
  });

  it("rejette un fichier trop volumineux", async () => {
    const { POST } = await import("@/app/api/files/route");
    const oversized = Buffer.alloc(11 * 1024 * 1024, 1);
    const file = makeFakeFile(oversized, "big.jpg", "image/jpeg");

    const res = await POST(makeUploadRequest(file));

    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/trop volumineux/i);
  });
});

describe("API /api/external-files/[...path] (lecture)", () => {
  let tmpDir: string;

  beforeEach(async () => {
    jest.resetModules();
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "st-augustin-uploads-"));
    process.env.EXTERNAL_UPLOAD_DIR = tmpDir;
  });

  afterEach(async () => {
    delete process.env.EXTERNAL_UPLOAD_DIR;
    await fs.rm(tmpDir, { recursive: true, force: true });
  });

  it("sert un fichier existant avec le bon type MIME", async () => {
    await fs.writeFile(path.join(tmpDir, "existing.png"), Buffer.from([1, 2]));
    const { GET } = await import("@/app/api/external-files/[...path]/route");

    const res = await GET({} as Request, {
      params: { path: ["existing.png"] },
    });

    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toBe("image/png");
  });

  it("renvoie 404 si le fichier n'existe pas", async () => {
    const { GET } = await import("@/app/api/external-files/[...path]/route");

    const res = await GET({} as Request, {
      params: { path: ["missing.png"] },
    });

    expect(res.status).toBe(404);
  });

  it("neutralise une tentative de traversée de répertoire (ne sort jamais du dossier autorisé)", async () => {
    // Un fichier nommé littéralement "passwd" existe dans le dossier autorisé :
    // si la traversée n'était pas neutralisée, elle le retrouverait en sortant
    // du dossier. Le comportement attendu est un 404 : le chemin est ramené
    // à l'intérieur de BASE_UPLOAD_DIR ("etc/passwd"), qui n'existe pas là.
    const outsideDir = path.dirname(tmpDir);
    await fs.writeFile(path.join(outsideDir, "passwd"), "secret");

    const { GET } = await import("@/app/api/external-files/[...path]/route");

    const res = await GET({} as Request, {
      params: { path: ["..", "..", "etc", "passwd"] },
    });

    expect(res.status).toBe(404);

    await fs.rm(path.join(outsideDir, "passwd"), { force: true });
  });
});
