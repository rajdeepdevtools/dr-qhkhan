'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Phone, MessageSquare, Calendar, Navigation, Clock, Send, CheckCircle2 } from 'lucide-react';
import { clinicConfig } from '../../lib/clinicConfig';
import { useLanguage } from '../../lib/language-context';

export default function ContactPage() {
  const { lang } = useLanguage();
  const [form, setForm] = useState({ name: '', phone: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setForm({ name: '', phone: '', subject: '', message: '' });
    }, 1000);
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-xs font-semibold">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-clinic-indigo/5 border border-clinic-indigo/15 text-clinic-indigo text-xs font-bold uppercase tracking-wider">
          <MapPin className="w-3.5 h-3.5" />
          {lang === 'hi' ? 'संपर्क एवं क्लिनिक स्थान' : 'CLINIC LOCATION & CONTACT'}
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-none">
          {lang === 'hi' ? 'हमसे संपर्क करें' : 'Contact Dr. Q.H. Khan Clinic'}
        </h1>
        <p className="text-slate-655 text-xs sm:text-sm leading-relaxed font-medium">
          {lang === 'hi'
            ? 'नगमटिया रोड, गया क्लिनिक पर आएं या किसी भी प्रकार की चिकित्सीय सहायता के लिए हमारे हेल्पलाइन नंबरों पर संपर्क करें।'
            : 'Visit us at Nagmatia Road, Gaya or connect via helpline, WhatsApp, or our general inquiry portal.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Information cards */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
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
                  className="flex items-center justify-center gap-2 p-3 bg-clinic-indigo hover:bg-clinic-violet text-white font-bold text-xs rounded-xl shadow transition-colors"
                >
                  <Phone className="w-4 h-4" /> Call 9135404090
                </a>
                <a
                  href={`https://wa.me/91${clinicConfig.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition-colors"
                >
                  <MessageSquare className="w-4 h-4" /> WhatsApp Chat
                </a>
                <Link
                  href="/appointment"
                  className="flex items-center justify-center gap-2 p-3 bg-clinic-crimson hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow transition-colors"
                >
                  <Calendar className="w-4 h-4" /> Book Consultation
                </Link>
                <a
                  href={clinicConfig.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-3 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl shadow transition-colors"
                >
                  <Navigation className="w-4 h-4 text-rose-450" /> Get Directions Map
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: General Inquiry Form / Helplines */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Inquiry Form */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
              {lang === 'hi' ? 'सामान्य पूछताछ फॉर्म' : 'General Inquiry Portal'}
            </h2>

            {submitted ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl space-y-2 flex flex-col items-center text-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                <strong className="text-xs font-bold block">{lang === 'hi' ? 'पूछताछ सबमिट हो गई है!' : 'Inquiry Submitted successfully!'}</strong>
                <p className="text-[10px] text-slate-600 font-medium leading-relaxed">
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
                <div>
                  <label className="block text-slate-700 mb-1">{lang === 'hi' ? 'आपका नाम *' : 'Your Name *'}</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder={lang === 'hi' ? 'जैसे: राहुल कुमार' : 'e.g. Rahul Kumar'}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-slate-350"
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
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-slate-350"
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
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-slate-350"
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
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-slate-350"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-2.5 bg-clinic-indigo hover:bg-clinic-violet text-white font-bold rounded-xl shadow transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{submitting ? (lang === 'hi' ? 'भेजा जा रहा है...' : 'Submitting...') : (lang === 'hi' ? 'पूछताछ भेजें' : 'Send Inquiry')}</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
