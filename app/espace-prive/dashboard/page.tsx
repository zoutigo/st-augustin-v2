import React from "react";
import Link from "next/link";
import {
  Settings,
  Users,
  HelpCircle,
  GraduationCap,
  BookOpen,
  FileText,
  CalendarClock,
  Tags,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const tiles = [
  {
    title: "Site",
    subtitle: "Coordonnées, mentions et apparence globale.",
    category: "Configuration",
    icon: <Settings className="h-6 w-6 text-primary" />,
    href: "/espace-prive/dashboard/pages",
  },
  {
    title: "Utilisateurs",
    subtitle: "Comptes, rôles admin et coordination des accès.",
    category: "Gestion",
    icon: <Users className="h-6 w-6 text-secondary" />,
    href: "/espace-prive/dashboard/users",
  },
  {
    title: "FAQ",
    subtitle: "Questions/réponses affichées sur le site.",
    category: "Contenu",
    icon: <HelpCircle className="h-6 w-6 text-slate-500" />,
    href: "/espace-prive/dashboard/faq",
  },
  {
    title: "Catégories FAQ",
    subtitle: "Organisez vos thèmes de questions.",
    category: "Contenu",
    icon: <Tags className="h-6 w-6 text-amber-600" />,
    href: "/espace-prive/dashboard/faq-categories",
  },
  {
    title: "Classes",
    subtitle: "Gérez les classes et contenus associés.",
    category: "École",
    icon: <GraduationCap className="h-6 w-6 text-emerald-600" />,
    href: "/espace-prive/dashboard/entities",
  },
  {
    title: "Blog & Articles",
    subtitle: "Actualités et posts.",
    category: "Blog",
    icon: <BookOpen className="h-6 w-6 text-indigo-500" />,
    href: "/espace-prive/dashboard/blogposts",
  },
  {
    title: "Pages",
    subtitle: "Ajoutez ou modifiez les pages du site.",
    category: "Pages",
    icon: <FileText className="h-6 w-6 text-sky-600" />,
    href: "/espace-prive/dashboard/pages",
  },
  {
    title: "Modales",
    subtitle: "Gestion des annonces planifiées.",
    category: "Planning",
    icon: <CalendarClock className="h-6 w-6 text-rose-500" />,
    href: "/espace-prive/dashboard/modals",
  },
];

const Dashboard = async () => {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Tableau de bord
        </p>
        <h1 className="text-4xl font-black text-secondary">
          Espace administrateur
        </h1>
        <p className="text-base text-muted-foreground">
          Pilotez le site, les utilisateurs et vos partenaires en un clin
          d&apos;œil.
        </p>
      </header>

      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {tiles.map((tile) => (
          <Link key={tile.title} href={tile.href}>
            <Card className="h-full min-h-[220px] transition hover:-translate-y-1 hover:shadow-lg rounded-2xl border-slate-200 bg-white">
              <CardContent className="p-6 space-y-4 flex flex-col">
                <div className="flex items-start justify-between">
                  <div className="h-14 w-14 rounded-2xl bg-slate-50 flex items-center justify-center shadow-inner">
                    {tile.icon}
                  </div>
                  <div className="text-[12px] uppercase tracking-[0.24em] text-muted-foreground mt-1">
                    {tile.category}
                  </div>
                </div>
                <div className="space-y-3">
                  <h2 className="text-2xl font-semibold text-secondary">
                    {tile.title}
                  </h2>
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                    {tile.subtitle}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
