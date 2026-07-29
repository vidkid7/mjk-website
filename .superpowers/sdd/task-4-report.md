# Task 4 — Homepage sections and interactive cards

## Scope delivered

- Added the required `public-section`, `public-section--light`, and `public-section--dark` composition classes in `app/globals.css`, using the Task 2 liquid and glass tokens. Dark sections scope their existing `glass-panel` and `glass-inset` surfaces to the existing dark glass token so their white typography remains readable.
- Applied light/dark public-section variants across the homepage section roots while retaining every existing ID, section order, semantic element, stored-data hook, key, animation prop, lazy-loading rule, map iframe, and contact submission handler.
- Replaced informational surfaces with named `glass-panel`, `glass-inset`, and `glass-action` classes across the portfolio, capability, contact, gallery, carousel, cards, controls, and shared button components.
- Marked newly surfaced ambient gradients as `aria-hidden` and `pointer-events-none`; no decoration can receive pointer interaction.
- Kept the gallery heading structure unchanged. The existing homepage single-H1 regression test remains green.

## Verification

- `npm.cmd test` — 14 passed, 0 failed.
- `npm.cmd run build` — passed: TypeScript validation and all 35 static pages generated.
- `git diff --check` — clean.
- Browser check against the local homepage at 390px, 768px, and 1440px — passed at every width: no horizontal overflow; required anchors and contact controls exist; the gallery opens and closes; the existing contact anchor is present.

## Self-review

- Reviewed the final diff to confirm it contains surface/layout styling only: no stored copy, media URL, data hook, map key, lazy-loading attribute, route, metadata, JSON-LD, or API/storage behavior changed.
- `package-lock.json` was pre-existing workspace noise and remains unstaged/uncommitted.

## Concern

- The existing homepage gallery uses externally hosted image media. The open/close control and layout were verified locally, but image rendering remains subject to those existing remote hosts being reachable.
