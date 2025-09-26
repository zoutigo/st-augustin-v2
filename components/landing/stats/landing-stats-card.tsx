'use client';
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
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div
        className="relative rounded-full flex flex-col items-center justify-center shadow-md w-[clamp(60px,16vw,140px)] h-[clamp(60px,16vw,140px)]"
        style={{ backgroundColor: color }}
      >
        <div className="text-[clamp(16px,4vw,36px)] text-secondary font-extrabold font-serif leading-none">
          {count}
        </div>
        <div className="capitalize text-[clamp(10px,2.8vw,18px)] leading-tight">
          {name}
        </div>
      </div>
    </div>
  );
};
