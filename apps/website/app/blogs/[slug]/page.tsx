import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, User, ShieldAlert } from 'lucide-react';
import { clinicConfig } from '../../../lib/clinicConfig';

const blogsData: Record<string, any> = {
  'understanding-classical-homoeopathy-principles': {
    title: 'Understanding Classical Homoeopathy: Principles and Holistic Care',
    author: 'Dr. Q.H. Khan',
    category: 'Homoeopathy Guidance',
    date: 'August 28, 2026',
    content: `
Classical Homoeopathy, founded on the principle of "Similia Similibus Curentur" (like cures like), seeks to evaluate the patient as a whole rather than focusing merely on isolated symptoms.

At Dr. Q.H. Khan Classical Homoeopathic Clinic in Gaya, Bihar, our practice has adhered to these principles since 1958. 

Key Aspects of Classical Homoeopathic Consultation:
1. Constitutional Assessment: Careful consideration of physical symptoms, emotional state, and personal medical history.
2. Individualized Selection: Choosing single, individualized remedies matching the patient's case profile.
3. Patient Safety & Monitoring: Ensuring ongoing progress checks and regular follow-ups.

Disclaimer: Homoeopathic remedies are intended as complementary healthcare support. Always consult qualified physicians for emergency conditions.
    `,
  },
  'managing-skin-conditions-naturally-psoriasis-eczema': {
    title: 'Managing Skin Conditions Naturally: Psoriasis and Eczema Support',
    author: 'Dr. Adeeba Farheen',
    category: 'Dermatology & Skin Care',
    date: 'August 26, 2026',
    content: `
Chronic dermatological conditions like psoriasis, eczema, and leucoderma cause physical discomfort and emotional distress. 

Homoeopathic Management of Skin Complaints:
- Internal Constitutional Balance: Addressing immune system dysfunctions rather than applying harsh suppressive agents.
- Hydration & Dietary Adjustments: Maintaining proper skin moisture and reducing inflammatory food triggers.
- Stress Reduction: Managing psychological stress which frequently exacerbates skin flare-ups.

At Dr. Q.H. Khan Clinic, Dr. Adeeba Farheen and our team conduct detailed evaluations to support skin healing naturally.
    `,
  },
};

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const blog = blogsData[params.slug];

  if (!blog) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
      <Link href="/blogs" className="inline-flex items-center gap-1 text-xs font-semibold text-clinic-indigo hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to Blogs Directory
      </Link>

      <article className="bg-white rounded-2xl p-8 border border-slate-200 shadow-md space-y-6">
        <div className="border-b border-slate-100 pb-4 space-y-2">
          <span className="text-xs font-bold text-clinic-indigo uppercase bg-clinic-indigo/10 px-2 py-0.5 rounded">
            {blog.category}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{blog.title}</h1>
          <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
            <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {blog.author}</span>
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {blog.date}</span>
          </div>
        </div>

        <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-line space-y-4">
          {blog.content}
        </div>

        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p>{clinicConfig.medicalDisclaimer}</p>
        </div>
      </article>
    </div>
  );
}
