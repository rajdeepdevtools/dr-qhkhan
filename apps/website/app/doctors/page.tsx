'use client';

import React from 'react';
import { DoctorCard } from '../../components/DoctorCard';
import { UserCheck, FileText, CheckCircle2, ShieldCheck, Clock, Award, Landmark, Stethoscope } from 'lucide-react';
import { useLanguage } from '../../lib/language-context';

export default function DoctorsPage() {
  const { lang } = useLanguage();

  const doctorsEn = [
    {
      slug: 'dr-q-h-khan',
      name: 'Late Dr. Q.H. Khan',
      degrees: ['B.H.M.S. (B.U.)', 'R.B.S.M.H.C.'],
      registrationNumber: 'Reg. 33454',
      specialization: 'Multi-Specialist & General Physician',
      designation: 'Founder (In Memoriam)',
      bio: 'Pioneer of classical homoeopathy in Gaya who founded this clinic in 1958. His clinical values and rigorous case-study methods continue to guide our active specialists.',
      image: '/images/dr-qh-khan.png',
      isDeceased: true,
    },
    {
      slug: 'dr-i-khan',
      name: 'Dr. I. Khan',
      degrees: ['B.H.M.S. (B.U.)', 'R.B.S. M.H.C.'],
      registrationNumber: 'Reg. 33454',
      specialization: 'General Physician & Chronic Disease Specialist',
      designation: 'Managing Director & General Physician',
      bio: 'Managing Director & General Physician with extensive experience in classical homoeopathy, specializing in chronic diseases, severe long-term illnesses, skin disorders, vitiligo, and private constitutional complaints.',
      image: '/images/dr-i-khan.png',
    },
    {
      slug: 'dr-adeeba-farheen',
      name: 'Dr. Adeeba Farheen',
      degrees: ['B.H.M.S. (B.U.)', 'M.D. (Physician)', 'G.D.M.C., Katihar, Patna'],
      registrationNumber: 'Reg. 31319',
      specialization: 'General Physician, Female Disorders (PCOD, Breast Lumps) & Normal Delivery Care',
      designation: 'Consultant Physician & Female Health Specialist',
      bio: 'General Physician and Female Healthcare consultant experienced in PCOD/PCOS, breast tumours/lumps, female health disorders, normal delivery consultation, and general medical conditions.',
      image: '/images/doctors/dr-adeeba-farheen.jpg',
    },
  ];

  const doctorsHi = [
    {
      slug: 'dr-q-h-khan',
      name: 'स्वर्गीय डॉ. क्यू. एच. खान',
      degrees: ['बी.एच.एम.एस. (बी.यू.)', 'आर.बी.एस.एम.एच.सी.'],
      registrationNumber: 'पंजीकरण संख्या 33454',
      specialization: 'मल्टी-स्पेशलिस्ट एवं जनरल फिजिशियन',
      designation: 'संस्थापक (स्मृति में)',
      bio: 'गया में क्लासिकल होम्योपैथी के अग्रदूत जिन्होंने 1958 में इस क्लिनिक की स्थापना की। उनके चिकित्सीय मूल्य और केस-अध्ययन के नियम आज भी हमारे सक्रिय डॉक्टरों का मार्गदर्शन करते हैं।',
      image: '/images/dr-qh-khan.png',
      isDeceased: true,
    },
    {
      slug: 'dr-i-khan',
      name: 'डॉ. आई. खान',
      degrees: ['बी.एच.एम.एस. (बी.यू.)', 'आर.बी.एस.एम.एच.सी.'],
      registrationNumber: 'पंजीकरण संख्या 33454',
      specialization: 'जनरल फिजिशियन, क्रोनिक एवं गंभीर रोग विशेषज्ञ',
      designation: 'प्रबंध निदेशक एवं जनरल फिजिशियन',
      bio: 'क्लिनिक के प्रबंध निदेशक एवं जनरल फिजिशियन, जो क्लासिकल होम्योपैथी में व्यापक अनुभव के साथ क्रोनिक बीमारियों, जटिल दीर्घकालिक रोगों, त्वचा विकारों, विटिलिगो और गुप्त रोगों के उपचार में विशेषज्ञ हैं।',
      image: '/images/dr-i-khan.png',
    },
    {
      slug: 'dr-adeeba-farheen',
      name: 'डॉ. अदीबा फरहीन',
      degrees: ['बी.एच.एम.एस. (बी.यू.)', 'एम.डी. (फिजिशियन)', 'जी.डी.एम.सी., कटिहार, पटना'],
      registrationNumber: 'पंजीकरण संख्या 31319',
      specialization: 'सामान्य फिजिशियन, महिला स्वास्थ्य (PCOD, स्तन गांठ/ट्यूमर) एवं सामान्य प्रसव परामर्श',
      designation: 'कंसल्टेंट फिजिशियन एवं महिला स्वास्थ्य विशेषज्ञ',
      bio: 'सामान्य फिजिशियन एवं महिला स्वास्थ्य परामर्शदाता, जो PCOD/PCOS, स्तन गांठ व ट्यूमर, महिला रोगों, सामान्य प्रसव मार्गदर्शन एवं सभी सामान्य बीमारियों के उपचार में अनुभवी हैं।',
      image: '/images/doctors/dr-adeeba-farheen.jpg',
    },
  ];

  const doctors = lang === 'hi' ? doctorsHi : doctorsEn;

  const checklistItems = [
    {
      titleEn: 'Chronological Symptom List',
      titleHi: 'लक्षणों की समय-सारणी',
      descEn: 'Write down when your symptoms first appeared, how they spread, and what makes them better or worse.',
      descHi: 'अपने लक्षणों के शुरू होने, उनके फैलने के तरीके और किस चीज से वे ठीक होते हैं या बढ़ते हैं, इसकी समय-सारणी तैयार रखें।'
    },
    {
      titleEn: 'Past Medical Test Reports',
      titleHi: 'पुराने मेडिकल टेस्ट रिकॉर्ड्स',
      descEn: 'Bring all previous clinical reports, skin biopsies, blood tests, and details of past suppressive ointments or treatments.',
      descHi: 'अपने पुराने नैदानिक परीक्षणों (biopsies, blood tests) की फाइल और पुरानी त्वचा क्रीमों या इलाजों की पर्ची साथ लाएं।'
    },
    {
      titleEn: 'Dietary & Lifestyle Habit Log',
      titleHi: 'आहार एवं जीवन शैली का विवरण',
      descEn: 'Note down your food preferences, sleep patterns, temperature sensitivities, and any recent psychological stress levels.',
      descHi: 'अपनी भोजन प्राथमिकताओं, नींद के पैटर्न, ठंडे/गर्म मौसम के प्रति संवेदनशीलता और हाल के मानसिक तनाव की जानकारी साझा करें।'
    }
  ];

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 text-xs font-semibold">
      
      {/* 1. Header Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#55100D]/5 border border-[#55100D]/15 text-[#55100D] text-xs font-bold uppercase tracking-wider">
          <UserCheck className="w-3.5 h-3.5" /> 
          {lang === 'hi' ? 'योग्य चिकित्सा टीम' : 'QUALIFIED CLINICAL TEAM'}
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-[#1A0706] leading-none tracking-tight">
          {lang === 'hi' ? 'डॉ. क्यू. एच. खान' : 'DR. Q.H. KHAN'}
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#55100D] to-[#DD0200] text-xl sm:text-2.5xl font-extrabold mt-2.5 tracking-wider">
            {lang === 'hi' ? 'चिकित्सा टीम और सलाहकार' : 'CLINICAL TEAM & CONSULTING ADVISORS'}
          </span>
        </h1>
        <p className="text-slate-650 text-xs sm:text-sm font-medium leading-relaxed max-w-xl mx-auto">
          {lang === 'hi'
            ? 'डॉ. क्यू.एच. खान क्लिनिक में सभी डॉक्टरों के पास वैध डिग्री और राज्य चिकित्सा परिषद के पंजीकरण नंबर हैं।'
            : 'All consulting doctors at Dr. Q.H. Khan Clinic hold valid degrees and qualifications. Official registration numbers are listed for transparency.'}
        </p>
      </div>

      {/* 2. Doctor Directory Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {doctors.map((doc, idx) => (
          <DoctorCard key={idx} doctor={doc} />
        ))}
      </div>

      {/* 3. Clinical Hours & Weekly Schedule Matrix */}
      <div className="bg-white border border-[#D9D9D9] rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <Clock className="w-5 h-5 text-[#55100D] shrink-0" />
          <div>
            <h3 className="text-sm font-black text-[#1A0706]">
              {lang === 'hi' ? 'परामर्श समय-सारणी' : 'Weekly Consultation Schedule'}
            </h3>
            <p className="text-[10px] text-slate-500 font-bold">
              {lang === 'hi' ? 'सप्ताह के दिनों के अनुसार डॉक्टरों की उपलब्धता' : 'Doctor availability times by weekdays'}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[11px] font-bold text-slate-700">
            <thead>
              <tr className="border-b border-slate-200 text-[#1A0706] text-xs">
                <th className="py-2.5 pr-4 font-extrabold">{lang === 'hi' ? 'चिकित्सक' : 'Practitioner'}</th>
                <th className="py-2.5 px-4 font-extrabold">{lang === 'hi' ? 'सोमवार - शनिवार' : 'Monday - Saturday'}</th>
                <th className="py-2.5 px-4 font-extrabold">{lang === 'hi' ? 'रविवार' : 'Sunday'}</th>
                <th className="py-2.5 pl-4 font-extrabold">{lang === 'hi' ? 'स्थान' : 'Location'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/60 font-semibold text-slate-650">
              <tr className="hover:bg-slate-50/50">
                <td className="py-4 pr-4 font-extrabold text-[#1A0706]">
                  {lang === 'hi' ? 'डॉ. आई. खान (प्रबंध निदेशक)' : 'Dr. I. Khan (Managing Director)'}
                </td>
                <td className="py-4 px-4">
                  <div>Morning: 08:00 AM – 12:00 PM</div>
                  <div className="mt-0.5">Evening: 04:00 PM – 08:00 PM</div>
                </td>
                <td className="py-4 px-4 text-[#DD0200] font-black">
                  {lang === 'hi' ? 'बंद (केवल आपातकाल)' : 'Closed (Emergency Only)'}
                </td>
                <td className="py-4 pl-4 text-slate-500">Nagmatia Road, Gaya Clinic</td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-4 pr-4 font-extrabold text-[#1A0706]">
                  {lang === 'hi' ? 'डॉ. अदीबा फरहीन (वैज्ञानिक सलाहकार)' : 'Dr. Adeeba Farheen (Scientific Advisor)'}
                </td>
                <td className="py-4 px-4">
                  Morning: 10:00 AM – 02:00 PM
                </td>
                <td className="py-4 px-4 text-[#DD0200] font-black">
                  {lang === 'hi' ? 'बंद' : 'Closed'}
                </td>
                <td className="py-4 pl-4 text-slate-500">Nagmatia Road, Gaya Clinic</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Professional Standards Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Core Methodology */}
        <div className="bg-white border border-[#D9D9D9] rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 text-[#55100D]">
            <Stethoscope className="w-5 h-5 shrink-0 text-[#DD0200]" />
            <h3 className="text-sm font-black text-[#1A0706]">
              {lang === 'hi' ? 'हमारी चिकित्सा पद्धति' : 'Constitutional Homoeopathic Methodology'}
            </h3>
          </div>
          <p className="text-slate-650 text-[11px] leading-relaxed font-medium">
            {lang === 'hi'
              ? 'हम केवल शारीरिक लक्षणों का इलाज नहीं करते हैं, बल्कि पूरे रोगी का इलाज करते हैं। हमारी पद्धति मानसिक स्थिति, शारीरिक बनावट, पारिवारिक चिकित्सा इतिहास और संवेदनशीलता पर आधारित है।'
              : 'Our practitioners practice strict classical homoeopathy. This means prescribing single, individualized, and minimal doses based on extensive physical, mental, and constitutional evaluations rather than suppressing localized skin or chronic symptoms.'}
          </p>
          <div className="grid grid-cols-2 gap-4 pt-2 font-bold text-xs">
            <div className="bg-slate-50 rounded-xl p-3 border border-[#D9D9D9]/40">
              <span className="block text-[#1A0706] font-black">100% Classical</span>
              <span className="text-[10px] text-slate-500 font-medium">No mixed formulas</span>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 border border-[#D9D9D9]/40">
              <span className="block text-[#1A0706] font-black">Individualized</span>
              <span className="text-[10px] text-slate-500 font-medium">Unique remedy per patient</span>
            </div>
          </div>
        </div>

        {/* Regulatory Board */}
        <div className="bg-white border border-[#D9D9D9] rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 text-[#55100D]">
            <Landmark className="w-5 h-5 shrink-0 text-[#DD0200]" />
            <h3 className="text-sm font-black text-[#1A0706]">
              {lang === 'hi' ? 'चिकित्सा परिषद पंजीकरण' : 'Board Certifications & Governance'}
            </h3>
          </div>
          <p className="text-slate-655 text-[11px] leading-relaxed font-medium">
            {lang === 'hi'
              ? 'क्लिनिक के सभी डॉक्टर बिहार राज्य होम्योपैथिक चिकित्सा बोर्ड और केंद्रीय चिकित्सा परिषद से पंजीकृत हैं। उनके पंजीकरण का पूर्ण विवरण प्रदर्शित किया गया है।'
              : 'Every consulting doctor at Dr. Q.H. Khan Clinic is registered under the State Board of Homoeopathic Medicine, Bihar, and the National Commission for Homoeopathy (NCH), Government of India. Registration statuses are active and verified.'}
          </p>
          <div className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 font-bold">
            <Award className="w-5 h-5 shrink-0 text-emerald-600" />
            <span className="text-[10px] leading-snug">
              {lang === 'hi' 
                ? 'सभी चिकित्सा प्रमाणपत्र पारदर्शी परामर्श के लिए क्लिनिक परिसर में सार्वजनिक रूप से प्रदर्शित हैं।' 
                : 'All medical licenses and qualifications are verified and publicly displayed inside the Gaya clinical center.'}
            </span>
          </div>
        </div>

      </div>

      {/* 5. Checklist Panel */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#D9D9D9] shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#55100D] shrink-0" />
          <div>
            <h3 className="text-sm font-black text-[#1A0706]">
              {lang === 'hi' ? 'मरीज परामर्श तैयारी चेकलिस्ट' : 'Patient Consultation Preparation Checklist'}
            </h3>
            <p className="text-[10px] text-slate-500 font-bold">
              {lang === 'hi' ? 'होम्योपैथिक मूल्यांकन के लिए आवश्यक जानकारी' : 'Essential details to prepare before clinical evaluation'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {checklistItems.map((item, idx) => (
            <div key={idx} className="space-y-2 border-l-2 border-[#55100D]/40 pl-4">
              <h4 className="font-extrabold text-[#1A0706] text-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-650 shrink-0" />
                {lang === 'hi' ? item.titleHi : item.titleEn}
              </h4>
              <p className="text-slate-655 text-[11px] leading-relaxed font-medium">
                {lang === 'hi' ? item.descHi : item.descEn}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
