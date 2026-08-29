'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '../../../../lib/api-client';
import { useAuth } from '../../../../lib/auth-context';
import { CheckCircle2, AlertCircle, Plus, Trash2 } from 'lucide-react';

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
  const [prescription, setPrescription] = useState<any[]>([
    { medicineName: 'Graphites 30C', dosage: '4 pills', timing: 'Morning & Evening', durationDays: 15, notes: '' },
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
      { medicineName: '', dosage: '4 pills', timing: 'Morning & Evening', durationDays: 15, notes: '' },
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

    const payload = {
      patient: selectedPatientId,
      doctor: profile?._id,
      dateOfVisit: new Date().toISOString().slice(0, 10),
      symptoms: symptoms.split(',').map((s) => s.trim()).filter(Boolean),
      diagnosis,
      vitals,
      prescription,
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

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6 text-xs">
      <div className="border-b border-slate-100 pb-3">
        <h2 className="text-lg font-bold text-slate-900">Create Clinical Medical Report</h2>
        <p className="text-slate-500">Record symptoms, diagnosis, vitals, and homoeopathic prescription</p>
      </div>

      {errorMsg && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
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
              <label className="block text-slate-600 mb-1">Blood Pressure</label>
              <input
                type="text"
                value={vitals.bloodPressure}
                onChange={(e) => setVitals({ ...vitals, bloodPressure: e.target.value })}
                className="w-full px-2 py-1.5 border border-slate-300 rounded"
              />
            </div>
            <div>
              <label className="block text-slate-600 mb-1">Pulse Rate (bpm)</label>
              <input
                type="number"
                value={vitals.pulseRate}
                onChange={(e) => setVitals({ ...vitals, pulseRate: parseInt(e.target.value) || 0 })}
                className="w-full px-2 py-1.5 border border-slate-300 rounded"
              />
            </div>
            <div>
              <label className="block text-slate-600 mb-1">Weight (kg)</label>
              <input
                type="number"
                value={vitals.weightKg}
                onChange={(e) => setVitals({ ...vitals, weightKg: parseInt(e.target.value) || 0 })}
                className="w-full px-2 py-1.5 border border-slate-300 rounded"
              />
            </div>
            <div>
              <label className="block text-slate-600 mb-1">Temperature (°F)</label>
              <input
                type="number"
                step="0.1"
                value={vitals.temperatureF}
                onChange={(e) => setVitals({ ...vitals, temperatureF: parseFloat(e.target.value) || 0 })}
                className="w-full px-2 py-1.5 border border-slate-300 rounded"
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
              className="px-2.5 py-1 bg-clinic-indigo text-white font-bold rounded flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add Remedy
            </button>
          </div>

          {prescription.map((item, idx) => (
            <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl grid grid-cols-1 sm:grid-cols-5 gap-2 items-center">
              <input
                type="text"
                placeholder="Medicine Name & Potency"
                value={item.medicineName}
                onChange={(e) => {
                  const updated = [...prescription];
                  updated[idx].medicineName = e.target.value;
                  setPrescription(updated);
                }}
                className="px-2 py-1.5 border border-slate-300 rounded sm:col-span-2"
              />
              <input
                type="text"
                placeholder="Dosage (e.g. 4 pills)"
                value={item.dosage}
                onChange={(e) => {
                  const updated = [...prescription];
                  updated[idx].dosage = e.target.value;
                  setPrescription(updated);
                }}
                className="px-2 py-1.5 border border-slate-300 rounded"
              />
              <input
                type="text"
                placeholder="Timing"
                value={item.timing}
                onChange={(e) => {
                  const updated = [...prescription];
                  updated[idx].timing = e.target.value;
                  setPrescription(updated);
                }}
                className="px-2 py-1.5 border border-slate-300 rounded"
              />
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  placeholder="Days"
                  value={item.durationDays}
                  onChange={(e) => {
                    const updated = [...prescription];
                    updated[idx].durationDays = parseInt(e.target.value) || 0;
                    setPrescription(updated);
                  }}
                  className="w-16 px-2 py-1.5 border border-slate-300 rounded"
                />
                {prescription.length > 1 && (
                  <button type="button" onClick={() => handleRemoveMedicine(idx)} className="text-rose-600">
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
            className="w-full px-3 py-2 border border-slate-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">Report Status *</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg"
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
    </div>
  );
}
