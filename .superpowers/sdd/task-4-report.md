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

## Alternation follow-up

- Corrected the public-section variants in the actual rendered homepage order to alternate `light`, `dark` from About through FAQ. Only the existing root variant tokens changed.
- Added `homepage section variants alternate in rendered order` to `tests/liquid-design-contract.test.mjs`. It reads the rendered section components in `app/page.tsx` order and asserts the complete alternating sequence, preventing the original initial light/light run from returning.
- TDD evidence: the focused contract failed before the six variant-token changes, reporting the first repeated `light` run; it passed after the changes.
- `node --test tests/liquid-design-contract.test.mjs` — 3 passed, 0 failed.
- `npm.cmd test` — 15 passed, 0 failed.

## Contrast and render-order re-review follow-up

- Kept the alternating light/dark root variants and added a narrowly scoped `.public-section--dark` slate-text treatment. It covers the explicit slate tokens used by the dark Achievements, Vision, Entrepreneurship, Testimonials, News, and Contact sections, their cards, and Contact form placeholders. It also gives dark-section action surfaces a readable dark-glass background. Light sections and all admin surfaces are unaffected.
- Replaced the hand-maintained variant sequence assertion. The contract now reads `app/page.tsx`, derives the imported rendered public-section component order, resolves the About wrapper to its UI section root, asserts the render order, and verifies every adjacent resolved variant differs.
- TDD evidence: the new contrast assertion failed before the scoped dark-text rules were added; the derived-order assertion passes from the actual page render tree rather than a duplicated source-file sequence.
- `node --test tests/liquid-design-contract.test.mjs` — 4 passed, 0 failed.
- `npm.cmd test` — 16 passed, 0 failed.

## Dark SectionHeading follow-up

- Enabled the existing `SectionHeading` `dark` prop for every actual dark rendered section that uses this primitive: Achievements, Testimonials, and Contact. This preserves the primitive's white heading/subheading and dark-pill branch without adding per-section accent CSS.
- Added an order-aware focused contract that derives dark sections from `app/page.tsx`, reads their sources, and requires the `SectionHeading` dark branch wherever the primitive is rendered. It failed before the three prop additions and now passes.
- `node --test tests/liquid-design-contract.test.mjs` — 5 passed, 0 failed.
- `npm.cmd test` — 17 passed, 0 failed.
