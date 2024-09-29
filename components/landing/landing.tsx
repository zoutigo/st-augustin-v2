import { LandingActivity } from './activity/landing-activity';
import { LandingFavorites } from './favorites/landing-favorites';
import { LandingMessage } from './message/landing-message';
import { LandingMovie } from './movie/landing-movie';
import { LandingStats } from './stats/landing-stats';

export const Landing = () => {
  return (
    <div className="flex flex-col">
      <LandingMovie />
      <LandingMessage />
      <LandingFavorites />
      <LandingStats />
      <LandingActivity />
    </div>
  );
};
