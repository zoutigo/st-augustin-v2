import type { Metadata } from "next";
import Image from "next/image";
import { PageHolder } from "@/components/page-holder";
import type { LucideIcon } from "lucide-react";
import {
  CalendarHeart,
  Coins,
  HandHeart,
  Mail,
  Sparkles,
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

type ListSection = {
  title: string;
  intro: string;
  icon: LucideIcon;
  accent: string;
  items: string[];
};

type Action = {
  title: string;
  details: string;
};

export const metadata: Metadata = {
  title: "APEL | Vie scolaire - École Saint-Augustin",
  description:
    "Découvrez l’APEL de l’école Saint-Augustin : missions, actions, adhésion et contacts pour soutenir les projets éducatifs.",
  openGraph: {
    title: "APEL | Vie scolaire - École Saint-Augustin",
    description:
      "Accueil des parents, soutien des projets, financement d’actions : l’APEL anime la vie de l’école Saint-Augustin.",
    url: "https://www.ecole-saint-augustin.fr/vie-scolaire/apel",
    images: [
      {
        url: "/images/vie-scolaire-apel.jpg",
        width: 1200,
        height: 675,
        alt: "Parents de l’APEL de l’école Saint-Augustin",
      },
    ],
  },
  alternates: {
    canonical: "/vie-scolaire/apel",
  },
};

const highlights: Highlight[] = [
  {
    title: "Parents bénévoles",
    description:
      "Une équipe engagée pour accueillir, écouter et soutenir les familles.",
    icon: Users,
    accent: "from-viescolaire to-secondary",
  },
  {
    title: "Soutien aux projets",
    description:
      "Aide matérielle, financière et humaine pour les actions de l’école.",
    icon: HandHeart,
    accent: "from-secondary to-secondary-dark",
  },
  {
    title: "Caractère propre",
    description:
      "Promotion de l’enseignement catholique et participation aux décisions.",
    icon: Sparkles,
    accent: "from-classes to-classes/70",
  },
];

const missions: ListSection = {
  title: "Nos missions",
  intro:
    "L’APEL accueille, écoute et soutient les projets de l’école en lien avec le directeur et les enseignants.",
  icon: HandHeart,
  accent: "from-viescolaire to-secondary",
  items: [
    "Soutenir la mise en place des projets pédagogiques et pastoraux.",
    "Apporter une aide matérielle, financière ou humaine aux actions régulières ou ponctuelles.",
    "Promouvoir le caractère propre de l’enseignement catholique.",
    "Participer aux décisions via le président (Conseil d’école, CA de l’OGEC).",
    "Animer la dynamique entre parents et avec l’école.",
  ],
};

const recentActions: Action[] = [
  {
    title: "Spectacle & ateliers",
    details:
      "Financement du spectacle des 3 Chardons, mise en place d’ateliers manuels le midi.",
  },
  {
    title: "Équipement durable",
    details: "Achat de composteurs, matériel de jardinage, nouveaux bancs.",
  },
  {
    title: "Activités sportives",
    details:
      "Venue d’intervenants extérieurs pour des activités sportives et éducatives.",
  },
];

const events: Action[] = [
  {
    title: "Marché aux fleurs (mai)",
    details: "Collecte de fonds printanière.",
  },
  {
    title: "Kermesse de l’école",
    details: "Participation active en fin d’année scolaire.",
  },
  {
    title: "Marché de Noël & ventes",
    details: "Chocolats ou objets personnalisés pour les fêtes.",
  },
];

const APELPage = (): JSX.Element => {
  return (
    <PageHolder>
      <div className="space-y-12 pb-16">
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-viescolaire/80 via-viescolaire/60 to-secondary/80 text-secondary shadow-xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.32),transparent_38%),radial-gradient(circle_at_85%_10%,rgba(255,255,255,0.18),transparent_30%)]" />
          <div className="grid gap-10 px-8 py-12 md:grid-cols-[1.05fr,0.95fr] md:px-12 lg:px-16">
            <div className="relative z-10 space-y-6 text-secondary-dark">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-secondary-dark shadow-sm backdrop-blur">
                Vie scolaire - APEL
              </span>
              <h1 className="text-3xl font-bold leading-tight text-secondary-dark md:text-4xl">
                L’APEL, des parents bénévoles qui font vivre les projets de
                l’école.
              </h1>
              <p className="max-w-2xl text-lg text-secondary-dark/80">
                Accueil et écoute des familles, soutien aux enseignants,
                financement d’actions et promotion du caractère propre de
                l’enseignement catholique : l’APEL anime la vie de l’école
                Saint-Augustin.
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
                  src="/images/vie-scolaire-apel.jpg"
                  alt="Parents bénévoles de l’APEL"
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
                <HandHeart className="h-6 w-6 text-viescolaire" />
                Une association ouverte à tous
              </CardTitle>
              <p className="text-base md:text-lg text-muted-foreground">
                Tout parent peut adhérer : 28 € / an / famille. Cette cotisation
                contribue au budget et donne accès à des tarifs réduits sur
                certains spectacles.
              </p>
            </CardHeader>
            <CardContent className="space-y-3 text-base md:text-lg text-muted-foreground">
              <p>
                Le bureau peut être renouvelé à chaque début d’année scolaire
                lors de l’assemblée générale, moment où se discutent et se
                valident les propositions du bureau.
              </p>
              <div className="rounded-2xl bg-viescolaire/15 p-4 shadow-inner">
                <p className="text-sm uppercase tracking-[0.12em] text-secondary">
                  Bénévolat bienvenu
                </p>
                <p className="text-base md:text-lg text-secondary">
                  Toute aide ponctuelle est précieuse et permet d’enrichir les
                  activités proposées aux élèves.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none bg-white/80 shadow-lg ring-1 ring-black/5 backdrop-blur">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-2xl text-secondary">
                <Sprout className="h-6 w-6 text-secondary" />
                Contact APEL
              </CardTitle>
              <p className="text-base md:text-lg text-muted-foreground">
                Une question, une envie d’aider ou d’adhérer ?
              </p>
            </CardHeader>
            <CardContent className="space-y-3 text-base md:text-lg text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-secondary" />
                <a
                  href="mailto:apelstaugustin38@gmail.com"
                  className="font-semibold text-secondary underline-offset-4 hover:underline"
                >
                  apelstaugustin38@gmail.com
                </a>
              </div>
              <p>
                Les parents APEL veillent à maintenir une dynamique conviviale
                entre familles et avec l’école pour faire avancer les projets.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1.05fr,0.95fr]">
          <Card className="border-none bg-white/80 shadow-lg ring-1 ring-black/5 backdrop-blur">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-2xl text-secondary">
                <Users className="h-6 w-6 text-secondary" />
                Missions & décisions
              </CardTitle>
              <p className="text-base md:text-lg text-muted-foreground">
                L’APEL soutient l’école et participe aux instances grâce à son
                président.
              </p>
            </CardHeader>
            <CardContent className="space-y-3 text-base md:text-lg text-muted-foreground">
              <div className="rounded-2xl bg-viescolaire/15 p-4 shadow-inner">
                {(() => {
                  const Icon = missions.icon;
                  return (
                    <div className="flex items-center gap-2 text-secondary">
                      <Icon className="h-5 w-5" />
                      <p className="font-semibold">{missions.title}</p>
                    </div>
                  );
                })()}
                <p className="mt-2 text-base md:text-lg text-muted-foreground">
                  {missions.intro}
                </p>
                <ul className="mt-3 space-y-2">
                  {missions.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-viescolaire" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none bg-gradient-to-br from-secondary/90 via-secondary to-primary-dark text-white shadow-xl">
            <CardContent className="space-y-4 p-8">
              <div className="flex items-center gap-3">
                <Coins className="h-7 w-7" />
                <h3 className="text-xl font-semibold">
                  Actions récentes et financements
                </h3>
              </div>
              <div className="space-y-3">
                {recentActions.map((action) => (
                  <div
                    key={action.title}
                    className="rounded-2xl bg-white/10 p-4 backdrop-blur"
                  >
                    <p className="text-base md:text-lg font-semibold text-white">
                      {action.title}
                    </p>
                    <p className="text-sm md:text-base text-white/85">
                      {action.details}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-8 lg:grid-cols-[0.95fr,1.05fr]">
          <Card className="border-none bg-white/80 shadow-lg ring-1 ring-black/5 backdrop-blur">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-2xl text-secondary">
                <CalendarHeart className="h-6 w-6 text-viescolaire" />
                Manifestations à venir
              </CardTitle>
              <p className="text-base md:text-lg text-muted-foreground">
                Des moments conviviaux pour financer les projets.
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              {events.map((event) => (
                <div
                  key={event.title}
                  className="rounded-2xl bg-white/70 p-4 shadow-inner"
                >
                  <p className="text-base md:text-lg font-semibold text-secondary">
                    {event.title}
                  </p>
                  <p className="text-sm md:text-base text-muted-foreground">
                    {event.details}
                  </p>
                </div>
              ))}
              <p className="text-sm md:text-base text-muted-foreground">
                Chaque manifestation existe grâce au bénévolat des parents. Vous
                pouvez participer ponctuellement ou rejoindre l’équipe : toute
                aide est précieuse !
              </p>
            </CardContent>
          </Card>

          <Card className="border-none bg-white/80 shadow-lg ring-1 ring-black/5 backdrop-blur">
            <CardContent className="space-y-4 p-8">
              <div className="flex items-center gap-3">
                <HandHeart className="h-7 w-7 text-secondary" />
                <h3 className="text-xl font-semibold text-secondary">
                  Rejoindre l’APEL
                </h3>
              </div>
              <p className="text-base md:text-lg text-muted-foreground">
                Adhérez, proposez des idées, participez aux événements ou aidez
                ponctuellement : ensemble, nous soutenons les projets des
                élèves.
              </p>
              <a
                href="mailto:apelstaugustin38@gmail.com"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-white shadow hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <Mail className="h-4 w-4" />
                Contacter l’APEL
              </a>
            </CardContent>
          </Card>
        </section>
      </div>
    </PageHolder>
  );
};

export default APELPage;
