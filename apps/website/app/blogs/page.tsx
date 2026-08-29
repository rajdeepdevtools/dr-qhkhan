import React from 'react';
import Link from 'next/link';
import { BookOpen, Calendar, ArrowRight } from 'lucide-react';

export default function BlogsPage() {
  const blogs = [
    {
      title: 'Understanding Classical Homoeopathy: Principles and Holistic Care',
      slug: 'understanding-classical-homoeopathy-principles',
      excerpt: 'Explore how individualized constitutional remedies help support natural recovery in chronic ailments.',
      category: 'Homoeopathy Guidance',
      author: 'Dr. Q.H. Khan',
      date: 'August 28, 2026',
    },
    {
      title: 'Managing Skin Conditions Naturally: Psoriasis and Eczema Support',
      slug: 'managing-skin-conditions-naturally-psoriasis-eczema',
      excerpt: 'Key advice on diet, hydration, and homoeopathic evaluation for persistent dermatological symptoms.',
      category: 'Dermatology & Skin Care',
      author: 'Dr. Adeeba Farheen',
      date: 'August 26, 2026',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-clinic-indigo/10 text-clinic-indigo text-xs font-bold">
          <BookOpen className="w-4 h-4" /> HEALTH INSIGHTS & BLOGS
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900">Health Blogs & Articles</h1>
        <p className="text-slate-600 text-sm">
          Informational insights and homoeopathic health awareness from our clinical team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.map((b, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[10px] font-bold text-clinic-indigo uppercase bg-clinic-indigo/10 px-2.5 py-1 rounded">
                {b.category}
              </span>
              <h2 className="text-xl font-bold text-slate-900">{b.title}</h2>
              <p className="text-xs text-slate-600 leading-relaxed">{b.excerpt}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>By {b.author} • {b.date}</span>
              <Link href={`/blogs/${b.slug}`} className="font-bold text-clinic-indigo hover:underline flex items-center gap-1">
                Read Article <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
