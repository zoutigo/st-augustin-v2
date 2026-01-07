import type { Metadata } from "next";
import Image from "next/image";
import { PageHolder } from "@/components/page-holder";
import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Building2,
  HandHeart,
  Landmark,
  MapPin,
  Sprout,
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

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Histoire de l'école | École Saint-Augustin Crémieu",
  description:
    "Une école chrétienne enracinée à Crémieu depuis 1833 : héritage, mission pastorale et projet immobilier partagé.",
  openGraph: {
    title: "Histoire de l'école | École Saint-Augustin Crémieu",
    description:
      "Découvrez le parcours de l’école Saint-Augustin, son ancrage local et son engagement pastoral dans le Nord Isère.",
    url: "https://www.ecole-saint-augustin.fr/ecole/histoire",
    images: [
      {
        url: "/images/ecole-histoire.jpg",
        width: 1200,
        height: 675,
        alt: "Façade de l’école Saint-Augustin à Crémieu",
      },
    ],
  },
  alternates: {
    canonical: "/ecole/histoire",
  },
};

const highlights: Highlight[] = [
  {
    title: "Fondée en 1833",
    description:
      "Née de la volonté de familles chrétiennes, avec le soutien de la commune de Crémieu.",
    icon: Landmark,
    accent: "from-ecole to-secondary",
  },
  {
    title: "Ancrée dans la ville",
    description:
      "Un lieu d’éducation qui accompagne Crémieu et les villages voisins, au-delà même de la communauté de communes.",
    icon: MapPin,
    accent: "from-secondary to-secondary-dark",
  },
  {
    title: "Mission pastorale",
    description:
      "En lien avec la paroisse Saint-Martin de l’Isle Crémieu et sous tutelle diocésaine de l’Enseignement Catholique de l’Isère.",
    icon: HandHeart,
    accent: "from-classes to-classes/70",
  },
];

const timeline: TimelineItem[] = [
  {
    title: "Les débuts",
    text: "L’école voit le jour grâce à quelques particuliers désireux d’ouvrir un établissement chrétien accessible au plus grand nombre. La commune de Crémieu l’accompagne dès l’origine.",
  },
  {
    title: "L’ère des Frères des écoles chrétiennes",
    text: "Dénommée « école de Quinsonnas » et propriété du comte du même nom, elle est administrée par les Frères des écoles chrétiennes jusqu’en 1904.",
  },
  {
    title: "Une présence constante",
    text: "Depuis 1833, l’école traverse les périodes de la cité : heures de gloire, moments difficiles et renouveau partagés avec les habitants.",
  },
  {
    title: "Un acteur du territoire",
    text: "Par sa localisation et son rayonnement, l’école participe à la vie sociale de Crémieu et des communes voisines, accueillant des élèves venant parfois de plus loin que la communauté de communes.",
  },
];

const projectPoints: TimelineItem[] = [
  {
    title: "Une démarche collective",
    text: "Le projet immobilier est porté ensemble par l’association propriétaire, l’OGEC et l’équipe éducative.",
  },
  {
    title: "Implication des familles",
    text: "Plusieurs générations de parents d’élèves ont soutenu le montage financier et partagé leurs expertises techniques.",
  },
  {
    title: "Un héritage à transmettre",
    text: "Ce projet assure la continuité d’une école accueillante, fidèle à l’esprit de service qui l’anime depuis près de deux siècles.",
  },
];

const supplementaryHighlights: Highlight[] = [
  {
    title: "École de proximité",
    description:
      "Un établissement à taille humaine qui fait vivre l’entraide entre familles, élèves et équipe éducative.",
    icon: Users,
    accent: "from-viescolaire to-ecole",
  },
  {
    title: "Culture chrétienne vivante",
    description:
      "Un engagement pastoral assumé avec la paroisse Saint-Martin, au cœur de la mission de l’Enseignement Catholique.",
    icon: BookOpen,
    accent: "from-espaceprive to-secondary",
  },
  {
    title: "Tutelle diocésaine",
    description:
      "Accompagnement par la direction diocésaine de l’Enseignement Catholique de l’Isère pour porter le projet éducatif.",
    icon: Building2,
    accent: "from-blog to-primary",
  },
];

const Histoire = (): JSX.Element => {
  return (
    <PageHolder>
      <div className="space-y-12 pb-16">
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-ecole/80 via-ecole/60 to-secondary/80 text-secondary shadow-xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.35),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.18),transparent_30%)]" />
          <div className="grid gap-10 px-8 py-12 md:grid-cols-[1.05fr,0.95fr] md:px-12 lg:px-16">
            <div className="relative z-10 space-y-6 text-secondary-dark">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-secondary-dark shadow-sm backdrop-blur">
                Histoire de l&apos;école
              </span>
              <h1 className="text-3xl font-bold leading-tight text-secondary-dark md:text-4xl">
                Une école chrétienne, héritière de Crémieu depuis 1833.
              </h1>
              <p className="max-w-2xl text-lg text-secondary-dark/80">
                Née d’une initiative locale soutenue par la commune, l’école
                Saint-Augustin a traversé les époques en cultivant la foi, la
                bienveillance et l’ouverture aux familles du territoire.
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
                  src="/images/ecole-histoire.jpg"
                  alt="Vue de l’école Saint-Augustin à Crémieu"
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
          <Card className="border-none bg-white/70 shadow-lg ring-1 ring-black/5 backdrop-blur">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-2xl text-secondary">
                <Sprout className="h-6 w-6 text-ecole" />
                Une histoire enracinée dans la ville
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                De la création à la mission pastorale : un fil conducteur de
                confiance et de service.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-5">
                {timeline.map((item, index) => (
                  <div key={item.title} className="relative pl-14">
                    {index < timeline.length - 1 && (
                      <div className="absolute left-7 top-10 bottom-0 w-px bg-ecole/70" />
                    )}
                    <div className="absolute left-4 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-ecole to-secondary text-white shadow-md">
                      <span className="text-xs font-semibold">{index + 1}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-secondary">
                      {item.title}
                    </h3>
                    <p className="text-base text-muted-foreground">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
              <Card className="border-none bg-ecole/15 shadow-inner">
                <CardContent className="flex flex-col gap-2 p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.12em] text-secondary">
                    Mission pastorale
                  </p>
                  <p className="text-base text-secondary">
                    En lien avec la paroisse Saint-Martin de l’Isle Crémieu, la
                    tutelle diocésaine accompagne l’école pour faire vivre une
                    culture chrétienne ouverte, attentive aux élèves et aux
                    familles.
                  </p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-none bg-secondary text-white shadow-xl">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <HandHeart className="h-6 w-6" />
                  Un acteur social pour Crémieu
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-white/90">
                <p>
                  Par sa situation au cœur de la cité, l’école Saint-Augustin
                  contribue à la vie sociale, culturelle et associative de
                  Crémieu. Elle accueille des élèves provenant des communes
                  voisines et parfois au-delà, témoignant de son rayonnement.
                </p>
                <p>
                  L’esprit de service, partagé avec les habitants, se traduit
                  dans chaque événement : fêtes d’école, rencontres avec les
                  familles, partenariats locaux et actions solidaires.
                </p>
              </CardContent>
            </Card>

            <div className="grid gap-4 sm:grid-cols-2">
              {supplementaryHighlights.map((item) => {
                const Icon = item.icon;
                return (
                  <Card
                    key={item.title}
                    className="border-none bg-white/80 shadow-md ring-1 ring-black/5 backdrop-blur"
                  >
                    <CardContent className="flex gap-3 p-4">
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${item.accent} text-white shadow`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-base font-semibold text-secondary">
                          {item.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[0.95fr,1.05fr]">
          <Card className="border-none bg-white/80 shadow-lg ring-1 ring-black/5 backdrop-blur">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-2xl text-secondary">
                <Building2 className="h-6 w-6 text-ecole" />
                Un projet immobilier partagé
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {projectPoints.map((item, index) => (
                <div key={item.title} className="flex gap-3">
                  <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-lg bg-ecole/70 text-secondary shadow">
                    <span className="text-sm font-semibold">{index + 1}</span>
                  </div>
                  <div>
                    <p className="text-base font-semibold text-secondary">
                      {item.title}
                    </p>
                    <p className="text-sm text-muted-foreground">{item.text}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-none bg-gradient-to-br from-secondary/90 via-secondary to-primary-dark text-white shadow-xl">
            <CardContent className="space-y-4 p-8">
              <div className="flex items-center gap-3">
                <HandHeart className="h-7 w-7" />
                <h3 className="text-xl font-semibold">
                  Un esprit de confiance à transmettre
                </h3>
              </div>
              <p className="text-white/90">
                Chaque étape du projet immobilier s’inscrit dans la continuité
                des responsables successifs de l’OGEC, de l’équipe éducative et
                des parents engagés. Ensemble, ils construisent des espaces
                adaptés pour accueillir les élèves dans les meilleures
                conditions.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                  <p className="text-sm uppercase tracking-[0.12em] text-white/80">
                    Transmission
                  </p>
                  <p className="text-lg font-semibold">
                    Un héritage porté de génération en génération.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                  <p className="text-sm uppercase tracking-[0.12em] text-white/80">
                    Solidarité
                  </p>
                  <p className="text-lg font-semibold">
                    Financement et expertise partagés par les familles.
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

export default Histoire;
