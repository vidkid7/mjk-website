# Mobile-First Responsive Design for Mukesh Khadka Portfolio

## Goal

Make the current Supabase-backed portfolio fully usable on phones and tablets while preserving the existing visual system: animated atmosphere, loading sequence, decorative heritage artwork, theme/color controls, editorial typography, card visuals, and interactive focus states.

The responsive pass must not change the content source, remove the existing effects, touch the `nita-clinics` database, or revert the current site to the older homepage.

## Responsive model

The public shell will use a fluid layout rather than device-specific copies of the page:

- 320–374px: compact phone layout; all content remains visible, with single-column flow and wrapped controls.
- 375–479px: standard phone layout; preserve the same visual hierarchy with larger art and spacing where available.
- 480–767px: large phone/small tablet layout; allow two-column metadata and compact grids when they fit without clipping.
- 768–1023px: tablet layout; retain the desktop visual language while moving dense multi-column sections into readable two-column structures.
- 1024px and wider: preserve the existing desktop composition.

Global rules:

- Use fluid type and spacing with `clamp()` where fixed values currently create clipping.
- Keep horizontal overflow clipped at the shell boundary without hiding content that should be reachable.
- Add `env(safe-area-inset-*)` handling to fixed navigation, menus, and bottom-edge controls.
- Keep interactive controls at least 44px in the touch layout.
- Preserve image aspect ratios and reserve space to avoid layout shift.
- Keep the existing `prefers-reduced-motion` behavior; no visual effects are removed for ordinary mobile users.

## Section behavior

### Navigation

The mobile menu remains the complete navigation index. It will use a safe-area-aware panel, scroll internally when needed, keep the close control reachable, and prevent the page behind it from scrolling while open. Desktop links and theme controls retain their current behavior.

### Hero and artwork

The hero copy, portrait, heritage artwork, status rail, CTAs, and metric cards remain present. The copy and artwork will stack with a controlled visual order, use fluid heading sizes, keep the portrait inside the viewport, and place CTAs in a full-width touch-friendly row/stack. Metrics will become a readable 2×2 grid on phones.

### Content sections

- About: dossier masthead, portrait, narrative, highlights, and CTA become one readable flow; metadata wraps rather than forcing horizontal scrolling.
- Work: project cards become one column on phones; the focus pager gets larger touch targets and never relies on hover.
- Skills: discipline cards stack, toolbox pills wrap, and status metadata becomes a compact wrapped row.
- Experience and testimonials: timeline/report cards remain visually rich but use one-column content flow and avoid narrow text columns.
- Contact: channels and action cards become full-width touch targets; long email/phone values wrap safely.
- Footer: navigation, services, studio notes, and social links stack without clipped labels.

### Public subroutes

Articles, article detail, services, service detail, and contact routes will share the same responsive container and rail rules. Dense editorial folios, ledgers, service cards, metadata, and CTA panels will collapse to one column at phone widths while retaining their decorative framing.

### Admin

The admin shell will receive a focused mobile pass as well: sidebar drawer and overlay behavior, sticky header spacing, responsive forms, modal bounds, editor JSON fields, and tables/lists must fit within phone safe areas. CMS functionality and authentication behavior remain unchanged.

## Implementation boundaries

Responsive changes should primarily live in `app/globals.css` and focused component class adjustments. React structure changes are allowed only where the current DOM prevents correct touch/mobile behavior, such as menu scroll locking or a control that needs a mobile-only layout wrapper. No content literals will be introduced, and no Supabase records will be rewritten as part of this visual pass.

## Verification

Run type checking, the existing contract tests, and a production build. Use browser-driven checks or equivalent route requests at 320×568, 375×812, 390×844, 768×1024, 1024×768, and desktop widths. For every public route, verify:

- no horizontal overflow beyond the viewport;
- no fixed navigation/menu overlap that blocks content;
- headings, buttons, links, and metadata remain readable;
- hero/about/project artwork stays inside the viewport;
- touch controls are reachable and have usable hit areas;
- public routes still return successful responses;
- the CMS API and admin redirects remain unchanged.

## Non-goals

- Removing animation or decorative visual effects on mobile.
- Changing copy, images, article content, service content, or database ownership.
- Rebuilding the page in a different framework.
- Replacing the current design with a generic mobile template.
