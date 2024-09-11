import Link from 'next/link';
import { Button } from '../ui/button';
import { SubRoute } from '@/types/nav-routes';

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
  return (
    <Button variant={'link'} className="bg-inherit" asChild>
      <Link href={path}>{name} </Link>
    </Button>
  );
};
