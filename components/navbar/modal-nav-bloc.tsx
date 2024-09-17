import { NavRoute } from '@/types/nav-routes';

import { Button } from '../ui/button';

import { useRouter } from 'next/navigation';
import { BiSolidChevronDown, BiSolidChevronUp } from 'react-icons/bi';
import { useAppStore } from '@/lib/store';
import { useState } from 'react';
import { ModalNavBlocSub } from './modal-nav-bloc-sub';

interface ModalNavBlocProps {
  route: NavRoute;
}

export const ModalNavBloc = ({ route }: ModalNavBlocProps) => {
  const { name, path, slug, subroutes } = route;
  const [isOpenModalNavBock, toggleModalNavBock] = useState(false);
  const { isMenuOpen, toggleMenu, closeMenu } = useAppStore(); // Utilisez Zustand

  const router = useRouter();

  const onClickLink = () => {
    closeMenu();
    router.push(path, {});
  };
  const onClickIcon = () => {
    toggleModalNavBock(!isOpenModalNavBock);
  };
  return (
    <div id="modal-navbloc-grid" className="my-2 min-h-20">
      <div className="grid grid-cols-12 gap-2 h-full">
        <div
          className="col-span-10 bg-primary flex items-center justify-start h-full pl-8 cursor-pointer "
          onClick={onClickLink}
        >
          <span className="font-semibold font-cursive tracking-wider text-2xl text-secondary uppercase">
            {name}
          </span>
        </div>
        <div className="col-span-2 bg-transparent shadow-sm p-1 h-full">
          <Button
            size={'sm'}
            variant={'outline'}
            className="w-full h-full"
            onClick={onClickIcon}
          >
            {!isOpenModalNavBock && (
              <BiSolidChevronDown className="h-10 w-10 text-secondary" />
            )}
            {isOpenModalNavBock && (
              <BiSolidChevronUp className="h-10 w-10 text-secondary" />
            )}
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {isOpenModalNavBock &&
          subroutes?.map((subroute) => (
            <ModalNavBlocSub
              key={subroute.slug}
              subroute={subroute}
              toggleModalNavBock={toggleModalNavBock}
            />
          ))}
      </div>
    </div>
  );
};
