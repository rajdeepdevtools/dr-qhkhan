'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '../../../../lib/api-client';
import { useAuth } from '../../../../lib/auth-context';
import { CheckCircle2, AlertCircle, Plus, Trash2, Eye, FileText } from 'lucide-react';

const COMMON_REMEDIES = [
  'Sulphur', 'Silicea', 'Graphites', 'Thuja Occidentalis', 'Lycopodium Clavatum',
  'Natrum Muriaticum', 'Arsenicum Album', 'Pulsatilla Pratensis', 'Nux Vomica',
  'Lachesis Muta', 'Calcarea Carbonica', 'Phosphorus', 'Sepia Officinalis',
  'Rhus Toxicodendron', 'Bryonia Alba', 'Belladonna', 'Apis Mellifica',
  'Arnica Montana', 'Hepar Sulphuris Calcareum', 'Mercurius Solubilis',
  'Aconitum Napellus', 'Gelsemium Sempervirens', 'Chamomilla', 'Ferrum Phosphoricum'
];

const POTENCIES = [
  'Q (Mother Tincture)', '30C', '200C', '1M', '10M', 'CM', '3X', '6X', '12X', '6C', '12C'
];

export default function CreateReportPage() {
  const { profile } = useAuth();
  const router = useRouter();

  const [patients, setPatients] = useState<any[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [vitals, setVitals] = useState({
    bloodPressure: '120/80',
    pulseRate: 72,
    weightKg: 70,
    temperatureF: 98.6,
  });
  
  // Structured prescription item
  const [prescription, setPrescription] = useState<any[]>([
    { remedyName: 'Graphites', potency: '30C', dosage: '4 pills', timing: 'Morning & Evening', durationDays: 15 },
  ]);
  const [doctorNotes, setDoctorNotes] = useState('');
  const [status, setStatus] = useState<'draft' | 'finalized'>('draft');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    apiClient('/doctors/portal/patients').then((res) => {
      if (res.success && res.data) {
        setPatients(res.data);
        if (res.data.length > 0) setSelectedPatientId(res.data[0]._id);
      }
    });
  }, []);

  const handleAddMedicine = () => {
    setPrescription([
      ...prescription,
      { remedyName: '', potency: '30C', dosage: '4 pills', timing: 'Morning & Evening', durationDays: 15 },
    ]);
  };

  const handleRemoveMedicine = (idx: number) => {
    setPrescription(prescription.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatientId) {
      setErrorMsg('Please select a patient.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    // Merge remedy name and potency for database compatibility
    const formattedPrescription = prescription.map((item) => ({
      medicineName: `${item.remedyName} ${item.potency}`.trim(),
      dosage: item.dosage,
      timing: item.timing,
      durationDays: item.durationDays,
    }));

    const payload = {
      patient: selectedPatientId,
      doctor: profile?._id,
      dateOfVisit: new Date().toISOString().slice(0, 10),
      symptoms: symptoms.split(',').map((s) => s.trim()).filter(Boolean),
      diagnosis,
      vitals,
      prescription: formattedPrescription,
      doctorNotes,
      status,
    };

    const res = await apiClient('/reports', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    setLoading(false);

    if (res.success) {
      router.push('/doctor');
    } else {
      setErrorMsg(res.message || 'Failed to create report.');
    }
  };

  // Get selected patient name for live preview
  const activePatientName = patients.find(p => p._id === selectedPatientId)?.name || 'Patient Name';

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6 text-xs">
      {/* Searchable datalist for remedies */}
      <datalist id="remedies-autocomplete">
        {COMMON_REMEDIES.map((r, i) => (
          <option key={i} value={r} />
        ))}
      </datalist>

      <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Create Clinical Medical Report</h2>
          <p className="text-slate-500">Record symptoms, diagnosis, vitals, and homoeopathic prescription</p>
        </div>
      </div>

      {errorMsg && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Grid for Form + Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-5">
          {/* Patient Selection */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Select Patient *</label>
            {patients.length === 0 ? (
              <p className="text-slate-500 italic">No assigned patients found. Patient must register or book first.</p>
            ) : (
              <select
                value={selectedPatientId}
                onChange={(e) => setSelectedPatientId(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-clinic-indigo focus:outline-none"
              >
                {patients.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name} ({p.patientId}) - Phone: {p.phone}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Symptoms & Diagnosis */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Symptoms (Comma Separated) *</label>
              <input
                type="text"
                required
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="e.g. Skin redness, Itching on elbow"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-clinic-indigo focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Clinical Diagnosis *</label>
              <input
                type="text"
                required
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                placeholder="e.g. Psoriasis Vulgaris"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-clinic-indigo focus:outline-none"
              />
            </div>
          </div>

          {/* Vitals Input */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <h4 className="font-bold text-slate-900">Patient Vitals</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-slate-650 mb-1">Blood Pressure</label>
                <input
                  type="text"
                  value={vitals.bloodPressure}
                  onChange={(e) => setVitals({ ...vitals, bloodPressure: e.target.value })}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded bg-white"
                />
              </div>
              <div>
                <label className="block text-slate-650 mb-1">Pulse (bpm)</label>
                <input
                  type="number"
                  value={vitals.pulseRate}
                  onChange={(e) => setVitals({ ...vitals, pulseRate: parseInt(e.target.value) || 0 })}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded bg-white"
                />
              </div>
              <div>
                <label className="block text-slate-650 mb-1">Weight (kg)</label>
                <input
                  type="number"
                  value={vitals.weightKg}
                  onChange={(e) => setVitals({ ...vitals, weightKg: parseInt(e.target.value) || 0 })}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded bg-white"
                />
              </div>
              <div>
                <label className="block text-slate-650 mb-1">Temp (°F)</label>
                <input
                  type="number"
                  step="0.1"
                  value={vitals.temperatureF}
                  onChange={(e) => setVitals({ ...vitals, temperatureF: parseFloat(e.target.value) || 0 })}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded bg-white"
                />
              </div>
            </div>
          </div>

          {/* Prescription List */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-slate-900">Homoeopathic Prescription</h4>
              <button
                type="button"
                onClick={handleAddMedicine}
                className="px-2.5 py-1 bg-clinic-indigo text-white font-bold rounded-xl flex items-center gap-1 hover:bg-clinic-violet transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Add Remedy
              </button>
            </div>

            {prescription.map((item, idx) => (
              <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                {/* Searchable Remedy Input */}
                <div className="sm:col-span-4">
                  <input
                    type="text"
                    list="remedies-autocomplete"
                    placeholder="Remedy Name (e.g. Graphites)"
                    value={item.remedyName}
                    onChange={(e) => {
                      const updated = [...prescription];
                      updated[idx].remedyName = e.target.value;
                      setPrescription(updated);
                    }}
                    className="w-full px-2 py-1.5 border border-slate-300 rounded bg-white"
                  />
                </div>

                {/* Potency Dropdown */}
                <div className="sm:col-span-3">
                  <select
                    value={item.potency}
                    onChange={(e) => {
                      const updated = [...prescription];
                      updated[idx].potency = e.target.value;
                      setPrescription(updated);
                    }}
                    className="w-full px-2 py-1.5 border border-slate-300 rounded bg-white"
                  >
                    {POTENCIES.map((p, i) => (
                      <option key={i} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                {/* Dosage */}
                <div className="sm:col-span-2">
                  <input
                    type="text"
                    placeholder="Dosage (e.g. 4 pills)"
                    value={item.dosage}
                    onChange={(e) => {
                      const updated = [...prescription];
                      updated[idx].dosage = e.target.value;
                      setPrescription(updated);
                    }}
                    className="w-full px-2 py-1.5 border border-slate-300 rounded bg-white"
                  />
                </div>

                {/* Timing */}
                <div className="sm:col-span-2 flex items-center gap-1">
                  <input
                    type="text"
                    placeholder="Timing"
                    value={item.timing}
                    onChange={(e) => {
                      const updated = [...prescription];
                      updated[idx].timing = e.target.value;
                      setPrescription(updated);
                    }}
                    className="w-full px-2 py-1.5 border border-slate-300 rounded bg-white"
                  />
                </div>

                {/* Duration & Delete */}
                <div className="sm:col-span-1 flex items-center justify-between gap-1.5">
                  <input
                    type="number"
                    placeholder="Days"
                    value={item.durationDays}
                    onChange={(e) => {
                      const updated = [...prescription];
                      updated[idx].durationDays = parseInt(e.target.value) || 0;
                      setPrescription(updated);
                    }}
                    className="w-12 px-2 py-1.5 border border-slate-300 rounded bg-white text-center"
                  />
                  {prescription.length > 1 && (
                    <button type="button" onClick={() => handleRemoveMedicine(idx)} className="text-rose-600 hover:text-rose-800">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Doctor Remarks & Dietary Restrictions</label>
            <textarea
              rows={2}
              value={doctorNotes}
              onChange={(e) => setDoctorNotes(e.target.value)}
              placeholder="Dietary precautions, follow-up period..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-clinic-indigo"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Report Status *</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
            >
              <option value="draft">Save as Draft (Editable)</option>
              <option value="finalized">Finalize & Lock Report (Official Patient Access)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-clinic-crimson text-white font-bold rounded-xl shadow hover:bg-amber-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Save Clinical Report'}
          </button>
        </form>

        {/* Right Side: Live Printable Preview */}
        <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-4 sticky top-24 self-start space-y-4 max-h-[85vh] overflow-y-auto hidden lg:block shadow-sm">
          <div className="border-b border-slate-200 pb-2 flex items-center gap-1.5 text-slate-800">
            <Eye className="w-4 h-4 text-clinic-indigo" />
            <h4 className="font-bold text-xs uppercase tracking-wider">Live Letterhead Preview</h4>
          </div>
          
          {/* Miniature Paper Sheet */}
          <div className="bg-white p-6 rounded-lg border border-slate-300 shadow-sm text-[10px] text-slate-900 space-y-4 leading-normal font-sans">
            {/* Letterhead Header */}
            <div className="border-b border-clinic-indigo pb-3">
              <h1 className="text-xs font-black text-clinic-indigo uppercase tracking-tight">
                DR. Q.H. KHAN CLASSICAL CLINIC
              </h1>
              <p className="text-[7px] text-slate-500 font-bold">ESTABLISHED 1958 • GAYA, BIHAR</p>
            </div>

            {/* Patient & Doctor metadata */}
            <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2 rounded border border-slate-150 text-[8px] font-semibold text-slate-700">
              <div>
                <span className="text-[7px] text-slate-400 block font-normal">PATIENT</span>
                <strong>{activePatientName}</strong>
              </div>
              <div>
                <span className="text-[7px] text-slate-400 block font-normal">DOCTOR</span>
                <strong>{profile?.name || 'Dr. Q. H. Khan Specialist'}</strong>
              </div>
            </div>

            {/* Vitals */}
            <div className="p-2 bg-slate-100/50 rounded border border-slate-200 grid grid-cols-4 gap-1 text-[8px]">
              <div>
                <span className="text-[7px] text-slate-400 block">BP</span>
                <strong>{vitals.bloodPressure || '120/80'}</strong>
              </div>
              <div>
                <span className="text-[7px] text-slate-400 block">Pulse</span>
                <strong>{vitals.pulseRate ? `${vitals.pulseRate} bpm` : 'N/A'}</strong>
              </div>
              <div>
                <span className="text-[7px] text-slate-400 block">Weight</span>
                <strong>{vitals.weightKg ? `${vitals.weightKg} kg` : 'N/A'}</strong>
              </div>
              <div>
                <span className="text-[7px] text-slate-400 block">Temp</span>
                <strong>{vitals.temperatureF ? `${vitals.temperatureF} °F` : 'N/A'}</strong>
              </div>
            </div>

            {/* Diagnosis & Symptoms */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-2 border border-slate-200 rounded">
                <strong className="text-[8px] block text-slate-500 uppercase">Symptoms</strong>
                <p className="text-slate-800 line-clamp-2 mt-0.5">{symptoms || 'No symptoms noted'}</p>
              </div>
              <div className="p-2 border border-slate-200 rounded bg-amber-50/20">
                <strong className="text-[8px] block text-slate-500 uppercase">Diagnosis</strong>
                <p className="text-clinic-indigo font-bold mt-0.5">{diagnosis || 'Awaiting Diagnosis'}</p>
              </div>
            </div>

            {/* Remedies Table */}
            <div>
              <strong className="text-[8px] block text-slate-500 uppercase mb-1">Prescribed Remedies</strong>
              <table className="w-full text-left border-collapse border border-slate-150 text-[8px]">
                <thead>
                  <tr className="bg-slate-50 text-slate-700 border-b border-slate-200">
                    <th className="p-1 border border-slate-150 font-bold">Remedy</th>
                    <th className="p-1 border border-slate-150 font-bold">Dosage</th>
                    <th className="p-1 border border-slate-150 font-bold">Timing</th>
                    <th className="p-1 border border-slate-150 font-bold">Days</th>
                  </tr>
                </thead>
                <tbody>
                  {prescription.map((item, idx) => (
                    <tr key={idx} className="border-b border-slate-150">
                      <td className="p-1 border border-slate-150 font-bold text-clinic-indigo truncate max-w-[80px]">
                        {item.remedyName || '—'} {item.potency}
                      </td>
                      <td className="p-1 border border-slate-150">{item.dosage || '—'}</td>
                      <td className="p-1 border border-slate-150">{item.timing || '—'}</td>
                      <td className="p-1 border border-slate-150">{item.durationDays || '0'}d</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Notes */}
            {doctorNotes && (
              <div className="p-2 bg-slate-50 border border-slate-200 rounded">
                <strong className="text-[8px] block text-slate-500 uppercase">Remarks</strong>
                <p className="text-slate-700 mt-0.5 line-clamp-2">{doctorNotes}</p>
              </div>
            )}

            {/* Signature Area */}
            <div className="pt-4 border-t border-slate-150 flex justify-between items-end text-[7px] text-slate-400">
              <span>Verified Digital Letterhead</span>
              <div className="text-right">
                <div className="h-6 w-16 border-b border-slate-300 border-dashed" />
                <span className="block mt-1 font-bold text-slate-650">Dr. Signature</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
