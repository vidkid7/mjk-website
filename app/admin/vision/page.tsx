'use client'
import { useState } from 'react'
import { Plus, Edit2, Trash2, X, GripVertical } from 'lucide-react'
import { visionCards } from '@/lib/placeholder-data'
import { useAdminContent } from '@/lib/admin-data'
import AdminDataNotice from '@/components/admin/AdminDataNotice'

const iconOptions = ['Building2', 'Briefcase', 'Laptop', 'Heart', 'TreePine', 'GraduationCap', 'Zap', 'Shield', 'Globe', 'Users']

export default function AdminVision() {
  const { data: cards, save, loading, saving, error, usingStarter } = useAdminContent('vision', visionCards)
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({ icon: 'Building2', heading: '', description: '' })

  const openCreate = () => { setEditingId(null); setForm({ icon: 'Building2', heading: '', description: '' }); setShowModal(true) }
  const openEdit = (card: typeof cards[0]) => { setEditingId(card.id); setForm({ icon: card.icon, heading: card.heading, description: card.description }); setShowModal(true) }

  const handleSave = async () => {
    let updated: typeof cards
    if (editingId) {
      updated = cards.map(c => c.id === editingId ? { ...c, ...form } : c)
    } else {
      updated = [...cards, { id: Date.now().toString(), ...form, order_index: cards.length }]
    }
    if (await save(updated)) setShowModal(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Vision Cards</h2>
          <p className="text-sm text-gray-500">{cards.length} vision pillars</p>
        </div>
        <button onClick={openCreate} className="glass-action admin-action admin-action--primary px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2">
          <Plus size={16} /> Add Card
        </button>
      </div>

      <AdminDataNotice loading={loading} error={error} usingStarter={usingStarter} />

      <div className="space-y-3">
        {cards.map((card, i) => (
          <div key={card.id} className="admin-card rounded-xl p-4 flex items-center gap-4 transition-all">
            <GripVertical size={16} className="text-gray-300 cursor-grab flex-shrink-0" />
            <div className="w-10 h-10 rounded-lg border border-crimson/40 bg-crimson/20 flex items-center justify-center flex-shrink-0">
              <span className="text-rose-100 text-sm font-bold">{i + 1}</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{card.heading}</h3>
              <p className="text-sm text-gray-500 truncate">{card.description}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => openEdit(card)} className="admin-list-action p-2 rounded-lg" aria-label={`Edit ${card.heading}`}><Edit2 size={16} /></button>
              <button disabled={saving} onClick={() => void save(cards.filter(c => c.id !== card.id))} className="admin-list-action p-2 rounded-lg text-rose-200 hover:!border-crimson/60 hover:!bg-crimson/20 disabled:opacity-50" aria-label={`Delete ${card.heading}`}><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm">
          <div role="dialog" aria-modal="true" aria-labelledby="vision-dialog-title" className="admin-card max-h-[calc(100vh-2rem)] w-full max-w-lg overflow-y-auto rounded-2xl p-5 md:p-7">
            <div className="flex items-center justify-between mb-6">
              <h3 id="vision-dialog-title" className="text-lg font-bold">{editingId ? 'Edit Vision Card' : 'New Vision Card'}</h3>
              <button onClick={() => setShowModal(false)} className="admin-list-action rounded-lg p-2" aria-label="Close vision editor"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                <select value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })}
                  className="admin-control w-full px-4 py-2.5">
                  {iconOptions.map(ic => <option key={ic} value={ic}>{ic}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
                <input type="text" value={form.heading} onChange={e => setForm({ ...form, heading: e.target.value })}
                  className="admin-control w-full px-4 py-2.5" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={4}
                  className="admin-control w-full px-4 py-2.5 resize-none" />
              </div>
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
