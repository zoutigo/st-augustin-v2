'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Poppins } from 'next/font/google';

const routes = [
  {
    id: 1,
    name: "L'ecole",
    slug: 'ecole',
    path: '/ecole',
    primary: 'blue',
    secondary: 'skyblue',
  },
  {
    id: 2,
    name: 'Vie Scolaire',
    slug: 'vie-scolaire',
    path: '/vie-scolaire',
    primary: 'blue',
    secondary: 'skyblue',
  },
  {
    id: 3,
    name: 'Les Classes',
    slug: 'classes',
    path: '/classes',
    primary: 'blue',
    secondary: 'skyblue',
  },
  {
    id: 4,
    name: 'Informations',
    slug: 'informations',
    path: '/informations',
    primary: 'blue',
    secondary: 'skyblue',
  },
  {
    id: 5,
    name: 'APEL-OGEC',
    slug: 'apel-ogec',
    path: '/apel-ogec',
    primary: 'blue',
    secondary: 'skyblue',
  },
  {
    id: 6,
    name: 'Espace privé',
    slug: 'espace-prive',
    path: '/espace-prive',
    primary: 'blue',
    secondary: 'skyblue',
  },
];

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
});

export const Navbar = () => {
  const pathname = usePathname();
  return (
    <header className="z-10 fixed flex flex-row justify-center items-center gap-3 h-[7vh]">
      <div className="bg-yellow-100 w-[20%]"> Logo</div>
      <nav className="w-full bg-white ">
        {routes.map((route) => {
          return (
            <Button
              asChild
              key={route.id}
              variant={pathname === route.path ? 'default' : 'outline'}
              className="mx-4"
            >
              <Link href={route.path}>
                <span className="text-3xl">{route.name}</span>
              </Link>
            </Button>
          );
        })}
      </nav>
    </header>
  );
};

// className={cn(
//     'text-6xl font-semibold text-white drop-shadow-md',
//     font.className
//   )}
