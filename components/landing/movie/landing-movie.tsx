import { LandMovieTextItem } from './land-movie-text-item';

export const LandingMovie = () => {
  return (
    <div className="relative overflow-hidden bg-green-700 min-h-[40vh] xs:min-h-[40vh] sm:min-h-[50vh] md:min-h-[65vh] lg:min-h-[83vh]">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
      >
        <source src="/videos/landing.mp4" type="video/mp4" />
        Votre navigateur ne supporte pas la vidéo.
      </video>
      <div className="absolute inset-0 flex items-center xs:hidden">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-8">
          <LandMovieTextItem text="ecole" />
          <LandMovieTextItem text="saint augustin" />
          <LandMovieTextItem text="cremieu" />
        </div>
      </div>
    </div>
  );
};

{
  /* <span className="text-[12rem] font-black uppercase leading-none text-transparent bg-clip-text bg-gradient-to-b from-transparent to-secondary-main opacity-70 ml-[2rem] hover:bg-position-0%-100% transition-all">
          ECOLE
        </span>
        <span className="text-[12rem] font-black uppercase leading-none text-transparent bg-clip-text bg-gradient-to-b from-transparent to-secondary-main opacity-70 ml-[100px] hover:bg-position-0%-100% transition-all">
          SAINT AUGUSTIN
        </span>
        <span className="text-[12rem] font-black uppercase leading-none text-transparent bg-clip-text bg-gradient-to-b from-transparent to-secondary-main opacity-70 ml-[100px] hover:bg-position-0%-100% transition-all">
          Crémieu
        </span> */
}

// const StyledLandingContainer = styled(Grid)(({ theme }) => ({
//     minHeight: '40vh',
//     position: 'relative',
//     background: 'green',

//     [theme.breakpoints.up('lg')]: {
//       minHeight: '98vh',
//     },

//     [theme.breakpoints.between('md', 'lg')]: {
//       minHeight: '93vh',
//     },
//     [theme.breakpoints.between('sm', 'md')]: {
//       minHeight: '65vh',
//     },
//     [theme.breakpoints.between('xs', 'sm')]: {
//       minHeight: '50vh',
//     },
//     [theme.breakpoints.down('xs')]: {
//       minHeight: '40vh',
//     },
//   }))
