'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Phone, MessageSquare, MapPin, Award, Clock, CheckCircle2, ShieldCheck, Zap, HeartPulse, UserCheck, Sparkles, Activity } from 'lucide-react';
import { clinicConfig } from '../lib/clinicConfig';
import { useLanguage } from '../lib/language-context';

export const Hero: React.FC = () => {
  const { lang } = useLanguage();

  return (
    <section className="relative bg-gradient-to-b from-[#FAF8F7] via-white to-slate-50 border-b border-slate-200/80 overflow-hidden py-12 md:py-20 text-slate-800">
      
      {/* 1. FUTURISTIC STYLING & ANIMATIONS BLOCK */}
      <style>
        {`
          @keyframes float-slow-1 {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-12px) scale(1.02); }
          }
          @keyframes float-slow-2 {
            0%, 100% { transform: translateY(0) scale(1) rotate(2deg); }
            50% { transform: translateY(-8px) scale(1.02) rotate(0deg); }
          }
          @keyframes grid-slide {
            0% { background-position: 0 0; }
            100% { background-position: 40px 40px; }
          }
          @keyframes glow-pulse {
            0%, 100% { opacity: 0.08; transform: scale(1); }
            50% { opacity: 0.15; transform: scale(1.08); }
          }

          .futuristic-grid {
            background-size: 36px 36px;
            background-image: 
              linear-gradient(to right, rgba(85, 16, 13, 0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(85, 16, 13, 0.03) 1px, transparent 1px);
            animation: grid-slide 25s linear infinite;
          }
          .glow-sphere-indigo {
            animation: glow-pulse 8s ease-in-out infinite;
          }
          .glow-sphere-crimson {
            animation: glow-pulse 10s ease-in-out infinite 2s;
          }
          .floating-badge-1 {
            animation: float-slow-1 6s ease-in-out infinite;
          }
          .floating-badge-2 {
            animation: float-slow-2 7s ease-in-out infinite;
          }
          .pulse-dot {
            box-shadow: 0 0 0 0 rgba(221, 2, 0, 0.7);
            animation: dot-pulse 2s infinite;
          }
          @keyframes dot-pulse {
            0% {
              transform: scale(0.95);
              box-shadow: 0 0 0 0 rgba(221, 2, 0, 0.7);
            }
            70% {
              transform: scale(1);
              box-shadow: 0 0 0 8px rgba(221, 2, 0, 0);
            }
            100% {
              transform: scale(0.95);
              box-shadow: 0 0 0 0 rgba(221, 2, 0, 0);
            }
          }
        `}
      </style>

      {/* 2. BACKGROUND GRAPHICS */}
      <div className="absolute inset-0 futuristic-grid pointer-events-none opacity-80" />
      <div className="absolute w-[600px] h-[600px] bg-[#55100D]/5 rounded-full blur-[140px] -top-60 -left-40 glow-sphere-indigo pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] bg-[#DD0200]/5 rounded-full blur-[130px] -bottom-40 -right-40 glow-sphere-crimson pointer-events-none" />

      {/* 3. MAIN HERO CONTENT */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Deep Clinical Details */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Top Heritage Badge */}
            <div className="inline-flex flex-wrap items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#55100D]/5 border border-[#55100D]/15 text-[#55100D] text-xs font-black uppercase tracking-wider shadow-xs">
              <Award className="w-4 h-4 text-[#DD0200]" />
              <span>
                {lang === 'hi'
                  ? 'स्थापना 1958 गया • 68 वर्षों से मगध प्रमंडल की सेवा में समर्पित'
                  : 'ESTABLISHED 1958 GAYA • SERVING MAGADH DIVISION FOR 68+ YEARS'}
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded-full ml-1 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" />
                {lang === 'hi' ? 'आज परामर्श हेतु खुला है' : 'OPEN FOR CONSULTATION TODAY'}
              </span>
            </div>

            {/* Clinic Main Title & Subtitle */}
            <div className="space-y-2.5">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#1A0706] leading-none">
                {lang === 'hi' ? 'डॉ. क्यू. एच. खान' : 'DR. Q.H. KHAN'}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#55100D] via-[#8B1A17] to-[#DD0200] text-2xl sm:text-3.5xl lg:text-4xl font-black mt-2 tracking-wide">
                  {lang === 'hi' ? 'क्लासिकल होम्योपैथिक क्लिनिक' : 'CLASSICAL HOMOEOPATHIC CLINIC'}
                </span>
              </h1>
              
              <div className="flex items-center gap-2 text-xs font-black text-[#DD0200] tracking-widest uppercase">
                <Zap className="w-4 h-4 text-[#DD0200] animate-pulse" />
                <span>
                  {lang === 'hi' 
                    ? '1958 से मगध प्रमंडल की सेवा में समर्पित क्लासिकल क्लिनिक' 
                    : 'SERVING MAGADH DIVISION WITH CLASSICAL CARE SINCE 1958'}
                </span>
              </div>
            </div>

            {/* Solid Detailed Description Paragraph */}
            <div className="bg-white/80 backdrop-blur-xs border border-slate-200 p-5 rounded-2xl shadow-xs space-y-3">
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-semibold">
                {lang === 'hi'
                  ? 'स्वर्गीय डॉ. क्यू. एच. खान द्वारा 1958 में स्थापित, हमारा क्लिनिक पिछले 68 से अधिक वर्षों से गया, औरंगाबाद, नवादा, जहानाबाद, अरवल एवं संपूर्ण मगध प्रमंडल (Magadh Division) के लोगों की निस्वार्थ चिकित्सा सेवा में समर्पित रहा है। हम क्रोनिक त्वचा विकारों (सोरियासिस, एक्जिमा), विटिलिगो (सफेद दाग), मानसिक एवं मस्तिष्क रोगों (तनाव, अवसाद/डिप्रेशन, माइग्रेन), पुरुष स्वास्थ्य (प्रोस्टेट, बांझपन), महिला स्वास्थ्य (गर्भाशय विकार, PCOD, फाइब्रॉइड) और बाल रोगों (टॉन्सिल, एडेनोइड्स, बिस्तर गीला करना) के लिए प्रामाणिक संवैधानिक होम्योपैथिक परामर्श प्रदान करते हैं।'
                  : 'Founded in 1958 by Late Dr. Q.H. Khan, our clinic has proudly served the people of Gaya, Aurangabad, Nawada, Jehanabad, Arwal, and the entire Magadh Division for over 68 years. We specialize in deep constitutional homoeopathic care for Chronic Skin Diseases (Psoriasis, Eczema), Vitiligo, Brain & Mental Health (Anxiety, Depression, Migraine), Men’s Health (Prostate, Infertility), Women’s Health (PCOD, Uterine Fibroids), and Pediatric Care (Adenoids, Bed-wetting).'}
              </p>

              {/* Magadh Division Regional Trust Badge */}
              <div className="bg-[#55100D]/5 border border-[#55100D]/12 p-3 rounded-xl flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#55100D] text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
                  🏛️
                </div>
                <div className="text-xs">
                  <strong className="font-extrabold text-[#55100D] block text-[11px]">
                    {lang === 'hi' ? 'मगध प्रमंडल का ऐतिहासिक एवं भरोसेमंद चिकित्सा संस्थान (Est. 1958)' : 'Historical Institution of Magadh Division (Est. 1958)'}
                  </strong>
                  <p className="text-slate-600 font-semibold text-[11px] leading-snug">
                    {lang === 'hi'
                      ? 'गया, औरंगाबाद, नवादा, जहानाबाद और अरवल जिलों के परिवारों का 68 वर्षों का अटूट विश्वास।'
                      : 'Trusted by thousands of families across Gaya, Aurangabad, Nawada, Jehanabad & Arwal districts.'}
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 pt-1 text-[11px] font-bold text-slate-600 border-t border-slate-100">
                <span className="flex items-center gap-1.5 text-[#55100D]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#DD0200]" />
                  {lang === 'hi' ? '100% गोपनीय केस अध्ययन' : '100% Confidential Case Intake'}
                </span>
                <span className="flex items-center gap-1.5 text-[#55100D]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#DD0200]" />
                  {lang === 'hi' ? 'पंजीकृत योग्य विशेषज्ञ टीम' : 'Registered Clinical Specialists'}
                </span>
                <span className="flex items-center gap-1.5 text-[#55100D]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#DD0200]" />
                  {lang === 'hi' ? 'संवैधानिक होम्योपैथिक नुस्खे' : 'Constitutional Homoeopathic Remedies'}
                </span>
              </div>
            </div>

            {/* Action CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/appointment"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#55100D] via-[#701511] to-[#DD0200] hover:from-[#DD0200] hover:to-[#55100D] text-white font-black text-xs shadow-lg transition-all hover:-translate-y-0.5 tracking-wide shrink-0"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-white pulse-dot shrink-0" />
                <Calendar className="w-4 h-4" />
                <span>{lang === 'hi' ? 'अपॉइंटमेंट बुक करें' : 'Book Consultation Appointment'}</span>
              </Link>

              <a
                href="tel:9135404090"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white border border-[#D9D9D9] hover:bg-slate-50 text-[#1A0706] font-extrabold text-xs transition-all hover:-translate-y-0.5 shadow-sm hover:border-[#55100D]/50 shrink-0"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>{lang === 'hi' ? 'हेल्पलाइन कॉल करें' : 'Call Helpline'}</span>
              </a>

              <a
                href={`https://wa.me/91${clinicConfig.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white border border-[#D9D9D9] hover:bg-slate-50 text-[#1A0706] font-extrabold text-xs transition-all hover:-translate-y-0.5 shadow-sm hover:border-[#55100D]/50 shrink-0"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>{lang === 'hi' ? 'व्हाट्सएप कंसल्ट' : 'WhatsApp Consultation'}</span>
              </a>

              <a
                href={clinicConfig.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white border border-[#D9D9D9] hover:bg-slate-50 text-[#1A0706] font-extrabold text-xs transition-all hover:-translate-y-0.5 shadow-sm hover:border-[#55100D]/50 shrink-0"
              >
                <MapPin className="w-4 h-4 text-[#DD0200]" />
                <span>{lang === 'hi' ? 'नगमटिया रोड गया' : 'Location Directions'}</span>
              </a>
            </div>

            {/* Operating Schedule Card */}
            <div className="bg-[#1A0706] text-white rounded-2xl p-4 sm:p-5 space-y-2 text-xs border border-white/10 shadow-lg">
              <div className="flex items-center justify-between border-b border-white/15 pb-2">
                <div className="flex items-center gap-2 text-[#DD0200]">
                  <Clock className="w-4 h-4 text-[#DD0200]" />
                  <span className="font-black uppercase tracking-wider text-white">
                    {lang === 'hi' ? 'क्लिनिक परामर्श समय (Timing Schedule)' : 'Clinic Operating Schedule'}
                  </span>
                </div>
                <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  {lang === 'hi' ? 'रविवार को भी खुला' : 'Open All 7 Days'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                <div>
                  <span className="text-slate-400 font-bold block text-[11px]">
                    {lang === 'hi' ? 'सोमवार - शनिवार (Mon - Sat):' : 'Monday to Saturday:'}
                  </span>
                  <p className="font-extrabold text-white text-xs mt-0.5">
                    {lang === 'hi'
                      ? 'सुबह 8:00 AM - 12:00 PM | शाम 2:00 PM - 8:00 PM'
                      : `${clinicConfig.timings.weekdayMorning} (Morning) | ${clinicConfig.timings.weekdayEvening} (Evening)`}
                  </p>
                </div>
                <div>
                  <span className="text-emerald-400 font-bold block text-[11px]">
                    {lang === 'hi' ? 'रविवार का विशेष समय (Sunday):' : 'Sunday Schedule:'}
                  </span>
                  <p className="font-extrabold text-emerald-300 text-xs mt-0.5">
                    {lang === 'hi'
                      ? 'सुबह 7:00 AM - 12:00 PM & शाम 2:00 PM - 8:00 PM'
                      : clinicConfig.timings.sundayTiming}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Founder Portrait & Legacy Showcase */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            <div className="relative w-full max-w-md">
              
              {/* Main Founder Card */}
              <div className="relative bg-white border border-[#D9D9D9] p-3.5 rounded-3xl shadow-xl space-y-3 overflow-hidden">
                
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-100">
                  <Image
                    src="/images/dr-qh-khan.png"
                    alt={lang === 'hi' ? 'स्वर्गीय डॉ. क्यू. एच. खान' : 'Late Dr. Q.H. Khan'}
                    width={500}
                    height={625}
                    className="w-full h-full object-cover filter brightness-95 contrast-102 transition duration-500 hover:scale-102"
                    priority
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=500&auto=format&fit=crop';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Info Badge overlaid over portrait */}
                  <div className="absolute bottom-4 inset-x-4 text-white space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-[#DD0200] text-white px-2.5 py-0.5 rounded-full inline-block">
                      {lang === 'hi' ? 'संस्थापक एवं प्रेरणा' : 'Founder & Eternal Pioneer'}
                    </span>
                    <h3 className="text-xl font-black text-white leading-tight">
                      {lang === 'hi' ? 'स्वर्गीय डॉ. क्यू. एच. खान' : 'Late Dr. Q.H. Khan'}
                    </h3>
                    <p className="text-xs font-bold text-slate-200">
                      B.H.M.S. (B.U.) | R.B.S.M.H.C.
                    </p>
                    <p className="text-[11px] text-slate-300 font-semibold italic">
                      {lang === 'hi' ? '1958 से गया में क्लासिकल होम्योपैथी के अग्रदूत' : 'Pioneer of Classical Homoeopathy in Gaya since 1958'}
                    </p>
                  </div>
                </div>

                {/* Founder Legacy Quote Box */}
                <div className="bg-[#55100D]/5 border border-[#55100D]/10 p-3.5 rounded-2xl space-y-1 text-xs">
                  <span className="font-extrabold text-[#55100D] block text-[11px] uppercase tracking-wider">
                    {lang === 'hi' ? 'संस्थापक का जीवन संदेश:' : 'Founder’s Life Philosophy:'}
                  </span>
                  <p className="text-slate-700 font-bold italic leading-relaxed text-[11px]">
                    {lang === 'hi'
                      ? '"चिकित्सा केवल एक पेशा नहीं, बल्कि मानव समाज की निस्वार्थ सेवा (Samaj Seva) है।"'
                      : '"Healing is not merely a profession, but a selfless commitment to human society (Samaj Seva)."'}
                  </p>
                </div>
              </div>

              {/* Floating Badge 1: 68+ Years Legacy */}
              <div className="absolute -top-4 -left-6 bg-white border border-[#D9D9D9] rounded-2xl p-3 shadow-lg flex items-center gap-3 transform -rotate-3 floating-badge-1 hidden sm:flex">
                <div className="w-10 h-10 rounded-xl bg-[#55100D]/10 flex items-center justify-center text-[#55100D] shrink-0 border border-[#55100D]/20">
                  <Award className="w-5 h-5 text-[#55100D]" />
                </div>
                <div>
                  <p className="text-[9px] text-slate-500 font-black uppercase tracking-wider">
                    {lang === 'hi' ? 'अटूट धरोहर' : 'Clinical Legacy'}
                  </p>
                  <p className="text-xs font-black text-[#1A0706]">
                    {lang === 'hi' ? '1958 से 68+ वर्ष' : '68+ Years (Since 1958)'}
                  </p>
                </div>
              </div>

              {/* Floating Badge 2: 10,000+ Cases */}
              <div className="absolute -bottom-4 -right-6 bg-white border border-[#D9D9D9] rounded-2xl p-3 shadow-lg flex items-center gap-3 transform rotate-3 floating-badge-2 hidden sm:flex">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700 shrink-0 border border-emerald-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-[9px] text-slate-500 font-black uppercase tracking-wider">
                    {lang === 'hi' ? 'सफल परामर्श' : 'Patient Consultations'}
                  </p>
                  <p className="text-xs font-black text-[#1A0706]">
                    {lang === 'hi' ? '10,000+ केस परामर्श' : '10,000+ Cases Served'}
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* 4. SOLID 4-COLUMN CLINICAL SPECIALTIES HIGHLIGHT GRID (EQUAL HEIGHT & FULLY RESPONSIVE) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 pt-6 border-t border-slate-200/80">
          
          {/* Card 1: Skin & Private Diseases (Vibrant Royal Indigo) */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-indigo-300 hover:bg-gradient-to-b hover:from-white hover:to-indigo-50/20 transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between h-full group">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/15 via-blue-500/10 to-indigo-600/25 border border-indigo-200 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-110 transition-transform duration-300">
                <ShieldCheck className="w-6 h-6 text-indigo-600 drop-shadow-xs" />
              </div>
              <div className="space-y-1.5 flex-1">
                <h4 className="font-extrabold text-slate-900 text-sm sm:text-base group-hover:text-indigo-700 transition-colors leading-snug">
                  {lang === 'hi' ? 'त्वचा एवं गुप्त रोग विशेषज्ञ' : 'Skin & Private Diseases'}
                </h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {lang === 'hi'
                    ? 'सोरियासिस, एक्जिमा, बवासीर, फिशर एवं गुप्त रोगों का गोपनीय संवैधानिक उपचार।'
                    : 'Specialized constitutional care for Psoriasis, Eczema, Piles & Fissure.'}
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Vitiligo & Leucoderma Care (Vibrant Gold/Amber) */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-amber-300 hover:bg-gradient-to-b hover:from-white hover:to-amber-50/20 transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between h-full group">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/15 via-orange-500/10 to-amber-600/25 border border-amber-200 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-6 h-6 text-amber-600 drop-shadow-xs" />
              </div>
              <div className="space-y-1.5 flex-1">
                <h4 className="font-extrabold text-slate-900 text-sm sm:text-base group-hover:text-amber-700 transition-colors leading-snug">
                  {lang === 'hi' ? 'विटिलिगो एवं ल्यूकोडर्मा केंद्र' : 'Vitiligo & Leucoderma Care'}
                </h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {lang === 'hi'
                    ? 'सफेद दाग एवं त्वचा रंजकता का 68 वर्षों से स्थापित होम्योपैथिक मूल्यांकन।'
                    : 'Decades of specialized homoeopathic evaluation for skin pigmentation.'}
                </p>
              </div>
            </div>
          </div>

          {/* Card 3: Men, Women & Pediatric Care (Vibrant Crimson/Rose) */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-rose-300 hover:bg-gradient-to-b hover:from-white hover:to-rose-50/20 transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between h-full group">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500/15 via-pink-500/10 to-rose-600/25 border border-rose-200 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-110 transition-transform duration-300">
                <HeartPulse className="w-6 h-6 text-rose-600 drop-shadow-xs" />
              </div>
              <div className="space-y-1.5 flex-1">
                <h4 className="font-extrabold text-slate-900 text-sm sm:text-base group-hover:text-rose-700 transition-colors leading-snug">
                  {lang === 'hi' ? 'पुरुष, महिला एवं बाल रोग' : 'Men, Women & Pediatric Care'}
                </h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {lang === 'hi'
                    ? 'प्रोस्टेट, हाइड्रोसील, PCOD, फाइब्रॉइड, एडेनोइड्स एवं संपूर्ण बाल स्वास्थ्य।'
                    : 'Prostate, Hydrocele, PCOD, Fibroids, Adenoids & Child Healthcare.'}
                </p>
              </div>
            </div>
          </div>

          {/* Card 4: Registered Clinical Team (Vibrant Emerald/Teal) */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-emerald-300 hover:bg-gradient-to-b hover:from-white hover:to-emerald-50/20 transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between h-full group">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-emerald-600/25 border border-emerald-200 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-110 transition-transform duration-300">
                <UserCheck className="w-6 h-6 text-emerald-600 drop-shadow-xs" />
              </div>
              <div className="space-y-1.5 flex-1">
                <h4 className="font-extrabold text-slate-900 text-sm sm:text-base group-hover:text-emerald-700 transition-colors leading-snug">
                  {lang === 'hi' ? 'पंजीकृत होम्योपैथिक विशेषज्ञ' : 'Registered Clinical Team'}
                </h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {lang === 'hi'
                    ? 'अनुभवी एवं पंजीकृत बी.एच.एम.एस. चिकित्सकों द्वारा व्यक्तिगत केस स्टडी।'
                    : 'Intake and constitutional evaluation by qualified registered doctors.'}
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
