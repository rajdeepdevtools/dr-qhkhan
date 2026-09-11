'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  AlertTriangle, 
  ShieldCheck, 
  Sparkles, 
  Activity, 
  Stethoscope, 
  HeartPulse, 
  Dna, 
  Wind, 
  Brain,
  Zap,
  ShieldAlert,
  Flame,
  Baby,
  UserCheck,
  ChevronRight
} from 'lucide-react';
import { TreatmentItem } from '../lib/clinicConfig';
import { useLanguage } from '../lib/language-context';

export const TreatmentCard: React.FC<{ treatment: TreatmentItem }> = ({ treatment }) => {
  const { lang } = useLanguage();

  const getCategoryName = (cat: string) => {
    const cleanCat = cat
      .replace("Men's Health / ", "")
      .replace("Women's Health / ", "")
      .replace("Pediatric Care / ", "");

    if (lang !== 'hi') return cleanCat;
    switch (cleanCat.toLowerCase()) {
      case 'brain & mental health': return 'मस्तिष्क व मानसिक स्वास्थ्य';
      case 'skin & dermatology':
      case 'dermatology': return 'त्वचा एवं सौंदर्य';
      case 'trichology & hair care':
      case 'hair care': return 'केश व बाल रोग';
      case 'urology & internal medicine':
      case 'urology': return 'मूत्र रोग परामर्श';
      case 'anorectal care':
      case 'anorectal': return 'गुदा व बवासीर रोग';
      case 'lymphatic & general medicine':
      case 'general medicine': return 'सामान्य चिकित्सा';
      case 'ent healthcare':
      case 'ent':
      case 'ent care': return 'नाक, कान, गला';
      case 'gastroenterology':
      case 'gastro': return 'पाचन व उदर रोग';
      case 'gynaecology': return 'स्त्री रोग विशेषज्ञ';
      case 'reproductive':
      case 'reproductive care': return 'प्रजनन स्वास्थ्य';
      case 'pediatrics': return 'बाल रोग देखभाल';
      default: return cleanCat;
    }
  };

  const getTreatmentIcon = (slug: string) => {
    switch (slug) {
      case 'mental-health':
      case 'migraine-brain':
        return <Brain className="w-5 h-5 text-clinic-crimson group-hover:scale-110 transition-transform duration-300" />;
      case 'psoriasis':
        return <ShieldCheck className="w-5 h-5 text-clinic-crimson group-hover:scale-110 transition-transform duration-300" />;
      case 'gray-hair':
      case 'gray-hair-premature-greying':
        return <Sparkles className="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform duration-300" />;
      case 'eczema':
        return <Activity className="w-5 h-5 text-clinic-crimson group-hover:scale-110 transition-transform duration-300" />;
      case 'stricture':
      case 'stricture-urethral-oesophageal':
      case 'prostate-gland':
        return <Stethoscope className="w-5 h-5 text-clinic-crimson group-hover:scale-110 transition-transform duration-300" />;
      case 'piles':
      case 'piles-haemorrhoids':
        return <HeartPulse className="w-5 h-5 text-clinic-crimson group-hover:scale-110 transition-transform duration-300" />;
      case 'gland':
      case 'glandular-swelling':
        return <Dna className="w-5 h-5 text-purple-600 group-hover:scale-110 transition-transform duration-300" />;
      case 'adenoids':
        return <Wind className="w-5 h-5 text-sky-600 group-hover:scale-110 transition-transform duration-300" />;
      case 'appendicitis':
      case 'appendicitis-consultation-support':
        return <Flame className="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform duration-300" />;
      default:
        return <Stethoscope className="w-5 h-5 text-clinic-crimson group-hover:scale-110 transition-transform duration-300" />;
    }
  };

  const getTargetBadge = (target?: string) => {
    if (!target || target === 'General') return null;
    if (target === 'Male') {
      return (
        <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200/80 px-2.5 py-0.5 rounded-full shadow-2xs">
          {lang === 'hi' ? 'पुरुष स्वास्थ्य' : 'Male Health'}
        </span>
      );
    }
    if (target === 'Female') {
      return (
        <span className="text-[10px] font-black uppercase tracking-wider text-rose-700 bg-rose-50 border border-rose-200/80 px-2.5 py-0.5 rounded-full shadow-2xs">
          {lang === 'hi' ? 'महिला देखरेख' : 'Women\'s Care'}
        </span>
      );
    }
    if (target === 'Children') {
      return (
        <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-full shadow-2xs">
          {lang === 'hi' ? 'बाल स्वास्थ्य' : 'Pediatric Care'}
        </span>
      );
    }
    if (target === 'Mental') {
      return (
        <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 bg-purple-50 border border-purple-200/80 px-2.5 py-0.5 rounded-full shadow-2xs">
          {lang === 'hi' ? 'मानसिक रोग' : 'Mental & Brain'}
        </span>
      );
    }
    return null;
  };

  return (
    <div className="group relative bg-gradient-to-b from-white via-slate-50/40 to-slate-100/60 rounded-2xl p-6 border border-slate-200/90 hover:border-clinic-crimson/40 shadow-sm hover:shadow-xl hover:shadow-rose-950/5 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between space-y-4 w-full overflow-hidden before:absolute before:top-0 before:left-0 before:w-full before:h-1 before:bg-gradient-to-r before:from-clinic-crimson before:via-amber-500 before:to-clinic-crimson before:opacity-0 hover:before:opacity-100 before:transition-opacity">
      <div>
        
        {/* Top Header Row with Icon Frame & Tags */}
        <div className="flex items-start justify-between gap-3 mb-4">
          
          {/* Luxury Circular Icon Emblem */}
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-clinic-crimson/10 via-rose-50 to-amber-50 border border-clinic-crimson/20 shadow-sm group-hover:scale-105 group-hover:shadow-md group-hover:border-clinic-crimson/40 transition-all duration-300 flex items-center justify-center shrink-0">
            {getTreatmentIcon(treatment.slug)}
          </div>

          {/* Badges Container */}
          <div className="flex flex-col items-end gap-1.5 min-w-0 max-w-[68%] text-right">
            <div className="flex flex-wrap justify-end gap-1">
              {getTargetBadge(treatment.targetGroup)}
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-700 bg-slate-100/90 border border-slate-200/80 px-2.5 py-0.5 rounded-full truncate max-w-full shadow-2xs">
                {getCategoryName(treatment.category)}
              </span>
            </div>

            {treatment.isSeriousCondition && (
              <span className="inline-flex items-center gap-1 text-[9px] font-extrabold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 shrink-0">
                <AlertTriangle className="w-3 h-3 text-amber-600 shrink-0" /> {lang === 'hi' ? 'चिकित्सा सूचना' : 'Medical Notice'}
              </span>
            )}
          </div>

        </div>

        {/* Headings */}
        <h3 className="font-black text-slate-900 text-lg group-hover:text-clinic-crimson transition-colors leading-snug tracking-tight">
          {lang === 'hi' ? treatment.nameHi : treatment.nameEn}
        </h3>
        
        {lang !== 'hi' && (
          <p className="text-xs font-extrabold text-amber-800/90 mt-1 tracking-wide">
            {treatment.nameHi}
          </p>
        )}

        <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mt-2.5 font-medium">
          {treatment.description}
        </p>
      </div>

      {/* Footer Read Info CTA link */}
      <div className="pt-4 border-t border-slate-200/70 flex items-center justify-between">
        <Link
          href={`/treatments/${treatment.slug}`}
          className="group/btn inline-flex items-center gap-2 text-xs font-black text-clinic-crimson group-hover:text-clinic-crimson transition-all"
        >
          <span>{lang === 'hi' ? 'सम्पूर्ण जानकारी देखें' : 'Read Full Information'}</span>
          <div className="w-6 h-6 rounded-full bg-clinic-crimson/10 group-hover/btn:bg-clinic-crimson group-hover/btn:text-white flex items-center justify-center transition-all duration-300 transform group-hover/btn:translate-x-1 shadow-2xs">
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </Link>
      </div>
    </div>
  );
};
