import { FooterContactcard } from "./footer-contact-card";
import { FooterCopyrigths } from "./footer-copyrigths";
import { FooterLogo } from "./footer-logo";
import { FooterSponsorCard } from "./footer-sponsors-card";
import { FooterSitemap } from "./footer-sitemap";
import { InfoSiteData } from "@/data/infosite";

type Props = { info: InfoSiteData };

export const Footer = ({ info }: Props) => {
  return (
    <footer className="w-full overflow-hidden bg-gradient-to-br from-secondary via-secondary/90 to-secondary-dark text-white">
      <div className="landing-container mx-auto py-10 space-y-8">
        <div className="grid gap-8 md:grid-cols-12 items-start">
          <div className="md:col-span-4 flex flex-col gap-4">
            <FooterLogo />
          </div>
          <div className="md:col-span-4">
            <FooterContactcard info={info} />
          </div>
          <div className="md:col-span-4">
            <FooterSponsorCard />
          </div>
        </div>

        <div className="w-full">
          <p className="text-white/80 text-sm sm:text-base leading-relaxed text-center">
            Une école au cœur de Crémieu, engagée pour la réussite et
            l’épanouissement des enfants.
          </p>
        </div>

        <FooterSitemap />
      </div>
      <FooterCopyrigths />
    </footer>
  );
};
