'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminApiClient } from '../../lib/api-client';
import { useAdminAuth } from '../../lib/admin-auth';
import { ShieldCheck, Lock, Mail, AlertCircle, Eye, EyeOff, Clipboard, Check, Key, ShieldAlert, HeartPulse } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const { loginAdmin } = useAdminAuth();
  const router = useRouter();

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

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
      loginAdmin(res.data);
      router.push('/');
    } else {
      setErrorMsg(res.message || 'Unauthorized credentials. Access is restricted to clinic staff.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#1A0706] relative overflow-hidden font-sans text-xs">
      
      {/* Background vector glow grids */}
      <div className="absolute w-[600px] h-[600px] bg-[#55100D]/25 rounded-full blur-[140px] -top-60 -left-60 pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] bg-[#DD0200]/10 rounded-full blur-[120px] -bottom-40 -right-40 pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      {/* Left Panel: Information & Live Demo Access Directory */}
      <div className="md:w-1/2 p-8 md:p-16 flex flex-col justify-between relative z-10 border-b md:border-b-0 md:border-r border-white/5 space-y-12">
        
        {/* Brand Header */}
        <div className="flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#55100D]/10 border border-[#55100D]/20 flex items-center justify-center">
            <HeartPulse className="w-5 h-5 text-[#DD0200]" />
          </div>
          <div>
            <h2 className="text-lg font-black text-white leading-none">DR. Q.H. KHAN</h2>
            <p className="text-[9px] text-[#DD0200] font-extrabold tracking-widest uppercase mt-1">CLINIC MANAGEMENT PORTAL</p>
          </div>
        </div>

        {/* Informative Suite Features */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-tight">
              Enterprise Suite for Clinical Operations
            </h1>
            <p className="text-slate-400 font-medium leading-relaxed max-w-md">
              Secure digital EMR dashboard, active case register maintenance, consultation routing, and real-time patient inquiry management.
            </p>
          </div>

          <div className="space-y-3 font-semibold text-slate-300">
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Full Role-Based Access Control (RBAC) protecting all medical histories.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Direct routing of online booking queues & local shift timelines.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Cryptographic logs for security compliance audits.</span>
            </div>
          </div>
        </div>

        {/* Demo Credentials Panel */}
        <div className="bg-white/10 border border-white/15 rounded-2xl p-5 space-y-4 max-w-md shadow-xl">
          <div className="flex items-center gap-2 text-white border-b border-white/10 pb-2">
            <Key className="w-4.5 h-4.5 text-amber-400" />
            <h3 className="font-black text-sm tracking-wide text-white uppercase">Quick Access Credentials Directory</h3>
          </div>
          
          <div className="space-y-3 font-sans text-xs text-slate-200">
            
            {/* Super Admin */}
            <div className="bg-[#1A0706] p-3.5 rounded-xl border border-white/10 flex justify-between items-center gap-2">
              <div className="space-y-1">
                <p className="text-amber-400 font-black uppercase text-[9px] tracking-widest">Super Administrator</p>
                <p className="text-white mt-1"><span className="text-slate-350 font-bold">Email:</span> admin@drqhkhanclinic.com</p>
                <p className="text-white"><span className="text-slate-350 font-bold">Password:</span> Admin@DrQHKhan1958!</p>
              </div>
              <button
                onClick={() => handleCopy('admin@drqhkhanclinic.com', 'admin')}
                className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-white border border-white/10 shrink-0"
                title="Copy Email"
              >
                {copiedText === 'admin' ? <Check className="w-4 h-4 text-emerald-400" /> : <Clipboard className="w-4 h-4 text-slate-300" />}
              </button>
            </div>

            {/* Receptionist */}
            <div className="bg-[#1A0706] p-3.5 rounded-xl border border-white/10 flex justify-between items-center gap-2">
              <div className="space-y-1">
                <p className="text-amber-400 font-black uppercase text-[9px] tracking-widest">Reception Desk / Staff</p>
                <p className="text-white mt-1"><span className="text-slate-350 font-bold">Email:</span> staff@drqhkhanclinic.com</p>
                <p className="text-white"><span className="text-slate-350 font-bold">Password:</span> Staff@DrQHKhan1958!</p>
              </div>
              <button
                onClick={() => handleCopy('staff@drqhkhanclinic.com', 'staff')}
                className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-white border border-white/10 shrink-0"
                title="Copy Email"
              >
                {copiedText === 'staff' ? <Check className="w-4 h-4 text-emerald-400" /> : <Clipboard className="w-4 h-4 text-slate-300" />}
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Right Panel: Secure Form Box */}
      <div className="md:w-1/2 p-8 md:p-16 flex items-center justify-center relative z-10">
        
        <div className="w-full max-w-sm bg-[#131314]/40 border border-white/5 rounded-3xl p-8 shadow-2xl backdrop-blur-md space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-[#55100D]/20 border border-[#55100D]/30 text-[#DD0200] rounded-xl flex items-center justify-center mx-auto shadow-inner">
              <ShieldCheck className="w-6 h-6 text-[#DD0200]" />
            </div>
            <h2 className="text-lg font-black text-white tracking-tight">Staff Sign-In</h2>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Enter authorized credentials</p>
          </div>

          {errorMsg && (
            <div className="p-3 bg-rose-950/40 border border-rose-800/60 text-rose-300 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 font-bold text-slate-300">
            
            <div className="space-y-1.5">
              <label className="block text-slate-400 text-[10px] uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@drqhkhanclinic.com"
                  className="w-full pl-10 pr-3 py-3.5 bg-slate-950/80 border border-white/5 rounded-xl text-white placeholder:text-slate-700 focus:border-[#DD0200]/60 focus:ring-1 focus:ring-[#DD0200]/40 focus:outline-none transition-all font-semibold"
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
                  className="w-full pl-10 pr-10 py-3.5 bg-slate-950/80 border border-white/5 rounded-xl text-white placeholder:text-slate-700 focus:border-[#DD0200]/60 focus:ring-1 focus:ring-[#DD0200]/40 focus:outline-none transition-all font-semibold"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-500 hover:text-slate-300 transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-[#55100D] to-[#DD0200] hover:from-[#DD0200] hover:to-[#55100D] text-white font-extrabold text-xs rounded-xl shadow-lg transition-all hover:-translate-y-0.5 disabled:opacity-50 tracking-wider uppercase mt-2"
            >
              {loading ? 'Authenticating Staff...' : 'Access Admin Control Suite'}
            </button>

          </form>

          {/* Security disclaiming notice */}
          <div className="flex items-start gap-2 bg-[#55100D]/10 border border-[#55100D]/20 rounded-xl p-3 text-[10px] leading-relaxed text-rose-200">
            <ShieldAlert className="w-4.5 h-4.5 shrink-0 text-[#DD0200] mt-0.5" />
            <span>
              <strong>Security Protocol:</strong> All login sessions are audited. Unauthorized entry is log-flagged and subject to compliance auditing.
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}
