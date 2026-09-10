'use client';

import React from 'react';
import Link from 'next/link';
import { UserCheck, Calendar, ShieldCheck, Award } from 'lucide-react';
import { IDoctorProfile } from '@hospital/shared-types';
import { useLanguage } from '../lib/language-context';

export const DoctorCard: React.FC<{ doctor: Partial<IDoctorProfile> }> = ({ doctor }) => {
  const { lang } = useLanguage();

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#F5B800]/60 transition-all duration-300 space-y-4 flex flex-col justify-between text-xs font-semibold group relative overflow-hidden">
      <div className="space-y-4">
        
        {/* Professional Portrait Container */}
        <div className="relative w-full h-64 sm:h-72 bg-slate-50 rounded-2xl overflow-hidden border border-slate-200/60 shadow-inner">
          <img
            src={
              (doctor as any).image ||
              (doctor.slug === 'dr-q-h-khan' || doctor.isDeceased
                ? '/images/dr-qh-khan.png'
                : doctor.slug === 'dr-i-khan'
                ? '/images/dr-i-khan.png'
                : doctor.slug === 'dr-adeeba-farheen' || doctor.name?.includes('Adeeba') || doctor.name?.includes('अदीबा')
                ? '/images/dr-adeeba-farheen.png'
                : '/images/dr-adeeba-farheen.png')
            }
            alt={doctor.name}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              if (doctor.isDeceased || doctor.slug === 'dr-q-h-khan') {
                (e.target as HTMLImageElement).src = '/images/dr-qh-khan.png';
              } else if (doctor.slug === 'dr-i-khan') {
                (e.target as HTMLImageElement).src = '/images/dr-i-khan.png';
              } else if (doctor.name?.includes('Adeeba') || doctor.name?.includes('अदीबा') || doctor.slug === 'dr-adeeba-farheen') {
                (e.target as HTMLImageElement).src = '/images/dr-adeeba-farheen.png';
              } else {
                (e.target as HTMLImageElement).src = '/images/dr-adeeba-farheen.png';
              }
            }}
          />
          
          {/* Overlay Status & Verification Badges */}
          <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
            {doctor.isDeceased && (
              <span className="inline-flex items-center text-[10px] font-black bg-slate-950/90 text-[#F5B800] px-3 py-1 rounded-full border border-[#F5B800]/40 backdrop-blur-md uppercase tracking-wider shadow-md">
                {lang === 'hi' ? 'स्मृति में' : 'In Memoriam'}
              </span>
            )}
            {doctor.registrationNumber && (
              <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold bg-[#120146]/90 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/50 backdrop-blur-md shadow-md">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                {lang === 'hi' ? `रजिस्ट्रेशन: ${doctor.registrationNumber.replace('Reg. ', '').replace('पंजीकरण संख्या ', '')}` : doctor.registrationNumber}
              </span>
            )}
          </div>
        </div>

        {/* Doctor Details */}
        <div className="space-y-1.5">
          <h3 className="font-heading font-black text-[#120146] text-xl sm:text-2xl leading-snug tracking-tight group-hover:text-[#1F0270] transition-colors">
            {doctor.name}
          </h3>
          <div className="inline-block bg-[#1F0270]/10 border border-[#1F0270]/20 text-[#1F0270] text-[11px] sm:text-xs font-black uppercase tracking-wider px-3 py-1 rounded-lg">
            {doctor.designation}
          </div>
        </div>

        {/* Qualifications & Specialties */}
        <div className="text-slate-700 space-y-2 border-t border-slate-100 pt-3 text-xs sm:text-[13px] font-semibold">
          <p className="flex items-start gap-1.5">
            <Award className="w-4 h-4 text-[#F5B800] shrink-0 mt-0.5" />
            <span>
              <strong className="text-[#120146] font-extrabold">{lang === 'hi' ? 'योग्यता:' : 'Degrees:'}</strong>{' '}
              <span className="text-slate-900 font-bold">{doctor.degrees?.join(', ')}</span>
            </span>
          </p>
          <p className="flex items-start gap-1.5">
            <UserCheck className="w-4 h-4 text-[#1F0270] shrink-0 mt-0.5" />
            <span>
              <strong className="text-[#120146] font-extrabold">{lang === 'hi' ? 'विशेषज्ञता:' : 'Specialty:'}</strong>{' '}
              <span className="text-slate-900 font-bold">{doctor.specialization}</span>
            </span>
          </p>
        </div>

        {/* Short Biography */}
        <p className="text-slate-600 text-xs leading-relaxed font-medium line-clamp-3 bg-slate-50/80 p-3 rounded-xl border border-slate-100">
          {doctor.bio}
        </p>

      </div>

      {/* Footer Actions */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-4">
        {doctor.isDeceased ? (
          <>
            <Link
              href={`/doctors/${doctor.slug}`}
              className="text-xs font-extrabold text-slate-600 hover:text-slate-800 hover:underline flex items-center gap-1.5"
            >
              <UserCheck className="w-4 h-4 text-[#1F0270]" /> {lang === 'hi' ? 'जीवन इतिहास' : 'Legacy Profile'}
            </Link>
            <span className="px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-600 text-xs font-black select-none uppercase tracking-wider">
              {lang === 'hi' ? 'संस्थापक' : 'Founder'}
            </span>
          </>
        ) : (
          <>
            <Link
              href={`/doctors/${doctor.slug}`}
              className="text-xs font-extrabold text-[#1F0270] hover:text-[#120146] hover:underline flex items-center gap-1.5"
            >
              <UserCheck className="w-4 h-4 text-[#1F0270]" /> {lang === 'hi' ? 'समय सारणी' : 'View Schedule'}
            </Link>
            <Link
              href="/appointment"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#F5B800] to-[#EAB308] text-[#120146] text-xs font-black shadow-sm hover:from-[#EAB308] hover:to-[#D99B00] transition-all flex items-center gap-1.5 uppercase tracking-wide border border-[#F5B800]/50"
            >
              <Calendar className="w-4 h-4" /> {lang === 'hi' ? 'बुक करें' : 'Book'}
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
