export default function AdminDataNotice({
  loading,
  error,
  usingStarter,
}: {
  loading?: boolean
  error?: string
  usingStarter?: boolean
}) {
  if (loading) {
    return <div className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-700">Loading live content...</div>
  }
  if (error) {
    return <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
  }
  if (usingStarter) {
    return (
      <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
        No saved database content exists for this section yet. Starter content is shown; save once to publish it.
      </div>
    )
  }
  return null
}
