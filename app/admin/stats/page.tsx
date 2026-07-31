'use client'
import { useState } from 'react'
import { Save } from 'lucide-react'
import { statsData } from '@/lib/placeholder-data'
import { useAdminContent } from '@/lib/admin-data'
import AdminDataNotice from '@/components/admin/AdminDataNotice'

export default function AdminStats() {
  const { data: stats, setData: setStats, save, loading, saving, error, usingStarter } = useAdminContent('stats', statsData)
  const [saved, setSaved] = useState(false)

  const updateStat = (index: number, field: string, value: any) => {
    const updated = [...stats]
    updated[index] = { ...updated[index], [field]: value }
    setStats(updated)
  }

  const handleSave = async () => {
    if (await save(stats)) {
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div><h2 className="text-xl font-bold text-gray-800">Impact Statistics</h2>
          <p className="text-sm text-gray-500">Edit the counter numbers displayed on the website</p></div>
        <button onClick={handleSave} disabled={saving}
          className="glass-action admin-action admin-action--primary px-6 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 disabled:opacity-50">
          {saving ? <div className="spinner" /> : saved ? '✓ Saved!' : <><Save size={16} /> Save</>}
        </button>
      </div>

      <AdminDataNotice loading={loading} error={error} usingStarter={usingStarter} />

      <div className="grid sm:grid-cols-2 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="admin-card rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{stat.icon}</span>
              <div className="flex-1">
                <input type="text" value={stat.label} onChange={e => updateStat(i, 'label', e.target.value)}
                  className="admin-control w-full px-3 py-2 text-sm font-medium pb-1 transition-colors" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input type="number" value={stat.value} onChange={e => updateStat(i, 'value', parseInt(e.target.value) || 0)}
                className="admin-control flex-1 px-4 py-3 text-2xl font-bold" />
              <input type="text" value={stat.suffix} onChange={e => updateStat(i, 'suffix', e.target.value)} placeholder="+"
                className="admin-control w-16 px-3 py-3 text-2xl font-bold text-gold text-center" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
