"use client";
import { getColorByName } from "@/lib/get-color-by-name";
import { getPathColor } from "@/lib/get-path-color";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback } from "react";
import styled from "styled-components";

interface StyledNavProps extends React.HTMLProps<HTMLDivElement> {
  $dynamicColor: string; // Prop transitoire
}

const StyledNav = styled.nav<StyledNavProps>`
  background-color: ${(props) => props.$dynamicColor};
`;

const Breadcrumb = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  const dynamicColor = useCallback((): string => {
    // Récupère le nom de la couleur associé au path
    const buttonHoverColor = getPathColor(pathname);

    // Convertit le nom de la couleur en une valeur valide pour CSS
    return getColorByName(buttonHoverColor);
  }, [pathname]);

  const formatLabel = (slug: string) => {
    const mappings: Record<string, string> = {
      "espace-prive": "Espace-Privé",
      dashboard: "Dashboard",
      modals: "Modals",
      blogposts: "Posts",
      entities: "Entités",
      pages: "Pages",
    };
    if (mappings[slug]) return mappings[slug];
    return slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  };

  return (
    <StyledNav
      $dynamicColor={dynamicColor()}
      className="h-[3.5rem] w-full flex items-center rounded-md shadow-sm mb-4"
    >
      <ul className="flex space-x-2 items-center pl-6 text-base text-gray-900 font-semibold">
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const label = formatLabel(segment);
          const isLast = index === pathSegments.length - 1;
          return (
            <li key={href} className="flex items-center">
              {!isLast ? (
                <Link
                  href={href}
                  className="hover:underline hover:text-gray-800"
                >
                  {label}
                </Link>
              ) : (
                <span className="text-gray-800">{label}</span>
              )}
              {index < pathSegments.length - 1 && (
                <span className="mx-2 text-gray-700">/</span>
              )}
            </li>
          );
        })}
      </ul>
    </StyledNav>
  );
};

export default Breadcrumb;
