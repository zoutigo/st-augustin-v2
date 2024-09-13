import React from 'react';

interface H3Props {
  children: React.ReactNode;
  className?: string;
}

const H3: React.FC<H3Props> = ({ children, className = '' }) => {
  return (
    <h3
      className={`font-cursive text-h3 tracking-extra-wide leading-relaxed uppercase ${className}`}
    >
      {children}
    </h3>
  );
};

export default H3;
