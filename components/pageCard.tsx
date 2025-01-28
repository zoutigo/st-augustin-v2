import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { NavRoutes } from '@/routes';
import { NavRoute } from '@/types/nav-routes';

interface PageCardProps {
  slug: string;
  description: string;
}

export const PageCard = ({ slug, description }: PageCardProps) => {
  const route: NavRoute | undefined = NavRoutes.find((r) => r.slug === slug);

  if (!route || !route.subroutes) {
    return (
      <div className="text-center text-red-500 text-lg">
        Aucune donnée disponible pour {slug}.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {route.subroutes.map(({ name, slug, path }) => (
        <Card
          key={slug}
          className="w-full max-w-sm rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out"
        >
          <CardHeader className="relative w-full h-56">
            <Image
              src={`/images/${slug}.jpg`}
              alt={name}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
            />
          </CardHeader>
          <CardContent className="p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {name.toUpperCase()}
            </h3>
            <p className="text-gray-600 text-md">{description}</p>
          </CardContent>
          <CardFooter className="p-6 flex justify-center">
            <Link href={path} passHref className="w-full">
              <Button
                variant="default"
                className="w-full text-lg text-secondary"
              >
                En savoir plus
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
