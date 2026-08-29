'use client';

import React, { useState } from 'react';
import { TreatmentCard } from '../../components/TreatmentCard';
import { treatmentsData } from '../../lib/clinicConfig';
import { useLanguage } from '../../lib/language-context';
import { Search, Filter, ShieldAlert, FileText, CheckCircle2 } from 'lucide-react';

export default function TreatmentsPage() {
  const { lang } = useLanguage();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Standard category labels
  const getCategoryLabel = (category: string) => {
    if (lang === 'hi') {
      switch (category.toLowerCase()) {
        case 'dermatology': return 'त्वचा रोग (Dermatology)';
        case 'gastrointestinal': return 'उदर एवं पाचन (Gastrointestinal)';
        case 'respiratory': return 'श्वसन तंत्र (Respiratory)';
        case 'chronic illness': return 'क्रोनिक बीमारियां (Chronic Illness)';
        case 'urinary': return 'मूत्र संबंधी रोग (Urinary)';
        default: return category;
      }
    }
    return category;
  };

  const categories = ['All', ...Array.from(new Set(treatmentsData.map((t) => t.category)))];

  const filteredTreatments = treatmentsData.filter((t) => {
    const matchesSearch =
      t.nameEn.toLowerCase().includes(search.toLowerCase()) ||
      t.nameHi.includes(search) ||
      t.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-xs font-semibold">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-clinic-indigo/5 border border-clinic-indigo/15 text-clinic-indigo text-xs font-bold uppercase tracking-wider">
          {lang === 'hi' ? 'चिकित्सीय परामर्श निर्देशिका' : 'CLINICAL CONSULTATION DIRECTORY'}
        </span>
        <h1 className="text-3xl font-black text-slate-900 leading-none">
          {lang === 'hi' ? 'स्वास्थ्य परामर्श एवं चिकित्सा क्षेत्र' : 'Conditions & Clinical Focus Areas'}
        </h1>
        <p className="text-slate-655 text-xs sm:text-sm leading-relaxed font-medium">
          {lang === 'hi'
            ? 'उन प्रमुख रोगों की सूची जिनके लिए हमारा क्लिनिक संवैधानिक होम्योपैथी परामर्श और दीर्घकालिक स्वास्थ्य सहायता प्रदान करता है।'
            : 'Browse the medical conditions for which our clinical team provides specialized, constitutional homeopathic consultations.'}
        </p>
      </div>

      {/* Emergency Warning Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-4 text-xs font-medium text-amber-900">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="font-bold text-sm block">
            {lang === 'hi' ? 'महत्वपूर्ण चिकित्सा चेतावनी (Emergency Alert):' : 'Important Emergency & Referrals Warning:'}
          </strong>
          <p className="leading-relaxed">
            {lang === 'hi'
              ? 'हम कैंसर, मस्तिष्क ट्यूमर, गंभीर दिल का दौरा, तीव्र एपेंडिसाइटिस, या अन्य तत्काल सर्जिकल आपात स्थितियों के इलाज का दावा नहीं करते हैं। ऐसी किसी भी तीव्र आपातकालीन स्थिति में तुरंत नजदीकी मल्टी-स्पेशियलिटी अस्पताल की आपातकालीन इकाई (Emergency Department) से संपर्क करें।'
              : 'Our clinic does NOT treat surgical emergencies, active heart attacks, stroke, cancer, or acute life-threatening situations. For any emergency medical conditions, please proceed immediately to the nearest tertiary hospital emergency care department.'}
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder={
              lang === 'hi'
                ? 'बीमारी खोजें (जैसे सोरायसिस, बवासीर, सफेद दाग)...'
                : 'Search condition (e.g. Psoriasis, Piles, Stricture)...'
            }
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-slate-350"
          />
        </div>

        <div className="flex items-center space-x-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <Filter className="w-4 h-4 text-slate-500 shrink-0" />
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors border ${
                selectedCategory === cat
                  ? 'bg-clinic-indigo border-clinic-indigo text-white shadow-sm'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {cat === 'All' ? (lang === 'hi' ? 'सभी' : 'All') : getCategoryLabel(cat)}
            </button>
          ))}
        </div>
      </div>

      {/* Treatment Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {filteredTreatments.map((t, idx) => (
          <TreatmentCard key={idx} treatment={t} />
        ))}
      </div>

      {filteredTreatments.length === 0 && (
        <div className="text-center py-16 text-slate-500 text-xs font-medium">
          {lang === 'hi'
            ? 'आपकी खोज के अनुकूल कोई बीमारी नहीं मिली। कृपया अंग्रेजी या हिंदी नाम टाइप करें।'
            : 'No health conditions matching your search query. Try searching with a different term.'}
        </div>
      )}

      {/* Case Intake Protocol Advice */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <FileText className="w-5 h-5 text-clinic-indigo shrink-0" />
          <h3 className="text-sm font-bold text-slate-900">
            {lang === 'hi' ? 'चिकित्सीय केस मूल्यांकन नियमावली' : 'Clinical Evaluation Protocol'}
          </h3>
        </div>
        <p className="text-slate-655 leading-relaxed text-xs font-medium">
          {lang === 'hi'
            ? 'होम्योपैथी में बीमारी के नाम के अलावा रोगी की व्यक्तिगत शारीरिक और मानसिक संवेदनशीलता महत्वपूर्ण होती है। हमारे डॉक्टर आपकी पूरी केस स्टडी करने के बाद ही कोई नुस्खा तैयार करेंगे। अपनी पिछली सभी मेडिकल रिपोर्ट्स और पर्चे साथ लाना न भूलें।'
            : 'In constitutional classical homeopathy, treatment selection depends heavily on the patients individual constitutional profile rather than the disease name alone. Our clinical specialists perform structured intake analyses to evaluate your unique health triggers before choosing a remedy potency.'}
        </p>
      </div>

    </div>
  );
}
