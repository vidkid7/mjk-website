import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Home, Radio } from 'lucide-react'
import SignalRail from '@/components/portfolio/SignalRail'
import PublicImprint from '@/components/portfolio/PublicImprint'

export const metadata: Metadata = {
  title: '404 · Lost Signal',
  description:
    'The transmission you are looking for has drifted out of range. Return to the studio index or browse the live channels.',
  robots: { index: false, follow: false },
}

const alternateRoutes = [
  {
    label: 'Home',
    detail: 'Return to the studio',
    href: '/',
    meta: 'CH-01 · 24H REPLY',
    icon: Home,
  },
  {
    label: 'Articles',
    detail: 'Field notes & writing index',
    href: '/articles',
    meta: 'CH-02 · 06 ENTRIES',
    icon: Radio,
  },
  {
    label: 'Services',
    detail: 'Web · Software · Automation',
    href: '/services',
    meta: 'CH-03 · 03 TRACKS',
    icon: ArrowUpRight,
  },
  {
    label: 'Contact',
    detail: 'Open a project channel',
    href: '/contact',
    meta: 'CH-04 · NPL · GMT+05:45',
    icon: ArrowLeft,
  },
]

export default function NotFound() {
  return (
    <main className="not-found-shell relative min-h-screen">
      <SignalRail />
      <div className="not-found-content relative z-10">
        <section className="not-found-main">
          <div className="not-found-main__inner">
            <span className="not-found-main__marks" aria-hidden="true">
              <i className="not-found-main__mark not-found-main__mark--tl" />
              <i className="not-found-main__mark not-found-main__mark--tr" />
              <i className="not-found-main__mark not-found-main__mark--bl" />
              <i className="not-found-main__mark not-found-main__mark--br" />
            </span>

            <svg
              className="not-found-main__wave"
              viewBox="0 0 600 60"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient
                  id="not-found-wave-gradient"
                  x1="0"
                  x2="1"
                  y1="0"
                  y2="0"
                >
                  <stop offset="0%" stopColor="var(--route-accent)" stopOpacity="0.05" />
                  <stop offset="50%" stopColor="var(--route-accent)" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="var(--route-accent)" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              <g
                fill="none"
                stroke="url(#not-found-wave-gradient)"
                strokeWidth="1.3"
                strokeLinecap="round"
              >
                <path d="M0 30 L10 30 M18 22 L22 38 M30 14 L34 46 M42 24 L46 36 M54 18 L58 42 M66 26 L70 34 M78 16 L82 44 M90 23 L94 37 M102 28 L106 32 M114 19 L118 41 M126 25 L130 35 M138 16 L142 44 M150 23 L154 37 M162 13 L166 47 M174 24 L178 36 M186 18 L190 42 M198 26 L202 34 M210 16 L214 44 M222 23 L226 37 M234 27 L238 33 M246 19 L250 41 M258 25 L262 35 M270 14 L274 46 M282 22 L286 38 M294 26 L298 34 M306 18 L310 42 M318 23 L322 37 M330 12 L334 48 M342 24 L346 36 M354 18 L358 42 M366 26 L370 34 M378 16 L382 44 M390 23 L394 37 M402 27 L406 33 M414 19 L418 41 M426 25 L430 35 M438 14 L442 46 M450 22 L454 38 M462 26 L466 34 M474 18 L478 42 M486 23 L490 37 M498 12 L502 48 M510 24 L514 36 M522 18 L526 42 M534 26 L538 34 M546 16 L550 44 M558 23 L562 37 M570 26 L574 34 M582 18 L586 42 M594 24 L598 36" />
              </g>
            </svg>

            <header className="not-found-main__head">
              <span className="not-found-main__live" aria-hidden="true">
                <span className="not-found-main__pulse">
                  <span className="not-found-main__pulse-dot" />
                  <span className="not-found-main__pulse-ring" />
                </span>
                SIGNAL · LOST
              </span>
              <span className="not-found-main__time">NPL · GMT+05:45</span>
            </header>

            <div className="not-found-main__copy">
              <span className="not-found-main__kicker">ERROR 404 · TRANSMISSION DRIFTED</span>
              <h1 className="not-found-main__title">
                <span className="not-found-main__title-num">404</span>
                <span className="not-found-main__title-text">Lost Signal.</span>
              </h1>
              <p className="not-found-main__lede">
                The page you tuned into is no longer broadcasting. The transmission has drifted
                out of range, or the channel was retired after the last dispatch.
              </p>
              <p className="not-found-main__lede">
                Pick a route below to return to the studio, or scan the live channels on the
                homepage for the next field note.
              </p>
            </div>

            <div className="not-found-main__actions">
              <Link href="/" className="not-found-main__action not-found-main__action--primary">
                <span className="not-found-main__action-tag">RETURN · STUDIO</span>
                <span className="not-found-main__action-label">Back to home</span>
                <span className="not-found-main__action-meta">
                  INDEX · 6 entries live
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            </div>
          </div>
        </section>

        <section className="not-found-routes" aria-label="Alternate routes">
          <header className="not-found-routes__head">
            <span className="not-found-routes__head-key">LIVE CHANNELS · 04</span>
            <span className="not-found-routes__head-rule" aria-hidden="true" />
            <span className="not-found-routes__head-meta">ALL ROUTES ON RECORD</span>
          </header>

          <div className="not-found-routes__grid">
            {alternateRoutes.map((route, i) => {
              const Icon = route.icon
              return (
                <Link
                  key={route.href}
                  href={route.href}
                  className="not-found-routes__card"
                >
                  <span className="not-found-routes__card-num">
                    CH · {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="not-found-routes__card-icon" aria-hidden="true">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <span className="not-found-routes__card-body">
                    <span className="not-found-routes__card-label">{route.label}</span>
                    <span className="not-found-routes__card-detail">{route.detail}</span>
                  </span>
                  <span className="not-found-routes__card-meta">
                    {route.meta}
                    <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                  </span>
                </Link>
              )
            })}
          </div>
        </section>

        <section className="not-found-tips" aria-label="Field tips">
          <header className="not-found-tips__head">
            <span className="not-found-tips__head-key">FIELD TIPS · CHECKLIST</span>
          </header>
          <ol className="not-found-tips__list">
            <li>
              <span className="not-found-tips__num">¶ 01</span>
              <span className="not-found-tips__text">
                Check the URL for typos or trailing slashes.
              </span>
            </li>
            <li>
              <span className="not-found-tips__num">¶ 02</span>
              <span className="not-found-tips__text">
                If you arrived here from a saved link, the route may have been renamed.
              </span>
            </li>
            <li>
              <span className="not-found-tips__num">¶ 03</span>
              <span className="not-found-tips__text">
                The articles index is the most up-to-date record of what is on the air.
              </span>
            </li>
          </ol>
        </section>
      </div>
      <PublicImprint
        context="LOST SIGNAL"
        tagline="The studio is still broadcasting. Return to the homepage, or pick a channel above — the next field note will be waiting."
      />
    </main>
  )
}