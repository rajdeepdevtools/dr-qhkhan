'use client';

import React, { useEffect, useState } from 'react';
import { apiClient } from '../../../lib/api-client';
import { PrintableReport } from '../../../components/PrintableReport';
import { FileText, Printer } from 'lucide-react';

export default function PatientReportsPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [selectedReport, setSelectedReport] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient('/patients/reports').then((res) => {
      if (res.success && res.data) setReports(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-6">
      {selectedReport ? (
        <div className="space-y-4">
          <button
            onClick={() => setSelectedReport(null)}
            className="no-print px-3.5 py-1.5 bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg hover:bg-slate-300 transition-colors"
          >
            ← Back to All Reports
          </button>
          <PrintableReport report={selectedReport} />
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-lg font-bold text-slate-900">My Finalized Medical Reports</h2>
            <p className="text-xs text-slate-500">View and print clinical reports issued by Dr. Q.H. Khan Clinic</p>
          </div>

          {loading ? (
            <p className="text-xs text-slate-500 py-6 text-center">Loading medical reports...</p>
          ) : reports.length === 0 ? (
            <p className="text-xs text-slate-500 py-6 text-center">No finalized medical reports found.</p>
          ) : (
            <div className="space-y-3">
              {reports.map((rep) => (
                <div key={rep._id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-clinic-indigo font-bold">{rep.reportId}</span>
                      <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">
                        FINALIZED
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm">{rep.diagnosis}</h3>
                    <p className="text-slate-500">Doctor: {rep.doctorName} • Visit Date: {rep.dateOfVisit}</p>
                  </div>

                  <button
                    onClick={() => setSelectedReport(rep)}
                    className="px-4 py-2 bg-clinic-indigo hover:bg-clinic-violet text-white text-xs font-bold rounded-lg shadow transition-colors flex items-center gap-1.5"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>View & Print</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
