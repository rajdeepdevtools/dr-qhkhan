import React from 'react';
import Link from 'next/link';
import { Award, ShieldCheck, Clock, MapPin, Calendar } from 'lucide-react';
import { clinicConfig } from '../../lib/clinicConfig';

export default function AboutPage() {
  const timelineEvents = [
    {
      year: '1958',
      title: 'Establishment of Clinic',
      description: 'Dr. Q.H. Khan established classical homoeopathic practice at Nagmatia Road, Gaya, Bihar.',
    },
    {
      year: '1980s – 2000s',
      title: 'Clinical Service & Community Healthcare',
      description: 'Expanded specialized consultations for chronic skin conditions, leucoderma, and respiratory ailments.',
    },
    {
      year: 'Present Day',
      title: 'Multidisciplinary Homoeopathic Care',
      description: 'A dedicated team of qualified B.H.M.S. & M.D. doctors offering patient-centric healthcare.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-clinic-indigo/10 text-clinic-indigo text-xs font-bold">
          <Award className="w-4 h-4" /> CLINIC HERITAGE & LEADERSHIP
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          About DR. Q.H. KHAN CLASSICAL HOMOEOPATHIC CLINIC
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          Established in 1958 at Nagmatia Road, Gaya, Bihar. Preserving constitutional classical homoeopathy and thorough clinical care.
        </p>
      </div>

      {/* Leadership Profile Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Founder / Managing Director */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-clinic-indigo text-white flex items-center justify-center font-extrabold text-xl shadow">
              QHK
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Dr. Q.H. Khan</h2>
              <p className="text-xs font-bold text-clinic-indigo">Managing Director / Founder Lead</p>
              <p className="text-xs text-slate-500 font-mono">Reg. 33454</p>
            </div>
          </div>
          <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3">
            <p><strong className="text-slate-800">Qualifications:</strong> B.H.M.S. (B.U.) | M.D. | R.B.S.M.H.C.</p>
            <p><strong className="text-slate-800">Clinical Focus:</strong> Skin and private disease specialist</p>
            <p className="leading-relaxed">
              Dr. Q.H. Khan has guided the clinic since its inception in 1958, establishing strict standards for constitutional prescribing and individualized case analysis in chronic illnesses.
            </p>
          </div>
        </div>

        {/* Scientific Advisor */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-clinic-violet text-white flex items-center justify-center font-extrabold text-xl shadow">
              AF
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Dr. Adeeba Farheen</h2>
              <p className="text-xs font-bold text-clinic-violet">Scientific Advisor</p>
              <p className="text-xs text-slate-500 font-mono">Reg. 31319</p>
            </div>
          </div>
          <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3">
            <p><strong className="text-slate-800">Qualifications:</strong> B.H.M.S. (B.U.) | M.D. | G.D.M.C., Katihar, Patna</p>
            <p><strong className="text-slate-800">Clinical Focus:</strong> Leucoderma / skin pigmentation related conditions</p>
            <p className="leading-relaxed">
              Specialist consultant focusing on vitiligo, leucoderma, and recalcitrant skin complaints using evidence-aware homoeopathic protocols.
            </p>
          </div>
        </div>
      </div>

      {/* Historical Timeline */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 space-y-6 shadow-xl">
        <div className="border-b border-slate-800 pb-4">
          <h2 className="text-2xl font-bold text-amber-300">Clinic Journey Timeline</h2>
          <p className="text-xs text-slate-400">Key milestones of Dr. Q.H. Khan Clinic in Gaya, Bihar</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {timelineEvents.map((event, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2">
              <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full">
                {event.year}
              </span>
              <h3 className="font-bold text-white text-base mt-2">{event.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{event.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Clinic Philosophy & Location Card */}
      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-md space-y-4">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-clinic-indigo" />
          Our Medical Philosophy & Responsible Messaging
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed max-w-4xl">
          At Dr. Q.H. Khan Clinic, we preserve traditional homoeopathic principles while maintaining responsible medical safety. We do not issue unrealistic guarantees or 100% cure claims. All acute, severe, or surgical emergencies are directed to appropriate hospital facilities.
        </p>

        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-slate-600">
            <p><strong className="text-slate-800">Clinic Address:</strong> Nagmatia Road, Gaya, Bihar, India</p>
            <p><strong className="text-slate-800">Helplines:</strong> 9709786669 | 9135404090 | 9097211989</p>
          </div>

          <Link
            href="/appointment"
            className="px-6 py-3 bg-clinic-crimson hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow transition-colors flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Consultation</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
