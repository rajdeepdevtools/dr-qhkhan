'use client';

import React, { useEffect, useState } from 'react';
import { adminApiClient } from '../../lib/api-client';
import { AdminSidebar } from '../../components/AdminSidebar';
import { AdminHeader } from '../../components/AdminHeader';

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    adminApiClient('/admin/audit-logs').then((res) => {
      if (res.success && res.data) setLogs(res.data);
    });
  }, []);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader />
        <main className="p-6 space-y-6 flex-1 overflow-y-auto">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Security & Audit Logs</h1>
            <p className="text-xs text-slate-500">Complete immutable audit trail of clinical logins, report finalizations, and role activities</p>
          </div>

          <div className="bg-white shadow-sm border border-slate-200 rounded-2xl overflow-hidden text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-400 border-b border-slate-200 uppercase font-semibold">
                  <th className="p-3">Timestamp</th>
                  <th className="p-3">Action</th>
                  <th className="p-3">Actor (Role)</th>
                  <th className="p-3">Resource</th>
                  <th className="p-3">Details / Resource ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                {logs.map((log) => (
                  <tr key={log._id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-mono text-slate-400">{new Date(log.timestamp).toLocaleString()}</td>
                    <td className="p-3 font-bold text-amber-400">{log.action}</td>
                    <td className="p-3">{log.actorEmail} <span className="text-[10px] text-slate-500 font-bold uppercase">({log.actorRole})</span></td>
                    <td className="p-3">{log.resourceType}</td>
                    <td className="p-3 font-mono text-slate-400">{log.resourceId || log.details || 'N/A'}</td>
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
