'use client'
import { useState } from 'react'
import { Plus, Edit2, Trash2, Eye, EyeOff, X, Save, Calendar } from 'lucide-react'
import { newsData } from '@/lib/placeholder-data'
import { useAdminContent } from '@/lib/admin-data'
import AdminDataNotice from '@/components/admin/AdminDataNotice'
import ImageUploadField from '@/components/admin/ImageUploadField'

const defaultPosts = newsData.map(n => ({ ...n, content: n.excerpt, is_published: true }))

export default function AdminNews() {
  const { data: posts, save, loading, saving, error, usingStarter } = useAdminContent('news', defaultPosts)
  const [showEditor, setShowEditor] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({
    title: '', excerpt: '', content: '', category: 'Campaign', cover: '', is_published: true, date: ''
  })

  const persistPosts = (updated: typeof posts) => save(updated)

  const openCreate = () => {
    setEditingId(null)
    setForm({ title: '', excerpt: '', content: '', category: 'Campaign', cover: '', is_published: false, date: new Date().toISOString().split('T')[0] })
    setShowEditor(true)
  }

  const openEdit = (post: typeof posts[0]) => {
    setEditingId(post.id)
    setForm({
      title: post.title, excerpt: post.excerpt, content: post.content || post.excerpt, category: post.category,
      cover: post.cover, is_published: post.is_published, date: post.date,
    })
    setShowEditor(true)
  }

  const handleSave = async () => {
    if (editingId) {
      if (!(await persistPosts(posts.map(p => p.id === editingId ? { ...p, ...form } : p)))) return
    } else {
      if (!(await persistPosts([{ id: Date.now().toString(), ...form }, ...posts]))) return
    }
    setShowEditor(false)
  }

  const togglePublish = async (id: string) => {
    await persistPosts(posts.map(p => p.id === id ? { ...p, is_published: !p.is_published } : p))
  }

  const deletePost = async (id: string) => {
    await persistPosts(posts.filter(p => p.id !== id))
  }

  if (showEditor) {
    return (
      <div className="max-w-4xl space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">
            {editingId ? 'Edit News Post' : 'Create New Post'}
          </h2>
          <div className="flex gap-3">
            <button onClick={() => setShowEditor(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-2">
              <X size={16} /> Cancel
            </button>
            <button disabled={saving} onClick={() => void handleSave()} className="px-6 py-2 bg-crimson text-white rounded-lg text-sm font-semibold hover:bg-crimson-dark flex items-center gap-2 disabled:opacity-60">
              <Save size={16} /> {saving ? 'Saving...' : editingId ? 'Save Changes' : 'Publish'}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Post Title</label>
            <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crimson/50 focus:border-crimson text-lg font-semibold" placeholder="Enter post title..." />
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crimson/50 focus:border-crimson">
                <option>Campaign</option><option>Youth</option><option>Community</option><option>Business</option><option>Events</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crimson/50 focus:border-crimson" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select value={form.is_published ? 'published' : 'draft'}
                onChange={e => setForm({ ...form, is_published: e.target.value === 'published' })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crimson/50 focus:border-crimson">
                <option value="published">Published</option><option value="draft">Draft</option>
              </select>
            </div>
          </div>

          <ImageUploadField label="Cover Image" value={form.cover || ''} onChange={value => setForm({ ...form, cover: value })} />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
            <textarea value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} rows={2}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crimson/50 focus:border-crimson resize-none" placeholder="Short summary..." />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content (Rich Text)</label>
            <textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} rows={12}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crimson/50 focus:border-crimson resize-none font-mono text-sm"
              placeholder="Write your full article content here... (HTML supported)" />
            <p className="text-xs text-gray-400 mt-1">Tip: In production, this will be a rich text editor (TipTap/Quill)</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">News & Blog Posts</h2>
          <p className="text-sm text-gray-500">{posts.length} posts total</p>
        </div>
        <button onClick={openCreate} className="px-4 py-2 bg-crimson text-white rounded-lg text-sm font-semibold hover:bg-crimson-dark flex items-center gap-2">
          <Plus size={16} /> New Post
        </button>
      </div>

      <AdminDataNotice loading={loading} error={error} usingStarter={usingStarter} />

      {/* Posts List */}
      <div className="space-y-3">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center gap-4 hover:shadow-md transition-all">
            <img src={post.cover} alt={post.title} className="w-20 h-16 rounded-lg object-cover flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-gray-800 truncate">{post.title}</h3>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${post.is_published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {post.is_published ? 'Published' : 'Draft'}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{post.category}</span>
                <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button disabled={saving} onClick={() => void togglePublish(post.id)} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 disabled:opacity-50" title={post.is_published ? 'Unpublish' : 'Publish'}>
                {post.is_published ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
              <button onClick={() => openEdit(post)} className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50">
                <Edit2 size={16} />
              </button>
              <button disabled={saving} onClick={() => void deletePost(post.id)} className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 disabled:opacity-50">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
