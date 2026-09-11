'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, MessageSquare, ShieldAlert, Award, FileText, ArrowRight, Instagram, Youtube, Sparkles, Globe, ExternalLink } from 'lucide-react';
import { clinicConfig } from '../lib/clinicConfig';
import { useLanguage } from '../lib/language-context';

export const Footer: React.FC = () => {
  const { lang } = useLanguage();

  return (
    <div className="bg-slate-950 pt-16 px-4 sm:px-6 lg:px-8 no-print border-t border-slate-900">
      
      {/* Curved Premium Matte-Charcoal Card Footer Wrapper */}
      <footer className="bg-[#131314] w-full max-w-[1500px] mx-auto text-slate-300 pt-8 lg:pt-12 px-4 sm:px-8 md:px-12 lg:px-16 rounded-t-3xl overflow-hidden border border-white/5 shadow-2xl relative">
        
        {/* Top Disclaimer Banner (Matte Dark Mode) */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-10 flex items-start gap-3 text-xs text-white">
          <ShieldAlert className="w-5 h-5 text-clinic-crimson shrink-0 mt-0.5" />
          <p className="leading-relaxed font-bold tracking-wide">
            <strong className="text-white font-extrabold">
              {lang === 'hi' ? 'चिकित्सा अस्वीकरण' : 'Medical Disclaimer'}:
            </strong>{' '}
            {lang === 'hi'
              ? 'इस वेबसाइट पर प्रदान की गई जानकारी केवल सामान्य सूचनात्मक उद्देश्यों के लिए है और पेशेवर चिकित्सा निदान, उपचार या आपातकालीन देखभाल का विकल्प नहीं है।'
              : clinicConfig.medicalDisclaimer}{' '}
            <span className="text-[#DD0200] font-black underline">
              {lang === 'hi'
                ? 'यदि आप गंभीर, अचानक या जीवन के लिए खतरा पैदा करने वाले लक्षणों का अनुभव कर रहे हैं, तो तुरंत आपातकालीन चिकित्सा देखभाल लें।'
                : clinicConfig.emergencyWarning}
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 md:gap-12 items-start">
          
          {/* Brand & Socials Column */}
          <div className="lg:col-span-3 space-y-6">
            <Link href="/" className="flex items-center space-x-3 group">
              <img
                src="/images/logo.png"
                alt="Dr. Q.H. Khan Clinic Logo"
                className="w-10 h-10 rounded-xl shadow object-cover"
              />
              <div>
                <h3 className="font-black text-white text-base leading-none">
                  {lang === 'hi' ? 'डॉ. क्यू. एच. खान' : 'DR. Q.H. KHAN'}
                </h3>
                <p className="text-xs text-[#DD0200] font-bold uppercase tracking-wider mt-1">
                  {lang === 'hi' ? 'क्लासिकल होम्योपैथिक क्लिनिक' : 'CLASSICAL HOMOEOPATHIC CLINIC'}
                </p>
              </div>
            </Link>

            <p className="text-xs text-white leading-relaxed max-w-sm font-bold tracking-wide">
              {lang === 'hi'
                ? 'गया, बिहार में 1958 में स्थापित। छह दशकों से अधिक समय से संवैधानिक क्लासिकल होम्योपैथिक देखभाल का संरक्षण।'
                : 'Established in 1958 in Gaya, Bihar. Preserving constitutional classical homoeopathic care for over six decades.'}
            </p>

            <div className="flex flex-wrap items-center gap-3.5">
              <a
                href={clinicConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 p-[1px] group transition-all duration-300 hover:scale-110 shadow-[0_0_15px_rgba(236,72,153,0.25)] hover:shadow-[0_0_25px_rgba(236,72,153,0.65)]"
                title="Follow us on Instagram"
              >
                <div className="w-full h-full bg-[#131314] rounded-[11px] flex items-center justify-center text-rose-400 group-hover:bg-transparent group-hover:text-white transition-colors">
                  <Instagram className="w-4.5 h-4.5" />
                </div>
              </a>
              <a
                href={clinicConfig.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-rose-500/15 border border-rose-500/35 flex items-center justify-center text-rose-400 hover:text-white hover:bg-rose-600 hover:border-rose-500 transition-all duration-300 shadow-[0_0_15px_rgba(244,63,94,0.2)] hover:shadow-[0_0_25px_rgba(244,63,94,0.6)] hover:scale-110"
                title="Subscribe on YouTube"
              >
                <Youtube className="w-4.5 h-4.5" />
              </a>
              <a
                href={`https://wa.me/91${clinicConfig.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/35 flex items-center justify-center text-emerald-400 hover:text-white hover:bg-emerald-600 hover:border-emerald-500 transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.6)] hover:scale-110"
                title="WhatsApp Support"
              >
                <MessageSquare className="w-4.5 h-4.5" />
              </a>
              <a
                href="tel:9135404090"
                className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-500/35 flex items-center justify-center text-sky-400 hover:text-white hover:bg-sky-500 hover:border-sky-400 transition-all duration-300 shadow-[0_0_15px_rgba(56,189,248,0.2)] hover:shadow-[0_0_25px_rgba(56,189,248,0.6)] hover:scale-110"
                title="Call Helpline (+91 9135404090)"
              >
                <Phone className="w-4.5 h-4.5" />
              </a>
              <a
                href={clinicConfig.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/35 flex items-center justify-center text-amber-400 hover:text-white hover:bg-amber-500 hover:border-amber-400 transition-all duration-300 shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:shadow-[0_0_25px_rgba(245,158,11,0.6)] hover:scale-110"
                title="Google Maps Clinic Directions"
              >
                <MapPin className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          {/* Nav Links Column */}
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 lg:gap-24 items-start text-xs font-semibold">
            
            {/* Quick Navigation */}
            <div>
              <h4 className="font-extrabold text-white mb-4 text-xs uppercase tracking-widest">
                {lang === 'hi' ? 'नेविगेशन' : 'Navigation'}
              </h4>
              <ul className="space-y-3 text-white font-bold tracking-wide">
                <li>
                  <Link href="/" className="hover:text-rose-250 transition-colors">
                    {lang === 'hi' ? 'होम पेज' : 'Home'}
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-rose-250 transition-colors">
                    {lang === 'hi' ? 'इतिहास' : 'About Clinic'}
                  </Link>
                </li>
                <li>
                  <Link href="/doctors/dr-q-h-khan" className="hover:text-[#FF4D4D] transition-colors text-amber-300 font-extrabold flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-[#DD0200]" />
                    {lang === 'hi' ? 'संस्थापक जीवनी (Biography)' : 'Founder Biography'}
                  </Link>
                </li>
                <li>
                  <Link href="/doctors" className="hover:text-rose-250 transition-colors">
                    {lang === 'hi' ? 'डॉक्टर टीम' : 'Doctors'}
                  </Link>
                </li>
                <li>
                  <Link href="/treatments" className="hover:text-rose-250 transition-colors">
                    {lang === 'hi' ? 'उपचार सूची' : 'Treatments'}
                  </Link>
                </li>
                <li>
                  <Link href="/blogs" className="hover:text-rose-250 transition-colors">
                    {lang === 'hi' ? 'स्वास्थ्य ब्लॉग' : 'Blogs'}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Patient Portal / Help */}
            <div>
              <h4 className="font-extrabold text-white mb-4 text-xs uppercase tracking-widest">
                {lang === 'hi' ? 'मरीज पोर्टल' : 'Patient Help'}
              </h4>
              <ul className="space-y-3 text-white font-bold tracking-wide">
                <li>
                  <Link href="/login" className="hover:text-rose-250 transition-colors">
                    {lang === 'hi' ? 'पोर्टल लॉगिन' : 'Dashboard Login'}
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-rose-250 transition-colors">
                    {lang === 'hi' ? 'गोपनीयता नीति' : 'Privacy Policy'}
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-rose-250 transition-colors">
                    {lang === 'hi' ? 'सेवा शर्तें' : 'Terms of Service'}
                  </Link>
                </li>
                <li>
                  <Link href="/medical-disclaimer" className="hover:text-rose-250 transition-colors">
                    {lang === 'hi' ? 'अस्वीकरण' : 'Disclaimer'}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Clinic Info */}
            <div className="col-span-2 md:col-span-1">
              <h4 className="font-extrabold text-white mb-4 text-xs uppercase tracking-widest">
                {lang === 'hi' ? 'क्लिनिक समय' : 'Operations'}
              </h4>
              <ul className="space-y-3 text-white font-bold tracking-wide">
                <li>
                  <span className="text-white block font-extrabold">Mon - Sat:</span>
                  <span>{clinicConfig.timings.weekdayMorning}</span> <br />
                  <span>{clinicConfig.timings.weekdayEvening}</span>
                </li>
                <li>
                  <span className="text-emerald-400 block font-extrabold">Sunday Schedule:</span>
                  <span>{clinicConfig.timings.sundayTiming}</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Middle Divider */}
        <div className="max-w-7xl mx-auto mt-12 pt-4 border-t border-white/10 flex justify-between items-center text-xs text-slate-200 font-bold tracking-wide">
          <p>© {new Date().getFullYear()} {lang === 'hi' ? 'डॉ. क्यू. एच. खान क्लिनिक' : 'Dr. Q.H. Khan Clinic'}</p>
          <p>{lang === 'hi' ? 'सर्वाधिकार सुरक्षित।' : 'All rights reserved.'}</p>
        </div>

        {/* Arrangeman Media Agency Credit Card */}
        <div className="mt-8 bg-gradient-to-r from-slate-900/90 via-[#1a191b] to-slate-900/90 border border-amber-500/20 rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-semibold">
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 p-[1px] shrink-0 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              <div className="w-full h-full bg-[#131314] rounded-[11px] flex items-center justify-center text-amber-400">
                <Sparkles className="w-5 h-5" />
              </div>
            </div>
            <div>
              <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold">
                Website Design & Digital Architecture
              </p>
              <h4 className="text-sm font-extrabold text-white tracking-tight flex items-center gap-1.5 justify-center md:justify-start">
                Designed & Architected by <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200 font-black">Arrangeman Media</span>
              </h4>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 text-[11px]">
            {/* Phone */}
            <a
              href="tel:7301232069"
              className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-amber-500/40 text-slate-300 hover:text-white transition-all flex items-center gap-1.5 hover:bg-white/10 shadow-sm"
              title="Contact Arrangeman Media (+91 7301232069)"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>7301232069</span>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/arrangemanmedia"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-rose-500/40 text-slate-300 hover:text-white transition-all flex items-center gap-1.5 hover:bg-white/10 shadow-sm"
              title="Arrangeman Media Instagram"
            >
              <Instagram className="w-3.5 h-3.5 text-rose-400" />
              <span>@arrangemanmedia</span>
            </a>

            {/* Website Link */}
            <a
              href="https://arrangeman.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-extrabold transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:shadow-[0_0_20px_rgba(245,158,11,0.6)] hover:scale-105"
              title="Visit arrangeman.com"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>arrangeman.com</span>
              <ExternalLink className="w-3 h-3 opacity-80" />
            </a>
          </div>
        </div>

        {/* Ambient Glow Branding Banner */}
        <div className="relative mt-6 select-none">
          <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-3xl h-full max-h-64 bg-white/5 rounded-full blur-[100px] pointer-events-none" />
          <h3 className="text-center font-extrabold leading-[0.7] text-transparent text-[clamp(2rem,10vw,7.5rem)] [-webkit-text-stroke:1px_rgba(255,255,255,0.15)] mt-4 uppercase tracking-wider font-mono">
            DR. Q.H. KHAN
          </h3>
        </div>

      </footer>
    </div>
  );
};
