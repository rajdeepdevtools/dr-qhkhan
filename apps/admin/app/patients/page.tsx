'use client';

import React, { useEffect, useState } from 'react';
import { adminApiClient } from '../../lib/api-client';
import { AdminShell } from '../../components/AdminShell';
import { Search, Plus, Edit3, Trash2 } from 'lucide-react';

export default function AdminPatientsPage() {
  const [patients, setPatients] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: 30,
    gender: 'Male',
    bloodGroup: '',
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

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      age: 30,
      gender: 'Male',
      bloodGroup: '',
      address: '',
      primaryDoctor: '',
    });
    setShowModal(true);
  };

  const handleOpenEdit = (p: any) => {
    setEditingId(p._id);
    setFormData({
      name: p.name || '',
      email: p.email || '',
      phone: p.phone || '',
      age: p.age || 30,
      gender: p.gender || 'Male',
      bloodGroup: p.bloodGroup || '',
      address: p.address || '',
      primaryDoctor: p.primaryDoctor ? (typeof p.primaryDoctor === 'object' ? p.primaryDoctor._id : p.primaryDoctor) : '',
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const endpoint = editingId ? `/admin/patients/${editingId}` : '/admin/patients';

    const res = await adminApiClient(endpoint, {
      method,
      body: JSON.stringify(formData),
    });

    if (res.success) {
      setShowModal(false);
      fetchPatients(search);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this patient record?')) return;
    const res = await adminApiClient(`/admin/patients/${id}`, { method: 'DELETE' });
    if (res.success) {
      fetchPatients(search);
    }
  };

  return (
    <AdminShell>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Patient Records Directory</h1>
          <p className="text-xs text-slate-500">Search and manage patient IDs (HOSP-2026-XXXX)</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="px-4 py-2 bg-gradient-to-r from-[#55100D] to-[#DD0200] hover:from-[#DD0200] hover:to-[#55100D] text-white font-bold text-xs rounded-xl shadow flex items-center gap-1.5 transition-all shrink-0"
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
          className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#DD0200]/30 font-medium"
        />
      </div>

      {/* Table Container */}
      <div className="bg-white border border-[#D9D9D9] rounded-2xl overflow-x-auto text-xs font-medium shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-400 border-b border-slate-200 uppercase font-semibold">
                  <th className="p-3">Patient ID</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Contact</th>
                  <th className="p-3">Gender / Age</th>
                  <th className="p-3">Blood Group</th>
                  <th className="p-3">Address</th>
                  <th className="p-3">Primary Doctor</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                {patients.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-4 text-center text-slate-500">No patient records found.</td>
                  </tr>
                ) : (
                  patients.map((p) => (
                    <tr key={p._id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-mono font-bold text-amber-400">{p.patientId}</td>
                      <td className="p-3 font-bold text-slate-900">{p.name}</td>
                      <td className="p-3">
                        <div>{p.phone}</div>
                        <div className="text-slate-500 text-[10px]">{p.email}</div>
                      </td>
                      <td className="p-3">{p.gender}, {p.age} Yrs</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 font-bold border border-rose-500/20">
                          {p.bloodGroup || 'N/A'}
                        </span>
                      </td>
                      <td className="p-3 max-w-[160px] truncate" title={p.address}>
                        {p.address || <span className="text-slate-500 italic">Not Provided</span>}
                      </td>
                      <td className="p-3">
                        {p.primaryDoctor ? (
                          <div>
                            <div className="font-semibold text-slate-800">{p.primaryDoctor.name}</div>
                            <div className="text-[10px] text-slate-500">{p.primaryDoctor.specialization}</div>
                          </div>
                        ) : (
                          <span className="text-slate-500 italic">Unassigned</span>
                        )}
                      </td>
                      <td className="p-3 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="p-1.5 bg-slate-50 text-slate-600 rounded hover:bg-slate-700 hover:text-white transition-colors"
                          title="Edit Patient Record"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(p._id)}
                          className="p-1.5 bg-rose-950/30 text-rose-400 rounded hover:bg-rose-900 hover:text-white transition-colors"
                          title="Delete Patient Record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
              <div className="bg-white shadow-sm border border-slate-200 rounded-2xl p-6 w-full max-w-md space-y-4 text-xs">
                <h3 className="font-bold text-slate-800 text-base">
                  {editingId ? 'Edit Patient Record' : 'Create Patient Record'}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Patient Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Email</label>
                    <input
                      type="email"
                      required
                      placeholder="patient@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Phone</label>
                    <input
                      type="tel"
                      required
                      placeholder="9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Age</label>
                      <input
                        type="number"
                        placeholder="Age"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Gender</label>
                      <select
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Blood Group</label>
                      <select
                        value={formData.bloodGroup}
                        onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      >
                        <option value="">Blood Group (Optional)</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Primary Doctor</label>
                      <select
                        value={formData.primaryDoctor}
                        onChange={(e) => setFormData({ ...formData, primaryDoctor: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      >
                        <option value="">Doctor (Optional)</option>
                        {doctors.map((d) => (
                          <option key={d._id} value={d._id}>
                            {d.name} ({d.specialization})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Address</label>
                    <textarea
                      rows={2}
                      placeholder="Patient Residence Address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 resize-none"
                    />
                  </div>
                  <div className="flex justify-end space-x-2 pt-2">
                    <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-slate-50 hover:bg-slate-700 text-slate-600 rounded-xl transition-colors font-bold">
                      Cancel
                    </button>
                    <button type="submit" className="px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold rounded-xl transition-colors shadow">
                      {editingId ? 'Save Changes' : 'Save Record'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
    </AdminShell>
  );
}
