'use client';

import React, { useState } from 'react';
import { apiClient } from '../lib/api-client';
import { CheckCircle2, AlertCircle, Calendar } from 'lucide-react';

export const AppointmentForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: 30,
    gender: 'Male',
    department: 'General Consultation',
    preferredDate: '',
    preferredTime: '10:00 AM',
    message: '',
    consent: true,
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [appointmentId, setAppointmentId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else if (name === 'age') {
      setFormData((prev) => ({ ...prev, age: parseInt(value, 10) || 0 }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const res = await apiClient('/appointments', {
      method: 'POST',
      body: JSON.stringify(formData),
    });

    setLoading(false);

    if (res.success && res.data) {
      setSuccessMsg('Your appointment request has been submitted successfully.');
      setAppointmentId(res.data.appointmentId);
    } else {
      setErrorMsg(res.message || 'Failed to submit appointment. Please check required fields.');
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-md">
      {successMsg && appointmentId ? (
        <div className="text-center py-8 space-y-4">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">Appointment Booked!</h3>
          <p className="text-sm text-slate-600 max-w-md mx-auto">{successMsg}</p>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl inline-block">
            <p className="text-xs font-semibold text-slate-500">YOUR APPOINTMENT REFERENCE ID</p>
            <p className="text-xl font-extrabold text-clinic-indigo tracking-wider mt-1">{appointmentId}</p>
          </div>
          <p className="text-xs text-slate-500">
            Please keep this ID for consultation tracking. Our clinic team will call to confirm.
          </p>
          <button
            onClick={() => {
              setSuccessMsg(null);
              setAppointmentId(null);
            }}
            className="px-5 py-2 bg-clinic-indigo text-white font-semibold text-xs rounded-lg shadow hover:bg-clinic-violet transition-colors"
          >
            Book Another Appointment
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-clinic-crimson" />
              Online Patient Appointment Booking
            </h3>
            <p className="text-xs text-slate-500">
              Submit patient details for consultation at Dr. Q.H. Khan Clinic, Nagmatia Road, Gaya.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Patient Name *</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Rajesh Kumar"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-clinic-indigo focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number (Helpline Callback) *</label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. 9876543210"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-clinic-indigo focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="patient@example.com"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-clinic-indigo focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Age *</label>
              <input
                type="number"
                name="age"
                required
                min={1}
                max={120}
                value={formData.age}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-clinic-indigo focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Gender *</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-clinic-indigo focus:outline-none"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Department / Health Concern *</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-clinic-indigo focus:outline-none"
              >
                <option value="General Consultation">General Homoeopathy</option>
                <option value="Skin & Dermatology">Skin & Leucoderma Specialist</option>
                <option value="Gynae & Obs">Gynae & Female Health</option>
                <option value="Renal & Calculi">Renal & Calculi (Stones)</option>
                <option value="Chronic Diseases">Chronic Diseases</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Date *</label>
              <input
                type="date"
                name="preferredDate"
                required
                value={formData.preferredDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-clinic-indigo focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Time *</label>
              <select
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-clinic-indigo focus:outline-none"
              >
                <option value="8:00 AM - 10:00 AM">Morning (8:00 AM – 10:00 AM)</option>
                <option value="10:00 AM - 12:00 PM">Morning (10:00 AM – 12:00 PM)</option>
                <option value="2:00 PM - 5:00 PM">Evening (2:00 PM – 5:00 PM)</option>
                <option value="5:00 PM - 8:00 PM">Evening (5:00 PM – 8:00 PM)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Symptoms / Notes for Doctor</label>
            <textarea
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleChange}
              placeholder="Describe your health symptoms or duration of complaint..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-clinic-indigo focus:outline-none"
            />
          </div>

          <div className="flex items-start gap-2 pt-1">
            <input
              type="checkbox"
              name="consent"
              id="consent"
              checked={formData.consent}
              onChange={handleChange}
              className="mt-1 rounded text-clinic-indigo focus:ring-clinic-indigo"
            />
            <label htmlFor="consent" className="text-xs text-slate-600">
              I consent to providing patient information for clinical consultation at Dr. Q.H. Khan Clinic. I understand emergency medical conditions require immediate hospital emergency care.
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-xl bg-clinic-crimson hover:bg-amber-700 text-white font-bold text-sm shadow-md transition-colors disabled:opacity-50"
          >
            {loading ? 'Submitting Request...' : 'Confirm Appointment Submission'}
          </button>
        </form>
      )}
    </div>
  );
};
