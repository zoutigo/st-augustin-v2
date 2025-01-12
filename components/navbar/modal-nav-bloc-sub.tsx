import { SubRoute } from '@/types/nav-routes';
import { useRouter } from 'next/navigation';

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

  const router = useRouter();

  const handleClick = () => {
    handleToggleModalNavBocck();
    closeMenu();
  };
  return (
    <div>
      <Button
        variant="outline"
        className="w-full justify-start pl-12 mt-1 min-h-12 items-center bg-primary-light"
        onClick={() => {
          handleClick(); // Appel de votre fonction existante
          router.push(path); // Navigation vers la route définie
        }}
      >
        <span className="text-2xl tracking-widest capitalize text-secondary">
          {name}
        </span>
      </Button>
      {/* <Button
        variant={'outline'}
        className="w-full justify-start pl-12 mt-1 min-h-12 items-center bg-primary-light"
        onClick={handleClick}
      >
        <Link
          href={path}
          passHref
          onClick={(e) => e.stopPropagation()} // Empêche l'événement `onClick` du bouton
        >
          <span className="text-2xl  tracking-widest capitalize text-secondary">
            {name}
          </span>
        </Link>
      </Button> */}
      {finalroutes && (
        <div className="flex items-center justify-between gap-3 px-10">
          {finalroutes.map((finalroute) => (
            <Button
              key={finalroute.slug}
              variant="link"
              className="min-w-[25%] min-h-14 !bg-transparent mt-3"
              onClick={() => router.push(finalroute.path)}
            >
              <span className="text-2xl capitalize text-secondary">
                {finalroute.name}
              </span>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};
