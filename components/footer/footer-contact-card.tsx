import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
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
    <Card className="bg-transparent border-transparent text-white md:col-span-2 text-sm sm:text-base md:text-lg">
      <CardHeader className="uppercase text-xl sm:text-2xl  font-semibold tracking-wider text-left">
        {" "}
        Nous Contacter
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-12">
          <div className="col-span-2 text-left flex items-center lg:justify-center">
            <FaLocationDot className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
          </div>
          <div className="col-span-10">
            <p className="text-justify"> Place du 8 Mai 1945</p>
            <p> 38460 Crémieu</p>
          </div>
        </div>
        <div className="my-[2rem] grid grid-cols-12">
          <div className="col-span-2 flex items-center lg:justify-center">
            <FaPhoneAlt className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
          </div>
          <div className="col-span-10">
            <Link href={phoneString}>{phone} </Link>
          </div>
        </div>
        <div className="grid grid-cols-12">
          <div className="col-span-2 flex items-center lg:justify-center">
            <IoMail className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
          </div>
          <div className="col-span-10">
            <Link href={emailString}> {email} </Link>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-start items-center text-muted">
        Horaires: 07h45 - 18:00
      </CardFooter>
    </Card>
  );
};
