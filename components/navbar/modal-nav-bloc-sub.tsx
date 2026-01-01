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
    <div>
      <Button
        variant="outline"
        className="w-full justify-start pl-12 mt-1 min-h-12 items-center bg-primary-light"
        onClick={(e) => handleNavigation(e, path, slug === "logout")}
      >
        <span className="text-2xl tracking-widest capitalize text-secondary">
          {name}
        </span>
      </Button>

      {finalroutes && (
        <div className="flex items-center justify-between gap-3 px-10">
          {finalroutes.map((finalroute) => (
            <Button
              key={finalroute.slug}
              variant="link"
              className="min-w-[25%] min-h-14 !bg-transparent mt-3"
              onClick={(e) => handleNavigation(e, finalroute.path)}
            >
              <span className="text-2xl capitalize text-secondary">
                {finalroute.name}
              </span>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
});

ModalNavBlocSub.displayName = "ModalNavBlocSub";
