'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { apiClient } from '../../lib/api-client';
import { useAuth } from '../../lib/auth-context';
import { Calendar, FileText, Clock, UserCheck, ShieldCheck } from 'lucide-react';

export default function PatientDashboard() {
  const { profile } = useAuth();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    apiClient('/patients/appointments').then((res) => {
      if (res.success && res.data) setAppointments(res.data);
    });

    apiClient('/patients/reports').then((res) => {
      if (res.success && res.data) setReports(res.data);
    });
  }, []);

  return (
    <div className="space-y-6">
      {/* Patient Profile Welcome Banner */}
      <div className="bg-gradient-to-r from-clinic-indigo to-clinic-violet text-white rounded-2xl p-6 shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider bg-white/10 px-2.5 py-1 rounded-full">
            PATIENT ID: {profile?.patientId || 'HOSP-2026-XXXX'}
          </span>
          <h1 className="text-2xl font-bold text-white mt-1">Welcome, {profile?.name || 'Patient'}</h1>
          <p className="text-xs text-slate-200">Manage your consultation schedule and download clinical medical reports.</p>
        </div>

        <Link
          href="/appointment"
          className="px-4 py-2 bg-clinic-crimson hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow transition-colors"
        >
          Book New Consultation
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 text-clinic-indigo flex items-center justify-center font-bold">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase">My Appointments</p>
            <p className="text-xl font-extrabold text-slate-900">{appointments.length}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase">Finalized Reports</p>
            <p className="text-xl font-extrabold text-slate-900">{reports.length}</p>
          </div>
        </div>
      </div>

      {/* Recent Appointments Preview */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <h3 className="font-bold text-slate-900 text-sm">Recent Appointments</h3>
          <Link href="/patient/appointments" className="text-xs font-bold text-clinic-indigo hover:underline">
            View All
          </Link>
        </div>

        {appointments.length === 0 ? (
          <p className="text-xs text-slate-500 text-center py-6">No appointments booked yet.</p>
        ) : (
          <div className="space-y-3">
            {appointments.slice(0, 3).map((apt, idx) => (
              <div key={idx} className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-slate-900">{apt.department} • {apt.doctorName || 'Assigned Physician'}</p>
                  <p className="text-slate-500">{apt.preferredDate} at {apt.preferredTime}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                  apt.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {apt.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
