'use client';

import React, { useEffect, useState } from 'react';
import { apiClient } from '../../../lib/api-client';

export default function DoctorAppointmentsPage() {
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    apiClient('/doctors/portal/appointments').then((res) => {
      if (res.success && res.data) setAppointments(res.data);
    });
  }, []);

  const updateStatus = async (id: string, status: string) => {
    const res = await apiClient(`/appointments/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });

    if (res.success) {
      setAppointments((prev) =>
        prev.map((apt) => (apt._id === id ? { ...apt, status } : apt))
      );
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4 text-xs">
      <div className="border-b border-slate-100 pb-3">
        <h2 className="text-lg font-bold text-slate-900">Assigned Patient Appointments</h2>
        <p className="text-slate-500">Review scheduled appointments and update consultation status</p>
      </div>

      {appointments.length === 0 ? (
        <p className="text-slate-500 py-6 text-center">No assigned appointments.</p>
      ) : (
        <div className="space-y-3">
          {appointments.map((apt) => (
            <div key={apt._id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-mono text-clinic-indigo font-bold">{apt.appointmentId}</span>
                  <h3 className="font-bold text-slate-900 text-sm">{apt.name} (Age: {apt.age})</h3>
                  <p className="text-slate-600">Phone: {apt.phone} • Email: {apt.email}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 uppercase">
                    {apt.status}
                  </span>
                </div>
              </div>

              <p className="text-slate-600 bg-white p-2 rounded border border-slate-200">
                <strong>Symptoms Note:</strong> {apt.message || 'No extra notes provided.'}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                <span className="text-slate-500">Scheduled: {apt.preferredDate} ({apt.preferredTime})</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => updateStatus(apt._id, 'completed')}
                    className="px-3 py-1 bg-emerald-600 text-white font-bold rounded hover:bg-emerald-700 transition-colors"
                  >
                    Mark Completed
                  </button>
                  <button
                    onClick={() => updateStatus(apt._id, 'cancelled')}
                    className="px-3 py-1 bg-rose-600 text-white font-bold rounded hover:bg-rose-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
