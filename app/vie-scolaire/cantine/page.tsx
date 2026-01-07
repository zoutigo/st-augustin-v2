import type { Metadata } from "next";
import Image from "next/image";
import { PageHolder } from "@/components/page-holder";
import type { LucideIcon } from "lucide-react";
import {
  Apple,
  Clock4,
  CookingPot,
  HandHeart,
  Leaf,
  NotebookPen,
  Sparkles,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Highlight = {
  title: string;
  description: string;
  icon: LucideIcon;
  accent: string;
};

type BulletSection = {
  title: string;
  intro: string;
  icon: LucideIcon;
  accent: string;
  items: string[];
};

type ServiceInfo = {
  title: string;
  time: string;
  details: string[];
};

export const metadata: Metadata = {
  title: "Cantine | Vie scolaire - École Saint-Augustin",
  description:
    "Repas cuisinés sur place avec NEWREST, services en deux temps et animations périscolaires à la cantine de l’École Saint-Augustin.",
  openGraph: {
    title: "Cantine | Vie scolaire - École Saint-Augustin",
    description:
      "Repas équilibrés préparés sur place, collaboration OGEC/NEWREST, services maternelle-CP puis CE1-CM2, activités et jeux sur le temps de cantine.",
    url: "https://www.ecole-saint-augustin.fr/vie-scolaire/cantine",
    images: [
      {
        url: "/images/vie-scolaire-cantine.jpg",
        width: 1200,
        height: 675,
        alt: "Cantine de l’école Saint-Augustin",
      },
    ],
  },
  alternates: {
    canonical: "/vie-scolaire/cantine",
  },
};

const highlights: Highlight[] = [
  {
    title: "Repas cuisinés sur place",
    description:
      "Cuisine assurée avec NEWREST, produits frais et recettes maison.",
    icon: CookingPot,
    accent: "from-viescolaire to-secondary",
  },
  {
    title: "Équilibre et transparence",
    description:
      "Menus équilibrés, infos sur provenance, bio et préparations maison dans les brèves.",
    icon: Leaf,
    accent: "from-secondary to-secondary-dark",
  },
  {
    title: "Service organisé",
    description:
      "Deux services pour fluidifier les flux : maternelle/CP puis CE1-CM2.",
    icon: Users,
    accent: "from-classes to-classes/70",
  },
];

const collaborationSection: BulletSection = {
  title: "Une collaboration étroite",
  intro:
    "OGEC, société NEWREST, direction, dames de service et surveillantes travaillent ensemble pour un service de qualité.",
  icon: HandHeart,
  accent: "from-viescolaire to-secondary",
  items: [
    "Réunions régulières pour ajuster repas, service, organisation et coordination.",
    "Adaptation quotidienne aux effectifs et aux contraintes sanitaires.",
    "Gestion des flux pour maintenir confort et sécurité en salle.",
  ],
};

const services: ServiceInfo[] = [
  {
    title: "Service maternelle & CP",
    time: "11h30 – 12h15",
    details: [
      "Accompagnement des plus jeunes pour un repas serein.",
      "Accueil encadré par l’équipe de vie scolaire.",
    ],
  },
  {
    title: "Service CE1 à CM2",
    time: "12h30 – 13h15",
    details: [
      "Organisation adaptée aux flux plus importants.",
      "Inscription possible le matin via un ticket remis à l’enseignant (selon capacité).",
    ],
  },
];

const inscriptionSection: BulletSection = {
  title: "Inscriptions et capacités",
  intro:
    "Les inscriptions du matin restent possibles, mais l’augmentation des effectifs impose des ajustements quotidiens.",
  icon: NotebookPen,
  accent: "from-secondary to-primary",
  items: [
    "Réorganisation des tables en fonction des nouvelles inscriptions exceptionnelles.",
    "Contraintes sanitaires : plus d’espace libre requis en salle.",
    "Objectif : accueillir tout le monde en ajustant chaque jour l’agencement.",
  ],
};

const animationsSection: BulletSection = {
  title: "Au-delà du repas",
  intro:
    "La cantine est aussi un temps de jeux, d’animations périscolaires et d’APC.",
  icon: Sparkles,
  accent: "from-classes to-classes/80",
  items: [
    "Jeux dans la cour, prêt de jouets ou matériel de sport par classe.",
    "Bricolages, relaxation, lectures offertes, animations par bénévoles et surveillantes.",
    "APC animées par les enseignantes : éco-délégués, soutien scolaire.",
  ],
};

const CantinePage = (): JSX.Element => {
  return (
    <PageHolder>
      <div className="space-y-12 pb-16">
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-viescolaire/80 via-viescolaire/60 to-secondary/80 text-secondary shadow-xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.32),transparent_38%),radial-gradient(circle_at_85%_10%,rgba(255,255,255,0.18),transparent_30%)]" />
          <div className="grid gap-10 px-8 py-12 md:grid-cols-[1.05fr,0.95fr] md:px-12 lg:px-16">
            <div className="relative z-10 space-y-6 text-secondary-dark">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-secondary-dark shadow-sm backdrop-blur">
                Vie scolaire - Cantine
              </span>
              <h1 className="text-3xl font-bold leading-tight text-secondary-dark md:text-4xl">
                Des repas cuisinés sur place et un temps de midi vivant, au
                service des élèves.
              </h1>
              <p className="max-w-2xl text-lg text-secondary-dark/80">
                Collaboration OGEC/NEWREST, produits frais, services adaptés et
                animations périscolaires : la cantine accompagne les élèves dans
                de bonnes conditions, avec souplesse et écoute des familles.
              </p>
              <div className="grid gap-4 sm:grid-cols-3">
                {highlights.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Card
                      key={item.title}
                      className="border-none bg-white/80 shadow-md backdrop-blur"
                    >
                      <CardContent className="flex flex-col gap-2 p-4">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${item.accent} text-white shadow`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-secondary-dark">
                            {item.title}
                          </p>
                          <p className="text-sm text-secondary-dark/80">
                            {item.description}
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
                  src="/images/vie-scolaire-cantine.jpg"
                  alt="Cantine de l’école Saint-Augustin"
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
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-2xl text-secondary">
                <CookingPot className="h-6 w-6 text-viescolaire" />
                Une cuisine sur place
              </CardTitle>
              <p className="text-base md:text-lg text-muted-foreground">
                Des repas équilibrés, préparés avec des produits frais et des
                recettes maison.
              </p>
            </CardHeader>
            <CardContent className="space-y-3 text-base md:text-lg text-muted-foreground">
              <p>
                Les informations sur la provenance des produits et les plats «
                fait maison » (gâteaux, pizzas, lasagnes, gratins…) sont
                partagées dans les brèves pour informer les familles.
              </p>
              <div className="rounded-2xl bg-viescolaire/15 p-4 shadow-inner">
                <div className="flex items-center gap-2 text-secondary">
                  <Apple className="h-5 w-5" />
                  <p className="font-semibold">Qualité des repas</p>
                </div>
                <p className="mt-2 text-base md:text-lg text-secondary">
                  Collaboration OGEC/NEWREST et équipe de service pour garantir
                  équilibre, goût et respect des contraintes sanitaires.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none bg-white/80 shadow-lg ring-1 ring-black/5 backdrop-blur">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-2xl text-secondary">
                <HandHeart className="h-6 w-6 text-secondary" />
                Coordination quotidienne
              </CardTitle>
              <p className="text-base md:text-lg text-muted-foreground">
                Un service ajusté en fonction des effectifs et des contraintes.
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-base md:text-lg text-muted-foreground">
                Réunions régulières pour faire le point sur repas, service,
                organisation et gestion des flux ; adaptation aux nouvelles
                inscriptions grâce à des réajustements quotidiens des espaces.
              </p>
              <Card className="border-none bg-viescolaire/15 shadow-inner">
                <CardContent className="flex flex-col gap-2 p-4">
                  <p className="text-sm uppercase tracking-[0.12em] text-secondary">
                    Flexibilité
                  </p>
                  <p className="text-base md:text-lg text-secondary">
                    L’objectif reste d’accueillir tous les élèves tout en
                    conservant confort et sécurité.
                  </p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1.05fr,0.95fr]">
          <Card className="border-none bg-white/80 shadow-lg ring-1 ring-black/5 backdrop-blur">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-2xl text-secondary">
                <Clock4 className="h-6 w-6 text-secondary" />
                Deux services pour fluidifier
              </CardTitle>
              <p className="text-base md:text-lg text-muted-foreground">
                Organisation en deux temps pour adapter le service aux âges et
                aux flux.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="rounded-2xl bg-white/70 p-4 shadow-inner ring-1 ring-black/5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-base md:text-lg font-semibold text-secondary">
                        {service.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {service.time}
                      </p>
                    </div>
                  </div>
                  <ul className="mt-2 space-y-1 text-base md:text-lg text-muted-foreground">
                    {service.details.map((detail) => (
                      <li key={detail} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-viescolaire" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-none bg-white/80 shadow-lg ring-1 ring-black/5 backdrop-blur">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-2xl text-secondary">
                <NotebookPen className="h-6 w-6 text-secondary" />
                Inscriptions et capacités
              </CardTitle>
              <p className="text-base md:text-lg text-muted-foreground">
                Inscription possible le matin via ticket, sous réserve des
                places disponibles.
              </p>
            </CardHeader>
            <CardContent className="space-y-2">
              <ul className="space-y-2 text-base md:text-lg text-muted-foreground">
                {inscriptionSection.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-viescolaire" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Card className="border-none bg-viescolaire/15 shadow-inner">
                <CardContent className="flex flex-col gap-2 p-4">
                  <p className="text-sm uppercase tracking-[0.12em] text-secondary">
                    Adaptation
                  </p>
                  <p className="text-base md:text-lg text-secondary">
                    En fonction des effectifs par classe, l’équipe s’organise
                    pour accueillir au mieux les élèves.
                  </p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-8 lg:grid-cols-[0.95fr,1.05fr]">
          <Card className="border-none bg-white/80 shadow-lg ring-1 ring-black/5 backdrop-blur">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-2xl text-secondary">
                <Sparkles className="h-6 w-6 text-secondary" />
                Animations périscolaires
              </CardTitle>
              <p className="text-base md:text-lg text-muted-foreground">
                La cantine, c’est aussi un temps de jeu et de détente.
              </p>
            </CardHeader>
            <CardContent className="space-y-2">
              <ul className="space-y-2 text-base md:text-lg text-muted-foreground">
                {animationsSection.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-viescolaire" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-none bg-gradient-to-br from-secondary/90 via-secondary to-primary-dark text-white shadow-xl">
            <CardContent className="space-y-4 p-8">
              <div className="flex items-center gap-3">
                <Sparkles className="h-7 w-7" />
                <h3 className="text-xl font-semibold">
                  Un temps de midi vivant
                </h3>
              </div>
              <p className="text-base md:text-lg text-white/90">
                Entre repas, jeux et animations, la cantine reste un moment de
                convivialité pour tous. L’équipe et les bénévoles veillent à
                proposer des activités variées et adaptées.
              </p>
              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                <p className="text-sm uppercase tracking-[0.12em] text-white/80">
                  Souplesse & écoute
                </p>
                <p className="text-lg font-semibold">
                  Les ajustements quotidiens permettent d’accueillir au mieux
                  les élèves tout en maintenant un cadre serein.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </PageHolder>
  );
};

export default CantinePage;
