import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, MessageSquare, Calendar, Navigation, Clock } from 'lucide-react';
import { clinicConfig } from '../../lib/clinicConfig';

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-clinic-indigo/10 text-clinic-indigo text-xs font-bold">
          CLINIC LOCATION & CONTACT
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Contact Dr. Q.H. Khan Clinic</h1>
        <p className="text-slate-600 text-sm">
          Visit us at Nagmatia Road, Gaya or connect via helpline and WhatsApp.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Card: Contact & Action Buttons */}
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-md space-y-6">
          <div className="space-y-4 text-xs">
            <h2 className="text-xl font-bold text-slate-900">Head Office / Clinic & Residence</h2>

            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
              <MapPin className="w-5 h-5 text-clinic-crimson shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 text-sm block">Address</strong>
                <p className="text-slate-600">Nagmatia Road, Gaya, Bihar, India</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
              <Clock className="w-5 h-5 text-clinic-indigo shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 text-sm block">Clinic Timings</strong>
                <p className="text-slate-600">Weekday Morning: {clinicConfig.timings.weekdayMorning}</p>
                <p className="text-slate-600">Weekday Evening: {clinicConfig.timings.weekdayEvening}</p>
                <p className="text-emerald-700 font-semibold mt-1">Sunday: {clinicConfig.timings.sundayTiming}</p>
              </div>
            </div>
          </div>

          {/* Clickable Action Buttons Grid */}
          <div className="space-y-3 pt-2">
            <h3 className="font-bold text-slate-900 text-sm">Instant Action Buttons</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href="tel:9135404090"
                className="flex items-center justify-center gap-2 p-3 bg-clinic-indigo hover:bg-clinic-violet text-white font-bold text-xs rounded-xl shadow transition-colors"
              >
                <Phone className="w-4 h-4" /> Call 9135404090
              </a>
              <a
                href={`https://wa.me/91${clinicConfig.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition-colors"
              >
                <MessageSquare className="w-4 h-4" /> WhatsApp Chat
              </a>
              <Link
                href="/appointment"
                className="flex items-center justify-center gap-2 p-3 bg-clinic-crimson hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow transition-colors"
              >
                <Calendar className="w-4 h-4" /> Book Appointment
              </Link>
              <a
                href={clinicConfig.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-3 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl shadow transition-colors"
              >
                <Navigation className="w-4 h-4" /> Get Directions
              </a>
            </div>
          </div>
        </div>

        {/* Right Card: Helplines Breakdown */}
        <div className="bg-gradient-to-br from-slate-900 to-clinic-indigo text-white rounded-2xl p-8 shadow-md space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-amber-300">All Clinic Helplines</h2>
            <p className="text-xs text-slate-300">
              Click any helpline number below to dial directly or message our reception team.
            </p>

            <div className="space-y-3 pt-2 text-xs">
              {clinicConfig.helplines.map((h, idx) => (
                <div key={idx} className="p-3 bg-white/10 border border-white/15 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">{h.label}</span>
                    <strong className="text-sm text-white font-mono">{h.number}</strong>
                  </div>
                  <a
                    href={`tel:${h.number}`}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded text-xs transition-colors"
                  >
                    Call Now
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 text-[11px] text-slate-400">
            <p>Dr. Q.H. Khan Classical Homoeopathic Clinic • Nagmatia Road, Gaya, Bihar</p>
          </div>
        </div>
      </div>
    </div>
  );
}
