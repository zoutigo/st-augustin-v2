import React from "react";

interface H4Props {
  children: React.ReactNode;
  className?: string;
}

const H4: React.FC<H4Props> = ({ children, className = "" }) => {
  return (
    <h4
      className={`font-cursive text-h3 font-extrabold tracking-wider leading-relaxed ${className}`}
    >
      {children}
    </h4>
  );
};

export default H4;
