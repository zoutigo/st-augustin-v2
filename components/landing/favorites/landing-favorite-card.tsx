import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import Link from 'next/link';

export interface LandingFavoriteCardProps {
  title: string;
  icon: React.ElementType;
  text: string;
  path: string;
}

export const LandingFavoriteCard = ({
  title,
  text,
  icon: Icon,
  path,
}: LandingFavoriteCardProps) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-center">
          <Icon className="text-4xl text-primary h-[6rem] w-[6rem]" />{' '}
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="text-center text-secondary font-sans font-semibold text-2xl my-[2rem] uppercase">
          {title}{' '}
        </div>
        <div className="text-xl text-justify">{text} </div>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button
          variant={'default'}
          className="w-full py-8 hover:bg-secondary-ligth hover:uppercase"
        >
          <Link href={path}>
            <span className="text-2xl text-secondary font-cursive">
              {' '}
              Allons y !
            </span>
          </Link>
        </Button>{' '}
      </CardFooter>
    </Card>
  );
};
