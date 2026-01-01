import Image from "next/image";
import { LandingStatsCard } from "./landing-stats-card";

export const LandingStats = () => {
  // Positions exprimées en pourcentage (centre du cercle)
  const matrix = [
    ["22%", "18%"],
    ["66%", "36%"],
    ["38%", "60%"],
    ["58%", "80%"],
  ];

  const statitems = [
    {
      name: "élèves",
      count: 220,
      color: "#85C48E",
      positions: matrix[0],
    },
    {
      name: "familles",
      count: 100,
      color: "#C389BC",
      positions: matrix[1],
    },
    {
      name: "enseignants",
      count: 10,
      color: "#EE701D",
      positions: matrix[2],
    },
    {
      name: "jeux",
      count: 74,
      color: "#F9CE46",
      positions: matrix[3],
    },
  ];

  return (
    <div className="min-h-[70vh] bg-no-repeat bg-right-top flex items-center relative overflow-hidden">
      <Image
        src="/images/home-figures.JPG"
        alt="Background Image"
        fill
        style={{
          objectFit: "cover",
          backgroundPositionY: "-8vh",
        }}
      />
      {statitems.map((statitem) => (
        <LandingStatsCard key={statitem.name} {...statitem} />
      ))}
    </div>
  );
};
