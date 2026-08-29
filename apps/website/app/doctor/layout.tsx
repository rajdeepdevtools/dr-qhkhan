'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../lib/auth-context';
import { Calendar, Users, FileText, PlusCircle, LayoutDashboard } from 'lucide-react';

export default function DoctorLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-xs text-slate-500">
        Loading Doctor Portal...
      </div>
    );
  }

  if (!user || user.role !== 'doctor') {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Doctor Access Only</h2>
        <p className="text-xs text-slate-600">Please sign in with your doctor credentials.</p>
        <Link href="/login" className="inline-block px-4 py-2 bg-clinic-indigo text-white text-xs font-bold rounded-lg shadow">
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Doctor Sidebar */}
        <aside className="md:col-span-3 space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4 text-xs">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Doctor Clinical Portal</h3>
              <p className="text-slate-500">{user.email}</p>
            </div>

            <nav className="space-y-1 font-semibold text-slate-700">
              <Link href="/doctor" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 hover:text-clinic-indigo transition-colors">
                <LayoutDashboard className="w-4 h-4" /> Overview
              </Link>
              <Link href="/doctor/appointments" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 hover:text-clinic-indigo transition-colors">
                <Calendar className="w-4 h-4" /> Assigned Appointments
              </Link>
              <Link href="/doctor/patients" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 hover:text-clinic-indigo transition-colors">
                <Users className="w-4 h-4" /> Patient Directory
              </Link>
              <Link href="/doctor/reports/create" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-clinic-crimson text-white font-bold transition-colors">
                <PlusCircle className="w-4 h-4" /> Create Clinical Report
              </Link>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="md:col-span-9">{children}</main>
      </div>
    </div>
  );
}
