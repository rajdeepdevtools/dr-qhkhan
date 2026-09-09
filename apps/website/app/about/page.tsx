'use client';

import React from 'react';
import Link from 'next/link';
import { Award, ShieldCheck, Clock, MapPin, Calendar, Heart, ShieldAlert, Sparkles, ArrowRight } from 'lucide-react';
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

      {/* Founder Biography Highlight Banner */}
      <div className="bg-gradient-to-r from-[#1C0706] via-[#2A0D0A] to-[#55100D] border border-[#DD0200]/30 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-amber-400 shrink-0 shadow-lg">
            <img
              src="/images/dr-qh-khan.png"
              alt="Late Dr. Q.H. Khan"
              className="w-full h-full object-cover object-top"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/dr-qh-khan.png';
              }}
            />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 bg-amber-400/10 border border-amber-400/20 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
              <Award className="w-3 h-3 text-[#DD0200]" />
              {lang === 'hi' ? 'संस्थापक की पावन स्मृति एवं जीवनी' : 'FOUNDER LEGACY & BIOGRAPHY'}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white leading-snug">
              {lang === 'hi' ? 'स्वर्गीय डॉ. क्यू. एच. खान (1958 से विरासत)' : 'Late Dr. Q.H. Khan (1958 Heritage)'}
            </h2>
            <p className="text-slate-300 text-xs font-semibold leading-relaxed max-w-xl">
              {lang === 'hi'
                ? 'गया एवं मगध प्रमंडल में क्लासिकल होम्योपैथी के अग्रदूत, जिन्होंने 1958 में इस क्लिनिक की नींव रखी। उनके संपूर्ण जीवन चरित्र, समाज सेवा दर्शन और चिकित्सीय सिद्धांतों को विस्तार से पढ़ें।'
                : 'Pioneer of classical homoeopathy in Gaya who established this institution in 1958. Read his detailed life history, Samaj Seva philosophy, and clinical values.'}
            </p>
          </div>
        </div>
        <Link
          href="/doctors/dr-q-h-khan"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#DD0200] to-amber-500 hover:from-amber-500 hover:to-[#DD0200] text-white text-xs font-black shadow-lg transition-all hover:-translate-y-0.5 tracking-wider uppercase shrink-0"
        >
          <span>{lang === 'hi' ? 'संस्थापक जीवनी (Biography) पढ़ें' : 'Read Founder Biography'}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Leadership Profile Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Managing Director */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#D9D9D9] shadow-sm space-y-4 hover:border-[#55100D]/50 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#55100D] shadow shrink-0">
              <img
                src="/images/dr-i-khan.png"
                alt="Dr. I. Khan"
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/dr-i-khan.png';
                }}
              />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-[#1A0706]">Dr. I. Khan</h2>
              <p className="text-xs font-bold text-[#55100D]">{lang === 'hi' ? 'प्रबंध निदेशक एवं जनरल फिजिशियन' : 'Managing Director & General Physician'}</p>
              <p className="text-[10px] text-slate-500 font-mono font-bold">Reg. 33454</p>
            </div>
          </div>
          <div className="space-y-2 text-slate-600 border-t border-slate-100 pt-3 text-xs leading-relaxed font-medium">
            <p><strong className="text-slate-900 font-bold">{lang === 'hi' ? 'योग्यता:' : 'Qualifications:'}</strong> B.H.M.S. (B.U.) | R.B.S.M.H.C.</p>
            <p><strong className="text-slate-900 font-bold">{lang === 'hi' ? 'क्लिनिक फोकस:' : 'Clinical Focus:'}</strong> {lang === 'hi' ? 'जनरल फिजिशियन, क्रोनिक रोग, विटिलिगो व त्वचा विकार' : 'General Physician, Chronic Diseases, Vitiligo & Skin Disorders'}</p>
            <p>
              {lang === 'hi'
                ? 'डॉ. आई. खान क्लिनिक के प्रबंध निदेशक एवं जनरल फिजिशियन हैं, जो क्रोनिक बीमारियों, दीर्घकालिक रोगों, विटिलिगो और त्वचा विकारों में क्लासिकल संवैधानिक होम्योपैथी के विशेषज्ञ हैं।'
                : 'Dr. I. Khan is Managing Director & General Physician specializing in chronic long-term diseases, vitiligo, skin disorders, and classical constitutional homoeopathy.'}
            </p>
          </div>
        </div>

        {/* Scientific Advisor */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#D9D9D9] shadow-sm space-y-4 hover:border-[#55100D]/50 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#55100D] shadow shrink-0">
              <img
                src="/images/dr-adeeba-farheen.png"
                alt="Dr. Adeeba Farheen"
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/dr-adeeba-farheen.png';
                }}
              />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-[#1A0706]">Dr. Adeeba Farheen</h2>
              <p className="text-xs font-bold text-[#55100D]">{lang === 'hi' ? 'कंसल्टेंट फिजिशियन एवं महिला स्वास्थ्य विशेषज्ञ' : 'Consultant Physician & Female Health Specialist'}</p>
              <p className="text-[10px] text-slate-500 font-mono font-bold">Reg. 31319</p>
            </div>
          </div>
          <div className="space-y-2 text-slate-600 border-t border-slate-100 pt-3 text-xs leading-relaxed font-medium">
            <p><strong className="text-slate-900 font-bold">{lang === 'hi' ? 'योग्यता:' : 'Qualifications:'}</strong> B.H.M.S. (B.U.) | M.D. (Physician) | G.D.M.C., Katihar, Patna</p>
            <p><strong className="text-slate-900 font-bold">{lang === 'hi' ? 'क्लिनिक फोकस:' : 'Clinical Focus:'}</strong> {lang === 'hi' ? 'सामान्य रोग फिजिशियन, PCOD, स्तन गांठ व ट्यूमर एवं महिला स्वास्थ्य' : 'General Physician, PCOD, Breast Lumps/Tumours & Female Healthcare'}</p>
            <p>
              {lang === 'hi'
                ? 'सामान्य फिजिशियन एवं महिला स्वास्थ्य विशेषज्ञ, जो PCOD/PCOS, स्तन गांठ/ट्यूमर, सामान्य प्रसव मार्गदर्शन एवं सभी सामान्य स्वास्थ्य समस्याओं के उपचार में अनुभवी हैं।'
                : 'General Physician and Female Healthcare consultant focusing on PCOD/PCOS, breast tumours/lumps, female health disorders, normal delivery guidance, and general conditions.'}
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

      {/* Philosophy, Legal & Medical Claims Integrity Disclaimer */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#D9D9D9] shadow-sm space-y-4">
        <h3 className="text-base font-extrabold text-[#1A0706] flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#55100D]" />
          {lang === 'hi' ? 'चिकित्सीय सत्यता, पारदर्शिता एवं कानूनी आचरण नीति' : 'Medical Integrity, Legal Transparency & Ethics Policy'}
        </h3>
        
        <div className="space-y-3 text-xs text-slate-700 leading-relaxed font-medium bg-slate-50 p-4 rounded-xl border border-slate-200">
          <p>
            <strong className="text-slate-900 font-extrabold">
              {lang === 'hi' ? '१. प्रामाणिक एवं पंजीकृत चिकित्सा परामर्श:' : '1. Registered & Qualified Clinical Practice:'}
            </strong>{' '}
            {lang === 'hi'
              ? 'डॉ. क्यू. एच. खान क्लासिकल होम्योपैथिक क्लिनिक में सभी स्वास्थ्य परामर्श केवल आयुष मंत्रालय एवं राज्य बोर्ड द्वारा पंजीकृत योग्य चिकित्सकों (B.H.M.S. / M.D.) द्वारा प्रदान किए जाते हैं।'
              : 'All consultations at Dr. Q.H. Khan Clinic are conducted exclusively by registered, qualified medical professionals holding recognized degrees (B.H.M.S. / M.D.).'}
          </p>
          <p>
            <strong className="text-slate-900 font-extrabold">
              {lang === 'hi' ? '२. कोई भ्रामक या चमत्कारिक दावे नहीं (Strict No-False-Claim Policy):' : '2. Strict No-False-Claim Policy:'}
            </strong>{' '}
            {lang === 'hi'
              ? 'हमारा क्लिनिक किसी भी बीमारी के 100% इलाज या तात्कालिक चमत्कारी परिणाम का कोई भी असत्य या भ्रामक दावा नहीं करता है। होम्योपैथिक उपचार प्रत्येक मरीज की अनुवांशिकता, पुरानी बीमारी की स्थिति, संवैधानिक विशेषताओं और व्यक्तिगत शारीरिक प्रतिक्रिया पर निर्भर करता है।'
              : 'Our institution strictly refrains from making false 100% cure guarantees or deceptive medical promises. Clinical response to constitutional homoeopathic consultation varies individually depending on pathology, genetics, duration, and patient compliance.'}
          </p>
          <p>
            <strong className="text-slate-900 font-extrabold">
              {lang === 'hi' ? '३. आपातकालीन अस्पताल रेफरल नीति (Hospital Emergency Protocol):' : '3. Hospital Emergency Protocol:'}
            </strong>{' '}
            {lang === 'hi'
              ? 'अचानक पैदा होने वाले तीव्र दर्द, दुर्घटनाओं, गंभीर कार्डियक, न्यूरोलॉजिकल या सर्जिकल आपातकाल के मामलों में हम मरीजों को बिना किसी देरी के निकटतम मल्टी-स्पेशलिटी अस्पताल या सर्जिकल इमरजेंसी जाने की हिदायत देते हैं।'
              : 'For acute medical emergencies, surgical complications, or trauma, patients are directed immediately to nearby hospital emergency and surgical centers.'}
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-slate-650 font-semibold">
            <p><strong className="text-slate-800 font-bold">{lang === 'hi' ? 'क्लिनिक का पता:' : 'Clinic Address:'}</strong> Nagmatia Road, Gaya, Bihar, India</p>
            <p><strong className="text-slate-800 font-bold">{lang === 'hi' ? 'हेल्पलाइन्स:' : 'Helplines:'}</strong> {clinicConfig.helplines.map((h) => h.number).join(' | ')}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/doctors/dr-q-h-khan"
              className="px-5 py-3 bg-white border border-[#D9D9D9] hover:bg-slate-50 text-[#1A0706] text-xs font-extrabold rounded-xl shadow-xs transition-all hover:-translate-y-0.5 tracking-wider uppercase inline-flex items-center gap-1.5"
            >
              <Award className="w-4 h-4 text-[#DD0200]" />
              <span>{lang === 'hi' ? 'संस्थापक जीवनी' : 'Founder Biography'}</span>
            </Link>

            <Link
              href="/appointment"
              className="px-6 py-3 bg-gradient-to-r from-[#55100D] to-[#DD0200] hover:from-[#DD0200] hover:to-[#55100D] text-white text-xs font-black rounded-xl shadow transition-all hover:-translate-y-0.5 tracking-wider uppercase inline-flex items-center gap-1.5"
            >
              <Calendar className="w-4 h-4" />
              <span>{lang === 'hi' ? 'परामर्श हेतु बुक करें' : 'Book Consultation'}</span>
            </Link>
          </div>
        </div>
      </div>
      
    </div>
  );
}
