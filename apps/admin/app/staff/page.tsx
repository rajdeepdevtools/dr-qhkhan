'use client';

import React, { useEffect, useState } from 'react';
import { adminApiClient } from '../../lib/api-client';
import { AdminSidebar } from '../../components/AdminSidebar';
import { AdminHeader } from '../../components/AdminHeader';
import { Plus, UserCog, CheckCircle2 } from 'lucide-react';

export default function AdminStaffPage() {
  const [staffList, setStaffList] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    shift: 'General Shift (8:00 AM - 8:00 PM)',
  });

  const fetchStaff = async () => {
    const res = await adminApiClient('/staff');
    if (res.success && res.data) setStaffList(res.data);
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await adminApiClient('/staff', {
      method: 'POST',
      body: JSON.stringify(formData),
    });

    if (res.success) {
      setShowModal(false);
      fetchStaff();
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
              <h1 className="text-2xl font-bold text-white">Receptionist & Staff Account Management</h1>
              <p className="text-xs text-slate-400">Create login credentials for clinic reception desk staff</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold text-xs rounded-xl shadow flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Create Receptionist User
            </button>
          </div>

          {/* Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800/60 text-slate-400 border-b border-slate-800 uppercase font-semibold">
                  <th className="p-3">Employee ID</th>
                  <th className="p-3">Staff Name</th>
                  <th className="p-3">Login Email</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Assigned Shift</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {staffList.map((stf) => (
                  <tr key={stf._id} className="hover:bg-slate-800/40">
                    <td className="p-3 font-mono font-bold text-amber-400">{stf.employeeId}</td>
                    <td className="p-3 font-bold text-white">{stf.name}</td>
                    <td className="p-3">{stf.user?.email || 'N/A'}</td>
                    <td className="p-3">{stf.phone}</td>
                    <td className="p-3">{stf.shift}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-md space-y-4 text-xs">
                <h3 className="font-bold text-white text-base">Create Receptionist Login Account</h3>
                <form onSubmit={handleCreate} className="space-y-3">
                  <div>
                    <label className="block text-slate-400 mb-1">Staff Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Singh"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Staff Login Email</label>
                    <input
                      type="email"
                      required
                      placeholder="staff@drqhkhanclinic.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Initial Password</label>
                    <input
                      type="password"
                      required
                      minLength={8}
                      placeholder="Minimum 8 characters"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Contact Phone</label>
                    <input
                      type="tel"
                      required
                      placeholder="9135404090"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white"
                    />
                  </div>

                  <div className="flex justify-end space-x-2 pt-2">
                    <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl">
                      Cancel
                    </button>
                    <button type="submit" className="px-4 py-2 bg-orange-600 text-white font-bold rounded-xl">
                      Create Credentials
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
