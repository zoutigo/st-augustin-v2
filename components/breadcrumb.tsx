'use client';
import { getColorByName } from '@/lib/get-color-by-name';
import { getPathColor } from '@/lib/get-path-color';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback } from 'react';
import styled from 'styled-components';

interface StyledNavProps extends React.HTMLProps<HTMLDivElement> {
  $dynamicColor: string; // Prop transitoire
}

const StyledNav = styled.nav<StyledNavProps>`
  background-color: ${(props) =>
    props.$dynamicColor}; /* Couleur dynamique au survol */
`;

const Breadcrumb = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);

  const dynamicColor = useCallback((): string => {
    // Récupère le nom de la couleur associé au path
    const buttonHoverColor = getPathColor(pathname);

    // Convertit le nom de la couleur en une valeur valide pour CSS
    return getColorByName(buttonHoverColor);
  }, [pathname]);

  return (
    <StyledNav
      $dynamicColor={dynamicColor()}
      className={`bg-${dynamicColor()} h-[4rem] text-3xl text-secondary  capitalize font-bold font-cursive w-full flex opacity-25 rounded-sm`}
    >
      <ul className="flex space-x-2 items-center pl-[2rem]">
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
          return (
            <li key={href} className="text-xl">
              <Link href={href} className="text-blue-500">
                {segment}
              </Link>
              {index < pathSegments.length - 1 && <span> / </span>}
            </li>
          );
        })}
      </ul>
    </StyledNav>
  );
};

export default Breadcrumb;
