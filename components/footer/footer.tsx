import { FooterContactcard } from './footer-contact-card';
import { FooterCopyrigths } from './footer-copyrigths';
import { FooterLogo } from './footer-logo';
import { FooterSponsorCard } from './footer-sponsors-card';

export const Footer = () => {
  return (
    <div className="w-full py-[1rem] overflow-hidden">
      <div className="bg-secondary grid grid-cols-1 gap-4 md:grid-cols-5">
        <FooterContactcard />
        <FooterSponsorCard />
        <FooterLogo />
      </div>
      <div className="bg-secondary"> Site map</div>
      <FooterCopyrigths />
    </div>
  );
};
