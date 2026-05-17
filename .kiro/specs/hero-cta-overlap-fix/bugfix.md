# Bugfix Requirements Document

## Introduction

The Hero section on the MJK campaign homepage renders two decorative curved bands at the bottom (a crimson polygon and a navy `#082d58` ellipse) that visually intersect with the primary CTA buttons ("Explore My Vision" and "Learn More") and the candidate portrait. On large viewports the inner content column is also pushed downward via `lg:translate-y-24`, which drives the CTAs further into the curve overlays. Because the Marquee strip directly underneath uses the same navy gradient, the seam disappears and the buttons appear to be sunk into the marquee.

The result: CTAs look clipped or hidden, the portrait gets cut at chest height by the navy curve, and the bottom tagline sits awkwardly close to the curves. This reduces legibility and harms click affordance on the most important conversion elements of the page.

This bugfix restores clear visual separation between the Hero content (CTAs, portrait, tagline) and the decorative bottom curves, and between the Hero and the Marquee, without changing the overall layered look of the Hero on viewports where the bug does not manifest.

## Bug Analysis

### Current Behavior (Defect)

When the Hero section renders on viewports where the decorative bottom curves overlap interactive content, the following visual defects occur:

1.1 WHEN the Hero section renders on `lg` and larger viewports THEN the CTA buttons "Explore My Vision" and "Learn More" are partially covered by the navy `#082d58` ellipse band (`z-[13]`) and/or the crimson polygon band (`z-[12]`), making part of the button labels and borders visually clipped.

1.2 WHEN the Hero section renders on `sm` and larger viewports THEN the candidate portrait image (`z-[11]`) is rendered behind the navy curve (`z-[13]`) and the crimson curve (`z-[12]`), so the portrait is clipped around chest height by the navy curve instead of remaining fully visible above it.

1.3 WHEN the Hero section is followed by the Marquee component on the homepage THEN the navy curve at the Hero's bottom and the navy gradient background of the Marquee merge into a single visual block with no separating edge, so the CTA buttons appear to sit inside the marquee strip.

1.4 WHEN the Hero inner content column applies `lg:translate-y-24` together with the outer flex container's `pb-44 sm:pb-32` on `lg` and larger viewports THEN the CTA buttons and the bottom tagline are pushed into the vertical region occupied by the decorative curve bands, instead of being positioned in clear space above them.

### Expected Behavior (Correct)

For the same conditions that currently trigger the defect, the system should render the Hero so interactive and identity content is fully visible and clearly separated from decoration:

2.1 WHEN the Hero section renders on `lg` and larger viewports THEN the system SHALL render the CTA buttons "Explore My Vision" and "Learn More" fully visible and unclipped, with no portion of either button overlapped by the crimson or navy decorative curve bands.

2.2 WHEN the Hero section renders on `sm` and larger viewports THEN the system SHALL render the candidate portrait so its silhouette is visually in front of the decorative curve bands (or the curves are sized so they do not cross the portrait), so the portrait is not clipped at chest height by the navy curve.

2.3 WHEN the Hero section is followed by the Marquee component on the homepage THEN the system SHALL provide a clear visual separation between the Hero's bottom edge and the Marquee strip (for example via a non-navy band, a divider, a shadow, or by removing the navy curve overlap), so the CTA buttons no longer appear to sit inside the marquee.

2.4 WHEN the Hero inner content column is positioned on `lg` and larger viewports THEN the system SHALL position the CTA buttons and the bottom tagline in clear space above the decorative curve bands, with adequate vertical breathing room between the last interactive element and the top of the bands.

### Unchanged Behavior (Regression Prevention)

Existing Hero behavior outside the overlap defect must be preserved:

3.1 WHEN the Hero section renders on any supported viewport THEN the system SHALL CONTINUE TO display the Nepali flag video, the Himalayan peaks background image, the Buddha lotus accent, and the city mist SVG with their current opacities, masks, and positioning.

3.2 WHEN the Hero section renders on any supported viewport THEN the system SHALL CONTINUE TO display the "Leading Nepal" badge, the "Forward Together" headline, the subheadline, the bio paragraph, the red accent line, and the "Mayor Candidate - Kathmandu Metropolitan City" location row with their current typography, colors, and entrance animations.

3.3 WHEN the Hero section renders on `lg` and larger viewports THEN the system SHALL CONTINUE TO show decorative curved color accents (crimson and navy) at the bottom of the section as part of the overall visual identity, even if their geometry, height, or stacking is adjusted as part of the fix.

3.4 WHEN a user clicks "Explore My Vision" THEN the system SHALL CONTINUE TO navigate to the `#vision` anchor, and WHEN a user clicks "Learn More" THEN the system SHALL CONTINUE TO navigate to the `#about` anchor.

3.5 WHEN the Hero section renders on small viewports below `sm` THEN the system SHALL CONTINUE TO render the centered mobile layout (centered text, centered CTAs, portrait anchored bottom-center) with no additional clipping introduced by the fix.

3.6 WHEN the Marquee component renders below the Hero THEN the system SHALL CONTINUE TO display its scrolling list of role badges with the existing icons, colors, font weights, and animation timing.

3.7 WHEN a user with `prefers-reduced-motion: reduce` views the page THEN the system SHALL CONTINUE TO suppress the flag and portrait motion animations as currently configured in `globals.css`.

## Deriving the Bug Condition

**Bug Condition Function** - identifies the rendering state that triggers the visual overlap:

```pascal
FUNCTION isBugCondition(X)
  INPUT: X of type HeroRenderState
    // X includes: viewportWidth, curveBandTopY, ctaButtonsRect,
    //             portraitRect, marqueeTopY, heroBottomY
  OUTPUT: boolean

  // Buttons or portrait visually intersect the decorative bands,
  // OR the Hero/Marquee seam has no perceivable separation
  RETURN
       intersects(X.ctaButtonsRect, X.curveBandsRegion)
    OR intersects(X.portraitRect,   X.curveBandsRegion)
    OR (X.heroBottomFillColor = X.marqueeTopFillColor
        AND noDividerBetween(X.heroBottomY, X.marqueeTopY))
END FUNCTION
```

**Property Specification** - desired behavior for inputs that satisfy the bug condition:

```pascal
// Property: Fix Checking - Hero CTA / portrait / seam clarity
FOR ALL X WHERE isBugCondition(X) DO
  result ← renderHero'(X)
  ASSERT
       fullyVisible(result.ctaButtons)
   AND NOT intersects(result.ctaButtonsRect, result.curveBandsRegion)
   AND NOT intersects(result.portraitRect,   result.curveBandsRegion)
   AND hasVisibleSeparation(result.heroBottomY, result.marqueeTopY)
END FOR
```

**Preservation Goal**:

```pascal
// Property: Preservation Checking
FOR ALL X WHERE NOT isBugCondition(X) DO
  ASSERT renderHero(X) = renderHero'(X)
END FOR
```

**Key Definitions:**
- **F (`renderHero`)**: The current Hero rendering, where decorative curves at `z-[12]/[13]` overlay the CTA buttons (`z-20` inside a `z-10` parent) and the portrait (`z-[11]`), and the navy curve color matches the Marquee background.
- **F' (`renderHero'`)**: The fixed Hero rendering where CTAs and portrait are no longer intersected by the curves and the Hero/Marquee seam is visually distinguishable.
- **Counterexample**: On a 1440px-wide viewport the bottom edge of the "Explore My Vision" button is overlapped by the navy ellipse band, and the portrait's chest area is clipped by the same band; the navy band runs flush into the Marquee with no perceivable boundary.
