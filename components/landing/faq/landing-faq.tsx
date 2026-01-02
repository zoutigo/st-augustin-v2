import { getAllFaqs } from "@/actions/faq/faqs";
import { LandingFaqCarousel, LandingFaqItem } from "./landing-faq-carousel";

const fallbackFaqs: LandingFaqItem[] = [
  {
    id: "fallback-1",
    category: "Vie scolaire",
    question: "Comment sont gérées les absences ?",
    answer:
      "Prévenez l'école dès que possible par téléphone ou via l'espace privé, et fournissez un justificatif si nécessaire.",
  },
  {
    id: "fallback-2",
    category: "Organisation",
    question: "Quelles sont les horaires de classe ?",
    answer:
      "Les cours ont lieu de 8h30 à 11h45 et de 13h30 à 16h30. Accueil dès 8h15.",
  },
  {
    id: "fallback-3",
    category: "Sorties",
    question: "Y a-t-il des sorties scolaires ?",
    answer:
      "Oui, plusieurs sorties pédagogiques sont prévues dans l'année. Les informations sont transmises en amont.",
  },
  {
    id: "fallback-4",
    category: "Contact",
    question: "Qui contacter pour un rendez-vous enseignant ?",
    answer:
      "Envoyez un message via l'espace privé ou glissez un mot dans le cahier, l'enseignant proposera un créneau.",
  },
  {
    id: "fallback-5",
    category: "Classes",
    question: "Comment suivre la vie de la classe ?",
    answer:
      "Les nouvelles sont publiées sur le blog de la classe et dans le cahier de liaison numérique.",
  },
];

export const LandingFaq = async () => {
  let faqs: LandingFaqItem[] = fallbackFaqs;

  try {
    const data = await getAllFaqs();
    const featured = data
      .filter((f) => f.isFeatured)
      .map((f) => ({
        id: f.id,
        question: f.question,
        answer: f.answer,
        category: f.category?.name ?? "FAQ",
      }));

    if (featured.length > 0) {
      faqs = featured;
    }
  } catch (error) {
    // On garde le fallback silencieusement
  }

  return (
    <section className="relative bg-gradient-to-b from-white via-blue-50/40 to-white py-12 md:py-16 px-4 md:px-10">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-6 left-8 w-24 h-24 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute bottom-4 right-10 w-32 h-32 rounded-full bg-secondary/20 blur-3xl" />
      </div>
      <div className="max-w-6xl mx-auto space-y-6 relative">
        <div className="flex flex-col gap-2">
          <p className="text-xs md:text-sm uppercase tracking-[0.35em] text-primary/80">
            Questions en un clin d&apos;œil
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-secondary">
            FAQ essentielles
          </h2>
          <p className="text-base md:text-lg text-secondary/80 max-w-3xl">
            Les réponses rapides aux questions les plus fréquentes. Faites
            défiler pour découvrir les infos clés avant même de nous contacter.
          </p>
        </div>

        <LandingFaqCarousel faqs={faqs} />
      </div>
    </section>
  );
};
