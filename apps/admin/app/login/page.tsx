'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminApiClient } from '../../lib/api-client';
import { useAdminAuth } from '../../lib/admin-auth';
import { ShieldCheck, Lock, Mail, AlertCircle, Eye, EyeOff } from 'lucide-react';

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
      loginAdmin(res.data);
      router.push('/');
    } else {
      setErrorMsg(res.message || 'Unauthorized admin or staff credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-950 relative overflow-hidden">
      
      {/* Ambient glowing light circles */}
      <div className="absolute w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[120px] -top-40 -left-40 pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] -bottom-40 -right-40 pointer-events-none" />
      
      {/* Subtle background dot grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      {/* Main Card Container */}
      <div className="w-full max-w-md bg-slate-900/60 border border-slate-800/80 rounded-3xl p-8 shadow-2xl backdrop-blur-md space-y-6 relative z-10">
        
        {/* Header Block */}
        <div className="text-center space-y-3">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-orange-500/20 text-orange-500 rounded-xl flex items-center justify-center mx-auto shadow-inner">
            <ShieldCheck className="w-6 h-6 text-orange-500" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white tracking-tight">DR. Q.H. KHAN</h1>
            <p className="text-[10px] text-orange-400 font-bold tracking-widest uppercase mt-0.5">Clinic Management Suite</p>
          </div>
          <p className="text-[10px] text-slate-500 font-medium">Authorized personnel only • Secure login portal</p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-rose-950/40 border border-rose-800/60 text-rose-300 rounded-xl text-xs flex items-center gap-2 animate-shake">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-450" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold">
          
          {/* Email field */}
          <div className="space-y-1">
            <label className="block text-slate-350">Admin Email *</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@drqhkhanclinic.com"
                className="w-full pl-10 pr-3 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder:text-slate-600 focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/40 focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Password field */}
          <div className="space-y-1">
            <label className="block text-slate-350">Password *</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder:text-slate-600 focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/40 focus:outline-none transition-all"
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-orange-950/20 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-1.5 disabled:opacity-50"
          >
            {loading ? 'Authenticating Credentials...' : 'Access Admin Suite'}
          </button>

        </form>

        {/* Security Notice Footer */}
        <p className="text-[9px] text-slate-600 text-center font-mono uppercase tracking-wider mt-4">
          All sign-in attempts are audited for clinic security.
        </p>

      </div>
    </div>
  );
}
