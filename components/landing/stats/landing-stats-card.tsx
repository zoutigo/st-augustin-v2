"use client";
import React from "react";

interface LandingStatsCardProps {
  name: string;
  color: string;
  positions: string[];
  count: number;
  shape?: "heart" | "starry" | "chalk" | "puzzle" | "ribbon" | "cloud";
  isActive?: boolean;
  index?: number;
}

export const LandingStatsCard: React.FC<LandingStatsCardProps> = ({
  name,
  color,
  positions,
  count,
  shape = "chalk",
  isActive = false,
  index = 0,
}) => {
  const wrapperStyle: React.CSSProperties = React.useMemo(() => {
    const variantStyles: Record<string, React.CSSProperties> = {
      heart: {
        clipPath:
          "polygon(50% 85%, 20% 60%, 8% 35%, 15% 18%, 30% 12%, 40% 15%, 50% 25%, 60% 15%, 70% 12%, 85% 18%, 92% 35%, 80% 60%)",
        background: `radial-gradient(circle at 30% 30%, #fff7f7 5%, ${color} 60%)`,
        boxShadow: "0 12px 24px rgba(0,0,0,0.18)",
      },
      starry: {
        clipPath: "circle(50% at 50% 50%)",
        background: `radial-gradient(circle at 30% 30%, #fff 6%, ${color} 18%, ${color} 60%), radial-gradient(circle at 70% 40%, #fff8c6 4%, transparent 20%), radial-gradient(circle at 40% 70%, #ffe0a6 3%, transparent 15%), radial-gradient(circle at 60% 20%, #fff 3%, transparent 15%)`,
        boxShadow: "0 10px 24px rgba(0,0,0,0.18)",
        position: "relative",
      },
      ribbon: {
        clipPath:
          "polygon(0 0, 100% 0, 100% 75%, 60% 75%, 50% 100%, 40% 75%, 0 75%)",
        background: `linear-gradient(135deg, ${color}, #ffb277)`,
        boxShadow: "0 10px 22px rgba(0,0,0,0.18)",
      },
      chalk: {
        borderRadius: "9999px",
        background: `radial-gradient(circle at 30% 30%, #f5f5f5 5%, ${color})`,
        boxShadow: "0 8px 18px rgba(0,0,0,0.15)",
        filter: "drop-shadow(0 0 6px rgba(0,0,0,0.08))",
      },
      puzzle: {
        clipPath:
          "polygon(0% 25%, 15% 25%, 15% 10%, 30% 10%, 30% 25%, 70% 25%, 70% 10%, 85% 10%, 85% 25%, 100% 25%, 100% 55%, 85% 55%, 85% 70%, 70% 70%, 70% 55%, 30% 55%, 30% 70%, 15% 70%, 15% 55%, 0% 55%)",
        background: `radial-gradient(circle at 20% 20%, #fff9e6 5%, ${color} 55%)`,
        boxShadow: "0 8px 18px rgba(0,0,0,0.16)",
        transform: "rotate(-1deg)",
      },
      cloud: {
        clipPath:
          "polygon(20% 40%, 30% 25%, 45% 22%, 55% 30%, 68% 25%, 80% 35%, 85% 45%, 82% 60%, 70% 68%, 60% 70%, 50% 78%, 40% 70%, 30% 68%, 20% 60%, 18% 50%)",
        background: `radial-gradient(circle at 30% 35%, #fffbe8 5%, ${color} 55%)`,
        boxShadow: "0 12px 22px rgba(0,0,0,0.18)",
      },
    };
    return variantStyles[shape] || variantStyles.chalk;
  }, [shape, color]);

  const isPuzzle = shape === "puzzle";
  const isCloud = shape === "cloud";
  const baseTransform = wrapperStyle.transform ?? "";

  return (
    <div
      className="absolute"
      style={{
        top: positions[0],
        left: positions[1],
        transform: "translate(-50%, -50%)",
      }}
    >
      <div
        className={`relative flex flex-col items-center justify-center shadow-md ${
          isPuzzle
            ? "w-[clamp(130px,26vw,220px)] h-[clamp(150px,28vw,240px)] px-4 py-4 gap-3 text-white text-center"
            : isCloud
              ? "w-[clamp(150px,28vw,240px)] h-[clamp(130px,26vw,220px)] px-4 py-4 gap-2 overflow-hidden text-center"
              : "w-[clamp(80px,18vw,160px)] h-[clamp(80px,18vw,160px)] overflow-hidden"
        }`}
        style={(() => {
          const style: React.CSSProperties & {
            [key: string]: string | number;
          } = {
            ...wrapperStyle,
            opacity: isActive ? 1 : 0,
          };
          style["--base-transform"] = baseTransform;

          const floatAnim = `stats-float 6s ease-in-out ${isActive ? 0.8 : 0}s infinite alternate`;

          if (!isActive) {
            style.transform = `${baseTransform} translateY(40px) scale(0.9)`;
            return style;
          }

          if (index === 0) {
            style.animation = `eleve-in 1.5s ease-out forwards, ${floatAnim}`;
            return style;
          }

          if (index === 1) {
            style.animation = `famille-in 1.5s ease-in-out forwards, ${floatAnim}`;
            style.animationDelay = `${index * 120}ms`;
            return style;
          }

          style.transform = `${baseTransform} translateY(0) scale(1)`;
          style.transition = "all 0.7s ease";
          style.transitionDelay = `${index * 120}ms`;
          style.animation = floatAnim;
          return style;
        })()}
      >
        <div
          className={`text-[clamp(16px,4vw,36px)] font-extrabold font-serif leading-none drop-shadow-sm ${
            isPuzzle ? "text-white" : "text-secondary"
          }`}
        >
          {count}
        </div>
        <div
          className={`capitalize leading-tight ${
            isPuzzle
              ? "text-[clamp(14px,3.4vw,22px)] drop-shadow-md text-white"
              : isCloud
                ? "text-[clamp(11px,3vw,18px)] text-secondary"
                : "text-[clamp(10px,2.8vw,18px)] text-secondary"
          }`}
        >
          {name}
        </div>
      </div>
    </div>
  );
};
