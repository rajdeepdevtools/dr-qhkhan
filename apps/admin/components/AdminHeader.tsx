'use client';

import React, { useState } from 'react';
import { Search, ShieldAlert, User } from 'lucide-react';
import { useAdminAuth } from '../lib/admin-auth';

export const AdminHeader: React.FC = () => {
  const { adminUser } = useAdminAuth();
  const [search, setSearch] = useState('');

  return (
    <header className="bg-white border-b border-[#D9D9D9] px-6 py-3.5 flex items-center justify-between">
      {/* Quick Search */}
      <div className="relative w-80">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by Patient ID, Name, or Phone..."
          className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-[#D9D9D9] rounded-lg text-xs text-slate-850 placeholder-slate-400 focus:outline-none focus:border-[#DD0200] focus:ring-1 focus:ring-[#DD0200]/25"
        />
      </div>

      {/* Admin User Badge */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center gap-2 bg-[#55100D]/5 border border-[#55100D]/10 px-3 py-1.5 rounded-lg text-xs">
          <User className="w-4 h-4 text-[#DD0200]" />
          <span className="font-extrabold text-[#1A0706]">{adminUser?.email || 'admin@drqhkhanclinic.com'}</span>
          <span className="bg-[#DD0200]/10 text-[#DD0200] font-black text-[10px] px-2 py-0.5 rounded uppercase">
            {adminUser?.role || 'SUPER_ADMIN'}
          </span>
        </div>
      </div>
    </header>
  );
};
