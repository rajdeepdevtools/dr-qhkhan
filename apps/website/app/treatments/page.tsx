'use client';

import React, { useState } from 'react';
import { TreatmentCard } from '../../components/TreatmentCard';
import { treatmentsData } from '../../lib/clinicConfig';
import { useLanguage } from '../../lib/language-context';
import { Search, Filter, ShieldAlert, FileText } from 'lucide-react';

export default function TreatmentsPage() {
  const { lang } = useLanguage();
  const [search, setSearch] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<'All' | 'Male' | 'Female' | 'Children' | 'General'>('All');

  const filteredTreatments = treatmentsData.filter((t) => {
    const matchesSearch =
      t.nameEn.toLowerCase().includes(search.toLowerCase()) ||
      t.nameHi.includes(search) ||
      t.category.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase());

    const matchesGroup = selectedGroup === 'All' || t.targetGroup === selectedGroup;

    return matchesSearch && matchesGroup;
  });

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-xs font-semibold">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#55100D]/5 border border-[#55100D]/15 text-[#55100D] text-xs font-bold uppercase tracking-wider">
          {lang === 'hi' ? 'चिकित्सीय परामर्श निर्देशिका' : 'CLINICAL CONSULTATION DIRECTORY'}
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-[#1A0706] leading-none tracking-tight">
          {lang === 'hi' ? 'डॉ. क्यू. एच. खान' : 'DR. Q.H. KHAN'}
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#55100D] to-[#DD0200] text-xl sm:text-2.5xl font-extrabold mt-2.5 tracking-wider">
            {lang === 'hi' ? 'पुरुष, महिला एवं बाल रोग चिकित्सा क्षेत्र' : 'MEN, WOMEN & PEDIATRIC CLINICAL FOCUS AREAS'}
          </span>
        </h1>
        <p className="text-slate-655 text-xs sm:text-sm leading-relaxed font-medium">
          {lang === 'hi'
            ? 'पुरुष स्वास्थ्य (प्रोस्टेट, बांझपन), महिला स्वास्थ्य (गर्भाशय, पीसीओडी), बाल रोग (टॉन्सिल, एडेनोइड्स) एवं क्रोनिक त्वचा रोगों के संवैधानिक उपचार की निर्देशिका।'
            : 'Browse constitutional homoeopathic care guidelines for Men\'s Health, Women\'s Health, Pediatric Care, and Chronic Skin conditions.'}
        </p>
      </div>

      {/* Emergency Warning Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-4 text-xs font-medium text-amber-900">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="font-bold text-sm block">
            {lang === 'hi' ? 'महत्वपूर्ण चिकित्सा चेतावनी (Emergency Alert):' : 'Important Emergency & Referrals Warning:'}
          </strong>
          <p className="leading-relaxed font-semibold">
            {lang === 'hi'
              ? 'हम कैंसर, मस्तिष्क ट्यूमर, गंभीर दिल का दौरा, तीव्र एपेंडिसाइटिस, या अन्य तत्काल सर्जिकल आपात स्थितियों के इलाज का दावा नहीं करते हैं। ऐसी किसी भी तीव्र आपातकालीन स्थिति में तुरंत नजदीकी मल्टी-स्पेशियलिटी अस्पताल की आपातकालीन इकाई (Emergency Department) से संपर्क करें।'
              : 'Our clinic does NOT treat surgical emergencies, active heart attacks, stroke, cancer, or acute life-threatening situations. For any emergency medical conditions, please proceed immediately to the nearest tertiary hospital emergency care department.'}
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-[#D9D9D9] shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
          <input
            type="text"
            placeholder={
              lang === 'hi'
                ? 'बीमारी खोजें (जैसे प्रोस्टेट, फाइब्रॉइड, एडेनोइड्स, सोरायसिस)...'
                : 'Search condition (e.g. Prostate, Fibroids, Adenoids, Psoriasis)...'
            }
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-[#D9D9D9] rounded-xl text-xs outline-none focus:bg-white focus:border-[#DD0200] focus:ring-1 focus:ring-[#DD0200]/25 font-bold transition-all"
          />
        </div>

        <div className="flex items-center space-x-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <Filter className="w-4 h-4 text-slate-500 shrink-0" />
          {[
            { id: 'All', labelEn: 'All Conditions', labelHi: 'सभी रोग' },
            { id: 'Male', labelEn: 'Male Health (पुरुष)', labelHi: 'पुरुष स्वास्थ्य' },
            { id: 'Female', labelEn: 'Women\'s Health (महिला)', labelHi: 'महिला स्वास्थ्य' },
            { id: 'Children', labelEn: 'Pediatric Care (बाल रोग)', labelHi: 'बाल रोग' },
            { id: 'Mental', labelEn: 'Mental & Brain (मानसिक)', labelHi: 'मानसिक व मस्तिष्क रोग' },
            { id: 'General', labelEn: 'Skin & General (त्वचा रोग)', labelHi: 'त्वचा एवं सामान्य' },
          ].map((grp) => (
            <button
              key={grp.id}
              onClick={() => setSelectedGroup(grp.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all border ${
                selectedGroup === grp.id
                  ? 'bg-gradient-to-r from-[#55100D] to-[#DD0200] border-[#55100D]/10 text-white shadow-sm'
                  : 'bg-slate-50 border-[#D9D9D9] text-slate-700 hover:bg-slate-100'
              }`}
            >
              {lang === 'hi' ? grp.labelHi : grp.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Treatment Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredTreatments.map((t, idx) => (
          <TreatmentCard key={idx} treatment={t} />
        ))}
      </div>

      {filteredTreatments.length === 0 && (
        <div className="text-center py-16 text-slate-500 text-xs font-bold bg-white border border-[#D9D9D9] rounded-2xl shadow-sm">
          {lang === 'hi'
            ? 'आपकी खोज के अनुकूल कोई बीमारी नहीं मिली। कृपया अंग्रेजी या हिंदी नाम टाइप करें।'
            : 'No health conditions matching your search query. Try searching with a different term.'}
        </div>
      )}

      {/* Case Intake Protocol Advice */}
      <div className="bg-white border border-[#D9D9D9] rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <FileText className="w-5 h-5 text-[#55100D] shrink-0" />
          <h3 className="text-sm font-black text-[#1A0706]">
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
