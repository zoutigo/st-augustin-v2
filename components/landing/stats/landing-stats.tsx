import Image from 'next/image';
import { LandingStatsCard } from './landing-stats-card';

export const LandingStats = () => {
  const matrix = [
    ['-30vh', '8vw'],
    ['15vh', '35vw'],
    ['-10vh', '55vw'],
    ['5vh', '70vw'],
  ];

  const statitems = [
    {
      name: 'élèves',
      count: 220,
      color: '#85C48E',
      positions: matrix[0],
    },
    {
      name: 'familles',
      count: 100,
      color: '#C389BC',
      positions: matrix[1],
    },
    {
      name: 'enseignants',
      count: 10,
      color: '#EE701D',
      positions: matrix[2],
    },
    {
      name: 'jeux',
      count: 74,
      color: '#F9CE46',
      positions: matrix[3],
    },
  ];

  return (
    <div className="min-h-[70vh] bg-no-repeat flex items-center relative">
      {/* Image d'arrière-plan */}
      <div className="absolute inset-0">
        <Image
          src="/images/home-figures.JPG" // Chemin de l'image depuis le dossier 'public'
          alt="Home Figures"
          layout="fill" // Remplit entièrement l'élément parent
          objectFit="cover" // S'adapte bien à l'élément parent sans déformation
          objectPosition="top right" // Positionne l'image en haut à droite
          quality={100} // Optionnel : pour ajuster la qualité de l'image
        />
      </div>

      {/* Cartes statistiques */}
      <div className="relative z-10 flex flex-col">
        {statitems.map((statitem) => (
          <LandingStatsCard key={statitem.name} {...statitem} />
        ))}
      </div>
    </div>
  );
};
