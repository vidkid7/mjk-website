'use client'
import { useState } from 'react'
import { Plus, Trash2, X, Edit2 } from 'lucide-react'
import { galleryData } from '@/lib/placeholder-data'
import { useAdminContent } from '@/lib/admin-data'
import AdminDataNotice from '@/components/admin/AdminDataNotice'
import ImageUploadField from '@/components/admin/ImageUploadField'

const categories = ['Community', 'Events', 'Youth', 'Business']

export default function AdminGallery() {
  const { data: photos, save, loading, saving, error, usingStarter } = useAdminContent('gallery', galleryData)
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({ url: '', caption: '', category: 'Community' })
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  const openCreate = () => {
    setEditingId(null)
    setForm({ url: '', caption: '', category: 'Community' })
    setShowModal(true)
  }

  const openEdit = (photo: typeof galleryData[0]) => {
    setEditingId(photo.id)
    setForm({ url: photo.url, caption: photo.caption, category: photo.category })
    setShowModal(true)
  }

  const handleSave = async () => {
    let updated: typeof photos
    if (editingId) {
      updated = photos.map(p => p.id === editingId ? { ...p, ...form } : p)
    } else {
      updated = [...photos, { id: Date.now().toString(), ...form }]
    }
    if (await save(updated)) setShowModal(false)
  }

  const handleDelete = async (id: string) => {
    const updated = photos.filter(p => p.id !== id)
    if (await save(updated)) setDeleteConfirm(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Gallery Management</h2>
          <p className="text-sm text-gray-500">{photos.length} photos in gallery</p>
        </div>
        <button
          onClick={openCreate}
          className="glass-action admin-action admin-action--primary px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
        >
          <Plus size={16} /> Add Photo
        </button>
      </div>

      <AdminDataNotice loading={loading} error={error} usingStarter={usingStarter} />

      {/* Photo Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <div key={photo.id} className="admin-card group relative overflow-hidden rounded-xl transition-all">
            <div className="relative h-40">
              <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => openEdit(photo)}
                  className="admin-list-action w-8 h-8 rounded-full flex items-center justify-center transition-colors" aria-label={`Edit ${photo.caption}`}
                >
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={() => setDeleteConfirm(photo.id)}
                  className="admin-list-action w-8 h-8 rounded-full flex items-center justify-center text-rose-200 hover:!border-crimson/60 hover:!bg-crimson/20 transition-colors" aria-label={`Delete ${photo.caption}`}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <div className="p-3">
              <span className="border border-crimson/40 bg-crimson/20 px-2 py-0.5 text-xs font-semibold text-rose-100 rounded-full">
                {photo.category}
              </span>
              <p className="text-sm text-gray-700 mt-1 truncate">{photo.caption}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm">
          <div role="dialog" aria-modal="true" aria-labelledby="gallery-dialog-title" className="admin-card max-h-[calc(100vh-2rem)] w-full max-w-lg overflow-y-auto rounded-2xl p-5 md:p-7">
            <div className="flex items-center justify-between mb-6">
              <h3 id="gallery-dialog-title" className="text-lg font-bold text-gray-800">
                {editingId ? 'Edit Photo' : 'Add New Photo'}
              </h3>
              <button onClick={() => setShowModal(false)} className="admin-list-action rounded-lg p-2" aria-label="Close photo editor">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <ImageUploadField label="Photo" value={form.url || ''} onChange={value => setForm({ ...form, url: value })} />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Caption</label>
                <input
                  type="text"
                  value={form.caption}
                  onChange={e => setForm({ ...form, caption: e.target.value })}
                  className="admin-control w-full px-4 py-2.5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={form.category}
                  onChange={e => setForm({ ...form, category: e.target.value })}
                  className="admin-control w-full px-4 py-2.5"
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="admin-action flex-1 py-2.5 rounded-lg">
                Cancel
              </button>
              <button disabled={saving} onClick={() => void handleSave()} className="glass-action admin-action admin-action--primary flex-1 py-2.5 rounded-lg font-semibold disabled:opacity-60">
                {saving ? 'Saving...' : editingId ? 'Save Changes' : 'Add Photo'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm">
          <div role="dialog" aria-modal="true" aria-labelledby="gallery-delete-dialog-title" className="admin-card max-h-[calc(100vh-2rem)] w-full max-w-sm overflow-y-auto rounded-2xl border-crimson/50 !bg-[#3f0d1b]/95 p-5 text-center md:p-7">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="text-red-600" size={20} />
            </div>
            <h3 id="gallery-delete-dialog-title" className="text-lg font-bold text-gray-800 mb-2">Delete Photo?</h3>
            <p className="text-sm text-gray-500 mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="admin-action flex-1 py-2.5 rounded-lg">
                Cancel
              </button>
              <button disabled={saving} onClick={() => void handleDelete(deleteConfirm)} className="flex-1 rounded-lg border border-crimson/70 bg-crimson py-2.5 font-semibold text-white hover:bg-crimson-dark disabled:opacity-60">
                {saving ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
