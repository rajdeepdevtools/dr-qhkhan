'use client';

import React, { useEffect, useState } from 'react';
import { adminApiClient } from '../../lib/api-client';
import { AdminSidebar } from '../../components/AdminSidebar';
import { AdminHeader } from '../../components/AdminHeader';
import { Search, Plus, UserPlus } from 'lucide-react';

export default function AdminPatientsPage() {
  const [patients, setPatients] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: 30,
    gender: 'Male',
    bloodGroup: 'B+',
    address: '',
    primaryDoctor: '',
  });

  const fetchPatients = async (query = '') => {
    const res = await adminApiClient(`/admin/patients?search=${encodeURIComponent(query)}`);
    if (res.success && res.data) setPatients(res.data);
  };

  useEffect(() => {
    fetchPatients(search);
    adminApiClient('/doctors').then((res) => {
      if (res.success && res.data) setDoctors(res.data);
    });
  }, [search]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await adminApiClient('/admin/patients', {
      method: 'POST',
      body: JSON.stringify(formData),
    });

    if (res.success) {
      setShowModal(false);
      fetchPatients();
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
              <h1 className="text-2xl font-bold text-white">Patient Records Directory</h1>
              <p className="text-xs text-slate-400">Search and manage patient IDs (HOSP-2026-XXXX)</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold text-xs rounded-xl shadow flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Create Patient Record
            </button>
          </div>

          {/* Search bar */}
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by Patient ID, Name, or Phone..."
              className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800/60 text-slate-400 border-b border-slate-800 uppercase font-semibold">
                  <th className="p-3">Patient ID</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Contact</th>
                  <th className="p-3">Gender / Age</th>
                  <th className="p-3">Primary Doctor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {patients.map((p) => (
                  <tr key={p._id} className="hover:bg-slate-800/40">
                    <td className="p-3 font-mono font-bold text-amber-400">{p.patientId}</td>
                    <td className="p-3 font-bold text-white">{p.name}</td>
                    <td className="p-3">{p.phone} <span className="text-slate-500 block">{p.email}</span></td>
                    <td className="p-3">{p.gender}, {p.age} Yrs</td>
                    <td className="p-3">{p.primaryDoctor?.name || 'Unassigned'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-md space-y-4 text-xs">
                <h3 className="font-bold text-white text-base">Create Patient Record</h3>
                <form onSubmit={handleCreate} className="space-y-3">
                  <input
                    type="text"
                    required
                    placeholder="Patient Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      placeholder="Age"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
                      className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white"
                    />
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="flex justify-end space-x-2 pt-2">
                    <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl">
                      Cancel
                    </button>
                    <button type="submit" className="px-4 py-2 bg-orange-600 text-white font-bold rounded-xl">
                      Save Record
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
