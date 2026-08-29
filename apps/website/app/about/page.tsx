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
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-clinic-indigo/5 border border-clinic-indigo/15 text-clinic-indigo text-xs font-bold uppercase tracking-wider">
          <Award className="w-3.5 h-3.5" />
          {lang === 'hi' ? 'क्लिनिक इतिहास और नेतृत्व' : 'CLINIC HERITAGE & LEADERSHIP'}
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-none">
          {lang === 'hi' 
            ? 'डॉ. क्यू. एच. खान होम्योपैथिक क्लिनिक के बारे में' 
            : 'About DR. Q.H. KHAN CLASSICAL HOMOEOPATHIC CLINIC'}
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
          {lang === 'hi'
            ? '1958 में नगमटिया रोड, गया, बिहार में स्थापित। हमारा उद्देश्य क्लासिकल होम्योपैथी के सिद्धांतों के साथ रोगियों को सुरक्षित, संवैधानिक स्वास्थ्य लाभ प्रदान करना है।'
            : 'Established in 1958 at Nagmatia Road, Gaya, Bihar. Preserving constitutional classical homoeopathy and thorough clinical care.'}
        </p>
      </div>

      {/* Leadership Profile Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Managing Director */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4 hover:border-slate-350 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-clinic-indigo text-white flex items-center justify-center font-black text-lg shadow">
              IK
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Dr. I. Khan</h2>
              <p className="text-xs font-bold text-clinic-indigo">{lang === 'hi' ? 'प्रबंध निदेशक' : 'Managing Director'}</p>
              <p className="text-[10px] text-slate-500 font-mono">Reg. 33454</p>
            </div>
          </div>
          <div className="space-y-2 text-slate-600 border-t border-slate-100 pt-3 text-xs leading-relaxed font-medium">
            <p><strong className="text-slate-900 font-bold">{lang === 'hi' ? 'योग्यता:' : 'Qualifications:'}</strong> B.H.M.S. (B.U.) | M.D. | R.B.S.M.H.C.</p>
            <p><strong className="text-slate-900 font-bold">{lang === 'hi' ? 'क्लिनिक फोकस:' : 'Clinical Focus:'}</strong> {lang === 'hi' ? 'त्वचा एवं गुप्त रोग विशेषज्ञ' : 'Skin and private disease specialist'}</p>
            <p>
              {lang === 'hi'
                ? 'डॉ. आई. खान क्लिनिक के दैनिक परामर्श और संवैधानिक नुस्खे के मानकों का संचालन करते हैं, जिससे क्रोनिक बीमारियों में व्यक्तिगत इलाज सुनिश्चित हो सके।'
                : 'Dr. I. Khan guides the daily consultation workflows and constitutional case evaluations, preserving strict standards in homeopathic prescribing.'}
            </p>
          </div>
        </div>

        {/* Scientific Advisor */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4 hover:border-slate-350 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-clinic-violet text-white flex items-center justify-center font-black text-lg shadow">
              AF
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Dr. Adeeba Farheen</h2>
              <p className="text-xs font-bold text-clinic-violet">{lang === 'hi' ? 'वैज्ञानिक सलाहकार' : 'Scientific Advisor'}</p>
              <p className="text-[10px] text-slate-500 font-mono">Reg. 31319</p>
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
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            {lang === 'hi' ? 'हमारे मुख्य मूल्य' : 'Our Clinical Values'}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coreValues.map((val, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:bg-white hover:border-slate-350 transition-all">
              <h3 className="font-bold text-clinic-indigo text-sm">{lang === 'hi' ? val.titleHi : val.titleEn}</h3>
              <p className="text-slate-600 mt-2 leading-relaxed text-[11px] font-medium">{lang === 'hi' ? val.descHi : val.descEn}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Historical Timeline */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 space-y-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/5 rounded-full blur-3xl" />
        <div className="border-b border-slate-800 pb-4 relative z-10">
          <h2 className="text-2xl font-bold text-amber-300 flex items-center gap-1.5">
            <Sparkles className="w-5 h-5 text-amber-400" />
            {lang === 'hi' ? 'क्लिनिक विकास यात्रा' : 'Clinic Journey Timeline'}
          </h2>
          <p className="text-xs text-slate-400">{lang === 'hi' ? 'गया, बिहार में हमारे स्वर्णिम इतिहास के मील के पत्थर' : 'Key milestones of Dr. Q.H. Khan Clinic in Gaya, Bihar'}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          {timelineEvents.map((event, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2">
              <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full">
                {event.year}
              </span>
              <h3 className="font-bold text-white text-sm mt-2">{lang === 'hi' ? event.titleHi : event.titleEn}</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">{lang === 'hi' ? event.descHi : event.descEn}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Philosophy & Referral Policy */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-clinic-indigo" />
          {lang === 'hi' ? 'जिम्मेदार चिकित्सा और नैतिक आचरण नीति' : 'Our Medical Philosophy & Responsible Messaging'}
        </h3>
        <p className="text-xs text-slate-650 leading-relaxed max-w-4xl font-medium">
          {lang === 'hi'
            ? 'डॉ. क्यू.एच. खान क्लिनिक में हम विटिलिगो, सोरायसिस और अन्य त्वचा स्थितियों के लिए सुरक्षित, संवैधानिक होम्योपैथी परामर्श प्रदान करते हैं। हम चमत्कारी इलाज के झूठे दावे या १% गारंटी नहीं देते हैं। गंभीर एक्यूट, सर्जिकल या दर्दनाक आपातकालीन मामलों में हम हमेशा नजदीकी आपातकालीन अस्पताल रेफरल की सलाह देते हैं।'
            : 'At Dr. Q.H. Khan Clinic, we preserve traditional constitutional homoeopathy principles while maintaining responsible medical safety. We do not issue unrealistic guarantees or 100% cure claims. All acute, severe, or surgical emergencies are directed to appropriate hospital emergency facilities.'}
        </p>

        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-slate-600 font-medium">
            <p><strong className="text-slate-800 font-bold">{lang === 'hi' ? 'क्लिनिक का पता:' : 'Clinic Address:'}</strong> Nagmatia Road, Gaya, Bihar, India</p>
            <p><strong className="text-slate-800 font-bold">{lang === 'hi' ? 'हेल्पलाइन्स:' : 'Helplines:'}</strong> {clinicConfig.helplines.map((h) => h.number).join(' | ')}</p>
          </div>

          <Link
            href="/appointment"
            className="px-5 py-2.5 bg-clinic-crimson hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow transition-colors flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>{lang === 'hi' ? 'परामर्श हेतु बुक करें' : 'Book Consultation'}</span>
          </Link>
        </div>
      </div>
      
    </div>
  );
}
