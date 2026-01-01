import React from "react";

interface SubtitleProps {
  children: React.ReactNode;
  className?: string;
}

const Subtitle: React.FC<SubtitleProps> = ({ children, className = "" }) => {
  return (
    <h5
      className={`font-cursive text-subtitle tracking-wider capitalize ${className}`}
    >
      {children}
    </h5>
  );
};

export default Subtitle;
