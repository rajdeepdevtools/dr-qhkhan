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
              <h1 className="text-2xl font-bold text-white">Centralized Clinic Configuration</h1>
              <p className="text-xs text-slate-400">Modify clinic timings, helpline numbers, address, and medical disclaimers</p>
            </div>
          </div>

          {savedMsg && (
            <div className="p-3 bg-emerald-950 border border-emerald-800 text-emerald-300 rounded-xl text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>Clinic configuration updated successfully!</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Clinic Name</label>
                <input
                  type="text"
                  value={settings.clinicName}
                  onChange={(e) => setSettings({ ...settings, clinicName: e.target.value })}
                  className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Established Year</label>
                <input
                  type="number"
                  value={settings.establishedYear}
                  onChange={(e) => setSettings({ ...settings, establishedYear: parseInt(e.target.value) || 1958 })}
                  className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Address & Location</label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white"
              />
            </div>

            {/* Timings */}
            <div className="p-4 bg-slate-800/60 border border-slate-700 rounded-xl space-y-3">
              <h4 className="font-bold text-amber-300 text-xs">Operating Clinic Timings</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Weekday Morning</label>
                  <input
                    type="text"
                    value={settings.timings?.weekdayMorning}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        timings: { ...settings.timings, weekdayMorning: e.target.value },
                      })
                    }
                    className="w-full p-2 bg-slate-800 border border-slate-700 rounded text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Weekday Evening</label>
                  <input
                    type="text"
                    value={settings.timings?.weekdayEvening}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        timings: { ...settings.timings, weekdayEvening: e.target.value },
                      })
                    }
                    className="w-full p-2 bg-slate-800 border border-slate-700 rounded text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Sunday Timing</label>
                  <input
                    type="text"
                    value={settings.timings?.sundayTiming}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        timings: { ...settings.timings, sundayTiming: e.target.value },
                      })
                    }
                    className="w-full p-2 bg-slate-800 border border-slate-700 rounded text-white"
                  />
                </div>
              </div>
            </div>

            {/* Helplines */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Helpline Numbers (Comma Separated)</label>
              <input
                type="text"
                value={settings.helplines?.join(', ')}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    helplines: e.target.value.split(',').map((h) => h.trim()),
                  })
                }
                className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Medical Disclaimer Text</label>
              <textarea
                rows={2}
                value={settings.disclaimerText}
                onChange={(e) => setSettings({ ...settings, disclaimerText: e.target.value })}
                className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold rounded-xl shadow flex items-center gap-2"
            >
              <Save className="w-4 h-4" /> Save Clinic Configuration
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}
