'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Calendar, ArrowRight, User, Clock, Tag } from 'lucide-react';
import { useLanguage } from '../../lib/language-context';

export default function BlogsPage() {
  const { lang } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const blogsEn = [
    {
      title: 'Understanding Classical Homoeopathy: Principles and Holistic Care',
      slug: 'understanding-classical-homoeopathy-principles',
      excerpt: 'Explore how individualized constitutional remedies help support natural recovery in chronic ailments.',
      category: 'Clinical Guidance',
      author: 'Dr. I. Khan',
      date: 'August 28, 2026',
      readTime: '5 min read'
    },
    {
      title: 'Managing Skin Conditions Naturally: Psoriasis and Eczema Support',
      slug: 'managing-skin-conditions-naturally-psoriasis-eczema',
      excerpt: 'Key advice on diet, hydration, and homoeopathic evaluation for persistent dermatological symptoms.',
      category: 'Dermatology & Skin Care',
      author: 'Dr. Adeeba Farheen',
      date: 'August 26, 2026',
      readTime: '6 min read'
    },
  ];

  const blogsHi = [
    {
      title: 'क्लासिकल होम्योपैथी को समझना: सिद्धांत और समग्र स्वास्थ्य देखभाल',
      slug: 'understanding-classical-homoeopathy-principles',
      excerpt: 'खोजें कि कैसे व्यक्तिगत संवैधानिक दवाएं क्रोनिक बीमारियों में प्राकृतिक रिकवरी का समर्थन करती हैं।',
      category: 'चिकित्सीय मार्गदर्शन',
      author: 'डॉ. आई. खान',
      date: '28 अगस्त, 2026',
      readTime: '५ मिनट पठन'
    },
    {
      title: 'त्वचा रोगों का प्राकृतिक प्रबंधन: सोरायसिस और एक्जिमा उपचार',
      slug: 'managing-skin-conditions-naturally-psoriasis-eczema',
      excerpt: 'लगातार बने रहने वाले त्वचा रोगों के लिए आहार, हाइड्रेशन और होम्योपैथिक मूल्यांकन पर मुख्य सलाह।',
      category: 'त्वचा रोग एवं देखभाल',
      author: 'डॉ. अदीबा फरहीन',
      date: '26 अगस्त, 2026',
      readTime: '६ मिनट पठन'
    },
  ];

  const blogs = lang === 'hi' ? blogsHi : blogsEn;
  const categories = ['All', ...Array.from(new Set(blogs.map((b) => b.category)))];

  const filteredBlogs = selectedCategory === 'All'
    ? blogs
    : blogs.filter((b) => b.category === selectedCategory);

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-xs font-semibold">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#55100D]/5 border border-[#55100D]/15 text-[#55100D] text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          {lang === 'hi' ? 'स्वास्थ्य ब्लॉग एवं लेख' : 'HEALTH INSIGHTS & ARTICLES'}
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-[#1A0706] leading-none tracking-tight">
          {lang === 'hi' ? 'डॉ. क्यू. एच. खान' : 'DR. Q.H. KHAN'}
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#55100D] to-[#DD0200] text-xl sm:text-2.5xl font-extrabold mt-2.5 tracking-wider">
            {lang === 'hi' ? 'चिकित्सीय ब्लॉग एवं स्वास्थ्य जागरूकता' : 'CLINICAL BLOGS & HEALTH INSIGHTS'}
          </span>
        </h1>
        <p className="text-slate-655 text-xs sm:text-sm leading-relaxed font-medium">
          {lang === 'hi'
            ? 'हमारे योग्य चिकित्सकों द्वारा साझा की गई उपयोगी जानकारी, स्वास्थ्य सुझाव और होम्योपैथिक अनुसंधान।'
            : 'Educational insights and classical homeopathic health guides authored by our qualified medical specialists.'}
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-slate-200 pb-4">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all border ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-[#55100D] to-[#DD0200] border-[#55100D]/10 text-white shadow-sm'
                : 'bg-slate-50 border border-[#D9D9D9] text-slate-700 hover:bg-slate-100'
            }`}
          >
            {cat === 'All' ? (lang === 'hi' ? 'सभी श्रेणियां' : 'All Articles') : cat}
          </button>
        ))}
      </div>

      {/* Blogs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredBlogs.map((b, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-6 border border-[#D9D9D9] hover:border-[#55100D]/50 hover:shadow-lg transition-all duration-300 shadow-sm flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1 text-[10px] font-black text-[#55100D] uppercase bg-[#55100D]/5 border border-[#55100D]/10 px-2.5 py-1 rounded-lg">
                <Tag className="w-3 h-3 text-[#DD0200]" /> {b.category}
              </span>
              <h2 className="text-lg font-extrabold text-[#1A0706] leading-snug">{b.title}</h2>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">{b.excerpt}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1 text-[#1A0706]">
                  <User className="w-3.5 h-3.5 text-[#55100D] shrink-0" />
                  {b.author}
                </span>
                <span className="flex items-center gap-1 font-semibold text-slate-500">
                  <Calendar className="w-3.5 h-3.5 shrink-0" />
                  {b.date}
                </span>
                <span className="flex items-center gap-1 text-slate-600 font-black bg-slate-100 px-2.5 py-0.5 rounded text-[10px]">
                  <Clock className="w-3 h-3 shrink-0" />
                  {b.readTime}
                </span>
              </div>
              
              <Link
                href={`/blogs/${b.slug}`}
                className="font-black text-[#55100D] hover:text-[#DD0200] flex items-center gap-1 shrink-0 uppercase tracking-wider text-[11px]"
              >
                <span>{lang === 'hi' ? 'लेख पढ़ें' : 'Read Article'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Disclaimer and Education Panel */}
      <div className="bg-white border border-[#D9D9D9] rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
        <h3 className="text-sm font-black text-[#1A0706] flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#55100D]" />
          {lang === 'hi' ? 'चिकित्सीय जानकारी एवं परामर्श अस्वीकरण' : 'Educational Intent & Clinical Disclaimer'}
        </h3>
        <p className="text-slate-650 text-xs font-semibold leading-relaxed">
          {lang === 'hi'
            ? 'हमारे ब्लॉग पर साझा किए गए लेख केवल शैक्षिक उद्देश्यों के लिए हैं। किसी भी स्वास्थ्य स्थिति या स्व-दवा (self-medication) के बारे में निर्णय लेने से पहले हमेशा एक योग्य डॉक्टर से परामर्श लें। प्रत्येक व्यक्ति की शारीरिक संरचना अलग होती है, इसलिए व्यक्तिगत केस स्टडी आवश्यक है।'
            : 'All blogs and publications shared on our health portal are compile-intended for educational awareness. Self-prescribing is strongly discouraged. Chronic skin complaints, vitiligo, and autoimmune diseases require a complete clinical case-history to determine constitutional medicine selectors.'}
        </p>
      </div>

    </div>
  );
}
