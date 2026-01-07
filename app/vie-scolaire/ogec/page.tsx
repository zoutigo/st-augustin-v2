import type { Metadata } from "next";
import Image from "next/image";
import { PageHolder } from "@/components/page-holder";
import type { LucideIcon } from "lucide-react";
import {
  Banknote,
  Building2,
  ClipboardList,
  Coins,
  Hammer,
  HandHeart,
  Mail,
  Scale,
  Shield,
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

export const metadata: Metadata = {
  title: "OGEC | Vie scolaire - École Saint-Augustin",
  description:
    "Rôle de l’OGEC : gestion financière et juridique, projets immobiliers, mise aux normes et soutien quotidien de l’école Saint-Augustin.",
  openGraph: {
    title: "OGEC | Vie scolaire - École Saint-Augustin",
    description:
      "Découvrez les missions de l’OGEC : comptabilité, budgets, projets immobiliers, mise aux normes et accompagnement de l’équipe éducative.",
    url: "https://www.ecole-saint-augustin.fr/vie-scolaire/ogec",
    images: [
      {
        url: "/images/vie-scolaire-ogec.jpg",
        width: 1200,
        height: 675,
        alt: "OGEC de l’école Saint-Augustin",
      },
    ],
  },
  alternates: {
    canonical: "/vie-scolaire/ogec",
  },
};

const highlights: Highlight[] = [
  {
    title: "Pilier financier",
    description:
      "Association loi 1901, co-responsable juridique avec le directeur, employeur du personnel non enseignant.",
    icon: Scale,
    accent: "from-viescolaire to-secondary",
  },
  {
    title: "Gestion & budgets",
    description:
      "Comptabilité, suivi des bâtiments et de l’administration, élaboration de budgets pour pérenniser l’école.",
    icon: Banknote,
    accent: "from-secondary to-secondary-dark",
  },
  {
    title: "Projets & mise aux normes",
    description:
      "Projets immobiliers, mobiliers, informatiques et conformité Accessibilité Handicapés.",
    icon: Hammer,
    accent: "from-classes to-classes/70",
  },
];

const missionsSection: BulletSection = {
  title: "Missions quotidiennes",
  intro:
    "L’OGEC gère le fonctionnement des bâtiments, les comptes et l’administration en lien étroit avec le directeur.",
  icon: ClipboardList,
  accent: "from-viescolaire to-secondary",
  items: [
    "Tenir la comptabilité et suivre les budgets pour pérenniser l’établissement.",
    "Assurer l’employeur et le co-responsable du personnel non enseignant avec le président.",
    "Gérer l’entretien, la maintenance et l’administration des locaux au quotidien.",
    "Accompagner les projets pédagogiques présentés par le directeur.",
  ],
};

const governanceSection: BulletSection = {
  title: "Gouvernance et décisions",
  intro:
    "Une assemblée générale annuelle présente le bilan moral et financier. Un conseil d’administration se réunit régulièrement.",
  icon: Users,
  accent: "from-secondary to-primary",
  items: [
    "CA de 15 membres, incluant de droit le délégué épiscopal, les présidents de l’UDOGEC et de l’APEL.",
    "Décisions discutées et validées par le bureau puis par le CA.",
    "Lien étroit avec la tutelle départementale (UDOGEC).",
  ],
};

const projectsSection: BulletSection = {
  title: "Projets et investissements",
  intro:
    "Les membres actuels et passés portent les projets pour moderniser et agrandir l’école.",
  icon: Building2,
  accent: "from-classes to-classes/80",
  items: [
    "Concrétisation du projet immobilier initié il y a plus de 20 ans.",
    "Mise aux normes Accessibilité Handicapés des bâtiments et cheminements extérieurs.",
    "Rénovation, agrandissement et modernisation de la cantine.",
  ],
};

const OgecPage = (): JSX.Element => {
  return (
    <PageHolder>
      <div className="space-y-12 pb-16">
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-viescolaire/80 via-viescolaire/60 to-secondary/80 text-secondary shadow-xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.32),transparent_38%),radial-gradient(circle_at_85%_10%,rgba(255,255,255,0.18),transparent_30%)]" />
          <div className="grid gap-10 px-8 py-12 md:grid-cols-[1.05fr,0.95fr] md:px-12 lg:px-16">
            <div className="relative z-10 space-y-6 text-secondary-dark">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-secondary-dark shadow-sm backdrop-blur">
                Vie scolaire - OGEC
              </span>
              <h1 className="text-3xl font-bold leading-tight text-secondary-dark md:text-4xl">
                L’OGEC, pilier financier et juridique au service de l’école
                Saint-Augustin.
              </h1>
              <p className="max-w-2xl text-lg text-secondary-dark/80">
                Composé de bénévoles, l’OGEC gère les comptes, les bâtiments et
                les projets, en lien étroit avec la tutelle et l’équipe
                éducative, pour faire vivre et sécuriser l’établissement.
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
                  src="/images/vie-scolaire-ogec.jpg"
                  alt="Réunion de l’OGEC de l’école Saint-Augustin"
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
                <Shield className="h-6 w-6 text-viescolaire" />
                Une association loi 1901
              </CardTitle>
              <p className="text-base md:text-lg text-muted-foreground">
                L’OGEC est l’équivalent, dans le privé, de la mairie pour les
                écoles publiques : co-responsable juridique avec le directeur.
              </p>
            </CardHeader>
            <CardContent className="space-y-3 text-base md:text-lg text-muted-foreground">
              <p>
                Son président est co-responsable du personnel non enseignant et
                des locaux. Le lien est permanent avec l’UDOGEC pour garantir le
                caractère propre de l’établissement.
              </p>
              <div className="rounded-2xl bg-viescolaire/15 p-4 shadow-inner">
                <div className="flex items-center gap-2 text-secondary">
                  <HandHeart className="h-5 w-5" />
                  <p className="font-semibold">Bénévolat engagé</p>
                </div>
                <p className="mt-2 text-base md:text-lg text-secondary">
                  Les membres bénévoles portent la responsabilité juridique,
                  financière et matérielle de l’école.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none bg-white/80 shadow-lg ring-1 ring-black/5 backdrop-blur">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-2xl text-secondary">
                <Coins className="h-6 w-6 text-secondary" />
                Budgets et gestion
              </CardTitle>
              <p className="text-base md:text-lg text-muted-foreground">
                Comptabilité, prévisions et suivi des dépenses pour sécuriser
                l’avenir de l’école.
              </p>
            </CardHeader>
            <CardContent className="space-y-2 text-base md:text-lg text-muted-foreground">
              <ul className="space-y-2">
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-viescolaire" />
                  <span>
                    Établir des budgets pour gérer et pérenniser
                    l’établissement.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-viescolaire" />
                  <span>
                    Suivre la comptabilité et l’administration en lien avec le
                    directeur.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-viescolaire" />
                  <span>
                    Accompagner les projets pédagogiques et éducatifs présentés
                    par la direction.
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1.05fr,0.95fr]">
          <Card className="border-none bg-white/80 shadow-lg ring-1 ring-black/5 backdrop-blur">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-2xl text-secondary">
                <missionsSection.icon className="h-6 w-6 text-secondary" />
                {missionsSection.title}
              </CardTitle>
              <p className="text-base md:text-lg text-muted-foreground">
                {missionsSection.intro}
              </p>
            </CardHeader>
            <CardContent className="space-y-2">
              <ul className="space-y-2 text-base md:text-lg text-muted-foreground">
                {missionsSection.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-viescolaire" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-none bg-white/80 shadow-lg ring-1 ring-black/5 backdrop-blur">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-2xl text-secondary">
                <governanceSection.icon className="h-6 w-6 text-secondary" />
                {governanceSection.title}
              </CardTitle>
              <p className="text-base md:text-lg text-muted-foreground">
                {governanceSection.intro}
              </p>
            </CardHeader>
            <CardContent className="space-y-2">
              <ul className="space-y-2 text-base md:text-lg text-muted-foreground">
                {governanceSection.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-viescolaire" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-8 lg:grid-cols-[0.95fr,1.05fr]">
          <Card className="border-none bg-white/80 shadow-lg ring-1 ring-black/5 backdrop-blur">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-2xl text-secondary">
                <projectsSection.icon className="h-6 w-6 text-secondary" />
                {projectsSection.title}
              </CardTitle>
              <p className="text-base md:text-lg text-muted-foreground">
                {projectsSection.intro}
              </p>
            </CardHeader>
            <CardContent className="space-y-2">
              <ul className="space-y-2 text-base md:text-lg text-muted-foreground">
                {projectsSection.items.map((item) => (
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
                <Building2 className="h-7 w-7" />
                <h3 className="text-xl font-semibold">
                  Un lien permanent avec la tutelle
                </h3>
              </div>
              <p className="text-base md:text-lg text-white/90">
                L’OGEC reste en lien étroit avec l’UDOGEC pour porter les
                projets immobiliers, mobiliers et informatiques, et garantir la
                conformité des bâtiments.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                  <p className="text-sm uppercase tracking-[0.12em] text-white/80">
                    Accessibilité
                  </p>
                  <p className="text-lg font-semibold">
                    Mise aux normes Handicapés pour tous les bâtiments et
                    cheminements.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                  <p className="text-sm uppercase tracking-[0.12em] text-white/80">
                    Cantine modernisée
                  </p>
                  <p className="text-lg font-semibold">
                    Rénovation, agrandissement et modernisation en cours.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <Card className="border-none bg-white/80 shadow-lg ring-1 ring-black/5 backdrop-blur">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-2xl text-secondary">
                <Mail className="h-6 w-6 text-secondary" />
                Contacter l’OGEC
              </CardTitle>
              <p className="text-base md:text-lg text-muted-foreground">
                Une question sur les projets, la gestion ou les budgets ?
              </p>
            </CardHeader>
            <CardContent className="space-y-2 text-base md:text-lg text-muted-foreground">
              <p>
                Le bureau se tient à disposition des familles pour expliquer les
                actions menées et les décisions prises en conseil
                d’administration.
              </p>
              <p className="text-sm text-muted-foreground">
                Contact via le secrétariat ou lors des assemblées et réunions
                régulières.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </PageHolder>
  );
};

export default OgecPage;
