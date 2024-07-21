import React from 'react';

type Props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="h-full flex items-center justify-center bg-sky-500">
      {children}{' '}
    </div>
  );
};

export default AuthLayout;
