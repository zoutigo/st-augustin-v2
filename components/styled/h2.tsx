import React from 'react';

interface H2Props {
  children: React.ReactNode;
  className?: string;
}

const H2: React.FC<H2Props> = ({ children, className = '' }) => {
  return (
    <h2
      className={`font-cursive text-h2 font-extrabold tracking-widest leading-relaxed uppercase ml-2 mr-2 ${className}`}
    >
      {children}
    </h2>
  );
};

export default H2;
