'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '../lib/admin-auth';
import { adminApiClient } from '../lib/api-client';
import { AdminSidebar } from '../components/AdminSidebar';
import { AdminHeader } from '../components/AdminHeader';
import { StatCard } from '../components/StatCard';
import { Users, UserCheck, Calendar, FileText, Activity } from 'lucide-react';

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
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader />
        <main className="p-6 space-y-6 flex-1 overflow-y-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-black text-[#1A0706]">Clinic System Overview</h1>
              <p className="text-xs text-slate-500 font-bold">Real-time status for Dr. Q.H. Khan Classical Homoeopathic Clinic</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="Total Registered Patients" value={metrics?.totalPatients || 0} icon={Users} color="text-[#DD0200]" />
            <StatCard title="Active Doctors" value={metrics?.totalDoctors || 0} icon={UserCheck} color="text-[#55100D]" />
            <StatCard title="Total Appointments" value={metrics?.totalAppointments || 0} subtext={`Pending: ${metrics?.pendingAppointments || 0}`} icon={Calendar} color="text-[#DD0200]" />
            <StatCard title="Medical Reports" value={metrics?.totalReports || 0} icon={FileText} color="text-[#55100D]" />
          </div>

          {/* Activity Log & Quick Links */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white border border-[#D9D9D9] rounded-2xl p-5 space-y-4 shadow-sm">
              <h3 className="font-black text-[#1A0706] text-sm flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#DD0200]" /> Recent Security & System Activity
              </h3>
              {recentActivity.length === 0 ? (
                <p className="text-xs text-slate-500 py-4 font-bold">No recent activity logged.</p>
              ) : (
                <div className="space-y-2.5">
                  {recentActivity.slice(0, 6).map((act, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 border border-[#D9D9D9] rounded-xl text-xs flex justify-between items-center">
                      <div>
                        <span className="font-bold text-[#DD0200]">{act.action}</span>
                        <p className="text-slate-750 font-bold">By {act.actorEmail} ({act.actorRole})</p>
                      </div>
                      <span className="text-[10px] text-slate-500 font-bold">{new Date(act.timestamp).toLocaleTimeString()}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white border border-[#D9D9D9] rounded-2xl p-5 space-y-3 shadow-sm">
              <h3 className="font-black text-[#1A0706] text-sm">Quick Management Links</h3>
              <div className="space-y-2 text-xs">
                <Link href="/patients" className="block p-3 bg-slate-50 hover:bg-slate-100 border border-[#D9D9D9] rounded-xl font-extrabold text-[#1A0706] transition-colors">
                  + Create / Manage Patient (HOSP-2026-XXXX)
                </Link>
                <Link href="/staff" className="block p-3 bg-slate-50 hover:bg-slate-100 border border-[#D9D9D9] rounded-xl font-extrabold text-[#1A0706] transition-colors">
                  + Create Receptionist / Staff Account
                </Link>
                <Link href="/appointments" className="block p-3 bg-slate-50 hover:bg-slate-100 border border-[#D9D9D9] rounded-xl font-extrabold text-[#1A0706] transition-colors">
                  Review Pending Appointments
                </Link>
                <Link href="/settings" className="block p-3 bg-[#55100D]/5 border border-[#55100D]/10 hover:bg-[#55100D]/10 rounded-xl font-extrabold text-[#55100D] transition-colors">
                  Edit Clinic Timings & Helplines
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
