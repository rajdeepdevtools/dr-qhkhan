'use client';

import React, { useEffect, useState } from 'react';
import { adminApiClient } from '../../lib/api-client';
import { AdminSidebar } from '../../components/AdminSidebar';
import { AdminHeader } from '../../components/AdminHeader';
import { Plus, Trash2, Calendar, MapPin, Edit3, Image as ImageIcon, Link as LinkIcon, Upload, ShieldAlert, X } from 'lucide-react';

export default function AdminCampsPage() {
  const [camps, setCamps] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const [imageMode, setImageMode] = useState<'upload' | 'url'>('upload');
  const [imageUrlInput, setImageUrlInput] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    imageUrl: '',
    isActive: true,
  });

  const fetchCamps = async () => {
    const res = await adminApiClient('/camps/admin');
    if (res.success && res.data) setCamps(res.data);
  };

  useEffect(() => {
    fetchCamps();
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

    // Security check: Must start with http:// or https://
    if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
      setErrorMessage('Security Error: Image link must start with http:// or https://');
      setFormData((prev) => ({ ...prev, imageUrl: '' }));
      return;
    }

    // Security check against script injection / XSS
    if (trimmed.toLowerCase().includes('javascript:') || trimmed.toLowerCase().includes('<script')) {
      setErrorMessage('Security Error: Malicious script pattern detected in image URL.');
      setFormData((prev) => ({ ...prev, imageUrl: '' }));
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
      location: '',
      imageUrl: '',
      isActive: true,
    });
    setErrorMessage('');
    setShowModal(true);
  };

  const handleOpenEdit = (camp: any) => {
    setEditingId(camp._id);
    const isDirectUrl = camp.imageUrl?.startsWith('http://') || camp.imageUrl?.startsWith('https://');
    setImageMode(isDirectUrl ? 'url' : 'upload');
    setImageUrlInput(isDirectUrl ? camp.imageUrl : '');
    setFormData({
      title: camp.title,
      description: camp.description,
      date: camp.date,
      location: camp.location,
      imageUrl: camp.imageUrl,
      isActive: camp.isActive,
    });
    setErrorMessage('');
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.imageUrl) {
      setErrorMessage('Image is required (Upload JPG file <= 150KB or provide a direct image link URL).');
      return;
    }

    const method = editingId ? 'PUT' : 'POST';
    const endpoint = editingId ? `/camps/${editingId}` : '/camps';

    const res = await adminApiClient(endpoint, {
      method,
      body: JSON.stringify(formData),
    });

    if (res.success) {
      setShowModal(false);
      fetchCamps();
    } else {
      setErrorMessage(res.message || 'Validation or Server Error');
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

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader />
        <main className="p-6 space-y-6 flex-1 overflow-y-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">Medical Camps & Shivir (Samaj Seva)</h1>
              <p className="text-xs text-slate-400">Manage free medicine camps, location, and visual updates</p>
            </div>
            <button
              onClick={handleOpenCreate}
              className="px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold text-xs rounded-xl shadow flex items-center gap-1.5 hover:from-orange-500 hover:to-amber-500 transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Medical Camp
            </button>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800/60 text-slate-400 border-b border-slate-800 uppercase font-semibold">
                  <th className="p-3">Image</th>
                  <th className="p-3">Camp Title</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {camps.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-4 text-center text-slate-500">No medical camps configured yet.</td>
                  </tr>
                ) : (
                  camps.map((c) => (
                    <tr key={c._id} className="hover:bg-slate-800/40">
                      <td className="p-3 w-16">
                        {c.imageUrl ? (
                          <img
                            src={getFullImageUrl(c.imageUrl)}
                            alt={c.title}
                            className="w-12 h-10 object-cover rounded-lg border border-slate-700"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800';
                            }}
                          />
                        ) : (
                          <div className="w-12 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-500">
                            <ImageIcon className="w-4 h-4" />
                          </div>
                        )}
                      </td>
                      <td className="p-3 font-bold text-white max-w-xs truncate">{c.title}</td>
                      <td className="p-3 text-slate-300 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-amber-500 shrink-0" /> {c.date}
                      </td>
                      <td className="p-3 text-slate-300">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" /> {c.location}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] ${c.isActive ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-slate-850 text-slate-500 border border-slate-800'}`}>
                          {c.isActive ? 'Active' : 'Hidden'}
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEdit(c)}
                          className="p-1.5 bg-slate-800 text-slate-300 rounded hover:bg-slate-700 hover:text-white"
                          title="Edit Camp"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(c._id)}
                          className="p-1.5 bg-rose-950/30 text-rose-400 rounded hover:bg-rose-900 hover:text-white"
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

          {showModal && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-lg space-y-4 text-xs">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <h3 className="font-bold text-white text-base">
                    {editingId ? 'Edit Medical Camp' : 'Add Medical Camp (Shivir)'}
                  </h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {errorMessage && (
                  <div className="p-3 bg-rose-950/60 border border-rose-800 rounded-xl text-rose-300 font-bold flex items-start gap-2">
                    <ShieldAlert className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Camp Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Free Homeopathic Skin Camp"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none focus:border-orange-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Camp Date</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 15th August 2026"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Location</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Gaya, Bihar"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Camp Description</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Details of shivir, free medicines, patients served..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none focus:border-orange-500"
                    />
                  </div>

                  {/* Camp Image Options: Upload vs Direct URL */}
                  <div className="space-y-2.5 bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
                    <div className="flex justify-between items-center">
                      <label className="block text-[10px] text-slate-300 uppercase font-bold tracking-wider">
                        Camp Photo / Image
                      </label>
                      <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800">
                        <button
                          type="button"
                          onClick={() => {
                            setImageMode('upload');
                            setErrorMessage('');
                          }}
                          className={`px-2.5 py-1 rounded-md text-[10px] font-bold flex items-center gap-1 transition-all ${
                            imageMode === 'upload'
                              ? 'bg-orange-600 text-white shadow'
                              : 'text-slate-400 hover:text-slate-200'
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
                              : 'text-slate-400 hover:text-slate-200'
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
                          className="w-full text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-white file:cursor-pointer hover:file:bg-slate-700"
                        />
                        <p className="text-[10px] text-amber-400/90 font-medium">
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
                          className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none focus:border-orange-500 font-mono text-xs"
                        />
                        <p className="text-[10px] text-slate-400 font-medium">
                          Enter direct web image link starting with <code>http://</code> or <code>https://</code>
                        </p>
                      </div>
                    )}

                    {/* Image Preview Box */}
                    {formData.imageUrl && (
                      <div className="pt-2 flex items-center gap-3 border-t border-slate-800">
                        <img
                          src={getFullImageUrl(formData.imageUrl)}
                          alt="Camp Preview"
                          className="w-20 h-14 object-cover rounded-lg border border-slate-700 shrink-0 bg-slate-900"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800';
                          }}
                        />
                        <div className="flex-1 space-y-1">
                          <p className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                            ✓ Image ready for website display
                          </p>
                          <button
                            type="button"
                            onClick={() => {
                              setFormData((prev) => ({ ...prev, imageUrl: '' }));
                              setImageUrlInput('');
                            }}
                            className="text-[10px] text-rose-400 hover:text-rose-300 underline font-semibold"
                          >
                            Remove Image
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="w-4 h-4 rounded bg-slate-800 accent-orange-600 outline-none cursor-pointer"
                    />
                    <label htmlFor="isActive" className="text-slate-300 font-medium select-none cursor-pointer">
                      Make Camp Public on Website
                    </label>
                  </div>
                  <div className="flex justify-end space-x-2 pt-3">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold transition-colors"
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
