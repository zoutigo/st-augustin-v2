import { NavRoute } from "@/types/nav-routes";

import { Button } from "../ui/button";

import { useRouter } from "next/navigation";
import { BiSolidChevronDown, BiSolidChevronUp } from "react-icons/bi";
import { useAppStore } from "@/lib/store";
import { useState } from "react";
import { ModalNavBlocSub } from "./modal-nav-bloc-sub";

import { useCurrentUser } from "@/hooks/use-current-user";

interface ModalNavBlocProps {
  route: NavRoute;
}

export const ModalNavBloc = ({ route }: ModalNavBlocProps) => {
  const { name, path, slug, subroutes } = route;
  const [isOpenModalNavBock, toggleModalNavBock] = useState(false);
  const { isMenuOpen, toggleMenu, closeMenu } = useAppStore(); // Utilisez Zustand

  const router = useRouter();
  const user = useCurrentUser();
  const gotologin = !user && slug === "espace-prive";

  const onClickLink = () => {
    closeMenu();
    const modifiedPath = gotologin ? "/auth/login" : path;
    router.push(modifiedPath, {});
  };
  const onClickIcon = () => {
    toggleModalNavBock(!isOpenModalNavBock);
  };

  const handleToggleModalNavBock = () => {
    toggleModalNavBock(false); // Ferme le modal
  };

  return (
    <div
      id="modal-navbloc-grid"
      className="my-2 min-h-12 rounded-2xl bg-white/80 border border-secondary/10 shadow-sm overflow-hidden"
    >
      <div className="flex items-center">
        <button className="flex-1 text-left px-4 py-4" onClick={onClickLink}>
          <span className="text-lg font-semibold text-secondary uppercase tracking-wide">
            {gotologin ? "Login" : name}
          </span>
        </button>
        <div className="pr-2">
          <Button
            size={"icon"}
            variant={"ghost"}
            className="h-12 w-14 rounded-xl bg-secondary/10 hover:bg-secondary/15 border border-secondary/20 transition-colors flex items-center justify-center"
            disabled={!subroutes || subroutes.length === 0 || gotologin}
            onClick={onClickIcon}
            aria-label={`Ouvrir les sous-liens de ${name}`}
          >
            {!isOpenModalNavBock && (
              <BiSolidChevronDown className="h-5 w-5 text-secondary" />
            )}
            {isOpenModalNavBock && (
              <BiSolidChevronUp className="h-5 w-5 text-secondary" />
            )}
          </Button>
        </div>
      </div>
      {isOpenModalNavBock && (
        <div className="flex flex-col gap-2 px-3 pb-3">
          {subroutes?.map((subroute) => (
            <ModalNavBlocSub
              key={subroute.slug}
              subroute={subroute}
              handleToggleModalNavBock={handleToggleModalNavBock}
            />
          ))}
        </div>
      )}
    </div>
  );
};
