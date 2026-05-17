# Implementation Plan

## Overview

This plan fixes the Hero section's decorative-curve overlap with the CTA buttons and candidate portrait, and the navy-on-navy seam between the Hero and the Marquee, in `components/sections/Hero.tsx` (with an optional small adjustment in `components/sections/Marquee.tsx`). The plan follows the bug-condition methodology: Property 1 (Bug Condition) is written first as a property-based test that must fail on the unfixed code, Property 2 (Preservation) is written as observation-first property-based tests that must pass on the unfixed code, then the fix is applied across z-stacking, vertical spacing, optional curve geometry, and the Hero/Marquee seam, and both properties are re-verified.

## Tasks

- [ ] 1. Write bug condition exploration test
  - **Property 1: Bug Condition** - Hero CTA / Portrait / Marquee Seam Overlap
  - **CRITICAL**: This test MUST FAIL on unfixed code - failure confirms the bug exists
  - **DO NOT attempt to fix the test or the code when it fails**
  - **NOTE**: This test encodes the expected behavior - it will validate the fix when it passes after implementation
  - **GOAL**: Surface counterexamples that demonstrate the CTAs/portrait overlap the decorative curve bands and that the Hero/Marquee seam is indistinguishable
  - **Scoped PBT Approach**: Scope the property to deterministic viewport widths that trigger the bug - sample at 1024px, 1280px, 1440px, and 1920px (the `lg+` range) plus 768px (`sm+` for the portrait clip case), so the property is reproducible while still generating across the buggy domain
  - Render `Hero` from `components/sections/Hero.tsx` at each scoped viewport width using `@testing-library/react` and a mocked `getBoundingClientRect` keyed by element class names (curve bands, CTA anchors, portrait `<img>`)
  - Assert `isBugCondition(input)` from design holds on unfixed code by checking:
    - `intersects(ctaButtonsRect, curveBandsRegion)` is true at `lg+` widths (CTAs `Explore My Vision` and `Learn More` overlap the navy `z-[13]` ellipse and/or the crimson `z-[12]` polygon)
    - `intersects(portraitRect, curveBandsRegion)` is true at `sm+` widths (portrait `z-[11]` is below the navy `z-[13]` ellipse and their rects intersect)
    - `heroBottomFillColor == marqueeTopFillColor AND NOT hasSeparator` is true when Hero is rendered with `Marquee` from `components/sections/Marquee.tsx` directly below it (navy `#082d58` curve flush against `from-[#071224]` Marquee gradient with no border, divider, shadow, or non-navy band)
  - The test assertions encode the Expected Behavior properties from design (`fullyVisible(ctaButtons)`, no rect intersection with curves, perceivable Hero/Marquee separation), so the same test will validate the fix
  - Run test on UNFIXED code
  - **EXPECTED OUTCOME**: Test FAILS (this is correct - it proves the bug exists)
  - Document counterexamples found - record the specific viewport widths where CTA/portrait rects intersect the curve bands and the specific DOM evidence that the Hero/Marquee seam has no separator
  - Mark task complete when test is written, run, and failure is documented
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.1, 2.2, 2.3, 2.4_

- [ ] 2. Write preservation property tests (BEFORE implementing fix)
  - **Property 2: Preservation** - Hero Decorations, Content, Navigation, Mobile Layout, Marquee, and Reduced-Motion Behavior
  - **IMPORTANT**: Follow observation-first methodology - observe actual unfixed-code output first, then encode it as properties
  - Observe behavior on UNFIXED code for non-bug-condition inputs:
    - Render `Hero` and snapshot the DOM nodes for the Nepali flag video, Himalayan peaks background image, Buddha lotus accent, and city mist SVG (class names, opacity classes, mask classes, positioning classes)
    - Snapshot the `Leading Nepal` badge text, the `Forward Together` headline, the subheadline, the bio paragraph, the red accent line, and the `Mayor Candidate - Kathmandu Metropolitan City` location row including their `motion.*` animation props and class strings
    - Read the `href` attributes of both CTA anchors - record `Explore My Vision -> #vision` and `Learn More -> #about`
    - At a sub-`sm` viewport (e.g. 375px), record the centered layout classes on the inner column and CTA cluster (`text-center`, `mx-auto`, `justify-center`)
    - Render `Marquee` and snapshot its rendered DOM - items, icons, colors, font weight classes, gradient classes, animation timing
    - Confirm the `hero-flag-video` class on the video element and the `hero-portrait-static` class on the portrait `<img>` are present (so the `globals.css` `prefers-reduced-motion` rules continue to apply)
  - Write property-based tests using fast-check (or the project's PBT library) that generate non-bug-condition inputs and assert each observed behavior is preserved:
    - Generate viewport widths across `[320, 1920]` and assert the background decoration class strings, opacities, and masks are byte-identical to the unfixed snapshot
    - Generate viewport widths and assert the badge, headline, subheadline, bio, accent line, and location row text content and `motion.*` props are byte-identical
    - Assert CTA `href` attributes remain `#vision` and `#about` across all generated renders
    - Generate sub-`sm` viewport widths (`[320, 639]`) and assert the centered mobile layout classes remain
    - Render `Marquee` across generated inputs and assert its DOM (items, icons, gradient classes, animation classes) is byte-identical
    - Generate `prefers-reduced-motion: reduce` matchMedia results and assert `hero-flag-video` and `hero-portrait-static` classes remain
  - Run tests on UNFIXED code
  - **EXPECTED OUTCOME**: Tests PASS (this confirms baseline behavior to preserve)
  - Mark task complete when tests are written, run, and passing on unfixed code
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7_

- [ ] 3. Fix for Hero CTA / portrait / marquee seam overlap

  - [ ] 3.1 Promote inner content column above the decorative curve bands
    - In `components/sections/Hero.tsx`, raise the z-index of the flex container that wraps the inner content column (currently `relative z-10 ...`) to a value strictly greater than the navy curve's `z-[13]` (e.g. `z-[20]`), and raise the inner column wrapper above that (e.g. `z-[30]`), OR reorder the JSX so the curve overlays precede the content container
    - Verify the resulting stacking context still allows the peaks image, flag video, lotus, and city mist to paint behind the content as today
    - Result: the `Leading Nepal` badge, headline, subheadline, bio, accent line, CTAs, and location row all paint above both the crimson `z-[12]` polygon and the navy `z-[13]` ellipse
    - _Bug_Condition: `isBugCondition(input)` where `intersects(input.ctaButtonsRect, input.curveBandsRegion)` is true_
    - _Expected_Behavior: `fullyVisible(result.ctaButtons) AND NOT intersects(result.ctaButtonsRect, result.curveBandsRegion)` from design_
    - _Preservation: Background decorations, text content, animations, CTA hrefs, mobile layout, Marquee output, and reduced-motion behavior unchanged (Preservation Requirements from design)_
    - _Requirements: 1.1, 1.4, 2.1, 2.4, 3.1, 3.2, 3.3, 3.4_

  - [ ] 3.2 Promote portrait above the navy curve (or reshape curves so they do not cross it)
    - In `components/sections/Hero.tsx`, either bump the portrait `<img>`'s z-index above `z-[13]` (e.g. `z-[14]`) so its silhouette renders in front of the curves, OR reduce curve heights / reshape the navy ellipse so its top arc sits below the portrait's chest line on `sm+`
    - Prefer the lower-risk z-index bump first - it does not change decorative geometry on non-buggy viewports
    - Keep the `hero-portrait-static` class on the portrait `<img>` and the `src="/mk-removebg-preview.webp"` unchanged
    - _Bug_Condition: `isBugCondition(input)` where `intersects(input.portraitRect, input.curveBandsRegion)` is true_
    - _Expected_Behavior: `NOT intersects(result.portraitRect, result.curveBandsRegion)` from design_
    - _Preservation: Portrait class names, src, and reduced-motion class unchanged_
    - _Requirements: 1.2, 2.2, 3.3, 3.7_

  - [ ] 3.3 Reduce vertical push of CTA cluster into the curve region on `lg+`
    - In `components/sections/Hero.tsx`, replace `lg:translate-y-24` on the inner content column with a value that does not push the CTA cluster into the curve band (e.g. drop the translate or reduce to `lg:translate-y-8`), and/or adjust the outer container's `pb-44 sm:pb-32` so at least ~24-32px of breathing room sits between the bottom of the location row and the top of the curve bands at `lg+`
    - Verify that the existing entrance animations on the CTAs and location row still play unchanged (only translation/padding values change, not animation props)
    - _Bug_Condition: `isBugCondition(input)` where `lg:translate-y-24` drives CTAs into the curve region_
    - _Expected_Behavior: CTA buttons and bottom tagline positioned in clear space above the decorative curve bands (Requirement 2.4)_
    - _Preservation: Entrance animations and text content unchanged_
    - _Requirements: 1.4, 2.4, 3.2_

  - [ ] 3.4 Resolve the Hero/Marquee navy-on-navy seam
    - Introduce a perceivable separator between the navy ellipse at the Hero's bottom and the `Marquee` component's top edge - choose the lightest-touch option:
      - Add a thin top border to `Marquee` in `components/sections/Marquee.tsx` (e.g. `border-t border-white/15` or a 1-2px gold/crimson accent line), OR
      - Reduce the navy ellipse height in `Hero.tsx` so an `f7f9fc` Hero base band of ~8-16px sits between the curve and the Marquee, OR
      - Swap the bottom-most decorative band to a non-navy color so the seam shows a color change, OR
      - Add a small drop-shadow at the Marquee top edge (e.g. `shadow-[0_-2px_8px_rgba(0,0,0,0.35)]`)
    - Do NOT change the Marquee's items, icons, gradient (`from-[#071224] via-[#102642] to-[#071224]`), font weights, or animation timing
    - _Bug_Condition: `isBugCondition(input)` where `input.heroBottomFillColor = input.marqueeTopFillColor AND NOT input.hasSeparator`_
    - _Expected_Behavior: `hasVisibleSeparation(result.heroBottomY, result.marqueeTopY)` from design_
    - _Preservation: Marquee internal markup, items, icons, gradient, and animation unchanged_
    - _Requirements: 1.3, 2.3, 3.6_

  - [ ] 3.5 Verify bug condition exploration test now passes
    - **Property 1: Expected Behavior** - Hero CTA / Portrait / Marquee Seam Overlap
    - **IMPORTANT**: Re-run the SAME test from task 1 - do NOT write a new test
    - The test from task 1 encodes the expected behavior - when it passes, it confirms the expected behavior is satisfied
    - Run the bug condition exploration test from step 1 against the fixed `Hero` and `Marquee`
    - **EXPECTED OUTCOME**: Test PASSES at all scoped viewport widths (1024, 1280, 1440, 1920, 768) - CTA rects no longer intersect the curve bands, portrait rect no longer intersects the curve bands (or portrait z > navy curve z), and the Hero/Marquee seam has a perceivable separator
    - _Requirements: 2.1, 2.2, 2.3, 2.4_

  - [ ] 3.6 Verify preservation tests still pass
    - **Property 2: Preservation** - Hero Decorations, Content, Navigation, Mobile Layout, Marquee, and Reduced-Motion Behavior
    - **IMPORTANT**: Re-run the SAME tests from task 2 - do NOT write new tests
    - Run the preservation property tests from step 2 against the fixed `Hero` and `Marquee`
    - **EXPECTED OUTCOME**: Tests PASS - background decorations, text content, animations, CTA hrefs, mobile layout, Marquee output, and reduced-motion classes are byte-identical to the unfixed snapshot
    - Confirm no regressions in any preserved behavior
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7_

- [ ] 4. Checkpoint - Ensure all tests pass
  - Ensure the bug condition exploration test from task 1 PASSES on the fixed code
  - Ensure the preservation property tests from task 2 PASS on the fixed code
  - Run the full project test suite and confirm no unrelated tests have regressed
  - Manually verify in a browser at `lg+`, `sm+`, and sub-`sm` viewport widths that CTAs are clickable and unclipped, the portrait is fully visible, the Hero/Marquee seam is perceivable, and the mobile centered layout is preserved
  - Ask the user if questions arise during validation


## Task Dependency Graph

```json
{
  "waves": [
    {
      "wave": 1,
      "description": "Write tests on UNFIXED code - Property 1 must FAIL, Property 2 must PASS",
      "tasks": ["1", "2"]
    },
    {
      "wave": 2,
      "description": "Apply the fix across z-stacking, portrait, vertical spacing, and Hero/Marquee seam",
      "tasks": ["3.1", "3.2", "3.3", "3.4"],
      "dependsOn": ["1", "2"]
    },
    {
      "wave": 3,
      "description": "Re-run Property 1 and Property 2 tests against the fixed code",
      "tasks": ["3.5", "3.6"],
      "dependsOn": ["3.1", "3.2", "3.3", "3.4"]
    },
    {
      "wave": 4,
      "description": "Final checkpoint - all tests pass and manual verification complete",
      "tasks": ["4"],
      "dependsOn": ["3.5", "3.6"]
    }
  ]
}
```

```
1 (Bug Condition Exploration Test)  ──┐
                                       ├──► 3.1, 3.2, 3.3, 3.4 (Implementation) ──► 3.5 (Verify Property 1)
2 (Preservation Property Tests)     ──┘                                          └──► 3.6 (Verify Property 2)
                                                                                       │
                                                                                       ▼
                                                                                   4 (Checkpoint)
```

- Task 1 must run on UNFIXED code and FAIL before any implementation begins.
- Task 2 must run on UNFIXED code and PASS before any implementation begins.
- Tasks 3.1 through 3.4 may be applied in any order but all must be complete before 3.5 and 3.6 run.
- Task 3.5 re-runs the test from task 1 (must now PASS).
- Task 3.6 re-runs the tests from task 2 (must still PASS).
- Task 4 is the final checkpoint and depends on 3.5 and 3.6 both passing.

## Notes

- Property 1 (task 1) and Property 2 (task 2) are written as property-based tests using mocked `getBoundingClientRect` keyed by class names, since the bug is a visual layout/stacking issue.
- For deterministic reproducibility, Property 1 is scoped to concrete viewport widths (768, 1024, 1280, 1440, 1920) that exercise the buggy domain.
- The fix is contained to `components/sections/Hero.tsx` with an optional small adjustment in `components/sections/Marquee.tsx` for the seam separator.
- Choose the lightest-touch separator option in task 3.4 - a thin top border on `Marquee` is the smallest change.
