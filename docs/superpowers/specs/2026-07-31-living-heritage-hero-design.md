# Living Heritage Hero Design

## Purpose

Replace the landing-page hero's visually separate portrait, Everest, Buddha, and architectural layers with one cohesive, photorealistic cinematic composition that represents Nepal's culture, spiritual heritage, architecture, landscape, and national identity with dignity.

## Approved Direction

The approved direction is **Living Heritage Panorama**.

- The person remains the principal foreground subject and must stay recognizable, natural, and authoritative.
- Mount Everest and the Himalayan range establish Nepal's geography in the distant background.
- Janaki Temple forms the architectural heart of the middle ground and must remain recognizable without competing with the person.
- Gautam Buddha appears as a serene spiritual presence integrated into the atmosphere, never as a pasted-on ornament.
- The existing animated Nepal flag remains a separate living layer across the composition so its motion is preserved.
- Cinematic dawn light unifies every element with restrained crimson, deep navy, warm gold, stone white, and Himalayan blue tones.

## Composition

The generated artwork will be a wide desktop hero plate without text, logos, watermarks, or a rendered flag.

- **Left third:** quieter sky, atmospheric mountain detail, and visual breathing room for the existing hero copy card.
- **Center:** Everest and the Himalayan ridge recede naturally through mist and dawn light.
- **Middle ground:** Janaki Temple is placed at a believable landscape scale, with its white structure and traditional details clearly readable.
- **Right third:** the person occupies the foreground, with safe edge clearance for responsive cropping.
- **Spiritual layer:** Gautam Buddha is integrated behind or beside the person as a softly illuminated, respectful presence with realistic depth and scale.
- **Lower edge:** land, mist, and architectural forms blend into the existing navy/crimson hero base rather than ending with a hard cutout edge.

The result must read as a single photographed or cinematically composited Nepal scene, not as a collage of independent PNG assets.

## Landing-Page Integration

The new wide artwork will replace the current separate static Everest, Buddha, city/temple silhouette, and default portrait layers in the public landing-page hero.

The following behavior remains unchanged:

- Existing headline, label, body copy, calls to action, anchors, and single visible H1.
- Existing glass copy surface and accessible contrast.
- Delayed desktop-only Nepal flag video loading.
- Mobile exclusion of heavyweight desktop decorations.
- Reduced-motion handling for the animated flag.
- Admin-managed hero content and portrait fallback behavior outside the new default composition.
- Existing responsive hero height and bottom crimson/navy framing.

Desktop will use the complete panorama. Mobile will use a carefully cropped static presentation that prioritizes the person's face and preserves enough Everest, temple, and Buddha context to retain the cultural story without loading the decorative flag video.

## Cultural and Visual Guardrails

- Present Gautam Buddha calmly and respectfully; avoid fantasy effects, spectacle, or religious caricature.
- Render Janaki Temple accurately enough to be recognizable; avoid generic palace architecture.
- Keep Everest geographically believable and avoid exaggerated fantasy peaks.
- Preserve the person's real facial identity and natural human proportions.
- Avoid political campaign imagery, crowds, military symbolism, excessive flag repetition, tourist-poster typography, deity halos, unrelated monuments, and invented religious symbols.
- Do not bake text, badges, logos, or the Nepal flag into the artwork.

## Asset and Performance Requirements

- Create a new versioned project asset rather than overwriting the existing source images.
- Use a landscape source suitable for a full-width hero and export an optimized web version.
- Keep the original generated source available for future crops.
- Use explicit intrinsic dimensions and responsive sizing.
- Maintain acceptable visual quality while avoiding a large regression in initial page weight.
- Keep the image's key subjects inside responsive safe areas.

## Verification

- Confirm the generated image accurately contains the person, Everest, Gautam Buddha, and Janaki Temple.
- Confirm the scene has no unwanted text, watermark, duplicate landmarks, distorted hands or face, or invented flag geometry.
- Verify desktop and mobile crops visually at representative viewport sizes.
- Verify hero copy remains readable and interactive controls remain unobstructed.
- Verify the animated Nepal flag still starts only after the existing desktop delay and does not load on mobile.
- Run the existing test suite and production build.
- Verify the local landing page returns successfully and inspect the final rendered hero.
