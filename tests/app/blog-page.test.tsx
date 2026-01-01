import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import BlogPage from "@/app/blog/page";
import { BlogPost } from "@prisma/client";

jest.mock("@/actions/blogposts/get", () => ({
  getAllBlogPosts: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  usePathname: () => "/blog",
}));

jest.mock("@/components/blog/blogpost-list", () => ({
  BlogPostList: ({ blogposts }: { blogposts: BlogPost[] }) => (
    <div data-testid="blog-list">
      {blogposts.map((post) => (
        <span key={post.id}>{post.title}</span>
      ))}
    </div>
  ),
}));

const mockGetAllBlogPosts = jest.requireMock("@/actions/blogposts/get")
  .getAllBlogPosts as jest.Mock;

const makePost = (id: string, title: string): BlogPost => ({
  id,
  title,
  content: `<p>${title}</p>`,
  isPublic: true,
  isReleased: true,
  entityId: "entity",
  createdAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-02"),
});

describe("Page blog", () => {
  beforeEach(() => {
    mockGetAllBlogPosts.mockReset();
  });

  it("affiche la liste des articles", async () => {
    mockGetAllBlogPosts.mockResolvedValueOnce([
      makePost("1", "article 1"),
      makePost("2", "article 2"),
    ]);
    const ui = await BlogPage();
    render(ui as JSX.Element);
    expect(screen.getByText(/les articles de blog/i)).toBeInTheDocument();
    expect(screen.getByText(/article 1/i)).toBeInTheDocument();
    expect(screen.getByText(/article 2/i)).toBeInTheDocument();
  });

  it("affiche un message quand aucun article n'est disponible", async () => {
    mockGetAllBlogPosts.mockResolvedValueOnce([]);
    const ui = await BlogPage();
    render(ui as JSX.Element);
    expect(
      screen.getByText(/aucun article de blog disponible/i),
    ).toBeInTheDocument();
  });

  it("affiche une erreur si la récupération échoue", async () => {
    mockGetAllBlogPosts.mockResolvedValueOnce({ error: "oups" });
    const ui = await BlogPage();
    render(ui as JSX.Element);
    expect(screen.getByText(/erreur : oups/i)).toBeInTheDocument();
  });
});
