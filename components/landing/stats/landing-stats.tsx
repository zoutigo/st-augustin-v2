"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { LandingStatsCard } from "./landing-stats-card";

export const LandingStats = () => {
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      setIsActive(true);
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsActive(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Positions exprimées en pourcentage (centre du cercle)
  const matrix = useMemo(
    () => [
      ["18%", "18%"],
      ["78%", "35%"],
      ["20%", "65%"],
      ["80%", "82%"],
    ],
    [],
  );

  const statitems = useMemo(
    () => [
      {
        name: "élèves",
        count: 220,
        color: "#85C48E",
        positions: matrix[0],
        shape: "heart" as const,
      },
      {
        name: "familles",
        count: 100,
        color: "#C389BC",
        positions: matrix[1],
        shape: "starry" as const,
      },
      {
        name: "enseignants",
        count: 10,
        color: "#EE701D",
        positions: matrix[2],
        shape: "ribbon" as const,
      },
      {
        name: "classes",
        count: 10,
        color: "#F9CE46",
        positions: matrix[3],
        shape: "cloud" as const,
      },
    ],
    [matrix],
  );

  return (
    <div
      ref={containerRef}
      className="relative min-h-[70vh] bg-no-repeat bg-right-top flex items-center overflow-hidden"
    >
      <Image
        src="/images/home-figures.JPG"
        alt="Background Image"
        fill
        style={{
          objectFit: "cover",
          backgroundPositionY: "-8vh",
        }}
        className="brightness-95"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 via-white/10 to-primary/30" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-10 flex flex-col gap-6">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-md p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-secondary/70">
              Une école qui bouge
            </p>
            <h3 className="text-2xl md:text-3xl font-bold text-secondary">
              Les chiffres de Saint Augustin
            </h3>
            <p className="text-secondary/80 mt-2 max-w-2xl">
              Les élèves, les familles, les enseignants et les classes qui font
              vivre notre école, en un clin d&apos;œil.
            </p>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 z-20 pointer-events-none">
        {statitems.map((statitem, idx) => (
          <LandingStatsCard
            key={statitem.name}
            index={idx}
            isActive={isActive}
            {...statitem}
          />
        ))}
      </div>
    </div>
  );
};
