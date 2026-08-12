'use client'
import { useState } from 'react'
import { Save, Globe, Phone, Mail, MapPin, Share2 } from 'lucide-react'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { useAdminContent } from '@/lib/admin-data'
import AdminDataNotice from '@/components/admin/AdminDataNotice'
import { DEFAULT_SETTINGS } from '@/lib/settings'

const socialUrl = (url: string | undefined, fallback: string, legacyFallback?: string) =>
  !url || url === legacyFallback ? fallback : url

const defaultForm = {
  site_title: 'Mukesh Khadka | Digital Systems Portfolio',
  meta_description: 'Digital portfolio of Mukesh Khadka — practical software systems, web platforms, automation, and digital transformation work.',
  phone: '+977 985-1241656',
  email: 'khadkamukesh423@gmail.com',
  address: 'Kathmandu, Bagmati Province, Nepal',
  linkedin_url: 'https://www.linkedin.com/in/mukesh-khadka-960401324/',
  facebook_url: 'https://www.facebook.com/Nepali.man.67',
  instagram_url: 'https://www.instagram.com/khadka3546?utm_source=qr',
  youtube_url: '',
  twitter_url: 'https://x.com/khadkamukesh422?s=11',
  tiktok_url: '',
  visible_sections: DEFAULT_SETTINGS.visible_sections,
}

const sectionVisibilityOptions = [
  { key: 'hero', label: 'Hero' },
  { key: 'about', label: 'About' },
  { key: 'achievements', label: 'Delivery Process' },
  { key: 'portfolio', label: 'Portfolio' },
  { key: 'vision', label: 'Digital Vision' },
  { key: 'initiatives', label: 'Solutions' },
  { key: 'testimonials', label: 'Testimonials' },
  { key: 'news', label: 'Blog Preview' },
  { key: 'stats', label: 'Stats' },
  { key: 'contact', label: 'Contact' },
] as const

export default function AdminSettings() {
  const { data: form, setData: setForm, save, loading, saving, error, usingStarter } = useAdminContent('settings', defaultForm)
  const [saved, setSaved] = useState(false)
  const visibleSections = { ...defaultForm.visible_sections, ...(form.visible_sections || {}) }
  const normalizedForm = {
    ...defaultForm,
    ...form,
    linkedin_url: socialUrl((form as any).linkedin_url, defaultForm.linkedin_url),
    facebook_url: socialUrl(form.facebook_url, defaultForm.facebook_url, 'https://facebook.com/mjk'),
    instagram_url: socialUrl(form.instagram_url, defaultForm.instagram_url, 'https://instagram.com/mjk'),
    twitter_url: socialUrl(form.twitter_url, defaultForm.twitter_url, 'https://twitter.com/mjk'),
    visible_sections: visibleSections,
  }

  const handleSave = async () => {
    if (await save(normalizedForm)) {
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }
  }

  const inputClass = "admin-control w-full px-4 py-2.5 transition-all"

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Site Settings</h2>
          <p className="text-sm text-gray-500">Manage global portfolio configuration</p>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="glass-action admin-action admin-action--primary flex items-center gap-2 rounded-lg px-6 py-2 text-sm font-semibold disabled:opacity-50">
          {saving ? <div className="spinner" /> : saved ? '✓ Saved!' : <><Save size={16} /> Save Settings</>}
        </button>
      </div>

      <AdminDataNotice loading={loading} error={error} usingStarter={usingStarter} />

      <div className="admin-card rounded-2xl p-5 md:p-7">
        <h3 className="mb-4 flex items-center gap-2 font-semibold text-gray-800">
          <Globe size={18} className="text-crimson" /> SEO & Meta
        </h3>
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Site Title</label>
            <input type="text" value={normalizedForm.site_title} onChange={e => setForm({ ...normalizedForm, site_title: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Meta Description</label>
            <textarea value={normalizedForm.meta_description} onChange={e => setForm({ ...normalizedForm, meta_description: e.target.value })} rows={2}
              className="admin-control w-full resize-none px-4 py-2.5" />
            <p className="mt-1 text-xs text-gray-400">{normalizedForm.meta_description.length}/160 characters</p>
          </div>
        </div>
      </div>

      <div className="admin-card rounded-2xl p-5 md:p-7">
        <h3 className="mb-4 flex items-center gap-2 font-semibold text-gray-800">
          <Phone size={18} className="text-crimson" /> Contact Information
        </h3>
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 flex items-center gap-1 text-sm font-medium text-gray-700"><Phone size={14} /> Phone</label>
              <input type="text" value={normalizedForm.phone} onChange={e => setForm({ ...normalizedForm, phone: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className="mb-1 flex items-center gap-1 text-sm font-medium text-gray-700"><Mail size={14} /> Email</label>
              <input type="email" value={normalizedForm.email} onChange={e => setForm({ ...normalizedForm, email: e.target.value })} className={inputClass} />
            </div>
          </div>
          <div>
            <label className="mb-1 flex items-center gap-1 text-sm font-medium text-gray-700"><MapPin size={14} /> Office Address</label>
            <textarea value={normalizedForm.address} onChange={e => setForm({ ...normalizedForm, address: e.target.value })} rows={2}
              className="admin-control w-full resize-none px-4 py-2.5" />
          </div>
        </div>
      </div>

      <div className="admin-card rounded-2xl p-5 md:p-7">
        <h3 className="mb-4 flex items-center gap-2 font-semibold text-gray-800"><Share2 size={18} className="text-crimson" /> Social Media Links</h3>
        <div className="space-y-3">
          {[
            { icon: FaLinkedin, label: 'LinkedIn', key: 'linkedin_url', color: 'text-blue-700' },
            { icon: FaFacebook, label: 'Facebook', key: 'facebook_url', color: 'text-blue-600' },
            { icon: FaInstagram, label: 'Instagram', key: 'instagram_url', color: 'text-pink-600' },
            { icon: FaTwitter, label: 'Twitter / X', key: 'twitter_url', color: 'text-sky-500' },
          ].map(social => (
            <div key={social.key} className="flex items-center gap-3">
              <social.icon size={20} className={`flex-shrink-0 ${social.color}`} />
              <input type="url" value={(normalizedForm as any)[social.key]}
                onChange={e => setForm({ ...normalizedForm, [social.key]: e.target.value })}
                placeholder={`https://${social.label.toLowerCase()}.com/...`}
                className={inputClass} />
            </div>
          ))}
        </div>
      </div>

      <div className="admin-card rounded-2xl p-5 md:p-7">
        <h3 className="mb-4 font-semibold text-gray-800">Section Visibility</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sectionVisibilityOptions.map(section => (
            <label key={section.key} className="admin-card flex cursor-pointer items-center gap-3 rounded-xl p-3 transition-colors hover:border-gold/50">
              <input
                type="checkbox"
                checked={visibleSections[section.key]}
                onChange={e => setForm({
                  ...normalizedForm,
                  visible_sections: { ...visibleSections, [section.key]: e.target.checked },
                })}
                className="h-4 w-4 rounded accent-crimson"
              />
              <span className="text-sm font-medium text-gray-700">{section.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
