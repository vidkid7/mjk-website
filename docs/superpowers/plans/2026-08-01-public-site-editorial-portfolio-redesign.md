# Public Site Editorial Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rework the public-facing site into a full-bleed editorial portfolio with a navbar-over-hero first screen, stronger public typography, and a more disciplined section structure across homepage, blog, services, and footer surfaces.

**Architecture:** Keep the current routes, content sources, and admin-managed data. Introduce one shared public chrome language in `app/globals.css`, then apply it to the homepage hero and the remaining public sections so the site reads as one portfolio system instead of a collection of separate blocks. Preserve the Nepal heritage media set and the real flag video asset, and do not touch admin behavior.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, existing local sections/components, existing media assets, existing test runner.

## Global Constraints

- Preserve all existing public routes and content data.
- Do not redesign admin layouts, admin content workflows, or backend models.
- Keep the homepage single-H1 structure.
- Keep the real Nepal flag video asset and move it farther left in the hero.
- Make the homepage full-bleed behind the navbar so the hero image reaches the top edge of the viewport.
- Reuse the existing font stack and visual palette; adjust hierarchy through layout, spacing, weight, and contrast.
- Avoid horizontal overflow on common desktop and mobile widths.
- Preserve reduced-motion behavior.

---

### Task 1: Rebuild the public chrome and hero framing

**Files:**
- Modify: `components/sections/Navbar.tsx`
- Modify: `components/sections/Hero.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: existing `hero` stored data, existing `navLinks`, existing hero media assets.
- Produces: a transparent/blurred navbar over the hero, a full-bleed hero that starts at the viewport top, a farther-left flag placement, and a cleaner public type system.

- [ ] **Step 1: Update the hero contract before touching layout**

Add or extend the current homepage/hero expectations so the hero must render full-bleed behind the navbar, keep the flag as a real video, and preserve the cultural composition.

- [ ] **Step 2: Rework the hero layout**

Move the hero container so the image reaches the top of the viewport under the fixed navbar. Remove the top white break, keep the text in a lower-left editorial composition, and push the flag farther left.

- [ ] **Step 3: Adjust navbar treatment**

Make the navbar visually float on top of the hero with translucency and blur while keeping the logo, actions, and mobile menu usable.

- [ ] **Step 4: Refresh shared public styling primitives**

Tune the public palette, typography, and hero-safe-area styles in `app/globals.css` so the overlay, heading rhythm, and motion guards support the new presentation.

- [ ] **Step 5: Verify the hero in the browser**

Run the site locally and check desktop and mobile viewports for full-bleed coverage, no overflow, readable copy, and flag placement.

### Task 2: Recompose the homepage into a stronger editorial story

**Files:**
- Modify: `app/page.tsx`
- Modify: `components/sections/About.tsx`
- Modify: `components/sections/Achievements.tsx`
- Modify: `components/sections/ClientPortfolio.tsx`
- Modify: `components/sections/Vision.tsx`
- Modify: `components/sections/Initiatives.tsx`
- Modify: `components/sections/Entrepreneurship.tsx`
- Modify: `components/sections/YouthInspiration.tsx`
- Modify: `components/sections/Testimonials.tsx`
- Modify: `components/sections/Gallery.tsx`
- Modify: `components/sections/News.tsx`
- Modify: `components/sections/Stats.tsx`
- Modify: `components/sections/Contact.tsx`
- Modify: `components/sections/FAQ.tsx`
- Modify: `components/sections/Footer.tsx`

**Interfaces:**
- Consumes: the existing homepage section components and stored content.
- Produces: a clear homepage sequence with stronger section labels, tighter hierarchy, and alternating light/dark story bands.

- [ ] **Step 1: Reorder and frame the homepage sections**

Keep the same content sources, but make the homepage flow like an editorial portfolio: hero, compact trust strip, about, proof, portfolio, vision, initiatives, entrepreneurship, youth, testimonials, gallery, news, stats, contact, FAQ, footer.

- [ ] **Step 2: Tighten heading and body rhythm across sections**

Update the section-level typography and spacing so headings feel deliberate, labels are small and tracked, and body copy reads cleanly at a glance.

- [ ] **Step 3: Simplify section surfaces**

Reduce decorative effects inside the homepage sections, keep the strongest visual energy in the hero, and avoid card-heavy composition for major page bands.

- [ ] **Step 4: Normalize alignment and spacing**

Use one consistent content width strategy so section content aligns across the homepage and does not feel stitched together.

- [ ] **Step 5: Verify the homepage structure**

Confirm the homepage still renders all content, the hero remains the first-viewport signal, and no section overflows at narrow widths.

### Task 3: Apply the same public structure to blog and services

**Files:**
- Modify: `app/blog/page.tsx`
- Modify: `app/blog/[slug]/page.tsx`
- Modify: `app/services/page.tsx`
- Modify: `app/services/[slug]/page.tsx`
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: existing blog and services content.
- Produces: a magazine-style blog index, cleaner post typography, a structured services presentation, and shared public metadata/chrome.

- [ ] **Step 1: Restyle the blog index**

Turn the index into a clearer editorial list with stronger hierarchy, featured content treatment, and better metadata visibility.

- [ ] **Step 2: Restyle the blog detail page**

Improve reading width, heading rhythm, and spacing so posts feel like polished articles rather than raw content dumps.

- [ ] **Step 3: Reframe the services pages**

Present services as a portfolio of capabilities with explicit structure, visible proof, and a clear contact path.

- [ ] **Step 4: Align shared metadata and chrome**

Make sure layout-level metadata, head elements, and page chrome continue to support the same public visual language.

- [ ] **Step 5: Verify blog and services routes**

Visit the blog and services routes locally and confirm that the new public structure applies consistently without breaking navigation.

### Task 4: Verify, test, and clean up public-only changes

**Files:**
- Modify: `tests/liquid-design-contract.test.mjs`
- Modify: `tests/search-safety.test.mjs`
- Modify: `tests/platform-improvements.test.mjs`
- Modify only if implementation changes require it: any homepage-specific tests already in the repo.

**Interfaces:**
- Consumes: the redesigned public UI.
- Produces: passing automated checks and a visually verified public site.

- [ ] **Step 1: Update or add contract coverage where the homepage behavior changed**

Cover the public-facing contract points that changed: full-bleed hero, navbar overlay, flag placement, editorial copy hierarchy, and no overflow.

- [ ] **Step 2: Run targeted tests**

Run the relevant homepage and route tests first so regressions are caught before the full suite.

- [ ] **Step 3: Run the production build**

Verify the app builds cleanly after the public design changes.

- [ ] **Step 4: Inspect the site visually**

Check the rendered site at desktop and mobile widths, with attention to image framing, text fit, and section rhythm.

- [ ] **Step 5: Commit the implementation**

Stage only the public-site files that were intentionally changed, then commit with a message that reflects the editorial portfolio redesign.
