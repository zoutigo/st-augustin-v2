import React from 'react';
import Breadcrumb from './breadcrumb';

interface PageHolderProps {
  children: React.ReactNode;
}

export const PageHolder: React.FC<PageHolderProps> = ({ children }) => {
  return (
    <div className="mx-[12%]">
      <Breadcrumb />
      <div className="min-w-full my-[1.5%]">{children}</div>
    </div>
  );
};
