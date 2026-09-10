'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, AlertTriangle, Shield, Sparkles, Activity, Stethoscope, HeartPulse, Dna, Wind, Brain } from 'lucide-react';
import { TreatmentItem } from '../lib/clinicConfig';
import { useLanguage } from '../lib/language-context';

export const TreatmentCard: React.FC<{ treatment: TreatmentItem }> = ({ treatment }) => {
  const { lang } = useLanguage();

  const getCategoryName = (cat: string) => {
    // Simplify category strings so badges never overflow card borders
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
        return <Brain className="w-5 h-5 text-[#1F0270]" />;
      case 'psoriasis':
        return <Shield className="w-5 h-5 text-[#1F0270]" />;
      case 'gray-hair':
      case 'gray-hair-premature-greying':
        return <Sparkles className="w-5 h-5 text-[#F5B800]" />;
      case 'eczema':
        return <Activity className="w-5 h-5 text-[#1F0270]" />;
      case 'stricture':
      case 'stricture-urethral-oesophageal':
        return <Stethoscope className="w-5 h-5 text-[#1F0270]" />;
      case 'piles':
      case 'piles-haemorrhoids':
        return <HeartPulse className="w-5 h-5 text-[#1F0270]" />;
      case 'gland':
      case 'glandular-swelling':
        return <Dna className="w-5 h-5 text-[#1F0270]" />;
      case 'adenoids':
        return <Wind className="w-5 h-5 text-[#1F0270]" />;
      case 'appendicitis':
      case 'appendicitis-consultation-support':
        return <AlertTriangle className="w-5 h-5 text-[#F5B800]" />;
      default:
        return <Stethoscope className="w-5 h-5 text-[#1F0270]" />;
    }
  };

  const getTargetBadge = (target?: string) => {
    if (!target || target === 'General') return null;
    if (target === 'Male') {
      return (
        <span className="text-[10px] font-black uppercase tracking-wider text-blue-950 bg-blue-100/90 border border-blue-300 px-2.5 py-0.5 rounded-full shrink-0 shadow-2xs">
          {lang === 'hi' ? 'पुरुष रोग' : 'Male Health'}
        </span>
      );
    }
    if (target === 'Female') {
      return (
        <span className="text-[10px] font-black uppercase tracking-wider text-rose-950 bg-rose-100/90 border border-rose-300 px-2.5 py-0.5 rounded-full shrink-0 shadow-2xs">
          {lang === 'hi' ? 'महिला रोग' : 'Women\'s Care'}
        </span>
      );
    }
    if (target === 'Children') {
      return (
        <span className="text-[10px] font-black uppercase tracking-wider text-emerald-950 bg-emerald-100/90 border border-emerald-300 px-2.5 py-0.5 rounded-full shrink-0 shadow-2xs">
          {lang === 'hi' ? 'बाल रोग' : 'Pediatric Care'}
        </span>
      );
    }
    if (target === 'Mental') {
      return (
        <span className="text-[10px] font-black uppercase tracking-wider text-purple-950 bg-purple-100/90 border border-purple-300 px-2.5 py-0.5 rounded-full shrink-0 shadow-2xs">
          {lang === 'hi' ? 'मानसिक रोग' : 'Mental & Brain'}
        </span>
      );
    }
    return null;
  };

  return (
    <div className="group bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 hover:border-[#1F0270]/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 w-full overflow-hidden">
      <div>
        
        {/* Top Header Row with Icon Frame & Tags */}
        <div className="flex items-start justify-between gap-2 mb-3.5">
          
          {/* Icon Frame */}
          <div className="w-11 h-11 rounded-xl bg-[#1F0270]/10 border border-[#1F0270]/20 flex items-center justify-center shrink-0 shadow-2xs">
            {getTreatmentIcon(treatment.slug)}
          </div>

          <div className="flex flex-col items-end gap-1.5 min-w-0 max-w-[65%] text-right overflow-hidden">
            {getTargetBadge(treatment.targetGroup)}
            <span className="text-[10px] font-black uppercase tracking-wider text-[#120146] bg-[#1F0270]/10 border border-[#1F0270]/20 px-2.5 py-0.5 rounded-full truncate max-w-full">
              {getCategoryName(treatment.category)}
            </span>
            {treatment.isSeriousCondition && (
              <span className="inline-flex items-center gap-1 text-[9px] font-extrabold text-[#120146] bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300 shrink-0">
                <AlertTriangle className="w-3 h-3 text-[#F5B800]" /> {lang === 'hi' ? 'चिकित्सा सूचना' : 'Medical Notice'}
              </span>
            )}
          </div>

        </div>

        {/* Headings */}
        <h3 className="font-sans font-black text-[#120146] text-lg sm:text-xl group-hover:text-[#1F0270] transition-colors leading-snug tracking-tight">
          {lang === 'hi' ? treatment.nameHi : treatment.nameEn}
        </h3>
        {lang !== 'hi' && (
          <p className="text-xs font-extrabold text-[#1F0270] mt-1 tracking-normal">
            {treatment.nameHi}
          </p>
        )}

        <p className="text-xs sm:text-[13px] text-slate-700 line-clamp-3 leading-relaxed mt-2.5 font-medium">
          {treatment.description}
        </p>
      </div>

      {/* Footer Read Info link */}
      <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs font-bold">
        <Link
          href={`/treatments/${treatment.slug}`}
          className="text-[#1F0270] hover:text-[#2E0AB0] inline-flex items-center gap-1.5 transition-colors font-black text-xs sm:text-sm"
        >
          <span>{lang === 'hi' ? 'जानकारी पढ़ें' : 'Read Information'}</span>
          <ArrowRight className="w-4 h-4 text-[#F5B800]" />
        </Link>
      </div>
    </div>
  );
};
