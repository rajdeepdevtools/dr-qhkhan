'use client';

import React, { useEffect, useState } from 'react';
import { adminApiClient } from '../../lib/api-client';
import { AdminSidebar } from '../../components/AdminSidebar';
import { AdminHeader } from '../../components/AdminHeader';
import { Plus, Edit3, Trash2 } from 'lucide-react';

export default function AdminStaffPage() {
  const [staffList, setStaffList] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

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

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({
      name: '',
      email: '',
      password: '',
      phone: '',
      shift: 'General Shift (8:00 AM - 8:00 PM)',
    });
    setErrorMessage('');
    setShowModal(true);
  };

  const handleOpenEdit = (stf: any) => {
    setEditingId(stf._id);
    setFormData({
      name: stf.name || '',
      email: stf.user?.email || '',
      password: '',
      phone: stf.phone || '',
      shift: stf.shift || 'General Shift (8:00 AM - 8:00 PM)',
    });
    setErrorMessage('');
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const method = editingId ? 'PUT' : 'POST';
    const endpoint = editingId ? `/staff/${editingId}` : '/staff';

    const res = await adminApiClient(endpoint, {
      method,
      body: JSON.stringify(formData),
    });

    if (res.success) {
      setShowModal(false);
      fetchStaff();
    } else {
      setErrorMessage(res.message || 'Error saving staff account');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this staff user account?')) return;
    const res = await adminApiClient(`/staff/${id}`, { method: 'DELETE' });
    if (res.success) {
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
              <h1 className="text-2xl font-bold text-slate-800">Receptionist & Staff Account Management</h1>
              <p className="text-xs text-slate-500">Create login credentials for clinic reception desk staff</p>
            </div>
            <button
              onClick={handleOpenCreate}
              className="px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs rounded-xl shadow flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4" /> Create Receptionist User
            </button>
          </div>

          {/* Table */}
          <div className="bg-white shadow-sm border border-slate-200 rounded-2xl overflow-hidden text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-400 border-b border-slate-200 uppercase font-semibold">
                  <th className="p-3">Employee ID</th>
                  <th className="p-3">Staff Name</th>
                  <th className="p-3">Login Email</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Assigned Shift</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                {staffList.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-4 text-center text-slate-500">No staff user accounts found.</td>
                  </tr>
                ) : (
                  staffList.map((stf) => (
                    <tr key={stf._id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-mono font-bold text-amber-400">{stf.employeeId}</td>
                      <td className="p-3 font-bold text-slate-900">{stf.name}</td>
                      <td className="p-3">{stf.user?.email || 'N/A'}</td>
                      <td className="p-3">{stf.phone}</td>
                      <td className="p-3">{stf.shift}</td>
                      <td className="p-3 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEdit(stf)}
                          className="p-1.5 bg-slate-50 text-slate-600 rounded hover:bg-slate-700 hover:text-white transition-colors"
                          title="Edit Staff Account"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(stf._id)}
                          className="p-1.5 bg-rose-950/30 text-rose-400 rounded hover:bg-rose-900 hover:text-white transition-colors"
                          title="Delete Staff Account"
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
                  {editingId ? 'Edit Staff Account' : 'Create Receptionist Login Account'}
                </h3>
                {errorMessage && (
                  <div className="p-3 bg-rose-950/40 border border-rose-900 rounded-xl text-rose-400 font-bold">
                    {errorMessage}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Staff Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Singh"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                    />
                  </div>

                  {!editingId && (
                    <>
                      <div>
                        <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Staff Login Email</label>
                        <input
                          type="email"
                          required
                          placeholder="staff@drqhkhanclinic.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Initial Password</label>
                        <input
                          type="password"
                          required
                          minLength={8}
                          placeholder="Minimum 8 characters"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Contact Phone</label>
                    <input
                      type="tel"
                      required
                      placeholder="9135404090"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Assigned Shift</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. General Shift (8:00 AM - 8:00 PM)"
                      value={formData.shift}
                      onChange={(e) => setFormData({ ...formData, shift: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                    />
                  </div>

                  <div className="flex justify-end space-x-2 pt-2">
                    <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-slate-50 hover:bg-slate-700 text-slate-600 rounded-xl font-bold transition-colors">
                      Cancel
                    </button>
                    <button type="submit" className="px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold rounded-xl shadow transition-colors">
                      {editingId ? 'Save Changes' : 'Create Credentials'}
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
