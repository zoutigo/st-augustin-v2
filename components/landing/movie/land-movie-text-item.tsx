'use client';

interface LandMovieTextItemProps {
  text: string;
}

export const LandMovieTextItem = ({ text }: LandMovieTextItemProps) => {
  return (
    <div className="md:my-10 lg:my-14 xl:my-16">
      <span
        className="text-[3rem] sm:text-[3rem] md:text-[5rem] lg:text-[10rem] font-black uppercase leading-none text-transparent ml-[100px] bg-clip-text transition-all duration-500 ease-out"
        style={{
          WebkitTextStroke: '2px hsl(var(--secondary))', // Contours du texte visibles
          WebkitBackgroundClip: 'text',
          backgroundImage:
            'linear-gradient(to bottom, hsl(var(--secondary)), hsl(var(--secondary)) 50%, transparent 50%)', // Dégradé pour le remplissage
          backgroundSize: '100% 200%', // Pour l'effet de transition
          backgroundPosition: '0% 100%', // Position initiale
          transition:
            'background-position 0.5s ease-out, WebkitTextFillColor 0.5s ease-out', // Transition de la position de fond
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundPosition = '0% 0%'; // Remplissage au survol
          e.currentTarget.style.webkitTextFillColor = 'hsl(var(--secondary))'; // Remplit le texte au survol
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundPosition = '0% 100%'; // Rétablit la position après survol
          e.currentTarget.style.webkitTextFillColor = 'transparent'; // Rétablit l'intérieur transparent
        }}
      >
        {text}
      </span>
    </div>
  );
};
