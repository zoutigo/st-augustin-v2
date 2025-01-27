'use client';

import Link from 'next/link';
import React, { useState, useRef, useCallback } from 'react';
import { Button } from '../ui/button';
import { SubRoute } from '@/types/nav-routes';
import { getPathColor } from '@/lib/get-path-color';
import { useHandleLogout } from '@/hooks/use-handle-logout';
import { useCurrentUser } from '@/hooks/use-current-user';
import { useCurrentGrade } from '@/hooks/use-current-grade';
import { useRouter } from 'next/navigation';

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

  const dashboardAllowedGrades = ['ADMIN', 'MANAGER', 'MODERATOR'];
  const dashboardIsAllowed = dashboardAllowedGrades.includes(grade || '');

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
    [router, handleLogout]
  );

  // Afficher le bouton de connexion si l'utilisateur est déconnecté pour l'espace privé
  if (!user && slug === 'espace-prive') {
    return (
      <div className="col-span-1 relative group z-50 bg-transparent box-border">
        <Link
          href="/auth/login"
          className="text-secondary uppercase h-[4rem] w-full flex items-center justify-center"
        >
          <Button className="w-full text-secondary font-semibold uppercase text-2xl md:text-sm lg:text-xl tracking-widest xl:tracking-widest hover:opacity-80">
            Login
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
        className={`text-2xl md:text-sm lg:text-xl text-secondary uppercase tracking-widest h-[4rem] w-full flex items-center justify-center xl:tracking-widest ${
          isActive ? 'border-b-4' : ''
        } hover:bg-${hoverClass} hover:text-white`}
      >
        <Link href={path}>{name}</Link>
      </div>

      {showDropDown && subroutes && (
        <div className="absolute w-full bg-transparent">
          {subroutes
            .filter(
              (subroute) =>
                !(subroute.slug === 'dashboard' && !dashboardIsAllowed)
            )
            .map((subroute) => (
              <div
                key={subroute.slug}
                className={`relative group2 bg-gray-100 w-full my-1 box-border hover:bg-${hoverClass}`}
              >
                <div className="text-2xl md:text-sm lg:text-xl tracking-wider text-secondary h-[4rem] flex items-center justify-center">
                  {subroute.slug === 'logout' ? (
                    <button
                      onClick={(e) => handleNavigation(e, '', true)}
                      className="w-full h-full flex items-center justify-center"
                    >
                      {subroute.name}
                    </button>
                  ) : (
                    <Link href={subroute.path} onClick={handleSubrouteClick}>
                      {subroute.name}
                    </Link>
                  )}
                </div>

                {subroute.finalroutes && (
                  <div className="absolute w-full top-0 left-full bg-transparent z-50">
                    {subroute.finalroutes.map((finalroute) => (
                      <div
                        key={finalroute.slug}
                        className={`text-2xl md:text-sm lg:text-xl tracking-wider text-secondary h-[4rem] w-full flex items-center justify-center bg-gray-100 mx-1 mb-1 box-border hover:bg-${hoverClass}`}
                      >
                        <Link
                          href={finalroute.path}
                          onClick={handleSubrouteClick}
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
