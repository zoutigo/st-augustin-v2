import React from 'react';

interface LandingStatsCardProps {
  name: string;
  color: string;
  positions: string[];
  count: number;
}

export const LandingStatsCard: React.FC<LandingStatsCardProps> = ({
  name,
  color,
  positions,
  count,
}) => {
  return (
    <div
      className="absolute"
      style={{
        top: positions[0],
        left: positions[1],
      }}
    >
      <div
        className="relative w-[170px] h-[170px] rounded-full flex items-center justify-center"
        style={{ backgroundColor: color }}
      >
        <div className="absolute top-0 text-6xl text-secondary font-semibold font-serif mt-7">
          {count}
        </div>
        <div className="absolute top-[90px] capitalize text-xl mt-3">
          {name}
        </div>
      </div>
    </div>
  );
};
