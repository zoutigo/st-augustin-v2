// dashboard/layout.tsx
import Sidebar from '@/components/dashboard/sidebar';
import { PageHolder } from '@/components/page-holder';
import React from 'react';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <PageHolder>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-4">{children}</div>
      </div>
    </PageHolder>
  );
};

export default DashboardLayout;
