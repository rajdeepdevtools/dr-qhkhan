'use client';

import React, { useEffect, useState } from 'react';
import { adminApiClient } from '../../lib/api-client';
import { AdminSidebar } from '../../components/AdminSidebar';
import { AdminHeader } from '../../components/AdminHeader';
import { CheckCircle2, Save } from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<any>({
    clinicName: 'DR. Q.H. KHAN CLASSICAL HOMOEOPATHIC CLINIC',
    establishedYear: 1958,
    address: 'Nagmatia Road, Gaya, Bihar, India',
    helplines: ['9709786669', '9135404090', '9097211989'],
    whatsappNumber: '9135404090',
    timings: {
      weekdayMorning: '8:00 AM – 12:00 PM',
      weekdayEvening: '2:00 PM – 8:00 PM',
      sundayTiming: 'OPEN (7:00 AM – 12:00 PM & 2:00 PM – 8:00 PM)',
      holidayNote: 'Clinic remains open on Sundays and major public holidays.',
    },
    disclaimerText:
      'The information provided on this website is for general informational purposes and does not replace professional medical diagnosis, treatment or emergency care.',
  });

  const [savedMsg, setSavedMsg] = useState(false);

  useEffect(() => {
    adminApiClient('/settings').then((res) => {
      if (res.success && res.data) setSettings(res.data);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await adminApiClient('/settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    });

    if (res.success) {
      setSavedMsg(true);
      setTimeout(() => setSavedMsg(false), 3000);
    }
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader />
        <main className="p-6 space-y-6 flex-1 overflow-y-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-black text-[#1A0706]">Centralized Clinic Configuration</h1>
              <p className="text-xs text-slate-500 font-bold">Modify clinic timings, helpline numbers, address, and medical disclaimers</p>
            </div>
          </div>

          {savedMsg && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-250 text-emerald-800 rounded-xl text-xs flex items-center gap-2 font-bold">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>Clinic configuration updated successfully!</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white border border-[#D9D9D9] rounded-2xl p-6 space-y-6 text-xs font-bold text-[#1A0706] shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-500 mb-1.5 uppercase tracking-wider text-[10px]">Clinic Name</label>
                <input
                  type="text"
                  value={settings.clinicName}
                  onChange={(e) => setSettings({ ...settings, clinicName: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-[#D9D9D9] rounded-xl text-[#1A0706] placeholder-slate-400 focus:outline-none focus:border-[#DD0200] focus:ring-1 focus:ring-[#DD0200]/25 transition-all font-bold"
                />
              </div>
              <div>
                <label className="block text-slate-500 mb-1.5 uppercase tracking-wider text-[10px]">Established Year</label>
                <input
                  type="number"
                  value={settings.establishedYear}
                  onChange={(e) => setSettings({ ...settings, establishedYear: parseInt(e.target.value) || 1958 })}
                  className="w-full p-3 bg-slate-50 border border-[#D9D9D9] rounded-xl text-[#1A0706] placeholder-slate-400 focus:outline-none focus:border-[#DD0200] focus:ring-1 focus:ring-[#DD0200]/25 transition-all font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-500 mb-1.5 uppercase tracking-wider text-[10px]">Address & Location</label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-[#D9D9D9] rounded-xl text-[#1A0706] placeholder-slate-400 focus:outline-none focus:border-[#DD0200] focus:ring-1 focus:ring-[#DD0200]/25 transition-all font-bold"
              />
            </div>

            {/* Timings */}
            <div className="p-5 bg-[#55100D]/5 border border-[#55100D]/10 rounded-xl space-y-4">
              <h4 className="font-black text-[#55100D] text-xs uppercase tracking-wider">Operating Clinic Timings</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[#55100D]/80 mb-1 text-[10px] uppercase tracking-wider font-extrabold">Weekday Morning</label>
                  <input
                    type="text"
                    value={settings.timings?.weekdayMorning}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        timings: { ...settings.timings, weekdayMorning: e.target.value },
                      })
                    }
                    className="w-full p-2.5 bg-white border border-[#D9D9D9] rounded-lg text-[#1A0706] focus:outline-none focus:border-[#DD0200] focus:ring-1 focus:ring-[#DD0200]/25 font-bold transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[#55100D]/80 mb-1 text-[10px] uppercase tracking-wider font-extrabold">Weekday Evening</label>
                  <input
                    type="text"
                    value={settings.timings?.weekdayEvening}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        timings: { ...settings.timings, weekdayEvening: e.target.value },
                      })
                    }
                    className="w-full p-2.5 bg-white border border-[#D9D9D9] rounded-lg text-[#1A0706] focus:outline-none focus:border-[#DD0200] focus:ring-1 focus:ring-[#DD0200]/25 font-bold transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[#55100D]/80 mb-1 text-[10px] uppercase tracking-wider font-extrabold">Sunday Timing</label>
                  <input
                    type="text"
                    value={settings.timings?.sundayTiming}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        timings: { ...settings.timings, sundayTiming: e.target.value },
                      })
                    }
                    className="w-full p-2.5 bg-white border border-[#D9D9D9] rounded-lg text-[#1A0706] focus:outline-none focus:border-[#DD0200] focus:ring-1 focus:ring-[#DD0200]/25 font-bold transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Helplines */}
            <div>
              <label className="block text-slate-500 mb-1.5 uppercase tracking-wider text-[10px]">Helpline Numbers (Comma Separated)</label>
              <input
                type="text"
                value={settings.helplines?.join(', ')}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    helplines: e.target.value.split(',').map((h) => h.trim()),
                  })
                }
                className="w-full p-3 bg-slate-50 border border-[#D9D9D9] rounded-xl text-[#1A0706] placeholder-slate-400 focus:outline-none focus:border-[#DD0200] focus:ring-1 focus:ring-[#DD0200]/25 transition-all font-bold"
              />
            </div>

            <div>
              <label className="block text-slate-500 mb-1.5 uppercase tracking-wider text-[10px]">Medical Disclaimer Text</label>
              <textarea
                rows={3}
                value={settings.disclaimerText}
                onChange={(e) => setSettings({ ...settings, disclaimerText: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-[#D9D9D9] rounded-xl text-[#1A0706] placeholder-slate-400 focus:outline-none focus:border-[#DD0200] focus:ring-1 focus:ring-[#DD0200]/25 transition-all font-bold"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3.5 bg-gradient-to-r from-[#55100D] to-[#DD0200] hover:from-[#DD0200] hover:to-[#55100D] text-white font-black text-xs rounded-xl shadow-md flex items-center gap-2 transition-all hover:-translate-y-0.5 tracking-wider uppercase"
            >
              <Save className="w-4 h-4" /> Save Clinic Configuration
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}
