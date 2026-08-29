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
  Check,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<'table' | 'calendar'>('table');

  // Calendar State
  const [currentYear, setCurrentYear] = useState(() => new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(() => new Date().getMonth());
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<string | null>(null);

  const fetchAppointments = async () => {
    const res = await adminApiClient('/admin/appointments');
    if (res.success && res.data) setAppointments(res.data);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

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

  // Format date key to match appointment date format (YYYY-MM-DD)
  const getFormattedDateString = (day: number) => {
    const mm = String(currentMonth + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    return `${currentYear}-${mm}-${dd}`;
  };

  // Filter appointments for selected calendar date
  const selectedDateAppointments = appointments.filter(
    (apt) => apt.preferredDate === selectedCalendarDate
  );

  const triggerWhatsApp = (apt: any) => {
    const message = `Hello ${apt.name}, your appointment at Dr. Q.H. Khan Clinic on ${apt.preferredDate} at ${apt.preferredTime} is confirmed. Please arrive 10 minutes prior to your slot.`;
    const url = `https://wa.me/91${apt.phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader />
        <main className="p-6 space-y-6 flex-1 overflow-y-auto">
          {/* Header & Toggle */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white">All Clinic Appointments</h1>
              <p className="text-xs text-slate-400">Review patient bookings, assign doctors, and update statuses</p>
            </div>
            
            {/* View Mode Toggle */}
            <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                  viewMode === 'table' ? 'bg-clinic-crimson text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>Table List</span>
              </button>
              <button
                onClick={() => setViewMode('calendar')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                  viewMode === 'calendar' ? 'bg-clinic-crimson text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                <CalendarIcon className="w-3.5 h-3.5" />
                <span>Calendar View</span>
              </button>
            </div>
          </div>

          {/* TABLE VIEW */}
          {viewMode === 'table' ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-800/60 text-slate-400 border-b border-slate-800 uppercase font-semibold">
                    <th className="p-3">Appointment ID</th>
                    <th className="p-3">Patient Name</th>
                    <th className="p-3">Department</th>
                    <th className="p-3">Preferred Date / Time</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {appointments.map((apt) => (
                    <tr key={apt._id} className="hover:bg-slate-800/40">
                      <td className="p-3 font-mono font-bold text-amber-400">{apt.appointmentId}</td>
                      <td className="p-3 font-bold text-white">
                        {apt.name} 
                        <span className="text-slate-500 block font-normal">{apt.phone}</span>
                      </td>
                      <td className="p-3">{apt.department}</td>
                      <td className="p-3">{apt.preferredDate} ({apt.preferredTime})</td>
                      <td className="p-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                          apt.status === 'confirmed'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : apt.status === 'completed'
                            ? 'bg-indigo-955 text-indigo-300 border border-indigo-800'
                            : 'bg-amber-950 text-amber-300 border border-amber-800'
                        }`}>
                          {apt.status}
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-2">
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
                              onClick={() => triggerWhatsApp(apt)}
                              className="px-2.5 py-1 bg-teal-650 text-white rounded font-bold hover:bg-teal-600 transition-colors inline-flex items-center gap-1"
                            >
                              <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                            </button>
                            <button
                              onClick={() => updateStatus(apt._id, 'completed')}
                              className="px-2.5 py-1 bg-indigo-700 text-white rounded font-bold hover:bg-indigo-600 transition-colors"
                            >
                              Complete
                            </button>
                          </>
                        )}
                        {apt.status === 'completed' && (
                          <span className="text-slate-500 font-bold flex items-center justify-end gap-1 text-[10px]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Done
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            /* CALENDAR VIEW */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start text-xs font-semibold">
              {/* Calendar Grid Box */}
              <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                {/* Month Navigator */}
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-bold text-white">
                    {MONTHS[currentMonth]} {currentYear}
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={handlePrevMonth}
                      className="p-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNextMonth}
                      className="p-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-2 text-center">
                  {WEEKDAYS.map((day) => (
                    <div key={day} className="text-slate-400 font-bold py-1 bg-slate-800/30 rounded">
                      {day}
                    </div>
                  ))}

                  {/* Empty offsets for starting day */}
                  {[...Array(firstDayIndex)].map((_, idx) => (
                    <div key={`offset-${idx}`} className="py-4 bg-transparent border border-transparent" />
                  ))}

                  {/* Month days */}
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
                            ? 'bg-clinic-crimson border-clinic-crimson text-white font-bold scale-[1.02] shadow-lg'
                            : 'bg-slate-950 border-slate-850 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <span className="text-xs">{dayNum}</span>
                        {dayApts.length > 0 && (
                          <div className="flex flex-col gap-0.5 mt-1 w-full text-[8px] font-bold">
                            {confirmedCount > 0 && (
                              <span className={`px-1 py-0.5 rounded text-center truncate ${
                                isSelected ? 'bg-white/20 text-white' : 'bg-emerald-950/80 text-emerald-400 border border-emerald-900/30'
                              }`}>
                                {confirmedCount} Conf
                              </span>
                            )}
                            {pendingCount > 0 && (
                              <span className={`px-1 py-0.5 rounded text-center truncate ${
                                isSelected ? 'bg-white/20 text-white' : 'bg-amber-950/80 text-amber-400 border border-amber-900/30'
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

              {/* Side Details Drawer/Pane */}
              <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 self-start min-h-[300px]">
                <div className="border-b border-slate-800 pb-2">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
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
                        className="p-3 bg-slate-950 border border-slate-850 rounded-xl space-y-2.5"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-white text-xs">{apt.name}</h4>
                            <p className="text-[10px] text-slate-500 mt-0.5">
                              ID: {apt.appointmentId} • Phone: {apt.phone}
                            </p>
                          </div>
                          <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase border ${
                            apt.status === 'confirmed'
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                              : apt.status === 'completed'
                              ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                              : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                          }`}>
                            {apt.status}
                          </span>
                        </div>
                        <p className="text-slate-350 text-[10px] bg-slate-900 p-1.5 rounded">
                          <strong>Time:</strong> {apt.preferredTime} <br />
                          <strong>Department:</strong> {apt.department}
                        </p>
                        
                        {/* Actions block inside drawer */}
                        <div className="flex justify-end gap-1.5 pt-2 border-t border-slate-850">
                          {apt.status === 'pending' && (
                            <button
                              onClick={() => updateStatus(apt._id, 'confirmed')}
                              className="px-2 py-1 bg-emerald-700 hover:bg-emerald-600 text-white rounded font-bold text-[10px] transition-colors"
                            >
                              Confirm
                            </button>
                          )}
                          {apt.status === 'confirmed' && (
                            <>
                              <button
                                onClick={() => triggerWhatsApp(apt)}
                                className="px-2 py-1 bg-teal-650 hover:bg-teal-600 text-white rounded font-bold text-[10px] transition-colors flex items-center gap-1"
                              >
                                <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                              </button>
                              <button
                                onClick={() => updateStatus(apt._id, 'completed')}
                                className="px-2 py-1 bg-indigo-700 hover:bg-indigo-600 text-white rounded font-bold text-[10px] transition-colors"
                              >
                                Complete
                              </button>
                            </>
                          )}
                          {apt.status === 'completed' && (
                            <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
