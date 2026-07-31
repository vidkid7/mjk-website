# Balanced Portfolio Hero Design

## Goal

Refine the homepage hero into a professional personal portfolio while preserving the approved Nepal heritage composition. The hero must present Mukesh Khadka as a technology professional and entrepreneur whose work creates practical value for organizations and communities in Nepal.

## Visual Direction

Use an editorial overlay rather than a card or split-screen layout. The heritage panorama remains the dominant visual surface, with restrained typography layered over its lower-left area.

- Keep the generated panorama containing Mount Everest, Gautam Buddha, Janaki Temple, and Mukesh Khadka.
- Keep the supplied animated Nepal flag video on desktop.
- Move the animated flag farther left so its pole sits close to the viewport edge.
- Let the panorama remain visible through the bottom of the hero.
- Replace the large navy bottom shape with a slim navy-and-crimson finishing accent.
- Preserve the existing combined heritage logo in the navbar.

## Portfolio Content

The hero will contain the following hierarchy:

1. Eyebrow: `TECHNOLOGY • ENTREPRENEURSHIP • NEPAL`
2. Primary heading: `Mukesh Khadka`
3. Positioning statement: `Building digital systems with purpose.`
4. Supporting copy: `I create practical software, develop meaningful ventures, and use technology to deliver lasting value for organizations and communities.`
5. Primary action: `View Portfolio`, linked to `#client-portfolio`
6. Secondary action: `Start a Project`, linked to `#contact`

The name remains the only page-level heading. Supporting text must use paragraph or non-heading elements so the homepage retains one semantic `h1`.

## Layout

### Desktop

- The panorama covers the full hero area from the bottom of the fixed navbar to the bottom of the viewport.
- The portfolio copy sits in the lower-left quadrant with enough width for readable line lengths.
- A subtle dark-to-transparent local gradient sits behind the copy, without forming a visible box.
- The text must not cover Mukesh Khadka’s face, Gautam Buddha’s face, or the central Everest peak.
- The animated flag remains behind the copy at reduced opacity and extends farther off the left edge.

### Mobile and Tablet

- The background remains full-bleed and uses a deliberate focal position to keep the important subjects visible.
- The animated flag video remains disabled below the desktop breakpoint.
- Portfolio copy is shorter in width, centered or left-aligned according to available space, and kept above the bottom accent.
- Actions stack or wrap without horizontal overflow.

## Interaction and Accessibility

- Buttons use existing site anchors and do not introduce new routes.
- The primary heading remains visible before JavaScript hydration.
- The decorative panorama and flag video remain hidden from assistive technologies.
- Existing reduced-motion behavior remains active.
- Text and actions meet readable contrast through a localized gradient rather than an opaque content panel.

## Performance

- Continue delaying the desktop flag video until the initial view has settled.
- Do not load the flag video on mobile.
- Reuse the existing optimized WebP panorama and transparent WebM flag.
- Do not add new third-party fonts, libraries, or media.

## Verification

- Extend the hero contract tests to cover the portfolio eyebrow, positioning statement, actions, full-height image treatment, slim bottom accent, and farther-left flag placement.
- Run the complete automated test suite.
- Run the production build.
- Verify `http://localhost:3012/` visually at desktop and mobile widths.
- Confirm there is no horizontal overflow and that the video reaches a ready state on desktop.

## Scope

This change is limited to the homepage hero and its related contract tests. It does not change the remaining homepage sections, admin content model, routes, database, or deployment configuration.
