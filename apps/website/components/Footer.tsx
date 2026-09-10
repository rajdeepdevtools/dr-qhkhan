'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, MessageSquare, ShieldAlert, Award, FileText, ArrowRight } from 'lucide-react';
import { clinicConfig } from '../lib/clinicConfig';
import { useLanguage } from '../lib/language-context';

export const Footer: React.FC = () => {
  const { lang } = useLanguage();

  return (
    <div className="bg-[#07011D] pt-16 px-4 sm:px-6 lg:px-8 no-print border-t border-[#1F0270]/40">
      
      {/* Curved Premium Dark Patrick's Blue Footer Card Wrapper */}
      <footer className="bg-gradient-to-b from-[#120146] via-[#120146] to-[#0A002A] w-full max-w-[1500px] mx-auto text-slate-300 pt-8 lg:pt-12 px-4 sm:px-8 md:px-12 lg:px-16 rounded-t-3xl overflow-hidden border-t border-x border-[#F5B800]/30 shadow-[0_-15px_50px_rgba(18,1,70,0.6)] relative">
        
        {/* Top Disclaimer Banner */}
        <div className="relative bg-gradient-to-r from-[#F5B800]/10 via-[#1F0270]/40 to-[#F5B800]/5 border border-[#F5B800]/30 backdrop-blur-md rounded-2xl p-4 sm:p-5 mb-10 flex items-start gap-3.5 text-xs text-white shadow-xl overflow-hidden group">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#F5B800] via-[#F5B800]/80 to-[#F5B800]/30 rounded-l-2xl" />
          <ShieldAlert className="w-5 h-5 text-[#F5B800] shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
          <p className="leading-relaxed font-semibold tracking-wide text-slate-200">
            <strong className="text-[#F5B800] font-black uppercase tracking-wider mr-1">
              {lang === 'hi' ? 'चिकित्सा अस्वीकरण' : 'Medical Disclaimer'}:
            </strong>{' '}
            {lang === 'hi'
              ? 'इस वेबसाइट पर प्रदान की गई जानकारी केवल सामान्य सूचनात्मक उद्देश्यों के लिए है और पेशेवर चिकित्सा निदान, उपचार या आपातकालीन देखभाल का विकल्प नहीं है।'
              : clinicConfig.medicalDisclaimer}{' '}
            <span className="text-[#F5B800] font-black underline decoration-[#F5B800]/60 underline-offset-2 hover:text-white transition-colors cursor-pointer">
              {lang === 'hi'
                ? 'यदि आप गंभीर, अचानक या जीवन के लिए खतरा पैदा करने वाले लक्षणों का अनुभव कर रहे हैं, तो तुरंत आपातकालीन चिकित्सा देखभाल लें।'
                : clinicConfig.emergencyWarning}
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 md:gap-12 items-start">
          
          {/* Brand & Socials Column */}
          <div className="lg:col-span-3 space-y-6">
            <Link href="/" className="flex items-center space-x-3.5 group inline-flex">
              <div className="relative">
                <div className="absolute -inset-1 bg-[#F5B800]/30 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition duration-300" />
                <img
                  src="/images/logo.png"
                  alt="Dr. Q.H. Khan Clinic Logo"
                  className="relative w-11 h-11 rounded-xl shadow-lg object-cover ring-2 ring-[#F5B800]/50 p-0.5 bg-[#120146] transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div>
                <h3 className="font-heading font-black text-white text-lg leading-none tracking-tight group-hover:text-[#F5B800] transition-colors">
                  {lang === 'hi' ? 'डॉ. क्यू. एच. खान' : 'DR. Q.H. KHAN'}
                </h3>
                <p className="text-[11px] text-[#F5B800] font-black uppercase tracking-[0.15em] mt-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5B800] inline-block animate-pulse" />
                  {lang === 'hi' ? 'क्लासिकल होम्योपैथिक क्लिनिक' : 'CLASSICAL HOMOEOPATHIC CLINIC'}
                </p>
              </div>
            </Link>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm font-medium tracking-wide bg-white/5 border border-white/10 p-3.5 rounded-xl backdrop-blur-sm">
              {lang === 'hi'
                ? 'गया, बिहार में 1958 में स्थापित। छह दशकों से अधिक समय से संवैधानिक क्लासिकल होम्योपैथिक देखभाल का संरक्षण।'
                : 'Established in 1958 in Gaya, Bihar. Preserving constitutional classical homoeopathic care for over six decades.'}
            </p>

            <div className="flex gap-3 pt-1">
              <a
                href="tel:9135404090"
                className="w-9 h-9 rounded-xl bg-white/5 border border-[#F5B800]/30 flex items-center justify-center text-[#F5B800] hover:text-[#120146] hover:bg-[#F5B800] hover:border-[#F5B800] hover:scale-110 shadow-lg hover:shadow-[#F5B800]/25 transition-all duration-300"
                title="Call Helpline"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/91${clinicConfig.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 border border-emerald-500/30 flex items-center justify-center text-emerald-400 hover:text-white hover:bg-emerald-500 hover:border-emerald-400 hover:scale-110 shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
                title="WhatsApp Support"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href={clinicConfig.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 border border-[#F5B800]/30 flex items-center justify-center text-[#F5B800] hover:text-[#120146] hover:bg-[#F5B800] hover:border-[#F5B800] hover:scale-110 shadow-lg hover:shadow-[#F5B800]/25 transition-all duration-300"
                title="Google Maps"
              >
                <MapPin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Nav Links Column */}
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 lg:gap-16 items-start text-xs font-semibold">
            
            {/* Quick Navigation */}
            <div>
              <h4 className="font-extrabold text-[#F5B800] mb-4 text-xs uppercase tracking-[0.18em] flex items-center gap-2">
                <span className="h-0.5 w-3.5 bg-gradient-to-r from-[#F5B800] to-transparent rounded-full" />
                {lang === 'hi' ? 'नेविगेशन' : 'Navigation'}
              </h4>
              <ul className="space-y-3 text-slate-200 font-semibold tracking-wide">
                <li>
                  <Link href="/" className="group flex items-center gap-1.5 hover:text-[#F5B800] hover:translate-x-1 transition-all duration-200">
                    <span className="w-1 h-1 rounded-full bg-[#F5B800]/50 group-hover:bg-[#F5B800] group-hover:scale-125 transition-all" />
                    {lang === 'hi' ? 'होम पेज' : 'Home'}
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="group flex items-center gap-1.5 hover:text-[#F5B800] hover:translate-x-1 transition-all duration-200">
                    <span className="w-1 h-1 rounded-full bg-[#F5B800]/50 group-hover:bg-[#F5B800] group-hover:scale-125 transition-all" />
                    {lang === 'hi' ? 'इतिहास' : 'About Clinic'}
                  </Link>
                </li>
                <li>
                  <Link href="/doctors/dr-q-h-khan" className="group flex items-center gap-1.5 text-[#F5B800] font-black bg-[#F5B800]/10 border border-[#F5B800]/30 px-2 py-1 rounded-lg hover:bg-[#F5B800] hover:text-[#120146] hover:translate-x-1 transition-all duration-200 shadow-sm w-fit">
                    <Award className="w-3.5 h-3.5 shrink-0" />
                    {lang === 'hi' ? 'संस्थापक जीवनी' : 'Founder Biography'}
                  </Link>
                </li>
                <li>
                  <Link href="/doctors" className="group flex items-center gap-1.5 hover:text-[#F5B800] hover:translate-x-1 transition-all duration-200">
                    <span className="w-1 h-1 rounded-full bg-[#F5B800]/50 group-hover:bg-[#F5B800] group-hover:scale-125 transition-all" />
                    {lang === 'hi' ? 'डॉक्टर टीम' : 'Doctors'}
                  </Link>
                </li>
                <li>
                  <Link href="/treatments" className="group flex items-center gap-1.5 hover:text-[#F5B800] hover:translate-x-1 transition-all duration-200">
                    <span className="w-1 h-1 rounded-full bg-[#F5B800]/50 group-hover:bg-[#F5B800] group-hover:scale-125 transition-all" />
                    {lang === 'hi' ? 'उपचार सूची' : 'Treatments'}
                  </Link>
                </li>
                <li>
                  <Link href="/blogs" className="group flex items-center gap-1.5 hover:text-[#F5B800] hover:translate-x-1 transition-all duration-200">
                    <span className="w-1 h-1 rounded-full bg-[#F5B800]/50 group-hover:bg-[#F5B800] group-hover:scale-125 transition-all" />
                    {lang === 'hi' ? 'स्वास्थ्य ब्लॉग' : 'Blogs'}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Patient Portal / Help */}
            <div>
              <h4 className="font-extrabold text-[#F5B800] mb-4 text-xs uppercase tracking-[0.18em] flex items-center gap-2">
                <span className="h-0.5 w-3.5 bg-gradient-to-r from-[#F5B800] to-transparent rounded-full" />
                {lang === 'hi' ? 'मरीज पोर्टल' : 'Patient Help'}
              </h4>
              <ul className="space-y-3 text-slate-200 font-semibold tracking-wide">
                <li>
                  <Link href="/login" className="group flex items-center gap-1.5 hover:text-[#F5B800] hover:translate-x-1 transition-all duration-200">
                    <span className="w-1 h-1 rounded-full bg-[#F5B800]/50 group-hover:bg-[#F5B800] group-hover:scale-125 transition-all" />
                    {lang === 'hi' ? 'पोर्टल लॉगिन' : 'Dashboard Login'}
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="group flex items-center gap-1.5 hover:text-[#F5B800] hover:translate-x-1 transition-all duration-200">
                    <span className="w-1 h-1 rounded-full bg-[#F5B800]/50 group-hover:bg-[#F5B800] group-hover:scale-125 transition-all" />
                    {lang === 'hi' ? 'गोपनीयता नीति' : 'Privacy Policy'}
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="group flex items-center gap-1.5 hover:text-[#F5B800] hover:translate-x-1 transition-all duration-200">
                    <span className="w-1 h-1 rounded-full bg-[#F5B800]/50 group-hover:bg-[#F5B800] group-hover:scale-125 transition-all" />
                    {lang === 'hi' ? 'सेवा शर्तें' : 'Terms of Service'}
                  </Link>
                </li>
                <li>
                  <Link href="/medical-disclaimer" className="group flex items-center gap-1.5 hover:text-[#F5B800] hover:translate-x-1 transition-all duration-200">
                    <span className="w-1 h-1 rounded-full bg-[#F5B800]/50 group-hover:bg-[#F5B800] group-hover:scale-125 transition-all" />
                    {lang === 'hi' ? 'अस्वीकरण' : 'Disclaimer'}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Clinic Info / Operations */}
            <div className="col-span-2 md:col-span-1">
              <h4 className="font-extrabold text-[#F5B800] mb-4 text-xs uppercase tracking-[0.18em] flex items-center gap-2">
                <span className="h-0.5 w-3.5 bg-gradient-to-r from-[#F5B800] to-transparent rounded-full" />
                {lang === 'hi' ? 'क्लिनिक समय' : 'Operations'}
              </h4>
              <div className="space-y-3.5 text-slate-200 font-semibold tracking-wide">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  {lang === 'hi' ? 'सातों दिन खुला' : 'Open All 7 Days'}
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 space-y-1.5 backdrop-blur-sm shadow-inner">
                  <span className="text-white block font-black text-xs">Mon - Sat:</span>
                  <div className="text-[11px] text-slate-300 space-y-0.5">
                    <p>{clinicConfig.timings.weekdayMorning}</p>
                    <p>{clinicConfig.timings.weekdayEvening}</p>
                  </div>
                </div>
                <div className="bg-[#F5B800]/10 border border-[#F5B800]/30 rounded-xl p-3 space-y-1 backdrop-blur-sm">
                  <span className="text-[#F5B800] block font-black text-xs">Sunday Schedule:</span>
                  <p className="text-[11px] text-slate-200 font-bold">{clinicConfig.timings.sundayTiming}</p>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Middle Divider */}
        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 font-bold tracking-wide gap-3">
          <p>© {new Date().getFullYear()} {lang === 'hi' ? 'डॉ. क्यू. एच. खान क्लिनिक' : 'Dr. Q.H. Khan Clinic'}</p>
          <p className="flex items-center gap-2">
            <span>{lang === 'hi' ? 'सर्वाधिकार सुरक्षित।' : 'All rights reserved.'}</span>
          </p>
        </div>

        {/* Ambient Glow Branding Banner */}
        <div className="relative mt-8 select-none overflow-hidden pb-4">
          <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-4xl h-36 bg-gradient-to-t from-[#F5B800]/15 via-[#1F0270]/30 to-transparent blur-3xl pointer-events-none" />
          <h3 className="text-center font-heading font-black leading-[0.7] text-transparent text-[clamp(2.5rem,11vw,8.5rem)] [-webkit-text-stroke:1.5px_rgba(245,184,0,0.35)] hover:[-webkit-text-stroke:1.5px_rgba(245,184,0,0.65)] transition-all duration-500 tracking-wider">
            DR. Q.H. KHAN
          </h3>
        </div>

      </footer>
    </div>
  );
};
