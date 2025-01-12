'use client';

import Link from 'next/link';
import { SubRoute } from '@/types/nav-routes';
import { getPathColor } from '@/lib/get-path-color';
import React, { useState, useRef } from 'react';

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
}: NavButtonProps) => {
  const [showDropDown, setShowDropdown] = useState(false); // État pour contrôler la visibilité du sous-menu
  const buttonRef = useRef<HTMLDivElement | null>(null); // Référence au bouton principal

  const hoverClass = getPathColor(path);

  const handleMainButtonClick = () => {
    setShowDropdown(!showDropDown); // Basculer le menu
    buttonRef.current?.blur(); // Retirer le focus du bouton principal
  };

  const handleSubrouteClick = () => {
    setShowDropdown(false); // Fermer le sous-menu après un clic
  };

  return (
    <div
      className={`col-span-1 relative group z-50 bg-transparent box-border`}
      onMouseEnter={() => setShowDropdown(true)}
      onMouseLeave={() => setShowDropdown(false)}
    >
      <div
        ref={buttonRef}
        onClick={handleMainButtonClick}
        className={`text-2xl md:text-sm lg:text-xl text-secondary uppercase tracking-widest h-[4rem] w-full flex items-center justify-center xl:tracking-widest ${
          isActive ? `border-b-4` : ''
        } hover:bg-${hoverClass} hover:text-white`}
      >
        <Link href={path}>{name}</Link>
      </div>
      {showDropDown && subroutes && (
        <div className="absolute w-full bg-transparent ">
          {subroutes.map((subroute) => (
            <div
              key={subroute.slug}
              className={`relative group2 bg-gray-100 w-full my-1 box-border hover:bg-${hoverClass}`}
            >
              <div className="text-2xl md:text-sm lg:text-xl tracking-wider text-secondary  h-[4rem] flex items-center justify-center ">
                <Link
                  href={subroute.path}
                  onClick={handleSubrouteClick} // Ferme le menu au clic
                >
                  {subroute.name}
                </Link>
              </div>
              <div className="absolute w-full top-0 left-full bg-transparent z-50">
                {subroute.finalroutes &&
                  subroute.finalroutes.map((finalroute) => (
                    <div
                      key={finalroute.slug}
                      className={`text-2xl md:text-sm lg:text-xl tracking-wider text-secondary h-[4rem] w-full flex items-center justify-center bg-gray-100 mx-1 mb-1 box-border hover:bg-${hoverClass}`}
                    >
                      <Link
                        href={finalroute.path}
                        onClick={handleSubrouteClick} // Ferme également au clic sur un sous-sous-menu
                      >
                        {finalroute.name}
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
