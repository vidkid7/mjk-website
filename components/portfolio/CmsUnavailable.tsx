export default function CmsUnavailable({ message }: { message: string }) {
  const isInfrastructureError = /supabase|jwt|server key|missing/i.test(message)
  const heading = isInfrastructureError ? 'Content is temporarily unavailable.' : 'Public content is not configured.'
  const detail = isInfrastructureError
    ? 'The content service is reconnecting. Please try again in a moment.'
    : message

  return (
    <main className="public-route-shell gateway-shell flex min-h-screen items-center justify-center px-6 py-24 text-center">
      <section className="public-route-main public-route-hero max-w-2xl">
        <p className="public-route-kicker">CONTENT SYSTEM / OFFLINE</p>
        <h1>{heading}</h1>
        <p className="public-route-lede">{detail}</p>
        <a href="/" className="public-route-cta__button mt-8 inline-flex">Try again <span>↻</span></a>
      </section>
    </main>
  )
}
