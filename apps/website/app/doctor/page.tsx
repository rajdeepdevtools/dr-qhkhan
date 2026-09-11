'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { apiClient } from '../../lib/api-client';
import { useAuth } from '../../lib/auth-context';
import { Calendar, Users, PlusCircle, CheckCircle2, Eye, X, FileText } from 'lucide-react';

export default function DoctorDashboard() {
  const { profile } = useAuth();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [selectedApt, setSelectedApt] = useState<any>(null);

  useEffect(() => {
    apiClient('/doctors/portal/appointments').then((res) => {
      if (res.success && res.data) setAppointments(res.data);
    });

    apiClient('/doctors/portal/patients').then((res) => {
      if (res.success && res.data) setPatients(res.data);
    });
  }, []);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-clinic-indigo to-slate-900 text-white rounded-2xl p-6 shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider bg-white/10 px-2.5 py-1 rounded-full">
            {profile?.registrationNumber || 'REGISTERED DOCTOR'}
          </span>
          <h1 className="text-2xl font-bold text-white mt-1">Welcome, {profile?.name || 'Doctor'}</h1>
          <p className="text-xs text-slate-200">{profile?.specialization || 'Classical Homoeopathy Specialist'}</p>
        </div>

        <Link
          href="/doctor/reports/create"
          className="px-4 py-2 bg-clinic-crimson hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center gap-1.5"
        >
          <PlusCircle className="w-4 h-4" /> Create Medical Report
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 text-clinic-indigo flex items-center justify-center font-bold">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase">Assigned Appointments</p>
            <p className="text-xl font-extrabold text-slate-900">{appointments.length}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase">Assigned Patients</p>
            <p className="text-xl font-extrabold text-slate-900">{patients.length}</p>
          </div>
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <h3 className="font-bold text-slate-900 text-sm">Assigned Consultations Schedule</h3>
          <Link href="/doctor/appointments" className="text-xs font-bold text-clinic-indigo hover:underline">
            View All
          </Link>
        </div>

        {appointments.length === 0 ? (
          <p className="text-xs text-slate-500 text-center py-6">No consultations scheduled for today.</p>
        ) : (
          <div className="space-y-3">
            {appointments.slice(0, 5).map((apt, idx) => (
              <div key={idx} className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-slate-900">{apt.name} (Age: {apt.age}, {apt.gender})</p>
                  <p className="text-slate-500">{apt.department} • {apt.preferredDate} at {apt.preferredTime}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-100 text-clinic-indigo uppercase">
                    {apt.status}
                  </span>
                  <button 
                    onClick={() => setSelectedApt(apt)}
                    className="p-1.5 bg-white border border-slate-200 text-slate-600 hover:text-clinic-indigo hover:border-clinic-indigo rounded-lg transition-colors shadow-sm"
                    title="View Patient Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Details Modal */}
      {selectedApt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-slate-50 border-b border-slate-100 px-5 py-4 flex justify-between items-center">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <FileText className="w-4 h-4 text-clinic-indigo" />
                Patient Details
              </h3>
              <button onClick={() => setSelectedApt(null)} className="text-slate-400 hover:text-rose-500">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-5 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div>
                  <p className="text-slate-500 font-semibold mb-0.5">Patient Name</p>
                  <p className="font-bold text-slate-900">{selectedApt.name}</p>
                </div>
                <div>
                  <p className="text-slate-500 font-semibold mb-0.5">Age & Gender</p>
                  <p className="font-bold text-slate-900">{selectedApt.age} yrs, {selectedApt.gender}</p>
                </div>
                <div>
                  <p className="text-slate-500 font-semibold mb-0.5">Phone Number</p>
                  <p className="font-bold text-slate-900">{selectedApt.phone || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-slate-500 font-semibold mb-0.5">Email</p>
                  <p className="font-bold text-slate-900 truncate" title={selectedApt.email}>{selectedApt.email || 'N/A'}</p>
                </div>
              </div>

              <div>
                <p className="text-slate-500 font-bold mb-1.5 uppercase tracking-wider text-[10px]">Symptoms / Disease Note</p>
                <div className="bg-amber-50 border border-amber-100 p-3.5 rounded-xl text-slate-700 leading-relaxed max-h-32 overflow-y-auto">
                  {selectedApt.message ? (
                    <p>{selectedApt.message}</p>
                  ) : (
                    <p className="italic text-slate-400">No symptoms or extra details provided by patient.</p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="bg-slate-50 border-t border-slate-100 px-5 py-3 flex justify-end">
              <button 
                onClick={() => setSelectedApt(null)}
                className="px-5 py-2 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-700 transition-colors shadow-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
