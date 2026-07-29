'use client'
import { useState } from 'react'
import { Plus, Edit2, Trash2, X, Star, GripVertical } from 'lucide-react'
import { testimonialsData } from '@/lib/placeholder-data'
import { useAdminContent } from '@/lib/admin-data'
import AdminDataNotice from '@/components/admin/AdminDataNotice'
import ImageUploadField from '@/components/admin/ImageUploadField'

export default function AdminTestimonials() {
  const { data: items, save, loading, saving, error, usingStarter } = useAdminContent('testimonials', testimonialsData)
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({ photo: '', name: '', role: '', quote: '', rating: 5 })

  const openCreate = () => { setEditingId(null); setForm({ photo: '', name: '', role: '', quote: '', rating: 5 }); setShowModal(true) }
  const openEdit = (item: typeof items[0]) => { setEditingId(item.id); setForm({ photo: item.photo, name: item.name, role: item.role, quote: item.quote, rating: item.rating }); setShowModal(true) }

  const handleSave = async () => {
    const updated = editingId
      ? items.map(i => i.id === editingId ? { ...i, ...form } : i)
      : [...items, { id: Date.now().toString(), ...form }]
    if (await save(updated)) setShowModal(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h2 className="text-xl font-bold text-gray-800">Testimonials</h2>
          <p className="text-sm text-gray-500">{items.length} testimonials</p></div>
        <button onClick={openCreate} className="glass-action admin-action admin-action--primary px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2">
          <Plus size={16} /> Add Testimonial</button>
      </div>

      <AdminDataNotice loading={loading} error={error} usingStarter={usingStarter} />

      <div className="grid md:grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item.id} className="admin-card rounded-2xl p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <img src={item.photo} alt={item.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h4 className="font-semibold text-gray-800">{item.name}</h4>
                  <p className="text-xs text-gray-500">{item.role}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => openEdit(item)} className="admin-list-action p-1.5 rounded" aria-label={`Edit ${item.name}`}><Edit2 size={14} /></button>
                <button disabled={saving} onClick={() => void save(items.filter(i => i.id !== item.id))} className="admin-list-action p-1.5 rounded text-rose-200 hover:!border-crimson/60 hover:!bg-crimson/20 disabled:opacity-50" aria-label={`Delete ${item.name}`}><Trash2 size={14} /></button>
              </div>
            </div>
            <div className="flex gap-0.5 mb-2">
              {[...Array(item.rating)].map((_, i) => <Star key={i} size={12} className="text-gold fill-gold" />)}
            </div>
            <p className="text-sm text-gray-600 italic line-clamp-3">&ldquo;{item.quote}&rdquo;</p>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm">
          <div role="dialog" aria-modal="true" aria-labelledby="testimonial-dialog-title" className="admin-card max-h-[calc(100vh-2rem)] w-full max-w-lg overflow-y-auto rounded-2xl p-5 md:p-7">
            <div className="flex items-center justify-between mb-6">
              <h3 id="testimonial-dialog-title" className="text-lg font-bold">{editingId ? 'Edit Testimonial' : 'New Testimonial'}</h3>
              <button onClick={() => setShowModal(false)} className="admin-list-action rounded-lg p-2" aria-label="Close testimonial editor"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                    className="admin-control w-full px-4 py-2.5" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <input type="text" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}
                    className="admin-control w-full px-4 py-2.5" /></div>
              </div>
              <ImageUploadField label="Photo" value={form.photo || ''} onChange={value => setForm({ ...form, photo: value })} />
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Quote</label>
                <textarea value={form.quote} onChange={e => setForm({ ...form, quote: e.target.value })} rows={3}
                  className="admin-control w-full px-4 py-2.5 resize-none" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5)</label>
                <div className="flex gap-2">
                  {[1,2,3,4,5].map(r => (
                    <button key={r} onClick={() => setForm({ ...form, rating: r })}
                      className={`admin-list-action p-2 rounded-lg transition-colors ${form.rating >= r ? 'text-gold' : 'text-gray-300'}`} aria-label={`Set rating to ${r}`}>
                      <Star size={20} fill={form.rating >= r ? 'currentColor' : 'none'} />
                    </button>
                  ))}
                </div>
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
