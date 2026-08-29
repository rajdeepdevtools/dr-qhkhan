'use client';

import React, { useEffect, useState } from 'react';
import { adminApiClient } from '../../lib/api-client';
import { AdminSidebar } from '../../components/AdminSidebar';
import { AdminHeader } from '../../components/AdminHeader';

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<any[]>([]);

  const fetchAppointments = async () => {
    const res = await adminApiClient('/admin/appointments');
    if (res.success && res.data) setAppointments(res.data);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    const res = await adminApiClient(`/appointments/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });

    if (res.success) {
      fetchAppointments();
    }
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader />
        <main className="p-6 space-y-6 flex-1 overflow-y-auto">
          <div>
            <h1 className="text-2xl font-bold text-white">All Clinic Appointments</h1>
            <p className="text-xs text-slate-400">Review patient bookings, assign doctors, and update statuses</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800/60 text-slate-400 border-b border-slate-800 uppercase font-semibold">
                  <th className="p-3">Appointment ID</th>
                  <th className="p-3">Patient Name</th>
                  <th className="p-3">Department</th>
                  <th className="p-3">Preferred Date / Time</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {appointments.map((apt) => (
                  <tr key={apt._id} className="hover:bg-slate-800/40">
                    <td className="p-3 font-mono font-bold text-amber-400">{apt.appointmentId}</td>
                    <td className="p-3 font-bold text-white">{apt.name} <span className="text-slate-500 block">{apt.phone}</span></td>
                    <td className="p-3">{apt.department}</td>
                    <td className="p-3">{apt.preferredDate} ({apt.preferredTime})</td>
                    <td className="p-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        apt.status === 'confirmed' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-amber-950 text-amber-300 border border-amber-800'
                      }`}>
                        {apt.status}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => updateStatus(apt._id, 'confirmed')}
                        className="px-2.5 py-1 bg-emerald-700 text-white rounded font-bold hover:bg-emerald-600"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => updateStatus(apt._id, 'completed')}
                        className="px-2.5 py-1 bg-indigo-700 text-white rounded font-bold hover:bg-indigo-600"
                      >
                        Complete
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
