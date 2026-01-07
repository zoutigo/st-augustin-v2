import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import Ce1Page from "@/app/classes/ce1/page";
import Ce2Page from "@/app/classes/ce2/page";
import Cm1Page from "@/app/classes/cm1/page";
import Cm2Page from "@/app/classes/cm2/page";
import CpPage from "@/app/classes/cp/page";
import GrandeSectionPage from "@/app/classes/grande-section/page";
import MoyenneSectionPage from "@/app/classes/moyenne-section/page";
import PetiteSectionPage from "@/app/classes/petite-section/page";

import ApelPage, {
  metadata as apelMetadata,
} from "@/app/vie-scolaire/apel/page";
import CantinePage, {
  metadata as cantineMetadata,
} from "@/app/vie-scolaire/cantine/page";
import OgecPage, {
  metadata as ogecMetadata,
} from "@/app/vie-scolaire/ogec/page";
import PastoralePage, {
  metadata as pastoraleMetadata,
} from "@/app/vie-scolaire/pastorale/page";

import { Entity, BlogPost } from "@prisma/client";

jest.mock("@/components/tiptap/page-content", () => ({
  __esModule: true,
  default: ({ content }: { content: string }) => (
    <div>{content.replace(/<[^>]+>/g, "")}</div>
  ),
}));

jest.mock("@/components/dashboard/entities/entity-blogposts-list", () => ({
  EntityBlogPostList: ({
    title,
    blogposts,
  }: {
    title: string;
    blogposts: { id: string; title: string }[];
  }) => (
    <div data-testid="blog-list">
      <p>{title}</p>
      {blogposts.map((post) => (
        <span key={post.id}>{post.title}</span>
      ))}
    </div>
  ),
}));

jest.mock("@/actions/entity/get", () => ({
  getEntityBySlug: jest.fn(),
}));

jest.mock("@/actions/pages/get", () => ({
  getPageBySlug: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(() => "/classes/mock"),
}));

const mockGetEntityBySlug = jest.requireMock("@/actions/entity/get")
  .getEntityBySlug as jest.Mock;
const mockGetPageBySlug = jest.requireMock("@/actions/pages/get")
  .getPageBySlug as jest.Mock;
const mockUsePathname = jest.requireMock("next/navigation")
  .usePathname as jest.Mock;

const makeBlogPosts = (slug: string): BlogPost[] => [
  {
    id: `post-${slug}`,
    title: `Article ${slug}`,
    content: `<p>Contenu ${slug}</p>`,
    isPublic: true,
    isReleased: true,
    entityId: `entity-${slug}`,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-02"),
  },
];

const makeEntity = (slug: string): Entity & { blogpages: BlogPost[] } => ({
  id: `entity-${slug}`,
  name: slug.toUpperCase(),
  description: `<p>Description ${slug}</p>`,
  slug,
  createdAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-02"),
  blogpages: makeBlogPosts(slug),
});

describe("Pages entités (classes)", () => {
  beforeEach(() => {
    mockGetEntityBySlug.mockReset();
    mockGetPageBySlug.mockReset();
  });

  const classPages = [
    { slug: "ce1", Component: Ce1Page },
    { slug: "ce2", Component: Ce2Page },
    { slug: "cm1", Component: Cm1Page },
    { slug: "cm2", Component: Cm2Page },
    { slug: "cp", Component: CpPage },
    { slug: "gs", Component: GrandeSectionPage },
    { slug: "ms", Component: MoyenneSectionPage },
    { slug: "ps", Component: PetiteSectionPage },
  ];

  classPages.forEach(({ slug, Component }) => {
    it(`rend le contenu et les articles pour ${slug}`, async () => {
      mockGetEntityBySlug.mockResolvedValueOnce(makeEntity(slug));
      mockUsePathname.mockReturnValue(`/classes/${slug}`);
      const ui = await Component();
      render(ui as JSX.Element);
      expect(
        screen.getByText(new RegExp(`Description ${slug}`, "i")),
      ).toBeInTheDocument();
      expect(
        screen.queryByText(new RegExp(`Article ${slug}`, "i")),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: /liste des fournitures/i }),
      ).not.toBeInTheDocument();
    });
  });

  it("affiche une erreur quand l'entité est introuvable", async () => {
    mockGetEntityBySlug.mockResolvedValueOnce(null);
    mockUsePathname.mockReturnValue("/classes/ce1");
    const ui = await Ce1Page();
    render(ui as JSX.Element);
    expect(
      screen.getByText(/entité non trouvée pour le slug/i),
    ).toBeInTheDocument();
  });
});

describe("Pages vie scolaire (SSR personnalisées)", () => {
  it("render APEL page with SSR content and metadata", () => {
    render(<ApelPage />);
    expect(
      screen.getByRole("heading", {
        name: /des parents bénévoles qui font vivre les projets/i,
        level: 1,
      }),
    ).toBeInTheDocument();
    expect(apelMetadata.title).toMatch(/APEL/i);
    expect(apelMetadata.alternates?.canonical).toBe("/vie-scolaire/apel");
  });

  it("render Cantine page with SSR content and metadata", () => {
    render(<CantinePage />);
    expect(
      screen.getByRole("heading", {
        name: /Des repas cuisinés sur place/i,
        level: 1,
      }),
    ).toBeInTheDocument();
    expect(cantineMetadata.title).toMatch(/Cantine/i);
    expect(cantineMetadata.alternates?.canonical).toBe("/vie-scolaire/cantine");
  });

  it("render OGEC page with SSR content and metadata", () => {
    render(<OgecPage />);
    expect(
      screen.getByRole("heading", {
        name: /pilier financier et juridique/i,
        level: 1,
      }),
    ).toBeInTheDocument();
    expect(ogecMetadata.title).toMatch(/OGEC/i);
    expect(ogecMetadata.alternates?.canonical).toBe("/vie-scolaire/ogec");
  });

  it("render Pastorale page with SSR content and metadata", () => {
    render(<PastoralePage />);
    expect(
      screen.getByRole("heading", {
        name: /Une histoire chrétienne qui se vit aujourd’hui/i,
        level: 1,
      }),
    ).toBeInTheDocument();
    expect(pastoraleMetadata.title).toMatch(/Pastorale/i);
    expect(pastoraleMetadata.alternates?.canonical).toBe(
      "/vie-scolaire/pastorale",
    );
  });
});
