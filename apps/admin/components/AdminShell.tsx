'use client';

import React, { useState } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';

interface AdminShellProps {
  children: React.ReactNode;
}

export const AdminShell: React.FC<AdminShellProps> = ({ children }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50 text-[#1A0706] relative overflow-x-hidden">
      <AdminSidebar isOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader onToggleSidebar={() => setIsMobileOpen(!isMobileOpen)} />
        <main className="p-4 sm:p-6 space-y-6 flex-1 overflow-y-auto w-full max-w-full">
          {children}
        </main>
      </div>
    </div>
  );
};
