'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Phone, MessageSquare, MapPin, Award, Clock, CheckCircle2 } from 'lucide-react';
import { clinicConfig } from '../lib/clinicConfig';
import { useLanguage } from '../lib/language-context';

export const Hero: React.FC = () => {
  const { lang } = useLanguage();

  return (
    <section className="relative bg-gradient-to-br from-clinic-indigo via-indigo-950 to-clinic-violet text-white overflow-hidden py-16 md:py-24">
      {/* Background Subtle Shapes */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Hero Copy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 text-xs font-semibold">
              <Award className="w-4 h-4 text-amber-400" />
              <span>
                {lang === 'hi'
                  ? 'स्थापना 1958 • 68 वर्षों से अधिक का चिकित्सा विश्वास'
                  : 'ESTABLISHED IN 1958 • OVER 68 YEARS OF HEALING'}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {lang === 'hi' ? 'डॉ. क्यू. एच. खान' : 'DR. Q.H. KHAN'}
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 text-2xl sm:text-3xl font-bold mt-1">
                {lang === 'hi' ? 'क्लासिकल होम्योपैथिक क्लिनिक' : 'CLASSICAL HOMOEOPATHIC CLINIC'}
              </span>
            </h1>

            <p className="text-slate-200 text-sm sm:text-base max-w-2xl leading-relaxed">
              {lang === 'hi'
                ? 'गया के सबसे पुराने और सबसे भरोसेमंद होम्योपैथिक क्लिनिक में संवैधानिक होम्योपैथी की उपचार शक्ति का अनुभव करें। हमारे संस्थापक, स्वर्गीय डॉ. क्यू. एच. खान की चिकित्सा विरासत को हमारी सक्रिय विशेषज्ञ टीम के माध्यम से निरंतर आगे बढ़ाया जा रहा है।'
                : 'Experience the healing power of constitutional homoeopathy at Gaya’s oldest and most trusted homoeopathic clinic. Continuing the medical legacy of our founder, Late Dr. Q.H. Khan, through our active team of specialists.'}
            </p>

            {/* CTAs (Shifted Up for Visibility Above the Fold) */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/appointment"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-clinic-crimson hover:bg-amber-700 text-white font-bold text-sm shadow-lg transition-transform hover:scale-105"
              >
                <Calendar className="w-4 h-4" />
                <span>{lang === 'hi' ? 'अपॉइंटमेंट बुक करें' : 'Book Appointment'}</span>
              </Link>

              <a
                href="tel:9135404090"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 backdrop-blur-md transition-all duration-300 hover:scale-105"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>{lang === 'hi' ? 'हेल्पलाइन कॉल करें' : 'Call Helpline'}</span>
              </a>

              <a
                href={`https://wa.me/91${clinicConfig.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-all duration-300 hover:scale-105"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{lang === 'hi' ? 'व्हाट्सएप' : 'WhatsApp'}</span>
              </a>

              <a
                href={clinicConfig.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-slate-300 font-semibold text-sm border border-slate-700 transition-colors"
              >
                <MapPin className="w-4 h-4 text-rose-400" />
                <span>{lang === 'hi' ? 'दिशा-निर्देश' : 'Directions'}</span>
              </a>
            </div>

            {/* Core Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-slate-200 text-xs">
                <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
                <span>
                  {lang === 'hi' ? 'त्वचा एवं गुप्त रोग विशेषज्ञ परामर्श' : 'Skin & Private Diseases Specialist'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-200 text-xs">
                <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
                <span>
                  {lang === 'hi' ? 'ल्यूकोडर्मा और विटिलिगो विशेषज्ञ देखभाल' : 'Leucoderma & Vitiligo Expert Care'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-200 text-xs">
                <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
                <span>
                  {lang === 'hi' ? '6 पंजीकृत एम.डी. और बी.एच.एम.एस. चिकित्सक' : '6 Registered M.D. & B.H.M.S. Doctors'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-200 text-xs">
                <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
                <span>
                  {lang === 'hi' ? '1958 से स्थापित चिकित्सा प्रतिष्ठा' : 'Established Reputation Since 1958'}
                </span>
              </div>
            </div>

            {/* Operating Schedule */}
            <div className="bg-slate-950/40 backdrop-blur-md rounded-2xl p-4 border border-white/10 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-amber-300 font-semibold">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>{lang === 'hi' ? 'क्लिनिक संचालन समय सारणी' : 'Clinic Operating Schedule'}</span>
              </div>
              <p className="text-slate-300">
                {lang === 'hi' ? 'सोमवार - शनिवार:' : 'Weekday Hours:'}{' '}
                <strong className="text-white">
                  {lang === 'hi'
                    ? 'सुबह: 8:00 AM – 12:00 PM | शाम: 2:00 PM – 8:00 PM'
                    : `${clinicConfig.timings.weekdayMorning} (Morning) | ${clinicConfig.timings.weekdayEvening} (Evening)`}
                </strong>
              </p>
              <p className="text-emerald-400 font-medium">
                {lang === 'hi' ? 'रविवार का समय:' : 'Sunday Schedule:'}{' '}
                <strong className="text-white">
                  {lang === 'hi'
                    ? 'खुला है (सुबह 7:00 AM – 12:00 PM एवं शाम 2:00 PM – 8:00 PM)'
                    : clinicConfig.timings.sundayTiming}
                </strong>
              </p>
            </div>
          </div>

          {/* Right Column: Visual Portrait with Glassmorphism Overlays */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            {/* Glowing Ambient Light Effect */}
            <div className="absolute w-72 h-72 bg-amber-500/20 rounded-full blur-3xl -top-10 -right-10 pointer-events-none" />
            <div className="absolute w-72 h-72 bg-clinic-violet/30 rounded-full blur-3xl -bottom-10 -left-10 pointer-events-none" />

            <div className="relative group mt-8 lg:mt-0">
              {/* Decorative Frame */}
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-rose-500 to-clinic-violet rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />

              <div className="relative bg-slate-900 border border-white/10 p-2.5 rounded-3xl shadow-2xl overflow-hidden max-w-sm sm:max-w-md">
                <Image
                  src="/images/dr-qh-khan.png"
                  alt={lang === 'hi' ? 'स्वर्गीय डॉ. क्यू. एच. खान' : 'Late Dr. Q.H. Khan'}
                  width={500}
                  height={625}
                  className="rounded-2xl object-cover aspect-[4/5] filter brightness-95 group-hover:scale-[1.02] transition duration-500"
                  priority
                />

                {/* Info Overlay at the bottom */}
                <div className="absolute bottom-5 inset-x-5 bg-slate-950/80 backdrop-blur-md border border-white/10 p-4 rounded-xl space-y-1">
                  <h4 className="text-white text-base font-bold">
                    {lang === 'hi' ? 'स्वर्गीय डॉ. क्यू. एच. खान' : 'Late Dr. Q.H. Khan'}
                  </h4>
                  <p className="text-amber-400 text-xs font-semibold">
                    {lang === 'hi' ? 'संस्थापक और शाश्वत प्रेरणा' : 'Founder & Eternal Inspiration'}
                  </p>
                  <p className="text-slate-300 text-[10px]">B.H.M.S. (B.U.) | M.D. | R.B.S.M.H.C.</p>
                  <p className="text-slate-400 text-[10px] italic">
                    {lang === 'hi' ? '1958 से क्लासिकल होम्योपैथी के अग्रदूत' : 'Pioneer of classical homoeopathy since 1958'}
                  </p>
                </div>
              </div>

              {/* Floating Badge 1: Founder's Legacy */}
              <div className="absolute -top-6 -left-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-3 shadow-xl flex items-center gap-3 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-white shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-300 font-medium uppercase tracking-wider">
                    {lang === 'hi' ? 'विरासत' : 'Legacy'}
                  </p>
                  <p className="text-sm font-bold text-white">
                    {lang === 'hi' ? 'स्मृति में' : 'In Memoriam'}
                  </p>
                </div>
              </div>

              {/* Floating Badge 2: Trusted Care */}
              <div className="absolute -bottom-6 -right-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-3 shadow-xl flex items-center gap-3 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-white shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-300 font-medium uppercase tracking-wider">
                    {lang === 'hi' ? 'ठीक हुए मरीज' : 'Patients Served'}
                  </p>
                  <p className="text-sm font-bold text-white">
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
