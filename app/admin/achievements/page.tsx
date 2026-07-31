'use client'
import { useState } from 'react'
import { Plus, Edit2, Trash2, X, GripVertical } from 'lucide-react'
import { achievementsData } from '@/lib/placeholder-data'
import { useAdminContent } from '@/lib/admin-data'
import AdminDataNotice from '@/components/admin/AdminDataNotice'

const iconOptions = ['Rocket', 'TreePine', 'Award', 'Heart', 'Code', 'Laptop', 'ShieldCheck', 'Flag', 'Star', 'Globe']

export default function AdminAchievements() {
  const { data: items, save, loading, saving, error, usingStarter } = useAdminContent('achievements', achievementsData)
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({ year: '', title: '', description: '', icon: 'Award' })

  const openCreate = () => { setEditingId(null); setForm({ year: '', title: '', description: '', icon: 'Award' }); setShowModal(true) }
  const openEdit = (item: typeof items[0]) => { setEditingId(item.id); setForm({ year: item.year, title: item.title, description: item.description, icon: item.icon }); setShowModal(true) }

  const handleSave = async () => {
    const updated = editingId
      ? items.map(i => i.id === editingId ? { ...i, ...form } : i)
      : [...items, { id: Date.now().toString(), ...form, order_index: items.length }]
    if (await save(updated)) setShowModal(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h2 className="text-xl font-bold text-gray-800">Achievements Timeline</h2>
          <p className="text-sm text-gray-500">{items.length} milestones</p></div>
        <button onClick={openCreate} className="glass-action admin-action admin-action--primary px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2">
          <Plus size={16} /> Add Milestone</button>
      </div>

      <AdminDataNotice loading={loading} error={error} usingStarter={usingStarter} />

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="admin-card rounded-xl p-4 flex items-center gap-4 transition-all">
            <GripVertical size={16} className="text-gray-300 cursor-grab flex-shrink-0" />
            <span className="border border-crimson/40 bg-crimson/30 px-3 py-1 text-sm font-bold text-white rounded-full flex-shrink-0">{item.year}</span>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-800">{item.title}</h3>
              <p className="text-sm text-gray-500 truncate">{item.description}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => openEdit(item)} className="admin-list-action p-2 rounded-lg" aria-label={`Edit ${item.title}`}><Edit2 size={16} /></button>
              <button disabled={saving} onClick={() => void save(items.filter(i => i.id !== item.id))} className="admin-list-action p-2 rounded-lg text-rose-200 hover:!border-crimson/60 hover:!bg-crimson/20 disabled:opacity-50" aria-label={`Delete ${item.title}`}><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm">
          <div role="dialog" aria-modal="true" aria-labelledby="achievement-dialog-title" className="admin-card max-h-[calc(100vh-2rem)] w-full max-w-lg overflow-y-auto rounded-2xl p-5 md:p-7">
            <div className="flex items-center justify-between mb-6">
              <h3 id="achievement-dialog-title" className="text-lg font-bold">{editingId ? 'Edit Milestone' : 'New Milestone'}</h3>
              <button onClick={() => setShowModal(false)} className="admin-list-action rounded-lg p-2" aria-label="Close milestone editor"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                  <input type="text" value={form.year} onChange={e => setForm({ ...form, year: e.target.value })}
                    className="admin-control w-full px-4 py-2.5" placeholder="2024" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                  <select value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })}
                    className="admin-control w-full px-4 py-2.5">
                    {iconOptions.map(ic => <option key={ic} value={ic}>{ic}</option>)}
                  </select></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                  className="admin-control w-full px-4 py-2.5" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3}
                  className="admin-control w-full px-4 py-2.5 resize-none" /></div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="admin-action flex-1 py-2.5 rounded-lg">Cancel</button>
              <button disabled={saving} onClick={() => void handleSave()} className="glass-action admin-action admin-action--primary flex-1 py-2.5 rounded-lg font-semibold disabled:opacity-60">{saving ? 'Saving...' : 'Save'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
