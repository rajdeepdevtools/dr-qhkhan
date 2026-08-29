'use client';

import React, { useState } from 'react';
import { Search, ShieldAlert, User } from 'lucide-react';
import { useAdminAuth } from '../lib/admin-auth';

export const AdminHeader: React.FC = () => {
  const { adminUser } = useAdminAuth();
  const [search, setSearch] = useState('');

  return (
    <header className="bg-slate-900 border-b border-slate-800 px-6 py-3.5 flex items-center justify-between">
      {/* Quick Search */}
      <div className="relative w-80">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by Patient ID, Name, or Phone..."
          className="w-full pl-9 pr-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* Admin User Badge */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-lg text-xs">
          <User className="w-4 h-4 text-amber-400" />
          <span className="font-semibold text-slate-200">{adminUser?.email || 'admin@drqhkhanclinic.com'}</span>
          <span className="bg-amber-500/20 text-amber-300 font-bold text-[10px] px-2 py-0.5 rounded uppercase">
            {adminUser?.role || 'SUPER_ADMIN'}
          </span>
        </div>
      </div>
    </header>
  );
};
