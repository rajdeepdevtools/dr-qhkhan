'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  UserCog,
  Calendar,
  FileText,
  BookOpen,
  MessageSquare,
  Settings,
  ShieldCheck,
  LogOut,
  MapPin,
  Youtube,
  QrCode,
} from 'lucide-react';
import { useAdminAuth } from '../lib/admin-auth';

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();
  const { logoutAdmin } = useAdminAuth();

  const navItems = [
    { label: 'Dashboard', href: '/', icon: LayoutDashboard },
    { label: 'Patients', href: '/patients', icon: Users },
    { label: 'Doctors', href: '/doctors', icon: UserCheck },
    { label: 'Staff / Receptionists', href: '/staff', icon: UserCog },
    { label: 'Appointments', href: '/appointments', icon: Calendar },
    { label: 'Medical Reports', href: '/reports', icon: FileText },
    { label: 'Health Blogs', href: '/blogs', icon: BookOpen },
    { label: 'Medical Camps (Shivir)', href: '/camps', icon: MapPin },
    { label: 'YouTube Videos', href: '/videos', icon: Youtube },
    { label: 'Feedback Moderation', href: '/feedback', icon: MessageSquare },
    { label: 'Feedback QR Code', href: '/qr-code', icon: QrCode },
    { label: 'Clinic Settings', href: '/settings', icon: Settings },
    { label: 'Security Audit Logs', href: '/audit-logs', icon: ShieldCheck },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between p-4 min-h-screen">
      <div className="space-y-6">
        {/* Brand */}
        <div className="flex items-center space-x-3 px-2">
          <img
            src="/images/logo.png"
            alt="Admin Logo"
            className="w-9 h-9 rounded-xl shadow object-cover"
          />
          <div>
            <h2 className="font-extrabold text-white text-sm tracking-wide">DR. Q.H. KHAN</h2>
            <p className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider">ADMIN CONTROL PANEL</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1 text-xs font-semibold">
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={idx}
                href={item.href}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-colors ${
                  isActive
                    ? 'bg-clinic-crimson text-white font-bold shadow'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout button */}
      <button
        onClick={logoutAdmin}
        className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors"
      >
        <LogOut className="w-4 h-4" />
        <span>Sign Out Admin</span>
      </button>
    </aside>
  );
};
