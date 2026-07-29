'use client'
import { useState } from 'react'
import { Save, Eye } from 'lucide-react'
import { aboutData } from '@/lib/placeholder-data'
import { useAdminContent } from '@/lib/admin-data'
import AdminDataNotice from '@/components/admin/AdminDataNotice'
import ImageUploadField from '@/components/admin/ImageUploadField'

const defaultForm = {
  pill: aboutData.pill,
  heading: aboutData.heading,
  paragraphs: aboutData.paragraphs.join('\n\n'),
  community_trust: aboutData.community_trust,
  youth_engagement: aboutData.youth_engagement,
  photo: '/mukk-removebg-preview.png',
}

export default function AdminAbout() {
  const { data: form, setData: setForm, save, loading, saving, error, usingStarter } = useAdminContent('about', defaultForm)
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    if (await save(form)) {
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">About Section</h2>
          <p className="text-sm text-gray-500">Edit the about section content</p>
        </div>
        <div className="flex gap-3">
          <a href="/#about" target="_blank" className="admin-action px-4 py-2 rounded-lg text-sm flex items-center gap-2">
            <Eye size={16} /> Preview
          </a>
          <button onClick={handleSave} disabled={saving}
            className="glass-action admin-action admin-action--primary px-6 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 disabled:opacity-50">
            {saving ? <div className="spinner" /> : saved ? '✓ Saved!' : <><Save size={16} /> Save</>}
          </button>
        </div>
      </div>

      <AdminDataNotice loading={loading} error={error} usingStarter={usingStarter} />

      <div className="admin-card rounded-2xl p-5 md:p-7 space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pill Text</label>
            <input type="text" value={form.pill} onChange={e => setForm({ ...form, pill: e.target.value })}
              className="admin-control w-full px-4 py-2.5" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Section Heading</label>
            <input type="text" value={form.heading} onChange={e => setForm({ ...form, heading: e.target.value })}
              className="admin-control w-full px-4 py-2.5" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bio Paragraphs (separate with blank line)</label>
          <textarea value={form.paragraphs} onChange={e => setForm({ ...form, paragraphs: e.target.value })}
            rows={12} className="admin-control w-full px-4 py-2.5 resize-none" />
        </div>

        <ImageUploadField
          label="About Photo"
          value={form.photo || ''}
          onChange={value => setForm({ ...form, photo: value })}
          placeholder="/mukk-removebg-preview.png or https://..."
        />

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Community Trust (%)</label>
            <input type="number" min="0" max="100" value={form.community_trust}
              onChange={e => setForm({ ...form, community_trust: parseInt(e.target.value) || 0 })}
              className="admin-control w-full px-4 py-2.5" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Youth Engagement (%)</label>
            <input type="number" min="0" max="100" value={form.youth_engagement}
              onChange={e => setForm({ ...form, youth_engagement: parseInt(e.target.value) || 0 })}
              className="admin-control w-full px-4 py-2.5" />
          </div>
        </div>
      </div>
    </div>
  )
}
