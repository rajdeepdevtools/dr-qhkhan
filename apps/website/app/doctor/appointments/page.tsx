'use client';

import React, { useEffect, useState } from 'react';
import { apiClient } from '../../../lib/api-client';
import { Eye, X, FileText } from 'lucide-react';

export default function DoctorAppointmentsPage() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [selectedApt, setSelectedApt] = useState<any>(null);

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
                  <button 
                    onClick={() => setSelectedApt(apt)}
                    className="p-1.5 bg-white border border-slate-200 text-slate-600 hover:text-clinic-indigo hover:border-clinic-indigo rounded-lg transition-colors shadow-sm"
                    title="View Patient Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
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
                  <p className="text-slate-500 font-semibold mb-0.5">Blood Group</p>
                  <p className="font-bold text-slate-900">{selectedApt.bloodGroup || (selectedApt.patient?.bloodGroup) || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-slate-500 font-semibold mb-0.5">Address</p>
                  <p className="font-bold text-slate-900">{selectedApt.address || (selectedApt.patient?.address) || 'Not Provided'}</p>
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
