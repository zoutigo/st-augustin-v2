import type { Metadata } from "next";
import Image from "next/image";
import { PageHolder } from "@/components/page-holder";
import type { LucideIcon } from "lucide-react";
import {
  AlarmClock,
  BellRing,
  BookOpenCheck,
  Clock4,
  Coins,
  HeartHandshake,
  MoonStar,
  Shield,
  Sun,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Highlight = {
  title: string;
  description: string;
  icon: LucideIcon;
  accent: string;
};

type Slot = {
  title: string;
  time: string;
  details: string[];
  icon: LucideIcon;
  accent: string;
};

type Tariff = {
  label: string;
  amount: string;
  note?: string;
};

export const metadata: Metadata = {
  title: "Garderie & études | Vie scolaire - École Saint-Augustin",
  description:
    "Horaires, tarifs et encadrement de la garderie matin/soir et des études dirigées différenciées pour les élèves de l’école Saint-Augustin.",
  openGraph: {
    title: "Garderie & études | Vie scolaire - École Saint-Augustin",
    description:
      "Garderie du matin et du soir, études dirigées par cycle, horaires aménagés et tarifs des carnets pour accompagner chaque élève.",
    url: "https://www.ecole-saint-augustin.fr/vie-scolaire/garderie",
    images: [
      {
        url: "/images/vie-scolaire-garderie.jpg",
        width: 1200,
        height: 675,
        alt: "Garderie et étude à l’école Saint-Augustin",
      },
    ],
  },
  alternates: {
    canonical: "/vie-scolaire/garderie",
  },
};

const highlights: Highlight[] = [
  {
    title: "Accueil dès 7h30",
    description:
      "Garderie du matin pour faciliter l’organisation des familles.",
    icon: Sun,
    accent: "from-viescolaire to-secondary",
  },
  {
    title: "Fin de journée sereine",
    description:
      "Garderie soir maternelle ou études dirigées pour les élémentaires.",
    icon: MoonStar,
    accent: "from-secondary to-secondary-dark",
  },
  {
    title: "Études différenciées",
    description:
      "Groupes par cycles (CP-CE1 et CE2-CM1-CM2) guidés par les enseignantes.",
    icon: BookOpenCheck,
    accent: "from-classes to-classes/80",
  },
];

const morningSlot: Slot = {
  title: "Garderie du matin",
  time: "7h30 – 8h15",
  details: [
    "Accueil surveillé par Véronique LANDRY.",
    "Carnet de 10 tickets : 31 €.",
  ],
  icon: AlarmClock,
  accent: "from-viescolaire to-secondary",
};

const eveningSlot: Slot = {
  title: "Garderie du soir (maternelles)",
  time: "16h45 – 17h55 ou 16h45 – 18h25",
  details: [
    "Réservée aux élèves de maternelle, surveillée par Valérie GEAY.",
    "Sortie possible à 17h25 ou 17h55 (prévenir le secrétariat ou noter sur le ticket).",
    "Horaires aménagés : 18h – 18h30, récupération à tout moment en sonnant au portail.",
  ],
  icon: Shield,
  accent: "from-secondary to-primary",
};

const studySlots: Slot[] = [
  {
    title: "Étude dirigée CP-CE1",
    time: "16h45 – 17h55",
    details: [
      "Animée par Sophie MARGUET.",
      "Leçons, lectures, dictées préparées et devoirs selon les directives des enseignants.",
    ],
    icon: Users,
    accent: "from-classes to-ecole",
  },
  {
    title: "Étude dirigée CE2-CM1-CM2",
    time: "16h45 – 17h55",
    details: [
      "Animée par Christine CHALOIN.",
      "Travail accompagné dans la continuité des consignes de classe.",
    ],
    icon: HeartHandshake,
    accent: "from-secondary to-secondary-dark",
  },
];

const tariffs: Tariff[] = [
  { label: "Garderie matin", amount: "Carnet 10 tickets : 31 €" },
  { label: "Soir jusqu’à 17h55", amount: "Carnet 10 tickets : 40 €" },
  { label: "Soir jusqu’à 18h30", amount: "Carnet 10 tickets : 56 €" },
];

const GarderiePage = (): JSX.Element => {
  return (
    <PageHolder>
      <div className="space-y-12 pb-16">
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-viescolaire/80 via-viescolaire/60 to-secondary/80 text-secondary shadow-xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.32),transparent_38%),radial-gradient(circle_at_85%_10%,rgba(255,255,255,0.18),transparent_30%)]" />
          <div className="grid gap-10 px-8 py-12 md:grid-cols-[1.05fr,0.95fr] md:px-12 lg:px-16">
            <div className="relative z-10 space-y-6 text-secondary-dark">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-secondary-dark shadow-sm backdrop-blur">
                Vie scolaire - garderie
              </span>
              <h1 className="text-3xl font-bold leading-tight text-secondary-dark md:text-4xl">
                Garderie et études dirigées différenciées, au plus près des
                besoins des élèves.
              </h1>
              <p className="max-w-2xl text-lg text-secondary-dark/80">
                Accueil matin et soir, horaires aménagés, études par cycles : un
                cadre bienveillant pour concilier organisation des familles et
                réussite scolaire.
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
                  src="/images/vie-scolaire-garderie.jpg"
                  alt="Garderie à l’école Saint-Augustin"
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
                <Sun className="h-6 w-6 text-viescolaire" />
                Garderie du matin
              </CardTitle>
              <p className="text-base md:text-lg text-muted-foreground">
                Accueil pour démarrer la journée sereinement.
              </p>
            </CardHeader>
            <CardContent className="space-y-4 text-base md:text-lg text-muted-foreground">
              <div className="flex items-center gap-3 rounded-2xl bg-viescolaire/15 p-4 shadow-inner">
                <Clock4 className="h-5 w-5 text-secondary" />
                <p className="font-semibold text-secondary">
                  {morningSlot.time}
                </p>
              </div>
              <ul className="space-y-2">
                {morningSlot.details.map((detail) => (
                  <li key={detail} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-viescolaire" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-none bg-white/80 shadow-lg ring-1 ring-black/5 backdrop-blur">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-2xl text-secondary">
                <MoonStar className="h-6 w-6 text-secondary" />
                Garderie du soir (maternelles)
              </CardTitle>
              <p className="text-base md:text-lg text-muted-foreground">
                Des repères clairs et des horaires souples pour les plus petits.
              </p>
            </CardHeader>
            <CardContent className="space-y-4 text-base md:text-lg text-muted-foreground">
              <div className="flex items-center gap-3 rounded-2xl bg-viescolaire/15 p-4 shadow-inner">
                <Clock4 className="h-5 w-5 text-secondary" />
                <p className="font-semibold text-secondary">
                  {eveningSlot.time}
                </p>
              </div>
              <ul className="space-y-2">
                {eveningSlot.details.map((detail) => (
                  <li key={detail} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-viescolaire" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1.05fr,0.95fr]">
          <Card className="border-none bg-white/80 shadow-lg ring-1 ring-black/5 backdrop-blur">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-2xl text-secondary">
                <BookOpenCheck className="h-6 w-6 text-classes" />
                Études dirigées différenciées
              </CardTitle>
              <p className="text-base md:text-lg text-muted-foreground">
                Deux groupes pour suivre au plus près les directives des
                enseignants et accompagner les devoirs.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {studySlots.map((slot) => {
                const Icon = slot.icon;
                return (
                  <div
                    key={slot.title}
                    className="rounded-2xl bg-white/80 p-4 shadow-inner ring-1 ring-black/5"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${slot.accent} text-white shadow`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-base md:text-lg font-semibold text-secondary">
                            {slot.title}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {slot.time}
                          </p>
                        </div>
                      </div>
                    </div>
                    <ul className="mt-3 space-y-2 text-base md:text-lg text-muted-foreground">
                      {slot.details.map((detail) => (
                        <li key={detail} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-viescolaire" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
              <div className="rounded-2xl bg-viescolaire/15 p-4 shadow-inner">
                <div className="flex items-center gap-2 text-secondary">
                  <BellRing className="h-5 w-5" />
                  <p className="text-base md:text-lg font-semibold">
                    Après 18h
                  </p>
                </div>
                <p className="mt-2 text-base md:text-lg text-muted-foreground">
                  De 18h à 18h25, une garderie simple est assurée par Christine
                  CHALOIN.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none bg-gradient-to-br from-secondary/90 via-secondary to-primary-dark text-white shadow-xl">
            <CardContent className="space-y-4 p-8">
              <div className="flex items-center gap-3">
                <Shield className="h-7 w-7" />
                <h3 className="text-xl font-semibold">Repères pratiques</h3>
              </div>
              <p className="text-base md:text-lg text-white/90">
                Merci de préciser les horaires de sortie pour les élèves
                réguliers auprès du secrétariat, ou de l’indiquer sur le ticket
                de garderie. Les carnets de tickets sont à jour des tarifs
                ci-dessous.
              </p>
              <div className="space-y-3">
                {tariffs.map((tariff) => (
                  <div
                    key={tariff.label}
                    className="rounded-2xl bg-white/10 p-4 backdrop-blur"
                  >
                    <div className="flex items-center gap-2 text-white">
                      <Coins className="h-5 w-5" />
                      <p className="text-base md:text-lg font-semibold">
                        {tariff.label}
                      </p>
                    </div>
                    <p className="mt-1 text-sm md:text-base text-white/85">
                      {tariff.amount}
                    </p>
                    {tariff.note && (
                      <p className="text-xs text-white/70">{tariff.note}</p>
                    )}
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

export default GarderiePage;
