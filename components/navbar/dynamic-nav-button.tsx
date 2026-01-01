"use client";

import Link from "next/link";
import React, { useState, useRef, useCallback } from "react";
import { Button } from "../ui/button";
import { SubRoute } from "@/types/nav-routes";
import { getPathColor } from "@/lib/get-path-color";
import { useHandleLogout } from "@/hooks/use-handle-logout";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useCurrentGrade } from "@/hooks/use-current-grade";
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";

interface NavButtonProps {
  name: string;
  path: string;
  slug: string;
  subroutes?: SubRoute[];
  isActive: boolean;
}

export const DynamicNavButton = ({
  name,
  path,
  subroutes,
  isActive,
  slug,
}: NavButtonProps) => {
  const { handleLogout } = useHandleLogout();
  const user = useCurrentUser();
  const grade = useCurrentGrade();
  const router = useRouter();
  const isPrivateRoute = slug === "espace-prive";
  const isAuthenticated = Boolean(user);

  const dashboardAllowedGrades = ["ADMIN", "MANAGER", "MODERATOR"];
  const dashboardIsAllowed = dashboardAllowedGrades.includes(grade || "");

  const [showDropDown, setShowDropdown] = useState(false);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  const hoverClass = getPathColor(path);

  const handleMainButtonClick = () => {
    setShowDropdown((prev) => !prev);
    buttonRef.current?.blur();
  };

  const handleSubrouteClick = useCallback(() => {
    setShowDropdown(false);
  }, []);

  const handleNavigation = useCallback(
    (e: React.MouseEvent, subroutePath: string, isLogout?: boolean) => {
      e.preventDefault();
      setShowDropdown(false);
      if (isLogout) {
        handleLogout();
      } else {
        router.push(subroutePath);
      }
    },
    [router, handleLogout],
  );

  // Afficher le bouton de connexion si l'utilisateur est déconnecté pour l'espace privé
  if (!user && isPrivateRoute) {
    return (
      <div className="col-span-1 relative group z-50 bg-transparent box-border flex items-center justify-center">
        <Link
          href="/auth/login"
          className="h-[4rem] w-full flex items-center justify-center"
          aria-label="Espace privé"
        >
          <Button
            variant="ghost"
            className="h-12 w-12 p-0 rounded-full border border-gray-200 bg-white shadow-sm hover:bg-gray-100"
            aria-label="Connexion espace privé"
          >
            <FaUserCircle className="h-8 w-8 text-red-500" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div
      className="col-span-1 relative group z-50 bg-transparent box-border"
      onMouseEnter={() => setShowDropdown(true)}
      onMouseLeave={() => setShowDropdown(false)}
    >
      <div
        ref={buttonRef}
        onClick={handleMainButtonClick}
        className={`h-[4rem] w-full flex items-center justify-center cursor-pointer ${
          isPrivateRoute
            ? "hover:bg-transparent"
            : "text-2xl md:text-sm lg:text-xl text-secondary uppercase tracking-widest xl:tracking-widest hover:bg-" +
              hoverClass +
              " hover:text-white"
        } ${isActive && !isPrivateRoute ? "border-b-4" : ""}`}
      >
        <Link
          href={path}
          className="flex items-center justify-center w-full h-full"
          aria-label={isPrivateRoute ? "Espace privé" : name}
        >
          {isPrivateRoute ? (
            <div className="h-12 w-12 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center">
              <FaUserCircle
                className={`h-8 w-8 ${isAuthenticated ? "text-green-600" : "text-red-500"}`}
              />
            </div>
          ) : (
            name
          )}
        </Link>
      </div>

      {showDropDown && subroutes && (
        <div className="absolute w-full bg-transparent">
          {subroutes
            .filter(
              (subroute) =>
                !(subroute.slug === "dashboard" && !dashboardIsAllowed),
            )
            .map((subroute) => (
              <div
                key={subroute.slug}
                className={`relative group2 bg-gray-100 w-full my-1 box-border hover:bg-${hoverClass}`}
              >
                <div className="text-2xl md:text-sm lg:text-xl tracking-wider text-secondary h-[4rem] flex items-center justify-center cursor-pointer">
                  {subroute.slug === "logout" ? (
                    <button
                      onClick={(e) => handleNavigation(e, "", true)}
                      className="w-full h-full flex items-center justify-center cursor-pointer"
                    >
                      {subroute.name}
                    </button>
                  ) : (
                    <Link
                      href={subroute.path}
                      onClick={handleSubrouteClick}
                      className="w-full h-full flex items-center justify-center"
                    >
                      {subroute.name}
                    </Link>
                  )}
                </div>

                {subroute.finalroutes && (
                  <div className="absolute w-full top-0 left-full bg-transparent z-50">
                    {subroute.finalroutes.map((finalroute) => (
                      <div
                        key={finalroute.slug}
                        className={`text-2xl md:text-sm lg:text-xl tracking-wider text-secondary h-[4rem] w-full flex items-center justify-center bg-gray-100 mx-1 mb-1 box-border hover:bg-${hoverClass} cursor-pointer`}
                      >
                        <Link
                          href={finalroute.path}
                          onClick={handleSubrouteClick}
                          className="w-full h-full flex items-center justify-center"
                        >
                          {finalroute.name}
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
