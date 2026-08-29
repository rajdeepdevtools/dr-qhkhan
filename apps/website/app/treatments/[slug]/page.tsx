import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, ShieldAlert, ArrowLeft, HeartPulse, Phone } from 'lucide-react';
import { treatmentsData, clinicConfig } from '../../../lib/clinicConfig';

export default function TreatmentDetailPage({ params }: { params: { slug: string } }) {
  const treatment = treatmentsData.find((t) => t.slug === params.slug);

  if (!treatment) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
      <Link href="/treatments" className="inline-flex items-center gap-1 text-xs font-semibold text-clinic-indigo hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to Treatments Directory
      </Link>

      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-slate-100 pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-clinic-indigo bg-clinic-indigo/10 px-2.5 py-1 rounded">
              {treatment.category}
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900 mt-2">{treatment.nameEn}</h1>
            <p className="text-sm font-bold text-clinic-indigo">{treatment.nameHi}</p>
          </div>

          <Link
            href="/appointment"
            className="px-5 py-2.5 bg-clinic-crimson text-white font-bold text-xs rounded-xl shadow hover:bg-amber-700 transition-colors inline-flex items-center gap-1.5"
          >
            <Calendar className="w-4 h-4" /> Book Consultation
          </Link>
        </div>

        {treatment.isSeriousCondition && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs flex items-start gap-2.5">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold">Medical Disclaimer for Serious Conditions:</strong>{' '}
              {treatment.medicalNote || 'Seek evaluation from a qualified medical professional. Emergency conditions require appropriate urgent medical care.'}
            </div>
          </div>
        )}

        <div className="space-y-4 text-xs text-slate-700">
          <div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">Clinical Overview</h3>
            <p className="text-slate-600 leading-relaxed">{treatment.description}</p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
              <HeartPulse className="w-4 h-4 text-clinic-crimson" /> When to Seek Medical Attention
            </h4>
            <p className="text-slate-700 leading-relaxed">{treatment.whenToSeekCare}</p>
          </div>

          <div className="p-4 bg-clinic-indigo/5 border border-clinic-indigo/15 rounded-xl space-y-2">
            <h4 className="font-bold text-clinic-indigo text-xs">Clinic Consultation Information</h4>
            <p className="text-slate-600 leading-relaxed">
              Dr. Q.H. Khan Clinic provides constitutional homoeopathic evaluation for this condition at our Nagmatia Road, Gaya facility. Consultations are available under Dr. Q.H. Khan, Dr. Adeeba Farheen, and our team of qualified physicians.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="tel:9135404090"
                className="inline-flex items-center gap-1 text-xs font-bold text-clinic-indigo hover:underline"
              >
                <Phone className="w-3.5 h-3.5" /> Call Helpline: 9135404090
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
