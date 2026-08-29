'use client';

import React, { useEffect, useState } from 'react';
import { adminApiClient } from '../../lib/api-client';
import { AdminSidebar } from '../../components/AdminSidebar';
import { AdminHeader } from '../../components/AdminHeader';
import { Plus, Trash2, Edit3, Youtube, ExternalLink, HelpCircle } from 'lucide-react';

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    youtubeUrl: '',
    category: 'testimonial',
    description: '',
    isActive: true,
  });

  const fetchVideos = async () => {
    const res = await adminApiClient('/videos/admin');
    if (res.success && res.data) setVideos(res.data);
  };

  useEffect(() => {
    
    fetchVideos();
  }, []);

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({
      title: '',
      youtubeUrl: '',
      category: 'testimonial',
      description: '',
      isActive: true,
    });
    setErrorMessage('');
    setShowModal(true);
  };

  const handleOpenEdit = (video: any) => {
    setEditingId(video._id);
    setFormData({
      title: video.title,
      youtubeUrl: video.youtubeUrl,
      category: video.category,
      description: video.description || '',
      isActive: video.isActive,
    });
    setErrorMessage('');
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const endpoint = editingId ? `/videos/${editingId}` : '/videos';

    const res = await adminApiClient(endpoint, {
      method,
      body: JSON.stringify(formData),
    });

    if (res.success) {
      setShowModal(false);
      fetchVideos();
    } else {
      setErrorMessage(res.message || 'Validation or Server Error');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this video link?')) return;
    const res = await adminApiClient(`/videos/${id}`, {
      method: 'DELETE',
    });
    if (res.success) {
      fetchVideos();
    }
  };

  const getEmbedId = (url: string) => {
    try {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = url.match(regExp);
      return match && match[2].length === 11 ? match[2] : null;
    } catch {
      return null;
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
              <h1 className="text-2xl font-bold text-white">YouTube Video Testimonials & Camps</h1>
              <p className="text-xs text-slate-400">Manage video feedbacks, camp recordings, and awareness streams</p>
            </div>
            <button
              onClick={handleOpenCreate}
              className="px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold text-xs rounded-xl shadow flex items-center gap-1.5 hover:from-orange-500 hover:to-amber-500 transition-colors"
            >
              <Plus className="w-4 h-4" /> Add YouTube Video
            </button>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800/60 text-slate-400 border-b border-slate-800 uppercase font-semibold">
                  <th className="p-3">Preview</th>
                  <th className="p-3">Video Title</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">YouTube URL</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {videos.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-4 text-center text-slate-500">No YouTube videos registered yet.</td>
                  </tr>
                ) : (
                  videos.map((v) => {
                    const embedId = getEmbedId(v.youtubeUrl);
                    const thumbUrl = embedId ? `https://img.youtube.com/vi/${embedId}/default.jpg` : '';
                    return (
                      <tr key={v._id} className="hover:bg-slate-800/40">
                        <td className="p-3 w-16">
                          {thumbUrl ? (
                            <img
                              src={thumbUrl}
                              alt="Thumbnail"
                              className="w-12 h-9 object-cover rounded-lg border border-slate-700"
                            />
                          ) : (
                            <div className="w-12 h-9 bg-slate-800 rounded-lg flex items-center justify-center text-rose-500">
                              <Youtube className="w-4 h-4" />
                            </div>
                          )}
                        </td>
                        <td className="p-3 font-bold text-white max-w-xs truncate">{v.title}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded font-bold uppercase text-[9px] ${
                            v.category === 'testimonial'
                              ? 'bg-indigo-950 text-indigo-400 border border-indigo-900'
                              : v.category === 'camp'
                              ? 'bg-amber-950 text-amber-400 border border-amber-900'
                              : 'bg-slate-850 text-slate-300 border border-slate-750'
                          }`}>
                            {v.category === 'testimonial' ? 'Patient Testimonial' : v.category === 'camp' ? 'Camp Highlights' : 'General'}
                          </span>
                        </td>
                        <td className="p-3 max-w-xs truncate font-mono text-slate-400">
                          <a
                            href={v.youtubeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-amber-400 flex items-center gap-1 inline-flex"
                          >
                            {v.youtubeUrl} <ExternalLink className="w-3 h-3 shrink-0" />
                          </a>
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] ${v.isActive ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-slate-850 text-slate-500 border border-slate-800'}`}>
                            {v.isActive ? 'Active' : 'Hidden'}
                          </span>
                        </td>
                        <td className="p-3 text-right space-x-2">
                          <button
                            onClick={() => handleOpenEdit(v)}
                            className="p-1.5 bg-slate-800 text-slate-300 rounded hover:bg-slate-700 hover:text-white"
                            title="Edit Video"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(v._id)}
                            className="p-1.5 bg-rose-950/30 text-rose-400 rounded hover:bg-rose-900 hover:text-white"
                            title="Delete Video"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {showModal && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-lg space-y-4 text-xs">
                <h3 className="font-bold text-white text-base">
                  {editingId ? 'Edit YouTube Video Link' : 'Add YouTube Video'}
                </h3>
                {errorMessage && (
                  <div className="p-3 bg-rose-950/40 border border-rose-900 rounded-xl text-rose-400 font-bold">
                    {errorMessage}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Video Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Chronic Vitiligo Recovery Testimonial"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">YouTube URL</label>
                    <input
                      type="url"
                      required
                      placeholder="e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                      value={formData.youtubeUrl}
                      onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                      className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none focus:border-orange-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none focus:border-orange-500 font-semibold"
                      >
                        <option value="testimonial">Patient Testimonial</option>
                        <option value="camp">Camp highlights / Shivir</option>
                        <option value="general">General Homeopathy Advice</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Status</label>
                      <div className="flex items-center h-10 gap-2">
                        <input
                          type="checkbox"
                          id="isActive"
                          checked={formData.isActive}
                          onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                          className="w-4 h-4 rounded bg-slate-800 accent-orange-600 outline-none cursor-pointer"
                        />
                        <label htmlFor="isActive" className="text-slate-300 font-medium select-none cursor-pointer">
                          Publish on Website
                        </label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Description (Optional)</label>
                    <textarea
                      rows={3}
                      placeholder="Brief details or quotes from the video..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none focus:border-orange-500"
                    />
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
                      {editingId ? 'Save Changes' : 'Add Video'}
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
