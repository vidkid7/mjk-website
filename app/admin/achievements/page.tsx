'use client'
import { useState } from 'react'
import { Plus, Edit2, Trash2, X, GripVertical } from 'lucide-react'
import { achievementsData } from '@/lib/placeholder-data'

const iconOptions = ['Rocket', 'TreePine', 'Award', 'Heart', 'Code', 'Laptop', 'ShieldCheck', 'Flag', 'Star', 'Globe']

export default function AdminAchievements() {
  const [items, setItems] = useState(achievementsData)
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({ year: '', title: '', description: '', icon: 'Award' })

  const openCreate = () => { setEditingId(null); setForm({ year: '', title: '', description: '', icon: 'Award' }); setShowModal(true) }
  const openEdit = (item: typeof items[0]) => { setEditingId(item.id); setForm({ year: item.year, title: item.title, description: item.description, icon: item.icon }); setShowModal(true) }

  const handleSave = () => {
    if (editingId) { setItems(items.map(i => i.id === editingId ? { ...i, ...form } : i)) }
    else { setItems([...items, { id: Date.now().toString(), ...form, order_index: items.length }]) }
    setShowModal(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h2 className="text-xl font-bold text-gray-800">Achievements Timeline</h2>
          <p className="text-sm text-gray-500">{items.length} milestones</p></div>
        <button onClick={openCreate} className="px-4 py-2 bg-crimson text-white rounded-lg text-sm font-semibold hover:bg-crimson-dark flex items-center gap-2">
          <Plus size={16} /> Add Milestone</button>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center gap-4 hover:shadow-md transition-all">
            <GripVertical size={16} className="text-gray-300 cursor-grab flex-shrink-0" />
            <span className="px-3 py-1 bg-crimson text-white text-sm font-bold rounded-full flex-shrink-0">{item.year}</span>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-800">{item.title}</h3>
              <p className="text-sm text-gray-500 truncate">{item.description}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => openEdit(item)} className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50"><Edit2 size={16} /></button>
              <button onClick={() => setItems(items.filter(i => i.id !== item.id))} className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">{editingId ? 'Edit Milestone' : 'New Milestone'}</h3>
              <button onClick={() => setShowModal(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                  <input type="text" value={form.year} onChange={e => setForm({ ...form, year: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crimson/50" placeholder="2024" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                  <select value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crimson/50">
                    {iconOptions.map(ic => <option key={ic} value={ic}>{ic}</option>)}
                  </select></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crimson/50" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crimson/50 resize-none" /></div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">Cancel</button>
              <button onClick={handleSave} className="flex-1 py-2.5 bg-crimson text-white rounded-lg font-semibold hover:bg-crimson-dark">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
