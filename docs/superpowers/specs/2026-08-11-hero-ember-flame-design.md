# Hero Ember-Flame Animation Design

## Goal

Add a restrained fire-inspired animation around the existing `MUKESH KHADKA` hero headline. The effect should make the title feel energetic and cinematic while preserving legibility, the current Nepal-inspired visual identity, and the existing dust-gather and air-wave sequence.

## Scope and constraints

- Presentation-only change: no CMS content, Supabase data, routes, images, or admin behavior changes.
- Preserve the existing title text, two-layer layout, desktop no-wrap behavior, and mobile responsive rules.
- Use CSS and existing title markup rather than introducing a new image asset or a continuously running canvas effect.
- Keep the effect lightweight and clipped to the hero so it cannot create horizontal scrolling.

## Recommended design

The title receives a low-opacity red/gold ember aura through pseudo-elements and a small set of decorative ember particles. The aura sits behind the title layers, while the particles rise slowly, blur, and fade. The animation begins after the existing dust-gather phase so the sequence is:

1. Letters gather from dust.
2. A short ember ignition glows around the assembled name.
3. A restrained upward ember drift loops with the existing air-wave motion.

The effect will use the existing CSS custom-property animation pattern where practical. It will be responsive through `clamp()` sizing and reduced in scale/opacity on narrow screens. It will not obscure the title or the portrait, flag, mountain, or temple layers.

## Accessibility and performance

- `@media (prefers-reduced-motion: reduce)` disables ember movement and leaves only a quiet static accent.
- Decorative elements remain `aria-hidden` and `pointer-events: none`.
- No JavaScript timers, layout reads, or new runtime dependencies.
- The hero remains `overflow-hidden`/clipped and will be checked for horizontal overflow at 320px, 430px, 768px, 1024px, 1183px, 1280px, and 1440px.

## Verification

- Extend the responsive contract test to require the ember keyframes, title ember hooks, and reduced-motion fallback.
- Run the full responsive contract test and TypeScript check.
- Build the production bundle and restart the local server.
- Use Playwright screenshots and computed geometry at mobile, laptop, and desktop widths to confirm the title remains readable, each layer stays on one line at desktop widths, the animation is present, and there is no horizontal overflow.

## Out of scope

- Replacing the title font or wording.
- Changing hero composition, portrait placement, cultural imagery, CMS data, or Supabase schema.
- Adding audio, video, WebGL, or a flame image overlay.
