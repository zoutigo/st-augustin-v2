import Link from 'next/link';
import { Card, CardHeader, CardContent, CardFooter } from '../ui/card';

interface SponsorLinkProps {
  path: string;
  title: string;
}

const SponsorLink = ({ title, path }: SponsorLinkProps) => {
  return (
    <div className="mt-1 mb-[2rem] capitalize text-xl">
      <Link href={path} target="_blank" passHref>
        {title}
      </Link>
    </div>
  );
};

export const FooterSponsorCard = () => {
  const sponsors: SponsorLinkProps[] = [
    {
      title: `La paroisse Saint Martin`,
      path: `https://paroissecremieu.fr`,
    },
    {
      title: `La direction Diocésaine de l'enseignement catholique`,
      path: `https://ec38.org`,
    },
    {
      title: `La fedération des OGEC`,
      path: `https://www.fnogec.org`,
    },
  ];
  return (
    <Card className="bg-transparent border-transparent text-white md:col-span-2">
      <CardHeader className="uppercase text-2xl font-semibold tracking-wider flex justify-start">
        Nos partenaires
      </CardHeader>
      <CardContent>
        {sponsors.map((sponsor) => (
          <SponsorLink key={sponsor.path} {...sponsor} />
        ))}
      </CardContent>
    </Card>
  );
};
