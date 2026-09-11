'use client';

import React, { useEffect, useState } from 'react';
import { adminApiClient } from '../../lib/api-client';
import { AdminSidebar } from '../../components/AdminSidebar';
import { AdminHeader } from '../../components/AdminHeader';
import {
  Calendar as CalendarIcon,
  List,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  CheckCircle2,
  Plus,
  Edit3,
  Trash2,
  Eye,
  FileText,
  ClipboardList
} from 'lucide-react';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<'table' | 'calendar'>('table');

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Details Modal State
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedAptDetails, setSelectedAptDetails] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: 30,
    gender: 'Male',
    bloodGroup: '',
    address: '',
    department: 'Classical Homoeopathy',
    doctor: '',
    preferredDate: new Date().toISOString().slice(0, 10),
    preferredTime: '10:00 AM',
    status: 'pending',
    message: '',
    consent: true,
  });

  // Calendar State
  const [currentYear, setCurrentYear] = useState(() => new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(() => new Date().getMonth());
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<string | null>(null);

  const fetchAppointments = async () => {
    const res = await adminApiClient('/admin/appointments');
    if (res.success && res.data) setAppointments(res.data);
  };

  const fetchDoctors = async () => {
    const res = await adminApiClient('/doctors');
    if (res.success && res.data) setDoctors(res.data);
  };

  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
  }, []);

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
      department: 'Classical Homoeopathy',
      doctor: '',
      preferredDate: new Date().toISOString().slice(0, 10),
      preferredTime: '10:00 AM',
      status: 'pending',
      message: '',
      consent: true,
    });
    setErrorMessage('');
    setShowModal(true);
  };

  const handleOpenEdit = (apt: any) => {
    setEditingId(apt._id);
    setFormData({
      name: apt.name || '',
      email: apt.email || '',
      phone: apt.phone || '',
      age: apt.age || 30,
      gender: apt.gender || 'Male',
      bloodGroup: apt.bloodGroup || (apt.patient && typeof apt.patient === 'object' ? apt.patient.bloodGroup : '') || '',
      address: apt.address || (apt.patient && typeof apt.patient === 'object' ? apt.patient.address : '') || '',
      department: apt.department || 'Classical Homoeopathy',
      doctor: apt.doctor ? (typeof apt.doctor === 'object' ? apt.doctor._id : apt.doctor) : '',
      preferredDate: apt.preferredDate || new Date().toISOString().slice(0, 10),
      preferredTime: apt.preferredTime || '10:00 AM',
      status: apt.status || 'pending',
      message: apt.message || '',
      consent: true,
    });
    setErrorMessage('');
    setShowModal(true);
  };

  const handleViewDetails = (apt: any) => {
    setSelectedAptDetails(apt);
    setShowDetailsModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (editingId) {
      const res = await adminApiClient(`/appointments/${editingId}`, {
        method: 'PUT',
        body: JSON.stringify(formData),
      });
      if (res.success) {
        setShowModal(false);
        fetchAppointments();
      } else {
        setErrorMessage(res.message || 'Error updating appointment');
      }
    } else {
      const res = await adminApiClient('/appointments', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      if (res.success) {
        setShowModal(false);
        fetchAppointments();
      } else {
        setErrorMessage(res.message || 'Error creating appointment');
      }
    }
  };

  const handleDelete = async (apt: any) => {
    if (!confirm('Are you sure you want to cancel and delete this appointment?')) return;
    const idToDelete = apt._id || apt.appointmentId || apt;
    const res = await adminApiClient(`/appointments/${idToDelete}`, { method: 'DELETE' });
    if (res.success) {
      fetchAppointments();
    } else {
      alert(res.message || 'Error deleting appointment.');
    }
  };

  const updateStatus = async (id: string, status: string) => {
    const res = await adminApiClient(`/appointments/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
    if (res.success) {
      fetchAppointments();
    }
  };

  // Calendar Helpers
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
    setSelectedCalendarDate(null);
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
    setSelectedCalendarDate(null);
  };

  const getFormattedDateString = (day: number) => {
    const mm = String(currentMonth + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    return `${currentYear}-${mm}-${dd}`;
  };

  const selectedDateAppointments = appointments.filter(
    (apt) => apt.preferredDate === selectedCalendarDate
  );


  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader />
        <main className="p-6 space-y-6 flex-1 overflow-y-auto">
          {/* Header & Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">All Clinic Appointments</h1>
              <p className="text-xs text-slate-500">Review patient bookings, assign doctors, update, and manage appointments</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={handleOpenCreate}
                className="px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs rounded-xl shadow flex items-center gap-1.5 transition-all"
              >
                <Plus className="w-4 h-4" /> Book Appointment
              </button>

              {/* View Mode Toggle */}
              <div className="flex bg-white shadow-sm border border-slate-200 p-1 rounded-xl text-xs font-semibold">
                <button
                  onClick={() => setViewMode('table')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                    viewMode === 'table' ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <List className="w-3.5 h-3.5" />
                  <span>Table List</span>
                </button>
                <button
                  onClick={() => setViewMode('calendar')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                    viewMode === 'calendar' ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <CalendarIcon className="w-3.5 h-3.5" />
                  <span>Calendar View</span>
                </button>
              </div>
            </div>
          </div>

          {/* TABLE VIEW */}
          {viewMode === 'table' ? (
            <div className="bg-white shadow-sm border border-slate-200 rounded-2xl overflow-hidden text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-400 border-b border-slate-200 uppercase font-semibold">
                    <th className="p-3">Appointment ID</th>
                    <th className="p-3">Patient Name</th>
                    <th className="p-3">Department</th>
                    <th className="p-3">Preferred Date / Time</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  {appointments.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-4 text-center text-slate-500">No appointments scheduled.</td>
                    </tr>
                  ) : (
                    appointments.map((apt) => (
                      <tr key={apt._id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3 font-mono font-bold text-amber-400">{apt.appointmentId}</td>
                        <td className="p-3 font-bold text-slate-900">
                          {apt.name} 
                          <span className="text-slate-500 block font-normal">{apt.phone}</span>
                          {(apt.bloodGroup || (apt.patient && apt.patient.bloodGroup) || apt.address || (apt.patient && apt.patient.address)) && (
                            <span className="text-[10px] text-slate-500 block font-normal mt-0.5">
                              {(apt.bloodGroup || (apt.patient && apt.patient.bloodGroup)) && (
                                <span className="bg-rose-50 text-rose-600 border border-rose-200 font-bold px-1 rounded mr-1.5">{apt.bloodGroup || (apt.patient && apt.patient.bloodGroup)}</span>
                              )}
                              {apt.address || (apt.patient && apt.patient.address)}
                            </span>
                          )}
                        </td>
                        <td className="p-3">{apt.department}</td>
                        <td className="p-3">{apt.preferredDate} ({apt.preferredTime})</td>
                        <td className="p-3">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                            apt.status === 'confirmed'
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                              : apt.status === 'completed'
                              ? 'bg-indigo-955 text-indigo-300 border border-indigo-800'
                              : apt.status === 'cancelled'
                              ? 'bg-rose-950 text-rose-300 border border-rose-800'
                              : 'bg-amber-950 text-amber-300 border border-amber-800'
                          }`}>
                            {apt.status}
                          </span>
                        </td>
                        <td className="p-3 text-right space-x-1.5">
                          {apt.status === 'pending' && (
                            <button
                              onClick={() => updateStatus(apt._id, 'confirmed')}
                              className="px-2.5 py-1 bg-emerald-700 text-white rounded font-bold hover:bg-emerald-600 transition-colors"
                            >
                              Confirm
                            </button>
                          )}
                          {apt.status === 'confirmed' && (
                            <>
                              <button
                                onClick={() => handleViewDetails(apt)}
                                className="px-2 py-1 bg-slate-100 text-slate-700 border border-slate-300 rounded font-bold hover:bg-slate-200 transition-colors inline-flex items-center gap-1"
                              >
                                <Eye className="w-3.5 h-3.5" /> Details
                              </button>
                              <button
                                onClick={() => updateStatus(apt._id, 'completed')}
                                className="px-2 py-1 bg-indigo-700 text-white rounded font-bold hover:bg-indigo-600 transition-colors"
                              >
                                Complete
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => handleOpenEdit(apt)}
                            className="p-1 bg-slate-50 text-slate-600 rounded hover:bg-slate-700 hover:text-white transition-colors"
                            title="Edit Appointment"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(apt)}
                            className="p-1 bg-rose-950/30 text-rose-400 rounded hover:bg-rose-900 hover:text-white transition-colors"
                            title="Delete Appointment"
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
          ) : (
            /* CALENDAR VIEW */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start text-xs font-semibold">
              <div className="lg:col-span-8 bg-white shadow-sm border border-slate-200 rounded-2xl p-5 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                  <h3 className="text-sm font-bold text-slate-800">
                    {MONTHS[currentMonth]} {currentYear}
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={handlePrevMonth}
                      className="p-1 bg-slate-50 hover:bg-slate-700 text-white rounded-lg transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNextMonth}
                      className="p-1 bg-slate-50 hover:bg-slate-700 text-white rounded-lg transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-2 text-center">
                  {WEEKDAYS.map((day) => (
                    <div key={day} className="text-slate-400 font-bold py-1 bg-slate-50/30 rounded">
                      {day}
                    </div>
                  ))}

                  {[...Array(firstDayIndex)].map((_, idx) => (
                    <div key={`offset-${idx}`} className="py-4 bg-transparent border border-transparent" />
                  ))}

                  {[...Array(daysInMonth)].map((_, idx) => {
                    const dayNum = idx + 1;
                    const dateStr = getFormattedDateString(dayNum);
                    const dayApts = appointments.filter((apt) => apt.preferredDate === dateStr);
                    const pendingCount = dayApts.filter((apt) => apt.status === 'pending').length;
                    const confirmedCount = dayApts.filter((apt) => apt.status === 'confirmed').length;
                    const isSelected = selectedCalendarDate === dateStr;

                    return (
                      <button
                        key={`day-${dayNum}`}
                        onClick={() => setSelectedCalendarDate(dateStr)}
                        className={`p-2 border rounded-xl flex flex-col justify-between items-center min-h-[64px] transition-all ${
                          isSelected
                            ? 'bg-gradient-to-r from-orange-600 to-amber-600 border-orange-500 text-white font-bold scale-[1.02] shadow-lg'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-orange-400 hover:shadow-sm'
                        }`}
                      >
                        <span className="text-xs font-bold">{dayNum}</span>
                        {dayApts.length > 0 && (
                          <div className="flex flex-col gap-0.5 mt-1 w-full text-[8px] font-bold">
                            {confirmedCount > 0 && (
                              <span className={`px-1 py-0.5 rounded text-center truncate ${
                                isSelected ? 'bg-white/20 text-white' : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                              }`}>
                                {confirmedCount} Conf
                              </span>
                            )}
                            {pendingCount > 0 && (
                              <span className={`px-1 py-0.5 rounded text-center truncate ${
                                isSelected ? 'bg-white/20 text-white' : 'bg-amber-50 text-amber-600 border border-amber-200'
                              }`}>
                                {pendingCount} Pend
                              </span>
                            )}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="lg:col-span-4 bg-white shadow-sm border border-slate-200 rounded-2xl p-5 space-y-4 self-start min-h-[300px]">
                <div className="border-b border-slate-200 pb-2">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    {selectedCalendarDate ? `Daily Schedule: ${selectedCalendarDate}` : 'Select Date to View'}
                  </h3>
                </div>

                {!selectedCalendarDate ? (
                  <p className="text-slate-500 italic text-center py-12">
                    Click any calendar day to inspect scheduled patient consults.
                  </p>
                ) : selectedDateAppointments.length === 0 ? (
                  <p className="text-slate-550 italic text-center py-12">
                    No consultations scheduled for this date.
                  </p>
                ) : (
                  <div className="space-y-3 max-h-[500px] overflow-y-auto">
                    {selectedDateAppointments.map((apt) => (
                      <div
                        key={apt._id}
                        className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-slate-900 text-xs">{apt.name}</h4>
                            <p className="text-[10px] text-slate-500 mt-0.5">
                              ID: {apt.appointmentId} • Phone: {apt.phone}
                            </p>
                          </div>
                          <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase border ${
                            apt.status === 'confirmed'
                              ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                              : apt.status === 'completed'
                              ? 'bg-indigo-50 text-indigo-600 border-indigo-200'
                              : 'bg-amber-50 text-amber-600 border-amber-200'
                          }`}>
                            {apt.status}
                          </span>
                        </div>
                        <p className="text-slate-600 text-[10px] bg-white shadow-sm p-1.5 rounded border border-slate-100">
                          <strong>Time:</strong> {apt.preferredTime} <br />
                          <strong>Department:</strong> {apt.department}
                        </p>
                        
                        <div className="flex justify-end gap-1.5 pt-2 border-t border-slate-200">
                          <button
                            onClick={() => handleOpenEdit(apt)}
                            className="p-1 bg-slate-50 text-slate-600 rounded hover:bg-slate-700 hover:text-white"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(apt)}
                            className="p-1 bg-rose-950/30 text-rose-400 rounded hover:bg-rose-900 hover:text-white"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
              <div className="bg-white shadow-sm border border-slate-200 rounded-2xl p-6 w-full max-w-lg space-y-4 text-xs">
                <h3 className="font-bold text-slate-800 text-base">
                  {editingId ? 'Edit Appointment' : 'Book New Appointment'}
                </h3>
                {errorMessage && (
                  <div className="p-3 bg-rose-950/40 border border-rose-900 rounded-xl text-rose-400 font-bold">
                    {errorMessage}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Patient Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Patient Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Phone</label>
                      <input
                        type="tel"
                        required
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Email</label>
                      <input
                        type="email"
                        required
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      />
                    </div>
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

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Blood Group (Optional)</label>
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
                    <div className="col-span-2">
                      <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Address</label>
                      <input
                        type="text"
                        placeholder="Full Address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Department</label>
                      <input
                        type="text"
                        required
                        placeholder="Department"
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Assigned Doctor</label>
                      <select
                        value={formData.doctor}
                        onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
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

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Preferred Date</label>
                      <input
                        type="date"
                        required
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Preferred Time</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 10:00 AM"
                        value={formData.preferredTime}
                        onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Status</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Notes / Message</label>
                    <textarea
                      rows={2}
                      placeholder="Symptoms or notes..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 resize-none"
                    />
                  </div>

                  <div className="flex justify-end space-x-2 pt-2">
                    <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-slate-50 hover:bg-slate-700 text-slate-600 rounded-xl font-bold transition-colors">
                      Cancel
                    </button>
                    <button type="submit" className="px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold rounded-xl shadow transition-colors">
                      {editingId ? 'Save Changes' : 'Book Appointment'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Patient Details Modal */}
          {showDetailsModal && selectedAptDetails && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
              <div className="bg-white shadow-sm border border-slate-200 rounded-2xl p-6 w-full max-w-2xl space-y-6 text-xs">
                <div className="flex justify-between items-start border-b border-slate-200 pb-3">
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                      <ClipboardList className="w-5 h-5 text-clinic-crimson" />
                      Patient Details & Slip
                    </h3>
                    <p className="text-slate-500 mt-1">Review full patient information and appointment context</p>
                  </div>
                  <button onClick={() => setShowDetailsModal(false)} className="p-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded">
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Basic Info */}
                  <div className="space-y-4">
                    <h4 className="font-bold text-slate-900 border-b border-slate-100 pb-1 flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-slate-400" /> Basic Information
                    </h4>
                    <div className="space-y-2 text-slate-700">
                      <p><span className="text-slate-400 font-semibold w-24 inline-block">Name:</span> <strong>{selectedAptDetails.name}</strong></p>
                      <p><span className="text-slate-400 font-semibold w-24 inline-block">Age/Gender:</span> {selectedAptDetails.age} Yrs, {selectedAptDetails.gender}</p>
                      <p><span className="text-slate-400 font-semibold w-24 inline-block">Blood Group:</span> <span className="px-1.5 py-0.5 bg-rose-50 text-rose-600 font-bold border border-rose-200 rounded">{selectedAptDetails.bloodGroup || (selectedAptDetails.patient && selectedAptDetails.patient.bloodGroup) || 'N/A'}</span></p>
                      <p><span className="text-slate-400 font-semibold w-24 inline-block">Address:</span> {selectedAptDetails.address || (selectedAptDetails.patient && selectedAptDetails.patient.address) || 'Not Provided'}</p>
                      <p><span className="text-slate-400 font-semibold w-24 inline-block">Phone:</span> {selectedAptDetails.phone}</p>
                      <p><span className="text-slate-400 font-semibold w-24 inline-block">Email:</span> {selectedAptDetails.email || 'N/A'}</p>
                      <p><span className="text-slate-400 font-semibold w-24 inline-block">Patient ID:</span> {selectedAptDetails.patient?.patientId || 'Pending Creation'}</p>
                    </div>
                  </div>

                  {/* Appointment Info */}
                  <div className="space-y-4">
                    <h4 className="font-bold text-slate-900 border-b border-slate-100 pb-1 flex items-center gap-1.5">
                      <CalendarIcon className="w-4 h-4 text-slate-400" /> Appointment Context
                    </h4>
                    <div className="space-y-2 text-slate-700">
                      <p><span className="text-slate-400 font-semibold w-24 inline-block">Appt ID:</span> <span className="font-mono text-amber-600 font-bold">{selectedAptDetails.appointmentId}</span></p>
                      <p><span className="text-slate-400 font-semibold w-24 inline-block">Department:</span> {selectedAptDetails.department}</p>
                      <p><span className="text-slate-400 font-semibold w-24 inline-block">Date/Time:</span> {selectedAptDetails.preferredDate} ({selectedAptDetails.preferredTime})</p>
                      <p><span className="text-slate-400 font-semibold w-24 inline-block">Assigned Doc:</span> {selectedAptDetails.doctor?.name || selectedAptDetails.doctorName || 'None'}</p>
                      <p><span className="text-slate-400 font-semibold w-24 inline-block">Status:</span> <span className="uppercase font-bold text-[10px] bg-slate-100 px-1.5 py-0.5 rounded">{selectedAptDetails.status}</span></p>
                    </div>
                  </div>
                </div>

                {/* Additional Context */}
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 border-b border-slate-100 pb-1">Notes / Symptoms</h4>
                  <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg text-slate-600 italic min-h-[60px]">
                    {selectedAptDetails.message || 'No additional notes or symptoms provided by the patient.'}
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-200">
                  <button onClick={() => setShowDetailsModal(false)} className="px-5 py-2 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors">
                    Close Details
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
