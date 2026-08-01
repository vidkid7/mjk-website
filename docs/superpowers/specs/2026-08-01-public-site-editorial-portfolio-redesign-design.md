# Public Site Editorial Portfolio Redesign Design

## Goal

Turn the public-facing site into a polished editorial portfolio that feels culturally grounded, visually premium, and structurally disciplined. The homepage should read as a full-bleed portfolio story, not a split-card landing page, and the supporting public routes should share the same typography, spacing, and hierarchy.

## Approved Direction

The approved direction is **Editorial Heritage Portfolio**.

- Keep the Nepal identity, the existing hero subject matter, and the portfolio framing.
- Use AashaTech-like structural cues: clearer section rhythm, stronger typography contrast, and tighter hierarchy.
- Keep the homepage hero full-bleed behind the navbar so the image reaches the top of the window.
- Keep the animated Nepal flag as a real video layer, not an SVG substitute, and move it farther left.
- Present the rest of the homepage as a refined portfolio narrative with modern section bands and controlled spacing.
- Apply the same public visual language to blog, services, contact, and footer surfaces.

## File Boundaries

Likely files to modify:

- `app/page.tsx`
- `components/sections/Hero.tsx`
- `components/sections/Navbar.tsx`
- `components/sections/About.tsx`
- `components/sections/Achievements.tsx`
- `components/sections/ClientPortfolio.tsx`
- `components/sections/Vision.tsx`
- `components/sections/Initiatives.tsx`
- `components/sections/Entrepreneurship.tsx`
- `components/sections/YouthInspiration.tsx`
- `components/sections/Testimonials.tsx`
- `components/sections/Gallery.tsx`
- `components/sections/News.tsx`
- `components/sections/Stats.tsx`
- `components/sections/Contact.tsx`
- `components/sections/FAQ.tsx`
- `components/sections/Footer.tsx`
- `app/blog/page.tsx`
- `app/blog/[slug]/page.tsx`
- `app/services/page.tsx`
- `app/services/[slug]/page.tsx`
- `app/layout.tsx`
- `app/globals.css`

## Global Constraints

- Preserve all existing routes, content sources, and admin-managed data.
- Do not redesign admin surfaces in this work.
- Keep the homepage single-H1 structure.
- Keep the current Nepal heritage media set and the real flag video asset.
- Do not introduce new third-party UI libraries.
- Use the existing font stack and tune hierarchy with layout and weight, not new font loading.
- Preserve reduced-motion behavior.
- Avoid nested cards and avoid turning page sections into floating panels.
- Keep the public site readable without horizontal overflow at mobile and desktop widths.

## Architecture

Use one shared public design language across the site:

- Display type for primary names and section headlines.
- Sans-serif body copy for scanning and support text.
- Narrow uppercase microcopy for labels, chips, and section intros.
- Full-width bands for page sections, with occasional inset content constraints.
- Glass only for chrome elements and repeated items, not for main page surfaces.

The homepage becomes the lead expression of that system. It keeps the cultural composition, but the navbar overlays the hero, the hero extends under it, and the rest of the homepage follows a cleaner editorial sequence. Blog and services pages reuse the same spacing, typography, and accent system so the site feels like one product instead of isolated templates.

## Homepage Design

### Hero

- Make the hero full-bleed from the top of the viewport to the bottom of the first screen.
- Remove the white visual break above the hero image; the navbar should sit on top with translucency and blur.
- Keep the hero image as the dominant surface and let the flag sit farther left and more vertically present.
- Keep the name prominent, but move the rest of the copy into a more editorial composition: eyebrow, name, tagline, short paragraph, and two actions.
- The hero text should feel like a portfolio introduction, not a marketing card.
- Keep the portrait, Everest, Buddha, and Janaki Temple composition intact, but avoid cropping the subject into a narrow right-side strip.
- The hero must still work on mobile with a deliberate crop and no layout overflow.

### Homepage Story Flow

The homepage should read as a sequence of story bands:

1. Hero
2. Compact marquee or trust strip
3. About and positioning
4. Proof and achievements
5. Portfolio or work samples
6. Vision and initiatives
7. Entrepreneurship and youth
8. Testimonials and gallery
9. News, stats, contact, FAQ, footer

The exact content can stay the same, but the presentation should feel more like an editorial portfolio with stronger headings, clearer dividers, and more intentional breathing room.

### Section Styling

- Section headings should use a stronger hierarchy with consistent size, weight, and max line length.
- Section labels should use small uppercase or tracked text.
- Repeated content blocks should align to a consistent grid.
- Use fewer decorative effects inside sections; keep visual energy in the hero and chrome.
- Use alternating light and dark section bands where it improves reading rhythm.

## Public Route Design

### Blog

- Keep the blog routes and content intact.
- Rework the blog index to feel like a magazine-style editorial list with a featured story and clearer metadata.
- Rework the post page to read cleanly on first scroll, with better heading rhythm and a stronger reading column.
- Keep the same site chrome and typography so blog pages belong to the same family as the homepage.

### Services

- Keep the services routes intact.
- Present services as a structured portfolio of capabilities rather than a generic card grid.
- Use a clear service title, short positioning line, proof points, and a direct contact path.
- Preserve service detail pages, but refine spacing, headings, and supporting metadata blocks.

### Contact and Footer

- Keep the contact area visible and easy to reach.
- Make the footer feel finished and branded, not leftover.
- Use the same public typography, spacing, and accent colors as the homepage.

## Shared Chrome

### Navbar

- The navbar should float over the hero and remain readable on top of imagery.
- Keep the logo compact and the navigation clear.
- The navbar should remain functional on mobile without adding visual bulk.

### Typography

- Use Inter for body text and Playfair Display for prominent names or major headings.
- Use typography scale and spacing to create the AashaTech-like structure, not copied visuals.
- Keep letter spacing restrained and avoid overscaled body text.

### Color and Materials

- Preserve the current heritage palette: navy, crimson, gold, and stone neutrals.
- Use subtle glass only for chrome, not for the main narrative blocks.
- Keep decorative accents minimal and purposeful.

## Motion and Media

- Keep the flag animation, but move it farther left and ensure it is a real video source.
- Keep reduced-motion support intact.
- Reuse existing optimized media where possible.
- Avoid adding heavy new animations to the public sections.

## Accessibility and Performance

- Maintain strong contrast for text over imagery.
- Keep the hero readable before hydration.
- Preserve keyboard focus visibility and skip-link behavior.
- Do not add layout shifts from late-loading decorative media.
- Avoid horizontal overflow at common mobile widths.

## Verification

- Verify the homepage fills the viewport behind the navbar on desktop and mobile.
- Verify the flag is visible farther left and uses the real animated asset.
- Verify the homepage still shows the full cultural composition without awkward cropping.
- Verify blog and services pages inherit the new public structure cleanly.
- Run the automated tests and production build.
- Inspect the rendered site at desktop and mobile widths for overflow, overlap, and text fit.

## Scope

This redesign covers the public site only: homepage, blog, services, contact/footer, and shared public chrome. It does not change admin layouts, admin content workflows, or backend data models.
