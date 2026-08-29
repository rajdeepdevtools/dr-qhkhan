'use client';

import React from 'react';
import Link from 'next/link';
import { UserCheck, Calendar, ShieldCheck } from 'lucide-react';
import { IDoctorProfile } from '@hospital/shared-types';
import { useLanguage } from '../lib/language-context';

export const DoctorCard: React.FC<{ doctor: Partial<IDoctorProfile> }> = ({ doctor }) => {
  const { lang } = useLanguage();

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-4 flex flex-col justify-between">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="w-12 h-12 rounded-full bg-clinic-indigo/10 flex items-center justify-center text-clinic-indigo font-bold text-lg">
            {doctor.name ? doctor.name.split(' ').map((n) => n[0]).join('').slice(0, 2) : 'DR'}
          </div>
          <div className="flex flex-col items-end gap-1.5">
            {doctor.isDeceased && (
              <span className="inline-flex items-center text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full border border-slate-200 uppercase tracking-wider">
                {lang === 'hi' ? 'स्मृति में' : 'In Memoriam'}
              </span>
            )}
            {doctor.registrationNumber && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-200">
                <ShieldCheck className="w-3 h-3" />
                {lang === 'hi' ? `रजिस्ट्रेशन: ${doctor.registrationNumber.replace('Reg. ', '')}` : doctor.registrationNumber}
              </span>
            )}
          </div>
        </div>

        <div>
          <h3 className="font-bold text-slate-900 text-lg">{doctor.name}</h3>
          <p className="text-xs font-semibold text-clinic-indigo">{doctor.designation}</p>
        </div>

        <div className="text-xs text-slate-600 space-y-1">
          <p>
            <strong className="text-slate-700">{lang === 'hi' ? 'योग्यता:' : 'Degrees:'}</strong>{' '}
            {doctor.degrees?.join(', ')}
          </p>
          <p>
            <strong className="text-slate-700">{lang === 'hi' ? 'विशेषज्ञता:' : 'Specialty:'}</strong>{' '}
            {doctor.specialization}
          </p>
        </div>

        <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
          {doctor.bio}
        </p>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        {doctor.isDeceased ? (
          <>
            <Link
              href={`/doctors/${doctor.slug}`}
              className="text-xs font-semibold text-slate-500 hover:underline flex items-center gap-1"
            >
              <UserCheck className="w-3.5 h-3.5" /> {lang === 'hi' ? 'जीवन इतिहास' : 'Legacy Profile'}
            </Link>
            <span className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-400 text-xs font-bold select-none">
              {lang === 'hi' ? 'संस्थापक' : 'Founder Profile'}
            </span>
          </>
        ) : (
          <>
            <Link
              href={`/doctors/${doctor.slug}`}
              className="text-xs font-semibold text-clinic-indigo hover:underline flex items-center gap-1"
            >
              <UserCheck className="w-3.5 h-3.5" /> {lang === 'hi' ? 'समय सारणी' : 'View Schedule'}
            </Link>
            <Link
              href="/appointment"
              className="px-3 py-1.5 rounded-lg bg-clinic-crimson text-white text-xs font-bold shadow hover:bg-amber-700 transition-colors flex items-center gap-1"
            >
              <Calendar className="w-3.5 h-3.5" /> {lang === 'hi' ? 'बुक करें' : 'Book'}
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
