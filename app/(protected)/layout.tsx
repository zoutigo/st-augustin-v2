import React from 'react';
import { ProtectedNavbar } from './_components/navbar';

type Props = {
  children: React.ReactNode;
};

const ProtectedLayout = ({ children }: Props) => {
  return (
    <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center bg-sky-500">
      <ProtectedNavbar />
      {children}{' '}
    </div>
  );
};

export default ProtectedLayout;
