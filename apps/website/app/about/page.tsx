'use client';

import React from 'react';
import Link from 'next/link';
import { Award, ShieldCheck, Clock, MapPin, Calendar, Heart, ShieldAlert, Sparkles } from 'lucide-react';
import { clinicConfig } from '../../lib/clinicConfig';
import { useLanguage } from '../../lib/language-context';

export default function AboutPage() {
  const { lang } = useLanguage();

  const coreValues = [
    {
      titleEn: 'Constitutional Treatment',
      titleHi: 'संवैधानिक उपचार',
      descEn: 'Remedies are selected matching the patients total physical and mental constitutional state.',
      descHi: 'दवाओं का चयन रोगी की संपूर्ण शारीरिक और मानसिक संवैधानिक स्थिति के अनुकूल किया जाता है।'
    },
    {
      titleEn: 'Holistic Intake Analysis',
      titleHi: 'समग्र इनटेक विश्लेषण',
      descEn: 'Every chronic case undergoes deep evaluation of past treatments, lifestyle, and dietary triggers.',
      descHi: 'प्रत्येक क्रोनिक मामले में पुराने उपचारों, जीवन शैली और आहार संबंधी कारकों का गहन मूल्यांकन होता है।'
    },
    {
      titleEn: 'Clinical Safety & Referral',
      titleHi: 'चिकित्सीय सुरक्षा और रेफरल',
      descEn: 'We practice transparent medicine, referring emergency and surgical cases to appropriate hospitals.',
      descHi: 'हम पारदर्शी चिकित्सा करते हैं, आपातकालीन और सर्जिकल मामलों को उचित अस्पतालों में रेफर करते हैं।'
    }
  ];

  const timelineEvents = [
    {
      year: '1958',
      titleEn: 'Clinic Foundation',
      titleHi: 'क्लिनिक की स्थापना',
      descEn: 'Dr. Q.H. Khan founded the classical homoeopathic clinic at Nagmatia Road, Gaya, Bihar to serve local patients.',
      descHi: 'डॉ. क्यू.एच. खान ने स्थानीय मरीजों की सेवा के लिए नगमटिया रोड, गया, बिहार में क्लासिकल होम्योपैथिक क्लिनिक की स्थापना की।'
    },
    {
      year: '1980s – 2000s',
      titleEn: 'Specialization Expansion',
      titleHi: 'विशेषज्ञता का विस्तार',
      descEn: 'Gained regional reputation for constitutional support in chronic skin conditions, vitiligo, and private complaints.',
      descHi: 'क्रोनिक त्वचा रोगों, सफेद दाग (विटिलिगो) और गुप्त रोगों में संवैधानिक परामर्श हेतु क्षेत्रीय ख्याति अर्जित की।'
    },
    {
      year: 'Present Day',
      titleEn: 'Active Medical Specialists',
      titleHi: 'सक्रिय चिकित्सा विशेषज्ञ टीम',
      descEn: 'Led by Managing Director Dr. I. Khan and Scientific Advisor Dr. Adeeba Farheen, preserving high clinical standards.',
      descHi: 'प्रबंध निदेशक डॉ. आई. खान और वैज्ञानिक सलाहकार डॉ. अदीबा फरहीन के नेतृत्व में उच्च चिकित्सीय मानकों का संरक्षण।'
    }
  ];

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-xs font-semibold">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#55100D]/5 border border-[#55100D]/15 text-[#55100D] text-xs font-bold uppercase tracking-wider">
          <Award className="w-3.5 h-3.5" />
          {lang === 'hi' ? 'क्लिनिक इतिहास और नेतृत्व' : 'CLINIC HERITAGE & LEADERSHIP'}
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-[#1A0706] leading-none tracking-tight">
          {lang === 'hi' ? 'डॉ. क्यू. एच. खान' : 'DR. Q.H. KHAN'}
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#55100D] to-[#DD0200] text-xl sm:text-2.5xl font-extrabold mt-2.5 tracking-wider">
            {lang === 'hi' ? 'क्लासिकल होम्योपैथिक क्लिनिक के बारे में' : 'ABOUT CLASSICAL HOMOEOPATHIC CLINIC'}
          </span>
        </h1>
        <p className="text-slate-650 text-xs sm:text-sm leading-relaxed font-medium">
          {lang === 'hi'
            ? '1958 में नगमटिया रोड, गया, बिहार में स्थापित। हमारा उद्देश्य क्लासिकल होम्योपैथी के सिद्धांतों के साथ रोगियों को सुरक्षित, संवैधानिक स्वास्थ्य लाभ प्रदान करना है।'
            : 'Established in 1958 at Nagmatia Road, Gaya, Bihar. Preserving constitutional classical homoeopathy and thorough clinical care.'}
        </p>
      </div>

      {/* Leadership Profile Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Managing Director */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#D9D9D9] shadow-sm space-y-4 hover:border-[#55100D]/50 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#55100D] text-white flex items-center justify-center font-black text-lg shadow">
              IK
            </div>
            <div>
              <h2 className="text-base font-extrabold text-[#1A0706]">Dr. I. Khan</h2>
              <p className="text-xs font-bold text-[#55100D]">{lang === 'hi' ? 'प्रबंध निदेशक' : 'Managing Director'}</p>
              <p className="text-[10px] text-slate-500 font-mono font-bold">Reg. 33454</p>
            </div>
          </div>
          <div className="space-y-2 text-slate-600 border-t border-slate-100 pt-3 text-xs leading-relaxed font-medium">
            <p><strong className="text-slate-900 font-bold">{lang === 'hi' ? 'योग्यता:' : 'Qualifications:'}</strong> B.H.M.S. (B.U.) | M.D. | R.B.S.M.H.C.</p>
            <p><strong className="text-slate-900 font-bold">{lang === 'hi' ? 'क्लिनिक फोकस:' : 'Clinical Focus:'}</strong> {lang === 'hi' ? 'त्वचा एवं गुप्त रोग विशेषज्ञ' : 'Skin and private disease specialist'}</p>
            <p>
              {lang === 'hi'
                ? 'डॉ. आई. खान क्लिनिक के दैनिक परामर्श और संवैधानिक नुस्खे के मानकों का संचालन करते हैं, जिससे क्रोनिक बीमारियों में व्यक्तिगत इलाज सुनिश्चित हो सकें।'
                : 'Dr. I. Khan guides the daily consultation workflows and constitutional case evaluations, preserving strict standards in homeopathic prescribing.'}
            </p>
          </div>
        </div>

        {/* Scientific Advisor */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#D9D9D9] shadow-sm space-y-4 hover:border-[#55100D]/50 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#1A0706] text-white flex items-center justify-center font-black text-lg shadow">
              AF
            </div>
            <div>
              <h2 className="text-base font-extrabold text-[#1A0706]">Dr. Adeeba Farheen</h2>
              <p className="text-xs font-bold text-[#55100D]">{lang === 'hi' ? 'वैज्ञानिक सलाहकार' : 'Scientific Advisor'}</p>
              <p className="text-[10px] text-slate-500 font-mono font-bold">Reg. 31319</p>
            </div>
          </div>
          <div className="space-y-2 text-slate-600 border-t border-slate-100 pt-3 text-xs leading-relaxed font-medium">
            <p><strong className="text-slate-900 font-bold">{lang === 'hi' ? 'योग्यता:' : 'Qualifications:'}</strong> B.H.M.S. (B.U.) | M.D. | G.D.M.C., Katihar, Patna</p>
            <p><strong className="text-slate-900 font-bold">{lang === 'hi' ? 'क्लिनिक फोकस:' : 'Clinical Focus:'}</strong> {lang === 'hi' ? 'विटिलिगो (सफेद दाग) एवं बांझपन विशेषज्ञ' : 'Leucoderma/skin pigmentation and female infertility'}</p>
            <p>
              {lang === 'hi'
                ? 'विशेषज्ञ सलाहकार जो बांझपन, विटिलिगो और विभिन्न जटिल क्रोनिक त्वचा शिकायतों के प्रबंधन में अनुसंधान-आधारित होम्योपैथी का उपयोग करती हैं।'
                : 'Specialist consultant focusing on vitiligo, leucoderma, and female infertility complaints using research-aware constitutional protocols.'}
            </p>
          </div>
        </div>

      </div>

      {/* Core Values Section */}
      <div className="space-y-4">
        <div className="border-b border-slate-200 pb-2">
          <h2 className="text-sm font-black text-[#1A0706] uppercase tracking-wider">
            {lang === 'hi' ? 'हमारे मुख्य मूल्य' : 'Our Clinical Values'}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coreValues.map((val, idx) => (
            <div key={idx} className="bg-white border border-[#D9D9D9] rounded-2xl p-5 hover:border-[#55100D]/50 hover:shadow-md transition-all duration-300">
              <h3 className="font-extrabold text-[#55100D] text-sm">{lang === 'hi' ? val.titleHi : val.titleEn}</h3>
              <p className="text-slate-650 mt-2 leading-relaxed text-[11px] font-medium">{lang === 'hi' ? val.descHi : val.descEn}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Consultation Standards Section */}
      <div className="bg-white border border-[#D9D9D9] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="border-b border-slate-200/80 pb-3">
          <h2 className="text-sm font-black text-[#1A0706] uppercase tracking-wider">
            {lang === 'hi' ? 'हमारा परामर्श और रोगी सेवा मानक' : 'Clinical Consultation & Patient Care Standards'}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 font-bold text-xs text-slate-750">
          <div className="space-y-1">
            <h4 className="text-[#1A0706] font-extrabold text-sm">{lang === 'hi' ? '१. विस्तृत केस-टेकिंग' : '1. In-Depth Case Taking'}</h4>
            <p className="text-slate-600 font-medium leading-relaxed">
              {lang === 'hi'
                ? 'हम पहले परामर्श में रोगी के शारीरिक लक्षणों, पारिवारिक इतिहास, मानसिक तनाव और जीवनशैली को समझने के लिए १ घंटे तक का समय लेते हैं।'
                : 'We dedicate up to 60 minutes for the initial consultation to map genetic predispositions, chronic symptoms, and emotional factors.'}
            </p>
          </div>
          <div className="space-y-1">
            <h4 className="text-[#1A0706] font-extrabold text-sm">{lang === 'hi' ? '२. व्यक्तिगत नुस्खे (Individualized Selectives)' : '2. Individualized Remedies'}</h4>
            <p className="text-slate-600 font-medium leading-relaxed">
              {lang === 'hi'
                ? 'बीमारी के नाम पर दवा देने के बजाय, प्रत्येक मरीज के लिए एक विशिष्ट, संवैधानिक होम्योपैथी दवा चुनी जाती है।'
                : 'No generic formulas are used. Each remedy selection is custom-compiled for the specific patient, matching their constitutional traits.'}
            </p>
          </div>
          <div className="space-y-1">
            <h4 className="text-[#1A0706] font-extrabold text-sm">{lang === 'hi' ? '३. नियमित डिजिटल फॉलो-अप' : '3. Active Treatment Tracking'}</h4>
            <p className="text-slate-600 font-medium leading-relaxed">
              {lang === 'hi'
                ? 'हमारा रिकॉर्ड सिस्टम मरीजों के फॉलो-अप को ट्रैक करता है, जिससे उपचार के सुधारों का रिकॉर्ड रखा जा सके।'
                : 'Our digital systems track remedy responses, monitoring skin, digestion, and systemic improvements to adjust potencies dynamically.'}
            </p>
          </div>
        </div>
      </div>

      {/* Historical Timeline */}
      <div className="bg-[#131314] text-white rounded-3xl p-8 sm:p-10 space-y-6 shadow-2xl relative overflow-hidden border border-white/5">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#DD0200]/5 rounded-full blur-3xl" />
        <div className="border-b border-white/5 pb-4 relative z-10">
          <h2 className="text-2xl font-black text-white flex items-center gap-1.5 leading-none">
            <Sparkles className="w-5 h-5 text-[#DD0200]" />
            {lang === 'hi' ? 'क्लिनिक विकास यात्रा' : 'Clinic Journey Timeline'}
          </h2>
          <p className="text-xs text-slate-400 mt-2 font-bold">{lang === 'hi' ? 'गया, बिहार में हमारे स्वर्णिम इतिहास के मील के पत्थर' : 'Key milestones of Dr. Q.H. Khan Clinic in Gaya, Bihar'}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          {timelineEvents.map((event, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
              <span className="text-[10px] font-black text-[#DD0200] bg-[#DD0200]/10 border border-[#DD0200]/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
                {event.year}
              </span>
              <h3 className="font-extrabold text-white text-sm mt-1">{lang === 'hi' ? event.titleHi : event.titleEn}</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">{lang === 'hi' ? event.descHi : event.descEn}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Philosophy & Referral Policy */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#D9D9D9] shadow-sm space-y-4">
        <h3 className="text-base font-extrabold text-[#1A0706] flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#55100D]" />
          {lang === 'hi' ? 'जिम्मेदार चिकित्सा और नैतिक आचरण नीति' : 'Our Medical Philosophy & Responsible Messaging'}
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed max-w-4xl font-medium">
          {lang === 'hi'
            ? 'डॉ. क्यू.एच. खान क्लिनिक में हम विटिलिगो, सोरायसिस और अन्य त्वचा स्थितियों के लिए सुरक्षित, संवैधानिक होम्योपैथी परामर्श प्रदान करते हैं। हम चमत्कारी इलाज के झूठे दावे या १००% गारंटी नहीं देते हैं। गंभीर एक्यूट, सर्जिकल या दर्दनाक आपातकालीन मामलों में हम हमेशा नजदीकी आपातकालीन अस्पताल रेफरल की सलाह देते हैं।'
            : 'At Dr. Q.H. Khan Clinic, we preserve traditional constitutional homoeopathy principles while maintaining responsible medical safety. We do not issue unrealistic guarantees or 100% cure claims. All acute, severe, or surgical emergencies are directed to appropriate hospital emergency facilities.'}
        </p>

        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-slate-650 font-semibold">
            <p><strong className="text-slate-800 font-bold">{lang === 'hi' ? 'क्लिनिक का पता:' : 'Clinic Address:'}</strong> Nagmatia Road, Gaya, Bihar, India</p>
            <p><strong className="text-slate-800 font-bold">{lang === 'hi' ? 'हेल्पलाइन्स:' : 'Helplines:'}</strong> {clinicConfig.helplines.map((h) => h.number).join(' | ')}</p>
          </div>

          <Link
            href="/appointment"
            className="px-6 py-3 bg-gradient-to-r from-[#55100D] to-[#DD0200] hover:from-[#DD0200] hover:to-[#55100D] text-white text-xs font-black rounded-xl shadow transition-all hover:-translate-y-0.5 tracking-wider uppercase"
          >
            <Calendar className="w-4 h-4" />
            <span>{lang === 'hi' ? 'परामर्श हेतु बुक करें' : 'Book Consultation'}</span>
          </Link>
        </div>
      </div>
      
    </div>
  );
}
