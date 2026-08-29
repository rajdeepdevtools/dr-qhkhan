'use client';

import React, { useEffect, useState } from 'react';
import { apiClient } from '../../../lib/api-client';

export default function PatientAppointmentsPage() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient('/patients/appointments').then((res) => {
      if (res.success && res.data) setAppointments(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
      <div className="border-b border-slate-100 pb-3">
        <h2 className="text-lg font-bold text-slate-900">My Consultation Appointments</h2>
        <p className="text-xs text-slate-500">Track appointment statuses and scheduled dates</p>
      </div>

      {loading ? (
        <p className="text-xs text-slate-500 py-6 text-center">Loading appointments...</p>
      ) : appointments.length === 0 ? (
        <p className="text-xs text-slate-500 py-6 text-center">No appointments found.</p>
      ) : (
        <div className="space-y-3">
          {appointments.map((apt) => (
            <div key={apt._id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-mono text-clinic-indigo font-bold">{apt.appointmentId}</span>
                  <h3 className="font-bold text-slate-900 text-sm mt-0.5">{apt.department}</h3>
                  <p className="text-slate-600">Doctor: {apt.doctorName || 'Assigned Doctor'}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                  apt.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {apt.status}
                </span>
              </div>
              <div className="text-slate-500 border-t border-slate-200/60 pt-2 flex justify-between">
                <span>Date: {apt.preferredDate} ({apt.preferredTime})</span>
                <span>Submitted: {new Date(apt.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
