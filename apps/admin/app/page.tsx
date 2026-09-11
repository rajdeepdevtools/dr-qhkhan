'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '../lib/admin-auth';
import { adminApiClient } from '../lib/api-client';
import { AdminShell } from '../components/AdminShell';
import { StatCard } from '../components/StatCard';
import { HiUsers, HiUser, HiCalendarDays, HiDocumentText, HiBolt } from 'react-icons/hi2';

export default function AdminDashboardPage() {
  const { adminUser, isLoading } = useAdminAuth();
  const router = useRouter();

  const [metrics, setMetrics] = useState<any>(null);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    if (!isLoading && !adminUser) {
      router.push('/login');
      return;
    }

    if (adminUser) {
      adminApiClient('/admin/dashboard').then((res) => {
        if (res.success && res.data) {
          setMetrics(res.data.metrics);
          setRecentActivity(res.data.recentActivity || []);
        }
      });
    }
  }, [adminUser, isLoading, router]);

  if (isLoading || !adminUser) {
    return <div className="p-8 text-center text-xs text-slate-400">Loading Admin System...</div>;
  }

  return (
    <AdminShell>
      <div className="flex justify-between items-center px-2 sm:px-6 mb-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">System Overview</h1>
          <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest mt-1">Real-time status for Dr. Q.H. Khan Clinic</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-2 sm:px-6">
        <StatCard title="Registered Patients" value={metrics?.totalPatients || 0} icon={HiUsers} color="text-indigo-500" />
        <StatCard title="Active Doctors" value={metrics?.totalDoctors || 0} icon={HiUser} color="text-orange-500" />
        <StatCard title="Total Appointments" value={metrics?.totalAppointments || 0} subtext={`Pending: ${metrics?.pendingAppointments || 0}`} icon={HiCalendarDays} color="text-rose-500" />
        <StatCard title="Medical Reports" value={metrics?.totalReports || 0} icon={HiDocumentText} color="text-emerald-500" />
      </div>

      {/* Activity Log & Quick Links */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-2 sm:px-6 mt-6">
        <div className="lg:col-span-2 glass-card rounded-2xl p-5 sm:p-6 space-y-4">
          <h3 className="font-black text-slate-800 text-sm flex items-center gap-2 uppercase tracking-wide">
            <HiBolt className="w-5 h-5 text-orange-500" /> Recent Security & System Activity
          </h3>
          {recentActivity.length === 0 ? (
            <p className="text-xs text-slate-500 py-4 font-bold bg-slate-50 rounded-xl text-center border border-slate-100">No recent activity logged.</p>
          ) : (
            <div className="space-y-3">
              {recentActivity.slice(0, 6).map((act, idx) => (
                <div key={idx} className="p-3 bg-white/60 hover:bg-white border border-slate-200/60 rounded-xl text-xs flex justify-between items-center gap-3 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-orange-500 shrink-0"></div>
                  <div className="min-w-0 flex-1">
                    <span className="font-bold text-slate-800 block sm:inline">{act.action}</span>
                    <p className="text-slate-500 font-medium truncate mt-0.5">By {act.actorEmail} <span className="text-[9px] bg-slate-100 px-1.5 py-0.5 rounded ml-1 text-slate-600 uppercase font-black">{act.actorRole}</span></p>
                  </div>
                  <span className="text-[10px] bg-slate-100 px-2 py-1 rounded-md text-slate-500 font-bold shrink-0 shadow-sm border border-slate-200">{new Date(act.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="glass-card rounded-2xl p-5 sm:p-6 space-y-4">
          <h3 className="font-black text-slate-800 text-sm uppercase tracking-wide">Quick Actions</h3>
          <div className="space-y-3 text-xs">
            <Link href="/patients" className="block p-4 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 shadow-md rounded-xl font-bold text-white transition-all transform hover:-translate-y-0.5 text-center">
              Register New Patient
            </Link>
            <Link href="/appointments" className="block p-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 transition-colors shadow-sm text-center">
              Review Appointments
            </Link>
            <Link href="/staff" className="block p-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 transition-colors shadow-sm text-center">
              Manage Staff Accounts
            </Link>
            <Link href="/settings" className="block p-4 bg-slate-800 hover:bg-slate-900 border border-slate-700 rounded-xl font-bold text-slate-200 transition-colors shadow-sm text-center">
              Clinic Settings
            </Link>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
