'use client';

import React, { useEffect, useState } from 'react';
import { adminApiClient } from '../../lib/api-client';
import { AdminSidebar } from '../../components/AdminSidebar';
import { AdminHeader } from '../../components/AdminHeader';
import { Plus, Edit3, Trash2 } from 'lucide-react';

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

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

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      author: 'Dr. Q.H. Khan',
      category: 'Homoeopathy Guidance',
      isPublished: true,
    });
    setErrorMessage('');
    setShowModal(true);
  };

  const handleOpenEdit = (b: any) => {
    setEditingId(b._id);
    setFormData({
      title: b.title || '',
      excerpt: b.excerpt || '',
      content: b.content || '',
      author: b.author || 'Dr. Q.H. Khan',
      category: b.category || 'Homoeopathy Guidance',
      isPublished: b.isPublished ?? true,
    });
    setErrorMessage('');
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const method = editingId ? 'PUT' : 'POST';
    const endpoint = editingId ? `/blogs/admin/${editingId}` : '/blogs/admin';

    const res = await adminApiClient(endpoint, {
      method,
      body: JSON.stringify(formData),
    });

    if (res.success) {
      setShowModal(false);
      fetchBlogs();
    } else {
      setErrorMessage(res.message || 'Failed to save blog post.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    const res = await adminApiClient(`/blogs/admin/${id}`, { method: 'DELETE' });
    if (res.success) {
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
              <h1 className="text-2xl font-bold text-slate-800">Health Blog Management</h1>
              <p className="text-xs text-slate-500">Publish articles and patient educational resources</p>
            </div>
            <button
              onClick={handleOpenCreate}
              className="px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs rounded-xl shadow flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4" /> Create Blog Post
            </button>
          </div>

          <div className="bg-white shadow-sm border border-slate-200 rounded-2xl overflow-hidden text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-400 border-b border-slate-200 uppercase font-semibold">
                  <th className="p-3">Title</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Author</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                {blogs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-4 text-center text-slate-500">No blog posts found.</td>
                  </tr>
                ) : (
                  blogs.map((b) => (
                    <tr key={b._id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-bold text-slate-900 max-w-xs truncate">{b.title}</td>
                      <td className="p-3">{b.category}</td>
                      <td className="p-3">{b.author}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] ${b.isPublished ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-slate-850 text-slate-500 border border-slate-200'}`}>
                          {b.isPublished ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEdit(b)}
                          className="p-1.5 bg-slate-50 text-slate-600 rounded hover:bg-slate-700 hover:text-white transition-colors"
                          title="Edit Blog Post"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(b._id)}
                          className="p-1.5 bg-rose-950/30 text-rose-400 rounded hover:bg-rose-900 hover:text-white transition-colors"
                          title="Delete Blog Post"
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
              <div className="bg-white shadow-sm border border-slate-200 rounded-2xl p-6 w-full max-w-lg space-y-4 text-xs">
                <h3 className="font-bold text-slate-800 text-base">
                  {editingId ? 'Edit Blog Post' : 'Create Blog Post'}
                </h3>
                {errorMessage && (
                  <div className="p-3 bg-rose-950/40 border border-rose-900 rounded-xl text-rose-400 font-bold">
                    {errorMessage}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Blog Title</label>
                    <input
                      type="text"
                      required
                      placeholder="Blog Title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Author</label>
                      <input
                        type="text"
                        required
                        placeholder="Author"
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Category</label>
                      <input
                        type="text"
                        required
                        placeholder="Category"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Short Excerpt</label>
                    <input
                      type="text"
                      required
                      placeholder="Short Excerpt"
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Full Content</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Full Content"
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="isPublished"
                      checked={formData.isPublished}
                      onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                      className="w-4 h-4 rounded bg-slate-50 accent-orange-600 cursor-pointer"
                    />
                    <label htmlFor="isPublished" className="text-slate-600 font-medium cursor-pointer">
                      Publish Immediately on Website
                    </label>
                  </div>
                  <div className="flex justify-end space-x-2 pt-2">
                    <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-slate-50 hover:bg-slate-700 text-slate-600 rounded-xl font-bold transition-colors">
                      Cancel
                    </button>
                    <button type="submit" className="px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold rounded-xl shadow transition-colors">
                      {editingId ? 'Save Changes' : 'Publish Blog'}
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
