'use client';

import React, { useState } from 'react';
import { TreatmentCard } from '../../components/TreatmentCard';
import { treatmentsData } from '../../lib/clinicConfig';
import { Search, Filter, ShieldAlert } from 'lucide-react';

export default function TreatmentsPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(treatmentsData.map((t) => t.category)))];

  const filteredTreatments = treatmentsData.filter((t) => {
    const matchesSearch =
      t.nameEn.toLowerCase().includes(search.toLowerCase()) ||
      t.nameHi.includes(search) ||
      t.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-clinic-indigo/10 text-clinic-indigo text-xs font-bold">
          CLINICAL CONSULTATION DIRECTORY
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900">Conditions & Health Consultation Areas</h1>
        <p className="text-slate-600 text-sm">
          Browse conditions the clinic provides homoeopathic consultation support for.
        </p>
      </div>

      {/* Emergency Disclaimer Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 text-xs text-amber-900">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold">Important Medical Warning:</strong> We do NOT offer cure guarantees for cancer, brain tumors, appendicitis, or surgical emergencies. Emergency conditions require immediate specialized hospital emergency care.
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search condition (e.g., Psoriasis, Piles, Stricture)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-clinic-indigo focus:outline-none"
          />
        </div>

        <div className="flex items-center space-x-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <Filter className="w-4 h-4 text-slate-500 shrink-0" />
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-clinic-indigo text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Treatment Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {filteredTreatments.map((t, idx) => (
          <TreatmentCard key={idx} treatment={t} />
        ))}
      </div>

      {filteredTreatments.length === 0 && (
        <div className="text-center py-12 text-slate-500 text-sm">
          No conditions matching your search query. Try searching in English or Hindi.
        </div>
      )}
    </div>
  );
}
