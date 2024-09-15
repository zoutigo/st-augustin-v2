import { SubRoute } from '@/types/nav-routes';
import { Button } from '../ui/button';
import Link from 'next/link';

interface ModalNavBlocSubProps {
  subroute: SubRoute;
  toggleModalNavBock: () => void;
}
export const ModalNavBlocSub = ({
  toggleModalNavBock,
  subroute: { name, slug, path, finalroutes },
}: ModalNavBlocSubProps) => {
  const handleClick = () => {
    toggleModalNavBock();
  };
  return (
    <div>
      <Button
        variant={'outline'}
        className="w-full justify-start pl-12 mt-1 min-h-16 items-center bg-primary-light"
        onClick={handleClick}
      >
        <Link href={path}>
          <span className="text-2xl tracking-wider capitalize text-secondary">
            {name}
          </span>
        </Link>
      </Button>
      {finalroutes && (
        <div className="flex items-center justify-between gap-3 px-10">
          {finalroutes.map((finalroute) => (
            <Button
              key={finalroute.slug}
              variant={'outline'}
              className="min-w-[25%] min-h-14 !bg-transparent mt-3"
            >
              <Link href={finalroute.path}>
                <span className="text-2xl capitalize text-secondary">
                  {name}
                </span>
              </Link>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};
