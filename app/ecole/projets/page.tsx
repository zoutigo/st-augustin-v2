import type { Metadata } from "next";
import Image from "next/image";
import { PageHolder } from "@/components/page-holder";
import type { LucideIcon } from "lucide-react";
import {
  Anchor,
  BookOpenCheck,
  Compass,
  Globe2,
  HeartHandshake,
  Leaf,
  Megaphone,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Axis = {
  title: string;
  description: string;
  icon: LucideIcon;
  accent: string;
};

type Bullet = {
  title: string;
  details: string[];
};

type ListSection = {
  title: string;
  intro: string;
  icon: LucideIcon;
  items: Bullet[];
  accent: string;
};

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Projets éducatifs | École Saint-Augustin Crémieu",
  description:
    "Axes éducatif, pédagogique et pastoral de l’École Saint-Augustin : respect, ouverture, réussite de tous et vie chrétienne.",
  openGraph: {
    title: "Projets éducatifs | École Saint-Augustin Crémieu",
    description:
      "Découvrez les axes éducatif, pédagogique et pastoral portés par l’école Saint-Augustin, ouverte à tous et ancrée à Crémieu.",
    url: "https://www.ecole-saint-augustin.fr/ecole/projets",
    images: [
      {
        url: "/images/ecole-projets.jpg",
        width: 1200,
        height: 675,
        alt: "Élèves de l’école Saint-Augustin en activité",
      },
    ],
  },
  alternates: {
    canonical: "/ecole/projets",
  },
};

const axes: Axis[] = [
  {
    title: "Pastoral",
    description:
      "Culture chrétienne vivante, en lien avec la paroisse Saint-Martin et la tutelle diocésaine.",
    icon: Sparkles,
    accent: "from-ecole to-secondary",
  },
  {
    title: "Éducatif",
    description:
      "Bienveillance, respect, dialogue et ouverture aux familles pour l’épanouissement de chacun.",
    icon: HeartHandshake,
    accent: "from-secondary to-secondary-dark",
  },
  {
    title: "Pédagogique",
    description:
      "Réussite de tous grâce à des pratiques différenciées, des projets et une formation continue des enseignants.",
    icon: BookOpenCheck,
    accent: "from-classes to-classes/70",
  },
];

const respectSection: ListSection = {
  title: "Respect et climat serein",
  intro:
    "Politesse, tolérance et soin de l’environnement guident la vie de l’école. Chaque enfant est accompagné pour comprendre la portée de ses actes et paroles.",
  icon: Leaf,
  accent: "from-ecole to-secondary",
  items: [
    {
      title: "Dialogue et écoute",
      details: [
        "Échanges réguliers pour mieux se connaître et désamorcer les tensions.",
        "Phrases de réflexion partagées pour sensibiliser aux valeurs morales, citoyennes et chrétiennes.",
      ],
    },
    {
      title: "Responsabilisation",
      details: [
        "Permis de conduite remis dès le CP pour encourager les bons comportements et dialoguer avec les familles.",
        "Contrats proposés pour soutenir les attitudes positives et réparer si besoin.",
      ],
    },
    {
      title: "Bienveillance ferme",
      details: [
        "Communication calme et non-violente, questionnement pour comprendre et progresser.",
        "Prise en compte de l’environnement, des biens communs et, pour les croyants, d’une relation à Dieu.",
      ],
    },
  ],
};

const ouvertureSection: ListSection = {
  title: "Ouverture sur le monde",
  intro:
    "Des expériences variées pour découvrir l’autre, la culture et la solidarité, au-delà des murs de l’école.",
  icon: Globe2,
  accent: "from-secondary to-primary",
  items: [
    {
      title: "Solidarité et rencontres",
      details: [
        "Téléthon, visites à la maison de retraite de Crémieu, échanges avec lycéens et stagiaires.",
        "Courseton avec sportifs de haut niveau, ateliers partagés avec le Lycée Paul Claudel.",
      ],
    },
    {
      title: "Vie locale et culturelle",
      details: [
        "Participation aux concours de poésie, fréquentation régulière de la bibliothèque.",
        "Implication dans la vie de la commune et rencontres inter-écoles.",
      ],
    },
    {
      title: "Vie chrétienne",
      details: [
        "Rencontres et célébrations avec le prêtre, éveil à la foi pour les volontaires.",
        "Spectacles, sorties scolaires et échanges pour nourrir curiosité et ouverture d’esprit.",
      ],
    },
  ],
};

const pedagogieSection: ListSection = {
  title: "Pédagogie pour la réussite de tous",
  intro:
    "Des pratiques différenciées, une harmonisation des progressions et des projets pour accompagner chaque élève.",
  icon: Target,
  accent: "from-classes to-classes/80",
  items: [
    {
      title: "Différenciation et soutien",
      details: [
        "Ateliers et entraînements adaptés au rythme de chacun, présence d’aide éducative.",
        "Étayages pour rassurer les élèves en difficulté, approfondissements et tutorats pour les plus à l’aise.",
      ],
    },
    {
      title: "Aide personnalisée",
      details: [
        "Mise en place pendant ou hors temps scolaire si nécessaire.",
        "Contrats éducatifs et attention particulière à l’apprentissage de la lecture en cycle 2.",
      ],
    },
    {
      title: "Harmonisation et collaboration",
      details: [
        "Progressions concertées entre classes, décloisonnement et projets interclasses.",
        "Collaborations inter-écoles : concours, ateliers animés par des lycéens, présentations de projets.",
      ],
    },
    {
      title: "Évaluation bienveillante",
      details: [
        "Livret d’évaluation conforme aux programmes pour rendre compte des acquis.",
      ],
    },
  ],
};

const pastoralBullets: Bullet[] = [
  {
    title: "Culture catholique ouverte",
    details: [
      "Connaissance de la religion et première annonce portée par des témoins.",
    ],
  },
  {
    title: "Rencontres et symboles",
    details: [
      "Visite du prêtre en début d’année, préparation aux grandes fêtes (Noël, Pâques).",
    ],
  },
  {
    title: "Temps forts partagés",
    details: [
      "Célébrations, 8 décembre, temps de prière ou de partage pour les volontaires.",
    ],
  },
  {
    title: "Solidarité en actes",
    details: [
      "Bols de riz pendant le carême, au profit d’associations caritatives.",
    ],
  },
];

const renderListSection = (section: ListSection): JSX.Element => {
  const Icon = section.icon;
  return (
    <Card className="border-none bg-white/80 shadow-lg ring-1 ring-black/5 backdrop-blur">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-2xl text-secondary">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${section.accent} text-white shadow`}
          >
            <Icon className="h-5 w-5" />
          </div>
          {section.title}
        </CardTitle>
        <p className="text-base md:text-lg text-muted-foreground">
          {section.intro}
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        {section.items.map((item) => (
          <div
            key={item.title}
            className="space-y-2 rounded-2xl bg-white/70 p-4 shadow-inner"
          >
            <p className="text-base md:text-lg font-semibold text-secondary">
              {item.title}
            </p>
            <ul className="space-y-1 text-base md:text-lg text-muted-foreground">
              {item.details.map((detail) => (
                <li key={detail} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-ecole" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

const ProjetsPage = (): JSX.Element => {
  return (
    <PageHolder>
      <div className="space-y-12 pb-16">
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-ecole/80 via-ecole/60 to-secondary/80 text-secondary shadow-xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(255,255,255,0.3),transparent_35%),radial-gradient(circle_at_90%_10%,rgba(255,255,255,0.16),transparent_30%)]" />
          <div className="grid gap-10 px-8 py-12 md:grid-cols-[1.05fr,0.95fr] md:px-12 lg:px-16">
            <div className="relative z-10 space-y-6 text-secondary-dark">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-secondary-dark shadow-sm backdrop-blur">
                Projets éducatifs
              </span>
              <h1 className="text-3xl font-bold leading-tight text-secondary-dark md:text-4xl">
                Une école ouverte à tous, portée par trois axes indissociables.
              </h1>
              <p className="max-w-2xl text-lg text-secondary-dark/80">
                L&apos;école Saint-Augustin, catholique sous contrat, mise sur
                le pastoral, l&apos;éducatif et le pédagogique pour accompagner
                chaque enfant dans son épanouissement intellectuel, culturel,
                personnel et, s&apos;il le souhaite, spirituel.
              </p>
              <div className="grid gap-4 sm:grid-cols-3">
                {axes.map((axis) => {
                  const Icon = axis.icon;
                  return (
                    <Card
                      key={axis.title}
                      className="border-none bg-white/80 shadow-md backdrop-blur"
                    >
                      <CardContent className="flex flex-col gap-2 p-4">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${axis.accent} text-white shadow`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-secondary-dark">
                            {axis.title}
                          </p>
                          <p className="text-sm text-secondary-dark/80">
                            {axis.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
            <div className="relative z-10">
              <div className="relative h-72 w-full overflow-hidden rounded-3xl shadow-2xl ring-8 ring-white/40 md:h-full">
                <Image
                  src="/images/ecole-projets.jpg"
                  alt="Projet pédagogique à l’école Saint-Augustin"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 560px, 100vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1.05fr,0.95fr]">
          <Card className="border-none bg-white/80 shadow-lg ring-1 ring-black/5 backdrop-blur">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-2xl text-secondary">
                <Users className="h-6 w-6 text-ecole" />
                Un encadrement bienveillant et exigeant
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                L’équipe éducative expérimentée fixe des repères clairs pour le
                bien-être de tous et ouvre les élèves aux autres et au monde.
              </p>
            </CardHeader>
            <CardContent className="space-y-4 text-base md:text-lg text-muted-foreground">
              <p>
                L’école se donne pour mission l’épanouissement intellectuel,
                culturel, personnel, relationnel, émotionnel et, pour ceux qui
                le souhaitent, spirituel. Les projets pédagogiques favorisent
                l’ouverture et l’entraide.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-ecole/15 p-4 shadow-inner">
                  <p className="text-sm uppercase tracking-[0.12em] text-secondary">
                    Bienveillance
                  </p>
                  <p className="text-base text-secondary">
                    Accompagnement proche et limites nécessaires au bien commun.
                  </p>
                </div>
                <div className="rounded-2xl bg-ecole/15 p-4 shadow-inner">
                  <p className="text-sm uppercase tracking-[0.12em] text-secondary">
                    Projets
                  </p>
                  <p className="text-base text-secondary">
                    Ouverture aux autres, au monde et aux familles du
                    territoire.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {renderListSection(respectSection)}
        </section>

        <section className="grid gap-8 lg:grid-cols-[0.95fr,1.05fr]">
          {renderListSection(ouvertureSection)}
          <Card className="border-none bg-gradient-to-br from-secondary/90 via-secondary to-primary-dark text-white shadow-xl">
            <CardContent className="space-y-4 p-8">
              <div className="flex items-center gap-3">
                <Compass className="h-7 w-7" />
                <h3 className="text-xl font-semibold">Un horizon large</h3>
              </div>
              <p className="text-base md:text-lg text-white/90">
                Rencontres intergénérationnelles, actions solidaires, culture,
                sport, foi : l’ouverture est un état d’esprit au quotidien, pour
                grandir en humanité et en confiance.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                  <p className="text-sm uppercase tracking-[0.12em] text-white/80">
                    Solidarité
                  </p>
                  <p className="text-lg font-semibold">
                    Téléthon, bols de riz, partages avec la paroisse.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                  <p className="text-sm uppercase tracking-[0.12em] text-white/80">
                    Culture & sport
                  </p>
                  <p className="text-lg font-semibold">
                    Bibliothèque, théâtre, Courseton et rencontres sportives.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1.05fr,0.95fr]">
          {renderListSection(pedagogieSection)}
          <Card className="border-none bg-white/80 shadow-lg ring-1 ring-black/5 backdrop-blur">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-2xl text-secondary">
                <Megaphone className="h-6 w-6 text-ecole" />
                Des projets partagés
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Chaque initiative pédagogique ou éducative associe les élèves,
                les enseignants et souvent les familles.
              </p>
            </CardHeader>
            <CardContent className="space-y-3 text-base md:text-lg text-muted-foreground">
              <p>
                L’école favorise la coéducation, soutenue par la communauté
                éducative et les parents, pour que chaque enfant trouve sa place
                et progresse.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-ecole/15 p-4 shadow-inner">
                  <p className="text-sm uppercase tracking-[0.12em] text-secondary">
                    Réussite de tous
                  </p>
                  <p className="text-base text-secondary">
                    Aides, approfondissements, évaluation bienveillante.
                  </p>
                </div>
                <div className="rounded-2xl bg-ecole/15 p-4 shadow-inner">
                  <p className="text-sm uppercase tracking-[0.12em] text-secondary">
                    Coopération
                  </p>
                  <p className="text-base text-secondary">
                    Projets interclasses et inter-écoles, tutorats et ateliers.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-8 lg:grid-cols-[0.95fr,1.05fr]">
          <Card className="border-none bg-secondary text-white shadow-xl">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Anchor className="h-6 w-6" />
                Projet pastoral
              </CardTitle>
              <p className="text-sm text-white/80">
                Une culture catholique accessible à tous, avec des temps forts
                qui rythment l’année.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-base md:text-lg text-white/90">
                {pastoralBullets.map((item) => (
                  <li
                    key={item.title}
                    className="rounded-2xl bg-white/10 p-4 backdrop-blur"
                  >
                    <p className="text-base font-semibold">{item.title}</p>
                    <ul className="mt-1 space-y-1 text-base md:text-lg text-white/85">
                      {item.details.map((detail) => (
                        <li key={detail} className="flex gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/70" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-none bg-white/80 shadow-lg ring-1 ring-black/5 backdrop-blur">
            <CardContent className="space-y-4 p-8">
              <div className="flex items-center gap-3">
                <HeartHandshake className="h-7 w-7 text-ecole" />
                <h3 className="text-xl font-semibold text-secondary">
                  Une communauté engagée
                </h3>
              </div>
              <p className="text-base md:text-lg text-muted-foreground">
                Familles, enseignants, paroisse et partenaires locaux
                soutiennent chaque projet. Cette dynamique collective permet de
                financer, organiser et enrichir les actions de l’école.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-ecole/15 p-4 shadow-inner">
                  <p className="text-sm uppercase tracking-[0.12em] text-secondary">
                    Partenaires
                  </p>
                  <p className="text-base text-secondary">
                    Paroisse, associations locales, établissements voisins.
                  </p>
                </div>
                <div className="rounded-2xl bg-ecole/15 p-4 shadow-inner">
                  <p className="text-sm uppercase tracking-[0.12em] text-secondary">
                    Engagement
                  </p>
                  <p className="text-base text-secondary">
                    Implication des familles et coéducation au quotidien.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </PageHolder>
  );
};

export default ProjetsPage;
