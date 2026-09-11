'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminApiClient } from '../../lib/api-client';
import { useAdminAuth } from '../../lib/admin-auth';
import { ShieldCheck, Lock, Mail, AlertCircle, Eye, EyeOff, ShieldAlert, HeartPulse, Activity, Server, FileKey } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { loginAdmin } = useAdminAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const res = await adminApiClient('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    setLoading(false);

    if (res.success && res.data && ['admin', 'super_admin', 'receptionist'].includes(res.data.user.role)) {
      if (res.data.token) {
        localStorage.setItem('adminToken', res.data.token);
      }
      if (res.data.refreshToken) {
        localStorage.setItem('adminRefreshToken', res.data.refreshToken);
      }
      loginAdmin(res.data);
      router.push('/');
    } else {
      setErrorMsg(res.message || 'Unauthorized credentials. Access is restricted to clinic staff.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#1A0706] relative overflow-hidden font-sans text-xs select-none">
      
      {/* Dynamic Background Texture & Graphic Layers */}
      {/* 1. Ambient Glow Orbs */}
      <div className="absolute w-[650px] h-[650px] bg-[#55100D]/30 rounded-full blur-[140px] -top-60 -left-60 pointer-events-none animate-pulse" />
      <div className="absolute w-[550px] h-[550px] bg-[#DD0200]/15 rounded-full blur-[120px] -bottom-40 -right-40 pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] bg-[#55100D]/20 rounded-full blur-[100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      {/* 2. SVG Dot Matrix & Crosshatch Background Pattern */}
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />
      
      {/* 3. Medical Grid Lines Graphic Overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="medical-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#FFFFFF" strokeWidth="1" />
            <circle cx="60" cy="60" r="1.5" fill="#DD0200" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#medical-grid)" />
      </svg>

      {/* 4. Decorative Floating ECG Wave Graphic (Background SVG Vector) */}
      <div className="absolute top-10 right-1/3 opacity-15 pointer-events-none hidden lg:block">
        <svg width="400" height="120" viewBox="0 0 400 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 60 H100 L115 10 L130 110 L145 30 L160 80 L175 60 H400" stroke="#DD0200" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Left Panel: Information & Clinic Suite Overview */}
      <div className="lg:w-1/2 p-6 sm:p-10 lg:p-16 flex flex-col justify-between relative z-10 border-b lg:border-b-0 lg:border-r border-white/10 space-y-8 lg:space-y-12">
        
        {/* Brand Header */}
        <div className="flex items-center space-x-3.5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#55100D] to-[#DD0200] p-0.5 shadow-lg shadow-[#DD0200]/20">
            <div className="w-full h-full bg-[#1A0706] rounded-[14px] flex items-center justify-center">
              <HeartPulse className="w-6 h-6 text-[#DD0200] animate-pulse" />
            </div>
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-white leading-none tracking-tight">DR. Q.H. KHAN</h2>
            <p className="text-[9px] sm:text-[10px] text-[#DD0200] font-black tracking-widest uppercase mt-1">CLINIC MANAGEMENT PORTAL</p>
          </div>
        </div>

        {/* Informative Suite Features */}
        <div className="space-y-6 max-w-lg">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DD0200]/10 border border-[#DD0200]/30 text-[#DD0200] text-[10px] font-black uppercase tracking-wider">
              <Activity className="w-3.5 h-3.5" /> High Security EMR Gateway
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-800 tracking-tight leading-tight">
              Enterprise Suite for Clinical Operations
            </h1>
            <p className="text-slate-600 font-medium leading-relaxed text-xs sm:text-sm">
              Secure digital EMR dashboard, active case register maintenance, consultation routing, and real-time patient inquiry management.
            </p>
          </div>

          {/* Feature Badge Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 bg-white/[0.03] border border-white/10 rounded-2xl backdrop-blur-md hover:bg-white/[0.05] transition-all">
              <ShieldCheck className="w-5 h-5 text-emerald-400 mb-2" />
              <h3 className="font-extrabold text-slate-800 text-xs">Role-Based Access</h3>
              <p className="text-[10px] text-slate-500 mt-0.5">Strict RBAC controls protecting patient medical histories.</p>
            </div>
            <div className="p-3.5 bg-white/[0.03] border border-white/10 rounded-2xl backdrop-blur-md hover:bg-white/[0.05] transition-all">
              <Server className="w-5 h-5 text-[#DD0200] mb-2" />
              <h3 className="font-extrabold text-slate-800 text-xs">Real-Time Routing</h3>
              <p className="text-[10px] text-slate-500 mt-0.5">Direct sync for online booking queues & shift timelines.</p>
            </div>
            <div className="p-3.5 bg-white/[0.03] border border-white/10 rounded-2xl backdrop-blur-md hover:bg-white/[0.05] transition-all sm:col-span-2">
              <div className="flex items-center gap-3">
                <FileKey className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <h3 className="font-extrabold text-slate-800 text-xs">Cryptographic Audit Logging</h3>
                  <p className="text-[10px] text-slate-500 mt-0.5">All staff transactions and prescription prints are logged for compliance.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Graphic Badge */}
        <div className="pt-4 border-t border-white/5 flex items-center justify-between text-slate-400 text-[10px] font-bold">
          <span>Official Homoeopathic EMR System</span>
          <span className="text-emerald-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            System Online
          </span>
        </div>

      </div>

      {/* Right Panel: Secure Staff Sign-In Card */}
      <div className="lg:w-1/2 p-6 sm:p-10 lg:p-16 flex items-center justify-center relative z-10">
        
        <div className="w-full max-w-md bg-[#131314]/80 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-xl space-y-6 relative overflow-hidden">
          
          {/* Glowing Top Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#55100D] via-[#DD0200] to-[#55100D]" />

          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-gradient-to-br from-[#55100D]/40 to-[#DD0200]/20 border border-[#DD0200]/40 text-[#DD0200] rounded-2xl flex items-center justify-center mx-auto shadow-inner shadow-[#DD0200]/20">
              <Lock className="w-7 h-7 text-[#DD0200]" />
            </div>
            <h2 className="text-xl font-black text-white tracking-tight">Staff Portal Sign-In</h2>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Enter authorized credentials to continue</p>
          </div>

          {errorMsg && (
            <div className="p-3.5 bg-rose-950/60 border border-rose-800/80 text-rose-200 rounded-2xl text-xs flex items-center gap-2.5 shadow-lg">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span className="font-semibold leading-tight">{errorMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 font-bold text-slate-600">
            
            <div className="space-y-1.5">
              <label className="block text-slate-400 text-[10px] uppercase tracking-wider">Staff Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@drqhkhanclinic.com"
                  className="w-full pl-10 pr-3 py-3.5 bg-black/60 border border-white/10 rounded-2xl text-white placeholder:text-slate-600 focus:border-[#DD0200] focus:ring-1 focus:ring-[#DD0200] focus:outline-none transition-all font-semibold text-xs"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-slate-400 text-[10px] uppercase tracking-wider">Security Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3.5 bg-black/60 border border-white/10 rounded-2xl text-white placeholder:text-slate-600 focus:border-[#DD0200] focus:ring-1 focus:ring-[#DD0200] focus:outline-none transition-all font-semibold text-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-500 hover:text-slate-600 transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-[#55100D] via-[#DD0200] to-[#55100D] hover:opacity-95 text-white font-black text-xs rounded-2xl shadow-xl shadow-[#55100D]/30 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 tracking-wider uppercase mt-2"
            >
              {loading ? 'Authenticating Credentials...' : 'Access Admin Control Suite'}
            </button>

          </form>

          {/* Security Disclaimer */}
          <div className="flex items-start gap-2.5 bg-[#55100D]/20 border border-[#55100D]/40 rounded-2xl p-3.5 text-[10px] leading-relaxed text-rose-200">
            <ShieldAlert className="w-4 h-4 shrink-0 text-[#DD0200] mt-0.5" />
            <span>
              <strong>Protected Access:</strong> All sign-in attempts are monitored and recorded. Unauthorized access is strictly prohibited.
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}
