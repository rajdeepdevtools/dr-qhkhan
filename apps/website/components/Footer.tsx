'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, MessageSquare, ShieldAlert } from 'lucide-react';
import { clinicConfig } from '../lib/clinicConfig';
import { useLanguage } from '../lib/language-context';

export const Footer: React.FC = () => {
  const { lang } = useLanguage();

  return (
    <footer className="bg-clinic-indigo text-slate-200 text-sm">
      {/* Top Disclaimer Banner */}
      <div className="bg-slate-950/60 border-b border-white/10 py-3.5 px-4">
        <div className="max-w-7xl mx-auto flex items-start gap-3 text-xs text-slate-300">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <p>
            <strong className="text-white">
              {lang === 'hi' ? 'चिकित्सा अस्वीकरण' : 'Medical Disclaimer'}:
            </strong>{' '}
            {lang === 'hi'
              ? 'इस वेबसाइट पर प्रदान की गई जानकारी केवल सामान्य सूचनात्मक उद्देश्यों के लिए है और पेशेवर चिकित्सा निदान, उपचार या आपातकालीन देखभाल का विकल्प नहीं है।'
              : clinicConfig.medicalDisclaimer}{' '}
            <span className="text-amber-300 font-semibold">
              {lang === 'hi'
                ? 'यदि आप गंभीर, अचानक या जीवन के लिए खतरा पैदा करने वाले लक्षणों का अनुभव कर रहे हैं, तो तुरंत आपातकालीन चिकित्सा देखभाल लें।'
                : clinicConfig.emergencyWarning}
            </span>
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Column 1: Brand Info */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <img
              src="/images/logo.png"
              alt="Dr. Q.H. Khan Clinic Logo"
              className="w-10 h-10 rounded-xl shadow object-cover"
            />
            <div>
              <h3 className="font-bold text-white text-base">
                {lang === 'hi' ? 'डॉ. क्यू. एच. खान' : 'DR. Q.H. KHAN'}
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                {lang === 'hi' ? 'क्लासिकल होम्योपैथिक क्लिनिक' : 'CLASSICAL HOMOEOPATHIC CLINIC'}
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {lang === 'hi'
              ? 'गया, बिहार में 1958 में स्थापित। छह दशकों से अधिक समय से संवैधानिक क्लासिकल होम्योपैथिक देखभाल का संरक्षण।'
              : 'Established in 1958 in Gaya, Bihar. Preserving constitutional classical homoeopathic care for over six decades.'}
          </p>
          <div className="pt-1">
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-amber-300 font-bold text-xs">
              {lang === 'hi' ? 'स्थापना 1958' : 'ESTABLISHED 1958'}
            </span>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
            {lang === 'hi' ? 'त्वरित नेविगेशन' : 'Quick Navigation'}
          </h4>
          <ul className="space-y-2.5 text-xs text-slate-300">
            <li>
              <Link href="/" className="hover:text-amber-300 transition-colors">
                {lang === 'hi' ? 'होम पेज' : 'Home Page'}
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-amber-300 transition-colors">
                {lang === 'hi' ? 'क्लिनिक इतिहास और नेतृत्व' : 'Clinic History & Leadership'}
              </Link>
            </li>
            <li>
              <Link href="/doctors" className="hover:text-amber-300 transition-colors">
                {lang === 'hi' ? 'डॉक्टर निर्देशिका' : 'Doctor Directory'}
              </Link>
            </li>
            <li>
              <Link href="/treatments" className="hover:text-amber-300 transition-colors">
                {lang === 'hi' ? 'उपचार निर्देशिका' : 'Treatment Directory'}
              </Link>
            </li>
            <li>
              <Link href="/appointment" className="hover:text-amber-300 transition-colors">
                {lang === 'hi' ? 'परामर्श बुक करें' : 'Book Consultation'}
              </Link>
            </li>
            <li>
              <Link href="/blogs" className="hover:text-amber-300 transition-colors">
                {lang === 'hi' ? 'स्वास्थ्य ब्लॉग और विचार' : 'Health Blogs & Insights'}
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Patient & Legal */}
        <div>
          <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
            {lang === 'hi' ? 'मरीज सेवा और शर्तें' : 'Patient Care & Terms'}
          </h4>
          <ul className="space-y-2.5 text-xs text-slate-300">
            <li>
              <Link href="/login" className="hover:text-amber-300 transition-colors">
                {lang === 'hi' ? 'मरीज और डॉक्टर लॉगिन' : 'Patient & Doctor Login'}
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-amber-300 transition-colors">
                {lang === 'hi' ? 'गोपनीयता नीति' : 'Privacy Policy'}
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-amber-300 transition-colors">
                {lang === 'hi' ? 'सेवा की शर्तें' : 'Terms of Service'}
              </Link>
            </li>
            <li>
              <Link href="/medical-disclaimer" className="hover:text-amber-300 transition-colors">
                {lang === 'hi' ? 'पूर्ण चिकित्सा अस्वीकरण' : 'Complete Medical Disclaimer'}
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact & Helplines */}
        <div className="space-y-3">
          <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
            {lang === 'hi' ? 'क्लिनिक और निवास' : 'Clinic & Residence'}
          </h4>
          <div className="flex items-start gap-2 text-xs text-slate-300">
            <MapPin className="w-4 h-4 text-clinic-crimson shrink-0 mt-0.5" />
            <span>{lang === 'hi' ? 'नगमटिया रोड, गया, बिहार, भारत' : 'Nagmatia Road, Gaya, Bihar, India'}</span>
          </div>

          <div className="space-y-1.5 pt-2">
            <p className="text-xs font-semibold text-white">
              {lang === 'hi' ? 'क्लिनिक हेल्पलाइन्स:' : 'Clinic Helplines:'}
            </p>
            {clinicConfig.helplines.map((h, i) => (
              <a
                key={i}
                href={`tel:${h.number}`}
                className="flex items-center gap-2 text-xs text-slate-300 hover:text-amber-300 transition-colors block"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>{h.number}</span>
                {h.isWhatsapp && (
                  <span className="bg-emerald-600 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">
                    {lang === 'hi' ? 'व्हाट्सएप' : 'WhatsApp'}
                  </span>
                )}
              </a>
            ))}
          </div>

          <div className="pt-2">
            <a
              href={`https://wa.me/91${clinicConfig.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>
                {lang === 'hi' ? 'त्वरित व्हाट्सएप परामर्श' : 'Instant WhatsApp Consultation'}
              </span>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-slate-400">
        <p>
          © {new Date().getFullYear()} {lang === 'hi' ? 'डॉ. क्यू. एच. खान क्लासिकल होम्योपैथिक क्लिनिक' : 'DR. Q.H. KHAN CLASSICAL HOMOEOPATHIC CLINIC'}.{' '}
          {lang === 'hi' ? 'सर्वाधिकार सुरक्षित।' : 'All rights reserved.'}
        </p>
      </div>
    </footer>
  );
};
