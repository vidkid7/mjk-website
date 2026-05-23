'use client'

import { useState } from 'react'
import { Download, Mail, Search, Trash2 } from 'lucide-react'
import { useAdminContent } from '@/lib/admin-data'
import AdminDataNotice from '@/components/admin/AdminDataNotice'

type Volunteer = {
  id: string
  name: string
  email: string
  phone: string
  city: string
  help: string
  date: string
}

function csvCell(value: unknown) {
  return `"${String(value ?? '').replace(/"/g, '""')}"`
}

export default function AdminVolunteers() {
  const { data: allVolunteers, loading, saving, error, action } = useAdminContent<Volunteer[]>('volunteers', [], { starterOnEmpty: false })
  const [search, setSearch] = useState('')
  const volunteers = allVolunteers.filter(volunteer =>
    `${volunteer.name} ${volunteer.city} ${volunteer.email}`.toLowerCase().includes(search.toLowerCase()),
  )

  const exportCsv = () => {
    const rows = [
      ['Name', 'Email', 'Phone', 'City', 'Help Type', 'Date'],
      ...allVolunteers.map(volunteer => [volunteer.name, volunteer.email, volunteer.phone, volunteer.city, volunteer.help, volunteer.date]),
    ]
    const csv = rows.map(row => row.map(csvCell).join(',')).join('\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
    const link = document.createElement('a')
    link.href = url
    link.download = 'mjk-volunteers.csv'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Volunteer Submissions</h2>
          <p className="text-sm text-gray-500">{allVolunteers.length} total signups</p>
        </div>
        <button disabled={!allVolunteers.length} onClick={exportCsv}
          className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50">
          <Download size={16} /> Export CSV
        </button>
      </div>
      <AdminDataNotice loading={loading} error={error} />

      <div className="relative">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input type="text" value={search} onChange={event => setSearch(event.target.value)} placeholder="Search by name, city, or email..."
          className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 focus:border-crimson focus:ring-2 focus:ring-crimson/50" />
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                {['Name', 'Contact', 'City', 'Help Type', 'Date', 'Actions'].map(label => (
                  <th key={label} className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">{label}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {volunteers.map(volunteer => (
                <tr key={volunteer.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">{volunteer.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-600"><div>{volunteer.email}</div><div className="text-gray-400">{volunteer.phone}</div></td>
                  <td className="px-4 py-3 text-sm text-gray-600">{volunteer.city}</td>
                  <td className="px-4 py-3"><span className="rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-700">{volunteer.help}</span></td>
                  <td className="px-4 py-3 text-sm text-gray-400">{volunteer.date}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <a href={`mailto:${encodeURIComponent(volunteer.email)}`} className="rounded p-2 text-gray-400 hover:bg-blue-50 hover:text-blue-600" title="Email volunteer"><Mail size={16} /></a>
                      <button disabled={saving} onClick={() => void action('delete', { id: volunteer.id })} className="rounded p-2 text-gray-400 hover:bg-red-50 hover:text-red-600 disabled:opacity-50" title="Delete volunteer"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {!volunteers.length && (
                <tr><td colSpan={6} className="px-4 py-12 text-center text-sm text-gray-500">No volunteer submissions found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
