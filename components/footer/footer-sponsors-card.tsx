import Link from "next/link";

interface SponsorLinkProps {
  path: string;
  title: string;
}

const SponsorLink = ({ title, path }: SponsorLinkProps) => {
  return (
    <div className="mt-1 mb-3 capitalize text-sm sm:text-base md:text-lg">
      <Link href={path} target="_blank" className="hover:text-white">
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
    {
      title: `LISAWEB`,
      path: `https://www.lisaweb.fr`,
    },
  ];
  return (
    <div className="md:col-span-2 text-white/90 text-sm sm:text-base md:text-lg">
      <h3 className="uppercase text-xl sm:text-2xl font-semibold tracking-wide mb-3">
        Nos partenaires
      </h3>
      <div className="space-y-2">
        {sponsors.map((sponsor) => (
          <SponsorLink key={sponsor.path} {...sponsor} />
        ))}
      </div>
    </div>
  );
};
