'use client';

import React, { useEffect, useState } from 'react';
import { adminApiClient } from '../../lib/api-client';
import { AdminSidebar } from '../../components/AdminSidebar';
import { AdminHeader } from '../../components/AdminHeader';

export default function AdminReportsPage() {
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    adminApiClient('/reports/my').then((res) => {
      if (res.success && res.data) setReports(res.data);
    });
  }, []);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader />
        <main className="p-6 space-y-6 flex-1 overflow-y-auto">
          <div>
            <h1 className="text-2xl font-bold text-white">Clinical Medical Reports Audit</h1>
            <p className="text-xs text-slate-400">View and audit medical reports across all doctors</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800/60 text-slate-400 border-b border-slate-800 uppercase font-semibold">
                  <th className="p-3">Report ID</th>
                  <th className="p-3">Patient Name</th>
                  <th className="p-3">Consulting Doctor</th>
                  <th className="p-3">Diagnosis</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {reports.map((r) => (
                  <tr key={r._id} className="hover:bg-slate-800/40">
                    <td className="p-3 font-mono font-bold text-amber-400">{r.reportId}</td>
                    <td className="p-3 font-bold text-white">{r.patientName}</td>
                    <td className="p-3">{r.doctorName}</td>
                    <td className="p-3">{r.diagnosis}</td>
                    <td className="p-3 uppercase font-bold text-emerald-400">{r.status}</td>
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
