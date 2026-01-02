import { SiGoogleclassroom } from "react-icons/si";
import { RiRestaurantFill } from "react-icons/ri";
import { LuClock3 } from "react-icons/lu";
import { BiSolidSchool } from "react-icons/bi";
import { FiArrowRight } from "react-icons/fi";

import {
  LandingFavoriteCard,
  LandingFavoriteCardProps,
} from "./landing-favorite-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const favorites: LandingFavoriteCardProps[] = [
  {
    title: "Garderie",
    text: "Horaires, activités et accueil après la classe.",
    icon: LuClock3,
    path: "/vie-scolaire/garderie",
    accent: "bg-white/80 text-secondary",
  },
  {
    title: "Classes",
    text: "Découvrez chaque classe de la Petite Section au CM2.",
    icon: SiGoogleclassroom,
    path: "/classes",
    accent: "bg-secondary text-white",
  },
  {
    title: "Ecole",
    text: "Nos valeurs, notre histoire et l'équipe pédagogique.",
    icon: BiSolidSchool,
    path: "/ecole",
    accent: "bg-primary text-secondary",
  },
  {
    title: "Cantine",
    text: "Menus et infos pratiques sur la restauration.",
    icon: RiRestaurantFill,
    path: "/vie-scolaire/cantine",
    accent: "bg-white/80 text-secondary",
  },
];

export const LandingFavorites = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-primary via-white to-secondary/10 py-10 md:py-14 rounded-3xl shadow-inner">
      <div className="landing-container mx-auto flex flex-col gap-6 md:gap-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-secondary/70">
              Découvrir l&apos;école
            </p>
            <h2 className="text-3xl md:text-4xl font-bold font-cursive text-secondary">
              Les incontournables
            </h2>
            <p className="text-base md:text-lg text-secondary/80 mt-2 max-w-2xl">
              Accédez rapidement aux informations clés pour préparer la journée
              de vos enfants et mieux connaître l&apos;école.
            </p>
          </div>
          <Link href="/classes">
            <Button className="inline-flex items-center gap-2 bg-secondary text-white hover:brightness-110">
              Voir toutes les classes
              <FiArrowRight />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {favorites.map((favorite) => (
            <LandingFavoriteCard key={favorite.path} {...favorite} />
          ))}
        </div>
      </div>
    </section>
  );
};
