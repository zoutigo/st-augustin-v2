'use client';

import Link from 'next/link';
import clsx from 'clsx';

import { SubRoute } from '@/types/nav-routes';

import { getPathColor } from '@/lib/get-path-color';
import { cn } from '@/lib/utils';

interface NavButtonProps {
  name: string;
  path: string;
  slug: string;
  subroutes?: SubRoute[];
  isActive: boolean;
}

export const NavButton = ({
  name,
  path,
  isActive,
  subroutes,
}: NavButtonProps) => {
  const buttonHoverColor = getPathColor(path);

  console.log('color:', buttonHoverColor);
  return (
    <ul className=" w-full flex flex-col items-center justify-center">
      <li>EmoiJ </li>
      <li
        className={cn(
          'cursor-pointer py-4 w-full bg-transparent text-center',
          `hover:bg-${buttonHoverColor}`
          //   `hover:bg-classes`
        )}
      >
        <Link href={path}>
          <span className="uppercase text-3xl">{name}</span>
        </Link>
      </li>
      <li className={`w-[50%] h-1 ${isActive ? 'bg-slate-300' : ''}`} />
    </ul>
  );
};
