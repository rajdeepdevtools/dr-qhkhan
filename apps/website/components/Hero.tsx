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
    <section className="relative bg-slate-950 border-b border-slate-800/80 overflow-hidden py-16 md:py-24 text-white">
      
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
            0%, 100% { opacity: 0.12; transform: scale(1); }
            50% { opacity: 0.20; transform: scale(1.1); }
          }
          @keyframes content-slide-up {
            from { transform: translateY(24px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }

          .futuristic-grid {
            background-size: 40px 40px;
            background-image: 
              linear-gradient(to right, rgba(79, 70, 229, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(79, 70, 229, 0.05) 1px, transparent 1px);
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
        `}
      </style>

      {/* 2. BACKGROUND LAYERS */}
      {/* Animated grid */}
      <div className="absolute inset-0 futuristic-grid pointer-events-none" />

      {/* Floating glowing orbs */}
      <div className="absolute w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[130px] -top-80 -left-60 glow-sphere-indigo pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] bg-rose-600/5 rounded-full blur-[120px] -bottom-40 -right-40 glow-sphere-crimson pointer-events-none" />
      <div className="absolute w-[350px] h-[350px] bg-emerald-500/5 rounded-full blur-[100px] top-40 right-1/3 pointer-events-none" />

      {/* 3. HERO CONTENT */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Details */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Tag Badge */}
            <div className="animate-fade-in-up inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider shadow-inner">
              <Award className="w-3.5 h-3.5 text-indigo-400" />
              <span>
                {lang === 'hi'
                  ? 'स्थापना 1958 • 68 वर्षों से अधिक का चिकित्सा विश्वास'
                  : 'ESTABLISHED 1958 • 68+ YEARS OF HEALING LEGACY'}
              </span>
            </div>

            {/* Headers */}
            <div className="space-y-3 animate-fade-in-up-delay-1">
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-none">
                {lang === 'hi' ? 'डॉ. क्यू. एच. खान' : 'DR. Q.H. KHAN'}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-rose-450 text-2xl sm:text-3.5xl font-extrabold mt-2 tracking-wide">
                  {lang === 'hi' ? 'क्लासिकल होम्योपैथिक क्लिनिक' : 'CLASSICAL HOMOEOPATHIC CLINIC'}
                </span>
              </h1>
              <p className="text-xs font-bold text-rose-400 tracking-widest uppercase flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
                {lang === 'hi' ? 'संवैधानिक और समग्र होम्योपैथी उपचार' : 'CONSTITUTIONAL & HOLISTIC HEALTHCARE'}
              </p>
            </div>

            {/* Description */}
            <p className="animate-fade-in-up-delay-2 text-slate-350 text-xs sm:text-sm max-w-2xl leading-relaxed font-medium">
              {lang === 'hi'
                ? 'गया के सबसे पुराने और सबसे भरोसेमंद होम्योपैथिक क्लिनिक में संवैधानिक होम्योपैथी की उपचार शक्ति का अनुभव करें। हमारे संस्थापक, स्वर्गीय डॉ. क्यू. एच. खान की चिकित्सा विरासत को हमारी सक्रिय विशेषज्ञ टीम के माध्यम से निरंतर आगे बढ़ाया जा रहा है।'
                : 'Experience the healing power of constitutional homoeopathy at Gaya’s oldest and most trusted homoeopathic clinic. Continuing the medical legacy of our founder, Late Dr. Q.H. Khan, through our active team of registered clinical specialists.'}
            </p>

            {/* Action CTAs */}
            <div className="animate-fade-in-up-delay-2 flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/appointment"
                className="inline-flex items-center gap-1.5 px-5.5 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-xs shadow-lg shadow-rose-950/40 transition-all hover:-translate-y-0.5"
              >
                <div className="w-2 h-2 rounded-full bg-white pulse-dot mr-1 shrink-0" />
                <Calendar className="w-4 h-4" />
                <span>{lang === 'hi' ? 'अपॉइंटमेंट बुक करें' : 'Book Appointment'}</span>
              </Link>

              <a
                href="tel:9135404090"
                className="inline-flex items-center gap-1.5 px-4.5 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 font-bold text-xs transition-all hover:-translate-y-0.5"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>{lang === 'hi' ? 'कॉल हेल्पलाइन' : 'Call Helpline'}</span>
              </a>

              <a
                href={`https://wa.me/91${clinicConfig.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4.5 py-3 rounded-xl bg-emerald-950/20 border border-emerald-800/40 hover:bg-emerald-900/30 text-emerald-300 font-bold text-xs transition-all hover:-translate-y-0.5"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>{lang === 'hi' ? 'व्हाट्सएप' : 'WhatsApp'}</span>
              </a>

              <a
                href={clinicConfig.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4.5 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 font-bold text-xs transition-all hover:-translate-y-0.5"
              >
                <MapPin className="w-4 h-4 text-rose-500" />
                <span>{lang === 'hi' ? 'दिशा-निर्देश' : 'Directions'}</span>
              </a>
            </div>

            {/* Core Highlights */}
            <div className="animate-fade-in-up-delay-2 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 text-slate-300 font-semibold text-xs border-t border-slate-800/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>
                  {lang === 'hi' ? 'त्वचा एवं गुप्त रोग विशेषज्ञ परामर्श' : 'Skin & Private Diseases Specialist'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>
                  {lang === 'hi' ? 'ल्यूकोडर्मा और विटिलिगो विशेषज्ञ देखभाल' : 'Leucoderma & Vitiligo Expert Care'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>
                  {lang === 'hi' ? '6 पंजीकृत एम.डी. और बी.एच.एम.एस. चिकित्सक' : '6 Registered M.D. & B.H.M.S. Doctors'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>
                  {lang === 'hi' ? '1958 से स्थापित चिकित्सा प्रतिष्ठा' : 'Established Reputation Since 1958'}
                </span>
              </div>
            </div>

            {/* Operating Schedule */}
            <div className="animate-fade-in-up-delay-2 bg-slate-900/40 border border-slate-800/60 rounded-2xl p-4 space-y-2 text-xs font-semibold backdrop-blur-sm">
              <div className="flex items-center gap-2 text-indigo-400">
                <Clock className="w-4 h-4 text-indigo-400" />
                <span className="font-bold uppercase tracking-wider">{lang === 'hi' ? 'क्लिनिक संचालन समय सारणी' : 'Clinic Operating Schedule'}</span>
              </div>
              <p className="text-slate-400">
                {lang === 'hi' ? 'सोमवार - शनिवार:' : 'Weekday Hours:'}{' '}
                <strong className="text-slate-200 font-bold">
                  {lang === 'hi'
                    ? 'सुबह: 8:00 AM – 12:00 PM | शाम: 2:00 PM – 8:00 PM'
                    : `${clinicConfig.timings.weekdayMorning} (Morning) | ${clinicConfig.timings.weekdayEvening} (Evening)`}
                </strong>
              </p>
              <p className="text-emerald-400 font-bold">
                {lang === 'hi' ? 'रविवार का समय:' : 'Sunday Schedule:'}{' '}
                <strong className="text-emerald-350">
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
              
              {/* Outer card with neon borders */}
              <div className="relative bg-slate-900/80 border border-slate-800 p-3 rounded-3xl shadow-2xl overflow-hidden max-w-sm sm:max-w-md backdrop-blur-sm">
                
                <Image
                  src="/images/dr-qh-khan.png"
                  alt={lang === 'hi' ? 'स्वर्गीय डॉ. क्यू. एच. खान' : 'Late Dr. Q.H. Khan'}
                  width={500}
                  height={625}
                  className="rounded-2xl object-cover aspect-[4/5] filter brightness-90 contrast-105 transition duration-500 hover:brightness-95"
                  priority
                  onError={(e) => {
                    // Fail-safe professional clinical image if missing
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=500&auto=format&fit=crop';
                  }}
                />

                {/* Info Overlay at the bottom */}
                <div className="absolute bottom-5 inset-x-5 bg-slate-950/95 border border-slate-800 p-4 rounded-xl space-y-1 shadow-2xl backdrop-blur-sm">
                  <h4 className="text-white text-sm font-bold">
                    {lang === 'hi' ? 'स्वर्गीय डॉ. क्यू. एच. खान' : 'Late Dr. Q.H. Khan'}
                  </h4>
                  <p className="text-rose-400 text-xs font-bold">
                    {lang === 'hi' ? 'संस्थापक और शाश्वत प्रेरणा' : 'Founder & Eternal Inspiration'}
                  </p>
                  <p className="text-slate-455 text-[10px] font-bold">B.H.M.S. (B.U.) | M.D. | R.B.S.M.H.C.</p>
                  <p className="text-slate-400 text-[10px] italic">
                    {lang === 'hi' ? '1958 से क्लासिकल होम्योपैथी के अग्रदूत' : 'Pioneer of classical homoeopathy since 1958'}
                  </p>
                </div>
              </div>

              {/* Floating Badge 1: Founder's Legacy */}
              <div className="absolute -top-4 -left-6 bg-slate-900 border border-slate-800 rounded-2xl p-2.5 shadow-2xl flex items-center gap-3 transform -rotate-3 transition-transform duration-300 floating-badge-1 backdrop-blur-sm">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0">
                  <Award className="w-4 h-4 text-indigo-400" />
                </div>
                <div>
                  <p className="text-[8px] text-slate-500 font-bold uppercase tracking-wider">
                    {lang === 'hi' ? 'विरासत' : 'Legacy'}
                  </p>
                  <p className="text-[11px] font-bold text-white">
                    {lang === 'hi' ? 'स्मृति में' : 'In Memoriam'}
                  </p>
                </div>
              </div>

              {/* Floating Badge 2: Trusted Care */}
              <div className="absolute -bottom-4 -right-6 bg-slate-900 border border-slate-800 rounded-2xl p-2.5 shadow-2xl flex items-center gap-3 transform rotate-3 transition-transform duration-300 floating-badge-2 backdrop-blur-sm">
                <div className="w-8 h-8 rounded-xl bg-emerald-950/30 flex items-center justify-center text-emerald-400 shrink-0 border border-emerald-800/30">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-[8px] text-slate-500 font-bold uppercase tracking-wider">
                    {lang === 'hi' ? 'ठीक हुए मरीज' : 'Patients Served'}
                  </p>
                  <p className="text-[11px] font-bold text-white">
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
