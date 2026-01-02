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

  // Seed FAQ categories & FAQs uniquement si tables vides
  const faqCategoryCount = await prisma.fAQCategory.count();
  const faqCount = await prisma.fAQ.count();
  if (faqCategoryCount === 0 && faqCount === 0) {
    const faqCategoriesData = [
      { name: "Vie scolaire", slug: "vie-scolaire" },
      { name: "Inscriptions", slug: "inscriptions" },
      { name: "Cantine", slug: "cantine" },
      { name: "Garderie", slug: "garderie" },
      { name: "Pastorale", slug: "pastorale" },
    ];

    const createdCategories = {};
    for (const cat of faqCategoriesData) {
      const category = await prisma.fAQCategory.create({
        data: cat,
      });
      createdCategories[cat.slug] = category.id;
    }

    const baseQuestions = [
      {
        question: "Quels sont les horaires de classe ?",
        answer:
          "Les cours ont lieu de 8h30 à 11h45 et de 13h30 à 16h30. Accueil dès 8h15.",
      },
      {
        question: "Comment suivre la vie de la classe ?",
        answer:
          "Les nouvelles sont publiées sur le blog de la classe et dans le cahier de liaison numérique.",
      },
      {
        question: "Qui contacter pour un rendez-vous enseignant ?",
        answer:
          "Envoyez un message via l'espace privé ou glissez un mot dans le cahier, l'enseignant proposera un créneau.",
      },
      {
        question: "Y a-t-il des sorties scolaires ?",
        answer:
          "Oui, plusieurs sorties pédagogiques sont prévues dans l'année. Les informations sont transmises en amont.",
      },
      {
        question: "Comment sont gérées les absences ?",
        answer:
          "Prévenez l'école dès que possible par téléphone ou via l'espace privé, et fournissez un justificatif si nécessaire.",
      },
    ];

    for (const cat of faqCategoriesData) {
      for (const qa of baseQuestions) {
        await prisma.fAQ.create({
          data: {
            question: qa.question,
            answer: qa.answer,
            categoryId: createdCategories[cat.slug],
          },
        });
      }
    }
    // eslint-disable-next-line no-console
    console.log("[seed] FAQ categories & FAQs créées");
  } else {
    // eslint-disable-next-line no-console
    console.log("[seed] FAQ déjà présentes, skip");
  }

  // Seed blogposts uniquement si la table est vide
  const blogpostCount = await prisma.blogPost.count();
  const seedPosts = blogpostCount === 0;
  const shouldEnsureEntities = entityCount === 0 || seedPosts;

  if (shouldEnsureEntities) {
    await ensureDefaultEntities({ postsPerEntity: seedPosts ? 5 : 0 });
  } else {
    // eslint-disable-next-line no-console
    console.log("[seed] Blogposts déjà présents, skip création par défaut");
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
