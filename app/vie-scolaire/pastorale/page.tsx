import type { Metadata } from "next";
import Image from "next/image";
import { PageHolder } from "@/components/page-holder";
import type { LucideIcon } from "lucide-react";
import {
  BookOpenCheck,
  Building2,
  HandHeart,
  MapPin,
  Sprout,
  Star,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Highlight = {
  title: string;
  description: string;
  icon: LucideIcon;
  accent: string;
};

type TimelineItem = {
  title: string;
  text: string;
};

type Bullet = {
  title: string;
  details: string[];
};

export const metadata: Metadata = {
  title: "Pastorale | Vie scolaire - École Saint-Augustin",
  description:
    "Histoire chrétienne, ancrage local et mission pastorale de l’école Saint-Augustin en lien avec la paroisse Saint-Martin et la tutelle diocésaine.",
  openGraph: {
    title: "Pastorale | Vie scolaire - École Saint-Augustin",
    description:
      "Une école chrétienne enracinée à Crémieu depuis 1833 : héritage, mission pastorale et projet immobilier partagé.",
    url: "https://www.ecole-saint-augustin.fr/vie-scolaire/pastorale",
    images: [
      {
        url: "/images/vie-scolaire-pastorale.jpg",
        width: 1200,
        height: 675,
        alt: "Pastorale à l’école Saint-Augustin",
      },
    ],
  },
  alternates: {
    canonical: "/vie-scolaire/pastorale",
  },
};

const highlights: Highlight[] = [
  {
    title: "Ancrage chrétien",
    description:
      "Une école née de la volonté de familles chrétiennes, soutenue par Crémieu depuis 1833.",
    icon: Sprout,
    accent: "from-viescolaire to-secondary",
  },
  {
    title: "Mission pastorale",
    description:
      "En lien avec la paroisse Saint-Martin et la direction diocésaine de l’Enseignement Catholique de l’Isère.",
    icon: HandHeart,
    accent: "from-secondary to-secondary-dark",
  },
  {
    title: "Projet partagé",
    description:
      "Association propriétaire, OGEC, équipe éducative et parents portent les projets immobiliers et éducatifs.",
    icon: Building2,
    accent: "from-classes to-classes/70",
  },
];

const timeline: TimelineItem[] = [
  {
    title: "Des origines chrétiennes",
    text: "École née pour offrir une éducation chrétienne au plus grand nombre, avec la bienveillance de la commune.",
  },
  {
    title: "L’ère des Frères",
    text: "Dénommée « école de Quinsonnas », administrée par les Frères des écoles chrétiennes jusqu’en 1904.",
  },
  {
    title: "Acteur du territoire",
    text: "Ancrée à Crémieu depuis 1833, l’école participe à la vie sociale locale et rayonne vers les communes voisines.",
  },
  {
    title: "Engagement pastoral",
    text: "En lien avec la paroisse Saint-Martin de l’Isle Crémieu et la tutelle diocésaine de l’Enseignement Catholique.",
  },
];

const projectPoints: TimelineItem[] = [
  {
    title: "Démarche collective",
    text: "Association propriétaire, OGEC, équipe éducative et parents soutiennent ensemble le projet immobilier.",
  },
  {
    title: "Transmission",
    text: "Chaque génération porte la construction, le financement et le suivi des travaux.",
  },
  {
    title: "Ouverture",
    text: "Le projet accompagne la croissance de l’école et ses missions éducatives et pastorales.",
  },
];

const pastoralBullets: Bullet[] = [
  {
    title: "Culture chrétienne vivante",
    details: [
      "Découverte de la foi et de la culture chrétienne, en continuité avec le projet éducatif de l’école.",
    ],
  },
  {
    title: "Lien paroissial",
    details: [
      "Rencontres, célébrations et accompagnement par la paroisse Saint-Martin, dans l’esprit d’ouverture aux familles.",
    ],
  },
  {
    title: "Mission diocésaine",
    details: [
      "Tutelle de la direction diocésaine de l’Enseignement Catholique de l’Isère pour porter la mission pastorale.",
    ],
  },
  {
    title: "Service et solidarité",
    details: [
      "Vie communautaire et actions partagées inspirées du projet pastoral : respect, dialogue, ouverture et confiance.",
    ],
  },
];

const pastoralClosing: Bullet = {
  title: "Projet pastoral en action",
  details: [
    "Faire vivre une culture chrétienne ouverte et attentive aux élèves et aux familles.",
    "Relier la paroisse Saint-Martin, l’OGEC, l’équipe éducative et les parents autour de valeurs de respect, d’ouverture et de solidarité.",
    "Accompagner chaque enfant dans son épanouissement, y compris spirituel s’il le souhaite, en cohérence avec l’axe pastoral du projet éducatif.",
  ],
};

const PastoralePage = (): JSX.Element => {
  return (
    <PageHolder>
      <div className="space-y-12 pb-16">
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-viescolaire/80 via-viescolaire/60 to-secondary/80 text-secondary shadow-xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.32),transparent_38%),radial-gradient(circle_at_85%_10%,rgba(255,255,255,0.18),transparent_30%)]" />
          <div className="grid gap-10 px-8 py-12 md:grid-cols-[1.05fr,0.95fr] md:px-12 lg:px-16">
            <div className="relative z-10 space-y-6 text-secondary-dark">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-secondary-dark shadow-sm backdrop-blur">
                Vie scolaire - Pastorale
              </span>
              <h1 className="text-3xl font-bold leading-tight text-secondary-dark md:text-4xl">
                Une histoire chrétienne qui se vit aujourd’hui dans la mission
                pastorale de l’école.
              </h1>
              <p className="max-w-2xl text-lg text-secondary-dark/80">
                De la fondation par des familles chrétiennes à l’engagement
                actuel avec la paroisse Saint-Martin, l’école Saint-Augustin
                fait vivre une culture de confiance, de respect et d’ouverture.
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
                  src="/images/vie-scolaire-pastorale.jpg"
                  alt="Éléments pastoraux à l’école Saint-Augustin"
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
                <Star className="h-6 w-6 text-viescolaire" />
                Un héritage vivant
              </CardTitle>
              <p className="text-base md:text-lg text-muted-foreground">
                Une école portée par la foi, le service et le lien avec la
                commune de Crémieu.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-5">
                {timeline.map((item, index) => (
                  <div key={item.title} className="relative pl-14">
                    {index < timeline.length - 1 && (
                      <div className="absolute left-7 top-10 bottom-0 w-px bg-viescolaire/70" />
                    )}
                    <div className="absolute left-4 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-viescolaire to-secondary text-white shadow-md">
                      <span className="text-xs font-semibold">{index + 1}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-secondary">
                      {item.title}
                    </h3>
                    <p className="text-base md:text-lg text-muted-foreground">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
              <Card className="border-none bg-viescolaire/15 shadow-inner">
                <CardContent className="flex flex-col gap-2 p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.12em] text-secondary">
                    Mission pastorale
                  </p>
                  <p className="text-base md:text-lg text-secondary">
                    La paroisse Saint-Martin et la direction diocésaine
                    accompagnent l’école pour faire vivre une culture chrétienne
                    ouverte, attentive aux élèves et aux familles.
                  </p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          <Card className="border-none bg-white/80 shadow-lg ring-1 ring-black/5 backdrop-blur">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-2xl text-secondary">
                <HandHeart className="h-6 w-6 text-secondary" />
                Projet partagé
              </CardTitle>
              <p className="text-base md:text-lg text-muted-foreground">
                Une démarche commune entre l’association propriétaire, l’OGEC,
                l’équipe éducative et les parents.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-5">
                {projectPoints.map((item, index) => (
                  <div key={item.title} className="relative pl-14">
                    {index < projectPoints.length - 1 && (
                      <div className="absolute left-7 top-10 bottom-0 w-px bg-viescolaire/70" />
                    )}
                    <div className="absolute left-4 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-viescolaire to-secondary text-white shadow-md">
                      <span className="text-xs font-semibold">{index + 1}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-secondary">
                      {item.title}
                    </h3>
                    <p className="text-base md:text-lg text-muted-foreground">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1.05fr,0.95fr]">
          <Card className="border-none bg-white/80 shadow-lg ring-1 ring-black/5 backdrop-blur">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-2xl text-secondary">
                <BookOpenCheck className="h-6 w-6 text-secondary" />
                Culture et accompagnement
              </CardTitle>
              <p className="text-base md:text-lg text-muted-foreground">
                La dimension pastorale irrigue la vie scolaire et éducative de
                l’école Saint-Augustin.
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              {pastoralBullets.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl bg-white/70 p-4 shadow-inner ring-1 ring-black/5"
                >
                  <p className="text-base md:text-lg font-semibold text-secondary">
                    {item.title}
                  </p>
                  <ul className="mt-2 space-y-1 text-base md:text-lg text-muted-foreground">
                    {item.details.map((detail) => (
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

          <Card className="border-none bg-gradient-to-br from-secondary/90 via-secondary to-primary-dark text-white shadow-xl">
            <CardContent className="space-y-4 p-8">
              <div className="flex items-center gap-3">
                <MapPin className="h-7 w-7" />
                <h3 className="text-xl font-semibold">
                  Projet pastoral en cohérence
                </h3>
              </div>
              <p className="text-base md:text-lg text-white/90">
                Inspiré des axes pastoraux de l’école, en continuité avec le
                projet éducatif : culture chrétienne vivante, ouverture aux
                familles, respect et dialogue.
              </p>
              <div className="space-y-3">
                {pastoralClosing.details.map((detail) => (
                  <div
                    key={detail}
                    className="rounded-2xl bg-white/10 p-4 backdrop-blur"
                  >
                    <p className="text-sm md:text-base text-white/90">
                      {detail}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </PageHolder>
  );
};

export default PastoralePage;
