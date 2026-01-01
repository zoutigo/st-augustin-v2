import { FooterContactcard } from "./footer-contact-card";
import { FooterCopyrigths } from "./footer-copyrigths";
import { FooterLogo } from "./footer-logo";
import { FooterSponsorCard } from "./footer-sponsors-card";
import { FooterSitemap } from "./footer-sitemap";

export const Footer = () => {
  return (
    <footer className="w-full overflow-hidden bg-gradient-to-br from-secondary via-secondary/90 to-secondary-dark text-white">
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
        <div className="grid gap-8 md:grid-cols-6 items-start">
          <div className="md:col-span-2 flex flex-col gap-4">
            <FooterLogo />
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              Une école au cœur de Crémieu, engagée pour la réussite et
              l’épanouissement des enfants.
            </p>
          </div>
          <FooterContactcard />
          <FooterSponsorCard />
        </div>

        <FooterSitemap />
      </div>
      <FooterCopyrigths />
    </footer>
  );
};
