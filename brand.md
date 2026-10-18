# Brand — colours & fonts

Source: https://ronnidraft.conetwork.ca (stylesheet `/assets/styles-CY9XpfsO.css`).

The site defines its colours in OKLCH. The hex codes below are exact conversions of those values to sRGB. The original OKLCH values are listed too, so either can be used.

---

## Colours

### Core palette

| Name | Hex | RGB | OKLCH (as in the CSS) | Where it's used |
|---|---|---|---|---|
| **Wine** (primary) | `#682830` | 104, 40, 48 | `oklch(37.17% .092 15.14)` | Headings, links, primary buttons, wine-background sections (by far the most-used colour) |
| **Wine Dark** | `#511821` | 81, 24, 33 | `oklch(30.5% .085 15.14)` | Primary button hover |
| **Linen** (page background) | `#EBEAE8` | 235, 234, 232 | `oklch(93.73% .0029 84.56)` | Page background, alternating sections, header (at 90% opacity) |
| **White** (card) | `#FFFFFF` | 255, 255, 255 | `oklch(100% 0 0)` | Cards, white sections, text on wine |
| **Ink** (body text) | `#2F2325` | 47, 35, 37 | `oklch(27.1% .0186 7.2)` | Body text |
| **Muted Brown** | `#6E5850` | 110, 88, 80 | `oklch(48.02% .0319 40.95)` | Eyebrow labels, secondary text, captions |
| **Taupe** (accent) | `#A48C82` | 164, 140, 130 | `oklch(65.9% .0327 43.92)` | Testimonial quote marks, Private Advisory section background, image frame tints |
| **Light Line** (borders) | `#D9D2CE` | 217, 210, 206 | `oklch(86.82% .0095 52.08)` | Borders, dividers, input outlines |

### One-off colours (hard-coded, home page only)

| Hex | Where it's used |
|---|---|
| `#E3D6D0` | The italic second line of the H2 "You're lacking a plan." on the wine section |
| `#3E151B` | The H2 "Not ready for a call yet? Start here." in the Free Blueprint promo |

### Transparency variants in use
- White text at 90% / 85% on wine sections (body copy under headings)
- Linen at 90% (sticky header), 70% and 60% (hover tints on rows)
- Taupe at 20–50% (image frame and placeholder backgrounds)
- Ink at 75%, foreground at 85% (softer body text)

### Shadows
Shadows are tinted with brand colours rather than grey:
- Primary button hover: `0 8px 20px -6px rgba(104, 40, 48, 0.45)` (wine)
- Outline button hover: `0 8px 20px -6px rgba(104, 40, 48, 0.25)`
- Card hover: `0 18px 44px -20px rgba(47, 35, 37, 0.28)` (ink)
- Form cards: `0 14px 44px -18px rgba(47, 35, 37, 0.22)`
- Image frames: `0 12px 32px -12px rgba(47, 35, 37, 0.15)`

### Defined but not visibly used
These are in the stylesheet but don't appear on the pages:

| Name | Hex | Notes |
|---|---|---|
| Secondary / Muted | `#E2E8CB` | Pale sage. Leftover from the theme template. |
| Destructive (error red) | `#E7000B` | Default red from the template. Likely used for form error messages. |
| Chart 1–5 | `#692B20`, `#A2946A`, `#6C5E3D`, `#977A62`, `#D8D9B9` | For charts; none on the site. |

There's also a full **dark mode** palette in the CSS, but the site never turns it on, so it's not part of the live brand.

---

## Fonts

Both fonts load from Google Fonts:
`https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Jost:wght@300;400;500&display=swap`

| Role | Font | Weights loaded | Fallback stack |
|---|---|---|---|
| **Display** (all headings H1–H5, big numbers, quote marks) | **Cormorant Garamond** (serif) | 500, 600 | `ui-serif, Georgia, serif` |
| **Body** | **Jost** (sans-serif) | 300, 400, 500 | `ui-sans-serif, system-ui, sans-serif` |
| **Labels** (eyebrows, buttons, nav) | **Jost** | 500 | same as body |

### Base text
- **Body:** Jost Light (300), 17px, line height 1.7, colour Ink `#2F2325`, on Linen `#EBEAE8`.
- **Headings:** Cormorant Garamond Medium (500), letter spacing -0.01em, usually Wine `#682830`. Some headings put part of the line in *italic* for emphasis.

### Type scale (mobile → desktop)
| Element | Size | Line height |
|---|---|---|
| H1 | 40–48px → 52–64px | 1.04–1.06 |
| H2 | 30–38px → 36–46px | tight (1.25) |
| H3 | 20–26px → 28px | snug (1.375) |
| Body | 17px (lead paragraphs 18–19px) | 1.7–1.75 |
| Eyebrow label | 13px, uppercase, letter spacing 0.22em, Jost 500, Muted Brown | — |
| Button | 15px, Jost 500, slight letter spacing (0.025em) | — |

---

## Shape
- **Base corner radius:** 1.25rem (20px).
- **Cards:** 24px radius. **Form cards:** 28px radius.
- **Buttons:** fully rounded pills, 44px tall, 32px side padding.
- **Hero photo frame:** arch shape (200px top radius, 24px bottom).
