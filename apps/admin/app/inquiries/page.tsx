'use client';

import React, { useEffect, useState } from 'react';
import { adminApiClient } from '../../lib/api-client';
import { AdminSidebar } from '../../components/AdminSidebar';
import { AdminHeader } from '../../components/AdminHeader';
import { Check, X, Phone, Trash2, HelpCircle, MessageSquare, AlertCircle } from 'lucide-react';

export default function AdminInquiriesPage() {
  const [inquiriesList, setInquiriesList] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'resolved' | 'ignored'>('all');
  const [loading, setLoading] = useState(true);

  const fetchInquiries = async () => {
    setLoading(true);
    const res = await adminApiClient('/inquiries/admin');
    if (res.success && res.data) {
      setInquiriesList(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    const res = await adminApiClient(`/inquiries/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
    if (res.success) fetchInquiries();
  };

  const deleteInquiry = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this inquiry permanently?')) return;
    const res = await adminApiClient(`/inquiries/${id}`, {
      method: 'DELETE',
    });
    if (res.success) fetchInquiries();
  };

  const getCounts = (status: string) => {
    if (status === 'all') return inquiriesList.length;
    return inquiriesList.filter((i) => i.status === status).length;
  };

  const filteredInquiries = inquiriesList.filter((i) => {
    if (statusFilter === 'all') return true;
    return i.status === statusFilter;
  });

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader />
        <main className="p-6 space-y-6 flex-1 overflow-y-auto">
          
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-black text-[#1A0706]">General Inquiries Portal</h1>
              <p className="text-xs text-slate-500 font-bold">View and respond to general contact form submissions from patients</p>
            </div>
          </div>

          {/* Tabs Filter Bar */}
          <div className="flex flex-wrap gap-2 border-b border-[#D9D9D9] pb-3 font-semibold text-xs">
            {(['all', 'pending', 'resolved', 'ignored'] as const).map((tab) => {
              const active = statusFilter === tab;
              const count = getCounts(tab);
              return (
                <button
                  key={tab}
                  onClick={() => setStatusFilter(tab)}
                  className={`px-4 py-2 rounded-xl transition-all capitalize flex items-center gap-1.5 ${
                    active
                      ? 'bg-gradient-to-r from-[#55100D] to-[#DD0200] text-white shadow-md font-black'
                      : 'bg-white border border-[#D9D9D9] text-slate-500 hover:text-[#1A0706] font-bold'
                  }`}
                >
                  <span>{tab}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                      active ? 'bg-white/20 text-white' : 'bg-slate-100 border border-[#D9D9D9] text-slate-500'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Grid View */}
          {loading ? (
            <div className="p-12 text-center bg-white border border-[#D9D9D9] rounded-2xl text-slate-500 text-xs font-semibold">
              Loading inquiries...
            </div>
          ) : filteredInquiries.length === 0 ? (
            <div className="p-12 text-center bg-white border border-[#D9D9D9] rounded-2xl text-slate-500 font-semibold text-xs">
              No inquiries found in this category.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
              {filteredInquiries.map((inquiry) => (
                <div
                  key={inquiry._id}
                  className="bg-white border border-[#D9D9D9] rounded-2xl p-5 flex flex-col justify-between gap-4 hover:border-[#55100D]/50 transition-colors shadow-sm"
                >
                  <div className="space-y-3">
                    
                    {/* Header */}
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-[#1A0706] text-sm">{inquiry.name}</h3>
                        <p className="text-[10px] text-slate-500 mt-0.5 font-bold uppercase tracking-wider">
                          Subject: {inquiry.subject}
                        </p>
                      </div>
                      <span
                        className={`px-2.5 py-0.5 rounded text-[9px] font-black uppercase border ${
                          inquiry.status === 'resolved'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-250'
                            : inquiry.status === 'ignored'
                            ? 'bg-slate-50 text-slate-600 border-slate-200'
                            : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}
                      >
                        {inquiry.status}
                      </span>
                    </div>

                    {/* Message Body */}
                    <div className="bg-[#55100D]/5 border border-[#55100D]/10 rounded-xl p-3 text-[#1A0706] leading-relaxed font-bold italic text-[11px]">
                      "{inquiry.message}"
                    </div>

                    {/* Details block */}
                    <div className="flex flex-wrap items-center gap-4 text-[10px] text-slate-500 font-bold pt-1">
                      <a
                        href={`tel:${inquiry.phone}`}
                        className="flex items-center gap-1 hover:text-[#DD0200] transition-colors text-[#55100D]"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>{inquiry.phone}</span>
                      </a>
                      <span className="text-slate-350 font-normal">•</span>
                      <span>Submitted: {new Date(inquiry.createdAt).toLocaleDateString()}</span>
                    </div>

                  </div>

                  {/* Actions footer */}
                  <div className="flex justify-between items-center pt-3 border-t border-slate-200/60">
                    <button
                      onClick={() => deleteInquiry(inquiry._id)}
                      className="p-1.5 bg-white hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-xl transition-all border border-[#D9D9D9]"
                      title="Delete permanently"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="flex gap-2">
                      {inquiry.status !== 'resolved' && (
                        <button
                          onClick={() => updateStatus(inquiry._id, 'resolved')}
                          className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Resolve</span>
                        </button>
                      )}
                      {inquiry.status !== 'ignored' && (
                        <button
                          onClick={() => updateStatus(inquiry._id, 'ignored')}
                          className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-[#D9D9D9] rounded-xl font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Ignore</span>
                        </button>
                      )}
                    </div>
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
