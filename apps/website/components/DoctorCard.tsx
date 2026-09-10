'use client';

import React from 'react';
import Link from 'next/link';
import { UserCheck, Calendar, ShieldCheck, Award } from 'lucide-react';
import { IDoctorProfile } from '@hospital/shared-types';
import { useLanguage } from '../lib/language-context';
import { getApiBaseUrl } from '../lib/api-client';

export const DoctorCard: React.FC<{ doctor: Partial<IDoctorProfile> }> = ({ doctor }) => {
  const { lang } = useLanguage();

  const getDoctorImageSrc = () => {
    let rawImg = (doctor as any).image || (doctor as any).imageUrl || (doctor as any).photo;
    if (rawImg && typeof rawImg === 'string' && rawImg.trim() !== '') {
      rawImg = rawImg.trim();
      if (rawImg.includes('localhost:5000') || rawImg.includes('127.0.0.1:5000')) {
        const apiBase = getApiBaseUrl();
        const backendOrigin = apiBase.replace(/\/api\/?$/, '');
        rawImg = rawImg.replace(/http:\/\/(localhost|127\.0\.0\.1):5000/g, backendOrigin);
      }
      if (rawImg.startsWith('/') || rawImg.startsWith('http://') || rawImg.startsWith('https://') || rawImg.startsWith('data:')) {
        return rawImg;
      }
    }

    if (doctor.slug === 'dr-adeeba-farheen' || doctor.name?.includes('Adeeba') || doctor.name?.includes('अदीबा')) {
      return '/images/dr-adeeba-farheen.png';
    }
    if (doctor.isDeceased || doctor.slug === 'dr-q-h-khan' || doctor.name?.includes('Q.H.')) {
      return '/images/dr-qh-khan.png';
    }
    if (doctor.slug === 'dr-i-khan' || doctor.name?.includes('I. Khan') || doctor.name?.includes('Irfan')) {
      return '/images/dr-i-khan.png';
    }

    return '/images/dr-i-khan.png';
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-slate-300 transition-all space-y-4 flex flex-col justify-between text-xs font-semibold">
      <div className="space-y-4">
        
        {/* Professional Portrait Container */}
        <div className="relative w-full h-64 bg-slate-50 rounded-xl overflow-hidden border border-slate-200/60 shadow-inner group">
          <img
            src={getDoctorImageSrc()}
            alt={doctor.name || 'Doctor'}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (doctor.slug === 'dr-adeeba-farheen' || doctor.name?.includes('Adeeba') || doctor.name?.includes('अदीबा')) {
                target.src = '/images/dr-adeeba-farheen.png';
              } else if (doctor.isDeceased || doctor.slug === 'dr-q-h-khan' || doctor.name?.includes('Q.H.')) {
                target.src = '/images/dr-qh-khan.png';
              } else {
                target.src = '/images/dr-i-khan.png';
              }
            }}
          />
          
          {/* Overlay Status & Verification Badges */}
          <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
            {doctor.isDeceased && (
              <span className="inline-flex items-center text-[9px] font-extrabold bg-slate-900/80 text-slate-100 px-2.5 py-0.5 rounded-full border border-slate-700 backdrop-blur-sm uppercase tracking-wider">
                {lang === 'hi' ? 'स्मृति में' : 'In Memoriam'}
              </span>
            )}
            {doctor.registrationNumber && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-slate-900/85 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/40 backdrop-blur-sm shadow-md">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                {lang === 'hi' ? `रजिस्ट्रेशन: ${doctor.registrationNumber.replace('Reg. ', '').replace('पंजीकरण संख्या ', '')}` : doctor.registrationNumber}
              </span>
            )}
          </div>
        </div>

        {/* Doctor Details */}
        <div className="space-y-1">
          <h3 className="font-bold text-slate-900 text-lg leading-tight tracking-tight">{doctor.name}</h3>
          <p className="text-xs font-bold text-clinic-indigo uppercase tracking-wider">{doctor.designation}</p>
        </div>

        {/* Qualifications & Specialties */}
        <div className="text-slate-655 space-y-1.5 border-t border-slate-100 pt-3">
          <p className="flex items-start gap-1">
            <Award className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <span>
              <strong className="text-slate-700">{lang === 'hi' ? 'योग्यता:' : 'Degrees:'}</strong>{' '}
              {doctor.degrees?.join(', ')}
            </span>
          </p>
          <p className="flex items-start gap-1">
            <UserCheck className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <span>
              <strong className="text-slate-700">{lang === 'hi' ? 'विशेषज्ञता:' : 'Specialty:'}</strong>{' '}
              {doctor.specialization}
            </span>
          </p>
        </div>

        {/* Short Biography */}
        <p className="text-slate-500 text-[11px] leading-relaxed font-medium line-clamp-3">
          {doctor.bio}
        </p>

      </div>

      {/* Footer Actions */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-4">
        {doctor.isDeceased ? (
          <>
            <Link
              href={`/doctors/${doctor.slug}`}
              className="text-xs font-bold text-slate-500 hover:text-slate-700 hover:underline flex items-center gap-1.5"
            >
              <UserCheck className="w-4 h-4" /> {lang === 'hi' ? 'जीवन इतिहास' : 'Legacy Profile'}
            </Link>
            <span className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-400 text-xs font-bold select-none">
              {lang === 'hi' ? 'संस्थापक' : 'Founder'}
            </span>
          </>
        ) : (
          <>
            <Link
              href={`/doctors/${doctor.slug}`}
              className="text-xs font-bold text-clinic-indigo hover:text-clinic-violet hover:underline flex items-center gap-1.5"
            >
              <UserCheck className="w-4 h-4" /> {lang === 'hi' ? 'समय सारणी' : 'View Schedule'}
            </Link>
            <Link
              href="/appointment"
              className="px-3.5 py-2 rounded-lg bg-clinic-crimson text-white text-xs font-black shadow-sm hover:bg-amber-700 transition-colors flex items-center gap-1.5"
            >
              <Calendar className="w-4 h-4" /> {lang === 'hi' ? 'बुक करें' : 'Book'}
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
