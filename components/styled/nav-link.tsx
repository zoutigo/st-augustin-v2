import Link from 'next/link';
import { ReactNode } from 'react';

interface NavLinkProps {
  href: string;
  children: ReactNode;
  className?: string; // Permet d'ajouter des classes personnalisées
  target?: string; // Pour ouvrir dans un nouvel onglet ou autre
}

const NavLink = ({
  href,
  children,
  className,
  target,
  ...props
}: NavLinkProps) => {
  return (
    <Link
      href={href}
      passHref
      {...props}
      className="text-inherit decoration-inherit"
    >
      {/* Si le target est "_blank", on peut aussi ajouter rel="noopener noreferrer" */}
      {/* <a
        className={`text-blue-600 hover:text-blue-800 ${className}`}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a> */}
      <span className="text-primary-dark">{children}</span>
    </Link>
  );
};

export default NavLink;

// export const StyledNavLink = styled(NavLink)(({ theme }) => ({
//   color: 'inherit',
//   textDecoration: 'inherit',
//   '& span': {
//     color: theme.palette.primary.main,
//   },
// }));
