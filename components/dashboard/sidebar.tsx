'use client';

import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="w-64 bg-gray-800 text-white">
      <nav className="p-4 space-y-4">
        <Link href="/espace-prive/dashboard/pages" passHref>
          <Button
            variant={
              pathname === '/espace-prive/dashboard/pages'
                ? 'secondary'
                : 'ghost'
            }
            className="w-full"
          >
            Pages
          </Button>
        </Link>

        <Link href="/espace-prive/dashboard/users" passHref>
          <Button
            variant={
              pathname === '/espace-prive/dashboard/users'
                ? 'secondary'
                : 'ghost'
            }
            className="w-full"
          >
            Users
          </Button>
        </Link>

        <Link href="/espace-prive/dashboard/entities">
          <Button
            variant={
              pathname === '/espace-prive/dashboard/entities'
                ? 'secondary'
                : 'ghost'
            }
            className="w-full"
          >
            Entités
          </Button>
        </Link>

        <Link href="/espace-prive/dashboard/blogposts">
          <Button
            variant={
              pathname === '/espace-prive/dashboard/blogposts'
                ? 'secondary'
                : 'ghost'
            }
            className="w-full"
          >
            Posts
          </Button>
        </Link>

        <Link href="/espace-prive/dashboard/modals">
          <Button
            variant={
              pathname === '/espace-prive/dashboard/modals'
                ? 'secondary'
                : 'ghost'
            }
            className="w-full"
          >
            Modales
          </Button>
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
