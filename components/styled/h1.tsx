import React from "react";

interface H1Props {
  children: React.ReactNode;
  className?: string;
}

const H1: React.FC<H1Props> = ({ children, className = "" }) => {
  return (
    <h1
      className={`font-sans text-h1 font-bold tracking-wider leading-tight ${className}`}
    >
      {children}
    </h1>
  );
};

export default H1;
