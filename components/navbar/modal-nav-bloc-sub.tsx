import { SubRoute } from '@/types/nav-routes';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';

interface ModalNavBlocSubProps {
  subroute: SubRoute;
  handleToggleModalNavBocck: (isOpen?: boolean) => void;
}
export const ModalNavBlocSub = ({
  handleToggleModalNavBocck,
  subroute: { name, slug, path, finalroutes },
}: ModalNavBlocSubProps) => {
  const { isMenuOpen, toggleMenu, closeMenu } = useAppStore(); // Utilisez Zustand

  const handleClick = () => {
    handleToggleModalNavBocck();
    closeMenu();
  };
  return (
    <div>
      <Button
        variant={'outline'}
        className="w-full justify-start pl-12 mt-1 min-h-12 items-center bg-primary-light"
        onClick={handleClick}
      >
        <Link href={path} passHref onClick={handleClick}>
          <span className="text-2xl  tracking-widest capitalize text-secondary">
            {name}
          </span>
        </Link>
      </Button>
      {finalroutes && (
        <div className="flex items-center justify-between gap-3 px-10">
          {finalroutes.map((finalroute) => (
            <Button
              key={finalroute.slug}
              variant={'link'}
              className="min-w-[25%] min-h-14 !bg-transparent mt-3"
            >
              <Link href={finalroute.path}>
                <span className="text-2xl capitalize text-secondary">
                  {finalroute.name}
                </span>
              </Link>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};
