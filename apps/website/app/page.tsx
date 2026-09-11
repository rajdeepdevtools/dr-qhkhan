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
  MapPin,
  Phone,
  MessageSquare,
  ArrowRight,
  Clock,
  Star,
  ChevronDown,
  Play,
  Award,
  BookOpen,
  Calendar,
  ThumbsUp,
  Tag,
  MapIcon as Map,
  Sparkles,
  CheckCircle2,
  User
} from 'lucide-react';

export default function HomePage() {
  const { lang } = useLanguage();
  const [activeTargetGroup, setActiveTargetGroup] = useState<'all' | 'Male' | 'Female' | 'Children' | 'General'>('all');

  const displayTreatments = activeTargetGroup === 'all'
    ? [
        ...treatmentsData.filter(t => t.targetGroup === 'Male').slice(0, 3),
        ...treatmentsData.filter(t => t.targetGroup === 'Female').slice(0, 3),
        ...treatmentsData.filter(t => t.targetGroup === 'Children').slice(0, 3),
        ...treatmentsData.filter(t => t.targetGroup === 'General').slice(0, 3),
      ]
    : treatmentsData.filter(t => t.targetGroup === activeTargetGroup);

const DEFAULT_CAMPS = [
  {
    _id: 'camp-1',
    title: 'Free Medicine Distribution & Health Camp',
    description: 'Organized a free homeopathic health checkup and medicine distribution camp serving over 500 patients from underprivileged areas in Gaya. Focused on chronic skin issues and children health.',
    date: '15th August 2026',
    location: 'Nagmatia Road, Gaya, Bihar',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
    isActive: true
  },
  {
    _id: 'camp-2',
    title: 'Rural Homoeopathy Awareness & Healing Camp',
    description: 'Conducted a dedicated classical homeopathic camp in Bodh Gaya. Provided free consultations and distributed constitutional remedies for chronic disorders.',
    date: '20th July 2026',
    location: 'Bodh Gaya, Bihar, India',
    imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800',
    isActive: true
  }
];

const DEFAULT_FEEDBACK = [
  {
    _id: 'fb-1',
    patientName: 'Rajesh Kumar',
    rating: 5,
    message: 'Dr. Q.H. Khan Clinic in Gaya has been our family homeopathy clinic for 3 generations. Outstanding diagnosis and gentle healing.',
    createdAt: '2026-08-10'
  },
  {
    _id: 'fb-2',
    patientName: 'Anjali Sharma',
    rating: 5,
    message: 'Clean clinic atmosphere and polite doctors. Dr. Adeeba Farheen explained skin treatment clearly.',
    createdAt: '2026-08-15'
  },
  {
    _id: 'fb-3',
    patientName: 'Md. Tariq Hasan',
    rating: 5,
    message: 'Extremely effective classical homeopathic treatment for chronic sinusitis. Highly recommended in Gaya.',
    createdAt: '2026-08-20'
  }
];

const DEFAULT_VIDEOS = [
  {
    _id: 'vid-1',
    title: 'Classical Homoeopathy & Chronic Disease Healing Guide',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    category: 'testimonial',
    description: 'Patient recovery story and classical homeopathic principle explanation by Dr. Irfan Khan.'
  },
  {
    _id: 'vid-2',
    title: 'Free Health Camp Highlights - Gaya Nagmatia Road',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    category: 'camp',
    description: 'Glimpses of free consultation and medicine distribution camp held at Nagmatia Road, Gaya.'
  }
];

  // Dynamic Data States
  const [camps, setCamps] = useState<any[]>(DEFAULT_CAMPS);
  const [feedback, setFeedback] = useState<any[]>(DEFAULT_FEEDBACK);
  const [videos, setVideos] = useState<any[]>(DEFAULT_VIDEOS);
  const [dynamicDoctors, setDynamicDoctors] = useState<any[] | null>(null);
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
      if (campsRes.success && Array.isArray(campsRes.data) && campsRes.data.length > 0) {
        setCamps(campsRes.data);
      }

      const feedbackRes = await apiClient('/feedback/approved');
      if (feedbackRes.success && Array.isArray(feedbackRes.data) && feedbackRes.data.length > 0) {
        setFeedback(feedbackRes.data);
      }

      const videosRes = await apiClient('/videos');
      if (videosRes.success && Array.isArray(videosRes.data) && videosRes.data.length > 0) {
        setVideos(videosRes.data);
      }

      const doctorsRes = await apiClient('/doctors');
      if (doctorsRes.success && Array.isArray(doctorsRes.data) && doctorsRes.data.length > 0) {
        setDynamicDoctors(doctorsRes.data);
      }
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
    const backendOrigin = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api').replace(/\/api\/?$/, '');
    return `${backendOrigin}${path.startsWith('/') ? path : `/${path}`}`;
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
      degrees: ['B.H.M.S. (B.U.)', 'R.B.S.M.H.C.'],
      registrationNumber: 'Reg. 33454',
      specialization: 'Multi-Specialist & General Physician',
      designation: 'Founder (In Memoriam)',
      bio: 'Pioneer of classical homoeopathy in Gaya who established this clinic in 1958. His dedication to Samaj Seva forms the bedrock of our clinic.',
      image: '/images/dr-qh-khan.png',
      isDeceased: true,
    },
    {
      slug: 'dr-i-khan',
      name: 'Dr. I. Khan',
      degrees: ['B.H.M.S. (B.U.)', 'R.B.S. M.H.C.'],
      registrationNumber: 'Reg. 33454',
      specialization: 'General Physician & Chronic Disease Specialist',
      designation: 'Managing Director & General Physician',
      bio: 'Managing Director & General Physician with extensive experience in classical homoeopathy, specializing in chronic diseases, severe long-term illnesses, skin disorders, vitiligo, and private constitutional complaints.',
      image: '/images/dr-i-khan.png',
    },
    {
      slug: 'dr-adeeba-farheen',
      name: 'Dr. Adeeba Farheen',
      degrees: ['B.H.M.S. (B.U.)', 'M.D. (Physician)', 'G.D.M.C., Katihar, Patna'],
      registrationNumber: 'Reg. 31319',
      specialization: 'General Physician, Female Disorders (PCOD, Breast Lumps) & Normal Delivery Care',
      designation: 'Consultant Physician & Female Health Specialist',
      bio: 'General Physician and Female Healthcare consultant experienced in PCOD/PCOS, breast tumours/lumps, female health disorders, normal delivery consultation, and general medical conditions.',
      image: '/images/dr-adeeba-farheen.png',
    },
  ];

  const doctorsListHi = [
    {
      slug: 'dr-q-h-khan',
      name: 'स्वर्गीय डॉ. क्यू. एच. खान',
      degrees: ['बी.एच.एम.एस. (बी.यू.)', 'आर.बी.एस.एम.एच.सी.'],
      registrationNumber: 'पंजीकरण संख्या 33454',
      specialization: 'मल्टी-स्पेशलिस्ट एवं जनरल फिजिशियन',
      designation: 'संस्थापक (स्मृति में)',
      bio: 'गया में क्लासिकल होम्योपैथी के अग्रदूत जिन्होंने 1958 में इस क्लिनिक की स्थापना की। समाज सेवा के प्रति उनका समर्पण हमारे क्लिनिक की आधारशिला है।',
      image: '/images/dr-qh-khan.png',
      isDeceased: true,
    },
    {
      slug: 'dr-i-khan',
      name: 'डॉ. आई. खान',
      degrees: ['बी.एच.एम.एस. (बी.यू.)', 'आर.बी.एस.एम.एच.सी.'],
      registrationNumber: 'पंजीकरण संख्या 33454',
      specialization: 'जनरल फिजिशियन, क्रोनिक एवं गंभीर रोग विशेषज्ञ',
      designation: 'प्रबंध निदेशक एवं जनरल फिजिशियन',
      bio: 'क्लासिकल होम्योपैथी में व्यापक अनुभव के साथ प्रबंध निदेशक एवं जनरल फिजिशियन, जो क्रोनिक बीमारियों, गंभीर दीर्घकालिक बीमारियों, त्वचा विकारों, विटिलिगो और व्यक्तिगत संवैधानिक शिकायतों में विशेषज्ञ हैं।',
      image: '/images/dr-i-khan.png',
    },
    {
      slug: 'dr-adeeba-farheen',
      name: 'डॉ. अदीबा फरहीन',
      degrees: ['बी.एच.एम.एस. (बी.यू.)', 'एम.डी. (फिजिशियन)', 'जी.डी.एम.सी., कटिहार, पटना'],
      registrationNumber: 'पंजीकरण संख्या 31319',
      specialization: 'जनरल फिजिशियन, महिला रोग (PCOD, ब्रेस्ट लम्प्स) एवं नॉर्मल डिलीवरी केयर',
      designation: 'परामर्शदाता फिजिशियन एवं महिला स्वास्थ्य विशेषज्ञ',
      bio: 'PCOD/PCOS, ब्रेस्ट ट्यूमर/लम्प्स, महिला स्वास्थ्य विकारों, सामान्य प्रसव परामर्श और सामान्य चिकित्सा स्थितियों में अनुभवी जनरल फिजिशियन एवं महिला स्वास्थ्य परामर्शदाता।',
      image: '/images/dr-adeeba-farheen.png',
    },
  ];

  const fallbackDoctors = lang === 'hi' ? doctorsListHi : doctorsListEn;
  const doctorsList = dynamicDoctors || fallbackDoctors;

  const filteredVideos = videos.filter((v: any) => {
    if (videoFilter === 'all') return true;
    return v.category === videoFilter;
  });

  return (
    <div className="min-h-screen bg-[#FAF6F0] space-y-12 sm:space-y-16 pb-16">
      {/* 1. HERO BANNER */}
      <Hero />

      {/* 3. FOUNDER'S MEMORIAL & LEGACY TIMELINE */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF4ED] to-[#F5ECE2] text-[#1A0706] rounded-[36px] p-6 sm:p-10 lg:p-12 border border-[#E0D0C0] shadow-2xl relative overflow-hidden">
          
          {/* Subtle Royal Accent Lighting Orbs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#DD0200]/10 via-amber-400/15 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-amber-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 space-y-10">
            
            {/* Header Title Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-[#E6D8C8] pb-8">
              
              <div className="lg:col-span-8 space-y-5">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#55100D]/5 border border-[#55100D]/20 text-[#55100D] text-xs font-black uppercase tracking-wider shadow-xs">
                  <Award className="w-4 h-4 text-[#DD0200]" />
                  <span>
                    {lang === 'hi'
                      ? '31 दिसंबर 1934 – 3 जून • 1958 से मगध प्रमंडल की अटूट धरोहर'
                      : '31ST DEC 1934 – 3RD JUNE • 68+ YEARS OF HERITAGE & TRUST'}
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A0706] leading-tight tracking-tight">
                  {lang === 'hi' ? (
                    <>
                      हमारी ऐतिहासिक धरोहर:{' '}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#55100D] via-[#DD0200] to-[#B30000]">
                        स्वर्गीय डॉ. क्यू. एच. खान
                      </span>{' '}
                      का जीवन चरित्र एवं समाज सेवा
                    </>
                  ) : (
                    <>
                      Our Heritage:{' '}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#55100D] via-[#DD0200] to-[#B30000]">
                        Late Dr. Q.H. Khan’s
                      </span>{' '}
                      Life Biography & Legacy
                    </>
                  )}
                </h2>

                <p className="text-[#4A3533] text-xs sm:text-sm leading-relaxed font-semibold max-w-3xl">
                  {lang === 'hi'
                    ? '31 दिसंबर 1934 को ग्राम कालवाना, पोस्ट चेरकी (गया) में जन्मे स्वर्गीय डॉ. क्यू. एच. खान ने बचपन नाना जी के संरक्षण में बिताया तथा कोलकाता से होम्योपैथिक डॉक्टर की उपाधि अर्जित की। 1958 में नगमटिया रोड, गया में क्लिनिक की स्थापना के साथ उन्होंने अनाथ बच्चियों हेतु "The Gaya Muslim Girls Orphanage" एवं धर्मार्थ अस्पताल की शुरुआत की।'
                    : 'Born on 31st Dec 1934 in Kalwana, Cherki (Gaya), Late Dr. Q.H. Khan completed medical studies in Kolkata and established Dr. Q.H. Khan Clinic at Nagmatia Road in 1958. A visionary philanthropist who also founded The Gaya Muslim Girls Orphanage.'}
                </p>

                <div className="pt-2">
                  <Link
                    href="/doctors/dr-q-h-khan"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#55100D] via-[#7F120D] to-[#DD0200] hover:from-[#DD0200] hover:to-[#55100D] text-white text-xs font-black shadow-lg shadow-red-900/20 transition-all hover:scale-[1.02] active:scale-[0.98] tracking-wider uppercase"
                  >
                    <span>{lang === 'hi' ? 'संस्थापक की संपूर्ण जीवनी (BIOGRAPHY) पढ़ें' : 'READ FULL FOUNDER BIOGRAPHY'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Founder Portrait & Memorial Card */}
              <div className="lg:col-span-4 flex flex-col items-center justify-center">
                <div className="bg-white border border-[#E5D5C5] p-6 rounded-[28px] shadow-2xl text-center space-y-3.5 w-full max-w-sm relative overflow-hidden">
                  
                  {/* Decorative Gold Header Bar */}
                  <div className="h-1.5 bg-gradient-to-r from-[#55100D] via-amber-400 to-[#DD0200] absolute top-0 left-0 right-0" />

                  <div className="relative w-36 h-36 sm:w-44 sm:h-44 mx-auto rounded-2xl overflow-hidden border-2 border-amber-400/80 shadow-lg group mt-2">
                    <img
                      src="/images/dr-qh-khan.png"
                      alt="Late Dr. Q.H. Khan"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/dr-qh-khan.png';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <span className="absolute bottom-2 left-2 right-2 text-[9px] font-black uppercase tracking-wider bg-[#DD0200] text-white py-0.5 px-2 rounded-md shadow-xs">
                      31 DEC 1934 – 3 JUNE
                    </span>
                  </div>

                  <div>
                    <h3 className="font-black text-[#1A0706] text-lg sm:text-xl">
                      {lang === 'hi' ? 'स्वर्गीय डॉ. क्यू. एच. खान' : 'Late Dr. Q.H. Khan'}
                    </h3>
                    <p className="text-[#55100D] text-xs font-black mt-0.5">
                      {lang === 'hi' ? 'कोलकाता मेडिसिन • संस्थापक (1958)' : 'Kolkata Graduate • Founder (1958)'}
                    </p>
                    <p className="text-[#5A4543] text-[11px] font-semibold italic mt-3 bg-[#FAF3EC] p-3.5 rounded-2xl border border-[#E8DCD0] shadow-xs">
                      {lang === 'hi'
                        ? '"चिकित्सा केवल आजीविका नहीं, बल्कि पीड़ित मानवता एवं अनाथ बच्चों की निस्वार्थ सेवा है।"'
                        : '"Medical treatment is not a commercial enterprise; it is a sacred duty to relieve human suffering."'}
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* 4 Milestone Pillars */}
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-[#55100D] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#DD0200]" />
                <span>{lang === 'hi' ? 'ऐतिहासिक विकास यात्रा के 4 मुख्य स्तंभ' : '4 HISTORICAL MILESTONES OF OUR LEGACY'}</span>
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className="bg-white border border-[#EADED2] hover:border-[#DD0200]/40 p-5 rounded-2xl space-y-3 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5">
                  <div className="flex items-center justify-between">
                    <span className="w-9 h-9 rounded-xl bg-gradient-to-r from-[#55100D] to-[#DD0200] text-white font-black text-xs flex items-center justify-center shadow-xs">
                      1934
                    </span>
                    <span className="text-[10px] font-black text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200 uppercase tracking-wider">
                      {lang === 'hi' ? 'जन्म एवं शिक्षा' : 'BIRTH & STUDIES'}
                    </span>
                  </div>
                  <h4 className="font-black text-[#1A0706] text-sm">
                    {lang === 'hi' ? 'कालवाना (गया) से कोलकाता' : 'Kalwana to Kolkata'}
                  </h4>
                  <p className="text-[#5A4543] text-xs font-semibold leading-relaxed">
                    {lang === 'hi'
                      ? '31 दिसंबर 1934 को जन्म। कोलकाता से होम्योपैथिक डॉक्टर की उच्च शिक्षा हासिल की।'
                      : 'Born 31st Dec 1934. Earned Homoeopathic doctor degree from Kolkata.'}
                  </p>
                </div>

                <div className="bg-white border border-[#EADED2] hover:border-[#DD0200]/40 p-5 rounded-2xl space-y-3 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5">
                  <div className="flex items-center justify-between">
                    <span className="w-9 h-9 rounded-xl bg-gradient-to-r from-[#55100D] to-[#DD0200] text-white font-black text-xs flex items-center justify-center shadow-xs">
                      1958
                    </span>
                    <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200 uppercase tracking-wider">
                      {lang === 'hi' ? 'क्लिनिक स्थापना' : 'CLINIC EST.'}
                    </span>
                  </div>
                  <h4 className="font-black text-[#1A0706] text-sm">
                    {lang === 'hi' ? 'नगमटिया रोड क्लिनिक' : 'Nagmatia Road Clinic'}
                  </h4>
                  <p className="text-[#5A4543] text-xs font-semibold leading-relaxed">
                    {lang === 'hi'
                      ? 'गया में क्लासिकल होम्योपैथी एवं निशुल्क ग्रामीण चिकित्सा शिविरों की ऐतिहासिक शुरुआत।'
                      : 'Established the historic classical homoeopathy clinic at Nagmatia Road, Gaya.'}
                  </p>
                </div>

                <div className="bg-white border border-[#EADED2] hover:border-[#DD0200]/40 p-5 rounded-2xl space-y-3 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5">
                  <div className="flex items-center justify-between">
                    <span className="w-9 h-9 rounded-xl bg-gradient-to-r from-[#55100D] to-[#DD0200] text-white font-black text-xs flex items-center justify-center shadow-xs">
                      Orphan
                    </span>
                    <span className="text-[10px] font-black text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-md border border-sky-200 uppercase tracking-wider">
                      {lang === 'hi' ? 'समाज सुधार' : 'SOCIAL WELFARE'}
                    </span>
                  </div>
                  <h4 className="font-black text-[#1A0706] text-sm">
                    {lang === 'hi' ? 'Gaya Muslim Girls Orphanage' : 'Girls Orphanage Founder'}
                  </h4>
                  <p className="text-[#5A4543] text-xs font-semibold leading-relaxed">
                    {lang === 'hi'
                      ? 'अनाथ बच्चियों के आश्रय व शिक्षा हेतु कालवाना (चेरकी, गया) में अनाथालय की स्थापना।'
                      : 'Founded The Gaya Muslim Girls Orphanage at Kalwana (Cherki, Gaya).'}
                  </p>
                </div>

                <div className="bg-white border border-[#EADED2] hover:border-[#DD0200]/40 p-5 rounded-2xl space-y-3 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5">
                  <div className="flex items-center justify-between">
                    <span className="w-9 h-9 rounded-xl bg-gradient-to-r from-[#55100D] to-[#DD0200] text-white font-black text-xs flex items-center justify-center shadow-xs">
                      Today
                    </span>
                    <span className="text-[10px] font-black text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-200 uppercase tracking-wider">
                      {lang === 'hi' ? 'अमर धरोहर' : 'LIVING LEGACY'}
                    </span>
                  </div>
                  <h4 className="font-black text-[#1A0706] text-sm">
                    {lang === 'hi' ? 'डॉ. आई. खान (प्रबंध निदेशक)' : 'Dr. I. Khan (MD)'}
                  </h4>
                  <p className="text-[#5A4543] text-xs font-semibold leading-relaxed">
                    {lang === 'hi'
                      ? '70 वर्ष की आयु में 3 जून को दुर्घटना उपरांत निधन के बाद सुपुत्र डॉ. आई. खान द्वारा संस्था का सफल संचालन।'
                      : 'MD Dr. I. Khan continuing the legacy after his father’s tragic demise on 3rd June at age 70.'}
                  </p>
                </div>

              </div>
            </div>

            {/* Bottom Legacy Quote & MD Message Card */}
            <div className="bg-gradient-to-r from-[#55100D] via-[#75130F] to-[#DD0200] text-white border border-[#55100D]/30 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-xl">
              <div className="space-y-1">
                <span className="text-[10px] font-black text-amber-300 uppercase tracking-wider block">
                  {lang === 'hi' ? 'प्रबंध निदेशक का संकल्प संदेश' : 'MANAGING DIRECTOR’S LEGACY COMMITMENT'}
                </span>
                <p className="text-xs sm:text-sm text-slate-100 font-semibold italic">
                  {lang === 'hi'
                    ? '"हम अपने संस्थापक स्वर्गीय डॉ. क्यू. एच. खान द्वारा 1958 में स्थापित उच्च चिकित्सीय मूल्यों और समाज सेवा के संकल्प को आगे बढ़ाने के लिए पूरी तरह प्रतिबद्ध हैं।"'
                    : '"We remain strictly committed to upholding the clinical excellence and noble Samaj Seva vision established by our founder Late Dr. Q.H. Khan in 1958."'}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <strong className="block text-white font-black text-sm sm:text-base">Dr. I. Khan</strong>
                <span className="text-[11px] font-bold text-amber-300">
                  {lang === 'hi' ? 'प्रबंध निदेशक एवं जनरल फिजिशियन' : 'Managing Director & General Physician'}
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. ACTIVE CLINICAL SPECIALISTS */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="text-center space-y-2">
          <span className="text-xs font-black text-[#55100D] uppercase tracking-wider">
            {lang === 'hi' ? 'सक्रिय चिकित्सा टीम' : 'Active Clinical Team'}
          </span>
          <h2 className="text-3xl font-black text-[#1A0706] tracking-tight">
            {lang === 'hi' ? 'हमारे अनुभवी विशेषज्ञों से परामर्श लें' : 'Consult Our Experienced Specialists'}
          </h2>
          <p className="text-xs text-slate-600 font-semibold max-w-xl mx-auto">
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

      {/* CONSTITUTIONAL CARE PROCESS */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="text-center space-y-2">
          <span className="text-xs font-black text-[#55100D] uppercase tracking-wider">
            {lang === 'hi' ? 'हमारी उपचार प्रक्रिया' : 'Our Clinical Method'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1A0706] tracking-tight">
            {lang === 'hi' ? 'संवैधानिक होम्योपैथिक उपचार मार्ग' : 'Constitutional Care Consultation Process'}
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm max-w-2xl mx-auto font-semibold">
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
            <div key={idx} className="bg-white border border-[#D9D9D9] rounded-2xl p-5 hover:border-[#55100D]/50 hover:shadow-md transition-all duration-300 relative">
              <span className="absolute -top-3 right-5 text-4xl font-black text-slate-200 select-none">{item.step}</span>
              <h3 className="font-extrabold text-[#1A0706] text-sm mt-2">{lang === 'hi' ? item.titleHi : item.titleEn}</h3>
              <p className="text-slate-650 mt-2 leading-relaxed text-[11px] font-semibold">{lang === 'hi' ? item.descHi : item.descEn}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. COMMUNITY CAMPS & FREE SHIVIR GALLERY */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="bg-gradient-to-br from-[#FFFDF9] via-white to-[#FAF3EC] border border-[#E8DCD0] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#E6D8C8] pb-6">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#55100D]/5 border border-[#55100D]/20 text-[#55100D] text-xs font-black uppercase tracking-wider">
                <HeartPulse className="w-3.5 h-3.5 text-[#DD0200]" />
                <span>{lang === 'hi' ? 'निःशुल्क चिकित्सा शिविर एवं समाज सेवा (FREE SHIVIR DRIVES)' : 'FREE MEDICINE SHIVIR & COMMUNITY OUTREACH'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1A0706] tracking-tight">
                {lang === 'hi' ? 'निःशुल्क चिकित्सा शिविर आयोजन एवं स्थल सूची' : 'Free Homeopathic Shivir & Location Register'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-semibold max-w-3xl">
                {lang === 'hi'
                  ? 'गया, करमौनी, चेरकी एवं ग्रामीण बिहार के जरूरतमंद परिवारों हेतु निःशुल्क होमियोपैथिक चिकित्सा परामर्श, त्वचा जांच एवं मुफ़्त दवा वितरण ड्राइव।'
                  : 'Free medical consultation, skin diagnostics, and medicine distribution drives serving patients across Karmauni, Gaya, Cherki, and rural Bihar.'}
              </p>
            </div>

            {/* Shivir Quick Contact */}
            <a
              href="https://wa.me/919135404090?text=Hello%20Doctor%20I%20want%20information%20about%20upcoming%20free%20medical%20camps%20(Shivir)"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-extrabold text-xs shadow-md transition-all shrink-0 uppercase tracking-wider"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{lang === 'hi' ? 'आगामी शिविर की जानकारी लें' : 'Inquire Upcoming Shivir'}</span>
            </a>
          </div>

          {/* Location Summary Badges Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-bold text-[#1A0706]">
            <div className="bg-white border border-[#E5D5C5] p-3 rounded-xl flex items-center gap-2.5 shadow-2xs">
              <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 shrink-0 font-black">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-extrabold">{lang === 'hi' ? 'मुख्य शिविर स्थल' : 'Primary Location'}</p>
                <p className="font-black text-[#55100D] text-xs">Karmauni, Gaya</p>
              </div>
            </div>

            <div className="bg-white border border-[#E5D5C5] p-3 rounded-xl flex items-center gap-2.5 shadow-2xs">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0 font-black">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-extrabold">{lang === 'hi' ? 'मुफ़्त औषधियाँ' : 'Free Medicines'}</p>
                <p className="font-black text-emerald-800 text-xs">100% Free Remedies</p>
              </div>
            </div>

            <div className="bg-white border border-[#E5D5C5] p-3 rounded-xl flex items-center gap-2.5 shadow-2xs">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shrink-0 font-black">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-extrabold">{lang === 'hi' ? 'नियमित आयोजन' : 'Frequency'}</p>
                <p className="font-black text-indigo-900 text-xs">Monthly Outreach</p>
              </div>
            </div>

            <div className="bg-white border border-[#E5D5C5] p-3 rounded-xl flex items-center gap-2.5 shadow-2xs">
              <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0 font-black">
                <Tag className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-extrabold">{lang === 'hi' ? 'विशेष परामर्श' : 'Specialization'}</p>
                <p className="font-black text-amber-900 text-xs">Skin & General Care</p>
              </div>
            </div>
          </div>

        </div>

        {/* Camp Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {camps.length === 0 ? (
            <div className="col-span-2 p-12 text-center bg-white border border-[#D9D9D9] rounded-3xl text-xs text-slate-500 font-bold space-y-2">
              <HeartPulse className="w-8 h-8 text-[#DD0200] mx-auto" />
              <p className="text-sm font-black text-[#1A0706]">
                {lang === 'hi' ? 'वर्तमान में कोई नया शिविर दर्ज नहीं है।' : 'No medical camps recorded in directory yet.'}
              </p>
              <p className="text-xs text-slate-400">
                {lang === 'hi' ? 'कृपया एडमिन कंट्रोल पैनल से नए निःशुल्क शिविर की प्रविष्टि जोड़ें।' : 'Add new Shivir records from the Admin Panel to display here.'}
              </p>
            </div>
          ) : (
            camps.map((camp) => (
              <div
                key={camp._id}
                className="bg-white border border-[#E2D5C7] hover:border-[#55100D]/50 rounded-[32px] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 flex flex-col justify-between group relative"
              >
                
                {/* Top Image Container with Badges */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-950">
                  <img
                    src={getFullImageUrl(camp.imageUrl)}
                    alt={camp.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                  {/* Location Pin Badge Over Image (Top Left) */}
                  <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md border border-amber-400/40 text-amber-300 text-xs font-black px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg shadow-black/40">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{camp.location}</span>
                  </div>

                  {/* Date Badge Over Image (Top Right) */}
                  <div className="absolute top-4 right-4 bg-[#DD0200] text-white text-xs font-black px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg shadow-red-900/40">
                    <Calendar className="w-3.5 h-3.5 shrink-0" />
                    <span>{camp.date}</span>
                  </div>

                  {/* Title Overlay over Image Bottom */}
                  <div className="absolute bottom-4 left-4 right-4 text-white space-y-1.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 bg-[#55100D]/90 px-2.5 py-0.5 rounded-md border border-amber-400/30 inline-block backdrop-blur-xs">
                      {lang === 'hi' ? 'निःशुल्क दवा एवं जांच शिविर' : 'FREE MEDICAL SHIVIR'}
                    </span>
                    <h3 className="font-black text-lg sm:text-xl leading-snug drop-shadow-md text-white">
                      {camp.title}
                    </h3>
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    
                    {/* Location Highlight Box */}
                    <div className="bg-[#FAF3EC] border border-[#EADBCC] p-3.5 rounded-2xl flex items-center gap-2.5 text-xs font-bold text-[#55100D] shadow-xs">
                      <MapPin className="w-4 h-4 text-[#DD0200] shrink-0" />
                      <span>
                        <strong className="text-[#1A0706]">{lang === 'hi' ? 'शिविर स्थल:' : 'Camp Venue Location:'}</strong> {camp.location}
                      </span>
                    </div>

                    <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-semibold">
                      {camp.description}
                    </p>
                  </div>

                  {/* Footer Highlights & Action */}
                  <div className="pt-4 border-t border-slate-100 flex flex-wrap justify-between items-center gap-3 text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-700 font-extrabold">
                      <ThumbsUp className="w-4 h-4 text-emerald-600" />
                      <span>{lang === 'hi' ? '100% निःशुल्क परामर्श एवं होमियोपैथिक दवा वितरण' : 'Free Consultations & Medicines Delivered'}</span>
                    </div>

                    <a
                      href={`https://wa.me/919135404090?text=I%20want%20information%20about%20medical%20camp%20at%20${encodeURIComponent(camp.location)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 bg-gradient-to-r from-[#55100D] via-[#7A130F] to-[#DD0200] hover:from-[#DD0200] hover:to-[#55100D] text-white font-black text-xs rounded-full shadow-lg shadow-red-900/20 hover:shadow-xl transition-all flex items-center gap-1.5 uppercase tracking-wider hover:scale-105 active:scale-95"
                    >
                      <span>{lang === 'hi' ? 'शिविर पूछताछ करें' : 'CAMP INQUIRY'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>

                </div>

              </div>
            ))
          )}
        </div>
      </section>

      {/* 6. CONSULTATION SPECIALTIES (TREATMENTS FOR MEN, WOMEN & CHILDREN) */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-slate-200 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-black text-[#55100D] uppercase tracking-wider">
              {lang === 'hi' ? 'विशेषज्ञ परामर्श क्षेत्र (पुरुष, महिला एवं बाल रोग)' : 'SPECIALIZED CLINICAL CONSULTATIONS'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1A0706] tracking-tight">
              {lang === 'hi'
                ? 'पुरुष, महिला और बच्चों के स्वास्थ्य एवं क्रोनिक रोग परामर्श'
                : 'Healthcare Consultations for Men, Women & Children'}
            </h2>
            <p className="text-xs text-slate-600 font-semibold max-w-2xl">
              {lang === 'hi'
                ? 'पुरुष स्वास्थ्य (प्रोस्टेट, हाइड्रोसील, बांझपन), महिला स्वास्थ्य (गर्भाशय, पीसीओडी, फाइब्रॉइड) और बच्चों के रोगों (टॉन्सिल, एडेनोइड्स, बिस्तर गीला करना) का संपूर्ण संवैधानिक उपचार।'
                : 'Specialized homeopathic care tailored for Men\'s Health (Prostate, Hydrocele, Infertility), Women\'s Health (Uterine, PCOD, Fibroids), and Pediatric Care (Adenoids, Tonsils, Bed-wetting).'}
            </p>
          </div>
          <Link
            href="/treatments"
            className="text-xs font-black text-[#55100D] hover:text-[#DD0200] inline-flex items-center gap-1 uppercase tracking-wider shrink-0"
          >
            <span>{lang === 'hi' ? 'सभी रोग एवं उपचार देखें' : 'View All Conditions'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Gender / Age Group Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: 'all', labelEn: 'All Consultations', labelHi: 'सभी परामर्श' },
            { id: 'Male', labelEn: 'Male Health (पुरुष रोग)', labelHi: 'पुरुष स्वास्थ्य एवं रोग' },
            { id: 'Female', labelEn: 'Women\'s Health (महिला रोग)', labelHi: 'महिला स्वास्थ्य एवं रोग' },
            { id: 'Children', labelEn: 'Pediatric Care (बाल रोग)', labelHi: 'बाल रोग (Children Care)' },
            { id: 'Mental', labelEn: 'Brain & Mental Health (मानसिक रोग)', labelHi: 'मानसिक एवं मस्तिष्क रोग' },
            { id: 'General', labelEn: 'Skin & General (त्वचा रोग)', labelHi: 'त्वचा एवं सामान्य रोग' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTargetGroup(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all border ${
                activeTargetGroup === tab.id
                  ? 'bg-[#55100D] text-white border-[#55100D] shadow-md'
                  : 'bg-white text-slate-700 border-[#D9D9D9] hover:bg-slate-50'
              }`}
            >
              {lang === 'hi' ? tab.labelHi : tab.labelEn}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {displayTreatments.map((t, idx) => (
            <TreatmentCard key={idx} treatment={t} />
          ))}
        </div>
      </section>

      {/* 7. FAQ ACCORDION SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
        <div className="text-center space-y-2">
          <span className="text-xs font-black text-[#55100D] uppercase tracking-wider">
            {lang === 'hi' ? 'सहायक जानकारी' : 'HELPFUL KNOWLEDGE'}
          </span>
          <h2 className="text-3xl font-black text-[#1A0706] tracking-tight">
            {lang === 'hi' ? 'अक्सर पूछे जाने वाले प्रश्न' : 'Frequently Asked Questions'}
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="bg-white border border-[#D9D9D9] rounded-2xl overflow-hidden transition-all shadow-sm">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex justify-between items-center gap-4 hover:bg-slate-50/50 transition-colors"
                >
                  <span className="font-extrabold text-[#1A0706] text-sm sm:text-base">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-250 ${isOpen ? 'rotate-180 text-[#55100D]' : ''}`} />
                </button>
                {isOpen && (
                  <div className="p-4 bg-slate-50 border-t border-slate-100 text-slate-600 text-xs sm:text-sm leading-relaxed font-semibold">
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
          <span className="text-xs font-black text-[#55100D] uppercase tracking-wider">
            {lang === 'hi' ? 'मरीजों की राय' : 'PATIENT VERDICTS'}
          </span>
          <h2 className="text-3xl font-black text-[#1A0706] tracking-tight">
            {lang === 'hi' ? 'हमारे मरीजों के अनुभव' : 'What Our Patients Say'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {feedback.length === 0 ? (
            <div className="col-span-3 p-8 text-center bg-white border border-[#D9D9D9] rounded-2xl text-xs text-slate-500 font-bold">
              {lang === 'hi' ? 'प्रदर्शित करने के लिए अभी कोई स्वीकृत फीडबैक नहीं है।' : 'No approved feedbacks to display.'}
            </div>
          ) : (
            feedback.map((fb, idx) => {
              const getInitial = (name: string) => {
                if (!name) return 'P';
                return name.trim().charAt(0).toUpperCase();
              };

              const gradients = [
                'from-[#55100D] via-[#7A1814] to-[#DD0200]',
                'from-[#1F0270] via-[#2A0596] to-[#1F0270]',
                'from-[#0F5132] via-[#157347] to-[#198754]',
                'from-[#78350F] via-[#9A3412] to-[#C2410C]',
              ];
              const bgGradient = gradients[idx % gradients.length];
              const initialLetter = getInitial(fb.patientName);

              return (
                <div
                  key={fb._id}
                  className="text-sm border border-[#D9D9D9] pb-6 rounded-2xl bg-white shadow-[0px_4px_15px_0px] shadow-black/5 overflow-hidden flex flex-col justify-between space-y-4 hover:border-[#55100D]/40 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-4 px-5 py-4 bg-[#55100D]/5 border-b border-[#55100D]/10">
                    <div className="relative shrink-0">
                      <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${bgGradient} text-white flex items-center justify-center font-black text-lg shadow-md border-2 border-white`}>
                        {initialLetter}
                      </div>
                      <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                      </div>
                    </div>
                    <div>
                      <h1 className="text-sm font-black text-[#1A0706] leading-none">{fb.patientName}</h1>
                      <p className="text-[10px] text-[#55100D] font-black uppercase tracking-wider mt-1.5 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 inline shrink-0" />
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
                    <p className="text-slate-600 text-xs mt-3 leading-relaxed font-semibold italic">"{fb.message}"</p>
                  </div>

                  <a href="#review-form" className="text-[#55100D] hover:text-[#DD0200] text-[11px] font-black hover:underline px-5 mt-auto uppercase tracking-wider">
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
            <span className="text-xs font-black text-[#55100D] uppercase tracking-wider">
              {lang === 'hi' ? 'वीडियो डायरी और हाइलाइट्स' : 'VIDEO DIARIES & HIGHLIGHTS'}
            </span>
            <h2 className="text-2xl font-black text-[#1A0706] tracking-tight">
              {lang === 'hi' ? 'यूट्यूब वीडियो गैलरी' : 'YouTube Video Gallery'}
            </h2>
          </div>
          
          <div className="flex gap-2 bg-slate-50 border border-[#D9D9D9] p-1 rounded-xl text-[10px] font-bold">
            <button
              onClick={() => setVideoFilter('all')}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${videoFilter === 'all' ? 'bg-white text-[#55100D] border border-[#D9D9D9] shadow-sm font-black' : 'text-slate-650 hover:text-[#1A0706] font-bold'}`}
            >
              {lang === 'hi' ? 'सभी वीडियो' : 'All Videos'}
            </button>
            <button
              onClick={() => setVideoFilter('testimonial')}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${videoFilter === 'testimonial' ? 'bg-white text-[#55100D] border border-[#D9D9D9] shadow-sm font-black' : 'text-slate-650 hover:text-[#1A0706] font-bold'}`}
            >
              {lang === 'hi' ? 'मरीजों के अनुभव' : 'Testimonials'}
            </button>
            <button
              onClick={() => setVideoFilter('camp')}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${videoFilter === 'camp' ? 'bg-white text-[#55100D] border border-[#D9D9D9] shadow-sm font-black' : 'text-slate-650 hover:text-[#1A0706] font-bold'}`}
            >
              {lang === 'hi' ? 'चिकित्सा शिविर' : 'Camps'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredVideos.length === 0 ? (
            <div className="col-span-2 p-8 text-center bg-white border border-[#D9D9D9] rounded-2xl text-xs text-slate-500 font-bold">
              {lang === 'hi' ? 'कोई वीडियो इस फ़िल्टर से मेल नहीं खाता है।' : 'No videos match the current filter.'}
            </div>
          ) : (
            filteredVideos.map((v) => {
              const embedUrl = getYoutubeEmbedUrl(v.youtubeUrl);
              return (
                <div key={v._id} className="bg-white border border-[#D9D9D9] rounded-3xl overflow-hidden shadow-md flex flex-col justify-between hover:border-[#55100D]/40 transition-all duration-300 hover:shadow-lg">
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
                        <Play className="w-8 h-8 text-rose-650 mb-2 animate-bounce" />
                        <span>{lang === 'hi' ? 'अमान्य यूट्यूब लिंक' : 'Invalid YouTube Link'}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-5 space-y-2">
                    <span className="inline-flex items-center gap-1 text-[10px] font-black text-[#55100D] uppercase bg-[#55100D]/5 border border-[#55100D]/10 px-2.5 py-1 rounded-lg">
                      {v.category === 'testimonial' 
                        ? (lang === 'hi' ? 'मरीज की समीक्षा' : 'Patient Review') 
                        : (lang === 'hi' ? 'शिविर की मुख्य झलकियां' : 'Camp Highlights')}
                    </span>
                    <h3 className="font-extrabold text-[#1A0706] text-sm leading-snug">{v.title}</h3>
                    {v.description && <p className="text-slate-600 text-xs leading-relaxed font-semibold">{v.description}</p>}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* 10. WRITE A REVIEW / SUBMIT FEEDBACK FORM */}
      <section id="review-form" className="max-w-xl mx-auto px-4 sm:px-6 scroll-mt-24">
        <div className="bg-white border border-[#E2D5C7] rounded-[32px] p-8 sm:p-10 shadow-2xl space-y-6 backdrop-blur-xl relative overflow-hidden">
          <div className="text-center space-y-1.5">
            <h3 className="text-2xl sm:text-3xl font-black text-[#1A0706] tracking-tight">
              {lang === 'hi' ? 'अपना अनुभव साझा करें' : 'Share Your Experience'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-semibold leading-relaxed max-w-md mx-auto">
              {lang === 'hi'
                ? 'आपका फीडबैक गुणवत्तापूर्ण होम्योपैथिक उपचार की तलाश कर रहे हजारों लोगों की मदद करता है।'
                : 'Your feedback helps thousands of people seeking quality homoeopathic healing.'}
            </p>
          </div>

          {formSuccess ? (
            <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs text-center space-y-2 font-bold shadow-sm">
              <span className="font-black block text-sm">
                {lang === 'hi' ? 'समीक्षा सफलतापूर्वक सबमिट की गई!' : 'Review Submitted Successfully!'}
              </span>
              <p>
                {lang === 'hi'
                  ? 'धन्यवाद! मॉडरेटर की मंजूरी के बाद आपका फीडबैक प्रदर्शित किया जाएगा।'
                  : 'Thank you! Your feedback will be displayed after moderator approval.'}
              </p>
              <button
                onClick={() => setFormSuccess(false)}
                className="mt-2 text-[#55100D] font-black hover:underline"
              >
                {lang === 'hi' ? 'एक और फीडबैक सबमिट करें' : 'Submit another feedback'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleReviewSubmit} className="space-y-5 text-xs">
              {formError && (
                <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-bold">
                  {lang === 'hi' ? 'कृपया थोड़ा लंबा फीडबैक संदेश दर्ज करें।' : formError}
                </div>
              )}
              
              <div>
                <label className="block text-[10px] sm:text-[11px] uppercase font-black tracking-wider text-[#1A0706] mb-1.5">
                  {lang === 'hi' ? 'आपका पूरा नाम' : 'YOUR FULL NAME'}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Kumar"
                  value={reviewForm.patientName}
                  onChange={(e) => setReviewForm({ ...reviewForm, patientName: e.target.value })}
                  className="w-full p-4 bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#DD0200] focus:bg-white rounded-2xl text-[#1A0706] placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-[#DD0200]/10 transition-all font-bold text-xs sm:text-sm shadow-inner"
                />
              </div>

              <div>
                <label className="block text-[10px] sm:text-[11px] uppercase font-black tracking-wider text-[#1A0706] mb-1.5">
                  {lang === 'hi' ? 'रेटिंग (स्टार)' : 'RATING'}
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((stars) => (
                    <button
                      key={stars}
                      type="button"
                      onClick={() => setReviewForm({ ...reviewForm, rating: stars })}
                      className="focus:outline-none transition-transform hover:scale-125 active:scale-95"
                    >
                      <Star className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${reviewForm.rating >= stars ? 'fill-amber-400 text-amber-400 drop-shadow-sm' : 'text-slate-300 hover:text-amber-300'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] sm:text-[11px] uppercase font-black tracking-wider text-[#1A0706] mb-1.5">
                  {lang === 'hi' ? 'फीडबैक संदेश' : 'FEEDBACK MESSAGE'}
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder={
                    lang === 'hi'
                      ? 'अपनी रिकवरी यात्रा या क्लिनिक परामर्श का अनुभव लिखें...'
                      : 'Write your recovery journey or consultation experience...'
                  }
                  value={reviewForm.message}
                  onChange={(e) => setReviewForm({ ...reviewForm, message: e.target.value })}
                  className="w-full p-4 bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#DD0200] focus:bg-white rounded-2xl text-[#1A0706] placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-[#DD0200]/10 transition-all font-bold text-xs sm:text-sm shadow-inner min-h-[110px] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-[#55100D] via-[#85140F] to-[#DD0200] hover:from-[#DD0200] hover:to-[#55100D] text-white font-black text-xs sm:text-sm rounded-2xl shadow-xl shadow-red-900/30 transition-all uppercase tracking-wider flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting 
                  ? (lang === 'hi' ? 'समीक्षा सबमिट की जा रही है...' : 'SUBMITTING REVIEW...') 
                  : (lang === 'hi' ? 'फीडबैक सबमिट करें' : 'SUBMIT REVIEW')}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* 11. HELPLINES & INSTANT CHAT WIDGET */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-r from-[#55100D] via-[#1A0706] to-[#131314] text-white rounded-3xl p-8 shadow-2xl flex flex-col lg:flex-row justify-between items-center gap-6 overflow-hidden border border-white/5">
          <div className="absolute inset-0 futuristic-grid opacity-[0.03] pointer-events-none" />
          
          <div className="space-y-3 text-center lg:text-left relative z-10">
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
          
          <div className="flex flex-wrap items-center justify-center gap-3 relative z-10 text-xs font-black uppercase">
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
            <span className="text-xs font-black text-[#55100D] uppercase tracking-wider">
              {lang === 'hi' ? 'स्वास्थ्य मार्गदर्शन' : 'HEALTH GUIDANCE'}
            </span>
            <h2 className="text-2xl font-black text-[#1A0706] tracking-tight">
              {lang === 'hi' ? 'नवीनतम शैक्षिक संसाधन' : 'Latest Educational Resources'}
            </h2>
          </div>
          <Link
            href="/blogs"
            className="text-xs font-black text-[#55100D] hover:text-[#DD0200] inline-flex items-center gap-1 uppercase tracking-wider"
          >
            <span>{lang === 'hi' ? 'सभी स्वास्थ्य लेख देखें' : 'View All Health Articles'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 border border-[#D9D9D9] rounded-3xl shadow-md flex gap-4 hover:border-[#55100D]/40 transition-all duration-300 hover:shadow-lg">
            <div className="w-12 h-12 bg-[#55100D]/5 text-[#55100D] border border-[#55100D]/10 rounded-2xl flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1 text-[10px] font-black text-[#55100D] uppercase bg-[#55100D]/5 border border-[#55100D]/10 px-2.5 py-0.5 rounded">
                {lang === 'hi' ? 'विटिलिगो एवं त्वचा' : 'Vitiligo & Skin'}
              </span>
              <h3 className="font-black text-[#1A0706] text-sm sm:text-base hover:text-[#DD0200] cursor-pointer transition-colors leading-snug">
                {lang === 'hi' ? 'ल्यूकोडर्मा (सफेद दाग) के डीपिगमेंटेशन चक्र को समझना' : 'Understanding Leucoderma Depigmentation Cycles'}
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed line-clamp-2 font-semibold">
                {lang === 'hi'
                  ? 'मेलानोसाइट पुनर्सक्रियन, आहार संबंधी सिफारिशों और संवैधानिक नुस्खे कैसे उपचार में सहायता करते हैं, इसका एक शैक्षिक अवलोकन।'
                  : 'An educational overview detailing melanocyte reactivation, diet recommendations, and how classical constitutional prescriptions support healing.'}
              </p>
            </div>
          </div>
          <div className="bg-white p-6 border border-[#D9D9D9] rounded-3xl shadow-md flex gap-4 hover:border-[#55100D]/40 transition-all duration-300 hover:shadow-lg">
            <div className="w-12 h-12 bg-[#DD0200]/5 text-[#DD0200] border border-[#DD0200]/10 rounded-2xl flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1 text-[10px] font-black text-[#DD0200] uppercase bg-[#DD0200]/5 border border-[#DD0200]/10 px-2.5 py-0.5 rounded">
                {lang === 'hi' ? 'सामान्य स्वास्थ्य' : 'General Health'}
              </span>
              <h3 className="font-black text-[#1A0706] text-sm sm:text-base hover:text-[#DD0200] cursor-pointer transition-colors leading-snug">
                {lang === 'hi' ? 'संवैधानिक चिकित्सा बनाम सामान्य जेनेरिक उपचार' : 'Constitutional Remedies vs. Generic Treatment'}
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed line-clamp-2 font-semibold">
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
        <div className="bg-gradient-to-br from-[#131314] via-[#1A0706] to-[#55100D] text-white rounded-3xl p-6 sm:p-8 border border-white/5 shadow-2xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-3 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DD0200]/15 text-[#DD0200] border border-[#DD0200]/20 text-[10px] font-black uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-[#DD0200]" />
              {lang === 'hi' ? 'चिकित्सीय शुचिता और सुरक्षा शपथ' : 'Clinical Integrity & Safety Pledge'}
            </span>
            <h3 className="text-xl font-black text-white tracking-tight">
              {lang === 'hi' ? 'जिम्मेदार स्वास्थ्य सेवाएं and नैतिक चिकित्सा' : 'Responsible Patient Care & Transparent Treatment'}
            </h3>
            <p className="text-slate-300 text-xs leading-relaxed font-semibold">
              {lang === 'hi'
                ? 'हम चमत्कारी इलाज या १००% त्वरित समाधान का झूठा दावा नहीं करते हैं। हमारी सभी परामर्श प्रक्रियाएं पूरी गोपनीयता के साथ योग्य और पंजीकृत (B.H.M.S.) डॉक्टरों द्वारा संचालित की जाती हैं। गंभीर सर्जिकल या तीव्र आपातकालीन स्थितियों के लिए हम तुरंत उच्चतर अस्पतालों में रेफर करने की सलाह देते हैं।'
                : 'At Dr. Q.H. Khan Clinic, we follow professional medical guidelines. We do not provide false guarantees or unrealistic cure claims. All consultations are handled with complete confidentiality by qualified, registered physicians. Acute, severe, or surgical emergencies are immediately directed to specialized hospital emergency facilities.'}
            </p>
          </div>
        </div>
      </section>

      {/* 13. ADDRESS & GOOGLE MAP DIRECTIONS */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-8 border border-[#D9D9D9] shadow-md">
          <div className="md:col-span-5 space-y-4">
            <span className="text-xs font-black uppercase tracking-wider text-[#55100D] bg-[#55100D]/5 px-3 py-1 rounded-full border border-[#55100D]/10">
              {lang === 'hi' ? 'हमारे गया क्लिनिक पर आएं' : 'VISIT OUR GAYA CLINIC'}
            </span>
            <h2 className="text-2xl font-black text-[#1A0706] tracking-tight">
              {lang === 'hi' ? 'स्थान और दिशा-निर्देश' : 'Location & Directions'}
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-semibold">
              {lang === 'hi'
                ? 'हमारा क्लिनिक नगमटिया रोड, गया, Bihar में स्थित है। गया जंक्शन रेलवे स्टेशन से सुरक्षित और सुगम पहुंच (लगभग 1.5 किमी की दूरी)।'
                : 'Our clinical facility is situated at Nagmatia Road, Gaya, Bihar, India. Safe accessibility from Gaya Junction Railway Station (approximately 1.5 km distance).'}
            </p>
            <div className="p-4 bg-slate-50 rounded-xl space-y-2 border border-[#D9D9D9]/40 text-xs text-slate-750 font-semibold">
              <p className="font-black flex items-center gap-1.5 text-[#1A0706]">
                <MapPin className="w-4 h-4 text-[#DD0200]" /> {lang === 'hi' ? 'पूरा पता:' : 'Full Address:'}
              </p>
              <p>
                {lang === 'hi'
                  ? 'डॉ. क्यू. एच. खान क्लिनिक, नगमटिया रोड, गया जंक्शन रेलवे स्टेशन के पास, गया - 823001, बिहार, भारत'
                  : 'Dr. Q.H. Khan Clinic, Nagmatia Road, Near Gaya Junction Railway Station, Gaya - 823001, Bihar, India'}
              </p>
            </div>
          </div>

          <div className="md:col-span-7 bg-slate-50 border border-[#D9D9D9] rounded-2xl p-4 flex flex-col justify-between items-center text-center space-y-4 relative min-h-[220px]">
            <Map className="w-12 h-12 text-[#55100D]/40 animate-pulse mt-4" />
            <div className="space-y-1">
              <h4 className="font-black text-[#1A0706] text-sm">
                {lang === 'hi' ? 'इंटरैक्टिव मार्ग दर्शन' : 'Interactive Navigation Route'}
              </h4>
              <p className="text-slate-500 text-xs font-bold max-w-sm">
                {lang === 'hi'
                  ? 'रेलवे स्टेशन, बस स्टैंड या स्थानीय स्थलों से मार्ग दिशा-निर्देशों के लिए गूगल मैप्स का उपयोग करें।'
                  : 'Use Google Maps for route directions from railway station, bus stands, or local landmarks.'}
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=Dr.+Q.H.+Khan+Clinic,+Nagmatia+Road,+Gaya,+Bihar"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#55100D] to-[#DD0200] hover:from-[#DD0200] hover:to-[#55100D] text-white font-black text-xs rounded-xl shadow-md transition-all uppercase tracking-wider"
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
