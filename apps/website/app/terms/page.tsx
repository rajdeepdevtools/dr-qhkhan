import React from 'react';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
      <h1 className="text-3xl font-extrabold text-slate-900">Terms of Service</h1>
      <p className="text-xs text-slate-500">Effective Date: August 2026</p>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-xs text-slate-700 space-y-4 leading-relaxed">
        <h2 className="text-sm font-bold text-slate-900">1. Clinic Consultation Services</h2>
        <p>
          Online appointment requests submitted via this website represent consultation scheduling requests. Confirmation is subject to doctor availability at our Nagmatia Road, Gaya clinic.
        </p>

        <h2 className="text-sm font-bold text-slate-900">2. Medical Disclaimer</h2>
        <p>
          Information provided on this website is for general educational and clinical informational purposes only. It is not a substitute for emergency surgical or hospital intervention.
        </p>

        <h2 className="text-sm font-bold text-slate-900">3. Patient Responsibilities</h2>
        <p>
          Patients must provide accurate health history during consultation to enable appropriate homoeopathic prescribing.
        </p>
      </div>
    </div>
  );
}
