import type { PublicSite, PublicUiCopy } from '@/lib/public-content'
import Navbar from './SignalRail'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Field Files', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'History', href: '#experience' },
  { label: 'Contact', href: '#contact' },
  { label: 'Articles', href: '/articles' },
]

/**
 * Thin wrapper around the shared `SignalRail` component for the homepage.
 * Renders the desktop anchor links, color picker, theme toggle, and mobile
 * menu. Delegates all theme/color state and IntersectionObserver logic to
 * `SignalRail`.
 */
export default function PortfolioNavbar({ site, navigation }: { site: PublicSite; navigation: PublicUiCopy['navigation'] }) {
  return (
    <>
      <Navbar site={site} navigation={navigation} />
      <noscript>
        <div className="signal-rail__noscript">
          {links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </div>
      </noscript>
    </>
  )
}
