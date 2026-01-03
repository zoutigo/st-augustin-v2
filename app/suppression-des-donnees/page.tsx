import type { Metadata } from "next";
import Link from "next/link";
import { PageHolder } from "@/components/page-holder";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Mail,
  Trash2,
  ShieldCheck,
  UserCheck,
  Lock,
  Clock,
  Server,
} from "lucide-react";
import { getInfoSiteOrFallback } from "@/data/infosite";

export const metadata: Metadata = {
  title: "Suppression des données | École Saint-Augustin",
  description:
    "Procédure de suppression des données personnelles pour les utilisateurs du site de l’École Saint-Augustin.",
};

type Section = {
  title: string;
  icon: React.ElementType;
  accent?: string;
  items: string[];
};

const sections = (email: string): Section[] => [
  {
    title: "Vos droits",
    icon: ShieldCheck,
    accent: "from-secondary to-secondary-dark",
    items: [
      "Conformément au RGPD, vous disposez d’un droit de suppression de vos données personnelles.",
      "Les données collectées servent uniquement à l’authentification et à la gestion des comptes utilisateurs.",
    ],
  },
  {
    title: "Demande de suppression",
    icon: Trash2,
    accent: "from-primary to-primary-dark",
    items: [
      "Pour toute demande de suppression, contactez l’École Saint-Augustin par e-mail.",
      `Adresse : ${email}`,
      "Nous traitons chaque demande dans les meilleurs délais, conformément aux obligations légales.",
    ],
  },
  {
    title: "Données concernées",
    icon: UserCheck,
    accent: "from-classes to-classes/80",
    items: [
      "Nom et prénom",
      "Adresse e-mail",
      "Identifiant utilisateur",
      "Données liées au compte utilisateur",
    ],
  },
  {
    title: "Authentification via services tiers",
    icon: Server,
    accent: "from-ecole to-ecole/80",
    items: [
      "Connexion possible via Google ou Facebook.",
      "L’École Saint-Augustin n’a jamais accès aux mots de passe des utilisateurs.",
      "Seules les données nécessaires à l’authentification sont utilisées.",
      "Chaque service tiers applique sa propre politique de confidentialité.",
    ],
  },
  {
    title: "Délais de traitement",
    icon: Clock,
    accent: "from-viescolaire to-viescolaire/80",
    items: [
      "Les demandes de suppression sont traitées dans un délai raisonnable, généralement inférieur à 30 jours.",
    ],
  },
];

export default async function DataDeletionPage() {
  const info = await getInfoSiteOrFallback();
  return (
    <PageHolder>
      <div className="space-y-10 pb-16">
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-secondary via-secondary-dark to-primary text-white shadow-xl">
          <div className="absolute right-[-10%] top-[-10%] h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute left-[-10%] bottom-[-10%] h-56 w-56 rounded-full bg-white/10 blur-3xl" />
          <div className="relative z-10 px-8 py-12 md:px-12">
            <p className="mb-3 inline-flex items-center rounded-full bg-white/15 px-4 py-2 text-sm font-semibold uppercase tracking-[0.08em] text-white">
              Suppression des données
            </p>
            <h1 className="text-3xl font-bold leading-tight md:text-4xl">
              Maîtrisez vos données, nous respectons vos choix.
            </h1>
            <p className="mt-4 max-w-3xl text-lg text-white/85">
              Cette page détaille la procédure pour demander la suppression de
              vos informations personnelles collectées par l’École
              Saint-Augustin.
            </p>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          {sections(info.email).map((section) => {
            const Icon = section.icon;
            const accent = section.accent || "from-secondary to-primary";
            return (
              <Card
                key={section.title}
                className="h-full border-none bg-white/80 shadow-lg ring-1 ring-black/5 backdrop-blur-sm"
              >
                <CardHeader className="pb-4">
                  <div
                    className={`mb-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${accent} px-3 py-1 text-sm font-semibold text-white`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{section.title}</span>
                  </div>
                  <CardTitle className="text-xl text-secondary">
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {section.items.map((item, idx) => {
                    const bullets = [
                      "rounded-full bg-secondary",
                      "rounded-md bg-primary",
                      "rounded-full border border-secondary bg-white",
                    ];
                    const bulletClass = bullets[idx % bullets.length];
                    return (
                      <div
                        key={item}
                        className="flex items-center gap-3 rounded-lg bg-muted/40 px-4 py-2"
                      >
                        <span
                          className={`h-2.5 w-2.5 ${bulletClass}`}
                          aria-hidden
                        />
                        <p className="text-base leading-relaxed text-foreground/90">
                          {item}
                        </p>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            );
          })}
        </section>

        <section className="flex flex-col gap-4 rounded-2xl border border-secondary/20 bg-secondary/5 px-6 py-8 shadow-sm md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-secondary">
              Faire votre demande
            </p>
            <h2 className="text-2xl font-bold text-secondary">
              Contactez-nous pour supprimer vos données.
            </h2>
            <p className="max-w-2xl text-base text-foreground/80">
              Envoyez un e-mail en précisant l’adresse associée à votre compte.
              Nous confirmerons la suppression après vérification de votre
              identité.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-md">
            <Mail className="h-5 w-5 text-secondary" />
            <Link
              href={`mailto:${info.email}`}
              className="text-lg font-semibold text-secondary underline underline-offset-4 hover:text-secondary-dark"
            >
              {info.email}
            </Link>
          </div>
        </section>

        <div className="flex flex-wrap gap-4 text-sm font-semibold text-secondary/90">
          <Link
            href="/politique-de-confidentialite"
            className="inline-flex items-center gap-2 underline underline-offset-4 hover:text-secondary-dark"
          >
            <Lock className="h-4 w-4" />
            Politique de confidentialité
          </Link>
        </div>
      </div>
    </PageHolder>
  );
}
