/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const { ensureDefaultPages } = require("../lib/ensure-default-pages");
const { ensureDefaultEntities } = require("../lib/ensure-default-entities");

const prisma = new PrismaClient();

async function main() {
  const pageCount = await prisma.page.count();
  if (pageCount > 0) {
    // eslint-disable-next-line no-console
    console.log("[seed] Pages déjà présentes, skip ensureDefaultPages()");
  } else {
    await ensureDefaultPages();
  }

  const entityCount = await prisma.entity.count();
  if (entityCount > 0) {
    // eslint-disable-next-line no-console
    console.log("[seed] Entités déjà présentes, skip ensureDefaultEntities()");
  } else {
    await ensureDefaultEntities({ postsPerEntity: 5 });
  }
}

main()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log("Seed terminé");
  })
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error("Seed erreur", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
