# Hero CTA Overlap Fix Bugfix Design

## Overview

The Hero section in `components/sections/Hero.tsx` renders two decorative bottom curves (a crimson polygon at `z-[12]` and a navy `#082d58` ellipse at `z-[13]`) that visually intersect with the primary CTA buttons (`Explore My Vision`, `Learn More`) at `z-20` inside a `z-10` parent and the candidate portrait at `z-[11]`. On large viewports, the inner content column applies `lg:translate-y-24` while the outer flex container uses `pb-44 sm:pb-32`, which together push the CTAs and bottom tagline directly into the curve overlays. Because the navy curve color (`#082d58`) is visually identical to the navy gradient used by the `Marquee` component below, the boundary between Hero and Marquee disappears and the CTAs appear to be sunk into the marquee strip.

The fix restores clear visual separation between (a) the CTAs/portrait/tagline and the decorative curves, and (b) the Hero's bottom edge and the Marquee strip, while preserving the layered decorative look on viewports where the bug does not manifest. The strategy is to adjust z-stacking, vertical spacing, curve geometry, and the Hero/Marquee seam so interactive content and the portrait sit clearly above the decoration.

## Glossary

- **Bug_Condition (C)**: The rendering state where the CTA buttons or portrait visually intersect the decorative curve bands, OR where the Hero bottom and Marquee top share the same fill color with no perceivable separator.
- **Property (P)**: The desired rendered state - CTAs and portrait are fully visible and outside the curve region, and a perceivable separator exists between the Hero bottom and the Marquee top.
- **Preservation**: All existing Hero content, decorations (flag video, peaks image, lotus, city mist), animations, navigation hrefs, mobile layout, Marquee output, and reduced-motion behavior must continue to behave as they do today.
- **Hero (`renderHero`)**: The `Hero` React component in `components/sections/Hero.tsx` that emits the section markup and the two bottom curve overlays.
- **Marquee**: The `Marquee` React component in `components/sections/Marquee.tsx` rendered immediately below the Hero on the homepage with a `from-[#071224] via-[#102642] to-[#071224]` navy gradient background.
- **Curve Bands Region**: The screen region occupied by the two decorative overlays - the crimson polygon (`bg-crimson` clip-path polygon at `z-[12]`) and the navy ellipse (`bg-[#082d58]` clip-path ellipse at `z-[13]`) at the bottom of the Hero section.
- **CTA Buttons**: The two anchor elements `Explore My Vision` (`href="#vision"`) and `Learn More` (`href="#about"`) inside the inner content column at `z-20`.
- **Portrait**: The `<img>` of the candidate (`/mk-removebg-preview.webp`) rendered at `z-[11]` and absolutely positioned at the bottom of the Hero.

## Bug Details

### Bug Condition

The bug manifests when the Hero section renders on viewports (primarily `sm` and above, with worst-case at `lg+`) where the decorative curve bands occupy a vertical region that overlaps the bounding boxes of the CTA buttons or the portrait, AND/OR when the navy curve fill color matches the Marquee's top fill color with no separating border, divider, or non-navy band between them. The `Hero` component is either stacking the curves on top of interactive/identity content, sizing the curves so they cross the portrait silhouette, or producing a navy-on-navy seam against the Marquee.

**Formal Specification:**
```
FUNCTION isBugCondition(input)
  INPUT: input of type HeroRenderState
    // input includes: viewportWidth, curveBandsRegion, ctaButtonsRect,
    //                 portraitRect, heroBottomFillColor, marqueeTopFillColor,
    //                 hasSeparator
  OUTPUT: boolean

  RETURN
       intersects(input.ctaButtonsRect, input.curveBandsRegion)
    OR intersects(input.portraitRect,   input.curveBandsRegion)
    OR (input.heroBottomFillColor = input.marqueeTopFillColor
        AND NOT input.hasSeparator)
END FUNCTION
```

### Examples

- On a 1440px (`lg`) viewport: the bottom edge of `Explore My Vision` is overlapped by the navy ellipse band; expected - the button sits fully above both bands with breathing room.
- On a 1024px (`lg`) viewport: the `Learn More` button's right border is partially clipped by the crimson polygon; expected - the button is unclipped and outside the polygon region.
- On a 768px (`sm`) viewport: the candidate portrait is clipped at chest height by the navy ellipse; expected - the portrait silhouette is fully visible above the curve, or the curve is sized so it does not cross the portrait.
- On the homepage rendering Hero followed by Marquee: the navy curve at the Hero bottom flows into the Marquee's `#071224` gradient with no perceivable seam; expected - a visible separator (non-navy band, divider line, shadow, or geometry change) makes the boundary clear.
- Edge case - 320px mobile viewport: the centered layout already renders the portrait small and bottom-anchored without `lg:translate-y-24`; the bug does not currently manifest here, and the fix must not introduce new clipping.

## Expected Behavior

### Preservation Requirements

**Unchanged Behaviors:**
- The Nepali flag video, Himalayan peaks background image, Buddha lotus accent, and city mist SVG must continue to render with their current opacities, masks, classes, and positioning.
- The `Leading Nepal` badge, `Forward Together` headline, subheadline, bio paragraph, red accent line, and `Mayor Candidate - Kathmandu Metropolitan City` location row must continue to render with their current typography, colors, and entrance animations.
- The CTA `Explore My Vision` must continue to navigate to `#vision`, and `Learn More` must continue to navigate to `#about`.
- The mobile layout below `sm` (centered text, centered CTAs, portrait anchored bottom-center) must remain centered with no new clipping.
- The `Marquee` component must continue to display its scrolling list of role badges with current icons, colors, font weights, and animation timing.
- The `prefers-reduced-motion: reduce` suppression of the flag and portrait motion (driven by `globals.css` and the `hero-flag-video` / `hero-portrait-static` classes) must continue to function.
- Decorative curved color accents at the bottom of the Hero must still be visually present on `lg+` as part of the visual identity, even if their geometry, height, or stacking is adjusted.

**Scope:**
All inputs that do NOT involve the curve/CTA/portrait overlap or the Hero/Marquee seam must be completely unaffected by this fix. This includes:
- Background decorations (flag video, peaks image, lotus, city mist) - no change to opacity, mask, position, or class names.
- Text content of the badge, headline, subheadline, bio, accent line, and location row - no change to text or animation timings.
- CTA `href` attributes and click navigation behavior.
- Marquee internal markup, items, icons, gradient, and animation.
- Reduced-motion CSS rules in `app/globals.css`.

## Hypothesized Root Cause

Based on the bug description and the current `Hero.tsx` markup, the most likely issues are:

1. **Z-Index Stacking Inversion**: The decorative curves are rendered AFTER the portrait in the DOM at `z-[12]` (crimson) and `z-[13]` (navy), placing them above the portrait at `z-[11]`. The CTA container is at `z-10` with the inner column at `z-20`, but those z-indices live in a different stacking context (the `relative z-10` flex container) than the absolutely positioned curves. As a result, the curves visually paint on top of both portrait and CTAs whenever their vertical regions overlap.
   - Curves: `z-[12]` and `z-[13]` directly on the section
   - Portrait: `z-[11]` directly on the section -> behind both curves
   - CTA container: `relative z-10` -> establishes its own stacking context, but the curves above `z-10` in the parent paint over it

2. **Excessive Downward Translation on `lg+`**: The inner content column applies `lg:translate-y-24` (96px down) on top of the outer flex container's `pb-44 sm:pb-32`. On `lg` and larger viewports this drives the CTA cluster and the location row directly into the vertical region occupied by the `lg:h-44` curve bands.

3. **Curve Height Too Tall on `sm+`**: The curves use `h-28 sm:h-40 lg:h-44`, which on medium and large viewports occupies a tall band at the bottom. The navy ellipse `[clip-path:ellipse(82%_68%_at_37%_104%)]` extends high enough to cross the portrait at `lg:h-[92%]` and the CTA row.

4. **Navy-On-Navy Seam With Marquee**: The bottom navy ellipse uses `bg-[#082d58]` while the `Marquee` component uses `from-[#071224] via-[#102642] to-[#071224]`. These dark navies are perceptually nearly identical, and there is no separator (no border, no light band, no shadow, no margin) between the Hero's bottom edge and the Marquee's top edge, so the two regions visually merge.

5. **Portrait Not Promoted To Foreground**: Because the portrait is at `z-[11]` and the curves are at `z-[12]` and `z-[13]`, there is no path for the portrait to render in front of the curves under the current stacking. A foreground silhouette would require a higher z than the navy ellipse, or curves that don't reach the portrait region.

## Correctness Properties

Property 1: Bug Condition - Hero CTAs, Portrait, and Marquee Seam Clarity

_For any_ Hero render input where the bug condition holds (the CTAs or portrait visually intersect the curve bands region, OR the Hero bottom fill color equals the Marquee top fill color with no separator), the fixed `Hero` rendering SHALL produce a layout in which both CTA buttons are fully visible with no portion overlapped by the curve bands, the portrait silhouette is fully visible (either rendered above the curves or with curves sized so they do not cross the portrait), and the boundary between the Hero's bottom edge and the Marquee's top edge is perceptibly separated by a non-navy band, divider, border, shadow, or geometry change.

**Validates: Requirements 2.1, 2.2, 2.3, 2.4**

Property 2: Preservation - Non-Overlap Inputs and Existing Hero/Marquee Behavior

_For any_ Hero render input where the bug condition does NOT hold (no overlap of curves with CTAs or portrait, and the Hero/Marquee seam is already perceivable), the fixed `Hero` rendering SHALL produce the same observable result as the original rendering, preserving the background decorations (flag video, peaks image, lotus, city mist), all text content and entrance animations, the CTA `href` targets (`#vision`, `#about`), the mobile centered layout below `sm`, the `Marquee` component output, and the `prefers-reduced-motion` suppression.

**Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7**

## Fix Implementation

### Changes Required

Assuming the root cause analysis is correct, the fix is contained to the Hero component and (optionally) a small adjustment at the Hero/Marquee seam.

**File**: `components/sections/Hero.tsx`

**Function/Component**: `Hero`

**Specific Changes**:

1. **Promote Inner Content Column Above Curves**: Raise the inner content column (the `relative z-20 mx-auto max-w-[30rem] ...` wrapper) so it stacks above the curve overlays. This means giving its parent (currently `relative z-10 ...`) a z-index higher than the curves (greater than `z-[13]`), for example by changing the flex container to `relative z-[20]` and the inner column to `z-[30]`. This ensures CTAs, headline, badge, and location row all paint above both curves regardless of vertical position.
   - Move the curve overlays so they precede the content container in the JSX, OR raise the content container's z-index above `z-[13]`.
   - Verify the resulting stacking context still allows the background image, flag video, lotus, and city mist to render behind the content as today.

2. **Promote Portrait Above Navy Curve (or Reshape Curves)**: Either bump the portrait's z-index above `z-[13]` (e.g. `z-[14]` or higher) so its silhouette renders in front of the curves, OR reduce the curve heights / reshape the ellipse so it does not cross the portrait region on `sm+`. The first option is lower-risk because it does not change decorative geometry on non-buggy viewports.

3. **Reduce Vertical Push Into The Curve Region On `lg+`**: Replace `lg:translate-y-24` on the inner content column with a value that does not push the CTA cluster into the curve band, OR increase the outer container's bottom padding so the CTA cluster ends well above the curves. Targeted change: drop `lg:translate-y-24` (or reduce to a smaller value such as `lg:translate-y-8`) and adjust `pb-44 sm:pb-32` to ensure at least one comfortable gap (e.g. ~24-32px) between the bottom of the location row and the top of the curve bands at `lg+`.

4. **Adjust Curve Geometry On `sm+` (Optional, As Needed)**: If raising z-index alone is not enough to prevent the portrait being clipped at the visual edge of the curves on `sm+`, reduce the curve heights (e.g. `sm:h-32 lg:h-36` instead of `sm:h-40 lg:h-44`) and/or reshape the navy ellipse so its top arc sits below the portrait's chest line.

5. **Resolve The Hero/Marquee Seam**: Introduce a perceivable separator between the navy ellipse and the Marquee. Options (any one is sufficient):
   - Change the bottom-most decorative band to a non-navy color (e.g. crimson on top of navy, or a thin off-white/gold accent strip) so the seam shows a color change.
   - Add a thin horizontal divider/border at the top of the `Marquee` (e.g. `border-t border-white/15` or a 1-2px gold/crimson line).
   - Add a small drop-shadow at the Marquee top edge (e.g. `shadow-[0_-2px_8px_rgba(0,0,0,0.35)]`).
   - Reduce the navy ellipse height so an `f7f9fc` (Hero base) band of ~8-16px sits between the curve and the Marquee.

   The implementation may pick the lightest-touch option that visibly separates the two regions; choosing a thin Marquee top border is the smallest change.

## Testing Strategy

### Validation Approach

Testing follows a two-phase approach: first, surface counterexamples that demonstrate the bug on the unfixed code (exploratory bug condition checking), then verify the fix works for buggy inputs (fix checking) and that non-buggy inputs are preserved (preservation checking).

Because the bug is a visual layout/stacking issue, tests will combine DOM/style assertions (checking class names, z-index ordering, presence of separators, computed bounding rects via mocked `getBoundingClientRect`) with property-based generation across a range of viewport widths.

### Exploratory Bug Condition Checking

**Goal**: Surface counterexamples that demonstrate the bug BEFORE implementing the fix. Confirm or refute the root cause analysis. If we refute, we will need to re-hypothesize.

**Test Plan**: Render the `Hero` component (and the Hero followed by `Marquee`) at representative `sm`, `md`, and `lg+` viewport widths. Read the DOM for the curve overlays, CTA buttons, portrait, and Marquee top edge. Assert no intersection of bounding rects and assert a perceivable separator at the Hero/Marquee seam. Run these assertions on the UNFIXED code to observe failures and confirm root cause.

**Test Cases**:
1. **CTA-Curve Overlap At `lg`**: Render Hero at 1440px viewport, compute bounding rects of `Explore My Vision`, `Learn More`, and the navy ellipse. Assert no rect intersection (will fail on unfixed code).
2. **Portrait-Curve Overlap At `sm+`**: Render Hero at 1024px viewport, compute portrait rect and curve rects. Assert portrait z-index > navy curve z-index OR no rect intersection (will fail on unfixed code).
3. **Hero/Marquee Seam At Default Width**: Render Hero followed by Marquee. Assert that either the Hero's bottom decorative element fill color differs from the Marquee top fill color, OR a border/divider/shadow exists between them (will fail on unfixed code).
4. **Edge Case - Mobile Below `sm`**: Render Hero at 375px viewport. Assert no new clipping introduced - portrait, CTA cluster, and curves all render without intersecting (may pass on unfixed code; should still pass after fix).

**Expected Counterexamples**:
- CTA bounding rect intersects navy ellipse rect at `lg+`.
- Portrait z-index (`z-[11]`) is below navy ellipse z-index (`z-[13]`) and rects intersect on `sm+`.
- Navy curve color (`#082d58`) equals Marquee top color (`#071224` is perceptually the same dark navy) and there is no border/shadow/divider between them.
- Possible causes: stacking inversion (curves above interactive content), excessive `lg:translate-y-24`, oversized `lg:h-44` curve height, navy-on-navy seam.

### Fix Checking

**Goal**: Verify that for all inputs where the bug condition holds, the fixed `Hero` rendering produces the expected behavior (CTAs and portrait fully visible, perceivable Hero/Marquee separator).

**Pseudocode:**
```
FOR ALL input WHERE isBugCondition(input) DO
  result := renderHero_fixed(input)
  ASSERT fullyVisible(result.ctaButtons)
     AND NOT intersects(result.ctaButtonsRect, result.curveBandsRegion)
     AND NOT intersects(result.portraitRect,   result.curveBandsRegion)
     AND hasVisibleSeparation(result.heroBottomY, result.marqueeTopY)
END FOR
```

### Preservation Checking

**Goal**: Verify that for all inputs where the bug condition does NOT hold, the fixed `Hero` rendering produces the same observable result as the original rendering.

**Pseudocode:**
```
FOR ALL input WHERE NOT isBugCondition(input) DO
  ASSERT renderHero_original(input) = renderHero_fixed(input)
    // Same DOM structure for background decorations, text content,
    // animations, CTA hrefs, mobile layout, and Marquee output.
END FOR
```

**Testing Approach**: Property-based testing is recommended for preservation checking because:
- It generates many viewport widths and DOM input combinations automatically across the input domain.
- It catches edge cases (e.g. very narrow or very wide viewports) that manual unit tests might miss.
- It provides strong guarantees that the fix is non-invasive for non-buggy inputs.

**Test Plan**: Observe behavior on UNFIXED code first for non-overlap aspects (text content, hrefs, animation classes, Marquee output), then write property-based tests that capture that behavior and re-run after the fix. Assert structural equality of the relevant DOM subtrees and class strings.

**Test Cases**:
1. **Background Decorations Preservation**: Observe peaks image, flag video, lotus, and city mist render with current opacities, masks, and class names; assert these do not change after fix.
2. **Text Content + Animation Preservation**: Observe the badge, headline (`Forward Together`), subheadline, bio, accent line, and location row render with current text and `motion.*` props; assert unchanged after fix.
3. **CTA Href Preservation**: Assert `Explore My Vision` href remains `#vision` and `Learn More` href remains `#about` after fix.
4. **Mobile Layout Preservation**: At a sub-`sm` viewport (e.g. 375px), assert centered classes (`text-center`, `mx-auto`, `justify-center`) on inner column and CTA cluster remain.
5. **Marquee Preservation**: Assert `Marquee` rendered DOM (items, icons, colors, classes) is unchanged after the fix.
6. **Reduced-Motion Class Preservation**: Assert `hero-flag-video` class on the video and `hero-portrait-static` class on the portrait remain after the fix, so the `globals.css` `prefers-reduced-motion` rules continue to apply.

### Unit Tests

- Render `Hero` and assert presence and class strings of the crimson polygon and navy ellipse curve elements (preserved decoration).
- Render `Hero` and assert CTA anchors have `href="#vision"` and `href="#about"`.
- Render `Hero` and assert the portrait `<img>` has `src="/mk-removebg-preview.webp"` and the `hero-portrait-static` class.
- Render `Hero` and assert the inner content column wrapper has a z-index strictly greater than the navy curve z-index (`z-[13]`).
- Render `Hero` and assert the portrait z-index OR curve geometry satisfies the no-intersection rule on `sm+` viewports.
- Render `Marquee` and assert all items, icons, and gradient classes are present and unchanged.

### Property-Based Tests

- Generate a viewport width across the range [320, 1920] and render Hero; assert that the CTA bounding rects do not intersect the curve region (using mocked `getBoundingClientRect` keyed by class name).
- Generate a viewport width across `[640, 1920]` (i.e. `sm+`) and render Hero; assert that the portrait either has a higher z-index than the navy curve OR its rect does not intersect the curve region.
- Generate Hero+Marquee composition; assert that the Hero/Marquee seam has either a color change, a border/divider, or a shadow/separator between the two components.
- Generate Hero render with arbitrary preserved input combinations (e.g. different `prefers-reduced-motion` matchMedia results); assert that text content, hrefs, animation classes, Marquee output, and decoration class names are byte-identical to the original.

### Integration Tests

- Render the homepage (Hero followed by Marquee) at desktop viewport; visually assert via DOM measurements that CTAs are clickable and not overlapped, the portrait is fully visible, and the Hero/Marquee seam is perceivable.
- Render the homepage at tablet viewport (`sm`/`md`); assert portrait and CTA visibility and seam separation.
- Render the homepage at mobile viewport (below `sm`); assert centered mobile layout still renders without new clipping.
- Click `Explore My Vision` and assert in-page navigation to `#vision`; click `Learn More` and assert in-page navigation to `#about`.
- With `prefers-reduced-motion: reduce` matched, render Hero and assert the `hero-flag-video` and `hero-portrait-static` classes still apply (so the existing `globals.css` reduced-motion rules engage).
