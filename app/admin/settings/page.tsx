'use client'
import { useState } from 'react'
import { Save, Globe, Phone, Mail, MapPin, Share2 } from 'lucide-react'
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter, FaTiktok } from 'react-icons/fa'
import { useAdminContent } from '@/lib/admin-data'
import AdminDataNotice from '@/components/admin/AdminDataNotice'

const defaultForm = {
  site_title: 'Mukesh Jung Khadka | Mayor Candidate',
  meta_description: 'Official website of Mukesh Jung Khadka — Entrepreneur, Social Worker, Youth Inspirator, and Mayor Candidate for Kathmandu.',
  phone: '+977 9851241656',
  email: 'khadkamukesh423@gmail.com',
  address: 'Ward No. 10, Kathmandu Metropolitan City, Bagmati Province, Nepal',
  facebook_url: 'https://facebook.com/mjk',
  instagram_url: 'https://instagram.com/mjk',
  youtube_url: 'https://youtube.com/@mjk',
  twitter_url: 'https://twitter.com/mjk',
  tiktok_url: 'https://tiktok.com/@mjk',
  visible_sections: {
    hero: true,
    about: true,
    achievements: true,
    vision: true,
    initiatives: true,
    entrepreneurship: true,
    youth: true,
    testimonials: true,
    gallery: true,
    news: true,
    stats: true,
    support: true,
    contact: true,
  },
}

const sectionVisibilityOptions = [
  { key: 'hero', label: 'Hero' },
  { key: 'about', label: 'About' },
  { key: 'achievements', label: 'Achievements' },
  { key: 'vision', label: 'Vision' },
  { key: 'initiatives', label: 'Initiatives' },
  { key: 'entrepreneurship', label: 'Entrepreneurship' },
  { key: 'youth', label: 'Youth Inspiration' },
  { key: 'testimonials', label: 'Testimonials' },
  { key: 'gallery', label: 'Gallery' },
  { key: 'news', label: 'News' },
  { key: 'stats', label: 'Stats' },
  { key: 'support', label: 'Support' },
  { key: 'contact', label: 'Contact' },
] as const

export default function AdminSettings() {
  const { data: form, setData: setForm, save, loading, saving, error, usingStarter } = useAdminContent('settings', defaultForm)
  const [saved, setSaved] = useState(false)
  const visibleSections = { ...defaultForm.visible_sections, ...(form.visible_sections || {}) }

  const handleSave = async () => {
    if (await save({ ...form, visible_sections: visibleSections })) {
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }
  }

  const inputClass = "w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crimson/50 focus:border-crimson transition-all"

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Site Settings</h2>
          <p className="text-sm text-gray-500">Manage global site configuration</p>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="px-6 py-2 bg-crimson text-white rounded-lg text-sm font-semibold hover:bg-crimson-dark flex items-center gap-2 disabled:opacity-50">
          {saving ? <div className="spinner" /> : saved ? '✓ Saved!' : <><Save size={16} /> Save Settings</>}
        </button>
      </div>

      <AdminDataNotice loading={loading} error={error} usingStarter={usingStarter} />

      {/* SEO Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Globe size={18} className="text-crimson" /> SEO & Meta
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Site Title</label>
            <input type="text" value={form.site_title} onChange={e => setForm({ ...form, site_title: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
            <textarea value={form.meta_description} onChange={e => setForm({ ...form, meta_description: e.target.value })} rows={2}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crimson/50 focus:border-crimson resize-none" />
            <p className="text-xs text-gray-400 mt-1">{form.meta_description.length}/160 characters</p>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Phone size={18} className="text-crimson" /> Contact Information
        </h3>
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Phone size={14} /> Phone
              </label>
              <input type="text" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Mail size={14} /> Email
              </label>
              <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className={inputClass} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <MapPin size={14} /> Office Address
            </label>
            <textarea value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} rows={2}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crimson/50 focus:border-crimson resize-none" />
          </div>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Share2 size={18} className="text-crimson" /> Social Media Links
        </h3>
        <div className="space-y-3">
          {[
            { icon: FaFacebook, label: 'Facebook', key: 'facebook_url', color: 'text-blue-600' },
            { icon: FaInstagram, label: 'Instagram', key: 'instagram_url', color: 'text-pink-600' },
            { icon: FaYoutube, label: 'YouTube', key: 'youtube_url', color: 'text-red-600' },
            { icon: FaTwitter, label: 'Twitter / X', key: 'twitter_url', color: 'text-sky-500' },
            { icon: FaTiktok, label: 'TikTok', key: 'tiktok_url', color: 'text-gray-800' },
          ].map(social => (
            <div key={social.key} className="flex items-center gap-3">
              <social.icon size={20} className={`flex-shrink-0 ${social.color}`} />
              <input type="url" value={(form as any)[social.key]}
                onChange={e => setForm({ ...form, [social.key]: e.target.value })}
                placeholder={`https://${social.label.toLowerCase()}.com/...`}
                className={inputClass} />
            </div>
          ))}
        </div>
      </div>

      {/* Section Visibility */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-800 mb-4">Section Visibility</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {sectionVisibilityOptions.map(section => (
            <label key={section.key} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
              <input
                type="checkbox"
                checked={visibleSections[section.key]}
                onChange={e => setForm({
                  ...form,
                  visible_sections: {
                    ...visibleSections,
                    [section.key]: e.target.checked,
                  },
                })}
                className="w-4 h-4 accent-crimson rounded"
              />
              <span className="text-sm font-medium text-gray-700">{section.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
