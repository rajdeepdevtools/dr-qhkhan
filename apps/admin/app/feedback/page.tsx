'use client';

import React, { useEffect, useState } from 'react';
import { adminApiClient } from '../../lib/api-client';
import { AdminSidebar } from '../../components/AdminSidebar';
import { AdminHeader } from '../../components/AdminHeader';

export default function AdminFeedbackPage() {
  const [feedbackList, setFeedbackList] = useState<any[]>([]);

  const fetchFeedback = async () => {
    const res = await adminApiClient('/feedback/admin');
    if (res.success && res.data) setFeedbackList(res.data);
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    const res = await adminApiClient(`/feedback/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
    if (res.success) fetchFeedback();
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader />
        <main className="p-6 space-y-6 flex-1 overflow-y-auto">
          <div>
            <h1 className="text-2xl font-bold text-white">Patient Feedback Moderation</h1>
            <p className="text-xs text-slate-400">Review and moderate patient reviews before public display</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800/60 text-slate-400 border-b border-slate-800 uppercase font-semibold">
                  <th className="p-3">Patient Name</th>
                  <th className="p-3">Rating</th>
                  <th className="p-3">Feedback Message</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Moderation Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {feedbackList.map((f) => (
                  <tr key={f._id} className="hover:bg-slate-800/40">
                    <td className="p-3 font-bold text-white">{f.patientName}</td>
                    <td className="p-3 font-bold text-amber-400">★ {f.rating}/5</td>
                    <td className="p-3 max-w-md">{f.message}</td>
                    <td className="p-3 uppercase font-bold text-slate-400">{f.status}</td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => updateStatus(f._id, 'approved')}
                        className="px-2.5 py-1 bg-emerald-700 text-white rounded font-bold hover:bg-emerald-600"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(f._id, 'rejected')}
                        className="px-2.5 py-1 bg-rose-700 text-white rounded font-bold hover:bg-rose-600"
                      >
                        Reject
                      </button>
                    </td>
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
