# Prismatic Heritage Liquid-Glass Redesign

## Objective

Redesign every public and administrative page of the Mukesh Khadka portfolio as one cohesive, responsive liquid-glass product while retaining current wording, media, routes, SEO, structured data, content storage, APIs, and administrative capabilities.

## Visual direction

The visual system is **Prismatic Heritage**: a deep-navy foundation with fluid crimson and gold light fields, translucent frosted surfaces, restrained layered shadows, and subtle luminous borders. The palette preserves the existing Nepal-inspired crimson, navy, and gold identity.

Inter remains the primary UI typeface and Playfair Display remains the expressive display typeface. Typography will use clearer scale, spacing, and contrast to maintain comfortable reading on translucent surfaces.

## Shared design system

- Define reusable color, surface, border, shadow, radius, and motion tokens in the global stylesheet.
- Add reusable glass surface, action, tag, field, and data-display treatments that work on light and dark contexts.
- Use ambient liquid color fields as decorative, non-interactive layers that do not obscure content.
- Maintain visible keyboard focus and accessible text contrast.
- Keep animations gentle and disable or reduce them for `prefers-reduced-motion`.

## Page scope

### Public portfolio

The homepage navigation, hero, marquee, content sections, gallery, contact flow, FAQ, and footer will become a continuous layered glass experience. Existing section visibility controls, content, anchors, and media remain unchanged.

### Services and blog

Service listings, service details, blog listings, and blog details will use editorial glass layouts with readable article surfaces, consistent navigation and calls to action, and responsive cards.

### Administration

All admin routes, including login, dashboard, content editors, forms, image uploads, and settings, will use a denser dark-glass workspace. The sidebar, form controls, tables, notices, and actions will favor usability and clarity over decoration. Existing data and API flows remain unchanged.

### Fallbacks and shared layouts

The root, blog, admin, error, and not-found layouts will use the same visual language so every route has a coherent presentation.

## Responsiveness

- Desktop layouts use layered panels and spacious grids.
- Tablet layouts reduce grid density while retaining visual hierarchy.
- Mobile layouts prioritize one-column reading, compact navigation, legible surfaces, and touch-friendly controls.
- Decorative blur and motion simplify on constrained screens to protect performance and readability.

## Technical boundaries

- Preserve Next.js App Router structure, current routes, Supabase/storage behavior, API contracts, and SEO metadata.
- Do not alter existing copy, assets, media sources, or the content model except where markup needs a non-semantic wrapper for presentation.
- Prefer shared primitives and styles over route-specific duplicated CSS.
- Preserve semantic heading order, form labels, keyboard navigation, and reduced-motion support.

## Verification

Verify public homepage, services listing/detail, blog listing/detail, representative admin editor/login routes, and error/not-found states at desktop and mobile widths. Run the project test and build checks, then correct any visual, TypeScript, routing, or accessibility regressions found.
