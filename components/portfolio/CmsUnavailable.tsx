export default function CmsUnavailable({ message }: { message: string }) {
  return (
    <main className="public-route-shell gateway-shell flex min-h-screen items-center justify-center px-6 py-24 text-center">
      <section className="public-route-main public-route-hero max-w-2xl">
        <p className="public-route-kicker">CONTENT SYSTEM / OFFLINE</p>
        <h1>Public content is not configured.</h1>
        <p className="public-route-lede">{message}</p>
        <a href="/admin" className="public-route-cta__button mt-8 inline-flex">Open the admin panel <span>↗</span></a>
      </section>
    </main>
  )
}
