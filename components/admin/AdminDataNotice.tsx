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
    return <div role="status" className="admin-notice admin-notice--loading rounded-xl px-4 py-3 text-sm">Loading live content...</div>
  }
  if (error) {
    return <div role="alert" className="admin-notice admin-notice--error rounded-xl px-4 py-3 text-sm">{error}</div>
  }
  if (usingStarter) {
    return (
      <div className="admin-notice admin-notice--starter rounded-xl px-4 py-3 text-sm">
        No saved database content exists for this section yet. Starter content is shown; save once to publish it.
      </div>
    )
  }
  return null
}
