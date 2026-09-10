'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Calendar, User as UserIcon, Menu, X } from 'lucide-react';
import { BilingualToggle } from './BilingualToggle';
import { translations } from '../lib/translations';
import { useAuth } from '../lib/auth-context';
import { useLanguage } from '../lib/language-context';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { lang, setLang } = useLanguage();
  const { user, logout } = useAuth();
  const t = translations[lang];
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.navHome, path: '/' },
    { name: t.navAbout, path: '/about' },
    { name: t.navDoctors, path: '/doctors' },
    { name: t.navTreatments, path: '/treatments' },
    { name: t.navBlogs, path: '/blogs' },
    { name: t.navContact, path: '/contact' },
  ];

  return (
    <>
      {/* 1. Static Top Helpline Bar */}
      <div className="bg-[#1F0270] text-white text-xs py-2 px-4 no-print border-b border-[#F5B800]/20">
        <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center space-x-4">
            <span className="font-bold tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F5B800] animate-pulse" />
              DR. Q.H. KHAN CLINIC (ESTD. 1958) • GAYA, BIHAR
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="tel:9135404090" className="flex items-center gap-1.5 text-[#F5B800] font-extrabold hover:text-amber-200 transition-colors">
              <Phone className="w-3.5 h-3.5 text-[#F5B800]" />
              <span>Helpline: 9135404090 / 9709786669</span>
            </a>
            <BilingualToggle currentLang={lang} onLanguageChange={setLang} />
          </div>
        </div>
      </div>

      {/* 2. Sticky Scroll-reactive Header */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-500 no-print border-b ${
          isScrolled
            ? 'bg-white/95 shadow-lg backdrop-blur-xl py-2.5 border-slate-200/80'
            : 'bg-[#120146]/95 backdrop-blur-md py-3.5 border-white/10 shadow-[0_4px_25px_rgba(31,2,112,0.3)]'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <img
              src="/images/logo.png"
              alt="Dr. Q.H. Khan Clinic Logo"
              className="w-9 h-9 rounded-xl shadow-md object-cover transition-transform group-hover:scale-105 duration-300 ring-2 ring-[#F5B800]/40"
            />
            <div>
              <h1 className={`font-black text-base leading-tight transition-colors tracking-tight ${
                isScrolled ? 'text-[#1F0270]' : 'text-white'
              }`}>
                DR. Q.H. KHAN
              </h1>
              <p className={`text-[10px] font-black tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r ${
                isScrolled ? 'from-[#1F0270] to-[#2E0AB0]' : 'from-[#F5B800] via-amber-200 to-amber-400'
              }`}>
                {lang === 'hi' ? 'क्लासिकल होम्योपैथिक क्लिनिक' : 'CLASSICAL HOMOEOPATHIC CLINIC'}
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-7 text-xs font-bold">
            {navLinks.map((link, idx) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={idx}
                  href={link.path}
                  className={`group flex flex-col gap-1 transition-all ${
                    isActive 
                      ? (isScrolled ? 'text-[#1F0270] font-black tracking-wide' : 'text-[#F5B800] font-black tracking-wide') 
                      : (isScrolled ? 'text-slate-700 hover:text-[#1F0270] font-bold tracking-wide' : 'text-slate-200 hover:text-[#F5B800] font-bold tracking-wide')
                  }`}
                >
                  <span>{link.name}</span>
                  <div
                    className={`h-0.5 transition-all duration-300 bg-[#F5B800] shadow-[0_0_10px_rgba(245,184,0,0.9)] ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-3 text-xs">
            {user ? (
              <div className="flex items-center space-x-2">
                <Link
                  href="/doctor"
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold transition-all hover:scale-102 ${
                    isScrolled 
                      ? 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200' 
                      : 'bg-white/10 text-white border border-white/20 hover:bg-white/25'
                  }`}
                >
                  <UserIcon className={`w-3.5 h-3.5 ${isScrolled ? 'text-[#1F0270]' : 'text-[#F5B800]'}`} />
                  <span>Doctor Portal</span>
                </Link>
                <button
                  onClick={logout}
                  className={`px-2 py-2 font-bold transition-colors ${isScrolled ? 'text-red-650 hover:text-red-800' : 'text-red-300 hover:text-red-200'}`}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold transition-all hover:scale-102 ${
                  isScrolled 
                    ? 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200' 
                    : 'bg-white/10 text-white border border-white/20 hover:bg-white/25'
                }`}
              >
                <UserIcon className={`w-3.5 h-3.5 ${isScrolled ? 'text-[#1F0270]' : 'text-[#F5B800]'}`} />
                <span>{t.navLogin}</span>
              </Link>
            )}

            <Link
              href="/appointment"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#F5B800] via-[#F4C430] to-[#EAB308] hover:from-[#EAB308] hover:to-[#D99B00] text-[#120146] font-black shadow-md transition-all hover:scale-102 uppercase tracking-wide text-[11px]"
            >
              <div className="w-2 h-2 rounded-full bg-[#120146] animate-ping" />
              <Calendar className="w-4 h-4 shrink-0 text-[#120146]" />
              <span>{t.navAppointment}</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 focus:outline-none ${isScrolled ? 'text-[#1F0270]' : 'text-[#F5B800]'}`}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-out Menu */}
        <div
          className={`fixed top-0 left-0 w-full h-screen bg-white text-sm flex flex-col md:hidden items-center justify-center gap-6 font-bold text-slate-800 transition-all duration-500 z-50 ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Close button */}
          <button className="absolute top-4 right-4 text-slate-700" onClick={() => setIsMenuOpen(false)}>
            <X className="w-6 h-6" />
          </button>

          {navLinks.map((link, i) => (
            <Link
              key={i}
              href={link.path}
              onClick={() => setIsMenuOpen(false)}
              className={`hover:text-[#1F0270] transition-colors ${
                pathname === link.path ? 'text-[#1F0270] font-black' : ''
              }`}
            >
              {link.name}
            </Link>
          ))}

          <div className="flex flex-col gap-3 w-48 text-center pt-4 border-t border-slate-100">
            {user ? (
              <>
                <Link
                  href="/doctor"
                  onClick={() => setIsMenuOpen(false)}
                  className="py-2.5 rounded-xl bg-slate-100 text-slate-800 font-bold hover:bg-slate-200 transition-colors"
                >
                  Doctor Portal
                </Link>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    logout();
                  }}
                  className="py-2 text-red-600 font-bold"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="py-2.5 rounded-xl bg-slate-100 text-slate-800 font-bold hover:bg-slate-200 transition-colors"
              >
                {t.navLogin}
              </Link>
            )}

            <Link
              href="/appointment"
              onClick={() => setIsMenuOpen(false)}
              className="py-3 rounded-xl bg-gradient-to-r from-[#F5B800] to-[#EAB308] text-[#120146] font-black shadow-md uppercase tracking-wider"
            >
              {t.navAppointment}
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};
