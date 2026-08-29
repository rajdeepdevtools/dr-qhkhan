import React from 'react';
import { DoctorCard } from '../../components/DoctorCard';
import { UserCheck } from 'lucide-react';

export default function DoctorsPage() {
  const doctors = [
    {
      slug: 'dr-q-h-khan',
      name: 'Late Dr. Q.H. Khan',
      degrees: ['B.H.M.S. (B.U.)', 'M.D.', 'R.B.S.M.H.C.'],
      registrationNumber: 'Reg. 33454',
      specialization: 'Skin and private disease specialist',
      designation: 'Founder (In Memoriam)',
      bio: 'Pioneer of classical homoeopathy in Gaya who founded this clinic in 1958. His legacy and standards continue to guide our active specialists.',
      isDeceased: true,
    },
    {
      slug: 'dr-i-khan',
      name: 'Dr. I. Khan (Skin)',
      degrees: ['B.H.M.S. (B.U.)', 'M.D.', 'R.B.S. M.H.C.'],
      registrationNumber: 'Reg. 33454',
      specialization: 'Skin and private disease specialist',
      designation: 'Managing Director',
      bio: 'Managing Director of the clinic with extensive experience in classical homoeopathy, specializing in chronic skin disorders, vitiligo, and private diseases.',
    },
    {
      slug: 'dr-adeeba-farheen',
      name: 'Dr. Adeeba Farheen',
      degrees: ['B.H.M.S. (B.U.)', 'M.D.', 'G.D.M.C., Katihar, Patna'],
      registrationNumber: 'Reg. 31319',
      specialization: 'Infertility and skin pigmentation related conditions',
      designation: 'Scientific Advisor / Infertility Specialist',
      bio: 'Specialist consultant focusing on Vitiligo, Leucoderma, and female infertility conditions using advanced classical homoeopathy.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-clinic-indigo/10 text-clinic-indigo text-xs font-bold">
          <UserCheck className="w-4 h-4" /> QUALIFIED CLINICAL TEAM
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900">Our Doctors & Physicians</h1>
        <p className="text-slate-600 text-sm">
          All doctors at Dr. Q.H. Khan Clinic hold valid degrees and qualifications. Official registration numbers are listed where assigned.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {doctors.map((doc, idx) => (
          <DoctorCard key={idx} doctor={doc} />
        ))}
      </div>
    </div>
  );
}
