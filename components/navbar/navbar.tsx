'use client';

import { usePathname } from 'next/navigation';
import { TiThMenu } from 'react-icons/ti';

import { FaWindowClose } from 'react-icons/fa';
import { cn } from '@/lib/utils';
import { Poppins } from 'next/font/google';
import { NavRoutes } from '@/routes';
import { Logo } from './logo';
import { Button } from '../ui/button';
import { useAppStore } from '@/lib/store';
import { DynamicNavButton } from './dynamic-nav-button';

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
});

export const Navbar = () => {
  const pathname = usePathname();
  const { isMenuOpen, toggleMenu } = useAppStore(); // Utilisez Zustand

  return (
    <header className="flex flex-row justify-between items-center h-[14vh] min-w-[100%] px-10 shadow-sm">
      <div className="mt-12">
        <Logo />
      </div>
      {/* <nav className="hidden lg:flex bg-white w-[80%] flex-row justify-between items-center mx-2 gap-1"> */}
      <nav className="hidden lg:grid grid-cols-6 bg-slate-50 w-[80%]">
        {NavRoutes.map((route) => {
          return (
            <DynamicNavButton
              {...route}
              key={route.slug}
              isActive={route.path.includes(pathname) && pathname !== '/'}
            />
          );
        })}
      </nav>
      <div className="lg:hidden">
        {!isMenuOpen && (
          <Button
            size={'lg'}
            variant={'outline'}
            className="border-none p-1"
            onClick={toggleMenu}
          >
            <TiThMenu
              className="h-20 w-20 text-primary"
              style={{ strokeWidth: 1, width: 50, height: 50 }}
            />
          </Button>
        )}
        {isMenuOpen && (
          <Button
            size={'lg'}
            variant={'outline'}
            className="border-none p-1"
            onClick={toggleMenu}
          >
            <FaWindowClose
              className="h-14 w-14 text-primary"
              // style={{ strokeWidth: 2 }}
            />
          </Button>
        )}
      </div>
    </header>
  );
};

// className={cn(
//     'text-6xl font-semibold text-white drop-shadow-md',
//     font.className
//   )}
