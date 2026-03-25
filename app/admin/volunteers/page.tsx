'use client'
import { useState, useEffect } from 'react'
import { Download, Search, Trash2, Mail } from 'lucide-react'
import { loadData, saveData } from '@/lib/storage'

const demoVolunteers = [
  { id: '1', name: 'Hari Sharma', email: 'hari@gmail.com', phone: '+977-9841234567', city: 'Kathmandu', help: 'Door-to-door campaigning', date: '2024-01-15' },
  { id: '2', name: 'Sita Thapa', email: 'sita@outlook.com', phone: '+977-9812345678', city: 'Lalitpur', help: 'Social media promotion', date: '2024-01-14' },
  { id: '3', name: 'Bikash Rai', email: 'bikash@yahoo.com', phone: '+977-9856789012', city: 'Bhaktapur', help: 'Event organization', date: '2024-01-13' },
  { id: '4', name: 'Anita Karki', email: 'anita.k@gmail.com', phone: '+977-9867890123', city: 'Pokhara', help: 'Fundraising', date: '2024-01-12' },
  { id: '5', name: 'Prakash Adhikari', email: 'prakash@gmail.com', phone: '+977-9878901234', city: 'Kathmandu', help: 'Door-to-door campaigning', date: '2024-01-11' },
]

type Volunteer = typeof demoVolunteers[0]

export default function AdminVolunteers() {
  const [allVolunteers, setAllVolunteers] = useState<Volunteer[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    const stored = loadData('volunteers', null as Volunteer[] | null)
    setAllVolunteers(stored && stored.length > 0 ? stored : demoVolunteers)
  }, [])

  const volunteers = allVolunteers.filter(v =>
    v.name.toLowerCase().includes(search.toLowerCase()) || v.city.toLowerCase().includes(search.toLowerCase())
  )

  const deleteVolunteer = (id: string) => {
    const updated = allVolunteers.filter(v => v.id !== id)
    setAllVolunteers(updated)
    saveData('volunteers', updated)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div><h2 className="text-xl font-bold text-gray-800">Volunteer Submissions</h2>
          <p className="text-sm text-gray-500">{allVolunteers.length} total signups</p></div>
        <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-2">
          <Download size={16} /> Export CSV</button>
      </div>

      <div className="relative">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or city..."
          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crimson/50 focus:border-crimson" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">Name</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">Contact</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">City</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">Help Type</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">Date</th>
                <th className="text-right text-xs font-semibold text-gray-500 uppercase px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {volunteers.map(v => (
                <tr key={v.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-800">{v.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    <div>{v.email}</div>
                    <div className="text-gray-400">{v.phone}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{v.city}</td>
                  <td className="px-4 py-3"><span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">{v.help}</span></td>
                  <td className="px-4 py-3 text-sm text-gray-400">{v.date}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 text-gray-400 hover:text-blue-600 rounded hover:bg-blue-50"><Mail size={14} /></button>
                      <button onClick={() => deleteVolunteer(v.id)} className="p-1.5 text-gray-400 hover:text-red-600 rounded hover:bg-red-50"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
