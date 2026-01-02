"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { TiThMenu } from "react-icons/ti";

import { FaWindowClose } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { NavRoutes } from "@/routes";
import { Logo } from "./logo";
import { Button } from "../ui/button";
import { useAppStore } from "@/lib/store";
import { DynamicNavButton } from "./dynamic-nav-button";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export const Navbar = () => {
  const pathname = usePathname();
  const { isMenuOpen, toggleMenu } = useAppStore(); // Utilisez Zustand
  const [isHidden, setIsHidden] = useState(false);
  const lastScroll = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      const prev = lastScroll.current;
      if (current <= 0) {
        setIsHidden(false);
      } else if (current < prev) {
        setIsHidden(false); // dès qu'on remonte, on affiche immédiatement
      } else if (current > prev) {
        setIsHidden(true); // en descente, on masque
      }
      lastScroll.current = current;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex flex-row justify-between items-center h-[14vh] w-full px-[12%] shadow-sm bg-white/95 backdrop-blur transition-transform duration-300",
        isHidden ? "-translate-y-full" : "translate-y-0",
      )}
    >
      <div className="mt-12">
        <Logo />
      </div>
      {/* <nav className="hidden lg:flex bg-white w-[80%] flex-row justify-between items-center mx-2 gap-1"> */}
      <nav className="hidden lg:grid grid-cols-5 bg-slate-50 flex-1 ml-6">
        {NavRoutes.map((route) => {
          return (
            <DynamicNavButton
              {...route}
              key={route.slug}
              isActive={route.path.includes(pathname) && pathname !== "/"}
            />
          );
        })}
      </nav>
      <div className="lg:hidden">
        {!isMenuOpen && (
          <Button
            size={"lg"}
            variant={"outline"}
            className="border-none p-1"
            onClick={toggleMenu}
          >
            <TiThMenu
              className="h-20 w-20 text-primary"
              style={{ strokeWidth: 1, width: 50, height: 50 }}
            />
          </Button>
        )}
        {isMenuOpen && (
          <Button
            size={"lg"}
            variant={"outline"}
            className="border-none p-1"
            onClick={toggleMenu}
          >
            <FaWindowClose
              className="h-14 w-14 text-primary"
              // style={{ strokeWidth: 2 }}
            />
          </Button>
        )}
      </div>
    </header>
  );
};

// className={cn(
//     'text-6xl font-semibold text-white drop-shadow-md',
//     font.className
//   )}
