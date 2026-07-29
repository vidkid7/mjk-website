'use client'
import { useState } from 'react'
import { Plus, Edit2, Trash2, X, Save } from 'lucide-react'
import { initiativesData } from '@/lib/placeholder-data'
import { useAdminContent } from '@/lib/admin-data'
import AdminDataNotice from '@/components/admin/AdminDataNotice'
import ImageUploadField from '@/components/admin/ImageUploadField'

const defaultItems = initiativesData.map(i => ({ ...i, is_published: true }))

export default function AdminInitiatives() {
  const { data: items, save, loading, saving, error, usingStarter } = useAdminContent('initiatives', defaultItems)
  const [showEditor, setShowEditor] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({ photo: '', category: 'Education', title: '', description: '', impact: '', is_published: true })

  const openCreate = () => {
    setEditingId(null)
    setForm({ photo: '', category: 'Education', title: '', description: '', impact: '', is_published: true })
    setShowEditor(true)
  }

  const openEdit = (item: typeof items[0]) => {
    setEditingId(item.id)
    setForm({ photo: item.photo, category: item.category, title: item.title, description: item.description, impact: item.impact, is_published: item.is_published })
    setShowEditor(true)
  }

  const handleSave = async () => {
    let updated: typeof items
    if (editingId) { updated = items.map(i => i.id === editingId ? { ...i, ...form } : i) }
    else { updated = [...items, { id: Date.now().toString(), ...form }] }
    if (await save(updated)) setShowEditor(false)
  }

  if (showEditor) {
    return (
      <div className="max-w-4xl space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">{editingId ? 'Edit Initiative' : 'New Initiative'}</h2>
          <div className="flex gap-3">
            <button onClick={() => setShowEditor(false)} className="admin-action px-4 py-2 rounded-lg text-sm flex items-center gap-2"><X size={16} /> Cancel</button>
            <button disabled={saving} onClick={() => void handleSave()} className="glass-action admin-action admin-action--primary px-6 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 disabled:opacity-60"><Save size={16} /> {saving ? 'Saving...' : 'Save'}</button>
          </div>
        </div>
        <div className="admin-card rounded-2xl p-5 md:p-7 space-y-5">
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
              className="admin-control w-full px-4 py-2.5" /></div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                className="admin-control w-full px-4 py-2.5">
                <option>Education</option><option>Health</option><option>Environment</option><option>Infrastructure</option><option>Empowerment</option>
              </select></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Impact Stat</label>
              <input type="text" value={form.impact} onChange={e => setForm({ ...form, impact: e.target.value })} placeholder="e.g. 3,000 students trained"
                className="admin-control w-full px-4 py-2.5" /></div>
          </div>
          <ImageUploadField label="Photo" value={form.photo || ''} onChange={value => setForm({ ...form, photo: value })} />
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={4}
              className="admin-control w-full px-4 py-2.5 resize-none" /></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h2 className="text-xl font-bold text-gray-800">Initiatives</h2>
          <p className="text-sm text-gray-500">{items.length} initiatives</p></div>
        <button onClick={openCreate} className="glass-action admin-action admin-action--primary px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2">
          <Plus size={16} /> Add Initiative</button>
      </div>
      <AdminDataNotice loading={loading} error={error} usingStarter={usingStarter} />
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="admin-card rounded-xl p-4 flex items-center gap-4 transition-all">
            <img src={item.photo} alt={item.title} className="w-20 h-16 rounded-lg object-cover flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-gray-800 truncate">{item.title}</h3>
                <span className="px-2 py-0.5 rounded-full text-xs font-medium border border-crimson/40 bg-crimson/20 text-rose-100">{item.category}</span>
              </div>
              <p className="text-sm text-gray-500 truncate">{item.impact}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => openEdit(item)} className="admin-list-action p-2 rounded-lg" aria-label={`Edit ${item.title}`}><Edit2 size={16} /></button>
              <button disabled={saving} onClick={() => void save(items.filter(i => i.id !== item.id))} className="admin-list-action p-2 rounded-lg text-rose-200 hover:!border-crimson/60 hover:!bg-crimson/20 disabled:opacity-50" aria-label={`Delete ${item.title}`}><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
