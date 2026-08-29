'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Phone, MessageSquare, MapPin, Award, Clock, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { clinicConfig } from '../lib/clinicConfig';
import { useLanguage } from '../lib/language-context';

export const Hero: React.FC = () => {
  const { lang } = useLanguage();

  return (
    <section className="relative bg-white border-b border-slate-200/80 overflow-hidden py-16 md:py-24 text-slate-800">
      
      {/* 1. FUTURISTIC STYLING & ANIMATIONS BLOCK */}
      <style>
        {`
          @keyframes float-slow-1 {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-15px) scale(1.03); }
          }
          @keyframes float-slow-2 {
            0%, 100% { transform: translateY(0) scale(1) rotate(3deg); }
            50% { transform: translateY(-10px) scale(1.02) rotate(1deg); }
          }
          @keyframes float-slow-3 {
            0%, 100% { transform: translateY(0) scale(1) rotate(-3deg); }
            50% { transform: translateY(12px) scale(1.02) rotate(-1deg); }
          }
          @keyframes grid-slide {
            0% { background-position: 0 0; }
            100% { background-position: 40px 40px; }
          }
          @keyframes glow-pulse {
            0%, 100% { opacity: 0.08; transform: scale(1); }
            50% { opacity: 0.15; transform: scale(1.1); }
          }
          @keyframes content-slide-up {
            from { transform: translateY(24px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }

          .futuristic-grid {
            background-size: 40px 40px;
            background-image: 
              linear-gradient(to right, rgba(0, 0, 0, 0.02) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 0, 0, 0.02) 1px, transparent 1px);
            animation: grid-slide 20s linear infinite;
          }
          .glow-sphere-indigo {
            animation: glow-pulse 8s ease-in-out infinite;
          }
          .glow-sphere-crimson {
            animation: glow-pulse 10s ease-in-out infinite 2s;
          }
          .animate-fade-in-up {
            opacity: 0;
            animation: content-slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          .animate-fade-in-up-delay-1 {
            opacity: 0;
            animation: content-slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards;
          }
          .animate-fade-in-up-delay-2 {
            opacity: 0;
            animation: content-slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
          }
          .floating-badge-1 {
            animation: float-slow-2 6s ease-in-out infinite;
          }
          .floating-badge-2 {
            animation: float-slow-3 7s ease-in-out infinite;
          }
          .pulse-dot {
            box-shadow: 0 0 0 0 rgba(225, 29, 72, 0.7);
            animation: dot-pulse 2s infinite;
          }
          @keyframes dot-pulse {
            0% {
              transform: scale(0.95);
              box-shadow: 0 0 0 0 rgba(225, 29, 72, 0.7);
            }
            70% {
              transform: scale(1);
              box-shadow: 0 0 0 8px rgba(225, 29, 72, 0);
            }
            100% {
              transform: scale(0.95);
              box-shadow: 0 0 0 0 rgba(225, 29, 72, 0);
            }
          }
          @keyframes spin-slow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 80s linear infinite;
          }
        `}
      </style>

      {/* 2. BACKGROUND LAYERS */}
      {/* Animated grid */}
      <div className="absolute inset-0 futuristic-grid pointer-events-none" />

      {/* Floating glowing orbs */}
      <div className="absolute w-[600px] h-[600px] bg-clinic-indigo/5 rounded-full blur-[130px] -top-80 -left-60 glow-sphere-indigo pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] bg-clinic-crimson/5 rounded-full blur-[120px] -bottom-40 -right-40 glow-sphere-crimson pointer-events-none" />
      <div className="absolute w-[350px] h-[350px] bg-emerald-500/5 rounded-full blur-[100px] top-40 right-1/3 pointer-events-none" />

      {/* Rotating medical target radar graphic pattern */}
      <div className="absolute top-1/2 right-[15%] transform -translate-y-1/2 w-[600px] h-[600px] opacity-[0.08] pointer-events-none select-none animate-spin-slow">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-clinic-indigo">
          <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
          <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="0.75" />
          <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="8 4" />
          <line x1="100" y1="0" x2="100" y2="200" stroke="currentColor" strokeWidth="0.25" strokeDasharray="5 5" />
          <line x1="0" y1="100" x2="200" y2="100" stroke="currentColor" strokeWidth="0.25" strokeDasharray="5 5" />
        </svg>
      </div>

      {/* Futuristic DNA scientific network pattern on the left */}
      <div className="absolute top-1/4 left-10 w-72 h-72 opacity-[0.07] pointer-events-none select-none">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-clinic-indigo">
          <circle cx="20" cy="20" r="2.5" fill="currentColor" />
          <circle cx="50" cy="30" r="3.5" fill="currentColor" />
          <circle cx="80" cy="20" r="2.5" fill="currentColor" />
          <circle cx="30" cy="60" r="3" fill="currentColor" />
          <circle cx="70" cy="70" r="3.5" fill="currentColor" />
          <line x1="20" y1="20" x2="50" y2="30" stroke="currentColor" strokeWidth="0.75" />
          <line x1="50" y1="30" x2="80" y2="20" stroke="currentColor" strokeWidth="0.75" />
          <line x1="20" y1="20" x2="30" y2="60" stroke="currentColor" strokeWidth="0.75" />
          <line x1="30" y1="60" x2="50" y2="30" stroke="currentColor" strokeWidth="0.75" />
          <line x1="50" y1="30" x2="70" y2="70" stroke="currentColor" strokeWidth="0.75" />
          <line x1="80" y1="20" x2="70" y2="70" stroke="currentColor" strokeWidth="0.75" />
          <line x1="30" y1="60" x2="70" y2="70" stroke="currentColor" strokeWidth="0.75" />
        </svg>
      </div>

      {/* 3. HERO CONTENT */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Details */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Tag Badge */}
            <div className="animate-fade-in-up inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-clinic-indigo/5 border border-clinic-indigo/10 text-clinic-indigo text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-clinic-indigo" />
              <span>
                {lang === 'hi'
                  ? 'स्थापना 1958 • 68 वर्षों से अधिक का चिकित्सा विश्वास'
                  : 'ESTABLISHED 1958 • 68+ YEARS OF HEALING LEGACY'}
              </span>
            </div>

            {/* Headers */}
            <div className="space-y-3 animate-fade-in-up-delay-1">
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-[#1A0706] leading-none">
                {lang === 'hi' ? 'डॉ. क्यू. एच. खान' : 'DR. Q.H. KHAN'}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#55100D] to-[#DD0200] text-2xl sm:text-3.5xl font-extrabold mt-2 tracking-wide">
                  {lang === 'hi' ? 'क्लासिकल होम्योपैथिक क्लिनिक' : 'CLASSICAL HOMOEOPATHIC CLINIC'}
                </span>
              </h1>
              <p className="text-xs font-bold text-clinic-crimson tracking-widest uppercase flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-clinic-crimson animate-pulse" />
                {lang === 'hi' ? 'संवैधानिक और समग्र होम्योपैथी उपचार' : 'CONSTITUTIONAL & HOLISTIC HEALTHCARE'}
              </p>
            </div>

            {/* Description */}
            <p className="animate-fade-in-up-delay-2 text-slate-600 text-xs sm:text-sm max-w-2xl leading-relaxed font-medium">
              {lang === 'hi'
                ? 'गया के सबसे पुराने और सबसे भरोसेमंद होम्योपैथिक क्लिनिक में संवैधानिक होम्योपैथी की उपचार शक्ति का अनुभव करें। हमारे संस्थापक, स्वर्गीय डॉ. क्यू. एच. खान की चिकित्सा विरासत को हमारी सक्रिय विशेषज्ञ टीम के माध्यम से निरंतर आगे बढ़ाया जा रहा है।'
                : 'Experience the healing power of constitutional homoeopathy at Gaya’s oldest and most trusted homoeopathic clinic. Continuing the medical legacy of our founder, Late Dr. Q.H. Khan, through our active team of registered clinical specialists.'}
            </p>

            {/* Action CTAs */}
            <div className="animate-fade-in-up-delay-2 flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/appointment"
                className="inline-flex items-center gap-1.5 px-5.5 py-3 rounded-xl bg-gradient-to-r from-[#55100D] to-[#DD0200] hover:from-[#DD0200] hover:to-[#55100D] text-white font-extrabold text-xs shadow-md transition-all hover:-translate-y-0.5 tracking-wide"
              >
                <div className="w-2 h-2 rounded-full bg-white pulse-dot mr-1 shrink-0" />
                <Calendar className="w-4 h-4" />
                <span>{lang === 'hi' ? 'अपॉइंटमेंट बुक करें' : 'Book Appointment'}</span>
              </Link>

              <a
                href="tel:9135404090"
                className="inline-flex items-center gap-1.5 px-4.5 py-3 rounded-xl bg-white border border-[#D9D9D9] hover:bg-slate-50 text-[#1A0706] font-extrabold text-xs transition-all hover:-translate-y-0.5 shadow-sm hover:border-[#55100D]/50 hover:shadow-md"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>{lang === 'hi' ? 'कॉल हेल्पलाइन' : 'Call Helpline'}</span>
              </a>

              <a
                href={`https://wa.me/91${clinicConfig.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4.5 py-3 rounded-xl bg-white border border-[#D9D9D9] hover:bg-slate-50 text-[#1A0706] font-extrabold text-xs transition-all hover:-translate-y-0.5 shadow-sm hover:border-[#55100D]/50 hover:shadow-md"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>{lang === 'hi' ? 'व्हाट्सएप' : 'WhatsApp'}</span>
              </a>

              <a
                href={clinicConfig.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4.5 py-3 rounded-xl bg-white border border-[#D9D9D9] hover:bg-slate-50 text-[#1A0706] font-extrabold text-xs transition-all hover:-translate-y-0.5 shadow-sm hover:border-[#55100D]/50 hover:shadow-md"
              >
                <MapPin className="w-4 h-4 text-[#DD0200]" />
                <span>{lang === 'hi' ? 'दिशा-निर्देश' : 'Directions'}</span>
              </a>
            </div>

            {/* Core Highlights */}
            <div className="animate-fade-in-up-delay-2 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 text-slate-750 font-semibold text-xs border-t border-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  {lang === 'hi' ? 'त्वचा एवं गुप्त रोग विशेषज्ञ परामर्श' : 'Skin & Private Diseases Specialist'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  {lang === 'hi' ? 'ल्यूकोडर्मा और विटिलिगो विशेषज्ञ देखभाल' : 'Leucoderma & Vitiligo Expert Care'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  {lang === 'hi' ? '6 पंजीकृत एम.डी. और बी.एच.एम.एस. चिकित्सक' : '6 Registered M.D. & B.H.M.S. Doctors'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  {lang === 'hi' ? '1958 से स्थापित चिकित्सा प्रतिष्ठा' : 'Established Reputation Since 1958'}
                </span>
              </div>
            </div>

            {/* Operating Schedule */}
            <div className="animate-fade-in-up-delay-2 bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2 text-xs font-semibold">
              <div className="flex items-center gap-2 text-clinic-indigo">
                <Clock className="w-4 h-4 text-clinic-indigo" />
                <span className="font-bold uppercase tracking-wider">{lang === 'hi' ? 'क्लिनिक संचालन समय सारणी' : 'Clinic Operating Schedule'}</span>
              </div>
              <p className="text-slate-600">
                {lang === 'hi' ? 'सोमवार - शनिवार:' : 'Weekday Hours:'}{' '}
                <strong className="text-slate-900 font-bold">
                  {lang === 'hi'
                    ? 'सुबह: 8:00 AM – 12:00 PM | शाम: 2:00 PM – 8:00 PM'
                    : `${clinicConfig.timings.weekdayMorning} (Morning) | ${clinicConfig.timings.weekdayEvening} (Evening)`}
                </strong>
              </p>
              <p className="text-emerald-800 font-bold">
                {lang === 'hi' ? 'रविवार का समय:' : 'Sunday Schedule:'}{' '}
                <strong className="text-emerald-700">
                  {lang === 'hi'
                    ? 'खुला है (सुबह 7:00 AM – 12:00 PM एवं शाम 2:00 PM – 8:00 PM)'
                    : clinicConfig.timings.sundayTiming}
                </strong>
              </p>
            </div>
          </div>

          {/* Right Column: Visual Portrait Card */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            <div className="relative mt-8 lg:mt-0">
              
              {/* Outer card frame */}
              <div className="relative bg-white border border-slate-200 p-3 rounded-3xl shadow-xl overflow-hidden max-w-sm sm:max-w-md">
                
                <Image
                  src="/images/dr-qh-khan.png"
                  alt={lang === 'hi' ? 'स्वर्गीय डॉ. क्यू. एच. खान' : 'Late Dr. Q.H. Khan'}
                  width={500}
                  height={625}
                  className="rounded-2xl object-cover aspect-[4/5] filter brightness-95 contrast-102 transition duration-500 hover:brightness-98"
                  priority
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=500&auto=format&fit=crop';
                  }}
                />

                {/* Info Overlay at the bottom */}
                <div className="absolute bottom-5 inset-x-5 bg-white/95 border border-slate-200 p-4 rounded-xl space-y-1 shadow-md">
                  <h4 className="text-slate-900 text-sm font-bold">
                    {lang === 'hi' ? 'स्वर्गीय डॉ. क्यू. एच. खान' : 'Late Dr. Q.H. Khan'}
                  </h4>
                  <p className="text-clinic-crimson text-xs font-bold">
                    {lang === 'hi' ? 'संस्थापक और शाश्वत प्रेरणा' : 'Founder & Eternal Inspiration'}
                  </p>
                  <p className="text-slate-550 text-[10px] font-bold">B.H.M.S. (B.U.) | M.D. | R.B.S.M.H.C.</p>
                  <p className="text-slate-500 text-[10px] italic">
                    {lang === 'hi' ? '1958 से क्लासिकल होम्योपैथी के अग्रदूत' : 'Pioneer of classical homoeopathy since 1958'}
                  </p>
                </div>
              </div>

              {/* Floating Badge 1: Founder's Legacy */}
              <div className="absolute -top-4 -left-6 bg-white border border-slate-200 rounded-2xl p-2.5 shadow-lg flex items-center gap-3 transform -rotate-3 transition-transform duration-300 floating-badge-1">
                <div className="w-8 h-8 rounded-xl bg-clinic-indigo/5 flex items-center justify-center text-clinic-indigo shrink-0">
                  <Award className="w-4 h-4 text-clinic-indigo" />
                </div>
                <div>
                  <p className="text-[8px] text-slate-500 font-bold uppercase tracking-wider">
                    {lang === 'hi' ? 'विरासत' : 'Legacy'}
                  </p>
                  <p className="text-[11px] font-bold text-slate-800">
                    {lang === 'hi' ? 'स्मृति में' : 'In Memoriam'}
                  </p>
                </div>
              </div>

              {/* Floating Badge 2: Trusted Care */}
              <div className="absolute -bottom-4 -right-6 bg-white border border-slate-200 rounded-2xl p-2.5 shadow-lg flex items-center gap-3 transform rotate-3 transition-transform duration-300 floating-badge-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 border border-emerald-100">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-[8px] text-slate-500 font-bold uppercase tracking-wider">
                    {lang === 'hi' ? 'ठीक हुए मरीज' : 'Patients Served'}
                  </p>
                  <p className="text-[11px] font-bold text-slate-800">
                    {lang === 'hi' ? '10,000 से अधिक केस' : '10,000+ Cases'}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
