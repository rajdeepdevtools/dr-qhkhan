'use client';

import React from 'react';
import { DoctorCard } from '../../components/DoctorCard';
import { UserCheck, FileText, CheckCircle2, ShieldAlert } from 'lucide-react';
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
    },
    {
      slug: 'dr-adeeba-farheen',
      name: 'Dr. Adeeba Farheen',
      degrees: ['B.H.M.S. (B.U.)', 'M.D.', 'G.D.M.C., Katihar, Patna'],
      registrationNumber: 'Reg. 31319',
      specialization: 'Infertility and skin pigmentation conditions',
      designation: 'Scientific Advisor / Infertility Specialist',
      bio: 'Specialist consultant focusing on Vitiligo, Leucoderma, and female infertility conditions using advanced constitutional classical homoeopathy.',
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
    },
    {
      slug: 'dr-adeeba-farheen',
      name: 'डॉ. अदीबा फरहीन',
      degrees: ['बी.एच.एम.एस. (बी.यू.)', 'एम.डी.', 'जी.डी.एम.सी., कटिहार, पटना'],
      registrationNumber: 'पंजीकरण संख्या 31319',
      specialization: 'बांझपन और त्वचा रंजकता से संबंधित स्थितियां',
      designation: 'वैज्ञानिक सलाहकार / बांझपन विशेषज्ञ',
      bio: 'विटिलिगो, ल्यूकोडर्मा और उन्नत क्लासिकल होम्योपैथी का उपयोग करके महिला बांझपन की स्थितियों पर ध्यान केंद्रित करने वाली विशेषज्ञ सलाहकार।',
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
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-xs font-semibold">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-clinic-indigo/5 border border-clinic-indigo/15 text-clinic-indigo text-xs font-bold uppercase tracking-wider">
          <UserCheck className="w-3.5 h-3.5" /> 
          {lang === 'hi' ? 'योग्य चिकित्सा टीम' : 'QUALIFIED CLINICAL TEAM'}
        </span>
        <h1 className="text-3xl font-black text-slate-900 leading-none">
          {lang === 'hi' ? 'हमारे डॉक्टर और चिकित्सा सलाहकार' : 'Our Doctors & Clinical Advisors'}
        </h1>
        <p className="text-slate-655 text-xs sm:text-sm font-medium leading-relaxed max-w-xl mx-auto">
          {lang === 'hi'
            ? 'डॉ. क्यू.एच. खान क्लिनिक में सभी डॉक्टरों के पास वैध डिग्री और राज्य चिकित्सा परिषद के पंजीकरण नंबर हैं।'
            : 'All consulting doctors at Dr. Q.H. Khan Clinic hold valid degrees and qualifications. Official registration numbers are listed for transparency.'}
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {doctors.map((doc, idx) => (
          <DoctorCard key={idx} doctor={doc} />
        ))}
      </div>

      {/* Checklist Panel */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
          <FileText className="w-5 h-5 text-clinic-indigo shrink-0" />
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              {lang === 'hi' ? 'मरीज परामर्श तैयारी चेकलिस्ट' : 'Patient Consultation Preparation Checklist'}
            </h3>
            <p className="text-[10px] text-slate-500 font-medium">{lang === 'hi' ? 'होम्योपैथिक मूल्यांकन के लिए आवश्यक जानकारी' : 'Essential details to prepare before clinical evaluation'}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {checklistItems.map((item, idx) => (
            <div key={idx} className="space-y-2 border-l-2 border-clinic-indigo/25 pl-4">
              <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                {lang === 'hi' ? item.titleHi : item.titleEn}
              </h4>
              <p className="text-slate-600 text-[11px] leading-relaxed font-medium">
                {lang === 'hi' ? item.descHi : item.descEn}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
