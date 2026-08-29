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
      degrees: ['B.H.M.S. (B.U.)', 'M.D.', 'R.B.S.M.H.C.'],
      registrationNumber: 'Reg. 33454',
      specialization: 'Skin & Chronic Disease Specialist',
      designation: 'Founder (In Memoriam)',
      bio: 'Pioneer of classical homoeopathy in Gaya who founded this clinic in 1958. His clinical values and rigorous case-study methods continue to guide our active specialists.',
      image: '/images/doctors/dr-q-h-khan.jpg',
      isDeceased: true,
    },
    {
      slug: 'dr-i-khan',
      name: 'Dr. I. Khan (Skin)',
      degrees: ['B.H.M.S. (B.U.)', 'M.D.', 'R.B.S. M.H.C.'],
      registrationNumber: 'Reg. 33454',
      specialization: 'Dermatological and private disease consultant',
      designation: 'Managing Director',
      bio: 'Managing Director of the clinic with extensive experience in classical homoeopathy, specializing in chronic skin disorders, vitiligo, and private constitutional complaints.',
      image: '/images/doctors/dr-i-khan.jpg',
    },
    {
      slug: 'dr-adeeba-farheen',
      name: 'Dr. Adeeba Farheen',
      degrees: ['B.H.M.S. (B.U.)', 'M.D.', 'G.D.M.C., Katihar, Patna'],
      registrationNumber: 'Reg. 31319',
      specialization: 'Infertility and skin pigmentation conditions',
      designation: 'Scientific Advisor / Infertility Specialist',
      bio: 'Specialist consultant focusing on Vitiligo, Leucoderma, and female infertility conditions using advanced constitutional classical homoeopathy.',
      image: '/images/doctors/dr-adeeba-farheen.jpg',
    },
  ];

  const doctorsHi = [
    {
      slug: 'dr-q-h-khan',
      name: 'स्वर्गीय डॉ. क्यू. एच. खान',
      degrees: ['बी.एच.एम.एस. (बी.यू.)', 'एम.डी.', 'आर.बी.एस.एम.एच.सी.'],
      registrationNumber: 'पंजीकरण संख्या 33454',
      specialization: 'त्वचा एवं क्रोनिक रोग विशेषज्ञ',
      designation: 'संस्थापक (स्मृति में)',
      bio: 'गया में क्लासिकल होम्योपैथी के अग्रदूत जिन्होंने 1958 में इस क्लिनिक की स्थापना की। उनके चिकित्सीय मूल्य और केस-अध्ययन के नियम आज भी हमारे सक्रिय डॉक्टरों का मार्गदर्शन करते हैं।',
      image: '/images/doctors/dr-q-h-khan.jpg',
      isDeceased: true,
    },
    {
      slug: 'dr-i-khan',
      name: 'डॉ. आई. खान (त्वचा)',
      degrees: ['बी.एच.एम.एस. (बी.यू.)', 'एम.डी.', 'आर.बी.एस.एम.एच.सी.'],
      registrationNumber: 'पंजीकरण संख्या 33454',
      specialization: 'त्वचा एवं गुप्त रोग विशेषज्ञ परामर्श',
      designation: 'प्रबंध निदेशक',
      bio: 'क्लासिकल होम्योपैथी में व्यापक अनुभव के साथ क्लिनिक के प्रबंध निदेशक, जो क्रोनिक त्वचा विकारों, विटिलिगो और विभिन्न जटिल गुप्त रोगों के उपचार में विशेषज्ञ हैं।',
      image: '/images/doctors/dr-i-khan.jpg',
    },
    {
      slug: 'dr-adeeba-farheen',
      name: 'डॉ. अदीबा फरहीन',
      degrees: ['बी.एच.एम.एस. (बी.यू.)', 'एम.डी.', 'जी.डी.एम.सी., कटिहार, पटना'],
      registrationNumber: 'पंजीकरण संख्या 31319',
      specialization: 'बांझपन और त्वचा रंजकता से संबंधित स्थितियां',
      designation: 'वैज्ञानिक सलाहकार / बांझपन विशेषज्ञ',
      bio: 'विटिलिगो, ल्यूकोडर्मा और उन्नत क्लासिकल होम्योपैथी का उपयोग करके महिला बांझपन की स्थितियों पर ध्यान केंद्रित करने वाली विशेषज्ञ सलाहकार।',
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
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-clinic-indigo/5 border border-clinic-indigo/15 text-clinic-indigo text-xs font-bold uppercase tracking-wider">
          <UserCheck className="w-3.5 h-3.5" /> 
          {lang === 'hi' ? 'योग्य चिकित्सा टीम' : 'QUALIFIED CLINICAL TEAM'}
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-none tracking-tight">
          {lang === 'hi' ? 'हमारे डॉक्टर और चिकित्सा सलाहकार' : 'Our Doctors & Clinical Advisors'}
        </h1>
        <p className="text-slate-655 text-xs sm:text-sm font-medium leading-relaxed max-w-xl mx-auto">
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
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <Clock className="w-5 h-5 text-clinic-indigo shrink-0" />
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              {lang === 'hi' ? 'परामर्श समय-सारणी' : 'Weekly Consultation Schedule'}
            </h3>
            <p className="text-[10px] text-slate-500 font-medium">
              {lang === 'hi' ? 'सप्ताह के दिनों के अनुसार डॉक्टरों की उपलब्धता' : 'Doctor availability times by weekdays'}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[11px] font-medium text-slate-700">
            <thead>
              <tr className="border-b border-slate-300 text-slate-900 text-xs">
                <th className="py-2.5 pr-4">{lang === 'hi' ? 'चिकित्सक' : 'Practitioner'}</th>
                <th className="py-2.5 px-4">{lang === 'hi' ? 'सोमवार - शनिवार' : 'Monday - Saturday'}</th>
                <th className="py-2.5 px-4">{lang === 'hi' ? 'रविवार' : 'Sunday'}</th>
                <th className="py-2.5 pl-4">{lang === 'hi' ? 'स्थान' : 'Location'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr className="hover:bg-slate-100/50">
                <td className="py-3 pr-4 font-bold text-slate-900">
                  {lang === 'hi' ? 'डॉ. आई. खान (प्रबंध निदेशक)' : 'Dr. I. Khan (Managing Director)'}
                </td>
                <td className="py-3 px-4">
                  <div>Morning: 08:00 AM – 12:00 PM</div>
                  <div className="mt-0.5">Evening: 04:00 PM – 08:00 PM</div>
                </td>
                <td className="py-3 px-4 text-clinic-crimson font-bold">
                  {lang === 'hi' ? 'बंद (केवल आपातकाल)' : 'Closed (Emergency Only)'}
                </td>
                <td className="py-3 pl-4 text-slate-500">Nagmatia Road, Gaya Clinic</td>
              </tr>
              <tr className="hover:bg-slate-100/50">
                <td className="py-3 pr-4 font-bold text-slate-900">
                  {lang === 'hi' ? 'डॉ. अदीबा फरहीन (वैज्ञानिक सलाहकार)' : 'Dr. Adeeba Farheen (Scientific Advisor)'}
                </td>
                <td className="py-3 px-4">
                  Morning: 10:00 AM – 02:00 PM
                </td>
                <td className="py-3 px-4 text-clinic-crimson font-bold">
                  {lang === 'hi' ? 'बंद' : 'Closed'}
                </td>
                <td className="py-3 pl-4 text-slate-500">Nagmatia Road, Gaya Clinic</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Professional Standards Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Core Methodology */}
        <div className="border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-clinic-indigo">
            <Stethoscope className="w-5 h-5 shrink-0" />
            <h3 className="text-sm font-bold text-slate-900">
              {lang === 'hi' ? 'हमारी चिकित्सा पद्धति' : 'Constitutional Homoeopathic Methodology'}
            </h3>
          </div>
          <p className="text-slate-655 text-[11px] leading-relaxed font-medium">
            {lang === 'hi'
              ? 'हम केवल शारीरिक लक्षणों का इलाज नहीं करते हैं, बल्कि पूरे रोगी का इलाज करते हैं। हमारी पद्धति मानसिक स्थिति, शारीरिक बनावट, पारिवारिक चिकित्सा इतिहास और संवेदनशीलता पर आधारित है।'
              : 'Our practitioners practice strict classical homoeopathy. This means prescribing single, individualized, and minimal doses based on extensive physical, mental, and constitutional evaluations rather than suppressing localized skin or chronic symptoms.'}
          </p>
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
              <span className="block text-slate-900 font-extrabold text-xs">100% Classical</span>
              <span className="text-[10px] text-slate-500 font-medium">No mixed formulas</span>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
              <span className="block text-slate-900 font-extrabold text-xs">Individualized</span>
              <span className="text-[10px] text-slate-500 font-medium">Unique remedy per patient</span>
            </div>
          </div>
        </div>

        {/* Regulatory Board */}
        <div className="border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-clinic-indigo">
            <Landmark className="w-5 h-5 shrink-0" />
            <h3 className="text-sm font-bold text-slate-900">
              {lang === 'hi' ? 'चिकित्सा परिषद पंजीकरण' : 'Board Certifications & Governance'}
            </h3>
          </div>
          <p className="text-slate-655 text-[11px] leading-relaxed font-medium">
            {lang === 'hi'
              ? 'क्लिनिक के सभी डॉक्टर बिहार राज्य होम्योपैथिक चिकित्सा बोर्ड और केंद्रीय चिकित्सा परिषद से पंजीकृत हैं। उनके पंजीकरण का पूर्ण विवरण प्रदर्शित किया गया है।'
              : 'Every consulting doctor at Dr. Q.H. Khan Clinic is registered under the State Board of Homoeopathic Medicine, Bihar, and the National Commission for Homoeopathy (NCH), Government of India. Registration statuses are active and verified.'}
          </p>
          <div className="flex items-center gap-3 p-3 bg-emerald-50/60 border border-emerald-150 rounded-xl text-emerald-800">
            <Award className="w-5 h-5 shrink-0 text-emerald-600" />
            <span className="text-[10px] leading-snug font-bold">
              {lang === 'hi' 
                ? 'सभी चिकित्सा प्रमाणपत्र पारदर्शी परामर्श के लिए क्लिनिक परिसर में सार्वजनिक रूप से प्रदर्शित हैं।' 
                : 'All medical licenses and qualifications are verified and publicly displayed inside the Gaya clinical center.'}
            </span>
          </div>
        </div>

      </div>

      {/* 5. Checklist Panel */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
          <FileText className="w-5 h-5 text-clinic-indigo shrink-0" />
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              {lang === 'hi' ? 'मरीज परामर्श तैयारी चेकलिस्ट' : 'Patient Consultation Preparation Checklist'}
            </h3>
            <p className="text-[10px] text-slate-500 font-medium">
              {lang === 'hi' ? 'होम्योपैथिक मूल्यांकन के लिए आवश्यक जानकारी' : 'Essential details to prepare before clinical evaluation'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {checklistItems.map((item, idx) => (
            <div key={idx} className="space-y-2 border-l-2 border-clinic-indigo/25 pl-4">
              <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
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
