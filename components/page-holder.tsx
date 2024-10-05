import React from 'react';
import Breadcrumb from './breadcrumb';
interface PageHolderProps {
  children: React.ReactNode;
}

export const PageHolder = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="mx-[12%]">
      <Breadcrumb />
      {children}
    </div>
  );
};
