import type { Metadata } from "next";
import Link from "next/link";
import { PageHolder } from "@/components/page-holder";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Building2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  User,
  Server,
  Copyright,
  Lock,
  Globe,
  Link as LinkIcon,
} from "lucide-react";

const email = "ogec.cremieu@wanadoo.fr";
const phone = "04 74 90 78 80";
const address = "Place du 8 Mai 1945, 38460 Crémieu";

export const metadata: Metadata = {
  title: "Mentions légales | École Saint-Augustin",
  description:
    "Informations légales de l’École Saint-Augustin : éditeur du site, hébergement, propriété intellectuelle et contact.",
};

type Section = {
  title: string;
  icon: React.ElementType;
  accent?: string;
  items: string[];
};

const sections: Section[] = [
  {
    title: "Éditeur du site",
    icon: Building2,
    accent: "from-secondary to-secondary-dark",
    items: [
      "École Saint-Augustin",
      "Établissement d’enseignement privé sous contrat avec l’État",
      "Géré par l’Organisme de Gestion de l’Enseignement Catholique (OGEC)",
      `Adresse : ${address}`,
      `Téléphone : ${phone}`,
      `Adresse e-mail : ${email}`,
    ],
  },
  {
    title: "Responsable de la publication",
    icon: User,
    accent: "from-classes to-classes/80",
    items: ["Kelly Grosjean, Cheffe d’établissement de l’École Saint-Augustin"],
  },
  {
    title: "Hébergement",
    icon: Server,
    accent: "from-ecole to-ecole/80",
    items: [
      "o2switch",
      "SAS au capital de 100 000 €",
      "RCS Clermont-Ferrand 510 909 807",
      "Chemin des Pardiaux, 63000 Clermont-Ferrand – France",
      "Site : https://www.o2switch.fr",
    ],
  },
  {
    title: "Propriété intellectuelle",
    icon: Copyright,
    accent: "from-blog to-blog/80",
    items: [
      "Textes, images, vidéos, graphismes, structure et code sont protégés par le droit de la propriété intellectuelle.",
      "Toute reproduction ou représentation, totale ou partielle, sans autorisation écrite préalable de l’OGEC de l’École Saint-Augustin est interdite.",
    ],
  },
  {
    title: "Données personnelles",
    icon: Lock,
    accent: "from-espaceprive to-espaceprive/80",
    items: [
      "Les données collectées sont traitées conformément au RGPD.",
      "Les modalités de collecte, d’utilisation et de suppression sont décrites dans la Politique de confidentialité.",
    ],
  },
  {
    title: "Authentification via services tiers",
    icon: ShieldCheck,
    accent: "from-viescolaire to-viescolaire/80",
    items: [
      "Le site peut proposer une authentification via Google ou Facebook.",
      "L’école n’a jamais accès aux mots de passe des utilisateurs.",
      "Seules les données nécessaires à l’authentification sont utilisées.",
      "Chaque service tiers applique sa propre politique de confidentialité.",
    ],
  },
  {
    title: "Responsabilité",
    icon: Globe,
    accent: "from-primary to-primary-dark",
    items: [
      "L’École Saint-Augustin s’efforce de fournir des informations exactes et à jour.",
      "Elle ne saurait être tenue responsable d’erreurs, d’omissions ou d’une indisponibilité temporaire du site.",
    ],
  },
  {
    title: "Droit applicable",
    icon: LinkIcon,
    accent: "from-secondary to-secondary/80",
    items: [
      "Le site est soumis au droit français.",
      "En cas de litige, les tribunaux français sont seuls compétents.",
    ],
  },
];

export default function LegalNoticePage() {
  return (
    <PageHolder>
      <div className="space-y-10 pb-16">
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-secondary via-secondary-dark to-primary text-white shadow-xl">
          <div className="absolute right-[-10%] top-[-10%] h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute left-[-10%] bottom-[-10%] h-56 w-56 rounded-full bg-white/10 blur-3xl" />
          <div className="relative z-10 px-8 py-12 md:px-12">
            <p className="mb-3 inline-flex items-center rounded-full bg-white/15 px-4 py-2 text-sm font-semibold uppercase tracking-[0.08em] text-white">
              Mentions légales
            </p>
            <h1 className="text-3xl font-bold leading-tight md:text-4xl">
              Transparence et confiance au service des familles.
            </h1>
            <p className="mt-4 max-w-3xl text-lg text-white/85">
              Retrouvez ici l’ensemble des informations légales relatives au
              site de l’École Saint-Augustin : éditeur, hébergement, propriété
              intellectuelle et contact.
            </p>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          {sections.map((section) => {
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
              Contact direct
            </p>
            <h2 className="text-2xl font-bold text-secondary">
              Une question ? Parlons-en.
            </h2>
            <p className="max-w-2xl text-base text-foreground/80">
              Pour toute précision sur ces mentions légales ou sur le site,
              contactez-nous par e-mail ou par téléphone.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-secondary font-semibold">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                <Link
                  href={`mailto:${email}`}
                  className="underline underline-offset-4 hover:text-secondary-dark"
                >
                  {email}
                </Link>
              </div>
              <div className="hidden h-4 w-px bg-secondary/30 md:block" />
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                <Link
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="hover:text-secondary-dark"
                >
                  {phone}
                </Link>
              </div>
              <div className="hidden h-4 w-px bg-secondary/30 md:block" />
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>{address}</span>
              </div>
            </div>
          </div>
        </section>

        <div className="text-sm text-secondary/80">
          <Link
            href="/politique-de-confidentialite"
            className="inline-flex items-center gap-2 font-semibold text-secondary hover:text-secondary-dark underline underline-offset-4"
          >
            <Lock className="h-4 w-4" />
            Politique de confidentialité
          </Link>
        </div>
      </div>
    </PageHolder>
  );
}
