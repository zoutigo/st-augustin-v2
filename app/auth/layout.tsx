import React from "react";

type Props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen flex items-start justify-center bg-transparent pt-12 md:pt-16 pb-12">
      <div className="w-full">{children}</div>
    </div>
  );
};

export default AuthLayout;
