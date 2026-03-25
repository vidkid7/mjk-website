'use client'
import { useState, useEffect } from 'react'
import { Save, GraduationCap, MessageCircle, MousePointerClick } from 'lucide-react'
import { loadData, saveData } from '@/lib/storage'

const defaultTestimonials = [
  {
    name: 'Aarav Poudel',
    role: 'Software Engineer',
    photo: 'https://randomuser.me/api/portraits/men/45.jpg',
    quote:
      "Mukesh sir taught me that my background doesn't define my future. Today I'm a software engineer at a Kathmandu startup. His belief in us changed everything.",
  },
  {
    name: 'Priya Maharjan',
    role: 'CS Scholarship Holder',
    photo: 'https://randomuser.me/api/portraits/women/32.jpg',
    quote:
      "From a girl who couldn't afford college to a scholarship holder studying computer science — Mukesh dai's program gave me wings I didn't know I had.",
  },
  {
    name: 'Sagar Rai',
    role: 'Youth Leader',
    photo: 'https://randomuser.me/api/portraits/men/28.jpg',
    quote:
      "The youth bootcamp wasn't just about coding. It taught us leadership, teamwork, and that we — the youth of Nepal — have the power to transform this nation.",
  },
]

const defaultData = {
  heading: 'If I Can, You Can',
  description: 'Every young Nepali has the potential to become a leader, an entrepreneur, a changemaker. Our mission is to unlock that potential and build a generation that will take Nepal to unprecedented heights.',
  testimonials: defaultTestimonials,
  ctaText: 'Join Our Youth Movement',
}

export default function AdminYouth() {
  const [heading, setHeading] = useState(defaultData.heading)
  const [description, setDescription] = useState(defaultData.description)
  const [testimonials, setTestimonials] = useState(defaultTestimonials)
  const [ctaText, setCtaText] = useState(defaultData.ctaText)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const stored = loadData('youth', defaultData)
    setHeading(stored.heading)
    setDescription(stored.description)
    setTestimonials(stored.testimonials)
    setCtaText(stored.ctaText)
  }, [])

  const handleSave = async () => {
    setSaving(true)
    saveData('youth', { heading, description, testimonials, ctaText })
    await new Promise(r => setTimeout(r, 1000))
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const updateTestimonial = (index: number, field: string, value: string) => {
    setTestimonials(testimonials.map((t, i) => (i === index ? { ...t, [field]: value } : t)))
  }

  const inputClass =
    'w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crimson/50 focus:border-crimson transition-all'

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Youth Inspiration Section</h2>
          <p className="text-sm text-gray-500">Manage the youth inspiration section content</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2 bg-crimson text-white rounded-lg text-sm font-semibold hover:bg-crimson-dark flex items-center gap-2 disabled:opacity-50"
        >
          {saving ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : saved ? (
            '✓ Saved!'
          ) : (
            <>
              <Save size={16} /> Save Changes
            </>
          )}
        </button>
      </div>

      {/* Section Heading & Description */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <GraduationCap size={18} className="text-crimson" /> Section Header
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
            <input type="text" value={heading} onChange={e => setHeading(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crimson/50 focus:border-crimson resize-none"
            />
          </div>
        </div>
      </div>

      {/* Testimonial Cards */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <MessageCircle size={18} className="text-crimson" /> Youth Testimonials
        </h3>
        <div className="space-y-6">
          {testimonials.map((t, i) => (
            <div key={i} className="p-4 border border-gray-200 rounded-lg space-y-4">
              <h4 className="text-sm font-semibold text-gray-600">Testimonial {i + 1}</h4>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={t.name}
                    onChange={e => updateTestimonial(i, 'name', e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <input
                    type="text"
                    value={t.role}
                    onChange={e => updateTestimonial(i, 'role', e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL</label>
                <input
                  type="text"
                  value={t.photo}
                  onChange={e => updateTestimonial(i, 'photo', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quote</label>
                <textarea
                  value={t.quote}
                  onChange={e => updateTestimonial(i, 'quote', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crimson/50 focus:border-crimson resize-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <MousePointerClick size={18} className="text-crimson" /> Call to Action
        </h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">CTA Button Text</label>
          <input type="text" value={ctaText} onChange={e => setCtaText(e.target.value)} className={inputClass} />
        </div>
      </div>
    </div>
  )
}
