'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Phone, MessageSquare, Calendar, Navigation, Clock, Send, CheckCircle2, ShieldAlert, Train, Plane, HelpCircle, PhoneCall } from 'lucide-react';
import { clinicConfig } from '../../lib/clinicConfig';
import { useLanguage } from '../../lib/language-context';
import { apiClient } from '../../lib/api-client';

export default function ContactPage() {
  const { lang } = useLanguage();
  const [form, setForm] = useState({ name: '', phone: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');
    try {
      const res = await apiClient('/inquiries', {
        method: 'POST',
        body: JSON.stringify(form),
      });
      if (res.success) {
        setSubmitted(true);
        setForm({ name: '', phone: '', subject: '', message: '' });
      } else {
        setErrorMsg(res.message || 'Failed to submit inquiry. Please try again.');
      }
    } catch (err: any) {
      setErrorMsg('Network error. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  const faqItems = [
    {
      qEn: 'Do you offer direct walk-in consultations?',
      qHi: 'क्या मैं बिना अपॉइंटमेंट के सीधे आ सकता हूँ?',
      aEn: 'While walk-ins are accepted, patients with online bookings are given priority. We highly recommend booking beforehand to avoid long waiting times.',
      aHi: 'हाँ, आप सीधे क्लिनिक आ सकते हैं, लेकिन ऑनलाइन बुकिंग वाले मरीजों को प्राथमिकता दी जाती है। प्रतीक्षा से बचने के लिए बुकिंग की सलाह दी जाती है।'
    },
    {
      qEn: 'Is the ₹300 consultation fee refundable?',
      qHi: 'क्या ₹300 परामर्श शुल्क वापस किया जा सकता है?',
      aEn: 'The basic ₹300 booking registration fee is non-refundable as it covers case registration. It remains valid if you reschedule your visit within 7 days.',
      aHi: 'पंजीकरण पंजीकरण शुल्क ₹300 गैर-वापसी योग्य है। यदि आप 7 दिनों के भीतर अपने अपॉइंटमेंट को रीशेड्यूल करते हैं, तो यह वैध रहता है।'
    },
    {
      qEn: 'How can I submit my medical reports?',
      qHi: 'मैं अपनी मेडिकल रिपोर्ट कैसे जमा कर सकता हूँ?',
      aEn: 'You can upload them directly during the online appointment booking process (optional) or bring physical copies to the Gaya clinic during evaluation.',
      aHi: 'आप बुकिंग के दौरान उन्हें वेबसाइट पर अपलोड कर सकते हैं (वैकल्पिक) या क्लिनिक में परामर्श के समय भौतिक प्रतियां साथ ला सकते हैं।'
    },
    {
      qEn: 'Who do I contact in case of an emergency?',
      qHi: 'आपातकालीन स्थिति में मुझे किससे संपर्क करना चाहिए?',
      aEn: 'For acute medical emergencies, please visit the nearest hospital emergency room (e.g. ANMMCH Gaya). Homeopathy is for constitutional, chronic care.',
      aHi: 'तीव्र आपातकालीन चिकित्सा मामलों में, कृपया निकटतम अस्पताल (जैसे ANMMCH गया) के आपातकालीन विभाग में जाएं।'
    }
  ];

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 text-xs font-semibold">
      
      {/* 1. Header Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-clinic-indigo/5 border border-clinic-indigo/15 text-clinic-indigo text-xs font-bold uppercase tracking-wider">
          <MapPin className="w-3.5 h-3.5" />
          {lang === 'hi' ? 'संपर्क एवं क्लिनिक स्थान' : 'CLINIC LOCATION & CONTACT'}
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-[#1A0706] leading-none tracking-tight">
          {lang === 'hi' ? 'डॉ. क्यू. एच. खान' : 'DR. Q.H. KHAN'}
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#55100D] to-[#DD0200] text-xl sm:text-2.5xl font-extrabold mt-2.5 tracking-wider">
            {lang === 'hi' ? 'क्लासिकल होम्योपैथिक क्लिनिक' : 'CLASSICAL HOMOEOPATHIC CLINIC'}
          </span>
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-bold max-w-xl mx-auto">
          {lang === 'hi'
            ? 'नगमटिया रोड, गया क्लिनिक पर आएं या किसी भी प्रकार की चिकित्सीय सहायता के लिए हमारे हेल्पलाइन नंबरों पर संपर्क करें।'
            : 'Visit us at Nagmatia Road, Gaya or connect via helpline, WhatsApp, or our general inquiry portal.'}
        </p>
      </div>

      {/* 2. Main Grid: Info Panels & General Inquiry Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Columns: Location, Hours and Quick Actions */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2.5">
              {lang === 'hi' ? 'क्लिनिक व आवासीय पता' : 'Head Office / Clinic & Residence'}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <MapPin className="w-5 h-5 text-clinic-crimson shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 text-xs block font-bold">{lang === 'hi' ? 'पता' : 'Address'}</strong>
                  <p className="text-slate-600 mt-1 leading-normal font-medium">
                    {lang === 'hi' ? 'नगमटिया रोड, गया, बिहार, भारत' : 'Nagmatia Road, Gaya, Bihar, India'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <Clock className="w-5 h-5 text-clinic-indigo shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 text-xs block font-bold">{lang === 'hi' ? 'समय सारणी' : 'Clinic Timings'}</strong>
                  <p className="text-slate-600 mt-1 font-medium">
                    {lang === 'hi' ? 'सोमवार - शनिवार:' : 'Weekdays:'} <br />
                    {clinicConfig.timings.weekdayMorning} <br />
                    {clinicConfig.timings.weekdayEvening}
                  </p>
                  <p className="text-emerald-800 font-bold mt-1.5">
                    {lang === 'hi' ? 'रविवार: खुला है' : 'Sunday: Open'} <br />
                    {clinicConfig.timings.sundayTiming.replace('OPEN ', '')}
                  </p>
                </div>
              </div>
            </div>

            {/* Clickable Actions Grid */}
            <div className="space-y-3 pt-2">
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                {lang === 'hi' ? 'त्वरित माध्यम' : 'Direct Access Links'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="tel:9135404090"
                  className="flex items-center justify-center gap-2 p-3 bg-clinic-indigo hover:bg-clinic-indigo/90 text-white font-bold text-xs rounded-xl shadow-sm transition-colors"
                >
                  <Phone className="w-4 h-4" /> Call 9135404090
                </a>
                <a
                  href={`https://wa.me/91${clinicConfig.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors"
                >
                  <MessageSquare className="w-4 h-4" /> WhatsApp Chat
                </a>
                <Link
                  href="/appointment"
                  className="flex items-center justify-center gap-2 p-3 bg-clinic-crimson hover:bg-clinic-crimson/90 text-white font-bold text-xs rounded-xl shadow-sm transition-colors"
                >
                  <Calendar className="w-4 h-4" /> Book Consultation
                </Link>
                <a
                  href={clinicConfig.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-3 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl shadow-sm transition-colors"
                >
                  <Navigation className="w-4 h-4 text-rose-500" /> Get Directions Map
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: General Inquiry Form */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
              {lang === 'hi' ? 'सामान्य पूछताछ फॉर्म' : 'General Inquiry Portal'}
            </h2>

            {submitted ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-950 rounded-xl space-y-2 flex flex-col items-center text-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 animate-bounce" />
                <strong className="text-xs font-bold block">{lang === 'hi' ? 'पूछताछ सबमिट हो गई है!' : 'Inquiry Submitted successfully!'}</strong>
                <p className="text-[10px] text-slate-655 font-medium leading-relaxed">
                  {lang === 'hi'
                    ? 'धन्यवाद! आपकी पूछताछ दर्ज कर ली गई है। हमारे क्लिनिक समन्वयक जल्द ही आपसे संपर्क करेंगे।'
                    : 'Thank you! Your inquiry has been received. Our clinic coordinators will review it and get back to you shortly.'}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-[10px] text-clinic-indigo font-bold hover:underline"
                >
                  {lang === 'hi' ? 'दूसरा फॉर्म भरें' : 'Submit Another Query'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                {errorMsg && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-[10px] font-bold">
                    {errorMsg}
                  </div>
                )}
                <div>
                  <label className="block text-slate-700 mb-1">{lang === 'hi' ? 'आपका नाम *' : 'Your Name *'}</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder={lang === 'hi' ? 'जैसे: राहुल कुमार' : 'e.g. Rahul Kumar'}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-slate-300"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-1">{lang === 'hi' ? 'मोबाइल नंबर *' : 'Phone Number *'}</label>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder={lang === 'hi' ? 'जैसे: 9876543210' : 'e.g. 9876543210'}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-slate-300"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-1">{lang === 'hi' ? 'विषय *' : 'Subject *'}</label>
                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder={lang === 'hi' ? 'जैसे: सफेद दाग परामर्श समय' : 'e.g. Leucoderma Consult Timings'}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-slate-300"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-1">{lang === 'hi' ? 'संदेश *' : 'Message *'}</label>
                  <textarea
                    rows={3}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder={lang === 'hi' ? 'अपनी बीमारी के बारे में संक्षेप में लिखें...' : 'Briefly describe your query...'}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-slate-300"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-clinic-indigo hover:bg-clinic-indigo/90 text-white font-bold rounded-xl shadow-sm transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5 animate-pulse" />
                  <span>{submitting ? (lang === 'hi' ? 'भेजा जा रहा है...' : 'Submitting...') : (lang === 'hi' ? 'पूछताछ भेजें' : 'Send Inquiry')}</span>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

      {/* 3. Transit & Route Guide Section */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Navigation className="w-5 h-5 text-clinic-indigo shrink-0" />
            {lang === 'hi' ? 'क्लिनिक कैसे पहुंचे (मार्ग निर्देश)' : 'How to Reach Dr. Q.H. Khan Clinic'}
          </h3>
          <p className="text-[10px] text-slate-550 font-medium mt-1">
            {lang === 'hi' ? 'गया जंक्शन और एयरपोर्ट से क्लिनिक के लिए सरल मार्ग मार्गदर्शिका' : 'Transit details for outstation patients arriving at Gaya'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 border-l-2 border-indigo-400/40 pl-4">
            <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
              <Train className="w-4.5 h-4.5 text-clinic-indigo" />
              {lang === 'hi' ? 'गया जंक्शन रेलवे स्टेशन से (3.5 KM)' : 'From Gaya Junction Railway Station (~3.5 KM)'}
            </h4>
            <p className="text-slate-655 text-[11px] leading-relaxed font-medium">
              {lang === 'hi'
                ? 'स्टेशन से बाहर निकलकर, नगमटिया रोड बाईपास के लिए स्थानीय ऑटो-रिक्शा लें। क्लिनिक नगमटिया रोड पर मुख्य बाईपास चौराहे के पास स्थित है (सवारी समय: 10-15 मिनट)।'
                : 'Take a local auto-rickshaw or taxi towards Nagmatia Road Bypass. The clinic is located right on Nagmatia Road, just off the main bypass crossing (approximate travel time: 10-15 minutes).'}
            </p>
          </div>

          <div className="space-y-2 border-l-2 border-indigo-400/40 pl-4">
            <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
              <Plane className="w-4.5 h-4.5 text-clinic-indigo" />
              {lang === 'hi' ? 'गया अंतर्राष्ट्रीय हवाई अड्डे से (12 KM)' : 'From Gaya International Airport (~12 KM)'}
            </h4>
            <p className="text-slate-655 text-[11px] leading-relaxed font-medium">
              {lang === 'hi'
                ? 'हवाई अड्डे से बोधगया रोड के माध्यम से टैक्सी सेवा किराए पर लें और नगमटिया रोड की ओर बढ़ें। यह जिला मुख्यालय से अच्छी तरह जुड़ा हुआ है (सवारी समय: 25-30 मिनट)।'
                : 'Hire a prepaid taxi or app-cab from the terminal and navigate via Bodhgaya Road towards the Nagmatia Road bypass. The location is highly accessible from the highway (approximate travel time: 25-30 minutes).'}
            </p>
          </div>
        </div>
      </div>

      {/* 4. Frequently Asked Questions (FAQ) Section */}
      <div className="space-y-6">
        <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-clinic-indigo shrink-0" />
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              {lang === 'hi' ? 'अक्सर पूछे जाने वाले सवाल (FAQ)' : 'Frequently Asked Questions (FAQ)'}
            </h3>
            <p className="text-[10px] text-slate-550 font-medium">
              {lang === 'hi' ? 'क्लिनिक परामर्श और बुकिंग से जुड़े सामान्य प्रश्न' : 'Common questions regarding clinic evaluation and scheduling'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {faqItems.map((faq, idx) => (
            <div key={idx} className="bg-white border border-slate-200/80 rounded-2xl p-4.5 space-y-2 hover:border-slate-350 transition-colors">
              <h4 className="text-slate-900 font-bold text-xs">
                Q: {lang === 'hi' ? faq.qHi : faq.qEn}
              </h4>
              <p className="text-slate-600 text-[11px] leading-relaxed font-medium">
                {lang === 'hi' ? faq.aHi : faq.aEn}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Medical Safety & Suppress Disclaimer Panel */}
      <div className="bg-rose-50/50 border border-rose-150 rounded-2xl p-5 sm:p-6 space-y-3">
        <div className="flex items-center gap-2 text-clinic-crimson">
          <ShieldAlert className="w-5 h-5 shrink-0 text-clinic-crimson" />
          <span className="font-extrabold text-xs uppercase tracking-wider">{lang === 'hi' ? 'आपातकालीन चिकित्सा अस्वीकरण' : 'Emergency & Safety Protocols'}</span>
        </div>
        <p className="text-slate-700 text-[11px] leading-relaxed font-medium">
          {lang === 'hi'
            ? 'महत्वपूर्ण सूचना: डॉ. क्यू.एच. खान क्लिनिक संवैधानिक क्लासिकल होम्योपैथी प्रदान करता है, जो दीर्घकालिक स्वास्थ्य और पुरानी बीमारियों के लिए आदर्श है। हम तीव्र चिकित्सा आपातकाल, गंभीर आघात या तत्काल सर्जिकल मामलों के लिए प्राथमिक चिकित्सा प्रदान नहीं करते हैं। ऐसे मामलों में कृपया सीधे सरकारी अस्पताल आपातकालीन कक्ष (जैसे ANMMCH गया, दूरभाष: 102/108) से संपर्क करें।'
            : 'Important Notice: Our clinic specializes in constitutional classical homoeopathy, which is highly effective for chronic, deep-seated complaints. We do NOT provide trauma care or emergency surgical assistance. For acute medical emergencies, surgical complications, or trauma, please contact municipal ambulance helplines (102 / 108) or proceed directly to an emergency medical college facility (such as ANMMCH Gaya).'}
        </p>
      </div>

    </div>
  );
}
