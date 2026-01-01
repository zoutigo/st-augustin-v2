import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import Link from "next/link";

export const FooterContactcard = () => {
  const phone = `0474907880`;
  const email = `ogec.cremieu@wanadoo.fr`;
  const phoneString = `tel:${phone}`;
  const emailString = `mailto:${email}`;

  return (
    <div className="md:col-span-2 text-white/90 text-sm sm:text-base md:text-lg space-y-4">
      <h3 className="uppercase text-xl sm:text-2xl font-semibold tracking-wide">
        Nous contacter
      </h3>
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <span className="mt-1 text-white/80">
            <FaLocationDot className="w-6 h-6" />
          </span>
          <div>
            <p className="text-justify">Place du 8 Mai 1945</p>
            <p>38460 Crémieu</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <FaPhoneAlt className="w-5 h-5" />
          <Link href={phoneString} className="hover:text-white">
            {phone}
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <IoMail className="w-5 h-5" />
          <Link href={emailString} className="hover:text-white">
            {email}
          </Link>
        </div>
      </div>
      <div className="text-white/70 text-sm sm:text-base">
        Horaires : 07h45 - 18:00
      </div>
    </div>
  );
};
