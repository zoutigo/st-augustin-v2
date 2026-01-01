import { FooterContactcard } from "./footer-contact-card";
import { FooterCopyrigths } from "./footer-copyrigths";
import { FooterLogo } from "./footer-logo";
import { FooterSponsorCard } from "./footer-sponsors-card";
import { FooterSitemap } from "./footer-sitemap";

export const Footer = () => {
  return (
    <div className="w-full overflow-hidden">
      <div className="bg-secondary grid grid-cols-1 gap-4 md:grid-cols-5">
        <FooterContactcard />
        <FooterSponsorCard />
        <FooterLogo />
      </div>
      <FooterSitemap />
      <FooterCopyrigths />
    </div>
  );
};
