'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HiSquares2X2,
  HiUsers,
  HiUser,
  HiUserGroup,
  HiCalendarDays,
  HiDocumentText,
  HiBookOpen,
  HiChatBubbleLeftRight,
  HiCog6Tooth,
  HiShieldCheck,
  HiArrowRightOnRectangle,
  HiMapPin,
  HiVideoCamera,
  HiQrCode,
  HiReceiptPercent,
  HiQuestionMarkCircle,
} from 'react-icons/hi2';
import { useAdminAuth } from '../lib/admin-auth';

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const { logoutAdmin, adminUser } = useAdminAuth();

  const navItems = [
    { label: 'Dashboard', href: '/', icon: HiSquares2X2, roles: ['super_admin', 'admin', 'receptionist', 'doctor'] },
    { label: 'Patients', href: '/patients', icon: HiUsers, roles: ['super_admin', 'admin', 'receptionist', 'doctor'] },
    { label: 'Doctors', href: '/doctors', icon: HiUser, roles: ['super_admin', 'admin'] },
    { label: 'Staff & Receptionists', href: '/staff', icon: HiUserGroup, roles: ['super_admin', 'admin'] },
    { label: 'Appointments', href: '/appointments', icon: HiCalendarDays, roles: ['super_admin', 'admin', 'receptionist', 'doctor'] },
    { label: 'Patient Billing', href: '/billing', icon: HiReceiptPercent, roles: ['super_admin', 'admin', 'receptionist'] },
    { label: 'Medical Reports', href: '/reports', icon: HiDocumentText, roles: ['super_admin', 'admin', 'receptionist', 'doctor'] },
    { label: 'Health Blogs', href: '/blogs', icon: HiBookOpen, roles: ['super_admin', 'admin'] },
    { label: 'Medical Camps', href: '/camps', icon: HiMapPin, roles: ['super_admin', 'admin', 'receptionist'] },
    { label: 'YouTube Videos', href: '/videos', icon: HiVideoCamera, roles: ['super_admin', 'admin', 'receptionist'] },
    { label: 'Feedback Moderation', href: '/feedback', icon: HiChatBubbleLeftRight, roles: ['super_admin', 'admin', 'receptionist'] },
    { label: 'Patient Inquiries', href: '/inquiries', icon: HiQuestionMarkCircle, roles: ['super_admin', 'admin', 'receptionist'] },
    { label: 'Feedback QR Code', href: '/qr-code', icon: HiQrCode, roles: ['super_admin', 'admin', 'receptionist'] },
    { label: 'Clinic Settings', href: '/settings', icon: HiCog6Tooth, roles: ['super_admin', 'admin'] },
    { label: 'Security Audit Logs', href: '/audit-logs', icon: HiShieldCheck, roles: ['super_admin'] },
  ];

  const visibleNavItems = navItems.filter((item) => 
    !adminUser?.role || item.roles.includes(adminUser.role)
  );

  const sidebarContent = (
    <div className="flex flex-col justify-between h-full p-4 relative z-10">
      <div className="space-y-6">
        {/* Brand */}
        <div className="flex items-center justify-between px-2 pb-4 border-b border-white/5">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="absolute inset-0 bg-orange-500 rounded-xl blur-md opacity-40"></div>
              <img
                src="/images/logo.png"
                alt="Admin Logo"
                className="relative w-10 h-10 rounded-xl object-cover border border-white/20 shadow-lg"
              />
            </div>
            <div>
              <h2 className="font-extrabold text-white text-sm tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                DR. Q.H. KHAN
              </h2>
              <p className="text-[9px] text-orange-400 font-black uppercase tracking-[0.2em] mt-0.5">
                {adminUser?.role === 'doctor' ? 'DOCTOR PORTAL' : adminUser?.role === 'receptionist' ? 'STAFF PORTAL' : 'ADMIN CONTROL'}
              </p>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="md:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            >
              <HiArrowRightOnRectangle className="w-5 h-5 rotate-180" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="space-y-1 text-xs font-semibold overflow-y-auto max-h-[calc(100vh-190px)] pr-2 custom-scrollbar">
          {visibleNavItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={idx}
                href={item.href}
                onClick={onClose}
                className={`group flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 relative overflow-hidden ${
                  isActive
                    ? 'text-white shadow-[0_0_20px_rgba(221,2,0,0.15)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-950/80 to-transparent"></div>
                )}
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500 to-rose-600 rounded-r-full shadow-[0_0_10px_#f97316]"></div>
                )}
                
                <Icon className={`w-5 h-5 shrink-0 relative z-10 transition-transform duration-300 ${isActive ? 'text-orange-500 scale-110' : 'group-hover:scale-110 group-hover:text-slate-200'}`} />
                <span className={`relative z-10 tracking-wide ${isActive ? 'font-bold' : 'font-medium'}`}>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Profile & Logout */}
      <div className="mt-4 pt-4 border-t border-white/5">
        <button
          onClick={() => {
            if (onClose) onClose();
            logoutAdmin();
          }}
          className="group w-full flex items-center gap-3 px-3 py-3 rounded-xl text-xs font-bold text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 transition-all duration-300 border border-transparent hover:border-rose-500/20"
        >
          <HiArrowRightOnRectangle className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="tracking-wide">Sign Out Admin</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden md:flex w-72 glass-dark border-r border-white/5 flex-col shrink-0 min-h-screen relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-rose-900/10 to-transparent pointer-events-none"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-orange-900/10 rounded-full blur-3xl pointer-events-none"></div>
        {sidebarContent}
      </aside>

      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
          <div className="relative w-72 max-w-[85vw] glass-dark h-full shadow-2xl z-10 flex flex-col border-r border-white/10 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-rose-900/20 to-transparent pointer-events-none"></div>
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
