'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, AlertTriangle, Shield, Sparkles, Activity, Stethoscope, HeartPulse, Dna, Wind } from 'lucide-react';
import { TreatmentItem } from '../lib/clinicConfig';
import { useLanguage } from '../lib/language-context';

export const TreatmentCard: React.FC<{ treatment: TreatmentItem }> = ({ treatment }) => {
  const { lang } = useLanguage();

  const getCategoryName = (cat: string) => {
    if (lang !== 'hi') return cat;
    switch (cat) {
      case 'Skin & Dermatology': return 'त्वचा एवं सौंदर्य';
      case 'Trichology & Hair Care': return 'केश एवं बाल रोग';
      case 'Urology & Internal Medicine': return 'मूत्र रोग और आंतरिक चिकित्सा';
      case 'Anorectal Care': return 'बवासीर एवं गुदा रोग';
      case 'Lymphatic & General Medicine': return 'ग्रंथि एवं सामान्य चिकित्सा';
      case 'ENT Healthcare': return 'नाक, कान, गला';
      case 'Gastroenterology': return 'उदर एवं पाचन रोग';
      default: return cat;
    }
  };

  const getTreatmentIcon = (slug: string) => {
    // Return custom mapped Lucide icons using the brand's Racing Red color (#DD0200)
    switch (slug) {
      case 'psoriasis':
        return <Shield className="w-5 h-5 text-[#DD0200]" />;
      case 'gray-hair-premature-greying':
        return <Sparkles className="w-5 h-5 text-[#DD0200]" />;
      case 'eczema':
        return <Activity className="w-5 h-5 text-[#DD0200]" />;
      case 'stricture-urethral-oesophageal':
        return <Stethoscope className="w-5 h-5 text-[#DD0200]" />;
      case 'piles-haemorrhoids':
        return <HeartPulse className="w-5 h-5 text-[#DD0200]" />;
      case 'glandular-swelling':
        return <Dna className="w-5 h-5 text-[#DD0200]" />;
      case 'adenoids':
        return <Wind className="w-5 h-5 text-[#DD0200]" />;
      case 'appendicitis-consultation-support':
        return <AlertTriangle className="w-5 h-5 text-[#DD0200]" />;
      default:
        return <Stethoscope className="w-5 h-5 text-[#DD0200]" />;
    }
  };

  return (
    <div className="group bg-white rounded-2xl p-5 border border-[#D9D9D9] hover:border-[#55100D]/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-4">
      <div>
        
        {/* Top Header Row with Icon Frame & Tags */}
        <div className="flex items-start justify-between gap-3 mb-3">
          
          {/* Circular Icon Frame */}
          <div className="w-10 h-10 rounded-xl bg-[#55100D]/5 border border-[#55100D]/10 flex items-center justify-center shrink-0">
            {getTreatmentIcon(treatment.slug)}
          </div>

          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#55100D] bg-[#55100D]/5 border border-[#55100D]/10 px-2 py-0.5 rounded-full">
              {getCategoryName(treatment.category)}
            </span>
            {treatment.isSeriousCondition && (
              <span className="inline-flex items-center gap-1 text-[9px] font-extrabold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded-full border border-amber-200">
                <AlertTriangle className="w-2.5 h-2.5 text-amber-700" /> {lang === 'hi' ? 'चिकित्सा सूचना' : 'Medical Notice'}
              </span>
            )}
          </div>

        </div>

        {/* Headings */}
        <h3 className="font-extrabold text-[#1A0706] text-base group-hover:text-[#55100D] transition-colors leading-snug">
          {lang === 'hi' ? treatment.nameHi : treatment.nameEn}
        </h3>
        {lang !== 'hi' && (
          <p className="text-[11px] font-bold text-[#55100D] mt-0.5">
            {treatment.nameHi}
          </p>
        )}

        <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mt-2 font-medium">
          {treatment.description}
        </p>
      </div>

      {/* Footer Read Info link */}
      <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold">
        <Link
          href={`/treatments/${treatment.slug}`}
          className="text-[#55100D] hover:text-[#DD0200] inline-flex items-center gap-1.5 transition-colors"
        >
          <span>{lang === 'hi' ? 'जानकारी पढ़ें' : 'Read Information'}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
