'use client';

import React from 'react';
import Link from 'next/link';
import { 
  UserCheck, 
  Calendar, 
  ShieldCheck, 
  Award, 
  GraduationCap, 
  Stethoscope, 
  Clock, 
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { IDoctorProfile } from '@hospital/shared-types';
import { useLanguage } from '../lib/language-context';
import { getApiBaseUrl } from '../lib/api-client';

export const DoctorCard: React.FC<{ doctor: Partial<IDoctorProfile> }> = ({ doctor }) => {
  const { lang } = useLanguage();

  const getDoctorImageSrc = () => {
    let rawImg = (doctor as any).photoUrl || (doctor as any).image || (doctor as any).imageUrl || (doctor as any).photo;

    if (doctor.slug === 'dr-adeeba-farheen' || doctor.name?.includes('Adeeba') || doctor.name?.includes('अदीबा')) {
      return '/images/dr-adeeba-farheen.png';
    }

    if (rawImg && typeof rawImg === 'string' && rawImg.trim() !== '') {
      rawImg = rawImg.trim();
      if (rawImg.includes('localhost:5000') || rawImg.includes('127.0.0.1:5000')) {
        const apiBase = getApiBaseUrl();
        const backendOrigin = apiBase.replace(/\/api\/?$/, '');
        rawImg = rawImg.replace(/http:\/\/(localhost|127\.0\.0\.1):5000/g, backendOrigin);
      }
      if (rawImg.includes('dr-adeeba-farheen')) {
        return '/images/dr-adeeba-farheen.png';
      }
      if (rawImg.startsWith('/') || rawImg.startsWith('http://') || rawImg.startsWith('https://') || rawImg.startsWith('data:')) {
        return rawImg;
      }
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
    <div className="group relative bg-gradient-to-b from-white via-slate-50/50 to-slate-100/60 rounded-3xl p-6 border border-slate-200/90 hover:border-clinic-crimson/40 shadow-sm hover:shadow-2xl hover:shadow-rose-950/10 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between space-y-5 w-full overflow-hidden before:absolute before:top-0 before:left-0 before:w-full before:h-1.5 before:bg-gradient-to-r before:from-clinic-crimson before:via-amber-500 before:to-clinic-crimson before:opacity-0 hover:before:opacity-100 before:transition-opacity">
      
      <div className="space-y-5">
        
        {/* Luxury Professional Portrait Frame */}
        <div className="relative w-full h-72 bg-slate-900 rounded-2xl overflow-hidden border border-slate-200/80 shadow-md">
          <img
            src={getDoctorImageSrc()}
            alt={doctor.name || 'Doctor'}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
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

          {/* Subtle Bottom Vignette Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
          
          {/* Overlay Status & Verification Badges */}
          <div className="absolute top-3.5 right-3.5 flex flex-col gap-1.5 items-end">
            {doctor.isDeceased && (
              <span className="inline-flex items-center text-[10px] font-black bg-slate-950/90 text-slate-100 px-3 py-1 rounded-full border border-slate-700 backdrop-blur-md uppercase tracking-wider shadow-lg">
                {lang === 'hi' ? 'स्मृति में' : 'In Memoriam'}
              </span>
            )}
            {doctor.registrationNumber && (
              <span className="inline-flex items-center gap-1.5 text-[10px] font-black bg-slate-950/90 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/40 backdrop-blur-md shadow-xl tracking-wide">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                {lang === 'hi' ? `रजिस्ट्रेशन: ${doctor.registrationNumber.replace('Reg. ', '').replace('पंजीकरण संख्या ', '')}` : doctor.registrationNumber}
              </span>
            )}
          </div>
        </div>

        {/* Doctor Header & Designation */}
        <div className="space-y-1.5">
          <h3 className="font-black text-slate-900 text-xl leading-tight tracking-tight group-hover:text-clinic-crimson transition-colors">
            {doctor.name}
          </h3>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-block px-3 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200/80 text-[10px] font-black uppercase tracking-wider shadow-2xs">
              {doctor.designation}
            </span>
          </div>
        </div>

        {/* Qualifications & Specialties Card Section */}
        <div className="bg-white/80 border border-slate-200/80 rounded-2xl p-3.5 space-y-2.5 text-xs text-slate-700 shadow-2xs">
          <div className="flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-clinic-crimson/10 flex items-center justify-center shrink-0 mt-0.5">
              <GraduationCap className="w-3.5 h-3.5 text-clinic-crimson" />
            </div>
            <p className="leading-snug">
              <strong className="text-slate-900 font-extrabold block text-[11px] uppercase tracking-wide">
                {lang === 'hi' ? 'योग्यता & डिग्री' : 'Degrees & Qualifications'}
              </strong>
              <span className="text-slate-600 font-semibold">{doctor.degrees?.join(', ')}</span>
            </p>
          </div>

          <div className="flex items-start gap-2.5 pt-2 border-t border-slate-100">
            <div className="w-6 h-6 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0 mt-0.5">
              <Stethoscope className="w-3.5 h-3.5 text-amber-700" />
            </div>
            <p className="leading-snug">
              <strong className="text-slate-900 font-extrabold block text-[11px] uppercase tracking-wide">
                {lang === 'hi' ? 'विशेषज्ञता क्षेत्र' : 'Specialty Focus'}
              </strong>
              <span className="text-slate-600 font-semibold">{doctor.specialization}</span>
            </p>
          </div>
        </div>

        {/* Short Biography */}
        <p className="text-slate-600 text-xs leading-relaxed font-medium line-clamp-3">
          {doctor.bio}
        </p>

      </div>

      {/* Footer Actions Row */}
      <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between gap-3">
        {doctor.isDeceased ? (
          <>
            <Link
              href={`/doctors/${doctor.slug}`}
              className="text-xs font-extrabold text-slate-600 hover:text-clinic-crimson transition-colors inline-flex items-center gap-1.5"
            >
              <UserCheck className="w-4 h-4 text-slate-400" /> 
              <span>{lang === 'hi' ? 'जीवन इतिहास' : 'Legacy Profile'}</span>
            </Link>
            <span className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 text-xs font-black uppercase tracking-wider select-none">
              {lang === 'hi' ? 'संस्थापक' : 'Founder'}
            </span>
          </>
        ) : (
          <>
            <Link
              href={`/doctors/${doctor.slug}`}
              className="text-xs font-extrabold text-slate-700 hover:text-clinic-crimson transition-colors inline-flex items-center gap-1.5"
            >
              <Clock className="w-4 h-4 text-clinic-crimson" /> 
              <span>{lang === 'hi' ? 'समय सारणी' : 'View Schedule'}</span>
            </Link>

            <Link
              href="/appointment"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-clinic-crimson to-rose-700 hover:from-rose-700 hover:to-clinic-crimson text-white text-xs font-black shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-1.5"
            >
              <Calendar className="w-4 h-4" /> 
              <span>{lang === 'hi' ? 'अपॉइंटमेंट लें' : 'Book Consult'}</span>
            </Link>
          </>
        )}
      </div>

    </div>
  );
};
