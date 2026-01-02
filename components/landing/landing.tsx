import { ModalInfo } from "../modals/Info-modal";
import { LandingActivity } from "./activity/landing-activity";
import { LandingFavorites } from "./favorites/landing-favorites";
import { LandingMessage } from "./message/landing-message";
import { LandingMovie } from "./movie/landing-movie";
import { LandingStats } from "./stats/landing-stats";
import { LandingPrefetch } from "./landing-prefetch";
import { LandingFaq } from "./faq/landing-faq";
import { LandingDiscovery } from "./discovery/landing-discovery";

export const Landing = () => {
  return (
    <div className="flex flex-col">
      <LandingPrefetch />
      <ModalInfo />
      <LandingMovie />
      <LandingMessage />
      <LandingDiscovery />
      <LandingFavorites />
      <LandingStats />
      <LandingActivity />
      <LandingFaq />
    </div>
  );
};
