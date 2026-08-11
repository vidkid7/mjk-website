# MUKESH KHADKA Sunrise Title Entrance

## Goal

Animate the `MUKESH KHADKA` hero title so it emerges upward from below the mountain with a restrained sunrise-like reveal, then settles at its existing desktop, tablet, and mobile positions.

## Approved design

- Animate the title as one visual group so the relationship between both name lines stays intact.
- Start the title lower than its final position with reduced opacity and a soft blur.
- Reveal it upward with an ease-out motion and settle at the current layout position.
- Use the existing mountain/environment layer as the visual foreground during the lower part of the entrance, without changing the final title placement or the portrait.
- Respect `prefers-reduced-motion: reduce` by showing the title immediately at its final position with no animation.

## Implementation boundary

The change is limited to the hero title animation and its responsive/reduced-motion CSS contract. Existing Buddha, mountain, portrait, copy, navigation, and final title geometry remain unchanged.

## Verification

- Add a focused source contract for the initial lower offset, opacity/blur treatment, final transform, and reduced-motion fallback.
- Run the focused responsive contract tests.
- Verify the live desktop hero and at least one narrow responsive viewport, confirming the title returns to its current final position.
