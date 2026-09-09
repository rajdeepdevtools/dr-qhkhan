'use client';

import React, { useEffect, useState } from 'react';
import { adminApiClient } from '../../lib/api-client';
import { AdminSidebar } from '../../components/AdminSidebar';
import { AdminHeader } from '../../components/AdminHeader';
import { Plus, Edit3, Trash2, FileText } from 'lucide-react';

export default function AdminReportsPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    patient: '',
    doctor: '',
    dateOfVisit: new Date().toISOString().slice(0, 10),
    symptoms: 'Fever, Cough',
    diagnosis: 'Acute Upper Respiratory Tract Infection',
    bloodPressure: '120/80',
    pulseRate: 72,
    weightKg: 65,
    temperatureF: 98.6,
    medicineName: 'Arnica Montana 30C',
    dosage: '4 pills',
    timing: 'Three times daily before meals',
    durationDays: 7,
    doctorNotes: 'Maintain proper hydration and adequate rest.',
    status: 'draft',
  });

  const fetchReports = async () => {
    const res = await adminApiClient('/reports/admin/all');
    if (res.success && res.data) setReports(res.data);
  };

  const fetchDropdownData = async () => {
    const pRes = await adminApiClient('/admin/patients');
    if (pRes.success && pRes.data) setPatients(pRes.data);

    const dRes = await adminApiClient('/doctors');
    if (dRes.success && dRes.data) setDoctors(dRes.data);
  };

  useEffect(() => {
    fetchReports();
    fetchDropdownData();
  }, []);

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({
      patient: patients.length > 0 ? patients[0]._id : '',
      doctor: doctors.length > 0 ? doctors[0]._id : '',
      dateOfVisit: new Date().toISOString().slice(0, 10),
      symptoms: 'Fever, Cough',
      diagnosis: 'Acute Upper Respiratory Tract Infection',
      bloodPressure: '120/80',
      pulseRate: 72,
      weightKg: 65,
      temperatureF: 98.6,
      medicineName: 'Arnica Montana 30C',
      dosage: '4 pills',
      timing: 'Three times daily before meals',
      durationDays: 7,
      doctorNotes: 'Maintain proper hydration and adequate rest.',
      status: 'draft',
    });
    setErrorMessage('');
    setShowModal(true);
  };

  const handleOpenEdit = (r: any) => {
    setEditingId(r._id);
    setFormData({
      patient: r.patient ? (typeof r.patient === 'object' ? r.patient._id : r.patient) : '',
      doctor: r.doctor ? (typeof r.doctor === 'object' ? r.doctor._id : r.doctor) : '',
      dateOfVisit: r.dateOfVisit || new Date().toISOString().slice(0, 10),
      symptoms: r.symptoms ? r.symptoms.join(', ') : 'Fever',
      diagnosis: r.diagnosis || '',
      bloodPressure: r.vitals?.bloodPressure || '120/80',
      pulseRate: r.vitals?.pulseRate || 72,
      weightKg: r.vitals?.weightKg || 65,
      temperatureF: r.vitals?.temperatureF || 98.6,
      medicineName: r.prescription?.[0]?.medicineName || 'Arnica Montana 30C',
      dosage: r.prescription?.[0]?.dosage || '4 pills',
      timing: r.prescription?.[0]?.timing || 'Three times daily',
      durationDays: r.prescription?.[0]?.durationDays || 7,
      doctorNotes: r.doctorNotes || '',
      status: r.status || 'draft',
    });
    setErrorMessage('');
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.patient || !formData.doctor) {
      setErrorMessage('Please select patient and doctor.');
      return;
    }

    const symptomsArray = formData.symptoms.split(',').map((s) => s.trim()).filter(Boolean);

    const payload = {
      patient: formData.patient,
      doctor: formData.doctor,
      dateOfVisit: formData.dateOfVisit,
      symptoms: symptomsArray,
      diagnosis: formData.diagnosis,
      vitals: {
        bloodPressure: formData.bloodPressure,
        pulseRate: Number(formData.pulseRate),
        weightKg: Number(formData.weightKg),
        temperatureF: Number(formData.temperatureF),
      },
      prescription: [
        {
          medicineName: formData.medicineName,
          dosage: formData.dosage,
          timing: formData.timing,
          durationDays: Number(formData.durationDays),
        },
      ],
      doctorNotes: formData.doctorNotes,
      status: formData.status,
    };

    const method = editingId ? 'PUT' : 'POST';
    const endpoint = editingId ? `/reports/${editingId}` : '/reports';

    const res = await adminApiClient(endpoint, {
      method,
      body: JSON.stringify(payload),
    });

    if (res.success) {
      setShowModal(false);
      fetchReports();
    } else {
      setErrorMessage(res.message || 'Failed to save report.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this medical report?')) return;
    const res = await adminApiClient(`/reports/${id}`, { method: 'DELETE' });
    if (res.success) {
      fetchReports();
    }
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader />
        <main className="p-6 space-y-6 flex-1 overflow-y-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">Clinical Medical Reports Audit</h1>
              <p className="text-xs text-slate-400">View, create, and audit medical reports across all doctors</p>
            </div>
            <button
              onClick={handleOpenCreate}
              className="px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs rounded-xl shadow flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4" /> Create Medical Report
            </button>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800/60 text-slate-400 border-b border-slate-800 uppercase font-semibold">
                  <th className="p-3">Report ID</th>
                  <th className="p-3">Patient Name</th>
                  <th className="p-3">Consulting Doctor</th>
                  <th className="p-3">Diagnosis</th>
                  <th className="p-3">Visit Date</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {reports.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-4 text-center text-slate-500">No medical reports found.</td>
                  </tr>
                ) : (
                  reports.map((r) => (
                    <tr key={r._id} className="hover:bg-slate-800/40">
                      <td className="p-3 font-mono font-bold text-amber-400">{r.reportId}</td>
                      <td className="p-3 font-bold text-white">{r.patientName || r.patient?.name}</td>
                      <td className="p-3">{r.doctorName || r.doctor?.name}</td>
                      <td className="p-3">{r.diagnosis}</td>
                      <td className="p-3 font-mono text-slate-400">{r.dateOfVisit}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] ${
                          r.status === 'finalized'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : 'bg-amber-950 text-amber-400 border border-amber-800'
                        }`}>
                          {r.status}
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEdit(r)}
                          className="p-1.5 bg-slate-800 text-slate-300 rounded hover:bg-slate-700 hover:text-white transition-colors"
                          title="Edit Medical Report"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(r._id)}
                          className="p-1.5 bg-rose-950/30 text-rose-400 rounded hover:bg-rose-900 hover:text-white transition-colors"
                          title="Delete Medical Report"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-xl space-y-4 text-xs max-h-[90vh] overflow-y-auto">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <FileText className="w-4 h-4 text-orange-500" />
                  {editingId ? 'Edit Medical Report' : 'Create Clinical Medical Report'}
                </h3>
                {errorMessage && (
                  <div className="p-3 bg-rose-950/40 border border-rose-900 rounded-xl text-rose-400 font-bold">
                    {errorMessage}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Select Patient *</label>
                      <select
                        required
                        value={formData.patient}
                        onChange={(e) => setFormData({ ...formData, patient: e.target.value })}
                        className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none focus:border-orange-500"
                      >
                        <option value="">Choose Patient</option>
                        {patients.map((p) => (
                          <option key={p._id} value={p._id}>
                            {p.name} ({p.patientId})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Select Doctor *</label>
                      <select
                        required
                        value={formData.doctor}
                        onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                        className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none focus:border-orange-500"
                      >
                        <option value="">Choose Doctor</option>
                        {doctors.map((d) => (
                          <option key={d._id} value={d._id}>
                            {d.name} ({d.specialization})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Date of Visit</label>
                      <input
                        type="date"
                        required
                        value={formData.dateOfVisit}
                        onChange={(e) => setFormData({ ...formData, dateOfVisit: e.target.value })}
                        className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Status</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none focus:border-orange-500 font-bold"
                      >
                        <option value="draft">Draft</option>
                        <option value="finalized">Finalized</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Symptoms (Comma Separated)</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Fever, Dry Cough, Headaches"
                      value={formData.symptoms}
                      onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                      className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Diagnosis</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Acute Bronchial Asthma"
                      value={formData.diagnosis}
                      onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
                      className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none focus:border-orange-500"
                    />
                  </div>

                  {/* Vitals Box */}
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                    <span className="text-[10px] text-amber-400 uppercase font-bold block">Patient Vitals</span>
                    <div className="grid grid-cols-4 gap-2">
                      <input
                        type="text"
                        placeholder="BP (120/80)"
                        value={formData.bloodPressure}
                        onChange={(e) => setFormData({ ...formData, bloodPressure: e.target.value })}
                        className="p-2 bg-slate-800 border border-slate-700 rounded text-white text-[11px]"
                      />
                      <input
                        type="number"
                        placeholder="Pulse Rate"
                        value={formData.pulseRate}
                        onChange={(e) => setFormData({ ...formData, pulseRate: Number(e.target.value) })}
                        className="p-2 bg-slate-800 border border-slate-700 rounded text-white text-[11px]"
                      />
                      <input
                        type="number"
                        placeholder="Weight (Kg)"
                        value={formData.weightKg}
                        onChange={(e) => setFormData({ ...formData, weightKg: Number(e.target.value) })}
                        className="p-2 bg-slate-800 border border-slate-700 rounded text-white text-[11px]"
                      />
                      <input
                        type="number"
                        step="0.1"
                        placeholder="Temp (°F)"
                        value={formData.temperatureF}
                        onChange={(e) => setFormData({ ...formData, temperatureF: Number(e.target.value) })}
                        className="p-2 bg-slate-800 border border-slate-700 rounded text-white text-[11px]"
                      />
                    </div>
                  </div>

                  {/* Prescription Box */}
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                    <span className="text-[10px] text-emerald-400 uppercase font-bold block">Homoeopathic Prescription</span>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Medicine Name"
                        value={formData.medicineName}
                        onChange={(e) => setFormData({ ...formData, medicineName: e.target.value })}
                        className="p-2 bg-slate-800 border border-slate-700 rounded text-white text-[11px]"
                      />
                      <input
                        type="text"
                        placeholder="Dosage (e.g. 4 pills)"
                        value={formData.dosage}
                        onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                        className="p-2 bg-slate-800 border border-slate-700 rounded text-white text-[11px]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Timing (e.g. TDS before meals)"
                        value={formData.timing}
                        onChange={(e) => setFormData({ ...formData, timing: e.target.value })}
                        className="p-2 bg-slate-800 border border-slate-700 rounded text-white text-[11px]"
                      />
                      <input
                        type="number"
                        placeholder="Duration (Days)"
                        value={formData.durationDays}
                        onChange={(e) => setFormData({ ...formData, durationDays: Number(e.target.value) })}
                        className="p-2 bg-slate-800 border border-slate-700 rounded text-white text-[11px]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Doctor Advice & Clinical Notes</label>
                    <textarea
                      rows={2}
                      placeholder="Doctor notes and diet restrictions..."
                      value={formData.doctorNotes}
                      onChange={(e) => setFormData({ ...formData, doctorNotes: e.target.value })}
                      className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none focus:border-orange-500 resize-none"
                    />
                  </div>

                  <div className="flex justify-end space-x-2 pt-2">
                    <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold transition-colors">
                      Cancel
                    </button>
                    <button type="submit" className="px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold rounded-xl shadow transition-colors">
                      {editingId ? 'Save Changes' : 'Save Medical Report'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
