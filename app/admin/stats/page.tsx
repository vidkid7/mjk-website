'use client'
import { useState, useEffect } from 'react'
import { Save } from 'lucide-react'
import { statsData } from '@/lib/placeholder-data'
import { loadData, saveData } from '@/lib/storage'

export default function AdminStats() {
  const [stats, setStats] = useState(statsData)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setStats(loadData('stats', statsData))
  }, [])

  const updateStat = (index: number, field: string, value: any) => {
    const updated = [...stats]
    updated[index] = { ...updated[index], [field]: value }
    setStats(updated)
  }

  const handleSave = async () => {
    setSaving(true)
    saveData('stats', stats)
    await new Promise(r => setTimeout(r, 1000))
    setSaving(false); setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div><h2 className="text-xl font-bold text-gray-800">Impact Statistics</h2>
          <p className="text-sm text-gray-500">Edit the counter numbers displayed on the website</p></div>
        <button onClick={handleSave} disabled={saving}
          className="px-6 py-2 bg-crimson text-white rounded-lg text-sm font-semibold hover:bg-crimson-dark flex items-center gap-2 disabled:opacity-50">
          {saving ? <div className="spinner" /> : saved ? '✓ Saved!' : <><Save size={16} /> Save</>}
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{stat.icon}</span>
              <div className="flex-1">
                <input type="text" value={stat.label} onChange={e => updateStat(i, 'label', e.target.value)}
                  className="w-full text-sm font-medium text-gray-700 border-b border-transparent hover:border-gray-300 focus:border-crimson focus:outline-none pb-1 transition-colors" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input type="number" value={stat.value} onChange={e => updateStat(i, 'value', parseInt(e.target.value) || 0)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-2xl font-bold text-gray-800 focus:ring-2 focus:ring-crimson/50 focus:border-crimson" />
              <input type="text" value={stat.suffix} onChange={e => updateStat(i, 'suffix', e.target.value)} placeholder="+"
                className="w-16 px-3 py-3 border border-gray-300 rounded-lg text-2xl font-bold text-gold text-center focus:ring-2 focus:ring-crimson/50" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
