import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, ShieldCheck, Clock, ArrowLeft } from 'lucide-react';
import { clinicConfig } from '../../../lib/clinicConfig';

const doctorsMap: Record<string, any> = {
  'dr-q-h-khan': {
    name: 'Late Dr. Q.H. Khan',
    designation: 'Founder (In Memoriam)',
    degrees: ['B.H.M.S. (B.U.)', 'M.D.', 'R.B.S.M.H.C.'],
    registrationNumber: 'Reg. 33454',
    specialization: 'Skin and private disease specialist',
    bio: 'Pioneer of classical homoeopathy in Gaya who established this clinic in 1958. His clinical values and standards form the bedrock of our current practice.',
    schedule: 'Deceased - Legacy Founder Profile',
    isDeceased: true,
  },
  'dr-i-khan': {
    name: 'Dr. I. Khan (Skin)',
    designation: 'Managing Director',
    degrees: ['B.H.M.S. (B.U.)', 'M.D.', 'R.B.S. M.H.C.'],
    registrationNumber: 'Reg. 33454',
    specialization: 'Skin and private disease specialist',
    bio: 'Managing Director of the clinic. Leading specialist with decades of clinical experience in advanced homoeopathic treatments for chronic skin diseases, vitiligo, and private disorders.',
    schedule: 'Monday – Sunday (Morning: 8:00 AM – 12:00 PM | Evening: 2:00 PM – 8:00 PM)',
  },
  'dr-adeeba-farheen': {
    name: 'Dr. Adeeba Farheen',
    designation: 'Scientific Advisor / Infertility Specialist',
    degrees: ['B.H.M.S. (B.U.)', 'M.D.', 'G.D.M.C., Katihar, Patna'],
    registrationNumber: 'Reg. 31319',
    specialization: 'Infertility and skin pigmentation related conditions',
    bio: 'Scientific Advisor and Infertility Specialist focusing on vitiligo, leucoderma, female infertility, and complex clinical conditions using advanced classical homoeopathy.',
    schedule: 'Monday – Saturday (Morning: 9:00 AM – 1:00 PM | Evening: 3:00 PM – 7:00 PM)',
  },
};

export default function DoctorDetailPage({ params }: { params: { slug: string } }) {
  const doctor = doctorsMap[params.slug];

  if (!doctor) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
      <Link href="/doctors" className="inline-flex items-center gap-1 text-xs font-semibold text-clinic-indigo hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to Doctors Directory
      </Link>

      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-slate-100 pb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-clinic-indigo text-white font-extrabold text-2xl flex items-center justify-center shadow">
              {doctor.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{doctor.name}</h1>
              <p className="text-xs font-bold text-clinic-indigo">{doctor.designation}</p>
              {doctor.registrationNumber && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 mt-1">
                  <ShieldCheck className="w-3 h-3" /> {doctor.registrationNumber}
                </span>
              )}
            </div>
          </div>

          {doctor.isDeceased ? (
            <span className="px-4 py-2 bg-slate-100 border border-slate-200 text-slate-500 font-bold text-xs rounded-xl select-none">
              Founder Profile (In Memoriam)
            </span>
          ) : (
            <Link
              href="/appointment"
              className="px-5 py-2.5 bg-clinic-crimson text-white font-bold text-xs rounded-xl shadow hover:bg-amber-700 transition-colors inline-flex items-center gap-1.5"
            >
              <Calendar className="w-4 h-4" /> Book Appointment
            </Link>
          )}
        </div>

        <div className="space-y-4 text-xs text-slate-700">
          <div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">Qualifications & Specialization</h3>
            <p><strong className="text-slate-900">Degrees:</strong> {doctor.degrees.join(', ')}</p>
            <p><strong className="text-slate-900">Specialization:</strong> {doctor.specialization}</p>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">Biography & Clinical Experience</h3>
            <p className="text-slate-600 leading-relaxed">{doctor.bio}</p>
          </div>

          {doctor.isDeceased ? (
            <div className="p-4 bg-amber-50/50 border border-amber-200 rounded-xl space-y-2">
              <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-600" /> Legacy Note
              </h4>
              <p className="text-slate-600 leading-relaxed">
                Dr. Q.H. Khan established the clinic in 1958 and served the Gaya community for over six decades. 
                Active medical consultations at the clinic are now conducted by our registered clinical specialists.
              </p>
              <div className="pt-2">
                <Link
                  href="/appointment"
                  className="inline-flex items-center justify-center px-4 py-2 bg-clinic-indigo hover:bg-clinic-violet text-white text-xs font-bold rounded-lg transition-colors"
                >
                  Book Appointment with Active Doctor
                </Link>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-clinic-indigo" /> Consultation Schedule
              </h4>
              <p className="text-slate-600">{doctor.schedule}</p>
              <p className="text-[11px] text-slate-500 pt-1">
                Clinic Location: Nagmatia Road, Gaya, Bihar. Helplines: {clinicConfig.helplines.map((h) => h.number).join(', ')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
