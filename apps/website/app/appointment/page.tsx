import React from 'react';
import { AppointmentForm } from '../../components/AppointmentForm';
import { Calendar, Phone, MapPin } from 'lucide-react';
import { clinicConfig } from '../../lib/clinicConfig';

export default function AppointmentPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-clinic-crimson/10 text-clinic-crimson text-xs font-bold">
          <Calendar className="w-4 h-4" /> ONLINE CLINIC BOOKING
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900">Book Doctor Appointment</h1>
        <p className="text-slate-600 text-sm">
          Schedule consultation at Dr. Q.H. Khan Classical Homoeopathic Clinic, Nagmatia Road, Gaya.
        </p>
      </div>

      <AppointmentForm />

      <div className="bg-slate-900 text-white rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
        <div className="space-y-1">
          <p className="font-bold text-amber-300">Prefer Direct Helpline Booking?</p>
          <p className="text-slate-300">Call our desk directly to reserve your consultation slot.</p>
        </div>
        <a
          href="tel:9135404090"
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow transition-colors flex items-center gap-2"
        >
          <Phone className="w-4 h-4" /> Call 9135404090
        </a>
      </div>
    </div>
  );
}
