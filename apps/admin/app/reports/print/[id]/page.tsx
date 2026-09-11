'use client';

import React, { useEffect, useState } from 'react';
import { adminApiClient } from '../../../../lib/api-client';
import { useParams } from 'next/navigation';

const PRINT_STYLES = `
  @page {
    size: A4 portrait;
    margin: 15mm;
  }
  @media print {
    html, body {
      width: 210mm;
      min-height: 297mm;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      background-color: white !important;
    }
  }
`;

export default function PrintReportPage() {
  const { id } = useParams();
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      adminApiClient(`/reports/${id}`).then((res) => {
        if (res.success && res.data) {
          setReport(res.data);
          // Auto print after a small delay to ensure rendering
          setTimeout(() => {
            window.print();
          }, 500);
        }
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) return <div className="p-8 text-center">Loading Report...</div>;
  if (!report) return <div className="p-8 text-center text-red-500">Report not found.</div>;

  const patientName = report.patient?.name || report.patientName || 'N/A';
  const patientAge = report.patient?.age || 'N/A';
  const patientGender = report.patient?.gender || 'N/A';
  const patientPhone = report.patient?.phone || 'N/A';
  const doctorName = report.doctor?.name || report.doctorName || 'N/A';
  const doctorSpec = report.doctor?.specialization || 'Consultant';

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: PRINT_STYLES }} />
      <div className="bg-white min-h-screen text-slate-800 p-8 max-w-4xl mx-auto font-sans print:max-w-none print:w-full print:p-0 print:m-0">
      {/* Header */}
      <div className="border-b-4 border-slate-800 pb-6 mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Dr. Q.H. Khan Classical Homoeopathic Clinic</h1>
          <p className="text-slate-600 font-medium mt-1">Classical Homoeopathic Consultation & Healthcare Since 1958</p>
          <p className="text-sm text-slate-500 mt-1">Nagmatia Road, Gaya, Bihar, India • +91 9135404090</p>
        </div>
        <div className="text-right">
          <h2 className="text-2xl font-bold text-slate-800">{doctorName}</h2>
          <p className="text-slate-600 font-medium">{doctorSpec}</p>
          <p className="text-sm text-slate-500 mt-1 font-mono">Reg. No: {report.doctor?.registrationNumber || 'HOM-12345'}</p>
        </div>
      </div>

      <div className="mb-6 flex justify-end">
        <div className="text-right">
          <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-1">Date of Visit</p>
          <p className="font-bold text-lg text-slate-900">{report.dateOfVisit}</p>
        </div>
      </div>

      {/* Patient Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 p-6 rounded-2xl bg-indigo-50/50 border border-indigo-100 print:bg-white print:border-slate-200">
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase">Patient Name</p>
          <p className="font-bold text-slate-900 text-lg">{patientName}</p>
        </div>
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase">Age / Gender</p>
          <p className="font-bold text-slate-900 text-lg">{patientAge} yrs, {patientGender}</p>
        </div>
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase">Contact</p>
          <p className="font-bold text-slate-900 text-lg">{patientPhone}</p>
        </div>
      </div>

      {/* Vitals */}
      {report.vitals && (
        <div className="mb-8">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest border-b border-slate-200 pb-2 mb-4">Patient Vitals</h3>
          <div className="flex gap-8">
            {report.vitals.bloodPressure && (
              <div><span className="text-slate-500 text-sm">BP:</span> <span className="font-bold">{report.vitals.bloodPressure} mmHg</span></div>
            )}
            {report.vitals.pulseRate && (
              <div><span className="text-slate-500 text-sm">Pulse:</span> <span className="font-bold">{report.vitals.pulseRate} bpm</span></div>
            )}
            {report.vitals.temperatureF && (
              <div><span className="text-slate-500 text-sm">Temp:</span> <span className="font-bold">{report.vitals.temperatureF} °F</span></div>
            )}
            {report.vitals.weightKg && (
              <div><span className="text-slate-500 text-sm">Weight:</span> <span className="font-bold">{report.vitals.weightKg} kg</span></div>
            )}
          </div>
        </div>
      )}

      {/* Clinical Findings */}
      <div className="mb-8 space-y-6">
        <div>
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest border-b border-slate-200 pb-2 mb-3">Symptoms</h3>
          <p className="text-slate-700 leading-relaxed">{report.symptoms?.join(', ') || 'N/A'}</p>
        </div>
        
        <div>
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest border-b border-slate-200 pb-2 mb-3">Diagnosis</h3>
          <p className="text-slate-900 font-bold text-lg">{report.diagnosis || 'Pending Evaluation'}</p>
        </div>
      </div>

      {/* Prescription */}
      {report.prescription && report.prescription.length > 0 && (
        <div className="mb-8">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest border-b border-slate-200 pb-2 mb-4">Homoeopathic Prescription</h3>
          <div className="space-y-4">
            {report.prescription.map((rx: any, idx: number) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 print:bg-transparent">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-serif font-black text-slate-300 print:text-slate-800">Rx</span>
                  <div>
                    <p className="font-bold text-slate-900 text-lg">{rx.medicineName}</p>
                    <p className="text-sm text-slate-600">{rx.dosage}</p>
                  </div>
                </div>
                <div className="mt-3 sm:mt-0 text-right">
                  <p className="font-bold text-slate-800">{rx.timing}</p>
                  <p className="text-sm text-slate-500">For {rx.durationDays} days</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Doctor Notes */}
      {report.doctorNotes && (
        <div className="mb-12">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest border-b border-slate-200 pb-2 mb-3">Doctor's Advice & Notes</h3>
          <p className="text-slate-700 leading-relaxed">{report.doctorNotes}</p>
        </div>
      )}

      {/* Footer / Signature */}
      <div className="mt-20 pt-8 flex justify-between items-end">
        <div className="text-xs text-slate-400">
          <p>Generated by Clinic Management System</p>
          <p>This is a computer generated document.</p>
        </div>
        <div className="text-center">
          <div className="border-b border-slate-800 w-48 mb-2"></div>
          <p className="font-bold text-slate-900">{doctorName}</p>
          <p className="text-xs text-slate-500">Authorized Signature</p>
        </div>
      </div>
      </div>
    </>
  );
}
