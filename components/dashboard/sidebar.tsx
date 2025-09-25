'use client';

import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="w-64 bg-gray-900 text-gray-100">
      <nav className="p-4 space-y-2">
        <Link href="/espace-prive/dashboard/pages" passHref>
          <Button
            variant={pathname === '/espace-prive/dashboard/pages' ? 'secondary' : 'ghost'}
            className={`w-full justify-start rounded-md ${
              pathname === '/espace-prive/dashboard/pages'
                ? 'bg-secondary text-gray-900 shadow hover:bg-secondary'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            Pages
          </Button>
        </Link>

        <Link href="/espace-prive/dashboard/users" passHref>
          <Button
            variant={pathname === '/espace-prive/dashboard/users' ? 'secondary' : 'ghost'}
            className={`w-full justify-start rounded-md ${
              pathname === '/espace-prive/dashboard/users'
                ? 'bg-secondary text-gray-900 shadow hover:bg-secondary'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            Users
          </Button>
        </Link>

        <Link href="/espace-prive/dashboard/entities">
          <Button
            variant={pathname === '/espace-prive/dashboard/entities' ? 'secondary' : 'ghost'}
            className={`w-full justify-start rounded-md ${
              pathname === '/espace-prive/dashboard/entities'
                ? 'bg-secondary text-gray-900 shadow hover:bg-secondary'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            Entités
          </Button>
        </Link>

        <Link href="/espace-prive/dashboard/blogposts">
          <Button
            variant={pathname === '/espace-prive/dashboard/blogposts' ? 'secondary' : 'ghost'}
            className={`w-full justify-start rounded-md ${
              pathname === '/espace-prive/dashboard/blogposts'
                ? 'bg-secondary text-gray-900 shadow hover:bg-secondary'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            Posts
          </Button>
        </Link>

        <Link href="/espace-prive/dashboard/modals">
          <Button
            variant={pathname === '/espace-prive/dashboard/modals' ? 'secondary' : 'ghost'}
            className={`w-full justify-start rounded-md ${
              pathname === '/espace-prive/dashboard/modals'
                ? 'bg-secondary text-gray-900 shadow hover:bg-secondary'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            Modales
          </Button>
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
