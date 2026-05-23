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
        <button onClick={openCreate} className="px-4 py-2 bg-crimson text-white rounded-lg text-sm font-semibold hover:bg-crimson-dark flex items-center gap-2">
          <Plus size={16} /> Add Card
        </button>
      </div>

      <AdminDataNotice loading={loading} error={error} usingStarter={usingStarter} />

      <div className="space-y-3">
        {cards.map((card, i) => (
          <div key={card.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center gap-4 hover:shadow-md transition-all">
            <GripVertical size={16} className="text-gray-300 cursor-grab flex-shrink-0" />
            <div className="w-10 h-10 rounded-lg bg-crimson/10 flex items-center justify-center flex-shrink-0">
              <span className="text-crimson text-sm font-bold">{i + 1}</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{card.heading}</h3>
              <p className="text-sm text-gray-500 truncate">{card.description}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => openEdit(card)} className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50"><Edit2 size={16} /></button>
              <button disabled={saving} onClick={() => void save(cards.filter(c => c.id !== card.id))} className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 disabled:opacity-50"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">{editingId ? 'Edit Vision Card' : 'New Vision Card'}</h3>
              <button onClick={() => setShowModal(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                <select value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crimson/50">
                  {iconOptions.map(ic => <option key={ic} value={ic}>{ic}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
                <input type="text" value={form.heading} onChange={e => setForm({ ...form, heading: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crimson/50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={4}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crimson/50 resize-none" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">Cancel</button>
              <button disabled={saving} onClick={() => void handleSave()} className="flex-1 py-2.5 bg-crimson text-white rounded-lg font-semibold hover:bg-crimson-dark disabled:opacity-60">{saving ? 'Saving...' : 'Save'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
