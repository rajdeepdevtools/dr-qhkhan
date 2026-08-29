'use client';

import React, { useEffect, useState } from 'react';
import { adminApiClient } from '../../lib/api-client';
import { AdminSidebar } from '../../components/AdminSidebar';
import { AdminHeader } from '../../components/AdminHeader';
import { Plus, UserCheck } from 'lucide-react';

export default function AdminDoctorsPage() {
  const [doctors, setDoctors] = useState<any[]>([]);

  useEffect(() => {
    adminApiClient('/doctors').then((res) => {
      if (res.success && res.data) setDoctors(res.data);
    });
  }, []);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader />
        <main className="p-6 space-y-6 flex-1 overflow-y-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">Clinic Doctor Directory</h1>
              <p className="text-xs text-slate-400">Manage doctor profiles, qualifications, and schedules</p>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800/60 text-slate-400 border-b border-slate-800 uppercase font-semibold">
                  <th className="p-3">Doctor Name</th>
                  <th className="p-3">Designation</th>
                  <th className="p-3">Registration Number</th>
                  <th className="p-3">Specialization</th>
                  <th className="p-3">Degrees</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {doctors.map((d) => (
                  <tr key={d._id} className="hover:bg-slate-800/40">
                    <td className="p-3 font-bold text-white">{d.name}</td>
                    <td className="p-3 font-semibold text-amber-400">{d.designation}</td>
                    <td className="p-3 font-mono">{d.registrationNumber || 'None Assigned'}</td>
                    <td className="p-3">{d.specialization}</td>
                    <td className="p-3">{d.degrees?.join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
