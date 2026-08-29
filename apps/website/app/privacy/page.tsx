import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
      <h1 className="text-3xl font-extrabold text-slate-900">Privacy Policy</h1>
      <p className="text-xs text-slate-500">Effective Date: August 2026</p>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-xs text-slate-700 space-y-4 leading-relaxed">
        <h2 className="text-sm font-bold text-slate-900">1. Patient Information Confidentiality</h2>
        <p>
          At DR. Q.H. KHAN CLASSICAL HOMOEOPATHIC CLINIC, patient privacy is paramount. Personal medical details submitted during appointment booking or consultation are strictly protected and never shared with unauthorized third parties.
        </p>

        <h2 className="text-sm font-bold text-slate-900">2. Collection of Personal & Health Data</h2>
        <p>
          We collect basic contact details (name, email, phone number, age, gender) and relevant health notes provided voluntarily by patients for medical consultation purposes.
        </p>

        <h2 className="text-sm font-bold text-slate-900">3. Security Standards</h2>
        <p>
          All electronic medical records are stored using encrypted databases with strict role-based access control. Patients may access only their own medical records.
        </p>
      </div>
    </div>
  );
}
