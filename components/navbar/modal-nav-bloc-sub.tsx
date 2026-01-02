import { SubRoute } from "@/types/nav-routes";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useAppStore } from "@/lib/store";
import { useHandleLogout } from "@/hooks/use-handle-logout";
import { memo, useCallback } from "react";
import { useCurrentGrade } from "@/hooks/use-current-grade";

interface ModalNavBlocSubProps {
  subroute: SubRoute;
  handleToggleModalNavBock: (isOpen?: boolean) => void;
}

export const ModalNavBlocSub = memo(function ModalNavBlocSub({
  handleToggleModalNavBock,
  subroute,
}: ModalNavBlocSubProps) {
  const { name, slug, path, finalroutes } = subroute;
  const { closeMenu } = useAppStore();
  const router = useRouter();
  const { handleLogout } = useHandleLogout();
  const grade = useCurrentGrade();

  const dashboardAllowedGrades = ["ADMIN", "MANAGER", "MODERATOR"];
  const dashboardIsAllowed = dashboardAllowedGrades.includes(grade || "");

  const handleNavigation = useCallback(
    (e: React.MouseEvent, subroutePath: string, isLogout?: boolean) => {
      e.preventDefault();
      closeMenu();
      handleToggleModalNavBock(false);

      if (isLogout) {
        handleLogout();
      } else {
        router.push(subroutePath);
      }
    },
    [closeMenu, handleToggleModalNavBock, handleLogout, router],
  );

  // Ne pas afficher la route du dashboard si l'accès est interdit
  if (slug === "dashboard" && !dashboardIsAllowed) {
    return null;
  }

  return (
    <div className="bg-white/70 border border-secondary/10 rounded-xl p-3">
      <Button
        variant="ghost"
        className="w-full justify-start text-base md:text-lg font-semibold text-secondary"
        onClick={(e) => handleNavigation(e, path, slug === "logout")}
      >
        <span className="capitalize">{name}</span>
      </Button>

      {finalroutes && (
        <div className="flex flex-wrap items-center gap-2 mt-2">
          {finalroutes.map((finalroute) => (
            <Button
              key={finalroute.slug}
              variant="secondary"
              className="rounded-full bg-secondary/10 text-secondary px-3 py-2 text-sm"
              onClick={(e) => handleNavigation(e, finalroute.path)}
            >
              {finalroute.name}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
});

ModalNavBlocSub.displayName = "ModalNavBlocSub";
