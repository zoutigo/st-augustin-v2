import type { Metadata } from "next";
import { PageHolder } from "@/components/page-holder";
import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  HeartHandshake,
  Sparkles,
  Sprout,
  Star,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type TeamMember = {
  name: string;
  role: string;
};

type TeamSection = {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  accent: string;
  members: TeamMember[];
};

export const metadata: Metadata = {
  title: "Équipe pédagogique | École Saint-Augustin Crémieu",
  description:
    "Découvrez l’équipe éducative, enseignante et AESH de l’École Saint-Augustin : des talents réunis pour accompagner chaque élève.",
  openGraph: {
    title: "Équipe pédagogique | École Saint-Augustin Crémieu",
    description:
      "Une équipe engagée : enseignantes, personnel éducatif, AESH et service, au service des élèves de l’École Saint-Augustin.",
    url: "https://www.ecole-saint-augustin.fr/ecole/equipe",
    images: [
      {
        url: "/images/ecole-equipe.jpg",
        width: 1200,
        height: 675,
        alt: "Équipe de l’École Saint-Augustin",
      },
    ],
  },
  alternates: {
    canonical: "/ecole/equipe",
  },
};

const teachingTeam: TeamSection = {
  title: "Équipe enseignante",
  subtitle:
    "Des enseignantes engagées pour faire grandir chaque élève, de la maternelle au cycle 3.",
  icon: BookOpen,
  accent: "from-ecole to-secondary",
  members: [
    { name: "Blandine Goujet", role: "Enseignante TPS-PS" },
    { name: "Flore Lheriteau", role: "Enseignante MS" },
    { name: "Patricia Guérin", role: "Enseignante GS" },
    { name: "Kelly Grosjean", role: "Enseignante CP" },
    { name: "Xavier Marret", role: "Enseignant CE1" },
    { name: "Karine Budin", role: "Enseignante CP et CE2" },
    { name: "Emmanuelle Rouard", role: "Enseignante CE2" },
    { name: "Pauline Dupont", role: "Enseignante CM1" },
    { name: "Laetitia Cintas", role: "Enseignante CM2" },
    { name: "Véronique Crétinon", role: "Enseignante spécialisée" },
  ],
};

const staffTeam: TeamSection = {
  title: "Équipe éducative et vie scolaire",
  subtitle:
    "Un accompagnement quotidien : encadrement, vie scolaire, service et restauration.",
  icon: HeartHandshake,
  accent: "from-secondary to-secondary-dark",
  members: [
    { name: "Kelly Grosjean", role: "Cheffe d’établissement" },
    { name: "Christine Chaloin", role: "Secrétaire – surveillante étude" },
    { name: "Véronique Landry", role: "Aide pédagogique, surveillante" },
    { name: "Sophie Marguet", role: "ASEM TPS/PS – surveillante étude" },
    {
      name: "Valérie Geay",
      role: "ASEM MS – surveillante cantine et garderie",
    },
    { name: "Corinne Rius", role: "Surveillante" },
    { name: "Kristel Champion", role: "Surveillante" },
    { name: "Alexandra Bellis", role: "Agent de service" },
    { name: "Florence Cochet", role: "Agent de service" },
    { name: "Wilfried Davcau", role: "Chef de cuisine NEWREST" },
  ],
};

const aeshTeam: TeamSection = {
  title: "Équipe AESH",
  subtitle:
    "Accompagnement des élèves pour favoriser l’inclusion et la réussite de chacun.",
  icon: Sprout,
  accent: "from-classes to-classes/80",
  members: [
    { name: "Laetitia Adeline", role: "AESH" },
    { name: "Clémentine Didelot", role: "AESH" },
    { name: "Kristel Champion", role: "AESH" },
    { name: "Amandine De Sousa", role: "AESH" },
    { name: "Carole De Oliveira", role: "AESH" },
    { name: "Corinne Rius", role: "AESH" },
  ],
};

const teams: TeamSection[] = [teachingTeam, staffTeam, aeshTeam];

const EquipePage = (): JSX.Element => {
  return (
    <PageHolder>
      <div className="space-y-12 pb-16">
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-ecole/80 via-ecole/60 to-secondary/80 text-secondary shadow-xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.32),transparent_38%),radial-gradient(circle_at_85%_10%,rgba(255,255,255,0.18),transparent_30%)]" />
          <div className="relative z-10 space-y-6 px-8 py-12 md:px-12 lg:px-16">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-secondary-dark shadow-sm backdrop-blur">
              Équipe pédagogique
            </span>
            <h1 className="text-3xl font-bold leading-tight text-secondary-dark md:text-4xl">
              Une équipe engagée pour accompagner chaque élève, en classe et
              dans la vie scolaire.
            </h1>
            <p className="max-w-3xl text-lg text-secondary-dark/80">
              Enseignantes, personnel éducatif, AESH et service : des talents
              complémentaires pour faire vivre un cadre bienveillant, exigeant
              et ouvert aux familles.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  title: "Pédagogie",
                  desc: "Des enseignantes investies de la TPS au CM2.",
                  icon: BookOpen,
                  accent: "from-ecole to-secondary",
                },
                {
                  title: "Vie scolaire",
                  desc: "Encadrement, service, restauration et accueil.",
                  icon: Users,
                  accent: "from-secondary to-secondary-dark",
                },
                {
                  title: "Inclusion",
                  desc: "AESH aux côtés des élèves pour leur réussite.",
                  icon: Sparkles,
                  accent: "from-classes to-classes/70",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <Card
                    key={item.title}
                    className="border-none bg-white/80 shadow-md backdrop-blur"
                  >
                    <CardContent className="flex items-start gap-3 p-4">
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
                          {item.desc}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {teams.map((section) => {
          const Icon = section.icon;
          return (
            <section key={section.title} className="space-y-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${section.accent} text-white shadow`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-secondary">
                      {section.title}
                    </h2>
                    <p className="text-base md:text-lg text-muted-foreground">
                      {section.subtitle}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {section.members.map((member) => (
                  <Card
                    key={member.name}
                    className="border-none bg-white/85 shadow-md ring-1 ring-black/5 backdrop-blur"
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 text-lg text-secondary">
                        <Star className="h-5 w-5 text-ecole" />
                        {member.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-base md:text-lg text-muted-foreground">
                        {member.role}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </PageHolder>
  );
};

export default EquipePage;
