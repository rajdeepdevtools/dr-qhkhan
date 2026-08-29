'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Hero } from '../components/Hero';
import { DoctorCard } from '../components/DoctorCard';
import { TreatmentCard } from '../components/TreatmentCard';
import { clinicConfig, treatmentsData } from '../lib/clinicConfig';
import { useLanguage } from '../lib/language-context';
import { apiClient } from '../lib/api-client';
import {
  ShieldCheck,
  HeartPulse,
  Sparkles,
  MapPin,
  Phone,
  MessageSquare,
  ArrowRight,
  Clock,
  Star,
  ChevronDown,
  Quote,
  Play,
  Award,
  BookOpen,
  Calendar,
  ThumbsUp,
  Map
} from 'lucide-react';

export default function HomePage() {
  const { lang } = useLanguage();
  const featuredTreatments = treatmentsData.slice(0, 8);

  // Dynamic Data States
  const [camps, setCamps] = useState<any[]>([]);
  const [feedback, setFeedback] = useState<any[]>([]);
  const [videos, setVideos] = useState<any[]>([]);
  const [videoFilter, setVideoFilter] = useState<'all' | 'testimonial' | 'camp'>('all');

  // Interactive Form States
  const [reviewForm, setReviewForm] = useState({ patientName: '', rating: 5, message: '' });
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Accordion FAQ States
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const fetchDynamicData = async () => {
    try {
      const campsRes = await apiClient('/camps');
      if (campsRes.success && campsRes.data) setCamps(campsRes.data);

      const feedbackRes = await apiClient('/feedback/approved');
      if (feedbackRes.success && feedbackRes.data) setFeedback(feedbackRes.data);

      const videosRes = await apiClient('/videos');
      if (videosRes.success && videosRes.data) setVideos(videosRes.data);
    } catch (err) {
      console.error('Error fetching website home data:', err);
    }
  };

  useEffect(() => {
    fetchDynamicData();
  }, []);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError('');
    setFormSuccess(false);

    if (reviewForm.message.length < 5) {
      setFormError('Please enter a longer feedback message.');
      setIsSubmitting(false);
      return;
    }

    const res = await apiClient('/feedback', {
      method: 'POST',
      body: JSON.stringify(reviewForm),
    });

    setIsSubmitting(false);
    if (res.success) {
      setFormSuccess(true);
      setReviewForm({ patientName: '', rating: 5, message: '' });
    } else {
      setFormError(res.message || 'Failed to submit review.');
    }
  };

  const getFullImageUrl = (path: string) => {
    if (!path) return 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800';
    if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
      return path;
    }
    return `http://localhost:5000${path}`;
  };

  const getYoutubeEmbedUrl = (url: string) => {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    const id = match && match[2].length === 11 ? match[2] : null;
    return id ? `https://www.youtube.com/embed/${id}` : '';
  };

  const faqsEn = [
    {
      q: 'Does Homoeopathy offer permanent treatment for Vitiligo/Leucoderma?',
      a: 'Yes. In classical homoeopathy, vitiligo and skin depigmentation are treated constitutionally. Rather than local creams, internal remedies aim to regulate the immune response and stimulate natural melanocyte restoration.'
    },
    {
      q: 'How long does a chronic treatment course take?',
      a: 'The duration of homoeopathic treatment varies based on case history, chronicity of the disease, and constitutional response. Typically, patients notice changes in 2 to 6 months.'
    },
    {
      q: 'Are there any side effects or diet restrictions with homoeopathy?',
      a: 'Homeopathic medicines are prepared through natural dilutions and do not cause toxic side effects. We advise avoiding strong aromatic foods (like raw garlic or onion) right around taking the dose to prevent interference with natural absorption.'
    },
    {
      q: 'Are your doctors qualified and registered?',
      a: 'Absolutely. All consulting doctors at Dr. Q.H. Khan Clinic (Dr. I. Khan, Reg. 33454; Dr. Adeeba Farheen, Reg. 31319) hold valid clinical registrations and B.H.M.S. & MD degrees.'
    },
    {
      q: 'How does the clinic support social welfare and free medical camps (Shivir)?',
      a: 'Following the values of our Late Founder Dr. Q.H. Khan, we regularly host free medicine distribution drives and diagnostic camps (Shivir) in Gaya and rural Bihar to bring classical homoeopathy to families in need.'
    }
  ];

  const faqsHi = [
    {
      q: 'क्या होम्योपैथी विटिलिगो/ल्यूकोडर्मा (सफेद दाग) के लिए स्थायी उपचार प्रदान करती है?',
      a: 'हाँ। क्लासिकल होम्योपैथी में, विटिलिगो और त्वचा के सफेद दाग का उपचार संवैधानिक (Constitutional) रूप से किया जाता है। स्थानीय क्रीम के बजाय, आंतरिक दवाएं प्रतिरक्षा प्रतिक्रिया को नियंत्रित करने और प्राकृतिक मेलानोसाइट बहाली को उत्तेजित करने का काम करती हैं।'
    },
    {
      q: 'क्रोनिक उपचार कोर्स में कितना समय लगता है?',
      a: 'होम्योपैथिक उपचार की अवधि मरीज के इतिहास, बीमारी की क्रोनिकता और संवैधानिक प्रतिक्रिया के आधार पर भिन्न होती है। आम तौर पर, मरीजों को 2 से 6 महीनों में बदलाव दिखाई देने लगते हैं।'
    },
    {
      q: 'क्या होम्योपैथी के कोई दुष्प्रभाव या आहार प्रतिबंध हैं?',
      a: 'होम्योपैथिक दवाएं प्राकृतिक तत्वों के तनुकरण (dilutions) द्वारा तैयार की जाती हैं और इनका कोई दुष्प्रभाव नहीं होता। दवा लेते समय तेज गंध वाले खाद्य पदार्थों (जैसे कच्चा लहसुन या प्याज) से बचने की सलाह दी जाती है ताकि प्राकृतिक अवशोषण प्रभावित न हो।'
    },
    {
      q: 'क्या आपके डॉक्टर योग्य और पंजीकृत हैं?',
      a: 'बिल्कुल। डॉ. क्यू. एच. खान क्लिनिक में सभी परामर्शदाता डॉक्टरों (डॉ. आई. खान, पंजीकरण संख्या 33454; डॉ. अदीबा फरहीन, पंजीकरण संख्या 31319) के पास वैध क्लिनिकल पंजीकरण और बी.एच.एम.एस. एवं एम.डी. की डिग्री है।'
    },
    {
      q: 'क्लिनिक सामाजिक कल्याण और निःशुल्क चिकित्सा शिविरों (शिविर) का समर्थन कैसे करता है?',
      a: 'हमारे स्वर्गीय संस्थापक डॉ. क्यू. एच. खान के आदर्शों का पालन करते हुए, हम ग्रामीण बिहार और गया में जरूरतमंद परिवारों तक क्लासिकल होम्योपैथी पहुंचाने के लिए नियमित रूप से मुफ्त दवा वितरण अभियान और नैदानिक ​​शिविर आयोजित करते हैं।'
    }
  ];

  const faqs = lang === 'hi' ? faqsHi : faqsEn;

  const doctorsListEn = [
    {
      slug: 'dr-q-h-khan',
      name: 'Late Dr. Q.H. Khan',
      degrees: ['B.H.M.S. (B.U.)', 'M.D.', 'R.B.S.M.H.C.'],
      registrationNumber: 'Reg. 33454',
      specialization: 'Skin and private disease specialist',
      designation: 'Founder (In Memoriam)',
      bio: 'Pioneer of classical homoeopathy in Gaya who established this clinic in 1958. His dedication to Samaj Seva forms the bedrock of our clinic.',
      isDeceased: true,
    },
    {
      slug: 'dr-i-khan',
      name: 'Dr. I. Khan (Skin)',
      degrees: ['B.H.M.S. (B.U.)', 'M.D.', 'R.B.S. M.H.C.'],
      registrationNumber: 'Reg. 33454',
      specialization: 'Skin and private disease specialist',
      designation: 'Managing Director',
      bio: 'Managing Director of the clinic with extensive experience in classical homoeopathy, specializing in chronic skin disorders, vitiligo, and private diseases.',
    },
    {
      slug: 'dr-adeeba-farheen',
      name: 'Dr. Adeeba Farheen',
      degrees: ['B.H.M.S. (B.U.)', 'M.D.', 'G.D.M.C., Katihar, Patna'],
      registrationNumber: 'Reg. 31319',
      specialization: 'Infertility and skin pigmentation related conditions',
      designation: 'Scientific Advisor / Infertility Specialist',
      bio: 'Specialist consultant focusing on Vitiligo, Leucoderma, and female infertility conditions using advanced classical homoeopathy.',
    },
  ];

  const doctorsListHi = [
    {
      slug: 'dr-q-h-khan',
      name: 'स्वर्गीय डॉ. क्यू. एच. खान',
      degrees: ['बी.एच.एम.एस. (बी.यू.)', 'एम.डी.', 'आर.बी.एस.एम.एच.सी.'],
      registrationNumber: 'पंजीकरण संख्या 33454',
      specialization: 'त्वचा एवं गुप्त रोग विशेषज्ञ',
      designation: 'संस्थापक (स्मृति में)',
      bio: 'गया में क्लासिकल होम्योपैथी के अग्रदूत जिन्होंने 1958 में इस क्लिनिक की स्थापना की। समाज सेवा के प्रति उनका समर्पण हमारे क्लिनिक की आधारशिला है।',
      isDeceased: true,
    },
    {
      slug: 'dr-i-khan',
      name: 'डॉ. आई. खान (त्वचा)',
      degrees: ['बी.एच.एम.एस. (बी.यू.)', 'एम.डी.', 'आर.बी.एस.एम.एच.सी.'],
      registrationNumber: 'पंजीकरण संख्या 33454',
      specialization: 'त्वचा एवं गुप्त रोग विशेषज्ञ',
      designation: 'प्रबंध निदेशक',
      bio: 'क्लिनिक के प्रबंध निदेशक, क्लासिकल होम्योपैथी में व्यापक अनुभव के साथ, क्रोनिक त्वचा विकारों, विटिलिगो और गुप्त रोगों के विशेषज्ञ।',
    },
    {
      slug: 'dr-adeeba-farheen',
      name: 'डॉ. अदीबा फरहीन',
      degrees: ['बी.एच.एम.एस. (बी.यू.)', 'एम.डी.', 'जी.डी.एम.सी., कटिहार, पटना'],
      registrationNumber: 'पंजीकरण संख्या 31319',
      specialization: 'बांझपन और त्वचा रंजकता से संबंधित स्थितियां',
      designation: 'वैज्ञानिक सलाहकार / बांझपन विशेषज्ञ',
      bio: 'विटिलिगो, ल्यूकोडर्मा और उन्नत क्लासिकल होम्योपैथी का उपयोग करके महिला बांझपन की स्थितियों पर ध्यान केंद्रित करने वाली विशेषज्ञ सलाहकार।',
    },
  ];

  const doctorsList = lang === 'hi' ? doctorsListHi : doctorsListEn;

  const filteredVideos = videoFilter === 'all'
    ? videos
    : videos.filter(v => v.category === videoFilter);

  return (
    <div className="space-y-12 pb-12">
      {/* 1. HERO SECTION */}
      <Hero />

      {/* 2. TICKER BANNER (SLOGANS CAROUSEL) */}
      <section className="bg-clinic-indigo/5 border-y border-clinic-indigo/10 py-3 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-bold text-clinic-indigo">
            {clinicConfig.slogans.map((slogan, idx) => (
              <span key={idx} className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm whitespace-nowrap">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                <span>{slogan}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* NEW SECTION: CLINICAL METRICS GRID */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            {
              count: '68+',
              labelEn: 'Years of Service',
              labelHi: 'वर्षों की सेवा',
              descEn: 'Trust since 1958',
              descHi: '1958 से अटूट विश्वास'
            },
            {
              count: '10,000+',
              labelEn: 'Treated Cases',
              labelHi: 'सफल उपचारित केस',
              descEn: 'Skin & chronic ailments',
              descHi: 'त्वचा एवं क्रोनिक रोग'
            },
            {
              count: '3+',
              labelEn: 'Registered Specialists',
              labelHi: 'पंजीकृत विशेषज्ञ',
              descEn: 'Qualified physicians',
              descHi: 'योग्य चिकित्सक टीम'
            },
            {
              count: '2+',
              labelEn: 'Free Camps Monthly',
              labelHi: 'मासिक मुफ्त शिविर',
              descEn: 'Social health service',
              descHi: 'सामाजिक स्वास्थ्य सेवा'
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-slate-350 transition-colors shadow-sm">
              <p className="text-3xl font-black text-clinic-indigo">{item.count}</p>
              <p className="text-xs font-bold text-slate-800 mt-1.5">{lang === 'hi' ? item.labelHi : item.labelEn}</p>
              <p className="text-[10px] text-slate-500 mt-0.5 font-medium">{lang === 'hi' ? item.descHi : item.descEn}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FOUNDER'S MEMORIAL & LEGACY TIMELINE */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/10 rounded-full blur-3xl" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400 bg-amber-400/10 border border-amber-500/20 px-3 py-1 rounded-full">
                {lang === 'hi' ? 'स्थापना 1958 गया — ऐतिहासिक धरोहर' : 'Est. 1958 Gaya — Historical Heritage'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                {lang === 'hi' 
                  ? 'हमारी जड़ें: समाज सेवा के लिए स्वर्गीय डॉ. क्यू. एच. खान का दृष्टिकोण'
                  : 'Our Roots: Late Dr. Q.H. Khan’s Vision for Samaj Seva'}
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                {lang === 'hi'
                  ? '1958 में, स्वर्गीय डॉ. क्यू. एच. खान ने गया, बिहार में क्लासिकल होम्योपैथी की शुरुआत की। उनका दृढ़ विश्वास था कि चिकित्सा मानवता की सेवा है, इसलिए उन्होंने अपनी प्रैक्टिस को समाज सेवा (Samaj Seva) के इर्द-गिर्द केंद्रित किया, जिसके तहत वे ग्रामीण मरीजों को मुफ्त परामर्श और स्वास्थ्य जांच प्रदान करते थे।'
                  : 'In 1958, Late Dr. Q.H. Khan brought classical homoeopathy to Gaya, Bihar. Believing that healing is a service to humanity, he structured his practice around Samaj Seva (community social service), offering free consultations and medical checkups to rural patients.'}
              </p>
              
              <div className="space-y-4 pt-2">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-xs shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-white text-sm">
                      {lang === 'hi' ? '1958: स्थापना' : '1958: Foundation'}
                    </h4>
                    <p className="text-slate-400 text-xs">
                      {lang === 'hi'
                        ? 'समाज के सभी वर्गों को गुणवत्तापूर्ण चिकित्सा प्रदान करने के लिए नगमटिया रोड पर क्लिनिक की स्थापना की।'
                        : 'Set up the clinic at Nagmatia Road to offer quality treatment to all segments of society.'}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-xs shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-white text-sm">
                      {lang === 'hi' ? 'निःशुल्क चिकित्सा शिविर' : 'Free Medical Shivirs'}
                    </h4>
                    <p className="text-slate-400 text-xs">
                      {lang === 'hi'
                        ? 'गया के ग्रामीण जिलों का दौरा कर स्वास्थ्य जागरूकता शिविर आयोजित करने और मुफ्त दवाएं वितरित करने की मासिक दिनचर्या स्थापित की।'
                        : 'Established a monthly routine of traveling to rural districts of Gaya to conduct health awareness camps and distribute free medicines.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 space-y-4 shadow-xl">
              <Award className="w-10 h-10 text-amber-500" />
              <h3 className="font-bold text-lg text-white">
                {lang === 'hi' ? 'संस्थापक विरासत संदेश' : 'Founder Legacy Note'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-serif italic">
                {lang === 'hi'
                  ? '"हमारे संस्थापक स्वर्गीय डॉ. क्यू. एच. खान ने क्लासिकल होम्योपैथी को एक प्राकृतिक, संवैधानिक उपचार प्रणाली के रूप में प्रसारित करने में अपना जीवन समर्पित किया। हम उत्कृष्ट त्वचा रोग परामर्श और निरंतर सामाजिक सेवा शिविरों को जोड़कर उनके मूल्यों के प्रति प्रतिबद्ध हैं।"'
                  : '"Our founder Late Dr. Q.H. Khan spent his lifetime propagating classical homeopathy as a natural, constitutional healing system. We remain committed to his values by combining top-tier skin care consultation with continuous social service camps."'}
              </p>
              <div className="pt-2 border-t border-slate-700 flex justify-between items-center text-xs">
                <span className="font-bold text-amber-400">Dr. I. Khan</span>
                <span className="text-slate-400">
                  {lang === 'hi' ? 'प्रबंध निदेशक' : 'Managing Director'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ACTIVE CLINICAL SPECIALISTS */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-clinic-indigo uppercase tracking-wider">
            {lang === 'hi' ? 'सक्रिय चिकित्सा टीम' : 'Active Clinical Team'}
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900">
            {lang === 'hi' ? 'हमारे अनुभवी विशेषज्ञों से परामर्श लें' : 'Consult Our Experienced Specialists'}
          </h2>
          <p className="text-xs text-slate-500 max-w-xl mx-auto">
            {lang === 'hi'
              ? 'क्रोनिक त्वचा विकारों, विटिलिगो और बांझपन में दशकों के संचयी अनुभव वाले योग्य होम्योपैथिक डॉक्टरों से उपचार प्राप्त करें।'
              : 'Get treated by qualified homeopathic doctors with decades of cumulative experience in chronic skin disorders, vitiligo, and infertility.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {doctorsList.map((doc, idx) => (
            <DoctorCard key={idx} doctor={doc} />
          ))}
        </div>
      </section>

      {/* NEW SECTION: CONSTITUTIONAL CARE PROCESS */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-clinic-indigo uppercase tracking-wider">
            {lang === 'hi' ? 'हमारी उपचार प्रक्रिया' : 'Our Clinical Method'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {lang === 'hi' ? 'संवैधानिक होम्योपैथिक उपचार मार्ग' : 'Constitutional Care Consultation Process'}
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm max-w-2xl mx-auto font-medium">
            {lang === 'hi'
              ? 'मरीजों के संपूर्ण मानसिक, शारीरिक और अनुवांशिक लक्षणों के आधार पर व्यक्तिगत परामर्श।'
              : 'Thorough step-by-step case evaluation based on individual constitutional profiles.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-semibold pt-4">
          {[
            {
              step: '01',
              titleEn: 'Individual Intake',
              titleHi: 'व्यक्तिगत केस-इंटेक',
              descEn: 'Detailed recording of chronic symptoms, lifestyle, genetic factors, and dietary habits.',
              descHi: 'क्रोनिक लक्षणों, जीवन शैली, अनुवांशिक इतिहास और आहार संबंधी आदतों की विस्तृत केस स्टडी।'
            },
            {
              step: '02',
              titleEn: 'Medical Evaluation',
              titleHi: 'चिकित्सीय विश्लेषण',
              descEn: 'Analyzing past reports, clinical diagnostic tests, and pathological severity levels.',
              descHi: 'पुराने मेडिकल रिकॉर्ड्स, नैदानिक जांच रिपोर्टों और बीमारी की तीव्रता का गहन विश्लेषण।'
            },
            {
              step: '03',
              titleEn: 'Remedy Selection',
              titleHi: 'औषधि निर्धारण',
              descEn: 'Determining the constitutional homeopathic remedy and precise therapeutic potency.',
              descHi: 'व्यक्ति की शारीरिक एवं मानसिक प्रकृति के अनुकूल सही होम्योपैथिक दवा व पोटेंसी का चयन।'
            },
            {
              step: '04',
              titleEn: 'Active Monitoring',
              titleHi: 'सतत अनुवर्ती निगरानी',
              descEn: 'Ongoing follow-up consultations to monitor recovery progress and adjust potency schedules.',
              descHi: 'बीमारी में सुधार की गति की जांच करने और दवा की मात्रा में आवश्यक बदलाव हेतु फॉलो-अप।'
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:bg-white hover:border-slate-350 transition-all relative">
              <span className="absolute -top-3 right-5 text-4xl font-black text-slate-200/80 select-none">{item.step}</span>
              <h3 className="font-bold text-slate-950 text-sm mt-2">{lang === 'hi' ? item.titleHi : item.titleEn}</h3>
              <p className="text-slate-650 mt-2 leading-relaxed text-[11px] font-medium">{lang === 'hi' ? item.descHi : item.descEn}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. COMMUNITY CAMPS & FREE SHIVIR GALLERY */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-bold text-clinic-indigo uppercase tracking-wider">
              {lang === 'hi' ? 'समाज सेवा और निःशुल्क दवा शिविर' : 'SAMAJ SEVA & FREE MEDICINE SHIVIR'}
            </span>
            <h2 className="text-2xl font-bold text-slate-900">
              {lang === 'hi' ? 'सामुदायिक सामाजिक सेवाएँ' : 'Community Social Services'}
            </h2>
          </div>
          <span className="text-[11px] font-semibold text-slate-500">
            {lang === 'hi' ? 'एडमिन पैनल से नियमित रूप से अपडेटेड' : 'Regularly updated from admin control panel'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {camps.length === 0 ? (
            <div className="col-span-2 p-8 text-center bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-500">
              {lang === 'hi' ? 'अभी तक कोई चिकित्सा शिविर दर्ज नहीं किया गया है।' : 'No medical camps recorded yet.'}
            </div>
          ) : (
            camps.map((camp) => (
              <div key={camp._id} className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-md hover:shadow-lg transition-shadow grid grid-cols-1 sm:grid-cols-12">
                <div className="sm:col-span-5 relative h-48 sm:h-auto min-h-[160px]">
                  <img
                    src={getFullImageUrl(camp.imageUrl)}
                    alt={camp.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="sm:col-span-7 p-6 space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2 text-[10px] font-bold">
                      <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {camp.date}
                      </span>
                      <span className="px-2 py-0.5 bg-indigo-100 text-clinic-indigo rounded-full flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {camp.location}
                      </span>
                    </div>
                    <h3 className="font-extrabold text-slate-950 text-base leading-snug">{camp.title}</h3>
                    <p className="text-slate-650 text-xs leading-relaxed line-clamp-3">{camp.description}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-xs text-emerald-600 font-bold">
                    <ThumbsUp className="w-4 h-4" /> {lang === 'hi' ? 'निःशुल्क परामर्श एवं औषधियाँ प्रदान की गईं' : 'Free Consultations & Remedies Provided'}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* 6. CONSULTATION SPECIALTIES (TREATMENTS) */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-bold text-clinic-indigo uppercase tracking-wider">
              {lang === 'hi' ? 'क्लिनिकल परामर्श क्षेत्र' : 'CLINICAL CONSULTATION AREAS'}
            </span>
            <h2 className="text-2xl font-bold text-slate-900">
              {lang === 'hi' ? 'त्वचा, रंजकता (Pigmentation) और क्रोनिक बीमारी देखभाल' : 'Featured Skin, Pigmentation & Chronic Disease Care'}
            </h2>
          </div>
          <Link
            href="/treatments"
            className="text-xs font-bold text-clinic-indigo hover:text-clinic-violet inline-flex items-center gap-1"
          >
            <span>{lang === 'hi' ? 'सभी विशेषज्ञता देखें' : 'View All Specialties'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {featuredTreatments.map((t, idx) => (
            <TreatmentCard key={idx} treatment={t} />
          ))}
        </div>
      </section>

      {/* 7. FAQ ACCORDION SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-clinic-indigo uppercase tracking-wider">
            {lang === 'hi' ? 'सहायक जानकारी' : 'HELPFUL KNOWLEDGE'}
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900">
            {lang === 'hi' ? 'अक्सर पूछे जाने वाले प्रश्न' : 'Frequently Asked Questions'}
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all shadow-sm">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex justify-between items-center gap-4 hover:bg-slate-50 transition-colors"
                >
                  <span className="font-bold text-slate-900 text-sm sm:text-base">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-250 ${isOpen ? 'rotate-180 text-clinic-indigo' : ''}`} />
                </button>
                {isOpen && (
                  <div className="p-4 bg-slate-50 border-t border-slate-100 text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. PATIENT WRITTEN TESTIMONIALS */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-clinic-indigo uppercase tracking-wider">
            {lang === 'hi' ? 'मरीजों की राय' : 'PATIENT VERDICTS'}
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900">
            {lang === 'hi' ? 'हमारे मरीजों के अनुभव' : 'What Our Patients Say'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {feedback.length === 0 ? (
            <div className="col-span-3 p-8 text-center bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-500">
              {lang === 'hi' ? 'प्रदर्शित करने के लिए अभी कोई स्वीकृत फीडबैक नहीं है।' : 'No approved feedbacks to display.'}
            </div>
          ) : (
            feedback.map((fb, idx) => {
              const avatars = [
                "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=100",
                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100",
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100"
              ];
              const avatarUrl = avatars[idx % avatars.length];

              return (
                <div
                  key={fb._id}
                  className="text-sm border border-slate-200 pb-6 rounded-2xl bg-white shadow-[0px_4px_15px_0px] shadow-black/5 overflow-hidden flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4 px-5 py-4 bg-clinic-indigo/5">
                    <img className="h-12 w-12 rounded-full object-cover" src={avatarUrl} alt={fb.patientName} />
                    <div>
                      <h1 className="text-sm font-bold text-slate-900 leading-none">{fb.patientName}</h1>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1.5">
                        {lang === 'hi' ? 'सत्यापित रोगी' : 'Verified Patient'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="px-5 space-y-2 flex-grow">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} width="16" height="15" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z"
                            fill={i < fb.rating ? "#FF532E" : "#E2E8F0"}
                          />
                        </svg>
                      ))}
                    </div>
                    <p className="text-slate-600 text-xs mt-3 leading-relaxed italic">"{fb.message}"</p>
                  </div>

                  <a href="#review-form" className="text-clinic-crimson text-xs font-bold hover:underline px-5 mt-auto">
                    {lang === 'hi' ? 'समीक्षा जोड़ें' : 'Submit Feedback'}
                  </a>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* 9. VIDEO TESTIMONIAL STREAMS */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-bold text-clinic-indigo uppercase tracking-wider">
              {lang === 'hi' ? 'वीडियो डायरी और हाइलाइट्स' : 'VIDEO DIARIES & HIGHLIGHTS'}
            </span>
            <h2 className="text-2xl font-bold text-slate-900">
              {lang === 'hi' ? 'यूट्यूब वीडियो गैलरी' : 'YouTube Video Gallery'}
            </h2>
          </div>
          
          <div className="flex gap-2 bg-slate-100 p-1 rounded-xl text-[10px] font-bold">
            <button
              onClick={() => setVideoFilter('all')}
              className={`px-3 py-1 rounded-lg ${videoFilter === 'all' ? 'bg-white text-clinic-indigo shadow-sm' : 'text-slate-500'}`}
            >
              {lang === 'hi' ? 'सभी वीडियो' : 'All Videos'}
            </button>
            <button
              onClick={() => setVideoFilter('testimonial')}
              className={`px-3 py-1 rounded-lg ${videoFilter === 'testimonial' ? 'bg-white text-clinic-indigo shadow-sm' : 'text-slate-500'}`}
            >
              {lang === 'hi' ? 'मरीजों के अनुभव' : 'Testimonials'}
            </button>
            <button
              onClick={() => setVideoFilter('camp')}
              className={`px-3 py-1 rounded-lg ${videoFilter === 'camp' ? 'bg-white text-clinic-indigo shadow-sm' : 'text-slate-500'}`}
            >
              {lang === 'hi' ? 'चिकित्सा शिविर' : 'Camps'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredVideos.length === 0 ? (
            <div className="col-span-2 p-8 text-center bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-500">
              {lang === 'hi' ? 'कोई वीडियो इस फ़िल्टर से मेल नहीं खाता है।' : 'No videos match the current filter.'}
            </div>
          ) : (
            filteredVideos.map((v) => {
              const embedUrl = getYoutubeEmbedUrl(v.youtubeUrl);
              return (
                <div key={v._id} className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-md flex flex-col justify-between">
                  <div className="aspect-video w-full bg-slate-900 relative">
                    {embedUrl ? (
                      <iframe
                        src={embedUrl}
                        title={v.title}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 text-xs">
                        <Play className="w-8 h-8 text-rose-600 mb-2 animate-bounce" />
                        <span>{lang === 'hi' ? 'अमान्य यूट्यूब लिंक' : 'Invalid YouTube Link'}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-5 space-y-2">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-650 rounded text-[9px] font-bold uppercase">
                      {v.category === 'testimonial' 
                        ? (lang === 'hi' ? 'मरीज की समीक्षा' : 'Patient Review') 
                        : (lang === 'hi' ? 'शिविर की मुख्य झलकियां' : 'Camp Highlights')}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm leading-snug">{v.title}</h3>
                    {v.description && <p className="text-slate-500 text-xs leading-relaxed">{v.description}</p>}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* 10. WRITE A REVIEW / SUBMIT FEEDBACK FORM */}
      <section id="review-form" className="max-w-xl mx-auto px-4 sm:px-6 scroll-mt-24">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
          <div className="text-center space-y-1">
            <h3 className="text-xl font-bold text-slate-950 font-sans">
              {lang === 'hi' ? 'अपना अनुभव साझा करें' : 'Share Your Experience'}
            </h3>
            <p className="text-xs text-slate-500">
              {lang === 'hi'
                ? 'आपका फीडबैक गुणवत्तापूर्ण होम्योपैथिक उपचार की तलाश कर रहे हजारों लोगों की मदद करता है।'
                : 'Your feedback helps thousands of people seeking quality homoeopathic healing.'}
            </p>
          </div>

          {formSuccess ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs text-center space-y-2">
              <span className="font-bold block text-sm">
                {lang === 'hi' ? 'समीक्षा सफलतापूर्वक सबमिट की गई!' : 'Review Submitted Successfully!'}
              </span>
              <p>
                {lang === 'hi'
                  ? 'धन्यवाद! मॉडरेटर की मंजूरी के बाद आपका फीडबैक प्रदर्शित किया जाएगा।'
                  : 'Thank you! Your feedback will be displayed after moderator approval.'}
              </p>
              <button
                onClick={() => setFormSuccess(false)}
                className="mt-2 text-clinic-indigo font-bold hover:underline"
              >
                {lang === 'hi' ? 'एक और फीडबैक सबमिट करें' : 'Submit another feedback'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              {formError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-semibold">
                  {lang === 'hi' ? 'कृपया थोड़ा लंबा फीडबैक संदेश दर्ज करें।' : formError}
                </div>
              )}
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">
                  {lang === 'hi' ? 'आपका पूरा नाम' : 'Your Full Name'}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Kumar"
                  value={reviewForm.patientName}
                  onChange={(e) => setReviewForm({ ...reviewForm, patientName: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs outline-none focus:border-clinic-indigo"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">
                  {lang === 'hi' ? 'रेटिंग (अंक)' : 'Rating'}
                </label>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((stars) => (
                    <button
                      key={stars}
                      type="button"
                      onClick={() => setReviewForm({ ...reviewForm, rating: stars })}
                      className="text-amber-400 focus:outline-none"
                    >
                      <Star className={`w-6 h-6 ${reviewForm.rating >= stars ? 'fill-amber-400' : 'text-slate-300'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">
                  {lang === 'hi' ? 'फीडबैक संदेश' : 'Feedback Message'}
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder={
                    lang === 'hi'
                      ? 'अपनी रिकवरी यात्रा या क्लिनिक परामर्श का अनुभव लिखें...'
                      : 'Write your recovery journey or consultation experience...'
                  }
                  value={reviewForm.message}
                  onChange={(e) => setReviewForm({ ...reviewForm, message: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs outline-none focus:border-clinic-indigo resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-clinic-indigo hover:bg-clinic-violet text-white font-bold text-xs rounded-xl shadow transition-colors disabled:opacity-50"
              >
                {isSubmitting 
                  ? (lang === 'hi' ? 'समीक्षा सबमिट की जा रही है...' : 'Submitting review...') 
                  : (lang === 'hi' ? 'समीक्षा सबमिट करें' : 'Submit Review')}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* 11. HELPLINES & INSTANT CHAT WIDGET */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-r from-[#55100D] via-[#1A0706] to-[#131314] text-white rounded-3xl p-8 shadow-2xl flex flex-col lg:flex-row justify-between items-center gap-6 overflow-hidden border border-white/5">
          
          {/* Animated decorative grid background */}
          <div className="absolute inset-0 futuristic-grid opacity-[0.03] pointer-events-none" />
          
          <div className="space-y-3 text-center lg:text-left relative z-10">
            {/* Live Indicator Tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{lang === 'hi' ? 'लाइव सहायता उपलब्ध' : 'Live Support Available'}</span>
            </div>
            
            <h3 className="text-2xl font-black text-white tracking-wide leading-none">
              {lang === 'hi' ? 'परामर्श में सहायता चाहिए?' : 'Need Consultation Assistance?'}
            </h3>
            <p className="text-xs text-rose-100/80 max-w-xl font-bold leading-relaxed">
              {lang === 'hi'
                ? 'डॉक्टर की उपलब्धता जानने के लिए सीधे हमारे हेल्पलाइन नंबरों पर कॉल करें या व्हाट्सएप पर संदेश भेजें।'
                : 'Call our helpline numbers directly or send a message via WhatsApp to check doctor availability at Nagmatia Road, Gaya.'}
            </p>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-3 relative z-10 text-xs">
            <a
              href="tel:9135404090"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-[#1A0706] font-extrabold shadow-md transition-colors"
            >
              <Phone className="w-4 h-4 text-[#DD0200] animate-pulse" />
              <span>{lang === 'hi' ? 'कॉल करें: 9135404090' : 'Call 9135404090'}</span>
            </a>
            
            <a
              href={`https://wa.me/91${clinicConfig.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#075E54] hover:bg-[#128C7E] text-white font-extrabold shadow-md transition-colors border border-white/5"
            >
              <MessageSquare className="w-4 h-4 text-emerald-300" />
              <span>{lang === 'hi' ? 'व्हाट्सएप चैट' : 'WhatsApp Chat'}</span>
            </a>

            <Link
              href="/appointment"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#DD0200] to-rose-700 hover:from-rose-600 text-white font-extrabold shadow-md transition-all hover:-translate-y-0.5"
            >
              <Calendar className="w-4 h-4 text-white" />
              <span>{lang === 'hi' ? 'ऑनलाइन बुक करें' : 'Book Online'}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 12. HEALTH INSIGHTS & BLOGS */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-bold text-clinic-indigo uppercase tracking-wider">
              {lang === 'hi' ? 'स्वास्थ्य मार्गदर्शन' : 'HEALTH GUIDANCE'}
            </span>
            <h2 className="text-2xl font-bold text-slate-900">
              {lang === 'hi' ? 'नवीनतम शैक्षिक संसाधन' : 'Latest Educational Resources'}
            </h2>
          </div>
          <Link
            href="/blogs"
            className="text-xs font-bold text-clinic-indigo hover:text-clinic-violet inline-flex items-center gap-1"
          >
            <span>{lang === 'hi' ? 'सभी स्वास्थ्य लेख देखें' : 'View All Health Articles'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 border border-slate-200 rounded-3xl shadow-md flex gap-4">
            <div className="w-12 h-12 bg-indigo-50 text-clinic-indigo rounded-2xl flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-clinic-indigo bg-clinic-indigo/10 px-2 py-0.5 rounded uppercase">
                {lang === 'hi' ? 'विटिलिगो एवं त्वचा' : 'Vitiligo & Skin'}
              </span>
              <h3 className="font-extrabold text-slate-900 text-sm sm:text-base hover:text-clinic-indigo cursor-pointer transition-colors">
                {lang === 'hi' ? 'ल्यूकोडर्मा (सफेद दाग) के डीपिगमेंटेशन चक्र को समझना' : 'Understanding Leucoderma Depigmentation Cycles'}
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">
                {lang === 'hi'
                  ? 'मेलानोसाइट पुनर्सक्रियन, आहार संबंधी सिफारिशों और संवैधानिक नुस्खे कैसे उपचार में सहायता करते हैं, इसका एक शैक्षिक अवलोकन।'
                  : 'An educational overview detailing melanocyte reactivation, diet recommendations, and how classical constitutional prescriptions support healing.'}
              </p>
            </div>
          </div>
          <div className="bg-white p-6 border border-slate-200 rounded-3xl shadow-md flex gap-4">
            <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded uppercase">
                {lang === 'hi' ? 'सामान्य स्वास्थ्य' : 'General Health'}
              </span>
              <h3 className="font-extrabold text-slate-900 text-sm sm:text-base hover:text-clinic-indigo cursor-pointer transition-colors">
                {lang === 'hi' ? 'संवैधानिक चिकित्सा बनाम सामान्य जेनेरिक उपचार' : 'Constitutional Remedies vs. Generic Treatment'}
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">
                {lang === 'hi'
                  ? 'क्लासिकल होम्योपैथी में केस मूल्यांकन पद्धति के बारे में जानें और क्यों व्यक्तिगत दवा का चयन दीर्घकालिक राहत प्रदान करता है।'
                  : 'Learn about case evaluation methodology in classical homeopathy and why individualized selection leads to long-lasting clinical relief.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION: MEDICAL SAFETY PLEDGE */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 to-clinic-indigo text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-3 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              {lang === 'hi' ? 'चिकित्सीय शुचिता और सुरक्षा शपथ' : 'Clinical Integrity & Safety Pledge'}
            </span>
            <h3 className="text-xl font-bold text-white tracking-tight">
              {lang === 'hi' ? 'जिम्मेदार स्वास्थ्य सेवाएं और नैतिक चिकित्सा' : 'Responsible Patient Care & Transparent Treatment'}
            </h3>
            <p className="text-slate-350 text-xs leading-relaxed font-medium">
              {lang === 'hi'
                ? 'हम चमत्कारी इलाज या १००% त्वरित समाधान का झूठा दावा नहीं करते हैं। हमारी सभी परामर्श प्रक्रियाएं पूरी गोपनीयता के साथ योग्य और पंजीकृत (B.H.M.S, M.D.) डॉक्टरों द्वारा संचालित की जाती हैं। गंभीर सर्जिकल या तीव्र आपातकालीन स्थितियों के लिए हम तुरंत उच्चतर अस्पतालों में रेफर करने की सलाह देते हैं।'
                : 'At Dr. Q.H. Khan Clinic, we follow professional medical guidelines. We do not provide false guarantees or unrealistic cure claims. All consultations are handled with complete confidentiality by qualified, registered physicians. Acute, severe, or surgical emergencies are immediately directed to specialized hospital emergency facilities.'}
            </p>
          </div>
        </div>
      </section>

      {/* 13. ADDRESS & GOOGLE MAP DIRECTIONS */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
          <div className="md:col-span-5 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-clinic-crimson bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
              {lang === 'hi' ? 'हमारे गया क्लिनिक पर आएं' : 'VISIT OUR GAYA CLINIC'}
            </span>
            <h2 className="text-2xl font-bold text-slate-950">
              {lang === 'hi' ? 'स्थान और दिशा-निर्देश' : 'Location & Directions'}
            </h2>
            <p className="text-slate-650 text-xs sm:text-sm leading-relaxed">
              {lang === 'hi'
                ? 'हमारा क्लिनिक नगमटिया रोड, गया, Bihar में स्थित है। गया जंक्शन रेलवे स्टेशन से सुरक्षित और सुगम पहुंच (लगभग 1.5 किमी की दूरी)।'
                : 'Our clinical facility is situated at Nagmatia Road, Gaya, Bihar, India. Safe accessibility from Gaya Junction Railway Station (approximately 1.5 km distance).'}
            </p>
            <div className="p-4 bg-slate-50 rounded-xl space-y-2 border border-slate-100 text-xs text-slate-700">
              <p className="font-bold flex items-center gap-1.5 text-slate-900">
                <MapPin className="w-4 h-4 text-rose-500" /> {lang === 'hi' ? 'पूरा पता:' : 'Full Address:'}
              </p>
              <p>
                {lang === 'hi'
                  ? 'डॉ. क्यू. एच. खान क्लिनिक, नगमटिया रोड, गया जंक्शन रेलवे स्टेशन के पास, गया - 823001, बिहार, भारत'
                  : 'Dr. Q.H. Khan Clinic, Nagmatia Road, Near Gaya Junction Railway Station, Gaya - 823001, Bihar, India'}
              </p>
            </div>
          </div>

          <div className="md:col-span-7 bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between items-center text-center space-y-4 relative min-h-[220px]">
            <Map className="w-12 h-12 text-slate-300 animate-pulse mt-4" />
            <div className="space-y-1">
              <h4 className="font-extrabold text-slate-900 text-sm">
                {lang === 'hi' ? 'इंटरैक्टिव मार्ग दर्शन' : 'Interactive Navigation Route'}
              </h4>
              <p className="text-slate-500 text-xs max-w-sm">
                {lang === 'hi'
                  ? 'रेलवे स्टेशन, बस स्टैंड या स्थानीय स्थलों से मार्ग दिशा-निर्देशों के लिए गूगल मैप्स का उपयोग करें।'
                  : 'Use Google Maps for route directions from railway station, bus stands, or local landmarks.'}
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=Dr.+Q.H.+Khan+Clinic,+Nagmatia+Road,+Gaya,+Bihar"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-clinic-indigo hover:bg-clinic-violet text-white font-bold text-xs rounded-xl shadow-md transition-colors"
            >
              <span>{lang === 'hi' ? 'गूगल मैप्स खोलें' : 'Open Google Maps'}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
