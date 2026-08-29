'use client';

import React, { useEffect, useState } from 'react';
import { adminApiClient } from '../../lib/api-client';
import { AdminSidebar } from '../../components/AdminSidebar';
import { AdminHeader } from '../../components/AdminHeader';
import { Plus } from 'lucide-react';

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: 'Dr. Q.H. Khan',
    category: 'Homoeopathy Guidance',
    isPublished: true,
  });

  const fetchBlogs = async () => {
    const res = await adminApiClient('/blogs/admin/all');
    if (res.success && res.data) setBlogs(res.data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await adminApiClient('/blogs/admin', {
      method: 'POST',
      body: JSON.stringify(formData),
    });

    if (res.success) {
      setShowModal(false);
      fetchBlogs();
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
              <h1 className="text-2xl font-bold text-white">Health Blog Management</h1>
              <p className="text-xs text-slate-400">Publish articles and patient educational resources</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold text-xs rounded-xl shadow flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Create Blog Post
            </button>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800/60 text-slate-400 border-b border-slate-800 uppercase font-semibold">
                  <th className="p-3">Title</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Author</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {blogs.map((b) => (
                  <tr key={b._id} className="hover:bg-slate-800/40">
                    <td className="p-3 font-bold text-white">{b.title}</td>
                    <td className="p-3">{b.category}</td>
                    <td className="p-3">{b.author}</td>
                    <td className="p-3 font-bold text-emerald-400">{b.isPublished ? 'Published' : 'Draft'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {showModal && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-lg space-y-4 text-xs">
                <h3 className="font-bold text-white text-base">Create Blog Post</h3>
                <form onSubmit={handleCreate} className="space-y-3">
                  <input
                    type="text"
                    required
                    placeholder="Blog Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Short Excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white"
                  />
                  <textarea
                    rows={4}
                    required
                    placeholder="Full Content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white"
                  />
                  <div className="flex justify-end space-x-2 pt-2">
                    <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl">
                      Cancel
                    </button>
                    <button type="submit" className="px-4 py-2 bg-orange-600 text-white font-bold rounded-xl">
                      Publish Blog
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
