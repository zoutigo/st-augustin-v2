'use client';

import React from 'react';
import { Menu as MenuIcon } from 'lucide-react';
import Sidebar from '@/components/dashboard/sidebar';

export const DashboardShell: React.FC<{ title?: string; children: React.ReactNode }> = ({
  title = 'Tableau de bord',
  children,
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="px-3 sm:px-6">
      {/* Top bar for small screens */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b sm:hidden">
        <div className="flex items-center justify-between h-12">
          <button
            className="px-3 py-2 text-sm border rounded flex items-center gap-2"
            onClick={() => setOpen((v) => !v)}
            aria-label="Ouvrir le menu"
          >
            <MenuIcon className="h-4 w-4 text-primary" />
            <span className="text-primary">Menu</span>
          </button>
          <h1 className="text-base font-semibold">{title}</h1>
          <div className="w-[60px]" />
        </div>
      </div>

      <div className="flex gap-4">
        {/* Sidebar */}
        <div className={`sm:static ${open ? 'block' : 'hidden'} sm:block sm:w-64 shrink-0`}>
          <Sidebar onNavigate={() => setOpen(false)} />
        </div>
        {/* Content */}
        <div className="flex-1 py-4">{children}</div>
      </div>
    </div>
  );
};
