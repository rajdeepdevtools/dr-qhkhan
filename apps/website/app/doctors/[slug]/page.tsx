'use client';

import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, ShieldCheck, Clock, ArrowLeft, Award, Heart, Building2, GraduationCap, MapPin, Sparkles, BookOpen } from 'lucide-react';
import { clinicConfig } from '../../../lib/clinicConfig';

const doctorsMap: Record<string, any> = {
  'dr-q-h-khan': {
    name: 'Late Dr. Q.H. Khan',
    nameHi: 'स्वर्गीय डॉ. क्यू. एच. खान',
    designation: 'Founder & Visionary Pioneer (1958 – Present Legacy)',
    designationHi: 'संस्थापक एवं महान समाज सेवी (1958 से अटूट धरोहर)',
    degrees: ['B.H.M.S. (Calcutta / B.U.)', 'R.B.S.M.H.C.'],
    registrationNumber: 'Reg. 33454',
    birthDate: '31st December 1934',
    birthDateHi: '31 दिसंबर 1934',
    birthPlace: 'Village Kalwana, Post Cherki, District Gaya, Bihar',
    birthPlaceHi: 'ग्राम कालवाना, पोस्ट चेरकी, जिला गया, बिहार',
    deathDate: '3rd June (Night)',
    deathDateHi: '3 जून (कार दुर्घटना के उपरांत रात में निधन)',
    specialization: 'Classical Homoeopathy, Chronic Disease Pioneer & Philanthropist',
    specializationHi: 'क्लासिकल होम्योपैथी विशेषज्ञ, क्रोनिक रोग निवारक एवं महान समाज सेवी',
    bio: 'Pioneer of classical homoeopathy in Gaya who established Dr. Q.H. Khan Clinic in 1958. Dedicated his life to selfless community service (Samaj Seva), orphan girl welfare, and medical healing across Magadh Division.',
    isDeceased: true,
    photo: '/images/dr-qh-khan.png',
  },
  'dr-i-khan': {
    name: 'Dr. I. Khan',
    nameHi: 'डॉ. आई. खान',
    designation: 'Managing Director & General Physician',
    designationHi: 'प्रबंध निदेशक एवं जनरल फिजिशियन',
    degrees: ['B.H.M.S. (B.U.)', 'R.B.S. M.H.C.'],
    registrationNumber: 'Reg. 33454',
    specialization: 'General Physician & Chronic Disease Specialist',
    specializationHi: 'जनरल फिजिशियन, क्रोनिक एवं गंभीर रोग विशेषज्ञ',
    bio: 'Managing Director & General Physician with extensive clinical experience in advanced homoeopathic treatments for chronic diseases, severe long-term illnesses, skin disorders, vitiligo, and private complaints.',
    schedule: 'Monday – Sunday (Morning: 8:00 AM – 12:00 PM | Evening: 2:00 PM – 8:00 PM)',
    photo: '/images/dr-i-khan.png',
  },
  'dr-adeeba-farheen': {
    name: 'Dr. Adeeba Farheen',
    nameHi: 'डॉ. अदीबा फरहीन',
    designation: 'Consultant Physician & Female Health Specialist',
    designationHi: 'कंसल्टेंट फिजिशियन एवं महिला स्वास्थ्य विशेषज्ञ',
    degrees: ['B.H.M.S. (B.U.)', 'M.D. (Physician)', 'G.D.M.C., Katihar, Patna'],
    registrationNumber: 'Reg. 31319',
    specialization: 'General Physician, Female Health (PCOD, Breast Tumours) & Normal Delivery Care',
    specializationHi: 'सामान्य फिजिशियन, महिला स्वास्थ्य (PCOD, स्तन ट्यूमर) एवं सामान्य प्रसव परामर्श',
    bio: 'General Physician and Female Healthcare consultant specializing in PCOD/PCOS, breast tumours/lumps, female health disorders, normal delivery guidance, and general medical conditions.',
    schedule: 'Monday – Saturday (Morning: 9:00 AM – 1:00 PM | Evening: 3:00 PM – 7:00 PM)',
    photo: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?q=80&w=350&auto=format&fit=crop',
  },
};

export default function DoctorDetailPage({ params }: { params: { slug: string } }) {
  const doctor = doctorsMap[params.slug];

  if (!doctor) {
    notFound();
  }

  const isFounder = params.slug === 'dr-q-h-khan';

  if (isFounder) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 text-xs font-semibold">
        
        {/* Back Link */}
        <Link href="/doctors" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#55100D] hover:text-[#DD0200] transition-colors">
          <ArrowLeft className="w-4 h-4" /> <span>वापस डॉक्टर सूची में जाएं / Back to Doctors</span>
        </Link>

        {/* Hero Biography Header Card */}
        <div className="bg-gradient-to-br from-[#1C0706] via-[#2A0D0A] to-[#120403] text-white rounded-3xl p-6 sm:p-10 border border-[#DD0200]/30 shadow-2xl relative overflow-hidden space-y-8">
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#DD0200]/25 via-amber-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Photo Column */}
            <div className="lg:col-span-4 flex flex-col items-center">
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-3xl overflow-hidden border-2 border-amber-400 shadow-2xl group">
                <img
                  src={doctor.photo}
                  alt={doctor.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/dr-qh-khan.png';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 right-3 text-[10px] font-black uppercase tracking-wider bg-[#DD0200] text-white py-1 px-3 rounded-lg text-center shadow-sm">
                  1934 – 3rd June (Memorial)
                </span>
              </div>
            </div>

            {/* Title & Key Stats */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#DD0200]/20 to-amber-500/20 border border-[#DD0200]/40 text-amber-300 text-xs font-black uppercase tracking-wider">
                <Award className="w-4 h-4 text-[#DD0200]" />
                <span>संस्थापक जीवनी • BIOGRAPHY OF FOUNDER</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                स्वर्गीय डॉ. क्यू. एच. खान <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D4D] via-amber-200 to-[#FFD700] text-xl sm:text-2xl font-extrabold">
                  Late Dr. Q.H. Khan (1934 – 3rd June)
                </span>
              </h1>

              <p className="text-amber-300 font-bold text-xs sm:text-sm">
                महान समाज सेवी • संस्थापक: डॉ. क्यू. एच. खान क्लासिकल होम्योपैथिक क्लिनिक (1958) एवं Gaya Muslim Girls Orphanage
              </p>

              {/* Quick Info Badges Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="bg-white/5 border border-white/10 p-3 rounded-xl flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">जन्म तिथि / Birth Date</span>
                    <strong className="text-white text-xs font-black">31 दिसंबर 1934 (31st Dec 1934)</strong>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-3 rounded-xl flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-rose-400 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">जन्म स्थान / Birthplace</span>
                    <strong className="text-white text-xs font-black">ग्राम कालवाना, चेरकी, गया (Bihar)</strong>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-3 rounded-xl flex items-center gap-3">
                  <GraduationCap className="w-5 h-5 text-sky-400 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">उच्च चिकित्सा शिक्षा / Medical Education</span>
                    <strong className="text-white text-xs font-black">कोलकाता (Kolkata) Medical Studies</strong>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-3 rounded-xl flex items-center gap-3">
                  <Heart className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">प्रमुख समाज सेवा संस्थान / Social Welfare</span>
                    <strong className="text-white text-xs font-black">The Gaya Muslim Girls Orphanage</strong>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Detailed Life History Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Biography Narrative */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* 1. Early Life & Education */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-base sm:text-lg font-black text-[#1A0706] flex items-center gap-2 border-b border-slate-100 pb-3">
                <BookOpen className="w-5 h-5 text-[#55100D]" />
                <span>१. प्रारंभिक जीवन एवं कोलकाता में उच्च शिक्षा (Early Life & Medical Studies)</span>
              </h2>

              <div className="space-y-3 text-slate-700 text-xs sm:text-sm leading-relaxed font-medium">
                <p>
                  स्वर्गीय डॉ. क्यू. एच. खान का जन्म <strong className="text-slate-900 font-extrabold">31 दिसंबर 1934 (31st December 1934)</strong> को बिहार राज्य के ऐतिहासिक जिला गया अंतर्गत <strong className="text-slate-900 font-extrabold">ग्राम कालवाना, पोस्ट चेरकी (Kalwana, Cherki, Gaya)</strong> में हुआ था। बचपन से ही वे अपने नाना जी के वात्सल्य और मार्गदर्शन में रहकर नैतिक मूल्यों एवं परोपकार के सिद्धांतों के साथ बड़े हुए।
                </p>
                <p>
                  चिकित्सा क्षेत्र के प्रति अगाध रुचि के कारण वे उच्च शिक्षा हेतु <strong className="text-slate-900 font-extrabold">कोलकाता (Kolkata)</strong> गए। वहां उन्होंने क्लासिकल होम्योपैथी (Hahnemannian Homoeopathy) एवं मेडिकल साइंस की गहन चिकित्सीय शिक्षा प्राप्त की और डॉक्टर की उपाधि अर्जित की।
                </p>
              </div>
            </div>

            {/* 2. Medical Practice & Regional Impact */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-base sm:text-lg font-black text-[#1A0706] flex items-center gap-2 border-b border-slate-100 pb-3">
                <Award className="w-5 h-5 text-[#55100D]" />
                <span>२. होम्योपैथी में महारत, पुरुस्कार एवं नगमटिया रोड क्लिनिक (1958)</span>
              </h2>

              <div className="space-y-3 text-slate-700 text-xs sm:text-sm leading-relaxed font-medium">
                <p>
                  कोलकाता से पढ़ाई पूरी करने के बाद, उन्होंने किसी बड़े शहर में व्यावसायिक करियर बनाने के बजाय अपने गृह जिले गया में लौटने का संकल्प लिया। सन <strong className="text-slate-900 font-extrabold">1958 में नगमटिया रोड, गया</strong> में उन्होंने अपने क्लिनिक की स्थापना की।
                </p>
                <p>
                  उन्हें होम्योपैथी और कठिन रोगों के सटीक निदान में असाधारण महारत हासिल थी। उनके उत्कृष्ट इलाज के लिए उन्हें राष्ट्रीय व क्षेत्रीय स्तर पर कई <strong className="text-slate-900 font-extrabold">प्रतिष्ठित पुरस्कारों एवं सम्मानों (Awards & Recognition)</strong> से नवाजा गया।
                </p>
                <p>
                  उन्होंने गया, औरंगाबाद, नवादा, जहानाबाद, अरवल एवं संपूर्ण मगध प्रमंडल के हजारों ग्रामीण व गरीब परिवारों का निस्वार्थ इलाज किया और डॉक्टरी को आजीविका से ऊपर उठाकर मानव सेवा (Samaj Seva) का माध्यम बनाया।
                </p>
              </div>
            </div>

            {/* 3. Social Work, Orphanage & Hospital */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-base sm:text-lg font-black text-[#1A0706] flex items-center gap-2 border-b border-slate-100 pb-3">
                <Building2 className="w-5 h-5 text-[#55100D]" />
                <span>३. अनाथ बेटियों हेतु Gaya Muslim Girls Orphanage एवं अस्पताल की स्थापना</span>
              </h2>

              <div className="space-y-3 text-slate-700 text-xs sm:text-sm leading-relaxed font-medium">
                <p>
                  चिकित्सीय सेवा के साथ-साथ डॉ. क्यू. एच. खान एक महान समाज सुधारक भी थे। अनाथ एवं बेसहारा बच्चियों के संरक्षण के लिए उन्होंने अपने पैतृक स्थान पर <strong className="text-slate-900 font-extrabold">"The Gaya Muslim Girls Orphanage" (ग्राम कालवाना, चेरकी, गया)</strong> की शुरुआत की, जहाँ अनाथ बेटियों को आवास, शिक्षा एवं सुरक्षित जीवन का आश्रय मिला।
                </p>
                <p>
                  इसके अलावा, गरीबों को एकीकृत स्वास्थ्य सेवाएं प्रदान करने के लिए उनके नाम पर <strong className="text-slate-900 font-extrabold">होम्योपैथी एवं एलोपैथी (Homoeopathy & Allopathy Hospital)</strong> का एक संयुक्त धर्मार्थ अस्पताल शुरू किया गया, जिसने हजारों जरूरतमंदों का मुफ्त इलाज किया।
                </p>
              </div>
            </div>

            {/* 4. Tragic Passing Away & Living Legacy */}
            <div className="bg-[#1C0706] text-white rounded-2xl p-6 sm:p-8 border border-[#DD0200]/30 shadow-md space-y-4">
              <h2 className="text-base sm:text-lg font-black text-amber-300 flex items-center gap-2 border-b border-white/10 pb-3">
                <Sparkles className="w-5 h-5 text-[#DD0200]" />
                <span>४. दुखद कार दुर्घटना, निधन एवं अमर धरोहर (3rd June Memorial • Age 70)</span>
              </h2>

              <p className="text-slate-200 text-xs sm:text-sm leading-relaxed font-medium">
                एक दुखद कार दुर्घटना (Car Accident) के उपरांत अस्पताल में इलाज के दौरान <strong className="text-amber-300 font-black">70 वर्ष की आयु में 3 जून की रात (3rd June Night, at 70 years of age)</strong> उनका दुखद निधन हो गया। उनके चले जाने से गया एवं मगध प्रमंडल ने एक महान चिकित्सक, समाजसेवी और मानवता के सच्चे सेवक को खो दिया।
              </p>

              <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-2">
                <p className="text-slate-100 font-bold text-xs italic">
                  "आज भी उनके द्वारा 1958 में स्थापित उच्च चिकित्सीय मूल्यों, समाज सेवा के आदर्शों और रोगी सेवा संकल्प को उनके सुपुत्र डॉ. आई. खान (प्रबंध निदेशक) द्वारा पूरी निष्ठा के साथ आगे बढ़ाया जा रहा है।"
                </p>
              </div>
            </div>

          </div>

          {/* Right Sidebar Key Summary Card */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
              <h3 className="font-extrabold text-[#1A0706] text-sm uppercase tracking-wider border-b border-slate-100 pb-2">
                संक्षिप्त जीवन परिचय (Biography Summary)
              </h3>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500 font-bold">पूरा नाम:</span>
                  <strong className="text-slate-900 font-black">स्वर्गीय डॉ. क्यू. एच. खान</strong>
                </div>

                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500 font-bold">जन्म तिथि:</span>
                  <strong className="text-slate-900 font-black">31 दिसंबर 1934</strong>
                </div>

                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500 font-bold">जन्म स्थान:</span>
                  <strong className="text-slate-900 font-black">कालवाना, चेरकी, गया</strong>
                </div>

                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500 font-bold">निधन / आयु:</span>
                  <strong className="text-rose-700 font-black">3 जून (रात में) • 70 वर्ष की आयु</strong>
                </div>

                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500 font-bold">चिकित्सा डिग्री:</span>
                  <strong className="text-slate-900 font-black">B.H.M.S. (Kolkata)</strong>
                </div>

                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500 font-bold">क्लिनिक स्थापना:</span>
                  <strong className="text-[#55100D] font-black">1958 (नगमटिया रोड, गया)</strong>
                </div>

                <div className="pt-2 space-y-2">
                  <span className="text-slate-500 font-bold block text-[11px]">प्रमुख संस्थाएं:</span>
                  <ul className="space-y-1.5 text-[11px] font-bold text-slate-800">
                    <li className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                      <Building2 className="w-4 h-4 shrink-0" />
                      <span>The Gaya Muslim Girls Orphanage (Kalwana)</span>
                    </li>
                    <li className="flex items-center gap-1.5 text-sky-700 bg-sky-50 p-2 rounded-lg border border-sky-200">
                      <Award className="w-4 h-4 shrink-0" />
                      <span>Homoeopathy & Allopathy Hospital Initiator</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 text-center">
                <Link
                  href="/appointment"
                  className="w-full py-3 px-4 bg-gradient-to-r from-[#55100D] to-[#DD0200] hover:from-[#DD0200] hover:to-[#55100D] text-white text-xs font-black rounded-xl shadow transition-all hover:-translate-y-0.5 tracking-wider uppercase inline-flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>सक्रिय डॉक्टर परामर्श लें / Consult MD</span>
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>
    );
  }

  // Active Doctors (Dr. I. Khan & Dr. Adeeba Farheen)
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
      <Link href="/doctors" className="inline-flex items-center gap-1 text-xs font-semibold text-[#55100D] hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to Doctors Directory
      </Link>

      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-slate-100 pb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#55100D] shadow shrink-0">
              <img
                src={doctor.photo}
                alt={doctor.name}
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/doctors/placeholder.jpg';
                }}
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{doctor.name}</h1>
              <p className="text-xs font-bold text-[#55100D]">{doctor.designation}</p>
              {doctor.registrationNumber && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 mt-1">
                  <ShieldCheck className="w-3 h-3" /> {doctor.registrationNumber}
                </span>
              )}
            </div>
          </div>

          <Link
            href="/appointment"
            className="px-5 py-2.5 bg-[#DD0200] text-white font-bold text-xs rounded-xl shadow hover:bg-[#55100D] transition-colors inline-flex items-center gap-1.5"
          >
            <Calendar className="w-4 h-4" /> Book Appointment
          </Link>
        </div>

        <div className="space-y-4 text-xs text-slate-700">
          <div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">Qualifications & Specialization</h3>
            <p><strong className="text-slate-900">Degrees:</strong> {doctor.degrees.join(', ')}</p>
            <p><strong className="text-slate-900">Specialization:</strong> {doctor.specialization}</p>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">Biography & Clinical Experience</h3>
            <p className="text-slate-600 leading-relaxed">{doctor.bio}</p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#55100D]" /> Consultation Schedule
            </h4>
            <p className="text-slate-600">{doctor.schedule}</p>
            <p className="text-[11px] text-slate-500 pt-1">
              Clinic Location: Nagmatia Road, Gaya, Bihar. Helplines: {clinicConfig.helplines.map((h) => h.number).join(', ')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
