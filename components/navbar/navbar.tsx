'use client';

import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Poppins } from 'next/font/google';
import { NavButton } from './navButton';
import { NavRoutes } from '@/routes';
import { Logo } from './logo';

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
});

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <header className="z-10 flex flex-row justify-between items-center h-[14vh] min-w-[100%] px-10 shadow-sm">
      <div className="mt-7">
        <Logo />
      </div>
      {/* <div className="bg-yellow-100 w-[20%]"> Logo</div> */}
      <nav className=" bg-white w-[80%] flex flew-row justify-between items-center m-x-2">
        {NavRoutes.map((route) => {
          return (
            <NavButton
              {...route}
              key={route.slug}
              isActive={route.path.includes(pathname) && pathname !== '/'}
            />
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
