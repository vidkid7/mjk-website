'use client'
import { useState, useEffect } from 'react'
import { Save, Briefcase, TrendingUp, Quote } from 'lucide-react'
import { useAdminContent } from '@/lib/admin-data'
import AdminDataNotice from '@/components/admin/AdminDataNotice'

const defaultBusinesses = [
  {
    iconName: 'Rocket',
    title: 'Nepal Tech Ventures',
    description: 'A technology startup incubator that has launched 20+ companies and created 500+ jobs in the tech sector.',
    stat: '20+',
    statLabel: 'Companies Launched',
  },
  {
    iconName: 'Users',
    title: 'Hamro Social Enterprise',
    description: 'A social enterprise providing fair-trade market access to rural artisans across 8 districts of Nepal.',
    stat: '8',
    statLabel: 'Districts Reached',
  },
  {
    iconName: 'TrendingUp',
    title: 'Himalayan Capital Partners',
    description: 'An impact investment fund focused on sustainable businesses that empower local communities.',
    stat: '1K+',
    statLabel: 'Jobs Created',
  },
]

const defaultStats = [
  { value: '1,000+', label: 'Jobs Created' },
  { value: '20+', label: 'Companies Built' },
  { value: '8', label: 'Districts Served' },
]

const defaultData = {
  sectionTitle: "Building Nepal's Future Through Enterprise",
  sectionSubtitle: 'From startups to social enterprises, creating sustainable prosperity and empowering communities across Nepal.',
  businesses: defaultBusinesses,
  stats: defaultStats,
  quoteText: "A nation's wealth is not measured by its GDP alone, but by the dignity of its workers, the dreams of its youth, and the strength of its communities.",
  quoteAttribution: 'Mukesh Jung Khadka',
}

export default function AdminEntrepreneurship() {
  const live = useAdminContent('entrepreneurship', defaultData)
  const [sectionTitle, setSectionTitle] = useState(defaultData.sectionTitle)
  const [sectionSubtitle, setSectionSubtitle] = useState(defaultData.sectionSubtitle)
  const [businesses, setBusinesses] = useState(defaultBusinesses)
  const [stats, setStats] = useState(defaultStats)
  const [quoteText, setQuoteText] = useState(defaultData.quoteText)
  const [quoteAttribution, setQuoteAttribution] = useState(defaultData.quoteAttribution)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const stored = live.data
    setSectionTitle(stored.sectionTitle)
    setSectionSubtitle(stored.sectionSubtitle)
    setBusinesses(stored.businesses)
    setStats(stored.stats)
    setQuoteText(stored.quoteText)
    setQuoteAttribution(stored.quoteAttribution)
  }, [live.data])

  const handleSave = async () => {
    setSaving(true)
    const success = await live.save({ sectionTitle, sectionSubtitle, businesses, stats, quoteText, quoteAttribution })
    setSaving(false)
    if (success) {
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }
  }

  const updateBusiness = (index: number, field: string, value: string) => {
    setBusinesses(businesses.map((b, i) => (i === index ? { ...b, [field]: value } : b)))
  }

  const updateStat = (index: number, field: string, value: string) => {
    setStats(stats.map((s, i) => (i === index ? { ...s, [field]: value } : s)))
  }

  const inputClass =
    'w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crimson/50 focus:border-crimson transition-all'

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Entrepreneurship Section</h2>
          <p className="text-sm text-gray-500">Manage the entrepreneurship section content</p>
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

      <AdminDataNotice loading={live.loading} error={live.error} usingStarter={live.usingStarter} />

      {/* Section Title & Subtitle */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Briefcase size={18} className="text-crimson" /> Section Header
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
            <input type="text" value={sectionTitle} onChange={e => setSectionTitle(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Section Subtitle</label>
            <textarea
              value={sectionSubtitle}
              onChange={e => setSectionSubtitle(e.target.value)}
              rows={2}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crimson/50 focus:border-crimson resize-none"
            />
          </div>
        </div>
      </div>

      {/* Business Cards */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <TrendingUp size={18} className="text-crimson" /> Business Cards
        </h3>
        <div className="space-y-6">
          {businesses.map((biz, i) => (
            <div key={i} className="p-4 border border-gray-200 rounded-lg space-y-4">
              <h4 className="text-sm font-semibold text-gray-600">Card {i + 1}</h4>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Icon Name</label>
                  <input
                    type="text"
                    value={biz.iconName}
                    onChange={e => updateBusiness(i, 'iconName', e.target.value)}
                    className={inputClass}
                    placeholder="e.g. Rocket, Users, TrendingUp"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={biz.title}
                    onChange={e => updateBusiness(i, 'title', e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={biz.description}
                  onChange={e => updateBusiness(i, 'description', e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crimson/50 focus:border-crimson resize-none"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stat Value</label>
                  <input
                    type="text"
                    value={biz.stat}
                    onChange={e => updateBusiness(i, 'stat', e.target.value)}
                    className={inputClass}
                    placeholder="e.g. 20+"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stat Label</label>
                  <input
                    type="text"
                    value={biz.statLabel}
                    onChange={e => updateBusiness(i, 'statLabel', e.target.value)}
                    className={inputClass}
                    placeholder="e.g. Companies Launched"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stat Counters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Briefcase size={18} className="text-crimson" /> Stat Counters
        </h3>
        <div className="grid sm:grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="p-4 border border-gray-200 rounded-lg space-y-3">
              <h4 className="text-sm font-semibold text-gray-600">Stat {i + 1}</h4>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
                <input
                  type="text"
                  value={stat.value}
                  onChange={e => updateStat(i, 'value', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                <input
                  type="text"
                  value={stat.label}
                  onChange={e => updateStat(i, 'label', e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quote */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Quote size={18} className="text-crimson" /> Quote Block
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quote Text</label>
            <textarea
              value={quoteText}
              onChange={e => setQuoteText(e.target.value)}
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crimson/50 focus:border-crimson resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Attribution</label>
            <input
              type="text"
              value={quoteAttribution}
              onChange={e => setQuoteAttribution(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
