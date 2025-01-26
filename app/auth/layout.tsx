import React from 'react';

type Props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="h-[40%] flex items-center justify-center bg-secondary sm:bg-transparent px-4">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl flex flex-col justify-center items-center h-[70vh]">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
