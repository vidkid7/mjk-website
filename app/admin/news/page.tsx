'use client'
import { useState } from 'react'
import { Plus, Edit2, Trash2, Eye, EyeOff, X, Save, Calendar } from 'lucide-react'
import { newsData } from '@/lib/placeholder-data'
import { useAdminContent } from '@/lib/admin-data'
import AdminDataNotice from '@/components/admin/AdminDataNotice'
import ImageUploadField from '@/components/admin/ImageUploadField'

const defaultPosts = newsData.map(n => ({ ...n, content: n.excerpt, is_published: true }))
const categories = ['Software', 'UX', 'Web Development', 'Automation', 'Planning', 'Case Study', 'Company Update']

export default function AdminNews() {
  const { data: posts, save, loading, saving, error, usingStarter } = useAdminContent('news', defaultPosts)
  const [showEditor, setShowEditor] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({
    title: '', excerpt: '', content: '', category: 'Software', cover: '', is_published: true, date: ''
  })

  const persistPosts = (updated: typeof posts) => save(updated)

  const openCreate = () => {
    setEditingId(null)
    setForm({ title: '', excerpt: '', content: '', category: 'Software', cover: '', is_published: false, date: new Date().toISOString().split('T')[0] })
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
            {editingId ? 'Edit Blog Post' : 'Create New Blog Post'}
          </h2>
          <div className="flex gap-3">
            <button onClick={() => setShowEditor(false)} className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">
              <X size={16} /> Cancel
            </button>
            <button disabled={saving} onClick={() => void handleSave()} className="flex items-center gap-2 rounded-lg bg-crimson px-6 py-2 text-sm font-semibold text-white hover:bg-crimson-dark disabled:opacity-60">
              <Save size={16} /> {saving ? 'Saving...' : editingId ? 'Save Changes' : 'Save Post'}
            </button>
          </div>
        </div>

        <div className="space-y-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Post Title</label>
            <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-lg font-semibold focus:border-crimson focus:ring-2 focus:ring-crimson/50" placeholder="Enter blog post title..." />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Category</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-crimson focus:ring-2 focus:ring-crimson/50">
                {categories.map(category => <option key={category}>{category}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Date</label>
              <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-crimson focus:ring-2 focus:ring-crimson/50" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Status</label>
              <select value={form.is_published ? 'published' : 'draft'}
                onChange={e => setForm({ ...form, is_published: e.target.value === 'published' })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-crimson focus:ring-2 focus:ring-crimson/50">
                <option value="published">Published</option><option value="draft">Draft</option>
              </select>
            </div>
          </div>

          <ImageUploadField label="Cover Image" value={form.cover || ''} onChange={value => setForm({ ...form, cover: value })} />

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Excerpt</label>
            <textarea value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} rows={2}
              className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 focus:border-crimson focus:ring-2 focus:ring-crimson/50" placeholder="Short summary shown on the blog card..." />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Full Content</label>
            <textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} rows={12}
              className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 font-mono text-sm focus:border-crimson focus:ring-2 focus:ring-crimson/50"
              placeholder="Write the full blog post here. Use blank lines between paragraphs." />
            <p className="mt-1 text-xs text-gray-400">Tip: Use blank lines to create separate paragraphs. Published posts appear on /blog and the homepage blog preview.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Blog Posts</h2>
          <p className="text-sm text-gray-500">{posts.length} posts total · Published posts appear on /blog</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 rounded-lg bg-crimson px-4 py-2 text-sm font-semibold text-white hover:bg-crimson-dark">
          <Plus size={16} /> New Blog Post
        </button>
      </div>

      <AdminDataNotice loading={loading} error={error} usingStarter={usingStarter} />

      <div className="space-y-3">
        {posts.map((post) => (
          <div key={post.id} className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
            <img src={post.cover} alt={post.title} className="h-16 w-20 flex-shrink-0 rounded-lg object-cover" />
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-center gap-2">
                <h3 className="truncate font-semibold text-gray-800">{post.title}</h3>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${post.is_published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {post.is_published ? 'Published' : 'Draft'}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <span className="rounded bg-gray-100 px-2 py-0.5 text-gray-600">{post.category}</span>
                <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
              </div>
            </div>
            <div className="flex flex-shrink-0 items-center gap-2">
              <button disabled={saving} onClick={() => void togglePublish(post.id)} className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 disabled:opacity-50" title={post.is_published ? 'Unpublish' : 'Publish'}>
                {post.is_published ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
              <button onClick={() => openEdit(post)} className="rounded-lg p-2 text-gray-400 hover:bg-blue-50 hover:text-blue-600">
                <Edit2 size={16} />
              </button>
              <button disabled={saving} onClick={() => void deletePost(post.id)} className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600 disabled:opacity-50">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
