import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { clinicConfig } from '../../lib/clinicConfig';

export default function MedicalDisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
      <div className="text-center space-y-3">
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
          <ShieldAlert className="w-4 h-4 text-amber-600" /> MEDICAL SAFETY POLICY
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900">Official Medical Disclaimer</h1>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-xs text-slate-700 space-y-4 leading-relaxed">
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 font-semibold">
          {clinicConfig.medicalDisclaimer}
        </div>

        <h2 className="text-sm font-bold text-slate-900">1. Responsible Treatment Claims</h2>
        <p>
          Where historical brochure materials or clinic literature contain statements regarding disease treatments, they are presented strictly as informational clinical background. We explicitly do NOT offer guaranteed 100% cures for serious, malignant, or surgical conditions.
        </p>

        <h2 className="text-sm font-bold text-slate-900">2. Serious & Emergency Conditions</h2>
        <p>
          Conditions such as cancer, brain tumors, acute appendicitis, severe intestinal obstruction, or acute hemorrhage require urgent evaluation by specialized hospital emergency services. Do not delay emergency surgical or oncology care.
        </p>

        <h2 className="text-sm font-bold text-slate-900">3. Consultation Protocol</h2>
        <p>
          Homoeopathic remedies are prescribed individually by qualified registered physicians based on thorough case examination. Patients are advised to continue necessary diagnostic imaging and blood testing as advised by medical specialists.
        </p>
      </div>
    </div>
  );
}
