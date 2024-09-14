import React from 'react';

interface Body1Props {
  children: React.ReactNode;
  className?: string;
}

const Body1: React.FC<Body1Props> = ({ children, className = '' }) => {
  return (
    <p
      className={`font-cursive text-h3 leading-normal tracking-widest ${className}`}
    >
      {children}
    </p>
  );
};

export default Body1;
