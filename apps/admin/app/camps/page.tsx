'use client';

import React, { useEffect, useState } from 'react';
import { adminApiClient } from '../../lib/api-client';
import { AdminSidebar } from '../../components/AdminSidebar';
import { AdminHeader } from '../../components/AdminHeader';
import { Plus, Trash2, Calendar, MapPin, Edit3, Image as ImageIcon, Link as LinkIcon, Upload, ShieldAlert, X, Megaphone, Clock, Phone, Sparkles } from 'lucide-react';

export default function AdminCampsPage() {
  const [camps, setCamps] = useState<any[]>([]);
  const [doctorsList, setDoctorsList] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const [imageMode, setImageMode] = useState<'upload' | 'url'>('upload');
  const [imageUrlInput, setImageUrlInput] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    timing: '',
    location: '',
    doctor: 'Dr. I. Khan',
    helplinePhone: '9135404090',
    imageUrl: '',
    isActive: true,
    isUpcomingPopup: false,
  });

  const fetchCamps = async () => {
    const res = await adminApiClient('/camps/admin');
    if (res.success && res.data) setCamps(res.data);
  };

  const fetchDoctors = async () => {
    const res = await adminApiClient('/doctors');
    if (res.success && res.data) setDoctorsList(res.data);
  };

  useEffect(() => {
    fetchCamps();
    fetchDoctors();
  }, []);

  const validateAndProcessFile = (file: File) => {
    setErrorMessage('');

    // 1. Format check (.jpg or .jpeg extension)
    const fileName = file.name.toLowerCase();
    if (!fileName.endsWith('.jpg') && !fileName.endsWith('.jpeg')) {
      setErrorMessage('Security Warning: Only .jpg and .jpeg image files are allowed.');
      return;
    }

    if (file.type && !['image/jpeg', 'image/jpg', 'image/pjpeg'].includes(file.type)) {
      setErrorMessage('Security Warning: Invalid file MIME type. Only JPG/JPEG format is supported.');
      return;
    }

    // 2. Size check (Max 150 KB = 153,600 bytes)
    const MAX_SIZE = 150 * 1024;
    if (file.size > MAX_SIZE) {
      setErrorMessage(`Image file size must be 150 KB or less. Selected file is ${(file.size / 1024).toFixed(1)} KB.`);
      return;
    }

    // 3. Security Header Check (JPEG Magic Bytes: FF D8 FF)
    const headerReader = new FileReader();
    headerReader.onloadend = () => {
      if (headerReader.result) {
        const arr = new Uint8Array(headerReader.result as ArrayBuffer);
        if (arr.length < 3 || arr[0] !== 0xff || arr[1] !== 0xd8 || arr[2] !== 0xff) {
          setErrorMessage('Security Warning: File headers do not match valid JPEG image signature.');
          return;
        }

        // File is valid JPEG header & size, now read as Data URL
        const dataUrlReader = new FileReader();
        dataUrlReader.onloadend = () => {
          setFormData((prev) => ({ ...prev, imageUrl: dataUrlReader.result as string }));
          setErrorMessage('');
        };
        dataUrlReader.readAsDataURL(file);
      }
    };
    headerReader.readAsArrayBuffer(file.slice(0, 4));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    validateAndProcessFile(file);
  };

  const handleUrlInputChange = (url: string) => {
    setImageUrlInput(url);
    const trimmed = url.trim();
    setErrorMessage('');

    if (!trimmed) {
      setFormData((prev) => ({ ...prev, imageUrl: '' }));
      return;
    }

    if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
      setErrorMessage('Security Error: Image link must start with http:// or https://');
      return;
    }

    setFormData((prev) => ({ ...prev, imageUrl: trimmed }));
  };

  const handleOpenCreate = () => {
    setEditingId(null);
    setImageMode('upload');
    setImageUrlInput('');
    setFormData({
      title: '',
      description: '',
      date: '',
      timing: '9:00 AM - 3:00 PM',
      location: 'Nagmatia Road, Gaya',
      doctor: 'Dr. I. Khan',
      helplinePhone: '9135404090',
      imageUrl: '',
      isActive: true,
      isUpcomingPopup: false,
    });
    setErrorMessage('');
    setShowModal(true);
  };

  const handleOpenEdit = (camp: any) => {
    setEditingId(camp._id);
    setImageMode(camp.imageUrl && camp.imageUrl.startsWith('http') ? 'url' : 'upload');
    setImageUrlInput(camp.imageUrl && camp.imageUrl.startsWith('http') ? camp.imageUrl : '');
    setFormData({
      title: camp.title || '',
      description: camp.description || '',
      date: camp.date || '',
      timing: camp.timing || '',
      location: camp.location || '',
      doctor: camp.doctor || 'Dr. I. Khan',
      helplinePhone: camp.helplinePhone || '9135404090',
      imageUrl: camp.imageUrl || '',
      isActive: camp.isActive !== undefined ? camp.isActive : true,
      isUpcomingPopup: !!camp.isUpcomingPopup,
    });
    setErrorMessage('');
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (errorMessage) {
      alert('Please fix the image validation errors before submitting.');
      return;
    }

    const payload = {
      ...formData,
    };

    const method = editingId ? 'PUT' : 'POST';
    const endpoint = editingId ? `/camps/${editingId}` : '/camps';

    const res = await adminApiClient(endpoint, {
      method,
      body: JSON.stringify(payload),
    });

    if (res.success) {
      setShowModal(false);
      fetchCamps();
    } else {
      setErrorMessage(res.message || 'Error saving medical camp');
    }
  };

  const handleTogglePopup = async (id: string) => {
    const res = await adminApiClient(`/camps/${id}/toggle-popup`, {
      method: 'PUT',
    });
    if (res.success) {
      fetchCamps();
    } else {
      alert(res.message || 'Error setting upcoming Shivir popup');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this camp?')) return;
    const res = await adminApiClient(`/camps/${id}`, {
      method: 'DELETE',
    });
    if (res.success) {
      fetchCamps();
    }
  };

  const getFullImageUrl = (path: string) => {
    if (!path) return '';
    if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
      return path;
    }
    const backendOrigin = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api').replace(/\/api\/?$/, '');
    return `${backendOrigin}${path.startsWith('/') ? path : `/${path}`}`;
  };

  const handleDoctorToggle = (docName: string) => {
    let currentDoctors = formData.doctor.split(',').map(d => d.trim()).filter(Boolean);
    if (currentDoctors.includes(docName)) {
      currentDoctors = currentDoctors.filter(d => d !== docName);
    } else {
      currentDoctors.push(docName);
    }
    setFormData({ ...formData, doctor: currentDoctors.join(', ') });
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-[#1A0706]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader />
        <main className="p-6 space-y-6 flex-1 overflow-y-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
                Medical Camps & Shivir (Samaj Seva)
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300 flex items-center gap-1.5 shadow-sm">
                  <Megaphone className="w-3.5 h-3.5 text-amber-600" /> Website Announcement Popups
                </span>
              </h1>
              <p className="text-xs text-slate-600 font-semibold mt-1">
                Manage free medicine camps and configure live website floating popup announcements
              </p>
            </div>
            <button
              onClick={handleOpenCreate}
              className="px-4 py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2 hover:from-orange-500 hover:to-amber-500 transition-all"
            >
              <Plus className="w-4 h-4" /> Add Medical Camp (Shivir)
            </button>
          </div>

          {/* Quick Guide Card */}
          <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-4 text-xs text-amber-950 flex items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-500/20 border border-amber-400/40 rounded-xl text-amber-800 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-bold text-[#1A0706] text-sm">Live Website Shivir Announcement Control</h4>
                <p className="text-slate-700 text-xs font-medium">
                  Setting a Shivir as <strong className="text-amber-900 font-extrabold">"Active Upcoming Popup"</strong> instantly displays a floating announcement badge and full overlay popup on the live clinic website.
                </p>
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-x-auto text-xs">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-slate-100 text-slate-700 border-b border-slate-200 uppercase font-extrabold">
                  <th className="p-3.5">Image</th>
                  <th className="p-3.5">Camp Title</th>
                  <th className="p-3.5">Date & Time</th>
                  <th className="p-3.5">Location</th>
                  <th className="p-3.5">Website Popup</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {camps.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-500 font-semibold text-sm">
                      No medical camps configured yet. Click "Add Medical Camp (Shivir)" to create one.
                    </td>
                  </tr>
                ) : (
                  camps.map((c) => (
                    <tr key={c._id} className={`transition-colors ${c.isUpcomingPopup ? 'bg-amber-50/80 hover:bg-amber-100/80' : 'hover:bg-slate-50'}`}>
                      <td className="p-3.5 w-16">
                        {c.imageUrl ? (
                          <img
                            src={getFullImageUrl(c.imageUrl)}
                            alt={c.title}
                            className="w-12 h-10 object-cover rounded-lg border border-slate-300 shadow-sm"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800';
                            }}
                          />
                        ) : (
                          <div className="w-12 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 border border-slate-200">
                            <ImageIcon className="w-4 h-4" />
                          </div>
                        )}
                      </td>
                      <td className="p-3.5 font-bold text-slate-900 max-w-xs truncate">
                        <div className="text-sm font-bold text-slate-900">{c.title}</div>
                        {c.isUpcomingPopup && (
                          <span className="inline-flex items-center gap-1 text-[10px] text-amber-800 bg-amber-200/70 border border-amber-300 px-2 py-0.5 rounded font-extrabold mt-1">
                            <Megaphone className="w-3 h-3 text-amber-700" /> Active Website Popup Banner
                          </span>
                        )}
                      </td>
                      <td className="p-3.5 text-slate-700">
                        <div className="flex items-center gap-1 font-bold text-slate-900">
                          <Calendar className="w-3.5 h-3.5 text-amber-600 shrink-0" /> {c.date}
                        </div>
                        {c.timing && (
                          <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                            <Clock className="w-3 h-3 text-slate-400 shrink-0" /> {c.timing}
                          </div>
                        )}
                      </td>
                      <td className="p-3.5 text-slate-700">
                        <span className="flex items-center gap-1 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-orange-600 shrink-0" /> {c.location}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <button
                          onClick={() => handleTogglePopup(c._id)}
                          className={`px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase flex items-center gap-1.5 transition-all shadow-sm ${
                            c.isUpcomingPopup
                              ? 'bg-amber-500 text-slate-950 font-black shadow-md border border-amber-600 animate-pulse'
                              : 'bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200 border border-slate-300'
                          }`}
                          title="Click to set/unset as active website announcement popup"
                        >
                          <Megaphone className="w-3.5 h-3.5" />
                          <span>{c.isUpcomingPopup ? 'ACTIVE POPUP' : 'Set as Popup'}</span>
                        </button>
                      </td>
                      <td className="p-3.5">
                        <span className={`px-2.5 py-0.5 rounded-full font-extrabold uppercase text-[10px] ${c.isActive ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-slate-100 text-slate-500 border border-slate-300'}`}>
                          {c.isActive ? 'Active' : 'Hidden'}
                        </span>
                      </td>
                      <td className="p-3.5 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEdit(c)}
                          className="p-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 hover:text-slate-900 border border-slate-200 transition-colors"
                          title="Edit Camp"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(c._id)}
                          className="p-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 hover:text-rose-700 border border-rose-200 transition-colors"
                          title="Delete Camp"
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

          {/* Modal Popup for Add / Edit Shivir */}
          {showModal && (
            <div className="fixed inset-0 bg-white shadow-sm/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
              <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 w-full max-w-lg space-y-4 text-xs max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <h3 className="font-bold text-slate-900 text-base">
                    {editingId ? 'Edit Medical Camp' : 'Add Medical Camp (Shivir)'}
                  </h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {errorMessage && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 font-bold flex items-start gap-2">
                    <ShieldAlert className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] text-slate-700 uppercase font-bold mb-1">Camp / Shivir Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. निःशुल्क होम्योपैथिक चिकित्सा एवं दवा वितरण शिविर"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-orange-500 focus:bg-white font-semibold"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] text-slate-700 uppercase font-bold mb-1">Camp Date</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 15th October 2026"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-orange-500 focus:bg-white font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-700 uppercase font-bold mb-1">Timings (Optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. 9:00 AM – 3:00 PM"
                        value={formData.timing}
                        onChange={(e) => setFormData({ ...formData, timing: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-orange-500 focus:bg-white font-semibold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] text-slate-700 uppercase font-bold mb-1">Venue / Location</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Nagmatia Road, Gaya"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-orange-500 focus:bg-white font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-700 uppercase font-bold mb-1">Helpline Phone</label>
                      <input
                        type="tel"
                        placeholder="e.g. 9135404090"
                        value={formData.helplinePhone}
                        onChange={(e) => setFormData({ ...formData, helplinePhone: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-orange-500 focus:bg-white font-semibold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-700 uppercase font-bold mb-2">
                      Chief Doctors / अटेंडिंग चिकित्सक
                    </label>
                    <div className="space-y-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {doctorsList.map((doc) => (
                          <label key={doc._id} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.doctor.split(',').map(d => d.trim()).includes(doc.name)}
                              onChange={() => handleDoctorToggle(doc.name)}
                              className="w-4 h-4 rounded text-orange-600 accent-orange-600"
                            />
                            <span className="text-xs font-bold text-slate-800">{doc.name}</span>
                          </label>
                        ))}
                      </div>
                      <div className="pt-2 border-t border-slate-200 mt-2">
                        <label className="block text-[10px] text-slate-500 mb-1">Custom / Other Doctors (Comma separated)</label>
                        <input
                          type="text"
                          placeholder="e.g. Dr. Team A, Medical Staff..."
                          value={formData.doctor}
                          onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                          className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-900 outline-none focus:border-orange-500 font-semibold text-xs"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-700 uppercase font-bold mb-1">Camp Description & Free Medicine Details</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Details of shivir, free consultation, free medicines, doctors attending..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-orange-500 focus:bg-white font-semibold"
                    />
                  </div>

                  {/* Camp Image Options: Upload vs Direct URL */}
                  <div className="space-y-2.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <div className="flex justify-between items-center">
                      <label className="block text-[10px] text-slate-700 uppercase font-bold tracking-wider">
                        Camp Photo / Poster Image
                      </label>
                      <div className="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-slate-300">
                        <button
                          type="button"
                          onClick={() => {
                            setImageMode('upload');
                            setErrorMessage('');
                          }}
                          className={`px-2.5 py-1 rounded-md text-[10px] font-bold flex items-center gap-1 transition-all ${
                            imageMode === 'upload'
                              ? 'bg-orange-600 text-white shadow'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          <Upload className="w-3 h-3" />
                          <span>File Upload</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setImageMode('url');
                            setErrorMessage('');
                          }}
                          className={`px-2.5 py-1 rounded-md text-[10px] font-bold flex items-center gap-1 transition-all ${
                            imageMode === 'url'
                              ? 'bg-orange-600 text-white shadow'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          <LinkIcon className="w-3 h-3" />
                          <span>Image URL</span>
                        </button>
                      </div>
                    </div>

                    {imageMode === 'upload' ? (
                      <div className="space-y-1.5">
                        <input
                          type="file"
                          accept=".jpg,.jpeg,image/jpeg"
                          onChange={handleFileChange}
                          className="w-full text-slate-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border file:border-slate-300 file:text-xs file:font-semibold file:bg-white file:text-slate-800 file:cursor-pointer hover:file:bg-slate-100"
                        />
                        <p className="text-[10px] text-amber-800 font-semibold">
                          <strong>Strict Requirements:</strong> .jpg or .jpeg format only • Max size: <strong>150 KB</strong>
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-1.5">
                        <input
                          type="url"
                          placeholder="https://example.com/images/medical-camp-gaya.jpg"
                          value={imageUrlInput}
                          onChange={(e) => handleUrlInputChange(e.target.value)}
                          className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-orange-500 font-mono text-xs"
                        />
                        <p className="text-[10px] text-slate-500 font-medium">
                          Enter direct web image link starting with <code>http://</code> or <code>https://</code>
                        </p>
                      </div>
                    )}

                    {/* Image Preview Box */}
                    {formData.imageUrl && (
                      <div className="pt-2 flex items-center gap-3 border-t border-slate-200">
                        <img
                          src={getFullImageUrl(formData.imageUrl)}
                          alt="Camp Preview"
                          className="w-20 h-14 object-cover rounded-lg border border-slate-300 shrink-0 bg-white"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800';
                          }}
                        />
                        <div className="flex-1 space-y-1">
                          <p className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                            ✓ Image ready for website display
                          </p>
                          <button
                            type="button"
                            onClick={() => {
                              setFormData((prev) => ({ ...prev, imageUrl: '' }));
                              setImageUrlInput('');
                            }}
                            className="text-[10px] text-rose-600 hover:text-rose-700 underline font-semibold"
                          >
                            Remove Image
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 pt-1 border-t border-slate-200">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="isActive"
                        checked={formData.isActive}
                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                        className="w-4 h-4 rounded bg-white accent-orange-600 cursor-pointer"
                      />
                      <label htmlFor="isActive" className="text-slate-800 font-bold select-none cursor-pointer">
                        Publicly Display Camp on Website
                      </label>
                    </div>

                    <div className="flex items-center gap-2 bg-amber-50 p-3 rounded-xl border border-amber-200">
                      <input
                        type="checkbox"
                        id="isUpcomingPopup"
                        checked={formData.isUpcomingPopup}
                        onChange={(e) => setFormData({ ...formData, isUpcomingPopup: e.target.checked })}
                        className="w-4 h-4 rounded bg-white accent-amber-600 cursor-pointer"
                      />
                      <label htmlFor="isUpcomingPopup" className="text-amber-900 font-extrabold select-none cursor-pointer flex items-center gap-1 text-[11px]">
                        <Megaphone className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                        <span>Set as Active Upcoming Shivir Announcement Popup (Live Overlay on Main Website)</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 pt-3 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold rounded-xl shadow hover:from-orange-500 hover:to-amber-500 transition-colors"
                    >
                      {editingId ? 'Save Changes' : 'Create Camp'}
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
