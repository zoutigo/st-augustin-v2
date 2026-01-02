"use client";

import React from "react";

export const DashboardShell: React.FC<{
  title?: string;
  children: React.ReactNode;
}> = ({ title = "Tableau de bord", children }) => {
  return (
    <div className="w-full px-[6%] md:px-[10%] lg:px-[12%] py-4">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-lg font-semibold text-secondary">{title}</h1>
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
};
