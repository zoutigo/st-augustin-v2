'use client';

import Link from 'next/link';
import styled from 'styled-components';

import { SubRoute } from '@/types/nav-routes';

import { getPathColor } from '@/lib/get-path-color';
import { cn } from '@/lib/utils';
import { useCallback, useEffect, useState } from 'react';
import H3 from '../styled/h3';
import { getColorByName } from '@/lib/get-color-by-name';

interface NavButtonProps {
  name: string;
  path: string;
  slug: string;
  subroutes?: SubRoute[];
  isActive: boolean;
}

interface StyledNavRouteProps extends React.HTMLProps<HTMLDivElement> {
  $hoverColor: string; // Prop transitoire
}
interface StyledNavSubRouteProps extends React.HTMLProps<HTMLDivElement> {
  $hoverColor: string; // Prop transitoire
}
interface StyledNavFinalRouteProps extends React.HTMLProps<HTMLDivElement> {
  $hoverColor: string; // Prop transitoire
}

const StyledNavRoute = styled.div<StyledNavRouteProps>`
  box-sizing: border-box;
  background-color: transparent;
  &:hover {
    background-color: ${(props) =>
      props.$hoverColor}; /* Couleur dynamique au survol */
  }
`;
const StyledNavSubRoute = styled.div<StyledNavSubRouteProps>`
  box-sizing: border-box;
  background-color: white-smoke;
  &:hover {
    background-color: ${(props) =>
      props.$hoverColor}; /* Couleur dynamique au survol */
  }
`;
const StyledNavFinalRoute = styled.div<StyledNavFinalRouteProps>`
  box-sizing: border-box;
  background-color: white-smoke;
  &:hover {
    background-color: ${(props) =>
      props.$hoverColor}; /* Couleur dynamique au survol */
  }
`;

export const NavButton = ({
  name,
  path,
  isActive,
  subroutes,
}: NavButtonProps) => {
  const [showDropDown, setShowDropdown] = useState(true);

  useEffect(() => {
    const handleClick = () => {
      if (!showDropDown) setShowDropdown(true);
    };

    window.addEventListener('mousemove', handleClick);
    return () => {
      window.removeEventListener('mousemove', handleClick);
    };
  }, [showDropDown]);

  //   const active = useCallback(pathname.includes(rubric.path), [pathname])
  const handleClick = useCallback(() => {
    setShowDropdown(false);
  }, []);

  const dynamicColor = useCallback((): string => {
    // Récupère le nom de la couleur associé au path
    const buttonHoverColor = getPathColor(path);

    // Convertit le nom de la couleur en une valeur valide pour CSS
    return getColorByName(buttonHoverColor);
  }, [path]);

  return (
    <StyledNavRoute
      $hoverColor={dynamicColor()} // Utilise le prop transitoire
      className="col-span-1 relative  group bg-transparent z-50"
    >
      <div className="text-3xl uppercase tracking-wide text-secondary h-[4rem] w-full flex items-center justify-center xl:tracking-widest">
        <Link href={path}>{name}</Link>
      </div>
      <div className="absolute w-full invisible group-hover:visible bg-transparent">
        {subroutes &&
          subroutes.map((subroute) => (
            <StyledNavSubRoute
              key={subroute.slug}
              $hoverColor={dynamicColor()}
              className="relative group2 bg-gray-100 w-full my-1"
            >
              <div className="h-[4rem] flex items-center justify-center text-2xl tracking-wider text-secondary">
                <Link href={subroute.path}>{subroute.name} </Link>
              </div>
              <div className="absolute w-full top-0 left-full invisible group2-hover:visible bg-transparent z-50">
                {subroute.finalroutes &&
                  subroute.finalroutes.map((finalroute) => (
                    <StyledNavFinalRoute
                      key={finalroute.slug}
                      $hoverColor={dynamicColor()}
                      className="text-2xl tracking-wider h-[4rem] w-full flex items-center justify-center bg-gray-100 mx-1 mb-1"
                    >
                      <Link href={finalroute.path}>{finalroute.name} </Link>
                    </StyledNavFinalRoute>
                  ))}
              </div>
            </StyledNavSubRoute>
          ))}
      </div>
    </StyledNavRoute>
  );
};
