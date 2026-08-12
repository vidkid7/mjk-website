# Buddha Shadow Hero Layer

## Goal

Place a subdued Buddha silhouette behind Mukesh's head in the homepage hero while preserving the existing cultural Buddha figure and keeping Mukesh visually dominant.

## Design

- Reuse the existing `/cultural/buddha-profile-left.png` asset so the visual identity and transparent cutout are preserved.
- Render the silhouette as a separate decorative layer inside the existing heritage figures stack, immediately behind the portrait.
- Use grayscale, reduced saturation, low opacity, a small blur, and multiply blending so the Buddha reads as a shadow rather than a second foreground subject.
- Keep the original Buddha profile in its current lower-left position; the new shadow is an additional layer, not a replacement.
- Position the shadow around Mukesh's head and upper torso with responsive clamp-based sizing and offsets. It must never cover Mukesh's face.
- Keep the layer pointer-events-free and decorative (`aria-hidden` through its parent), and disable visual motion for reduced-motion users.

## Responsive behavior

- Desktop: shadow sits behind the portrait's head and shoulders with a restrained overlap.
- Tablet: reduce the shadow size and keep its center aligned to the portrait head.
- Mobile: retain the atmospheric effect at lower opacity and smaller scale, avoiding CTA and headline collisions.

## Acceptance criteria

1. The hero renders a dedicated Buddha shadow layer behind the portrait.
2. The portrait remains above the shadow and its face is unobstructed.
3. The original Buddha figure remains visible in its existing position.
4. Desktop, tablet, and mobile rules are represented in the responsive contract test.
5. Reduced-motion users receive a static shadow without animation.
