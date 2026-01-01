import { SiGoogleclassroom } from "react-icons/si";
import { RiRestaurantFill } from "react-icons/ri";
import { LuClock3 } from "react-icons/lu";
import { BiSolidSchool } from "react-icons/bi";

import {
  LandingFavoriteCard,
  LandingFavoriteCardProps,
} from "./landing-favorite-card";

export const LandingFavorites = () => {
  const favorites = [
    {
      title: "Garderie",
      text: "Retrouvez ici toutes les information sur la garderie étude.",
      icon: LuClock3,
      path: "/vie-scolaire/garderie",
    },
    {
      title: "Classes",
      text: "Accédez aux différentes classes et informations les concernant, de la Petite Section au CM2.",
      icon: SiGoogleclassroom,
      path: "/classes",
    },
    {
      title: "Ecole",
      text: "Venez vite découvrir l’histoire, les valeurs de notre établissement et les avis des parents.",
      icon: BiSolidSchool,
      path: "/ecole",
    },
    {
      title: "Cantine",
      text: "Toutes les informations concernant la cantine, les menus et nos prestataires restauration.",
      icon: RiRestaurantFill,
      path: "/vie-scolaire/cantine",
    },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-4 my-4 mx-2">
      {favorites.map((favorite: LandingFavoriteCardProps) => (
        <LandingFavoriteCard key={favorite.path} {...favorite} />
      ))}
    </div>
  );
};
