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
  Receipt,
  HelpCircle,
} from 'lucide-react';
import { useAdminAuth } from '../lib/admin-auth';

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const { logoutAdmin } = useAdminAuth();

  const navItems = [
    { label: 'Dashboard', href: '/', icon: LayoutDashboard },
    { label: 'Patients', href: '/patients', icon: Users },
    { label: 'Doctors', href: '/doctors', icon: UserCheck },
    { label: 'Staff / Receptionists', href: '/staff', icon: UserCog },
    { label: 'Appointments', href: '/appointments', icon: Calendar },
    { label: 'Patient Billing & Invoices', href: '/billing', icon: Receipt },
    { label: 'Medical Reports', href: '/reports', icon: FileText },
    { label: 'Health Blogs', href: '/blogs', icon: BookOpen },
    { label: 'Medical Camps (Shivir)', href: '/camps', icon: MapPin },
    { label: 'YouTube Videos', href: '/videos', icon: Youtube },
    { label: 'Feedback Moderation', href: '/feedback', icon: MessageSquare },
    { label: 'Patient Inquiries', href: '/inquiries', icon: HelpCircle },
    { label: 'Feedback QR Code', href: '/qr-code', icon: QrCode },
    { label: 'Clinic Settings', href: '/settings', icon: Settings },
    { label: 'Security Audit Logs', href: '/audit-logs', icon: ShieldCheck },
  ];

  const sidebarContent = (
    <div className="flex flex-col justify-between h-full p-4">
      <div className="space-y-6">
        {/* Brand */}
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center space-x-3">
            <img
              src="/images/logo.png"
              alt="Admin Logo"
              className="w-9 h-9 rounded-xl shadow object-cover border border-[#55100D]/30"
            />
            <div>
              <h2 className="font-extrabold text-white text-sm tracking-wide">DR. Q.H. KHAN</h2>
              <p className="text-[10px] text-[#DD0200] font-black uppercase tracking-wider">ADMIN CONTROL PANEL</p>
            </div>
          </div>
          {/* Mobile close button */}
          {onClose && (
            <button
              onClick={onClose}
              className="md:hidden p-1 text-slate-400 hover:text-white rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5 rotate-180" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="space-y-1 text-xs font-semibold overflow-y-auto max-h-[calc(100vh-180px)] pr-1">
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={idx}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#55100D] to-[#DD0200] text-white font-black shadow-md'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white font-bold'
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
        onClick={() => {
          if (onClose) onClose();
          logoutAdmin();
        }}
        className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors mt-4"
      >
        <LogOut className="w-4 h-4" />
        <span>Sign Out Admin</span>
      </button>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-[#131314] border-r border-white/5 flex-col shrink-0 min-h-screen">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Navigation */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={onClose}
          />

          {/* Drawer content */}
          <div className="relative w-72 max-w-[85vw] bg-[#131314] h-full shadow-2xl z-10 flex flex-col border-r border-white/10">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
