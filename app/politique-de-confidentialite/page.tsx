import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHolder } from "@/components/page-holder";
import {
  ShieldCheck,
  Mail,
  Database,
  Fingerprint,
  Clock,
  Lock,
  UserCheck,
  RefreshCw,
} from "lucide-react";

const email = "ogec.cremieu@wanadoo.fr";

export const metadata: Metadata = {
  title: "Politique de confidentialité | École Saint-Augustin",
  description:
    "Comment l'École Saint-Augustin collecte, utilise et protège vos données personnelles.",
};

type Section = {
  title: string;
  icon: React.ElementType;
  items: string[];
  accent?: string;
};

const sections: Section[] = [
  {
    title: "Responsable du traitement",
    icon: ShieldCheck,
    accent: "from-secondary to-secondary-dark",
    items: [
      "École Saint-Augustin",
      "Site web : https://ecole-st-augustin.fr",
      `Email : ${email}`,
    ],
  },
  {
    title: "Données collectées",
    icon: Database,
    accent: "from-primary to-primary-dark",
    items: [
      "Nom, prénom et adresse e-mail",
      "Photo de profil (si fournie)",
      "Identifiant utilisateur fourni par Google ou Facebook",
      "Données techniques de navigation (IP, navigateur, logs de connexion)",
      "Aucune donnée sensible n’est collectée",
    ],
  },
  {
    title: "Méthodes de collecte",
    icon: Fingerprint,
    accent: "from-classes to-classes/80",
    items: [
      "Création d’un compte sur le site",
      "Connexion via Google ou Facebook",
      "Utilisation des fonctionnalités proposées",
    ],
  },
  {
    title: "Finalités du traitement",
    icon: UserCheck,
    accent: "from-ecole to-ecole/80",
    items: [
      "Authentifier et gérer les comptes utilisateurs",
      "Assurer le bon fonctionnement et la sécurité du site",
      "Communiquer avec les utilisateurs si nécessaire (informations liées au compte)",
      "Aucune revente, location ou cession des données à des tiers",
    ],
  },
  {
    title: "Authentification via services tiers",
    icon: ShieldCheck,
    accent: "from-espaceprive to-espaceprive/80",
    items: [
      "Seules les informations strictement nécessaires à l’authentification sont utilisées",
      "Les mots de passe ne sont jamais accessibles par l’École Saint-Augustin",
      "Chaque service reste soumis à sa propre politique de confidentialité",
    ],
  },
  {
    title: "Durée de conservation",
    icon: Clock,
    accent: "from-secondary to-secondary/80",
    items: [
      "Les données sont conservées le temps nécessaire aux finalités décrites",
      "La suppression du compte entraîne la suppression des données associées",
    ],
  },
  {
    title: "Sécurité des données",
    icon: Lock,
    accent: "from-blog to-blog/80",
    items: [
      "Mesures techniques et organisationnelles pour protéger la confidentialité",
      "Accès limité aux seules personnes autorisées",
      "Surveillance des journaux d’accès pour prévenir les usages non autorisés",
    ],
  },
  {
    title: "Droits des utilisateurs",
    icon: RefreshCw,
    accent: "from-viescolaire to-viescolaire/80",
    items: [
      "Droit d’accès, de rectification, d’effacement et de limitation",
      "Droit d’opposition au traitement",
      `Contact : ${email} pour exercer ces droits`,
    ],
  },
  {
    title: "Suppression des données",
    icon: Mail,
    accent: "from-secondary-dark to-secondary",
    items: [
      `Envoyer une demande à ${email}`,
      "Traitement dans les meilleurs délais conformément aux obligations légales",
    ],
  },
  {
    title: "Mises à jour de la politique",
    icon: RefreshCw,
    accent: "from-primary to-primary-dark",
    items: [
      "Cette politique peut évoluer pour rester conforme aux exigences légales et techniques",
      "Nous invitons les utilisateurs à la consulter régulièrement",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <PageHolder>
      <div className="space-y-10 pb-16">
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-secondary via-secondary-dark to-primary text-white shadow-xl">
          <div className="absolute right-[-10%] top-[-10%] h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute left-[-10%] bottom-[-10%] h-56 w-56 rounded-full bg-white/10 blur-3xl" />
          <div className="relative z-10 px-8 py-12 md:px-12">
            <p className="mb-3 inline-flex items-center rounded-full bg-white/15 px-4 py-2 text-sm font-semibold uppercase tracking-[0.08em] text-white">
              Politique de confidentialité
            </p>
            <h1 className="text-3xl font-bold leading-tight md:text-4xl">
              Nous protégeons vos données et votre confiance.
            </h1>
            <p className="mt-4 max-w-3xl text-lg text-white/85">
              Cette page détaille la façon dont l’École Saint-Augustin collecte,
              utilise et sécurise vos informations personnelles, notamment lors
              de l’authentification via Google ou Facebook.
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
              Un droit, une question ?
            </p>
            <h2 className="text-2xl font-bold text-secondary">
              Échangeons directement.
            </h2>
            <p className="max-w-2xl text-base text-foreground/80">
              Pour toute demande d’accès, de rectification ou de suppression de
              vos données, écrivez-nous. Nous vous répondrons dans les meilleurs
              délais, conformément à nos obligations légales.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-md">
            <Mail className="h-5 w-5 text-secondary" />
            <Link
              href={`mailto:${email}`}
              className="text-lg font-semibold text-secondary underline-offset-4 hover:underline"
            >
              {email}
            </Link>
          </div>
        </section>
      </div>
    </PageHolder>
  );
}
