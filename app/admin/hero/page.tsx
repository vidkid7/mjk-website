'use client'
import { useState, useEffect } from 'react'
import { Save, Upload, Eye } from 'lucide-react'
import { heroData } from '@/lib/placeholder-data'
import { loadData, saveData } from '@/lib/storage'

const defaultForm = {
  label: heroData.label,
  headline: heroData.headline.replace('\n', '\\n'),
  subheadline: heroData.subheadline,
  bio: heroData.bio,
  cta_primary: heroData.cta_primary,
  cta_secondary: heroData.cta_secondary,
  stat_projects: heroData.stats[0].value,
  stat_lives: heroData.stats[1].value,
  stat_years: heroData.stats[2].value,
  stat_youth: heroData.stats[3].value,
}

export default function AdminHero() {
  const [form, setForm] = useState(defaultForm)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setForm(loadData('hero', defaultForm))
  }, [])

  const handleSave = async () => {
    setSaving(true)
    saveData('hero', form)
    await new Promise(r => setTimeout(r, 1000))
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Hero Section Content</h2>
          <p className="text-sm text-gray-500">Edit the main hero banner of your website</p>
        </div>
        <div className="flex gap-3">
          <a href="/#home" target="_blank" className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Eye size={16} /> Preview
          </a>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 bg-crimson text-white rounded-lg text-sm font-semibold hover:bg-crimson-dark transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {saving ? <div className="spinner" /> : saved ? '✓ Saved!' : <><Save size={16} /> Save Changes</>}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        {/* Label */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Top Label / Badge Text</label>
          <input
            type="text"
            value={form.label}
            onChange={e => setForm({ ...form, label: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crimson/50 focus:border-crimson transition-all"
          />
        </div>

        {/* Headline */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Main Headline (use \n for line break)</label>
          <input
            type="text"
            value={form.headline}
            onChange={e => setForm({ ...form, headline: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crimson/50 focus:border-crimson transition-all text-lg font-semibold"
          />
        </div>

        {/* Subheadline */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subheadline</label>
          <input
            type="text"
            value={form.subheadline}
            onChange={e => setForm({ ...form, subheadline: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crimson/50 focus:border-crimson transition-all"
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Short Bio Paragraph</label>
          <textarea
            value={form.bio}
            onChange={e => setForm({ ...form, bio: e.target.value })}
            rows={3}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crimson/50 focus:border-crimson transition-all resize-none"
          />
        </div>

        {/* CTAs */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Primary CTA Text</label>
            <input
              type="text"
              value={form.cta_primary}
              onChange={e => setForm({ ...form, cta_primary: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crimson/50 focus:border-crimson transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Secondary CTA Text</label>
            <input
              type="text"
              value={form.cta_secondary}
              onChange={e => setForm({ ...form, cta_secondary: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crimson/50 focus:border-crimson transition-all"
            />
          </div>
        </div>

        {/* Hero Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Hero Portrait Image</label>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-crimson/50 transition-colors cursor-pointer">
            <Upload size={32} className="mx-auto text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
            <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB • Recommended: 600x800px</p>
          </div>
        </div>

        {/* Stats */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Hero Statistics</label>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { key: 'stat_projects', label: 'Community Projects', icon: '🏗️' },
              { key: 'stat_lives', label: 'Lives Impacted', icon: '👨‍👩‍👧' },
              { key: 'stat_years', label: 'Years Leadership', icon: '💼' },
              { key: 'stat_youth', label: 'Youths Mentored', icon: '🎓' },
            ].map(stat => (
              <div key={stat.key} className="bg-gray-50 rounded-lg p-3">
                <label className="text-xs text-gray-500 flex items-center gap-1 mb-1">
                  <span>{stat.icon}</span> {stat.label}
                </label>
                <input
                  type="number"
                  value={(form as any)[stat.key]}
                  onChange={e => setForm({ ...form, [stat.key]: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-lg font-bold focus:ring-2 focus:ring-crimson/50 focus:border-crimson"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
