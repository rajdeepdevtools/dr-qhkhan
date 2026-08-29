'use client';

import React, { useEffect, useState } from 'react';
import { adminApiClient } from '../../lib/api-client';
import { AdminSidebar } from '../../components/AdminSidebar';
import { AdminHeader } from '../../components/AdminHeader';
import { Star, Check, X } from 'lucide-react';

export default function AdminFeedbackPage() {
  const [feedbackList, setFeedbackList] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  const fetchFeedback = async () => {
    const res = await adminApiClient('/feedback/admin');
    if (res.success && res.data) setFeedbackList(res.data);
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    const res = await adminApiClient(`/feedback/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
    if (res.success) fetchFeedback();
  };

  const getCounts = (status: string) => {
    if (status === 'all') return feedbackList.length;
    return feedbackList.filter((f) => f.status === status).length;
  };

  const filteredFeedback = feedbackList.filter((f) => {
    if (statusFilter === 'all') return true;
    return f.status === statusFilter;
  });

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5 text-amber-400">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-3.5 h-3.5 ${
              i < rating ? 'fill-amber-400 text-amber-450' : 'text-slate-700'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader />
        <main className="p-6 space-y-6 flex-1 overflow-y-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">Patient Feedback Moderation</h1>
              <p className="text-xs text-slate-400">Review and moderate patient reviews before public display</p>
            </div>
          </div>

          {/* Tabs Filter Bar */}
          <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3 font-semibold text-xs">
            {(['all', 'pending', 'approved', 'rejected'] as const).map((tab) => {
              const active = statusFilter === tab;
              const count = getCounts(tab);
              return (
                <button
                  key={tab}
                  onClick={() => setStatusFilter(tab)}
                  className={`px-4 py-2 rounded-xl transition-all capitalize flex items-center gap-1.5 ${
                    active
                      ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md font-bold'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <span>{tab}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                      active ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Cards Grid */}
          {filteredFeedback.length === 0 ? (
            <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-2xl text-slate-500 font-medium text-xs">
              No feedback records found in this category.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
              {filteredFeedback.map((f) => (
                <div
                  key={f._id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between gap-4 hover:border-slate-700 transition-colors shadow-sm"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-white text-sm">{f.patientName}</h3>
                        <div className="mt-1">{renderStars(f.rating)}</div>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                          f.status === 'approved'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : f.status === 'rejected'
                            ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                            : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        }`}
                      >
                        {f.status}
                      </span>
                    </div>
                    <p className="text-slate-300 leading-relaxed text-xs italic">
                      "{f.message}"
                    </p>
                  </div>
                  <div className="flex justify-end gap-2 pt-3 border-t border-slate-800/80">
                    {f.status !== 'approved' && (
                      <button
                        onClick={() => updateStatus(f._id, 'approved')}
                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve</span>
                      </button>
                    )}
                    {f.status !== 'rejected' && (
                      <button
                        onClick={() => updateStatus(f._id, 'rejected')}
                        className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
