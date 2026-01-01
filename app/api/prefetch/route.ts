import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { NavRoutes } from "@/routes";

export const revalidate = 3600;

export async function GET() {
  try {
    const entities = await db.entity.findMany({
      select: { slug: true },
      take: 30,
      orderBy: { createdAt: "desc" },
    });

    const blogposts = await db.blogPost.findMany({
      select: { id: true },
      where: { isPublic: true, isReleased: true },
      orderBy: { createdAt: "desc" },
      take: 10,
    });

    const pageImageSlugs = NavRoutes.filter((r) =>
      ["ecole", "classes", "vie-scolaire"].includes(r.slug),
    )
      .flatMap((route) => [
        route.slug,
        ...(route.subroutes?.map((s) => s.slug) ?? []),
      ])
      .map((slug) => `/images/${slug}.jpg`);

    return NextResponse.json({
      entitySlugs: entities.map((e) => e.slug),
      blogIds: blogposts.map((b) => b.id),
      imageHints: [
        "/images/ecole.jpg",
        "/images/ecole-histoire.jpg",
        "/images/ecole-infrastructures.jpg",
        "/images/ecole-projets.jpg",
        "/images/ecole-equipe.jpg",
        "/images/ecole-inscriptions.jpg",
        ...pageImageSlugs,
      ],
    });
  } catch (error) {
    return NextResponse.json({ error: "prefetch failed" }, { status: 500 });
  }
}
