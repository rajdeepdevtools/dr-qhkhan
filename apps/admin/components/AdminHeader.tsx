'use client';

import React, { useState } from 'react';
import { Search, User, Menu } from 'lucide-react';
import { useAdminAuth } from '../lib/admin-auth';

interface AdminHeaderProps {
  onToggleSidebar?: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ onToggleSidebar }) => {
  const { adminUser } = useAdminAuth();
  const [search, setSearch] = useState('');

  return (
    <header className="bg-white border-b border-[#D9D9D9] px-4 sm:px-6 py-3 flex items-center justify-between gap-3 sticky top-0 z-30">
      {/* Mobile Menu Hamburger Button */}
      <div className="flex items-center gap-2">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="md:hidden p-2 text-slate-700 hover:text-black hover:bg-slate-100 rounded-xl transition-colors border border-slate-200"
            title="Open Admin Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        {/* Quick Search */}
        <div className="relative w-48 sm:w-64 md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Patient ID, Name..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-[#D9D9D9] rounded-xl text-xs text-slate-850 placeholder-slate-400 focus:outline-none focus:border-[#DD0200] focus:ring-1 focus:ring-[#DD0200]/25 font-medium"
          />
        </div>
      </div>

      {/* Admin User Badge */}
      <div className="flex items-center space-x-2">
        <div className="flex items-center gap-1.5 sm:gap-2 bg-[#55100D]/5 border border-[#55100D]/10 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs">
          <User className="w-4 h-4 text-[#DD0200] shrink-0" />
          <span className="font-extrabold text-[#1A0706] truncate max-w-[120px] sm:max-w-none text-[11px] sm:text-xs">
            {adminUser?.email || 'admin@drqhkhanclinic.com'}
          </span>
          <span className="hidden sm:inline bg-[#DD0200]/10 text-[#DD0200] font-black text-[9px] px-2 py-0.5 rounded uppercase">
            {adminUser?.role || 'SUPER_ADMIN'}
          </span>
        </div>
      </div>
    </header>
  );
};
