'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { apiClient, getApiBaseUrl } from '../lib/api-client';
import { Megaphone, X, Calendar, Clock, MapPin, UserCheck, PhoneCall, ArrowRight, Sparkles, HeartHandshake } from 'lucide-react';

interface Camp {
  _id: string;
  title: string;
  date: string;
  timing?: string;
  location: string;
  doctor: string;
  description: string;
  imageUrl?: string;
  posterImage?: string;
  helplinePhone?: string;
  isUpcomingPopup?: boolean;
}

const DEFAULT_CAMP: Camp = {
  _id: 'default-shivir-popup',
  title: 'निःशुल्क होमियोपैथिक चिकित्सा एवं दवा वितरण शिविर',
  date: '16 August 2026',
  timing: '9:00 AM - 5:00 PM',
  location: 'Gahlour Ghat, Gaya, Bihar',
  doctor: 'Dr. I. Khan',
  description: 'निःशुल्क चिकित्सा परामर्श एवं स्वास्थ्य जांच शिविर। अनुभवी चिकित्सक द्वारा मरीजों की जांच एवं स्वास्थ्य संबंधी परामर्श दिया जाएगा। जरूरतमंद एवं पात्र मरीजों को निःशुल्क होमियोपैथिक दवाएं उपलब्ध कराई जाएंगी। सभी जरूरतमंद लोग शिविर में आकर स्वास्थ्य परामर्श एवं निःशुल्क दवा का लाभ उठा सकते हैं।',
  imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
  helplinePhone: '9135404090',
  isUpcomingPopup: true,
};

export const UpcomingShivirPopup: React.FC = () => {
  const [camp, setCamp] = useState<Camp | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const getFullImageUrl = (path?: string) => {
    if (!path) return '';
    let trimmed = path.trim();
    if (trimmed.includes('localhost:5000') || trimmed.includes('127.0.0.1:5000')) {
      const apiBase = getApiBaseUrl();
      const backendOrigin = apiBase.replace(/\/api\/?$/, '');
      trimmed = trimmed.replace(/http:\/\/(localhost|127\.0\.0\.1):5000/g, backendOrigin);
    }
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('data:')) {
      return trimmed;
    }
    const apiBase = getApiBaseUrl();
    const backendOrigin = apiBase.replace(/\/api\/?$/, '');
    return `${backendOrigin}${trimmed.startsWith('/') ? trimmed : `/${trimmed}`}`;
  };

  useEffect(() => {
    async function fetchUpcomingPopup() {
      try {
        const res = await apiClient<Camp>('/camps/upcoming-popup');
        if (res.success && res.data) {
          setCamp(res.data);
          setIsOpen(true);
        } else {
          setCamp(DEFAULT_CAMP);
          setIsOpen(true);
        }
      } catch (err) {
        console.error('Failed to load upcoming shivir popup', err);
        setCamp(DEFAULT_CAMP);
        setIsOpen(true);
      }
    }
    fetchUpcomingPopup();
  }, []);

  if (!camp) return null;

  const campImage = getFullImageUrl(camp.imageUrl || camp.posterImage);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      {/* FLOATING ACTION BADGE BUTTON */}
      <div className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2 max-w-[calc(100vw-24px)]">
        <button
          onClick={handleOpen}
          className="group relative flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-[#55100D] via-[#1A0706] to-[#DD0200] hover:from-[#DD0200] hover:to-[#55100D] text-white font-bold px-2.5 py-2 sm:px-4 sm:py-3 rounded-full shadow-[0_8px_20px_rgba(221,2,0,0.4)] transform hover:-translate-y-0.5 transition-all duration-300 border border-[#DD0200]/40"
          aria-label="View Upcoming Free Shivir Details"
        >
          {/* Glowing aura */}
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#DD0200] to-[#55100D] opacity-40 blur-sm group-hover:opacity-80 transition duration-300 animate-pulse"></span>
          
          <span className="relative flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-amber-400 text-slate-950 font-black shadow-md shrink-0">
            <Megaphone className="w-3 h-3 sm:w-4 sm:h-4 animate-bounce text-[#55100D]" />
          </span>
          <div className="relative text-left pr-0.5">
            <div className="text-[8.5px] sm:text-[9.5px] uppercase tracking-wider font-black text-amber-300 leading-none">
              SPECIAL ANNOUNCEMENT
            </div>
            <div className="text-[11px] sm:text-xs font-extrabold text-white leading-tight font-hindi mt-0.5">
              आगामी निःशुल्क स्वास्थ्य शिविर
            </div>
          </div>
          <span className="relative bg-amber-400 text-slate-950 text-[9px] sm:text-[10px] font-black px-1.5 py-0.5 rounded-full shadow shrink-0">
            INFO
          </span>
        </button>
      </div>

      {/* OVERLAY MODAL POPUP */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn overflow-y-auto"
          onClick={handleClose}
        >
          <div
            className="relative w-full max-w-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-slate-100 rounded-2xl sm:rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.7)] border border-[#DD0200]/30 overflow-hidden max-h-[90vh] sm:max-h-[92vh] flex flex-col transform transition-all animate-scaleUp my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient Background Gradient Accent */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#DD0200]/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

            {/* Top Premium Banner */}
            <div className="bg-gradient-to-r from-[#55100D] via-[#1A0706] to-[#55100D] px-4 py-3 sm:px-6 sm:py-4 border-b border-[#DD0200]/30 relative flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="bg-amber-400/15 border border-amber-400/40 text-amber-300 p-1.5 sm:p-2 rounded-xl shadow-inner shrink-0">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                </span>
                <div>
                  <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-amber-300 flex items-center gap-1">
                    <HeartHandshake className="w-3 h-3 text-amber-400" />
                    FREE MEDICAL CAMP / आगामी निःशुल्क शिविर
                  </span>
                  <h3 className="text-sm sm:text-xl font-extrabold text-white leading-tight font-hindi-heading mt-0.5 drop-shadow-sm line-clamp-1 sm:line-clamp-none">
                    {camp.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-rose-500/80 text-white flex items-center justify-center transition-all duration-200 border border-white/15 shrink-0 shadow-lg"
                aria-label="Close"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-3.5 sm:space-y-5 relative z-10 flex-1">
              {/* Poster Image (If available) */}
              {campImage && (
                <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-700/80 bg-slate-950 max-h-48 sm:max-h-60 flex items-center justify-center group">
                  <img
                    src={campImage}
                    alt={camp.title}
                    className="w-full h-full object-cover max-h-48 sm:max-h-60 group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800';
                    }}
                  />
                  <div className="absolute top-2.5 right-2.5 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-[9px] sm:text-[10px] uppercase tracking-wider px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-lg border border-amber-300/50">
                    ✨ FREE CONSULTATION & MEDICINE
                  </div>
                </div>
              )}

              {/* Event Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5">
                {/* Date */}
                <div className="bg-slate-800/70 hover:bg-slate-800/90 border border-slate-700/70 rounded-xl sm:rounded-2xl p-3 sm:p-3.5 flex items-start gap-2.5 sm:gap-3 transition-colors shadow-sm">
                  <div className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-br from-[#DD0200]/20 to-[#55100D]/30 border border-[#DD0200]/30 text-rose-400 shrink-0">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-slate-400 font-hindi">
                      Date / तिथि
                    </p>
                    <p className="text-xs sm:text-sm font-bold text-white font-hindi mt-0.5">{camp.date}</p>
                  </div>
                </div>

                {/* Timing */}
                {camp.timing && (
                  <div className="bg-slate-800/70 hover:bg-slate-800/90 border border-slate-700/70 rounded-xl sm:rounded-2xl p-3 sm:p-3.5 flex items-start gap-2.5 sm:gap-3 transition-colors shadow-sm">
                    <div className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-br from-[#55100D]/30 to-[#DD0200]/20 border border-[#DD0200]/30 text-amber-400 shrink-0">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-slate-400 font-hindi">
                        Time / समय
                      </p>
                      <p className="text-xs sm:text-sm font-bold text-white font-hindi mt-0.5">{camp.timing}</p>
                    </div>
                  </div>
                )}

                {/* Venue */}
                <div className="bg-slate-800/70 hover:bg-slate-800/90 border border-slate-700/70 rounded-xl sm:rounded-2xl p-3 sm:p-3.5 flex items-start gap-2.5 sm:gap-3 transition-colors shadow-sm">
                  <div className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-400 shrink-0">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-slate-400 font-hindi">
                      Venue / स्थान
                    </p>
                    <p className="text-xs sm:text-sm font-bold text-white font-hindi mt-0.5">{camp.location}</p>
                  </div>
                </div>

                {/* Doctor */}
                <div className="bg-slate-800/70 hover:bg-slate-800/90 border border-slate-700/70 rounded-xl sm:rounded-2xl p-3 sm:p-3.5 flex items-start gap-2.5 sm:gap-3 transition-colors shadow-sm">
                  <div className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/30 text-blue-400 shrink-0">
                    <UserCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-slate-400 font-hindi">
                      Chief Doctor / चिकित्सक
                    </p>
                    <p className="text-xs sm:text-sm font-bold text-white font-hindi mt-0.5">{camp.doctor || 'Dr. I. Khan'}</p>
                  </div>
                </div>
              </div>

              {/* Description Section */}
              {camp.description && (
                <div className="space-y-1">
                  <h4 className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-amber-300/90 flex items-center gap-1.5 font-hindi-heading">
                    <span>DETAILS & FEATURES / विवरण</span>
                  </h4>
                  <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/90 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-700/80 text-slate-200 text-xs sm:text-sm font-hindi leading-relaxed whitespace-pre-line shadow-inner border-l-4 border-l-amber-400">
                    {camp.description}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions Footer */}
            <div className="p-3.5 sm:p-5 bg-slate-950/90 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3 relative z-10 shrink-0">
              {camp.helplinePhone ? (
                <a
                  href={`tel:${camp.helplinePhone}`}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-xs border border-slate-700 hover:border-amber-500/50 transition-all shadow-sm group"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span className="font-mono text-xs">Call Helpline: {camp.helplinePhone}</span>
                </a>
              ) : (
                <div />
              )}

              <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end">
                <button
                  onClick={handleClose}
                  className="px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl text-slate-400 hover:text-white font-bold text-xs transition-colors shrink-0"
                >
                  Close
                </button>
                <Link
                  href="/appointment"
                  onClick={handleClose}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-gradient-to-r from-[#DD0200] via-[#55100D] to-[#DD0200] hover:from-[#55100D] hover:to-[#DD0200] text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-red-950/50 border border-[#DD0200]/40 transform hover:-translate-y-0.5 transition-all duration-300 group"
                >
                  <span className="font-hindi-heading font-extrabold">Book Appointment / Appointment लें</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
