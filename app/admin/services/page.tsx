'use client'

import { Plus, Save, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useAdminContent } from '@/lib/admin-data'
import AdminDataNotice from '@/components/admin/AdminDataNotice'

type Service = { id: string; slug: string; name: string; shortName: string; title: string; description: string; intro: string; outcomes: string[]; process: Array<{ title: string; body: string }>; faqs: Array<{ question: string; answer: string }>; isPublished: boolean; orderIndex: number }
const starter: Service[] = []
const fieldClass = 'admin-control w-full px-3 py-2'

function JsonField({ label, value, onChange }: { label: string; value: unknown; onChange: (value: unknown) => void }) {
  const [text, setText] = useState(() => JSON.stringify(value ?? [], null, 2))
  useEffect(() => setText(JSON.stringify(value ?? [], null, 2)), [value])
  return <label className="block space-y-1"><span className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label} (JSON)</span><textarea value={text} onChange={event => { setText(event.target.value); try { onChange(JSON.parse(event.target.value)) } catch { /* keep editing until valid JSON */ } }} rows={5} className={`${fieldClass} resize-y font-mono text-xs`} /></label>
}

export default function ServicesAdmin() {
  const { data, setData, save, loading, saving, error, usingStarter } = useAdminContent<Service[]>('services', starter, { starterOnEmpty: false })
  const [saved, setSaved] = useState(false)
  const items = Array.isArray(data) ? data : []
  const update = (index: number, key: string, value: unknown) => setData(items.map((item, i) => i === index ? { ...item, [key]: value } : item))
  const add = () => setData([...items, { id: crypto.randomUUID(), slug: 'new-service', name: 'New Service', shortName: 'New Service', title: 'New Service', description: '', intro: '', outcomes: [], process: [], faqs: [], isPublished: true, orderIndex: items.length }])
  const remove = (index: number) => setData(items.filter((_, i) => i !== index).map((item, i) => ({ ...item, orderIndex: i })))
  const handleSave = async () => { if (await save(items)) { setSaved(true); setTimeout(() => setSaved(false), 2000) } }
  return <div className="max-w-5xl space-y-6"><div className="flex items-center justify-between gap-4"><div><h2 className="text-xl font-bold text-gray-800">Services</h2><p className="text-sm text-gray-500">Manage the service index and each public service detail page.</p></div><div className="flex gap-2"><button onClick={add} className="admin-action flex items-center gap-2 rounded-lg px-4 py-2 text-sm"><Plus size={16} /> Add service</button><button onClick={() => void handleSave()} disabled={saving} className="admin-action admin-action--primary flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-semibold disabled:opacity-50">{saving ? 'Saving…' : saved ? '✓ Saved' : <><Save size={16} /> Save services</>}</button></div></div><AdminDataNotice loading={loading} error={error} usingStarter={usingStarter} />{items.length === 0 && !loading && <div className="admin-card rounded-2xl p-8 text-sm text-gray-500">No services are stored yet. Add the first service to publish it.</div>}<div className="space-y-5">{items.map((item, index) => <section key={item.id || index} className="admin-card space-y-4 rounded-2xl p-5"><div className="flex items-center justify-between"><h3 className="font-semibold text-gray-800">Service {String(index + 1).padStart(2, '0')}</h3><button onClick={() => remove(index)} className="rounded-lg p-2 text-red-600 hover:bg-red-50" aria-label={`Delete ${item.name}`}><Trash2 size={16} /></button></div><div className="grid gap-4 md:grid-cols-2">{(['name', 'shortName', 'slug', 'title'] as const).map(key => <label key={key} className="space-y-1"><span className="text-xs font-semibold uppercase tracking-wide text-gray-500">{key}</span><input value={item[key]} onChange={event => update(index, key, event.target.value)} className={fieldClass} /></label>)}<label className="md:col-span-2 space-y-1"><span className="text-xs font-semibold uppercase tracking-wide text-gray-500">Description</span><textarea value={item.description} onChange={event => update(index, 'description', event.target.value)} rows={3} className={`${fieldClass} resize-y`} /></label><label className="md:col-span-2 space-y-1"><span className="text-xs font-semibold uppercase tracking-wide text-gray-500">Detail introduction</span><textarea value={item.intro} onChange={event => update(index, 'intro', event.target.value)} rows={3} className={`${fieldClass} resize-y`} /></label><JsonField label="Outcomes" value={item.outcomes} onChange={value => update(index, 'outcomes', value)} /><JsonField label="Process" value={item.process} onChange={value => update(index, 'process', value)} /><JsonField label="FAQs" value={item.faqs} onChange={value => update(index, 'faqs', value)} /></div><label className="flex items-center gap-2 text-sm text-gray-700"><input type="checkbox" checked={item.isPublished} onChange={event => update(index, 'isPublished', event.target.checked)} className="h-4 w-4 accent-crimson" /> Published on the website</label></section>)}</div></div>
}
