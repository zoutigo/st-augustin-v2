/* eslint-disable @typescript-eslint/no-var-requires */
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const defaultTiptapDoc = (title) => ({
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: { level: 2 },
      content: [{ type: "text", text: title }],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Contenu par défaut. Modifiez cette page dans le dashboard.",
        },
      ],
    },
  ],
});

const DEFAULT_PAGES = [
  { slug: "ecole", name: "L'école" },
  { slug: "ecole-inscriptions", name: "Inscriptions" },
  { slug: "ecole-equipe", name: "Equipe" },
  { slug: "ecole-histoire", name: "Histoire" },
  { slug: "ecole-projets", name: "Projets" },
  { slug: "ecole-infrastructures", name: "Infrastructures" },
  { slug: "vie-scolaire-garderie", name: "Garderie" },
];

async function ensureDefaultPages() {
  for (const p of DEFAULT_PAGES) {
    try {
      await prisma.page.upsert({
        where: { slug: p.slug },
        update: {}, // ne touche pas au contenu existant
        create: {
          slug: p.slug,
          name: p.name,
          release: true,
          content: JSON.stringify(defaultTiptapDoc(p.name)),
        },
      });
      // eslint-disable-next-line no-console
      console.log(`[seed] Page garantie: ${p.slug}`);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(`[seed] Echec upsert pour ${p.slug}`, e);
    }
  }
}

module.exports = { ensureDefaultPages };
