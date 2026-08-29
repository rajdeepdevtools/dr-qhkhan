'use client';

import React from 'react';
import { Printer, ShieldCheck } from 'lucide-react';
import { IReport } from '@hospital/shared-types';
import { clinicConfig } from '../lib/clinicConfig';

export const PrintableReport: React.FC<{ report: Partial<IReport> }> = ({ report }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4">
      {/* Top Action Bar (Hidden in print) */}
      <div className="no-print flex items-center justify-between bg-slate-900 text-white p-4 rounded-xl shadow">
        <div>
          <h3 className="font-bold text-sm">Official Medical Report View</h3>
          <p className="text-xs text-slate-400">Report ID: {report.reportId}</p>
        </div>
        <button
          onClick={handlePrint}
          className="flex items-center gap-1.5 px-4 py-2 bg-clinic-crimson hover:bg-amber-700 text-white text-xs font-bold rounded-lg transition-colors shadow"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save as PDF</span>
        </button>
      </div>

      {/* Printable Paper Document */}
      <div className="bg-white p-8 sm:p-12 rounded-xl border border-slate-300 shadow-lg text-slate-900 print:shadow-none print:border-none print:p-0">
        {/* Letterhead Header */}
        <div className="border-b-2 border-clinic-indigo pb-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-extrabold text-clinic-indigo leading-tight">
                {clinicConfig.name}
              </h1>
              <p className="text-xs font-bold text-clinic-crimson tracking-wider mt-0.5">
                ESTABLISHED 1958 • CLASSICAL HOMOEOPATHY
              </p>
              <p className="text-xs text-slate-600 mt-1">{clinicConfig.address}</p>
              <p className="text-xs text-slate-600">
                Helplines: {clinicConfig.helplines.map((h) => h.number).join(' | ')}
              </p>
            </div>
            <div className="text-right">
              <div className="inline-block border border-slate-300 bg-slate-50 px-3 py-1.5 rounded text-xs">
                <p className="font-bold text-slate-800">REPORT ID</p>
                <p className="font-mono text-clinic-indigo font-extrabold text-sm">{report.reportId}</p>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Date: {report.dateOfVisit || new Date().toISOString().slice(0, 10)}
              </p>
            </div>
          </div>
        </div>

        {/* Doctor & Patient Info Block */}
        <div className="grid grid-cols-2 gap-6 bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6 text-xs">
          <div>
            <p className="text-slate-500 font-semibold uppercase">Consulting Doctor</p>
            <p className="text-sm font-bold text-slate-900 mt-0.5">{report.doctorName}</p>
            <p className="text-slate-600 font-medium">Classical Homoeopathic Specialist</p>
          </div>
          <div>
            <p className="text-slate-500 font-semibold uppercase">Patient Information</p>
            <p className="text-sm font-bold text-slate-900 mt-0.5">{report.patientName}</p>
          </div>
        </div>

        {/* Vitals Summary */}
        {report.vitals && (
          <div className="mb-6">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Patient Vitals</h4>
            <div className="grid grid-cols-4 gap-3 bg-slate-100/70 p-3 rounded-lg text-xs">
              <div>
                <span className="text-slate-500 block text-[10px]">Blood Pressure</span>
                <strong className="text-slate-800">{report.vitals.bloodPressure || 'N/A'}</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Pulse Rate</span>
                <strong className="text-slate-800">{report.vitals.pulseRate ? `${report.vitals.pulseRate} bpm` : 'N/A'}</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Weight</span>
                <strong className="text-slate-800">{report.vitals.weightKg ? `${report.vitals.weightKg} kg` : 'N/A'}</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Temperature</span>
                <strong className="text-slate-800">{report.vitals.temperatureF ? `${report.vitals.temperatureF} °F` : 'N/A'}</strong>
              </div>
            </div>
          </div>
        )}

        {/* Clinical Presentation & Diagnosis */}
        <div className="grid grid-cols-2 gap-6 mb-6 text-xs">
          <div className="border p-3 rounded-lg border-slate-200">
            <h4 className="font-bold text-slate-800 uppercase mb-1">Chief Symptoms</h4>
            <ul className="list-disc list-inside text-slate-700 space-y-0.5">
              {report.symptoms?.map((s, idx) => (
                <li key={idx}>{s}</li>
              ))}
            </ul>
          </div>
          <div className="border p-3 rounded-lg border-slate-200 bg-amber-50/50">
            <h4 className="font-bold text-slate-800 uppercase mb-1">Clinical Diagnosis</h4>
            <p className="text-clinic-indigo font-bold text-sm">{report.diagnosis}</p>
          </div>
        </div>

        {/* Prescription Table */}
        <div className="mb-6">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Homoeopathic Prescription</h4>
          <table className="w-full text-xs text-left border-collapse border border-slate-200">
            <thead>
              <tr className="bg-slate-100 text-slate-800">
                <th className="p-2.5 border border-slate-200 font-bold">Medicine & Potency</th>
                <th className="p-2.5 border border-slate-200 font-bold">Dosage</th>
                <th className="p-2.5 border border-slate-200 font-bold">Timing</th>
                <th className="p-2.5 border border-slate-200 font-bold">Duration</th>
              </tr>
            </thead>
            <tbody>
              {report.prescription?.map((p, idx) => (
                <tr key={idx} className="border-b border-slate-200">
                  <td className="p-2.5 border border-slate-200 font-bold text-clinic-indigo">{p.medicineName}</td>
                  <td className="p-2.5 border border-slate-200">{p.dosage}</td>
                  <td className="p-2.5 border border-slate-200">{p.timing}</td>
                  <td className="p-2.5 border border-slate-200">{p.durationDays} days</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Doctor Notes */}
        {report.doctorNotes && (
          <div className="mb-8 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs">
            <h4 className="font-bold text-slate-800 uppercase mb-1">Doctor Remarks & Dietary Advice</h4>
            <p className="text-slate-700 leading-relaxed">{report.doctorNotes}</p>
          </div>
        )}

        {/* Signature & Disclaimer Footer */}
        <div className="pt-12 mt-12 border-t border-slate-200 flex justify-between items-end text-xs">
          <div className="max-w-xs text-slate-500 text-[10px]">
            <span className="flex items-center gap-1 font-bold text-emerald-700 mb-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Official Clinic Report
            </span>
            <p>{clinicConfig.medicalDisclaimer}</p>
          </div>

          <div className="text-center w-48">
            <div className="h-10 border-b border-slate-400 mb-2"></div>
            <p className="font-bold text-slate-900">{report.doctorName}</p>
            <p className="text-[10px] text-slate-500">Authorized Medical Signature</p>
          </div>
        </div>
      </div>
    </div>
  );
};
