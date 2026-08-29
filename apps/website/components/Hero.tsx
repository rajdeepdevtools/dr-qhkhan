'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Phone, MessageSquare, MapPin, Award, Clock, CheckCircle2, ShieldCheck } from 'lucide-react';
import { clinicConfig } from '../lib/clinicConfig';
import { useLanguage } from '../lib/language-context';

export const Hero: React.FC = () => {
  const { lang } = useLanguage();

  return (
    <section className="relative bg-white border-b border-slate-250/60 overflow-hidden py-12 md:py-16">
      {/* Light Clean Subtle Dot Grid Background */}
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Details */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-clinic-indigo/5 border border-clinic-indigo/10 text-clinic-indigo text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-clinic-indigo" />
              <span>
                {lang === 'hi'
                  ? 'स्थापना 1958 • 68 वर्षों से अधिक का चिकित्सा विश्वास'
                  : 'ESTABLISHED 1958 • 68+ YEARS OF HEALING LEGACY'}
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 leading-none">
                {lang === 'hi' ? 'डॉ. क्यू. एच. खान' : 'DR. Q.H. KHAN'}
                <span className="block text-clinic-indigo text-2xl sm:text-3xl font-extrabold mt-2 tracking-wide">
                  {lang === 'hi' ? 'क्लासिकल होम्योपैथिक क्लिनिक' : 'CLASSICAL HOMOEOPATHIC CLINIC'}
                </span>
              </h1>
              <p className="text-xs font-bold text-clinic-crimson tracking-widest uppercase">
                {lang === 'hi' ? 'संवैधानिक और समग्र होम्योपैथी उपचार' : 'CONSTITUTIONAL & HOLISTIC HEALTHCARE'}
              </p>
            </div>

            <p className="text-slate-600 text-xs sm:text-sm max-w-2xl leading-relaxed font-medium">
              {lang === 'hi'
                ? 'गया के सबसे पुराने और सबसे भरोसेमंद होम्योपैथिक क्लिनिक में संवैधानिक होम्योपैथी की उपचार शक्ति का अनुभव करें। हमारे संस्थापक, स्वर्गीय डॉ. क्यू. एच. खान की चिकित्सा विरासत को हमारी सक्रिय विशेषज्ञ टीम के माध्यम से निरंतर आगे बढ़ाया जा रहा है।'
                : 'Experience the healing power of constitutional homoeopathy at Gaya’s oldest and most trusted homoeopathic clinic. Continuing the medical legacy of our founder, Late Dr. Q.H. Khan, through our active team of registered clinical specialists.'}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/appointment"
                className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl bg-clinic-crimson hover:bg-amber-700 text-white font-bold text-xs shadow-md transition-all hover:-translate-y-0.5"
              >
                <Calendar className="w-4 h-4" />
                <span>{lang === 'hi' ? 'अपॉइंटमेंट बुक करें' : 'Book Appointment'}</span>
              </Link>

              <a
                href="tel:9135404090"
                className="inline-flex items-center gap-1.5 px-4.5 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs border border-slate-200 transition-all hover:-translate-y-0.5"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>{lang === 'hi' ? 'कॉल हेल्पलाइन' : 'Call Helpline'}</span>
              </a>

              <a
                href={`https://wa.me/91${clinicConfig.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4.5 py-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-200 transition-all hover:-translate-y-0.5"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>{lang === 'hi' ? 'व्हाट्सएप' : 'WhatsApp'}</span>
              </a>

              <a
                href={clinicConfig.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4.5 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-850 font-bold text-xs border border-slate-200 transition-all hover:-translate-y-0.5"
              >
                <MapPin className="w-4 h-4 text-rose-500" />
                <span>{lang === 'hi' ? 'दिशा-निर्देश' : 'Directions'}</span>
              </a>
            </div>

            {/* Core Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-slate-700 font-semibold text-xs border-t border-slate-100">
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
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2 text-xs font-semibold">
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
            {/* Glowing Ambient Light Effect */}
            <div className="absolute w-64 h-64 bg-slate-100 rounded-full blur-3xl -top-10 -right-10 pointer-events-none" />

            <div className="relative group mt-8 lg:mt-0">
              <div className="relative bg-white border border-slate-200 p-3 rounded-3xl shadow-xl overflow-hidden max-w-sm sm:max-w-md">
                <Image
                  src="/images/dr-qh-khan.png"
                  alt={lang === 'hi' ? 'स्वर्गीय डॉ. क्यू. एच. खान' : 'Late Dr. Q.H. Khan'}
                  width={500}
                  height={625}
                  className="rounded-2xl object-cover aspect-[4/5] filter brightness-95 transition duration-500"
                  priority
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
              <div className="absolute -top-4 -left-6 bg-white border border-slate-200 rounded-2xl p-2.5 shadow-lg flex items-center gap-3 transform -rotate-3 transition-transform duration-300">
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
              <div className="absolute -bottom-4 -right-6 bg-white border border-slate-200 rounded-2xl p-2.5 shadow-lg flex items-center gap-3 transform rotate-3 transition-transform duration-300">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-white shrink-0">
                  <CheckCircle2 className="w-4.5 h-4.5" />
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
