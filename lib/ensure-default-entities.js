/* eslint-disable @typescript-eslint/no-var-requires */
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const DEFAULT_ENTITIES = [
  // Vie scolaire
  { slug: 'cantine', name: 'Cantine' },
  { slug: 'apel', name: 'APEL' },
  { slug: 'ogec', name: 'OGEC' },
  { slug: 'pastorale', name: 'Pastorale' },
  // Classes
  { slug: 'ps', name: 'Petite Section' },
  { slug: 'ms', name: 'Moyenne Section' },
  { slug: 'gs', name: 'Grande Section' },
  { slug: 'cp', name: 'CP' },
  { slug: 'ce1', name: 'CE1' },
  { slug: 'ce2', name: 'CE2' },
  { slug: 'cm1', name: 'CM1' },
  { slug: 'cm2', name: 'CM2' },
];

const defaultDoc = (title) =>
  JSON.stringify({
    type: 'doc',
    content: [
      { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: title }] },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: "Contenu par défaut. Ajoutez vos informations et articles depuis le dashboard.",
          },
        ],
      },
    ],
  });

async function ensureDefaultEntities({ postsPerEntity = 4 } = {}) {
  for (const e of DEFAULT_ENTITIES) {
    try {
      // Upsert de l'entité
      let entity = await prisma.entity.upsert({
        where: { slug: e.slug },
        update: {},
        create: {
          slug: e.slug,
          name: e.name,
          description: defaultDoc(e.name),
        },
      });

      // Corrige les entités existantes dont la description n'est pas un JSON TipTap valide
      try {
        JSON.parse(entity.description);
      } catch {
        entity = await prisma.entity.update({
          where: { id: entity.id },
          data: { description: defaultDoc(e.name) },
        });
      }

      // Vérifie le nombre d'articles existants et complète jusqu'à postsPerEntity
      const existingCount = await prisma.blogPost.count({ where: { entityId: entity.id } });
      const toCreate = Math.max(0, postsPerEntity - existingCount);

      for (let i = 0; i < toCreate; i++) {
        const index = existingCount + i + 1;
        await prisma.blogPost.create({
          data: {
            title: `${e.name} - Article ${index}`,
            content: defaultDoc(`${e.name} - Article ${index}`),
            isPublic: true,
            isReleased: true,
            entityId: entity.id,
          },
        });
      }

      // eslint-disable-next-line no-console
      console.log(`[seed] Entité garantie: ${e.slug} (+${toCreate} posts)`);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(`[seed] Echec ensure entity ${e.slug}`, err);
    }
  }
}

module.exports = { ensureDefaultEntities };
