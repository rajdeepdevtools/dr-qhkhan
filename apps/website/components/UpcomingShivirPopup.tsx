'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { apiClient } from '../lib/api-client';
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

export const UpcomingShivirPopup: React.FC = () => {
  const [camp, setCamp] = useState<Camp | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const getFullImageUrl = (path?: string) => {
    if (!path) return '';
    if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
      return path;
    }
    const backendOrigin = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api').replace(/\/api\/?$/, '');
    return `${backendOrigin}${path.startsWith('/') ? path : `/${path}`}`;
  };

  useEffect(() => {
    async function fetchUpcomingPopup() {
      try {
        const res = await apiClient<Camp>('/camps/upcoming-popup');
        if (res.success && res.data) {
          setCamp(res.data);
          setIsOpen(true);
        }
      } catch (err) {
        console.error('Failed to load upcoming shivir popup', err);
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
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2">
        <button
          onClick={handleOpen}
          className="group relative flex items-center gap-2.5 sm:gap-3 bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-900 hover:from-emerald-600 hover:to-teal-600 text-white font-bold px-3 py-2.5 sm:px-4 sm:py-3 rounded-full shadow-[0_10px_25px_rgba(16,185,129,0.35)] transform hover:-translate-y-1 transition-all duration-300 border border-emerald-400/40"
          aria-label="View Upcoming Free Shivir Details"
        >
          {/* Glowing aura */}
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 opacity-40 blur-md group-hover:opacity-80 transition duration-300 animate-pulse"></span>
          
          <span className="relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-amber-400 text-slate-950 font-black shadow-md shrink-0">
            <Megaphone className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-bounce" />
          </span>
          <div className="relative text-left pr-0.5 hidden sm:block">
            <div className="text-[9.5px] uppercase tracking-widest font-black text-amber-300 leading-none">
              SPECIAL ANNOUNCEMENT
            </div>
            <div className="text-xs font-extrabold text-white leading-tight font-hindi mt-0.5">
              आगामी निःशुल्क स्वास्थ्य शिविर
            </div>
          </div>
          <span className="relative text-xs font-bold text-white sm:hidden font-hindi">
            निःशुल्क शिविर
          </span>
          <span className="relative bg-amber-400 text-slate-950 text-[9.5px] sm:text-[10px] font-black px-2 py-0.5 rounded-full shadow">
            INFO
          </span>
        </button>
      </div>

      {/* OVERLAY MODAL POPUP */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
          onClick={handleClose}
        >
          <div
            className="relative w-full max-w-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-slate-100 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.7)] border border-emerald-500/30 overflow-hidden max-h-[92vh] flex flex-col transform transition-all animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient Background Gradient Accent */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

            {/* Top Premium Banner */}
            <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-emerald-950 px-6 py-4 border-b border-emerald-500/30 relative flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="bg-amber-400/15 border border-amber-400/40 text-amber-300 p-2 rounded-xl shadow-inner">
                  <Sparkles className="w-5 h-5" />
                </span>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 flex items-center gap-1">
                    <HeartHandshake className="w-3 h-3 text-amber-400" />
                    UPCOMING FREE MEDICAL CAMP / आगामी निःशुल्क शिविर
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-white leading-tight font-hindi-heading mt-0.5 drop-shadow-sm">
                    {camp.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-rose-500/80 text-white flex items-center justify-center transition-all duration-200 border border-white/15 shrink-0 shadow-lg"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-5 relative z-10">
              {/* Poster Image (If available) */}
              {campImage && (
                <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-700/80 bg-slate-950 max-h-60 flex items-center justify-center group">
                  <img
                    src={campImage}
                    alt={camp.title}
                    className="w-full h-full object-cover max-h-60 group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800';
                    }}
                  />
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-lg border border-amber-300/50">
                    ✨ FREE CONSULTATION & MEDICINE
                  </div>
                </div>
              )}

              {/* Event Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Date */}
                <div className="bg-slate-800/70 hover:bg-slate-800/90 border border-slate-700/70 rounded-2xl p-3.5 flex items-start gap-3 transition-colors shadow-sm">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 text-emerald-400 shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 font-hindi">
                      Date / तिथि
                    </p>
                    <p className="text-sm font-bold text-white font-hindi mt-0.5">{camp.date}</p>
                  </div>
                </div>

                {/* Timing */}
                {camp.timing && (
                  <div className="bg-slate-800/70 hover:bg-slate-800/90 border border-slate-700/70 rounded-2xl p-3.5 flex items-start gap-3 transition-colors shadow-sm">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20 border border-teal-500/30 text-teal-400 shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 font-hindi">
                        Time / समय
                      </p>
                      <p className="text-sm font-bold text-white font-hindi mt-0.5">{camp.timing}</p>
                    </div>
                  </div>
                )}

                {/* Venue */}
                <div className="bg-slate-800/70 hover:bg-slate-800/90 border border-slate-700/70 rounded-2xl p-3.5 flex items-start gap-3 transition-colors shadow-sm">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 font-hindi">
                      Venue / स्थान
                    </p>
                    <p className="text-sm font-bold text-white font-hindi mt-0.5">{camp.location}</p>
                  </div>
                </div>

                {/* Doctor */}
                <div className="bg-slate-800/70 hover:bg-slate-800/90 border border-slate-700/70 rounded-2xl p-3.5 flex items-start gap-3 transition-colors shadow-sm">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/30 text-blue-400 shrink-0">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 font-hindi">
                      Chief Doctor / चिकित्सक
                    </p>
                    <p className="text-sm font-bold text-white font-hindi mt-0.5">{camp.doctor || 'Dr. I. Khan'}</p>
                  </div>
                </div>
              </div>

              {/* Description Section */}
              {camp.description && (
                <div className="space-y-1.5">
                  <h4 className="text-xs font-black uppercase tracking-wider text-amber-300/90 flex items-center gap-1.5 font-hindi-heading">
                    <span>DETAILS & FEATURES / विवरण</span>
                  </h4>
                  <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/90 p-4 rounded-2xl border border-slate-700/80 text-slate-200 text-sm font-hindi leading-relaxed whitespace-pre-line shadow-inner border-l-4 border-l-amber-400">
                    {camp.description}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions Footer */}
            <div className="p-4 sm:p-5 bg-slate-950/90 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10">
              {camp.helplinePhone ? (
                <a
                  href={`tel:${camp.helplinePhone}`}
                  className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-xs border border-slate-700 hover:border-emerald-500/50 transition-all shadow-sm group"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <span className="font-mono">Call Helpline: {camp.helplinePhone}</span>
                </a>
              ) : (
                <div />
              )}

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  onClick={handleClose}
                  className="px-4 py-2.5 rounded-xl text-slate-400 hover:text-white font-bold text-xs transition-colors"
                >
                  Close
                </button>
                <Link
                  href="/appointment"
                  onClick={handleClose}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-emerald-950/50 border border-emerald-400/30 transform hover:-translate-y-0.5 transition-all duration-300 group"
                >
                  <span className="font-hindi-heading font-extrabold">Book Appointment / Appointment लें</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
