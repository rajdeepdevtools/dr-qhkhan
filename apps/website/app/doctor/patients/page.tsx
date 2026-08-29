'use client';

import React, { useEffect, useState } from 'react';
import { apiClient } from '../../../lib/api-client';

export default function DoctorPatientsPage() {
  const [patients, setPatients] = useState<any[]>([]);

  useEffect(() => {
    apiClient('/doctors/portal/patients').then((res) => {
      if (res.success && res.data) setPatients(res.data);
    });
  }, []);

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4 text-xs">
      <div className="border-b border-slate-100 pb-3">
        <h2 className="text-lg font-bold text-slate-900">Assigned Patient Records</h2>
        <p className="text-slate-500">Patients consultated under your care</p>
      </div>

      {patients.length === 0 ? (
        <p className="text-slate-500 py-6 text-center">No assigned patient records found.</p>
      ) : (
        <div className="space-y-3">
          {patients.map((p) => (
            <div key={p._id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-mono text-clinic-indigo font-bold">{p.patientId}</span>
                  <h3 className="font-bold text-slate-900 text-sm">{p.name}</h3>
                </div>
                <span className="bg-slate-200 text-slate-800 px-2 py-0.5 rounded text-[10px] font-bold">
                  {p.gender}, {p.age} Yrs
                </span>
              </div>
              <p className="text-slate-600">Phone: {p.phone} • Email: {p.email}</p>
              {p.address && <p className="text-slate-500">Address: {p.address}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
