# Nepal Field Notes Portfolio Redesign

## Status

Approved design direction: Nepal Field Notes

## Objective

Redesign the public portfolio at `C:\Users\A C E R\Downloads\m1` into a memorable, narrative-led portfolio for Mukesh Khadka. The experience should communicate practical software engineering, entrepreneurship, and Nepal-rooted perspective through a field-notes / technical-investigation visual language.

The redesign takes interaction and storytelling cues from the inspected Killian Herzer portfolio: system/status overlays, evidence-style project presentation, technical project narratives, compact metadata, and optional immersion. It must remain an original design with Mukesh's content, identity, imagery, and voice.

## Scope

### In scope

- Public homepage presentation and section hierarchy
- Public navigation and section anchors
- Hero/status treatment
- Project archive and project-card interactions
- About, capabilities, experience, testimonials, culture, contact, and footer presentation
- Shared visual tokens for the public portfolio experience
- Motion, hover, reveal, and reduced-motion behavior
- Responsive behavior for desktop, tablet, and mobile
- Local verification of the homepage and existing public routes

### Out of scope

- A first-pass Three.js/WebGL scene
- Replacing the existing Next.js framework
- Rewriting portfolio content, SEO metadata, API routes, or admin functionality
- Adding a CMS or new data source
- Replacing working assets without a clear visual or performance reason

## Preservation Requirements

- Preserve the existing Next.js application and current route families.
- Preserve `/admin`, admin authentication, content APIs, and existing data flows.
- Preserve current portfolio content, SEO intent, cultural identity, and Nepal-focused positioning.
- Reuse existing portfolio components and motion primitives where they remain suitable.
- Avoid a standalone HTML replacement or a Vite-style imitation.
- Keep the public homepage usable without JavaScript-dependent navigation.

## Audience and Success Criteria

The primary audience is a prospective client, organization, or collaborator evaluating Mukesh's ability to understand real operational problems and deliver useful software. The site succeeds when a visitor can quickly understand who Mukesh is, what he builds, see evidence of outcomes, and start a conversation.

Success criteria:

1. The first screen communicates person, role, location, availability, and primary action within seconds.
2. Projects feel like evidence of practical outcomes rather than a generic gallery.
3. The site feels distinctive and coherent without sacrificing readability or speed.
4. The existing content and public behavior remain intact.
5. Keyboard navigation, focus visibility, reduced motion, and mobile layouts remain reliable.

## Experience Architecture

The homepage keeps a single scrolling narrative with clear anchors:

1. **Signal / Hero**
   - Small metadata line: portfolio, Kathmandu, Nepal, availability.
   - Main headline: `Software that feels like it always belonged.`
   - Supporting copy focused on practical systems and reduced friction.
   - Primary action to work; secondary action to contact.
   - Portrait treatment framed as an identity/profile capture rather than a generic headshot.
   - Compact status indicators such as `SYSTEM ONLINE`, `AVAILABLE FOR PROJECTS`, and `KATHMANDU / NEPAL`.

2. **Toolbox Strip**
   - Existing skills marquee presented as a scrolling system inventory.
   - Pauses on hover/focus and remains readable when motion is reduced.

3. **Operator Profile / About**
   - Existing narrative remains first-person.
   - Add a dossier-style metadata rail for focus, location, years, and organizations served.
   - Maintain a clear reading column and avoid turning the biography into terminal text.

4. **Field Files / Projects**
   - Existing projects become evidence files.
   - Each item exposes category, year, title, problem, outcome, and technology tags.
   - Use a strong featured item followed by a structured archive grid/list.
   - Hover/focus states reveal a `VIEW FILE` affordance and a restrained image or accent treatment.
   - Existing project content remains the source of truth.

5. **System Inventory / Skills**
   - Existing capability groups become a clear inventory of disciplines.
   - Use numbered or labeled modules with concise descriptions.
   - Keep terminology understandable to non-technical decision makers.

6. **Operational History / Experience**
   - Existing experience becomes a vertical timeline.
   - Dates, role, organization, and outcomes remain scannable.
   - Use subtle checkpoint markers and connecting lines, not an overwhelming HUD.

7. **Verified Reports / Testimonials**
   - Existing testimonials presented as concise field reports.
   - Keep names and roles as supplied; do not invent client logos or claims.

8. **Origin Coordinates / Cultural Roots**
   - Preserve the Nepal flag, cultural tiles, and existing wording.
   - Add restrained coordinate/archive labels to connect the section to the field-notes concept.
   - The cultural section should feel warm and human, balancing the technical visual language.

9. **Open a Project Channel / Contact**
   - Existing contact information remains prominent and copyable.
   - Frame the call to action around describing a real problem or workflow.
   - Keep email, phone, location, and social links accessible without requiring an interaction layer.

10. **Footer**
    - Preserve required links and identity.
    - Include a compact system/version-style detail only if it does not create false technical claims.

## Visual System

### Palette

- Deep navy / near-black for high-impact surfaces and text anchors
- Warm paper / off-white for the primary reading canvas
- Himalayan gold for highlights and active signals
- Crimson for action states and selected evidence markers
- Muted slate for secondary metadata

The existing Nepal-inspired tokens should be consolidated or extended rather than replaced blindly. Color must remain accessible in both light and dark treatments.

### Typography

- Large editorial serif or display face for section headlines and key statements.
- Neutral sans-serif for body copy and navigation.
- Monospace for labels, status strings, dates, categories, and small technical metadata.
- Use the existing font setup where practical to avoid unnecessary external requests or visual drift.

### Surfaces and details

- Paper-like base with subtle grain or grid texture.
- Thin rules and framed modules.
- Small corner labels and section indices.
- Soft glow only around meaningful active states.
- Glass effects remain subordinate to content; avoid making every surface translucent.

## Interaction and Motion

- Use the existing `Reveal`, cursor, magnetic, tilt, scroll progress, and atmosphere primitives where appropriate.
- Add a consistent evidence-card hover/focus pattern rather than isolated effects.
- Animate status indicators with low-amplitude opacity or pulse changes.
- Use scroll-linked movement sparingly and avoid delaying content visibility.
- All interactive project items need keyboard-equivalent states.
- Add or preserve `prefers-reduced-motion` behavior: no continuous marquee, cursor effects, or large transforms when reduced motion is requested.
- Do not make hover the only way to access project information.

## Responsive Behavior

### Desktop

- Strong hero composition with split text/profile layout.
- Project archive can use an asymmetric featured layout and dense evidence grid.
- Metadata rails may sit beside content.

### Tablet

- Collapse secondary metadata into compact rows.
- Keep project titles and outcomes dominant.
- Reduce decorative overlays before reducing readable content.

### Mobile

- Single-column flow with visible section labels.
- No horizontal overflow from marquee or evidence layouts.
- Project files become stacked, fully readable cards.
- Portrait and status data move below or beside the hero copy without crowding.
- Contact actions remain large enough for touch.

## Technical Boundaries

- Implement in the existing Next.js and Tailwind/component structure.
- Prefer editing the existing portfolio components and `globals.css` over creating a second public-site system.
- Keep data in `lib/portfolio-content.ts` unless a component needs a presentation-only derived value.
- Avoid new runtime dependencies for the first pass.
- Keep images local and use existing optimized assets where possible.
- Verify no public route or admin route is accidentally affected by portfolio-scoped styles.

## Verification Plan

1. Run the existing test suite.
2. Verify the homepage returns HTTP 200 and renders the key sections.
3. Verify keyboard navigation across navigation, project files, and contact links.
4. Check reduced-motion behavior.
5. Check desktop and mobile layouts for overflow, unreadable contrast, and clipped content.
6. Verify existing public routes such as services, blog, sitemap, robots, and feed remain available.
7. Review the final implementation against this spec and record any intentional deviations.

## Phasing

### Phase 1: Public portfolio redesign

Implement the visual system, hero, section hierarchy, project evidence presentation, and responsive behavior using existing content and components.

### Phase 2: Interaction refinement

Tune motion, focus states, cursor behavior, project reveal details, and reduced-motion support after the main layout is stable.

### Phase 3: Optional immersive mode

Only after the standard site is verified, consider a separate 3D / WebGL experience that does not block the primary portfolio journey.
