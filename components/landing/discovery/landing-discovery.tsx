import Link from "next/link";
import {
  Compass,
  Building2,
  Users2,
  Sparkles,
  Clock3,
  HelpCircle,
} from "lucide-react";

const destinations = [
  {
    slug: "/ecole",
    title: "Notre école",
    label: "Découverte",
    description:
      "Valeurs, pédagogie et vie quotidienne : entrez dans l’univers Saint Augustin.",
    icon: <Compass className="h-8 w-8 text-secondary" />,
    accent:
      "from-amber-50 via-white to-primary/10 border-amber-100 text-secondary",
  },
  {
    slug: "/ecole-infrastructures",
    title: "Infrastructures",
    label: "Espaces",
    description:
      "Classes lumineuses, cour arborée, bibliothèque et salles dédiées aux ateliers.",
    icon: <Building2 className="h-8 w-8 text-secondary" />,
    accent:
      "from-teal-50 via-white to-secondary/10 border-teal-100 text-secondary",
  },
  {
    slug: "/ecole-histoire",
    title: "Histoire",
    label: "Racines",
    description:
      "Depuis Crémieu, une histoire qui se construit avec les familles et le territoire.",
    icon: <Clock3 className="h-8 w-8 text-secondary" />,
    accent:
      "from-slate-50 via-white to-primary/10 border-slate-200 text-secondary",
  },
];

const playfulCtas = [
  "On chausse ses baskets ?",
  "Prêt pour la visite magique ?",
  "On a des projets plein les poches !",
  "Une histoire à conter, promis.",
];

export const LandingDiscovery = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-primary/5 py-12 md:py-16">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-10 top-10 h-36 w-36 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-40 w-40 rounded-full bg-secondary/15 blur-3xl" />
      </div>
      <div className="relative landing-container mx-auto space-y-8">
        <div className="space-y-2">
          <p className="text-xs md:text-sm uppercase tracking-[0.35em] text-primary/80">
            Un pas dans l&apos;école
          </p>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2 md:max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary">
                Explorez Saint&nbsp;Augustin
              </h2>
              <p className="text-base md:text-lg text-secondary/80 leading-relaxed">
                Parcourez nos espaces, nos projets et ceux qui font vivre
                l&apos;école au quotidien. Une invitation à flâner avant de
                venir nous rencontrer.
              </p>
            </div>
            <div className="hidden md:block px-4 py-2 rounded-full bg-white/80 border border-primary/30 text-secondary shadow-sm">
              5 escales à découvrir
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {destinations.map((item, idx) => (
            <Link
              key={item.slug}
              href={item.slug}
              className={`group relative overflow-hidden rounded-2xl border shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-lg bg-gradient-to-br ${item.accent}`}
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/30 blur-2xl transition duration-500 group-hover:scale-110" />
              <div className="relative p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.3em] text-primary/80">
                    {item.label}
                  </span>
                  <span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-white/80 shadow-inner border border-white">
                    {item.icon}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-secondary">
                  {item.title}
                </h3>
                <p className="text-base md:text-lg leading-relaxed text-secondary/80">
                  {item.description}
                </p>
                <div className="inline-flex items-center gap-2 text-primary font-semibold text-base md:text-lg">
                  {playfulCtas[idx % playfulCtas.length]}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
