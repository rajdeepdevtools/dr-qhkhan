'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Phone, Calendar, User as UserIcon, Menu, X } from 'lucide-react';
import { BilingualToggle } from './BilingualToggle';
import { translations } from '../lib/translations';
import { useAuth } from '../lib/auth-context';
import { useLanguage } from '../lib/language-context';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, setLang } = useLanguage();
  const { user, logout } = useAuth();
  const t = translations[lang];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      {/* Top Helpline Bar */}
      <div className="bg-clinic-indigo text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center space-x-4">
            <span className="font-semibold tracking-wide">
              DR. Q.H. KHAN CLINIC (ESTD. 1958) • GAYA, BIHAR
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="tel:9135404090" className="flex items-center gap-1 hover:text-orange-300 transition-colors">
              <Phone className="w-3.5 h-3.5" />
              <span>Helpline: 9135404090 / 9709786669</span>
            </a>
            <BilingualToggle currentLang={lang} onLanguageChange={setLang} />
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3 group">
          <img
            src="/images/logo.png"
            alt="Dr. Q.H. Khan Clinic Logo"
            className="w-10 h-10 rounded-xl shadow-md object-cover group-hover:scale-105 transition-transform"
          />
          <div>
            <h1 className="font-bold text-slate-900 text-lg leading-tight group-hover:text-clinic-indigo transition-colors">
              DR. Q.H. KHAN
            </h1>
            <p className="text-xs text-slate-500 font-medium tracking-wide">
              CLASSICAL HOMOEOPATHIC CLINIC
            </p>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-700">
          <Link href="/" className="hover:text-clinic-indigo transition-colors">{t.navHome}</Link>
          <Link href="/about" className="hover:text-clinic-indigo transition-colors">{t.navAbout}</Link>
          <Link href="/doctors" className="hover:text-clinic-indigo transition-colors">{t.navDoctors}</Link>
          <Link href="/treatments" className="hover:text-clinic-indigo transition-colors">{t.navTreatments}</Link>
          <Link href="/blogs" className="hover:text-clinic-indigo transition-colors">{t.navBlogs}</Link>
          <Link href="/contact" className="hover:text-clinic-indigo transition-colors">{t.navContact}</Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          {user ? (
            <div className="flex items-center space-x-2">
              <Link
                href="/doctor"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-100 text-slate-800 text-xs font-semibold hover:bg-slate-200 transition-colors"
              >
                <UserIcon className="w-4 h-4 text-clinic-indigo" />
                <span>Doctor Portal</span>
              </Link>
              <button
                onClick={logout}
                className="px-3 py-2 text-xs text-red-600 hover:text-red-800 font-medium"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-100 text-slate-800 text-xs font-semibold hover:bg-slate-200 transition-colors"
            >
              <UserIcon className="w-4 h-4 text-clinic-indigo" />
              <span>{t.navLogin}</span>
            </Link>
          )}

          <Link
            href="/appointment"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-clinic-crimson text-white text-xs font-bold shadow-md hover:bg-amber-700 transition-colors"
          >
            <Calendar className="w-4 h-4" />
            <span>{t.navAppointment}</span>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-700 focus:outline-none"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-800 font-medium">{t.navHome}</Link>
          <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-800 font-medium">{t.navAbout}</Link>
          <Link href="/doctors" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-800 font-medium">{t.navDoctors}</Link>
          <Link href="/treatments" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-800 font-medium">{t.navTreatments}</Link>
          <Link href="/blogs" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-800 font-medium">{t.navBlogs}</Link>
          <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-800 font-medium">{t.navContact}</Link>
          
          <div className="pt-2 flex flex-col gap-2">
            <Link
              href="/appointment"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-lg bg-clinic-crimson text-white font-bold text-sm shadow"
            >
              {t.navAppointment}
            </Link>
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2 rounded-lg bg-slate-100 text-slate-800 font-semibold text-sm"
            >
              {t.navLogin}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
