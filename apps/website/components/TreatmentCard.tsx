'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, AlertTriangle } from 'lucide-react';
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

  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:border-clinic-indigo/40 transition-all flex flex-col justify-between space-y-3">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-clinic-indigo bg-clinic-indigo/10 px-2 py-0.5 rounded">
            {getCategoryName(treatment.category)}
          </span>
          {treatment.isSeriousCondition && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
              <AlertTriangle className="w-3 h-3" /> {lang === 'hi' ? 'चिकित्सा सूचना' : 'Medical Notice'}
            </span>
          )}
        </div>

        <h3 className="font-bold text-slate-900 text-base group-hover:text-clinic-indigo transition-colors">
          {lang === 'hi' ? treatment.nameHi : treatment.nameEn}
        </h3>
        {lang !== 'hi' && (
          <p className="text-xs font-semibold text-clinic-indigo mb-2">
            {treatment.nameHi}
          </p>
        )}

        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {treatment.description}
        </p>
      </div>

      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
        <Link
          href={`/treatments/${treatment.slug}`}
          className="font-semibold text-clinic-indigo hover:text-clinic-violet inline-flex items-center gap-1"
        >
          <span>{lang === 'hi' ? 'जानकारी पढ़ें' : 'Read Information'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
