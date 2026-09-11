'use client';

import React, { useState } from 'react';
import { HiMagnifyingGlass, HiUser, HiBars3, HiBellAlert } from 'react-icons/hi2';
import { useAdminAuth } from '../lib/admin-auth';

interface AdminHeaderProps {
  onToggleSidebar?: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ onToggleSidebar }) => {
  const { adminUser } = useAdminAuth();
  const [search, setSearch] = useState('');

  return (
    <header className="glass-card px-4 sm:px-6 py-3 flex items-center justify-between gap-3 sticky top-0 z-30 mb-4 sm:rounded-b-2xl sm:mx-6 shadow-sm border-t-0 border-x-0 sm:border-x sm:border-t-0 border-b border-slate-200/50">
      {/* Mobile Menu Hamburger Button */}
      <div className="flex items-center gap-2">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="md:hidden p-2 text-slate-700 hover:text-black hover:bg-slate-100 rounded-xl transition-colors border border-slate-200 shadow-sm"
            title="Open Admin Navigation"
          >
            <HiBars3 className="w-5 h-5" />
          </button>
        )}

        {/* Quick Search */}
        <div className="relative w-48 sm:w-64 md:w-80 group">
          <HiMagnifyingGlass className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 group-focus-within:text-orange-500 transition-colors" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Patient ID, Name..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-100/50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 font-medium transition-all shadow-inner"
          />
        </div>
      </div>

      {/* Admin Actions & Badge */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        
        {/* Notifications (Mock) */}
        <button className="relative p-1.5 text-slate-500 hover:text-orange-600 transition-colors">
          <HiBellAlert className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full animate-ping"></span>
          <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full"></span>
        </button>

        <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>

        <div className="flex items-center gap-2 sm:gap-3 bg-white border border-slate-200/60 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs shadow-sm hover:shadow-md transition-shadow cursor-default">
          <div className="p-1.5 bg-orange-100 text-orange-600 rounded-lg">
            <HiUser className="w-3.5 h-3.5 shrink-0" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-800 truncate max-w-[120px] sm:max-w-none text-[11px] leading-tight">
              {adminUser?.email || 'admin@drqhkhanclinic.com'}
            </span>
            <span className="text-orange-600 font-black text-[9px] uppercase tracking-wider leading-tight">
              {adminUser?.role || 'SUPER_ADMIN'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
