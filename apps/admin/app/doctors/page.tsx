'use client';

import React, { useEffect, useState } from 'react';
import { adminApiClient } from '../../lib/api-client';
import { AdminSidebar } from '../../components/AdminSidebar';
import { AdminHeader } from '../../components/AdminHeader';
import { Plus, Edit3, Trash2 } from 'lucide-react';

export default function AdminDoctorsPage() {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    degrees: 'B.H.M.S.',
    registrationNumber: '',
    specialization: 'Classical Homoeopathy',
    designation: 'Senior Consultant & Homoeopath',
    bio: 'Experienced Homoeopathic Practitioner dedicated to classical healing.',
    days: 'Monday - Saturday',
    morning: '8:00 AM - 12:00 PM',
    evening: '2:00 PM - 8:00 PM',
  });

  const fetchDoctors = async () => {
    const res = await adminApiClient('/doctors');
    if (res.success && res.data) setDoctors(res.data);
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({
      name: '',
      email: '',
      password: '',
      degrees: 'B.H.M.S.',
      registrationNumber: '',
      specialization: 'Classical Homoeopathy',
      designation: 'Senior Consultant & Homoeopath',
      bio: 'Experienced Homoeopathic Practitioner dedicated to classical healing.',
      days: 'Monday - Saturday',
      morning: '8:00 AM - 12:00 PM',
      evening: '2:00 PM - 8:00 PM',
    });
    setErrorMessage('');
    setShowModal(true);
  };

  const handleOpenEdit = (doc: any) => {
    setEditingId(doc._id);
    setFormData({
      name: doc.name || '',
      email: doc.user?.email || '',
      password: '',
      degrees: doc.degrees ? doc.degrees.join(', ') : 'B.H.M.S.',
      registrationNumber: doc.registrationNumber || '',
      specialization: doc.specialization || 'Classical Homoeopathy',
      designation: doc.designation || 'Senior Consultant',
      bio: doc.bio || '',
      days: doc.clinicSchedule?.days?.join(', ') || 'Monday - Saturday',
      morning: doc.clinicSchedule?.morning || '8:00 AM - 12:00 PM',
      evening: doc.clinicSchedule?.evening || '2:00 PM - 8:00 PM',
    });
    setErrorMessage('');
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const degreesArray = formData.degrees.split(',').map((d) => d.trim()).filter(Boolean);
    const daysArray = formData.days.split(',').map((d) => d.trim()).filter(Boolean);

    const payload: any = {
      name: formData.name,
      degrees: degreesArray,
      registrationNumber: formData.registrationNumber,
      specialization: formData.specialization,
      designation: formData.designation,
      bio: formData.bio,
      clinicSchedule: {
        days: daysArray,
        morning: formData.morning,
        evening: formData.evening,
      },
    };

    if (formData.email) payload.email = formData.email;
    if (formData.password) payload.password = formData.password;

    const method = editingId ? 'PUT' : 'POST';
    const endpoint = editingId ? `/admin/doctors/${editingId}` : '/admin/doctors';

    const res = await adminApiClient(endpoint, {
      method,
      body: JSON.stringify(payload),
    });

    if (res.success) {
      setShowModal(false);
      fetchDoctors();
    } else {
      setErrorMessage(res.message || 'Error saving doctor profile');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this doctor profile?')) return;
    const res = await adminApiClient(`/admin/doctors/${id}`, { method: 'DELETE' });
    if (res.success) {
      fetchDoctors();
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
              <h1 className="text-2xl font-bold text-slate-800">Clinic Doctor Directory</h1>
              <p className="text-xs text-slate-500">Manage doctor profiles, qualifications, and schedules</p>
            </div>
            <button
              onClick={handleOpenCreate}
              className="px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs rounded-xl shadow flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4" /> Add Doctor Profile
            </button>
          </div>

          <div className="bg-white shadow-sm border border-slate-200 rounded-2xl overflow-hidden text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase font-bold">
                  <th className="p-3">Doctor Name</th>
                  <th className="p-3">Designation</th>
                  <th className="p-3">Registration Number</th>
                  <th className="p-3">Specialization</th>
                  <th className="p-3">Degrees</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
                {doctors.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-4 text-center text-slate-500">No doctor profiles found.</td>
                  </tr>
                ) : (
                  doctors.map((d) => (
                    <tr key={d._id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-bold text-slate-900">{d.name}</td>
                      <td className="p-3 font-bold text-amber-600">{d.designation}</td>
                      <td className="p-3 font-mono font-semibold text-slate-700">{d.registrationNumber || 'None Assigned'}</td>
                      <td className="p-3">{d.specialization}</td>
                      <td className="p-3">{d.degrees?.join(', ')}</td>
                      <td className="p-3 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEdit(d)}
                          className="p-1.5 bg-slate-50 text-slate-600 rounded hover:bg-slate-700 hover:text-white transition-colors"
                          title="Edit Doctor Profile"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(d._id)}
                          className="p-1.5 bg-rose-950/30 text-rose-400 rounded hover:bg-rose-900 hover:text-white transition-colors"
                          title="Delete Doctor Profile"
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
              <div className="bg-white shadow-sm border border-slate-200 rounded-2xl p-6 w-full max-w-lg space-y-4 text-xs">
                <h3 className="font-bold text-slate-800 text-base">
                  {editingId ? 'Edit Doctor Profile' : 'Add Doctor Profile'}
                </h3>
                {errorMessage && (
                  <div className="p-3 bg-rose-950/40 border border-rose-900 rounded-xl text-rose-400 font-bold">
                    {errorMessage}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Doctor Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Dr. Q.H. Khan"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Registration No.</label>
                      <input
                        type="text"
                        placeholder="e.g. REG-1958-BIH"
                        value={formData.registrationNumber}
                        onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Login Email</label>
                      <input
                        type="email"
                        required
                        placeholder="doctor@drqhkhanclinic.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">
                        Password {editingId && <span className="text-slate-500 normal-case">(Leave blank to keep current)</span>}
                      </label>
                      <input
                        type="password"
                        required={!editingId}
                        minLength={8}
                        placeholder={editingId ? "Leave blank to keep current" : "Min 8 chars"}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Designation</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Senior Homoeopath"
                        value={formData.designation}
                        onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Specialization</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Classical Homoeopathy"
                        value={formData.specialization}
                        onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Degrees (Comma Separated)</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. B.H.M.S., M.D. (Hom.)"
                      value={formData.degrees}
                      onChange={(e) => setFormData({ ...formData, degrees: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Doctor Bio</label>
                    <textarea
                      rows={2}
                      required
                      placeholder="Brief doctor bio and clinical experience..."
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 resize-none"
                    />
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                    <span className="text-[10px] text-amber-600 uppercase font-bold block">OPD Schedule Config</span>
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="text"
                        placeholder="Days (e.g. Mon-Sat)"
                        value={formData.days}
                        onChange={(e) => setFormData({ ...formData, days: e.target.value })}
                        className="p-2 bg-white border border-slate-300 rounded text-slate-900 text-[11px]"
                      />
                      <input
                        type="text"
                        placeholder="Morning timing"
                        value={formData.morning}
                        onChange={(e) => setFormData({ ...formData, morning: e.target.value })}
                        className="p-2 bg-white border border-slate-300 rounded text-slate-900 text-[11px]"
                      />
                      <input
                        type="text"
                        placeholder="Evening timing"
                        value={formData.evening}
                        onChange={(e) => setFormData({ ...formData, evening: e.target.value })}
                        className="p-2 bg-white border border-slate-300 rounded text-slate-900 text-[11px]"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 pt-2">
                    <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-slate-50 hover:bg-slate-700 text-slate-600 rounded-xl font-bold transition-colors">
                      Cancel
                    </button>
                    <button type="submit" className="px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold rounded-xl shadow transition-colors">
                      {editingId ? 'Save Changes' : 'Create Doctor'}
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
